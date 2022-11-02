import React from "react";
import { AppContext } from "../../contexts/context.js";
import { getData } from "../../fetches/getData.fetch.js";
import { getBook } from "../../fetches/getBook.fetch.js";

function Books() {
  const [state, dispatch] = React.useContext(AppContext);
  const [books, setBooks] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [genres, setGenres] = React.useState([]);

  function renderAuthor(id_author) {
    for (let author of authors) {
      if (author.author_id === id_author) return author.author_name;
    }
  }

  function renderGenre(id_genre) {
    for (let genre of genres) {
      if (genre.genre_id === id_genre) return genre.name_genre;
    }
  }

  async function giveAwayBook(book_id) {
    const resp = await getBook(book_id, 1, 1);
    alert(resp);
  }

  React.useEffect(() => {
    async function getBooks() {
      // GET BOOKS
      if (state.books.length !== 0) setBooks(state.books);
      else {
        const books = await getData("book");
        setBooks(books.recordset);
        dispatch({ type: "SET_BOOKS", payload: books.recordset });
      }

      // GET AUTHORS
      if (state.authors.length !== 0) setAuthors(state.authors);
      else {
        const authors = await getData("author");
        setAuthors(authors.recordset);
        dispatch({ type: "SET_AUTHORS", payload: authors.recordset });
      }

      // GET GENRES
      if (state.genres.length !== 0) setGenres(state.genres);
      else {
        const genres = await getData("genre");
        setGenres(genres.recordset);
        dispatch({ type: "SET_GENRES", payload: genres.recordset });
      }
    }
    getBooks();
  }, []);

  return (
    <div>
      <ul>
        {books.map((book, id) => {
          return (
            <li key={id}>
              <p>{book.book_name}</p>
              <p>Автор: {renderAuthor(book.author_id)}</p>
              <p>Жанр: {renderGenre(book.genre_id)}</p>
              <p>В наличии: {book.amount}</p>
              {book.amount > 0 ? (
                <button
                  onClick={() => {
                    giveAwayBook(book.book_id);
                  }}
                >
                  Выдать
                </button>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Books;
