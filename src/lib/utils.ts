/**
 * Lightweight className joiner. Filters falsy values and joins with spaces.
 *
 * We intentionally avoid clsx/tailwind-merge (no extra deps): component variant
 * maps below never emit conflicting utilities for the same property, so simple
 * concatenation is sufficient. Author later classes to win by ordering, not by
 * relying on merge resolution.
 */
type ClassValue = string | number | false | null | undefined;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
