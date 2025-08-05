import React, { useEffect, useState } from "react";
import {
  EmploymentAPIContext,
  type EmploymentResponse,
} from "./EmploymentAPIContext";
import { useFiltersContext } from "./FiltersContext";
import STATE_FIPS from "../data/StateFips";

export const EmploymentAPIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { selectedStates, selectedQuarter, breakdownBySex } =
    useFiltersContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [responseData, setResponseData] = useState<EmploymentResponse | null>(
    null
  );

  let stateQuery;
  if (selectedStates.some((opt) => opt === "ALL")) {
    stateQuery = Object.keys(STATE_FIPS).join(",");
  } else {
    stateQuery = selectedStates.join(",");
  }

  const searchEmploymentData = () => {
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

    setIsLoaded(false);
    setIsLoading(true);

    fetch(REQUEST_URL)
      .then((res) => res.json())
      .then((res) =>
        setResponseData({
          selectedStates: res.selectedStates,
          yearQuarter: res.yearQuarter,
          employment: res.employment,
        })
      )
      .then(() => {
        setIsLoaded(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    searchEmploymentData();
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
        searchEmploymentData,
      }}
    >
      {children}
    </EmploymentAPIContext.Provider>
  );
};
