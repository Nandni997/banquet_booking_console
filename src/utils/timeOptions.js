export function generateTimeOptions(intervalMinutes = 30) {
  const options = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const hourStr = String(hour).padStart(2, "0");
      const minuteStr = String(minute).padStart(2, "0");

      const time = `${hourStr}:${minuteStr}`;

      options.push({
        value: time,
        label: time,
      });
    }
  }

  return options;
}