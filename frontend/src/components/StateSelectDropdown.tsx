import React from "react";
import SelectDropdown from "./SelectDropdown";
import { useFiltersContext } from "../context/FiltersContext";
import STATE_FIPS from "../data/StateFips";

const StateSelectDropdown: React.FC = () => {
  const { selectedStates, setSelectedStates } = useFiltersContext();

  return (
    <SelectDropdown
      multiple
      value={selectedStates}
      onChange={(e) =>
        setSelectedStates(
          Array.from(e.target.selectedOptions, (option) => option.value)
        )
      }
    >
      {Object.entries(STATE_FIPS).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </SelectDropdown>
  );
};

export default StateSelectDropdown;
