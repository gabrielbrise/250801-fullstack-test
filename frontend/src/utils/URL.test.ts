import { describe, it, expect } from "vitest";
import { getEmploymentApiUrl } from "./URL";
import STATE_FIPS from "../data/StateFips";

describe("getEmploymentApiUrl", () => {
  process.env.VITE_API_BASE_URL = "http://test-api.com";

  it("should generate URL with specific states", () => {
    const url = getEmploymentApiUrl(["CA", "NY"], "2023-Q1", false);
    expect(url).toBe(
      "http://test-api.com/employment?state=CA,NY&yearQuarter=2023-Q1&sex=0"
    );
  });

  it('should generate URL with all states when "ALL" is selected', () => {
    const url = getEmploymentApiUrl(["ALL"], "2023-Q1", false);
    const allStates = Object.keys(STATE_FIPS).join(",");
    expect(url).toBe(
      `http://test-api.com/employment?state=${allStates}&yearQuarter=2023-Q1&sex=0`
    );
  });

  it("should handle sex breakdown parameter", () => {
    const url = getEmploymentApiUrl(["CA"], "2023-Q1", true);
    expect(url).toBe(
      "http://test-api.com/employment?state=CA&yearQuarter=2023-Q1&sex=1,2"
    );
  });

  it("should use default API URL if env variable is not set", () => {
    delete process.env.VITE_API_BASE_URL;
    const url = getEmploymentApiUrl(["CA"], "2023-Q1", false);
    expect(url).toBe(
      "http://localhost:3000/employment?state=CA&yearQuarter=2023-Q1&sex=0"
    );
  });
});
