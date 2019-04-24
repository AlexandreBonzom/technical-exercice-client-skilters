import React from "react";

const Header = props => {
  return (
    <header>
      {props.firstName}
      {"   "}
      {props.lastName}
    </header>
  );
};

export default Header;
