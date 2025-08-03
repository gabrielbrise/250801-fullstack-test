import React from "react";
import StateSelectDropdown from "../components/StateSelectDropdown";
import QuarterSelectedDropdown from "../components/QuarterSelectDropdown";
import SexBreakdownToggle from "../components/SexBreakdownToggle";
import SearchButton from "../components/SearchButton";

const FilterSection: React.FC = () => {
  return (
    <div>
      <StateSelectDropdown />
      <QuarterSelectedDropdown />
      <SexBreakdownToggle />
      <SearchButton />
    </div>
  );
};

export default FilterSection;
