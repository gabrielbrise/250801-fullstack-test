import { CensusBureauService } from "./CensusBureau";

describe("CensusBureauService Integration", () => {
  const service = new CensusBureauService();

  it("should fetch employment data for state 01, 2023-Q4, sex 0", async () => {
    const result = await service.getEmployment({
      state: "01",
      yearQuarter: "2023-Q4",
      sex: "0",
    });

    expect(result).toEqual([
      ["Emp", "time", "sex", "state"],
      ["2027277", "2023-Q4", "0", "01"],
    ]);
  });
});
