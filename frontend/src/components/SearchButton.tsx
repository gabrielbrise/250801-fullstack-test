import React from "react";
import { useEmploymentAPIContext } from "../context/EmploymentAPIContext";

const SearchButton: React.FC = () => {
  const { searchEmploymentData } = useEmploymentAPIContext();

  return <button onClick={() => searchEmploymentData()}>Search</button>;
};

export default SearchButton;
