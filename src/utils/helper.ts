export function formatCurrency(value: number, locale: string = "id-ID"): string {
  if (isNaN(value)) return "0";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
