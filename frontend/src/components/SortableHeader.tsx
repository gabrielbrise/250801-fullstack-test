import React from "react";
import type { EmploymentRow } from "../types/Api";

interface SortableHeaderProps {
  column: keyof EmploymentRow;
  onClick: (column: keyof EmploymentRow) => void;
  children: React.ReactNode;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  column,
  onClick,
  children,
}) => (
  <th
    className="border px-4 py-2 cursor-pointer hover:bg-gray-100"
    onClick={() => onClick(column)}
  >
    {children}
  </th>
);

export default SortableHeader;
