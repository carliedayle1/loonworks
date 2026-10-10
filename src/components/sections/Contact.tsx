import { contact, profile } from "@/content/site";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { GearIcon } from "@/components/ui/GearIcon";

export function Contact() {
  return (
    <section id="contact" className="on-enamel bg-enamel text-paper">
      <div className="mx-auto max-w-[1280px] px-4 pt-24 pb-10 md:px-8 md:pt-32">
        <h2 className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.8rem)] font-[750]">{contact.heading}</h2>
        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-block break-all font-display text-[clamp(1.35rem,3.6vw,3rem)] font-semibold underline decoration-mustard decoration-[3px] underline-offset-[10px] hover:decoration-tomato"
        >
          {profile.email}
        </a>
        <div className="mt-10 flex flex-wrap gap-3">
          <CopyEmail email={profile.email} />
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full px-6 py-3.5 font-semibold shadow-[inset_0_0_0_2px_var(--color-paper)] transition-colors duration-300 ease-snap hover:bg-paper hover:text-enamel"
          >
            LinkedIn
          </a>
        </div>

        <footer className="mt-24 flex items-end justify-between gap-6 border-t border-paper/15 pt-8 text-sm text-paper/75 md:mt-32">
          <div>
            <p>© 2026 {profile.name}</p>
            <p>{profile.location}</p>
          </div>
          <GearIcon className="size-7 text-mustard" />
        </footer>
      </div>
    </section>
  );
}
