import {
  isValidQuarterFormat,
  isValidStateFipCode,
  isValidSexValue,
} from "./Validators";

describe("isValidQuarterFormat", () => {
  it("should return true for valid quarter format", () => {
    expect(isValidQuarterFormat("2023-Q1")).toBe(true);
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

  describe("isValidStateFipCode", () => {
    it("should return true for valid two-digit state FIP codes", () => {
      expect(isValidStateFipCode("01")).toBe(true);
      expect(isValidStateFipCode("53")).toBe(true);
      expect(isValidStateFipCode("00")).toBe(true);
      expect(isValidStateFipCode("99")).toBe(true);
    });

    it("should return false for invalid state FIP codes", () => {
      expect(isValidStateFipCode("1")).toBe(false);
      expect(isValidStateFipCode("001")).toBe(false);
      expect(isValidStateFipCode("a1")).toBe(false);
      expect(isValidStateFipCode("1a")).toBe(false);
      expect(isValidStateFipCode("")).toBe(false);
      expect(isValidStateFipCode("123")).toBe(false);
      expect(isValidStateFipCode(" 01")).toBe(false);
      expect(isValidStateFipCode("01 ")).toBe(false);
      expect(isValidStateFipCode("AA")).toBe(false);
    });

    describe("isValidSexValue", () => {
      it("should return true for valid sex values", () => {
        expect(isValidSexValue("0")).toBe(true);
        expect(isValidSexValue("1")).toBe(true);
        expect(isValidSexValue("2")).toBe(true);
        expect(isValidSexValue("1,2")).toBe(true);
      });

      it("should return false for invalid sex values", () => {
        expect(isValidSexValue("-1")).toBe(false);
        expect(isValidSexValue("3")).toBe(false);
        expect(isValidSexValue("")).toBe(false);
        expect(isValidSexValue("a")).toBe(false);
        expect(isValidSexValue("1.5")).toBe(false);
        expect(isValidSexValue(" 1")).toBe(false);
        expect(isValidSexValue("1 ")).toBe(false);
      });
    });
  });
});
