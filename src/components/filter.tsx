"use client";

import { ChangeEvent, useState } from "react";

const Filter = ({
  propertyToFilter,
  options,
  handleFilter,
}: {
  propertyToFilter: keyof Character;
  options: string[];
  handleFilter: (filterValue: string, propertyToFilter: string) => void;
}) => {
  const [filterValue, setFilterValue] = useState("");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilterValue(value);
    handleFilter(value, propertyToFilter);
  };

  const label =
    propertyToFilter.charAt(0).toUpperCase() + propertyToFilter.slice(1);

  return (
    <label className="form-control w-full max-w-xs flex flex-row gap-2">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className="select select-bordered w-full max-w-xs"
        value={filterValue}
        onChange={handleSelectChange}
      >
        <option value={""}>all</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Filter;
