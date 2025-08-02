import { isValidQuarterFormat } from "./Validators";

describe("isValidQuarterFormat", () => {
  it("should return true for valid quarter format", () => {
    expect(isValidQuarterFormat("1993-Q2")).toBe(true);
    expect(isValidQuarterFormat("2020-Q4")).toBe(true);
    expect(isValidQuarterFormat("0001-Q1")).toBe(true);
  });

  it("should return false for invalid formats", () => {
    expect(isValidQuarterFormat("1993-03-28")).toBe(false);
    expect(isValidQuarterFormat("1993-Q5")).toBe(false);
    expect(isValidQuarterFormat("93-Q2")).toBe(false);
    expect(isValidQuarterFormat("1993Q2")).toBe(false);
    expect(isValidQuarterFormat("")).toBe(false);
    expect(isValidQuarterFormat("1993-Q")).toBe(false);
    expect(isValidQuarterFormat("Q2-1993")).toBe(false);
    expect(isValidQuarterFormat("1993-Q0")).toBe(false);
    expect(isValidQuarterFormat("abcd-Q2")).toBe(false);
  });
});
