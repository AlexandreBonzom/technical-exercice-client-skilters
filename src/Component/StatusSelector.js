import React from "react";

const StatusSelector = props => {
  return (
    <div className="filter-container">
      Filtrer par status :
      <select
        value={props.filterSatus}
        onChange={props.handleChangeFilter}
        name="filterStatus"
      >
        <option value="All">Tous</option>
        <option value="Valid">Validé</option>
        <option value="Invalid">Non Validé</option>
        <option value="Active">Actif</option>
      </select>
    </div>
  );
};

export default StatusSelector;
