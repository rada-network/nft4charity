type TimeType = "milisecond" | "second" | "minute" | "hour" | "day";

export function getTimeToNow(
  datetime: string | Date | number,
  timeType: TimeType,
): number {
  const startDate = new Date(datetime);
  const today = new Date();

  const miliseconds = today.getTime() - startDate.getTime();
  const seconds = miliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 25;

  switch (timeType) {
    case "milisecond":
      return miliseconds;

    case "second":
      return seconds;

    case "minute":
      return minutes;

    case "hour":
      return hours;

    default:
      return days;
  }
}
