import { Request, Response } from "express";
import * as Validators from "../utils/Validators";

// Use jest.doMock to ensure mocks are set up before module import
jest.doMock("node-cache");
jest.doMock("../services/CensusBureau");

describe("getEmployment", () => {
  let mockRequest: {
    query: { state: string; yearQuarter: string; sex: string };
  };
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;
  let mockCacheGet: jest.Mock;
  let mockCacheSet: jest.Mock;
  let getEmploymentMock: jest.Mock;
  let getEmployment: any;
  let parseEmploymentData: any;

  beforeAll(async () => {
    // Set up mocks first
    mockCacheGet = jest.fn();
    mockCacheSet = jest.fn();

    const NodeCache = require("node-cache");
    NodeCache.mockImplementation(() => ({
      get: mockCacheGet,
      set: mockCacheSet,
    }));

    getEmploymentMock = jest.fn();
    const CensusBureauService =
      require("../services/CensusBureau").CensusBureauService;
    CensusBureauService.mockImplementation(() => ({
      getEmployment: getEmploymentMock,
    }));

    // Now import the module
    const employmentModule = await import("./Employment");
    getEmployment = employmentModule.getEmployment;
    parseEmploymentData = employmentModule.parseEmploymentData;
  });

  beforeEach(() => {
    mockJson = jest.fn().mockReturnThis();
    mockStatus = jest.fn().mockReturnThis();

    mockResponse = {
      json: mockJson,
      status: mockStatus,
    } as unknown as Response;

    mockRequest = {
      query: {
        state: "01",
        yearQuarter: "2023-Q1",
        sex: "0",
      },
    };

    // Reset mocks but don't clear implementations
    jest.clearAllMocks();

    // Set up validator mocks
    jest.spyOn(Validators, "isValidStateFipCode").mockReturnValue(true);
    jest.spyOn(Validators, "isValidQuarterFormat").mockReturnValue(true);
    jest.spyOn(Validators, "isValidSexValue").mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached data if available", async () => {
    const cachedValue = [{ state: "01", total: 1000, male: 500, female: 500 }];

    // First call: cache miss, service call
    mockCacheGet.mockReturnValueOnce(undefined);
    getEmploymentMock.mockResolvedValueOnce([
      ["Emp", "time", "sex", "state"],
      ["1000", "2023-Q1", "0", "01"],
    ]);

    await getEmployment(mockRequest, mockResponse as Response);

    // Verify first call fetched from service and set cache
    expect(mockCacheGet).toHaveBeenCalledTimes(1);
    expect(getEmploymentMock).toHaveBeenCalledTimes(1);
    expect(mockCacheSet).toHaveBeenCalledTimes(1);

    // Reset mocks for second call
    jest.clearAllMocks();

    // Second call: cache hit
    mockCacheGet.mockReturnValue(cachedValue);

    await getEmployment(mockRequest, mockResponse as Response);

    // Verify second call used cache and didn't call service
    expect(mockCacheGet).toHaveBeenCalledTimes(1);
    expect(getEmploymentMock).not.toHaveBeenCalled();
    expect(mockCacheSet).not.toHaveBeenCalled();
    expect(mockJson).toHaveBeenCalledWith({
      selectedStates: "01",
      yearQuarter: "2023-Q1",
      employment: cachedValue,
    });
  });

  it("should return 400 if input validation fails", async () => {
    (Validators.isValidStateFipCode as jest.Mock).mockReturnValue(false);

    await getEmployment(mockRequest, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({ error: "Invalid input format" });
  });

  it("should fetch and return employment data when not cached", async () => {
    mockCacheGet.mockReturnValue(undefined);

    getEmploymentMock.mockResolvedValue([
      ["Emp", "time", "sex", "state"],
      ["2000", "2023-Q1", "0", "01"],
    ]);

    await getEmployment(mockRequest, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({
      selectedStates: "01",
      yearQuarter: "2023-Q1",
      employment: [{ state: "01", total: 2000, time: "2023-Q1", sex: 0 }],
    });
  });

  it("should return 404 when employment data is not found", async () => {
    mockCacheGet.mockReturnValue(undefined);

    // Return empty array (length 0) to trigger undefined result
    getEmploymentMock.mockResolvedValue([]);

    await getEmployment(mockRequest, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Employment data not found",
    });
  });

  it("should return 500 when service throws error", async () => {
    mockCacheGet.mockReturnValue(undefined);

    getEmploymentMock.mockRejectedValue(new Error("Service error"));

    await getEmployment(mockRequest, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Failed to fetch employment data",
    });
  });

  it("should aggregate male and female when sex is '1,2'", async () => {
    mockCacheGet.mockReturnValue(undefined);
    mockRequest.query.sex = "1,2";

    // Mock male and female responses
    getEmploymentMock
      .mockResolvedValueOnce([
        ["Emp", "time", "sex", "state"],
        ["700", "2023-Q1", "1", "01"],
      ])
      .mockResolvedValueOnce([
        ["Emp", "time", "sex", "state"],
        ["800", "2023-Q1", "2", "01"],
      ]);

    await getEmployment(mockRequest, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({
      selectedStates: "01",
      yearQuarter: "2023-Q1",
      employment: [{ state: "01", male: 700, female: 800, total: 1500 }],
    });
  });

  it("should correctly parse employment data array", () => {
    const mockData = [
      ["1000", "2023-Q1", "1", "01"],
      ["2000", "2023-Q2", "2", "02"],
    ];

    const result = parseEmploymentData(mockData);

    expect(result).toEqual([
      {
        total: 1000,
        time: "2023-Q1",
        sex: 1,
        state: "01",
      },
      {
        total: 2000,
        time: "2023-Q2",
        sex: 2,
        state: "02",
      },
    ]);
  });
});
