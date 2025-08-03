import React from "react";

interface TableRow {
  state: string;
  male: number;
  female: number;
  total: number;
}

interface TableSectionProps {
  data: TableRow[];
  sexValue: string; // "0" = hide Male/Female, "1" = show Male, "2" = show Female, "all" = show both
}

const TableSection: React.FC<TableSectionProps> = ({ data, sexValue }) => {
  const showMale = sexValue === "1" || sexValue === "all";
  const showFemale = sexValue === "2" || sexValue === "all";

  return (
    <table className="min-w-full border border-gray-300 mt-6">
      <thead>
        <tr>
          <th className="border px-4 py-2">State</th>
          {sexValue !== "0" && <th className="border px-4 py-2">Male</th>}
          {sexValue !== "0" && <th className="border px-4 py-2">Female</th>}
          <th className="border px-4 py-2">Total Employment</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.state}>
            <td className="border px-4 py-2 bg-gray-50">{row.state}</td>
            {sexValue !== "0" && (
              <td className="border px-4 py-2">{row.male}</td>
            )}
            {sexValue !== "0" && (
              <td className="border px-4 py-2">{row.female}</td>
            )}
            <td className="border px-4 py-2">{row.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSection;
