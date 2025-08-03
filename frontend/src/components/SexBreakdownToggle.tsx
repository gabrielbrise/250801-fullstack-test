import React from "react";
import { useFiltersContext } from "../context/FiltersContext";

const SexBreakdownToggle: React.FC = () => {
  const { breakdownBySex, setBreakdownBySex } = useFiltersContext();

  return (
    <label style={{ marginLeft: "1em" }}>
      <input
        type="checkbox"
        checked={breakdownBySex}
        onChange={() => setBreakdownBySex(!breakdownBySex)}
      />
      Toggle
    </label>
  );
};

export default SexBreakdownToggle;
