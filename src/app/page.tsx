import { MachineHero } from "@/components/machine/MachineHero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <main id="main">
      <MachineHero />
      <Services />
      <Work />
      <div id="experience" className="h-[60vh]" />
      <div id="contact" className="h-[60vh]" />
    </main>
  );
}
