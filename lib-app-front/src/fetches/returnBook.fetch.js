export async function returnBook(id_moving) {
  const data = await fetch(`http://localhost:5000/book/${id_moving}/return`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({
      date: new Date(),
    }),
  });
  return data;
}
