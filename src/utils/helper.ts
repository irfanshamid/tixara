export function formatCurrency(value: number, locale: string = "id-ID"): string {
  if (isNaN(value)) return "0";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
export function getJakartaTime(): string {
  const now = new Date();
  const jakartaOffset = 7; // jam
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth(); // 0-11
  const utcDate = now.getUTCDate();
  const utcHour = now.getUTCHours();
  const utcMinute = now.getUTCMinutes();
  const utcSecond = now.getUTCSeconds();
  const utcMs = now.getUTCMilliseconds();

  // Tambahkan offset Jakarta
  let hour = utcHour + jakartaOffset;
  let day = utcDate;
  let month = utcMonth;
  let year = utcYear;

  // Handle overflow jam -> hari
  if (hour >= 24) {
    hour -= 24;
    day += 1;
  }

  // Handle overflow hari -> bulan
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  if (day > daysInMonth) {
    day = 1;
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }

  // Format 2 digit
  const pad = (n: number) => n.toString().padStart(2, "0");
  const padMs = (n: number) => n.toString().padStart(3, "0");

  return `${year}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(utcMinute)}:${pad(utcSecond)}.${padMs(utcMs)}Z`;
}
