import axios, { AxiosInstance } from "axios";

const CENSUS_BUREAU_URL = "https://api.census.gov/data/timeseries/qwi/sa";
const CENSUS_BUREAU_GET = "Emp";

export interface CensusBurauInput {
  state: string;
  yearQuarter: string;
  sex: number;
}

export interface CensusBureauQueryParams {
  get: string;
  for: string;
  time: string;
  sex: number;
}

export interface CensusBureauResponse {}

export class CensusBureauService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: CENSUS_BUREAU_URL,
    });
  }

  async getEmployment(params: CensusBurauInput) {
    const query: CensusBureauQueryParams = {
      get: CENSUS_BUREAU_GET,
      for: `state:${params.state}`,
      time: params.yearQuarter,
      sex: params.sex,
    };

    const res = await this.http.get("", { params: query });
    return res.data;
  }
}
