import React from "react";
import { useEmploymentAPIContext } from "../context/EmploymentAPIContext";
import type { EmploymentRow } from "../types/Employment";
import STATE_FIPS from "../data/StateFips";

const TableSection: React.FC = () => {
  const { isLoaded, responseData } = useEmploymentAPIContext();
  const breakdownBySexData =
    responseData.length > 0 && (responseData[0].male || responseData[0].female);

  return isLoaded ? (
    <table className="min-w-full border border-gray-300 mt-6">
      <thead>
        <tr>
          <th className="border px-4 py-2">State</th>
          {breakdownBySexData && <th className="border px-4 py-2">Male</th>}
          {breakdownBySexData && <th className="border px-4 py-2">Female</th>}
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
