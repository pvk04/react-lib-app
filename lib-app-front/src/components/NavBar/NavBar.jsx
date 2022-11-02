import React from "react";
import NavElement from "./NavElement/NavElement";

import styles from "./NavBar.module.css";

const Links = [
  {
    href: "/authors",
    name: "Авторы",
  },
  {
    href: "/books",
    name: "Книги",
  },
  {
    href: "/moving",
    name: "Вернуть книгу",
  },
];

function NavBar() {
  return (
    <nav>
      <ul className={styles.list}>
        {Links.map((link, id) => {
          return (
            <li key={id}>
              <NavElement href={link.href} name={link.name} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
