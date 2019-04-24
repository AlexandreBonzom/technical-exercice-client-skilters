import React from "react";
import format from "date-fns/format";

const statusTranslation = englishStatus => {
  if (englishStatus === "Valid") {
    return "Validé";
  } else if (englishStatus === "Invalid") {
    return "Non validé";
  } else if (englishStatus === "Active") {
    return "Actif";
  }
};

const ArrayUsers = props => {
  if (props.arrayUsers) {
    return (
      <div className="array-result">
        {" "}
        <ul>
          <li key="first-row" className="first-row">
            <span className="cell">
              Prénom{" "}
              <i
                className="fas fa-sort-alpha-down"
                onClick={() => props.handleSortedName("firstName")}
              />
            </span>
            <span className="cell">
              Nom{" "}
              <i
                className="fas fa-sort-alpha-down"
                onClick={() => props.handleSortedName("lastName")}
              />
            </span>
            <span className="cell">Secteur d'activité</span>
            <span className="cell">Date de disponibilité</span>
            <span className="cell">Email</span>
            <span className="cell">Téléphone</span>
            <span className="cell">Status</span>
          </li>
          {props.arrayUsers.map(user => {
            return (
              <li key={user._id}>
                <span className="cell">{user.public.firstName}</span>
                <span className="cell">{user.public.lastName}</span>
                <span className="cell">{user.public.activitySectors}</span>
                <span className="cell">
                  {format(user.public.availableDate, "DD/MM/YYYY")}
                </span>
                <span className="cell">{user.public.email}</span>
                <span className="cell">{user.public.telephone}</span>
                <span className="cell">
                  {statusTranslation(user.public.status)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div />;
  }
};

export default ArrayUsers;
