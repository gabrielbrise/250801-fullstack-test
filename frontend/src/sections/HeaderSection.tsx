import React from "react";
import { useFiltersContext } from "../context/FiltersContext";

const HeaderSection: React.FC = () => {
  const { selectedStates, selectedQuarter } = useFiltersContext();

  return (
    <h1 className="text-2xl">
      Employment for {selectedStates.join(", ")} on {selectedQuarter}
    </h1>
  );
};

export default HeaderSection;
