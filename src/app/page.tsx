import { MachineHero } from "@/components/machine/MachineHero";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <main id="main">
      <MachineHero />
      <Services />
      <div id="work" className="h-[60vh]" />
      <div id="experience" className="h-[60vh]" />
      <div id="contact" className="h-[60vh]" />
    </main>
  );
}
