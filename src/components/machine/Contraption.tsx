/* The tin-toy machine. Pure SVG, no logic: MachineHero's timeline targets
   these ids and classes. Station lamps sit at the centre of each quarter
   (x = 150, 450, 750, 1050) so the 4-column caption row lines up below them.
   Lamps are lit in markup; the animation unlights them first, so the static
   (reduced-motion / no-JS) diagram reads as a finished run. */

export const STATIONS = [
  { x: 150, y: 250 },
  { x: 450, y: 210 },
  { x: 750, y: 270 },
  { x: 1050, y: 230 },
] as const;

export const GEARS = {
  gearA: { cx: 300, cy: 318, r: 58, teeth: 12 },
  gearB: { cx: 612, cy: 300, r: 44, teeth: 9 },
  gearC: { cx: 905, cy: 322, r: 52, teeth: 11 },
} as const;

const SEGMENTS = [
  "M66 92 C66 176 98 250 150 250",
  "M150 250 C226 250 246 338 306 338 C366 338 388 210 450 210",
  "M450 210 L548 210 C608 210 626 148 596 118 C566 88 522 116 532 158 C542 200 606 218 656 230 C708 242 716 270 750 270",
  "M750 270 C822 270 838 186 900 186 C962 186 986 230 1050 230",
];

/** Trapezoid-toothed gear outline centred on (cx, cy). Tooth depth is 0.18·r. */
export function gearPath(cx: number, cy: number, r: number, teeth: number): string {
  const root = r * 0.82;
  const step = (Math.PI * 2) / teeth;
  const at = (radius: number, angle: number) =>
    `${(cx + radius * Math.cos(angle)).toFixed(1)} ${(cy + radius * Math.sin(angle)).toFixed(1)}`;

  let d = `M${at(root, 0)}`;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += ` L${at(r, a + step * 0.18)} L${at(r, a + step * 0.42)} L${at(root, a + step * 0.6)}`;
    d += ` A${root.toFixed(1)} ${root.toFixed(1)} 0 0 1 ${at(root, a + step)}`;
  }
  return `${d} Z`;
}

function Gear({
  id,
  fill,
  spin,
}: {
  id: keyof typeof GEARS;
  fill: string;
  spin: "idle-spin" | "idle-spin-reverse";
}) {
  const { cx, cy, r, teeth } = GEARS[id];
  return (
    <g id={id}>
      <g className={spin}>
        <path d={gearPath(cx, cy, r, teeth)} fill={fill} />
        <circle cx={cx} cy={cy} r={r * 0.34} fill="var(--color-tin)" />
        <circle cx={cx} cy={cy} r={r * 0.12} fill="var(--color-enamel)" />
        <rect x={cx - 2} y={cy - r * 0.7} width="4" height={r * 0.32} rx="2" fill="var(--color-tin)" opacity="0.7" />
      </g>
    </g>
  );
}

export function Contraption({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 400"
      role="img"
      aria-label="A toy machine: a ball rolls through gears from an email to a finished task"
      className={className}
      overflow="visible"
    >
      {/* Table and posts */}
      <path d="M24 384 H1176" stroke="var(--color-enamel)" strokeWidth="6" strokeLinecap="round" />
      {STATIONS.map(({ x, y }) => (
        <path key={x} d={`M${x} ${y + 14} V384`} stroke="var(--color-enamel)" strokeWidth="4" opacity="0.35" />
      ))}

      <Gear id="gearA" fill="var(--color-mustard)" spin="idle-spin" />
      <Gear id="gearB" fill="var(--color-teal)" spin="idle-spin-reverse" />
      <Gear id="gearC" fill="var(--color-enamel)" spin="idle-spin" />

      {/* Chute */}
      <path
        id="chute"
        d="M18 18 H114 L80 74 V96 H52 V74 Z"
        fill="var(--color-tomato)"
        stroke="var(--color-enamel)"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Track: four segments, one continuous rail */}
      {SEGMENTS.map((d, i) => (
        <path
          key={d}
          id={`seg${i + 1}`}
          d={d}
          fill="none"
          stroke="var(--color-enamel)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      ))}

      {/* Station lamps */}
      {STATIONS.map(({ x, y }, i) => (
        <g key={x} className="station" data-step={i + 1}>
          <circle className="lamp" cx={x} cy={y} r="17" fill="var(--color-teal)" stroke="var(--color-enamel)" strokeWidth="4" />
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--color-paper)"
            style={{ fontFamily: "var(--font-unbounded)" }}
          >
            {i + 1}
          </text>
        </g>
      ))}

      {/* Done stamp */}
      <g id="stamp">
        <circle cx="1132" cy="132" r="46" fill="var(--color-tomato)" stroke="var(--color-enamel)" strokeWidth="4" />
        <path d="M1110 133 L1126 149 L1156 116" fill="none" stroke="var(--color-paper)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* The ball (an email, really). The load-time drop moves the <g>; the
          scroll run moves the circle. The circle sits at the origin and is
          placed by its transform, so motionPath can use path coordinates as
          x/y directly (no `align`, which would measure the moving <g>). */}
      <g id="ball-drop">
        <circle id="ball" cx="0" cy="0" r="16" transform="translate(66 92)" fill="var(--color-tomato)" stroke="var(--color-enamel)" strokeWidth="4" />
      </g>
    </svg>
  );
}
