import React, { useEffect, useState } from "react";
import {
  EmploymentAPIContext,
  type EmploymentResponse,
} from "./EmploymentAPIContext";
import { useFiltersContext } from "./FiltersContext";
import { getEmploymentApiUrl } from "../utils/URL";

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

  const searchEmploymentData = () => {
    const REQUEST_URL = getEmploymentApiUrl(
      selectedStates,
      selectedQuarter,
      breakdownBySex
    );

    setIsLoaded(false);
    setIsLoading(true);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    fetch(REQUEST_URL, {
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
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
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        console.error("Fetch error:", error);

        if (error.name === "AbortError") {
          console.error("Request timed out");
        }

        setResponseData(null);
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
