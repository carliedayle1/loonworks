/* eslint-disable @next/next/no-img-element -- static export, images are pre-sized */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { profile, projects } from "@/content/site";
import { Contact } from "@/components/sections/Contact";
import { KindTag, Plate } from "@/components/ui/Plate";
import { PlateArt } from "@/components/ui/PlateArt";
import { RevealText } from "@/components/ui/RevealText";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: `${project.title} | ${profile.name}`, description: project.pitch } : {};
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-enamel/12 py-12 md:grid-cols-12 md:gap-8 md:py-16">
      <RevealText as="h2" className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold md:col-span-4">
        {title}
      </RevealText>
      <div className="md:col-span-8">{children}</div>
    </section>
  );
}

function Lamps({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-[68ch] gap-4 text-[1.0625rem]">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span aria-hidden="true" className="mt-[0.45em] size-3 shrink-0 rounded-full border-2 border-enamel bg-teal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    ...project.numbers,
  ];

  return (
    <main id="main">
      <div className="mx-auto max-w-[1280px] px-4 pt-28 md:px-8 md:pt-36">
        {/* Full page load on purpose: the browser applies #work after the hero's
            pin spacer exists, so it lands on the grid. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#work" className="font-semibold underline decoration-2 underline-offset-[6px]">
          All work
        </a>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <KindTag kind={project.kind} />
            <RevealText as="h1" split="lines" trigger="mount" className="mt-5 text-[clamp(2.6rem,6vw,5rem)] font-[750]">
              {project.title}
            </RevealText>
            <p className="mt-6 max-w-[48ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-relaxed text-enamel/85">
              {project.pitch}
            </p>
          </div>
          <dl className="grid content-end gap-5 sm:grid-cols-2 md:col-span-4 md:grid-cols-1">
            {facts.map(({ label, value }) => (
              <div key={label} className="border-t border-enamel/15 pt-3">
                <dt className="text-sm font-semibold text-enamel/70">{label}</dt>
                <dd className="mt-0.5 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="plate mt-14 overflow-hidden md:mt-20">
          <div className="aspect-[16/9] bg-enamel">
            {project.image ? (
              <img
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              project.art && <PlateArt kind={project.art} />
            )}
          </div>
        </figure>

        <div className="mt-16 md:mt-24">
          <Block title="What it does">
            <Lamps items={project.features} />
          </Block>

          <Block title="How it's built">
            <Lamps items={project.architecture} />
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Built with">
              {project.stack.map((item) => (
                <li key={item} className="rounded-[6px] px-2.5 py-1 text-sm shadow-[inset_0_0_0_1px_rgb(31_42_68/0.18)]">
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Hard problems">
            <div className="grid gap-6 lg:grid-cols-2">
              {project.challenges.map(({ title, body }) => (
                <div key={title} className="plate px-7 py-7">
                  <h3 className="text-[1.1875rem] font-bold leading-snug">{title}</h3>
                  <p className="mt-3 text-enamel/85">{body}</p>
                </div>
              ))}
            </div>
          </Block>

          {project.gallery && (
            <Block title="From the build">
              <div className="grid gap-6 sm:grid-cols-2">
                {project.gallery.map((img) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    className="plate h-auto w-full p-2"
                  />
                ))}
              </div>
            </Block>
          )}

          {project.links.length > 0 && (
            <Block title="See it">
              <div className="flex flex-wrap gap-3">
                {project.links.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full px-6 py-3.5 font-semibold shadow-[inset_0_0_0_2px_var(--color-enamel)] transition-colors duration-300 ease-snap hover:bg-enamel hover:text-paper"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </Block>
          )}
        </div>

        <section className="border-t border-enamel/12 py-16 md:py-24">
          <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold">Next project</h2>
          <div className="mt-8 max-w-[640px]">
            <Plate project={next} size="sm" />
          </div>
        </section>
      </div>

      <Contact />
    </main>
  );
}
