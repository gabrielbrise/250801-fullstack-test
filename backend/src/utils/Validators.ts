export function isValidQuarterFormat(yearQuarter: string): boolean {
  // Matches YYYY-Q[1-4], e.g., 1993-Q2
  return /^\d{4}-Q[1-4]$/.test(yearQuarter);
}

export function isValidStateFipCode(stateFipCode: string): boolean {
  // Accepts one or more two-digit codes separated by commas, e.g., "01" or "01,02,04"
  return /^(\d{2})(,\d{2})*$/.test(stateFipCode);
}

export function isValidSexValue(sexValue: string): boolean {
  return sexValue === "0" || sexValue === "1" || sexValue === "2";
}
