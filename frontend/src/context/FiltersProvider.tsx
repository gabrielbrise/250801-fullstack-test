import React, { useState } from "react";
import { FiltersContext } from "./FiltersContext";

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
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
