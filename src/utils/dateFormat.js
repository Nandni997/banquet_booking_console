export function formatDisplayDate(dateString) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatWeekLabel(dates = []) {
  if (!dates.length) return "";
  return `${formatDisplayDate(dates[0])} - ${formatDisplayDate(
    dates[dates.length - 1]
  )}`;
}