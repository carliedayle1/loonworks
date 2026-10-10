import Link from "next/link";

import { profile } from "@/content/site";
import { GearIcon } from "@/components/ui/GearIcon";

// Experience drops off below 480px so the wordmark and nav fit one line.
const LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Experience", href: "/#experience", wide: true },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-enamel/10 bg-tin/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-2 font-display text-[0.9375rem] font-bold tracking-tight">
          <GearIcon className="size-6 text-mustard transition-transform duration-500 ease-snap group-hover:rotate-45" />
          <span>{profile.brand}</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex gap-3.5 text-[0.8125rem] font-semibold sm:gap-7 sm:text-[0.9375rem]">
            {LINKS.map(({ label, href, wide }) => (
              <li key={href} className={wide ? "max-[479px]:hidden" : undefined}>
                <a href={href} className="underline-offset-[6px] hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
