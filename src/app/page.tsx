import { MachineHero } from "@/components/machine/MachineHero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <MachineHero />
      <Services />
      <Work />
      <Experience />
      <Credentials />
      <Contact />
    </main>
  );
}
