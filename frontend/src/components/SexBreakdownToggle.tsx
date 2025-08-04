import React from "react";
import { useFiltersContext } from "../context/FiltersContext";

const SexBreakdownToggle: React.FC = () => {
  const { breakdownBySex, setBreakdownBySex } = useFiltersContext();

  return (
    <label className="flex">
      Breakdown By Sex
      <input
        className="size-6 ml-2"
        type="checkbox"
        checked={breakdownBySex}
        onChange={() => setBreakdownBySex(!breakdownBySex)}
      />
    </label>
  );
};

export default SexBreakdownToggle;
