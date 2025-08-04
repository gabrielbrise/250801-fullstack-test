import React, { useState } from "react";
import { useEmploymentAPIContext } from "../context/EmploymentAPIContext";
import type { EmploymentRow } from "../types/Employment";
import STATE_FIPS from "../data/StateFips";

const TableSection: React.FC = () => {
  const { isLoaded, responseData } = useEmploymentAPIContext();
  const [sortBy, setSortBy] = useState<keyof EmploymentRow>("state");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  if (!isLoaded) return <Loader />;

  const handleSort = (col: keyof EmploymentRow) => {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  const sortedData = [...(responseData?.employment ?? [])].sort((a, b) => {
    const aVal = a[sortBy] ?? 0;
    const bVal = b[sortBy] ?? 0;
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
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

const Loader: React.FC = () => <p>Loading...</p>;
export default TableSection;
