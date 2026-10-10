/* Tin-toy illustrations for projects without screenshots. Decorative: the
   plate's title carries the meaning. Drop a real screenshot into
   public/work/<slug>/ and set `image` in site.ts to replace one. */

function Quiz() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="h-full w-full">
      <rect width="320" height="200" fill="var(--color-teal)" />
      <g transform="rotate(-4 150 104)">
        <rect x="58" y="34" width="176" height="140" rx="14" fill="var(--color-paper)" stroke="var(--color-enamel)" strokeWidth="4" />
        {[0, 1, 2].map((row) => {
          const y = 62 + row * 36;
          const ticked = row < 2;
          return (
            <g key={row}>
              <rect x="78" y={y - 11} width="22" height="22" rx="5" fill={ticked ? "var(--color-mustard)" : "var(--color-tin)"} stroke="var(--color-enamel)" strokeWidth="3" />
              {ticked && <path d={`M83 ${y} l5 5 l9 -10`} fill="none" stroke="var(--color-enamel)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />}
              <rect x="112" y={y - 5} width={row === 1 ? 74 : 98} height="10" rx="5" fill="var(--color-enamel)" opacity="0.8" />
            </g>
          );
        })}
      </g>
      {/* The bee */}
      <g transform="translate(250 58) rotate(14)">
        <ellipse cx="-10" cy="-16" rx="13" ry="9" fill="var(--color-paper)" stroke="var(--color-enamel)" strokeWidth="3" />
        <ellipse cx="8" cy="-17" rx="11" ry="8" fill="var(--color-paper)" stroke="var(--color-enamel)" strokeWidth="3" />
        <ellipse cx="0" cy="0" rx="26" ry="18" fill="var(--color-mustard)" stroke="var(--color-enamel)" strokeWidth="3.5" />
        <path d="M-8 -16 v32 M6 -17 v34" stroke="var(--color-enamel)" strokeWidth="6" />
        <circle cx="19" cy="-4" r="3" fill="var(--color-enamel)" />
      </g>
      <path d="M200 92 q12 -22 34 -26" fill="none" stroke="var(--color-paper)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
    </svg>
  );
}

function Inventory() {
  const crate = (x: number, y: number, w: number, h: number) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="var(--color-mustard)" stroke="var(--color-enamel)" strokeWidth="4" />
      <path d={`M${x + 8} ${y + h / 2} H${x + w - 8}`} stroke="var(--color-enamel)" strokeWidth="3" opacity="0.35" />
    </g>
  );
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="h-full w-full">
      <rect width="320" height="200" fill="var(--color-tin-deep)" />
      <path d="M30 172 H290" stroke="var(--color-enamel)" strokeWidth="5" strokeLinecap="round" />
      {crate(62, 112, 92, 60)}
      {crate(160, 112, 92, 60)}
      {crate(108, 52, 96, 60)}
      {/* Barcode label on the top crate */}
      <rect x="126" y="66" width="60" height="32" rx="4" fill="var(--color-paper)" stroke="var(--color-enamel)" strokeWidth="2.5" />
      {[0, 5, 8, 14, 18, 21, 27, 31, 36, 40, 45].map((dx, i) => (
        <rect key={dx} x={132 + dx} y="71" width={i % 3 === 0 ? 3 : 1.6} height="22" fill="var(--color-enamel)" />
      ))}
      {/* Low-stock lamp */}
      <circle cx="262" cy="56" r="13" fill="var(--color-tomato)" stroke="var(--color-enamel)" strokeWidth="3.5" />
      <path d="M262 50 v7 M262 61 v1" stroke="var(--color-paper)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlateArt({ kind }: { kind: "quiz" | "inventory" }) {
  return kind === "quiz" ? <Quiz /> : <Inventory />;
}
