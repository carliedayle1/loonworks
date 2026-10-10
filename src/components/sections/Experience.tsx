import { experience, stats, type Role } from "@/content/site";
import { Gauge } from "@/components/ui/Gauge";
import { cn } from "@/lib/utils";

const year = (ym: string) => ym.slice(0, 4);
const range = (role: Role) =>
  role.end ? (year(role.start) === year(role.end) ? year(role.start) : `${year(role.start)} – ${year(role.end)}`) : `${year(role.start)} – now`;

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1280px] px-4 py-24 md:px-8 md:py-32">
      <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-[750]">Seven years of shipping</h2>

      <div className="plate on-enamel mt-12 grid gap-12 !bg-enamel px-6 py-12 sm:grid-cols-3 sm:gap-6 md:px-12">
        {stats.map((stat) => (
          <Gauge key={stat.label} stat={stat} />
        ))}
      </div>

      <ol className="mt-16 md:mt-20">
        {experience.map((role, i) => (
          <li key={`${role.org}-${role.start}`} className="relative grid gap-2 pb-12 pl-10 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-8 md:pl-0">
            {/* Rail with station lamps; teal = current role */}
            <span aria-hidden="true" className={cn("absolute top-2 bottom-0 left-[9px] w-[3px] bg-enamel/20 md:left-[11.5rem]", i === experience.length - 1 && "hidden")} />
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0.5 left-0 size-[21px] rounded-full border-[3px] border-enamel md:left-[calc(11.5rem-9px)]",
                role.end ? "bg-tin-deep" : "bg-teal",
              )}
            />
            <p className="font-display text-[0.9375rem] font-semibold tabular-nums">{range(role)}</p>
            <div className="md:pl-12">
              <h3 className="text-[1.375rem] font-bold">{role.org}</h3>
              <p className="mt-1 font-semibold text-enamel/85">
                {role.title}, {role.place}
              </p>
              <ul className="mt-3 grid max-w-[68ch] gap-1.5 text-enamel/85">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
