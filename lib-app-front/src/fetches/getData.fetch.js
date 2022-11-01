export async function getData(table) {
  const data = await fetch(`http://localhost:5000/${table}`, {
    method: "GET",
    redirect: "follow",
  });
  const result = JSON.parse(await data.text());
  return result;
}
