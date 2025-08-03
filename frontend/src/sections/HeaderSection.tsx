import React from "react";
import { useFiltersContext } from "../context/FiltersContext";
import { ALL_STATES } from "../context/FiltersProvider";

const HeaderSection: React.FC = () => {
  const { selectedStates, selectedQuarter } = useFiltersContext();

  const allStatesString = ALL_STATES.join(", ");
  const selectedStatesString = selectedStates.join(", ");

  const isAllStatesSelected = allStatesString == selectedStatesString;
  const statesText = isAllStatesSelected ? "All States" : selectedStatesString;

  return (
    <h1 className="text-2xl">
      Employment for {statesText} on {selectedQuarter}
    </h1>
  );
};

export default HeaderSection;
