import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, loading, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center ${isActive ? "bg-dark" : ""}`}
    >
      <div
        className={`text-5xl p-5 rounded-full cursor-pointer ${
          isActive ? "bg-dark" : "bg-yellow-500"
        }`}
      >
        {loading ? <div>Loading...</div> : <CiForkAndKnife />}
      </div>
      <p
        className={`text-center font-medium my-1 capitalize ${
          isActive ? "text-white" : ""
        }`}
      >
        {category}
      </p>
    </div>
  );
};

export default FilterProduct;
