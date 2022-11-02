import React from "react";
import { AppContext } from "../../contexts/context.js";

import styles from "./GiveBookModal.module.css";

function GiveBookModal({ active, setActive, book }) {
  const [state, dispatch] = React.useContext(AppContext);

  return <div></div>;
}

export default GiveBookModal;
