import { gearPath } from "@/components/machine/Contraption";
import { cn } from "@/lib/utils";

const OUTLINE = gearPath(12, 12, 11, 8);

/** Small 8-tooth gear glyph; colour comes from `currentColor`. */
export function GearIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d={OUTLINE} fill="currentColor" />
      <circle cx="12" cy="12" r="3.6" fill="var(--color-tin)" />
    </svg>
  );
}
