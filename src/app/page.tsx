import { MachineHero } from "@/components/machine/MachineHero";

export default function Home() {
  return (
    <main id="main">
      <MachineHero />
      <div className="h-[150vh]" aria-hidden="true" />
    </main>
  );
}
