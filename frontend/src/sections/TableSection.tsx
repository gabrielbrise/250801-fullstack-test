import React, { useEffect, useState } from "react";

interface EmploymentRow {
  state: string;
  male?: number;
  female?: number;
  total: number;
}

const TableSection: React.FC = () => {
  const sexValue = "0";

  const [isLoaded, setIsLoaded] = useState(false);
  const [responseData, setResponseData] = useState<EmploymentRow[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/employment?state=00&yearQuarter=2023-Q4&sex=0")
      .then((res) => res.json())
      .then((res) => setResponseData(parseEmploymentData(res.employment)))
      .then(() => setIsLoaded(true));
  }, []);

  function parseEmploymentData(data: string[][]): EmploymentRow[] {
    return data.map(([total, time, sex, state]) => ({
      total: Number(total),
      time,
      sex: Number(sex),
      state: String(state),
    }));
  }

  return isLoaded ? (
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
        {responseData.map((row) => (
          <TableRow {...row} />
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
