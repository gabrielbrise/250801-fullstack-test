import React from "react";

type SelectDropdownProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  children,
  ...props
}) => {
  return (
    <select
      className="border border-gray-300 rounded px-3 py-2 mr-2"
      {...props}
    >
      {children}
    </select>
  );
};

export default SelectDropdown;
