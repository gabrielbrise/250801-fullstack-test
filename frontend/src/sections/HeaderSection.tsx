import React from "react";
import { useFiltersContext } from "../context/FiltersContext";
import { ALL_STATES } from "../context/FiltersProvider";
import STATE_FIPS from "../data/StateFips";

const HeaderSection: React.FC = () => {
  const { selectedStates, selectedQuarter } = useFiltersContext();

  const allStatesString = ALL_STATES.join(", ");
  const selectedStatesString = selectedStates.join(", ");
  const selectedStatesTexts = selectedStates
    .map((stateFip) => STATE_FIPS[stateFip as keyof typeof STATE_FIPS])
    .join(", ");

  const isAllStatesSelected =
    allStatesString == selectedStatesString || selectedStates.includes("ALL");
  const statesText = isAllStatesSelected ? "All States" : selectedStatesTexts;

  return (
    <h1 className="text-2xl flex justify-center py-8 font-montserrat font-bold">
      Employment for {statesText} on {selectedQuarter}
    </h1>
  );
};

export default HeaderSection;
