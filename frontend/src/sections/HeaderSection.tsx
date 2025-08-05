import React from "react";
import { ALL_STATES } from "../context/FiltersProvider";
import STATE_FIPS from "../data/StateFips";
import { useEmploymentAPIContext } from "../context/EmploymentAPIContext";

const HeaderSection: React.FC = () => {
  const { responseData, isLoaded } = useEmploymentAPIContext();

  const selectedStatesString = responseData?.selectedStates || "ALL";
  const selectedStatesArr = responseData?.selectedStates
    ? responseData.selectedStates.split(",")
    : [];
  const allStatesArr = ALL_STATES;
  const allStatesText = "All States";

  const selectedStatesTexts = selectedStatesString
    .split(",")
    .map((stateFip) => STATE_FIPS[stateFip as keyof typeof STATE_FIPS])
    .join(", ");

  const isAllStatesSelected =
    (selectedStatesArr.length === allStatesArr.length &&
      selectedStatesArr.every((state) => allStatesArr.includes(state))) ||
    selectedStatesArr.includes("ALL");

  const statesText = isAllStatesSelected ? allStatesText : selectedStatesTexts;

  const headerText = isLoaded
    ? `Employment for ${statesText} on ${responseData?.yearQuarter}`
    : "";

  return (
    <h1 className="text-2xl flex justify-center py-4 font-montserrat font-bold mt-8">
      {headerText}
    </h1>
  );
};

export default HeaderSection;
