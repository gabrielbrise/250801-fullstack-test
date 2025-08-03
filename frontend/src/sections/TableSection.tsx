import React from "react";
import { useFiltersContext } from "../context/FiltersContext";
import { useEmploymentAPIContext } from "../context/EmploymentAPIContext";
import type { EmploymentRow } from "../types/Employment";

const TableSection: React.FC = () => {
  const { breakdownBySex } = useFiltersContext();
  const { isLoaded, responseData } = useEmploymentAPIContext();

  return isLoaded ? (
    <table className="min-w-full border border-gray-300 mt-6">
      <thead>
        <tr>
          <th className="border px-4 py-2">State</th>
          {breakdownBySex && <th className="border px-4 py-2">Male</th>}
          {breakdownBySex && <th className="border px-4 py-2">Female</th>}
          <th className="border px-4 py-2">Total Employment</th>
        </tr>
      </thead>
      <tbody>
        {responseData.map((row) => (
          <TableRow {...row} key={row.state} />
        ))}
      </tbody>
    </table>
  ) : (
    <Loader />
  );
};

const TableRow: React.FC<EmploymentRow> = ({ state, male, female, total }) => (
  <tr key={state}>
    <td className="border px-4 py-2 bg-gray-50">{state}</td>
    {male !== undefined && <td className="border px-4 py-2">{male}</td>}
    {female !== undefined && <td className="border px-4 py-2">{female}</td>}
    <td className="border px-4 py-2">{total}</td>
  </tr>
);

const Loader: React.FC = () => <p>Loading...</p>;
export default TableSection;
