import React from "react";
import SelectDropdown from "./common/SelectDropdown";
import YEAR_QUARTERS from "../data/YearQuarters";
import { useFiltersContext } from "../context/FiltersContext";

const QuarterSelectDropdown: React.FC = () => {
  const { selectedQuarter, setSelectedQuarter } = useFiltersContext();

  return (
    <SelectDropdown
      value={selectedQuarter}
      onChange={(e) => setSelectedQuarter(e.target.value)}
    >
      {YEAR_QUARTERS.map((yearQuarter) => (
        <option key={yearQuarter} value={yearQuarter}>
          {yearQuarter}
        </option>
      ))}
    </SelectDropdown>
  );
};

export default QuarterSelectDropdown;
