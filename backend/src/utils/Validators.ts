export function isValidQuarterFormat(yearQuarter: string): boolean {
  // Matches YYYY-Q[1-4], e.g., 1993-Q2
  return /^\d{4}-Q[1-4]$/.test(yearQuarter);
}

export function isValidStateFipCode(stateFipCode: string): boolean {
  // Matches exactly two digits, e.g., "01", "53"
  return /^\d{2}$/.test(stateFipCode);
}

export function isValidSexValue(sexValue: string): boolean {
  return sexValue === "0" || sexValue === "1" || sexValue === "2";
}
