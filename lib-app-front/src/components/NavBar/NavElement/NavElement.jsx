import React from "react";
import { NavLink } from "react-router-dom";

function NavElement({ href, name }) {
  return (
    <NavLink to={href}>
      <span>{name}</span>
    </NavLink>
  );
}

export default NavElement;
