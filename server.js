import express, { json } from "express";
import mssql from "mssql/msnodesqlv8.js";
import format from "date-format";

const app = express();
let connect;

app.use(json());

// GET запрос на получение дыннах таблицы
app.get("/:table", async (req, res) => {
  const table = req.params.table;
  return await connect
    .query(`select * from ${table};`)
    .then((resp) => res.send(resp));
});

// POST создание нового автора
app.post("/author/new", async (req, res) => {
  const author_name = req.body.name;
  const author_birthday = req.body.birthday;

  if (
    author_name &&
    author_birthday &&
    typeof author_name == "string" &&
    Object.keys(req.body).length == 2
  ) {
    await connect.query(
      `INSERT INTO author(author_name, author_birthday) VALUES('${author_name}', '${author_birthday}');`
    );
    return res.status(201).json({ message: "Автор успешно создан" });
  } else return res.status(400).json({ message: "Что-то пошло не так" });
});

// POST создание нового жанра
app.post("/genre/new", async (req, res) => {
  const genre_name = req.body.name;

  if (
    genre_name &&
    typeof genre_name == "string" &&
    Object.keys(req.body).length == 1
  ) {
    await connect.query(
      `INSERT INTO genre(name_genre) VALUES('${genre_name}');`
    );
    return res.status(200).json({ message: "Жанр успешно создан" });
  } else return res.status(400).json({ message: "Что-то пошло не так" });
});

// PUT возврат книги
app.put("/mybook/:id_book/return", async (req, res) => {
  const id = req.params.id_book;
  const date_return = format("yyyy-MM-dd", new Date(req.body.date));
  const now = format("yyyy-MM-dd", new Date());
  /// NE ROBIT
  if (date_return && Object.keys(req.body).length == 1 && date_return >= now) {
    await connect.query(
      `UPDATE moving_b SET date_fact = ${date_return} WHERE moving_id = ${id};`
    );
    return res.status(200).json({ message: "Книга успешно возвращена" });
  } else return res.status(400).json({ message: "Что-то пошло не так" });
});

app.listen(5000, async () => {
  try {
    connect = await mssql.connect({
      database: "gromlibfin",
      server: "DESKTOP-76KDT0O",
      driver: "msnodesqlv8",
      options: {
        trustedConnection: true,
      },
    });
  } catch (e) {
    console.log(e);
  }

  console.log("SERVER STARTED");
});
