import { atWork, services } from "@/content/site";
import { GearIcon } from "@/components/ui/GearIcon";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1280px] px-4 py-24 md:px-8 md:py-32">
      <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-[750]">What I do</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
        {services.map((service) => (
          <article key={service.id} className="plate p-8 md:p-10">
            <div className="flex items-center gap-3">
              <GearIcon className={cn("size-8", service.id === "ai" ? "text-teal" : "text-tomato")} />
              <h3 className="text-[1.75rem] font-bold">{service.title}</h3>
            </div>
            <p className="mt-4 max-w-[40ch] text-lg text-enamel/85">{service.intro}</p>
            <dl className="mt-8 grid gap-6">
              {service.offers.map((offer) => (
                <div key={offer.title} className="border-t border-enamel/12 pt-5">
                  <dt className="text-[1.0625rem] font-semibold">{offer.title}</dt>
                  <dd className="mt-1 max-w-[52ch] text-enamel/80">{offer.body}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <p className="plate on-enamel mt-6 flex items-start gap-4 !bg-enamel px-8 py-6 text-paper md:mt-8 md:items-center md:px-10">
        <GearIcon className="mt-0.5 size-6 text-teal md:mt-0" />
        <span className="max-w-[80ch] text-[1.0625rem]">{atWork}</span>
      </p>
    </section>
  );
}
