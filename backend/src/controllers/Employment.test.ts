import { Request, Response } from "express";
import { CensusBureauService } from "../services/CensusBureau";
import * as Validators from "../utils/Validators";
import NodeCache from "node-cache";
import { getEmployment } from "./Employment";

jest.mock("../services/CensusBureau");
jest.mock("../utils/Validators");
jest.mock("node-cache");

describe("getEmployment", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn().mockReturnThis();
    mockStatus = jest.fn().mockReturnThis();
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
    mockRequest = {
      query: {
        state: "01",
        yearQuarter: "2023Q1",
        sex: "0",
      },
    };

    jest.spyOn(Validators, "isValidStateFipCode").mockReturnValue(true);
    jest.spyOn(Validators, "isValidQuarterFormat").mockReturnValue(true);
    jest.spyOn(Validators, "isValidSexValue").mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached data if available", async () => {
    const cachedValue = 1000;
    jest.spyOn(NodeCache.prototype, "get").mockReturnValue(cachedValue);

    await getEmployment(mockRequest as Request, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({ employment: cachedValue });
  });

  it("should return 400 if input validation fails", async () => {
    jest.spyOn(Validators, "isValidStateFipCode").mockReturnValue(false);

    await getEmployment(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({ error: "Invalid input format" });
  });

  it("should fetch and return employment data when not cached", async () => {
    const employmentData = 2000;
    jest.spyOn(NodeCache.prototype, "get").mockReturnValue(null);
    jest.spyOn(NodeCache.prototype, "set").mockReturnValue(true);
    jest
      .spyOn(CensusBureauService.prototype, "getEmployment")
      .mockResolvedValue([null, [employmentData]]);

    await getEmployment(mockRequest as Request, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({ employment: employmentData });
  });

  it("should return 404 when employment data is not found", async () => {
    jest.spyOn(NodeCache.prototype, "get").mockReturnValue(null);
    jest
      .spyOn(CensusBureauService.prototype, "getEmployment")
      .mockResolvedValue([null, []]);

    await getEmployment(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Employment data not found",
    });
  });

  it("should return 500 when service throws error", async () => {
    jest.spyOn(NodeCache.prototype, "get").mockReturnValue(null);
    jest
      .spyOn(CensusBureauService.prototype, "getEmployment")
      .mockRejectedValue(new Error());

    await getEmployment(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Failed to fetch employment data",
    });
  });
});
