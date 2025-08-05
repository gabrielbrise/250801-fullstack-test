import React, { useState, useCallback } from "react";
import { useEmploymentAPIContext } from "../context/EmploymentAPIContext";
import type { EmploymentRow } from "../types/Api";
import STATE_FIPS from "../data/StateFips";
import ErrorBoundary from "../components/ErrorBoundary";

interface SortConfig {
  column: keyof EmploymentRow;
  direction: "asc" | "desc";
}

const TableSection: React.FC = () => {
  const { isLoaded, responseData } = useEmploymentAPIContext();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: "state",
    direction: "asc",
  });

  const handleSort = useCallback((column: keyof EmploymentRow) => {
    setSortConfig((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  if (!isLoaded) return <Loader />;
  if (isLoaded && !responseData) return <ErrorLoading />;
  if (isLoaded && responseData?.employment.length === 0)
    return <EmptyResults />;

  const sortedData = [...(responseData?.employment ?? [])].sort((a, b) => {
    const aVal = a[sortConfig.column] ?? 0;
    const bVal = b[sortConfig.column] ?? 0;
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const breakdownBySexData =
    sortedData.length > 0 &&
    (sortedData[0].male !== undefined || sortedData[0].female !== undefined);

  return (
    <table className="min-w-full border border-gray-300 mt-6">
      <thead>
        <tr>
          <th
            className="border px-4 py-2 cursor-pointer"
            onClick={() => handleSort("state")}
          >
            State
          </th>
          {breakdownBySexData && (
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("male")}
            >
              Male
            </th>
          )}
          {breakdownBySexData && (
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("female")}
            >
              Female
            </th>
          )}
          <th
            className="border px-4 py-2 cursor-pointer"
            onClick={() => handleSort("total")}
          >
            Total Employment
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <TableRow {...row} key={row.state} />
        ))}
      </tbody>
    </table>
  );
};

const TableRow: React.FC<EmploymentRow> = ({ state, male, female, total }) => (
  <tr key={state}>
    <td className="border px-4 py-2 bg-gray-50">
      {STATE_FIPS[state as keyof typeof STATE_FIPS]}
    </td>
    {male !== undefined && (
      <td className="border px-4 py-2 text-center">{male}</td>
    )}
    {female !== undefined && (
      <td className="border px-4 py-2 text-center">{female}</td>
    )}
    <td className="border px-4 py-2 text-center">{total}</td>
  </tr>
);

const Loader: React.FC = () => <p className="text-center">Loading...</p>;
const ErrorLoading: React.FC = () => (
  <p className="text-center">
    Something went wrong during the search. Try again later or contact our
    support.
  </p>
);
const EmptyResults: React.FC = () => (
  <p className="text-center">No results found for this combination</p>
);

const App: React.FC = () => (
  <ErrorBoundary fallback={<ErrorLoading />}>
    <TableSection />
  </ErrorBoundary>
);

export default App;
