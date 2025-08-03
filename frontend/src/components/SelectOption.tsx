import React from "react";

interface SelectOptionProps {
  keyValue: string;
  textValue: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  keyValue,
  textValue,
}: SelectOptionProps) => {
  return (
    <option className="text-gray-950" value={keyValue}>
      {textValue}
    </option>
  );
};

export default SelectOption;
