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
  const state = String(req.query.state ?? "");
  const yearQuarter = String(req.query.yearQuarter ?? "");
  const sex = String(req.query.sex ?? "");

  // Validate input
  if (!IsValidEmploymentInput(req.query)) {
    return res.status(400).json({ error: "Invalid input format" });
  }

  // Check cache before using CensusBureau service
  const cacheKey = `${state}_${yearQuarter}_${sex}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json({ employment: cached });
  }

  try {
    const response = await censusService.getEmployment({
      state,
      yearQuarter,
      sex,
    });

    const result = response.slice(1);
    if (result === undefined) {
      return res.status(404).json({ error: "Employment data not found" });
    }
    cache.set(cacheKey, result);
    return res.json({ employment: result });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch employment data" });
  }
}

function IsValidEmploymentInput(query: any): boolean {
  return (
    isValidStateFipCode(query.state) &&
    isValidQuarterFormat(query.yearQuarter) &&
    isValidSexValue(query.sex)
  );
}
