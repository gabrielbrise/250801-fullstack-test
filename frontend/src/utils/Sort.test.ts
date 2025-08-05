import { describe, it, expect } from "vitest";
import { sortTableData, type SortConfig } from "./Sort";
import type { EmploymentResponse } from "../types/Api";

describe("sortTableData", () => {
  const mockData: EmploymentResponse = {
    selectedStates: "KANSAS,ALABAMA,OHIO",
    yearQuarter: "2023-Q4",
    employment: [
      { state: "KANSAS", male: 50, female: 100, total: 150 },
      { state: "ALABAMA", male: 100, female: 200, total: 300 },
      { state: "OHIO", male: 25, female: 150, total: 175 },
    ],
  };

  it("should return empty array if response data is null", () => {
    const sortConfig: SortConfig = { column: "state", direction: "asc" };
    expect(sortTableData(null, sortConfig)).toEqual([]);
  });

  it("should sort by state ascending", () => {
    const sortConfig: SortConfig = { column: "state", direction: "asc" };
    const result = sortTableData(mockData, sortConfig);
    expect(result[0].state).toBe("ALABAMA");
    expect(result[2].state).toBe("OHIO");
  });

  it("should sort by state descending", () => {
    const sortConfig: SortConfig = { column: "state", direction: "desc" };
    const result = sortTableData(mockData, sortConfig);
    expect(result[0].state).toBe("OHIO");
    expect(result[2].state).toBe("ALABAMA");
  });

  it("should sort by total ascending", () => {
    const sortConfig: SortConfig = { column: "total", direction: "asc" };
    const result = sortTableData(mockData, sortConfig);
    expect(result[0].total).toBe(150);
    expect(result[2].total).toBe(300);
  });
});
