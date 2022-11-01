import React from "react";
import { getData } from "../../fetches/getData.fetch";
import { formateDate } from "../../utils/formatDate.util.js";
import { AppContext } from "../../contexts/context.js";

import styles from "./Authors.module.css";

function Authors() {
  const [authors, setAuthors] = React.useState([]);
  const [state, dispatch] = React.useContext(AppContext);

  React.useEffect(() => {
    async function getAuthors() {
      const data = await getData("author");
      setAuthors(data.recordset);
      dispatch({ type: "SET_AUTHORS", payload: data.recordset });
    }
    getAuthors();
  }, []);

  return (
    <div>
      <ul className={styles.list}>
        {authors.map((author, id) => {
          return (
            <li className={styles.item} key={id}>
              <p>{author.author_name}</p>
              <p>{formateDate(author.author_birthday)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Authors;
