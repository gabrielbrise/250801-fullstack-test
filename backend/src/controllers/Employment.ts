import { Request, Response } from "express";
import {
  CensusBureauInput,
  CensusBureauService,
} from "../services/CensusBureau";
import {
  isValidQuarterFormat,
  isValidStateFipCode,
  isValidSexValue,
} from "../utils/Validators";
import NodeCache from "node-cache";

const censusService = new CensusBureauService();
const cache = new NodeCache({ stdTTL: 60 * 10 }); // cache for 10 minutes

export async function getEmployment(req: Request, res: Response) {
  const selectedStates = String(req.query.state ?? "");
  const yearQuarter = String(req.query.yearQuarter ?? "");
  const sex = String(req.query.sex ?? "");

  // Validate input
  if (!IsValidEmploymentInput(req.query)) {
    return res.status(400).json({ error: "Invalid input format" });
  }

  // Check cache before using CensusBureau service
  const cacheKey = `${selectedStates}_${yearQuarter}_${sex}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json({ employment: cached });
  }

  try {
    let response;
    let result;
    if (sex === "1,2") {
      response = await RequestBreakdownBySex(selectedStates, yearQuarter);
      result = response;
    } else {
      response = await censusService.getEmployment({
        state: selectedStates,
        yearQuarter,
        sex,
      });
      result = ParseEmploymentData(response.slice(1));
    }

    if (result === undefined) {
      return res.status(404).json({ error: "Employment data not found" });
    }
    cache.set(cacheKey, result);
    return res.json({
      selectedStates,
      yearQuarter,
      employment: result,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch employment data" });
  }
}

async function RequestBreakdownBySex(state: string, yearQuarter: string) {
  let result: any = [];

  const [maleRes, femaleRes] = await Promise.all([
    censusService.getEmployment({ state, yearQuarter, sex: "1" }),
    censusService.getEmployment({ state, yearQuarter, sex: "2" }),
  ]);

  for (let i = 1; i < maleRes.length; i++) {
    result.push({
      state: maleRes[i][3],
      male: parseInt(maleRes[i][0]),
      female: parseInt(femaleRes[i][0]),
      total: parseInt(maleRes[i][0]) + parseInt(femaleRes[i][0]),
    });
  }

  return result;
}

function IsValidEmploymentInput(query: any): boolean {
  return (
    isValidStateFipCode(query.state) &&
    isValidQuarterFormat(query.yearQuarter) &&
    isValidSexValue(query.sex)
  );
}

export interface EmploymentRow {
  state: string;
  male?: number;
  female?: number;
  total: number;
}

function ParseEmploymentData(data: string[][]): EmploymentRow[] {
  return data.map(([total, time, sex, state]) => ({
    total: Number(total),
    time,
    sex: Number(sex),
    state: String(state),
  }));
}
