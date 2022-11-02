import express, { json } from "express";
import cors from "cors";
import mssql from "mssql/msnodesqlv8.js";
import format from "date-format";

const app = express();
let connect;

app.use(
  json({
    type: ["application/json", "text/plain", "charset=utf-8"],
  }),
  cors()
);

// GET запрос на получение дыннах таблицы
app.get("/:table", async (req, res) => {
  const table = req.params.table;
  return await connect.query(`select * from ${table};`).then((resp) => {
    res.send(resp);
  });
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

// POST выдать книгу
app.post("/books/:id_book/give", async (req, res) => {
  const id = req.params.id_book;
  const reader = req.body.reader;
  const amount = req.body.amount;

  // if (id && reader && amount && Object.keys(req.body).length == 2) {
  return await connect
    .query(
      `INSERT INTO moving_b(book_id, reader_id, amount) VALUES(${id}, ${reader}, ${amount})`
    )
    .then((resp) => {
      res.send(resp);
    });
  // } else {
  //   res.status(400).json({ message: "Что-то пошло не так" });
  // }
});

// PUT возврат книги
app.put("/book/:id_moving/return", async (req, res) => {
  console.log(res.header);

  const id = req.params.id_moving;
  const date_return = format("yyyy-MM-dd", new Date(req.body.date));
  const now = format("yyyy-MM-dd", new Date());
  const isReturned = await connect.query(
    `select date_fact from moving_b where moving_id = ${id};`
  );

  if (
    date_return &&
    Object.keys(req.body).length == 1 &&
    date_return >= now &&
    isReturned.recordset[0]["date_fact"] === null
  ) {
    await connect.query(
      `UPDATE moving_b SET date_fact = '${date_return}' WHERE moving_id = ${id};`
    );

    // res.setHeader("content-type", "application/json");
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
