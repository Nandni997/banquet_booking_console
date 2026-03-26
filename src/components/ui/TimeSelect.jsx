import { generateTimeOptions } from "../../utils/timeOptions";

const timeOptions = generateTimeOptions(30);

function convertTimeToMinutes(time) {
  if (!time || typeof time !== "string") return null;

  const match = time.trim().toUpperCase().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (!match) return null;

  let [, hours, minutes, meridian] = match;
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;

  if (meridian === "AM") {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }

  return hours * 60 + minutes;
}

function TimeSelect({
  name,
  value,
  onChange,
  placeholder = "Select time",
  minTime = null,
}) {
  const minMinutes = minTime ? convertTimeToMinutes(minTime) : null;

  const filteredOptions =
    minMinutes !== null
      ? timeOptions.filter((option) => {
          const optionMinutes = convertTimeToMinutes(option.value);
          return optionMinutes > minMinutes;
        })
      : timeOptions;

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="h-12 w-full rounded-xl border border-gray-300 px-4 bg-white"
      required
    >
      <option value="">{placeholder}</option>

      {filteredOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default TimeSelect;