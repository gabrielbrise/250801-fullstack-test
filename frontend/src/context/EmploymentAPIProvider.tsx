import React, { useEffect, useState } from "react";
import { EmploymentAPIContext } from "./EmploymentAPIContext";
import type { EmploymentRow } from "../types/Employment";
import { useFiltersContext } from "./FiltersContext";

export const EmploymentAPIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { selectedStates, selectedQuarter, breakdownBySex } =
    useFiltersContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [responseData, setResponseData] = useState<EmploymentRow[]>([]);

  useEffect(() => {
    const API_BASE_URL = "http://localhost:3000/employment";
    const STATE_QUERY = `?state=${selectedStates.join(",")}`;
    const QUARTER_QUERY = `&yearQuarter=${selectedQuarter}`;
    const BREAKDOWN_BY_SEX_QUERY = `&sex=${breakdownBySex ? "1,2" : "0"}`;
    const REQUEST_URL = [
      API_BASE_URL,
      STATE_QUERY,
      QUARTER_QUERY,
      BREAKDOWN_BY_SEX_QUERY,
    ].join("");

    setIsLoading(true);

    fetch(REQUEST_URL)
      .then((res) => res.json())
      .then((res) => setResponseData(parseEmploymentData(res.employment)))
      .then(() => {
        setIsLoaded(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <EmploymentAPIContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isLoaded,
        setIsLoaded,
        responseData,
        setResponseData,
      }}
    >
      {children}
    </EmploymentAPIContext.Provider>
  );
};

function parseEmploymentData(data: string[][]): EmploymentRow[] {
  return data.map(([total, time, sex, state]) => ({
    total: Number(total),
    time,
    sex: Number(sex),
    state: String(state),
  }));
}
