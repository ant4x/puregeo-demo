import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Camp from "@/components/Camp";
import WhatAwaits from "@/components/WhatAwaits";
import Shifts from "@/components/Shifts";
import Contacts from "@/components/Contacts";

export const metadata: Metadata = {
  title: "Wildflower Retreats — slow travel weeks in Batumi, Georgia",
  description:
    "Seven slow days on the Georgian Black Sea coast for groups of up to 12: sea swims, mountain canyons, spa evenings, supra dinners and qvevri wine. Demo site with a fictional offer.",
  openGraph: {
    title: "Slow travel weeks in Batumi — Wildflower Retreats",
    description:
      "Seven slow days on the Georgian Black Sea coast for small groups: sea, mountains, food, wine and local hosts. Demo site with a fictional offer.",
  },
};

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Camp />
      <WhatAwaits />
      <Shifts />
      <Contacts />
    </main>
  );
}
