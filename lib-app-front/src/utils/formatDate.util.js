import format from "date-format";

export function formateDate(date) {
  const dateObj = new Date(date);
  const resDate = format("dd.MM.yyyy", dateObj);

  return resDate;
}
