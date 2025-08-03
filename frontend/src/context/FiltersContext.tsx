import { createContext, useContext } from "react";

export interface FiltersContextType {
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
  selectedQuarter: string;
  setSelectedQuarter: (quarter: string) => void;
  breakdownBySex: boolean;
  setBreakdownBySex: (b: boolean) => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined
);

export function useFiltersContext() {
  const ctx = useContext(FiltersContext);
  if (!ctx)
    throw new Error("useFiltersContext must be used within EmploymentProvider");
  return ctx;
}
