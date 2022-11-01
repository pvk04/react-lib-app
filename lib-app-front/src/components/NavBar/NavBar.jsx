import React from "react";
import NavElement from "./NavElement/NavElement";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavElement href={"/authors"} name={"Авторы"} />
        </li>
        <li>
          <NavElement href={"/books"} name={"Книги"} />
        </li>
        <li>
          <NavElement href={"/moving"} name={"Движение книг"} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
