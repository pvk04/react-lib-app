import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavElement.module.css";

function NavElement({ href, name }) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link
      }
      to={href}
    >
      <span>{name}</span>
    </NavLink>
  );
}

export default NavElement;
