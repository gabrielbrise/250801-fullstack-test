import React, { useState } from "react";
import SelectOption from "../components/SelectOption";
import SelectDropdown from "../components/SelectDropdown";
import STATE_FIPS from "../data/StateFips";
import YEAR_QUARTERS from "../data/YearQuarters";

const FilterSection: React.FC = () => {
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <SelectDropdown
        value={dropdown1}
        onChange={(e) => setDropdown1(e.target.value)}
      >
        {Object.entries(STATE_FIPS).map(([key, value]) => (
          <SelectOption
            key={`${key}-${value}`}
            keyValue={key}
            textValue={value}
          />
        ))}
      </SelectDropdown>

      <SelectDropdown
        value={dropdown2}
        onChange={(e) => setDropdown2(e.target.value)}
      >
        {YEAR_QUARTERS.map((yearQuarter) => (
          <SelectOption
            key={yearQuarter}
            keyValue={yearQuarter}
            textValue={yearQuarter}
          />
        ))}
      </SelectDropdown>

      <label style={{ marginLeft: "1em" }}>
        <input
          type="checkbox"
          checked={toggle}
          onChange={() => setToggle((t) => !t)}
        />
        Toggle
      </label>
    </div>
  );
};

export default FilterSection;
