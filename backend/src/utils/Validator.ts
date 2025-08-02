export function isValidQuarterFormat(input: string): boolean {
  // Matches YYYY-Q[1-4], e.g., 1993-Q2
  return /^\d{4}-Q[1-4]$/.test(input);
}
