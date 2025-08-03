import { createContext, useContext } from "react";
import type { EmploymentRow } from "../types/Employment";

export interface EmploymentAPIContextType {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
  responseData: EmploymentRow[];
  setResponseData: (data: EmploymentRow[]) => void;
}

export const EmploymentAPIContext = createContext<
  EmploymentAPIContextType | undefined
>(undefined);

export function useEmploymentAPIContext() {
  const ctx = useContext(EmploymentAPIContext);
  if (!ctx)
    throw new Error(
      "useEmploymentAPIContext must be used within EmploymentAPIProvider"
    );
  return ctx;
}
