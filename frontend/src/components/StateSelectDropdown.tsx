import React from "react";
import Select from "react-select";
import { useFiltersContext } from "../context/FiltersContext";
import STATE_FIPS from "../data/StateFips";

const allStatesOption = { value: "ALL", label: "All States" };
const stateOptions = Object.entries(STATE_FIPS)
  .map(([value, label]) => ({ value, label }))
  .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

const options = [allStatesOption, ...stateOptions];

const StateSelectDropdown: React.FC = () => {
  const { selectedStates, setSelectedStates } = useFiltersContext();

  // Handle blur: if nothing is selected, select "All States"
  const handleBlur = () => {
    if (selectedStates.length === 0) {
      setSelectedStates(["ALL"]);
    }
  };

  return (
    <Select
      isMulti
      options={options}
      value={
        selectedStates.includes("ALL")
          ? [allStatesOption]
          : options.filter((opt) => selectedStates.includes(opt.value))
      }
      onChange={(opts) => {
        if (opts.some((opt) => opt.value === "ALL")) {
          setSelectedStates(["ALL"]);
        } else {
          setSelectedStates(opts.map((opt) => opt.value));
        }
      }}
      onBlur={handleBlur}
      isOptionDisabled={(option) =>
        selectedStates.includes("ALL") && option.value !== "ALL"
      }
      className="min-w-[200px] grow"
    />
  );
};

export default StateSelectDropdown;
