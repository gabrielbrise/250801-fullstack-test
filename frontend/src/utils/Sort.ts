import type { EmploymentResponse, EmploymentRow } from "../types/Api";

export interface SortConfig {
  column: keyof EmploymentRow;
  direction: "asc" | "desc";
}

export const sortTableData = (
  responseData: EmploymentResponse | null,
  sortConfig: SortConfig
): EmploymentRow[] => {
  if (!responseData?.employment) return [];
  return [...responseData.employment].sort((a, b) => {
    const aVal = a[sortConfig.column] ?? 0;
    const bVal = b[sortConfig.column] ?? 0;
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
};
