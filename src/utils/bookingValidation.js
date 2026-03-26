function convertToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return null;

  const trimmed = timeStr.trim();

  // 24-hour format: HH:mm
  const match = trimmed.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  if (!match) return null;

  const [, hours, minutes] = match;
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

export function validateBookingTimeRange(startTime, endTime) {
  const start = convertToMinutes(startTime);
  const end = convertToMinutes(endTime);

  if (start === null || end === null) {
    return {
      valid: false,
      message: "Please enter valid time in 24-hour format like 18:00",
    };
  }

  if (start >= end) {
    return {
      valid: false,
      message: "End time must be later than start time",
    };
  }

  return {
    valid: true,
    start,
    end,
  };
}

export function findBookingConflict({
  bookings,
  hallId,
  date,
  startTime,
  endTime,
  excludeBookingId = null,
}) {
  const timeValidation = validateBookingTimeRange(startTime, endTime);

  if (!timeValidation.valid) {
    return {
      hasConflict: true,
      type: "invalid_time",
      message: timeValidation.message,
    };
  }

  const requestedStart = timeValidation.start;
  const requestedEnd = timeValidation.end;

  const conflictingBooking = bookings.find((booking) => {
    if (excludeBookingId && booking.id === excludeBookingId) return false;
    if (booking.hallId !== hallId) return false;
    if (booking.date !== date) return false;
    if (booking.status === "cancelled") return false;

    const existingValidation = validateBookingTimeRange(
      booking.startTime,
      booking.endTime
    );

    if (!existingValidation.valid) return false;

    const existingStart = existingValidation.start;
    const existingEnd = existingValidation.end;

    return requestedStart < existingEnd && requestedEnd > existingStart;
  });

  if (conflictingBooking) {
    return {
      hasConflict: true,
      type: "overlap",
      conflictBooking: conflictingBooking,
      message: `${conflictingBooking.customerName} already booked this hall from ${conflictingBooking.startTime} to ${conflictingBooking.endTime}`,
    };
  }

  return {
    hasConflict: false,
    type: null,
    message: "",
  };
}