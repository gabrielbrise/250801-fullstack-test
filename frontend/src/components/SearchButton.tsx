import React from "react";
import { useEmploymentAPIContext } from "../context/EmploymentAPIContext";

const SearchButton: React.FC = () => {
  const { searchEmploymentData } = useEmploymentAPIContext();

  return (
    <button
      className="rounded-2xl px-4 py-2 mr-2 pb-2.5 bg-gray-800 text-gray-50 font-bold hover:bg-gray-500 hover:cursor-pointer transition-all duration-250"
      onClick={() => searchEmploymentData()}
    >
      Search
    </button>
  );
};

export default SearchButton;
