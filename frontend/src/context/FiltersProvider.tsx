import React, { useState } from "react";
import { FiltersContext } from "./FiltersContext";
import STATE_FIPS from "../data/StateFips";

export const ALL_STATES = Object.keys(STATE_FIPS);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedStates, setSelectedStates] = useState<string[]>(["ALL"]);
  const [selectedQuarter, setSelectedQuarter] = useState<string>("2023-Q4");
  const [breakdownBySex, setBreakdownBySex] = useState(false);

  return (
    <FiltersContext.Provider
      value={{
        selectedStates,
        setSelectedStates,
        selectedQuarter,
        setSelectedQuarter,
        breakdownBySex,
        setBreakdownBySex,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
