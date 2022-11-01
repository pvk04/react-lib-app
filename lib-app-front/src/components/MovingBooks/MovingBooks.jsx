import React from "react";
import { AppContext } from "../../contexts/context";
import { getData } from "../../fetches/getData.fetch";
import { formateDate } from "../../utils/formatDate.util";

function MovingBooks() {
  const [state, dispatch] = React.useContext(AppContext);
  const [moving, setMoving] = React.useState([]);
  const [books, setBooks] = React.useState([]);
  const [readers, setReaders] = React.useState([]);

  function renderBook(book_id) {
    for (let book of books) {
      if (book.book_id === book_id) return book.book_name;
    }
  }

  function renderReader(reader_id) {
    for (let reader of readers) {
      if (reader.reader_id === reader_id) return reader.fio;
    }
  }

  function returnBook(moving_id) {
    // TODO
  }

  React.useEffect(() => {
    async function getMoving() {
      // SET MOVING
      const data = await getData("moving_b");
      setMoving(data.recordset);

      // SET BOOKS
      if (state.books.length !== 0) {
        console.log(state.books.length);
        setBooks(state.books);
      } else {
        const data = await getData("book");
        setBooks(data.recordset);
        dispatch({ type: "SET_BOOKS", payload: data.recordset });
      }

      // SET READERS
      if (state.readers.length !== 0) setReaders(state.readers);
      else {
        const data = await getData("reader");
        setReaders(data.recordset);
        dispatch({ type: "SET_READERS", payload: data.recordset });
      }
    }
    getMoving();
  }, []);

  return (
    <div>
      <ul>
        {moving.map((element, id) => {
          return (
            <li key={id}>
              <p>Книга: {renderBook(element.book_id)}</p>
              <p>Читатель: {renderReader(element.reader_id)}</p>
              <p>Количество: {element.amount}</p>
              <p>Дата взятия: {formateDate(element.date_out)}</p>
              <p>Дата возврата: {formateDate(element.date_in)}</p>
              <p>
                Дата фактического возврата:{" "}
                {element.date_fact
                  ? formateDate(element.date_fact)
                  : "еще не вернули"}
              </p>
              {!element.date_fact ? <button>Вернуть</button> : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MovingBooks;
