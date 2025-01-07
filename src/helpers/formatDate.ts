export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function displayDate(start_date: string, end_date: string) {
  if (start_date == end_date) return `${start_date}`;

  const start = start_date.split(" ");
  const end = end_date.split(" ");

  if (start[2] !== end[2]) {
    return `${start} - ${end}`;
  } else {
    return `${start[0]} ${start[1]} - ${end.join(" ")}`;
  }
}

export const toIDstring = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
