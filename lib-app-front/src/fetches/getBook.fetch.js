export async function getBook(id_book, reader, amount) {
  const result = await fetch(`http://localhost:5000/books/${id_book}/give`, {
    method: "POST",
    body: JSON.stringify({
      reader,
      amount,
    }),
  });

  return result;
}
