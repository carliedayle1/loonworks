import { certifications, education, skills } from "@/content/site";

export function Credentials() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-24 md:px-8 md:pb-32">
      <h2 className="text-[clamp(1.75rem,3vw,2.6rem)] font-[750]">Credentials</h2>
      <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="plate px-7 py-6">
            <p className="font-display text-lg font-bold">{education.degree}</p>
            <p className="mt-1 text-enamel/85">
              {education.school}, {education.years}
            </p>
          </div>
          <h3 className="mt-8 font-sans text-[1.0625rem] font-semibold tracking-normal">Certificates (Udemy)</h3>
          <ul className="mt-3 grid gap-2 text-enamel/85">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
        <dl className="grid gap-6 sm:grid-cols-2 md:col-span-7">
          {skills.map(({ group, items }) => (
            <div key={group}>
              <dt className="font-semibold">{group}</dt>
              <dd className="mt-1.5 text-enamel/85">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
