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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://puregeo-demo.vercel.app/#organization",
      name: "Wildflower Retreats",
      url: "https://puregeo-demo.vercel.app",
      logo: "https://puregeo-demo.vercel.app/assets/logotulip.svg",
      description: "Small-group slow travel weeks on the Black Sea coast of Georgia.",
    },
    {
      "@type": "TouristTrip",
      "@id": "https://puregeo-demo.vercel.app/#retreat",
      name: "Wildflower Retreats Slow Travel Week in Batumi",
      description:
        "Seven slow days on the Georgian Black Sea coast for groups of up to 12: sea swims, mountain canyons, spa evenings, supra dinners and qvevri wine.",
      touristType: "Adults",
      offers: {
        "@type": "Offer",
        price: "1450",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Camp />
      <WhatAwaits />
      <Shifts />
      <Contacts />
    </main>
  );
}
