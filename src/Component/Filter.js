import React from "react";

const Filter = props => {
  return (
    <div className="filter-container">
      Rechercher par nom ou prénom:
      <input
        type="text"
        onChange={props.handleChangeFilter}
        value={props.filterName}
        name="filterName"
      />
    </div>
  );
};

export default Filter;
