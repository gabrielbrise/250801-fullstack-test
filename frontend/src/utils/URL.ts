import STATE_FIPS from "../data/StateFips";

export const getEmploymentApiUrl = (
  selectedStates: string[],
  selectedQuarter: string,
  breakdownBySex: boolean
) => {
  let stateQuery;
  if (selectedStates.some((opt) => opt === "ALL")) {
    stateQuery = Object.keys(STATE_FIPS).join(",");
  } else {
    stateQuery = selectedStates.join(",");
  }
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const ENDPOINT_URL = `${API_BASE_URL}/employment`;
  const STATE_QUERY = `?state=${stateQuery}`;
  const QUARTER_QUERY = `&yearQuarter=${selectedQuarter}`;
  const BREAKDOWN_BY_SEX_QUERY = `&sex=${breakdownBySex ? "1,2" : "0"}`;
  const REQUEST_URL = [
    ENDPOINT_URL,
    STATE_QUERY,
    QUARTER_QUERY,
    BREAKDOWN_BY_SEX_QUERY,
  ].join("");

  return REQUEST_URL;
};
