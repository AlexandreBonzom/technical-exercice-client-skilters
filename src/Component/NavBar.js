import React from "react";

const NavBar = props => {
  return (
    <nav>
      <button onClick={props.handleListUsersDisplay}>
        Liste des utilisateurs
      </button>
      <button onClick={props.removeToken}>Se déconnecter</button>
    </nav>
  );
};

export default NavBar;
