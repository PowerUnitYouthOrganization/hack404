"use client";

import { FC } from "react";
import Grid from "@/components/grid";
import Header from "@/components/header";
import SmallHeader from "@/components/small-header";
import HBorder from "@/components/h-border";
import ColSection from "@/components/col-section";
import { GridColWidthProvider } from "@/app/contexts/GridCtx";
import { InstagramButton, LinkedInButton } from "@/components/social-button";
import SponsorSection from "@/components/SponsorSection";

const partners = [
  {
    name: "UTMIST",
    description:
      "UTMIST is Canada's largest student-lead organization for Artificial Intelligence and Machine Learning. ",
    imageUrl: "/utmist.png",
    href: "https://utmist.ca/",
  },
];

const sponsors = [
  {
    name: "CGI",
    description:
      "CGI is one of the largest IT and business consulting services firms in the world. Combining human ingenuity with the power of technology, we help clients accelerate ROI-led digital transformation.",
    imageUrl: "/CGI.png",
    href: "https://www.cgi.com/en",
  },
  {
    name: "Vitasoy",
    description:
      "Vitasoy is a company that produces and sells plant-based products, such as soy, oat and tea drinks, for health and environmental benefits.",
    imageUrl: "/vitasoy.png",
    href: "https://www.vitasoy.com/",
  },
  {
    name: "The Remington Group",
    description:
      "The Remington Group is a real estate developer that builds and operates a vast portfolio of residential, retail and commercial properties across Ontario.",
    imageUrl: "/remington.png",
    href: "https://www.remingtongroupinc.com/",
  },
];

const SponsorsPage: FC = () => {
  return (
    <GridColWidthProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="desktop:block hidden">
          <Header />
        </div>
        <div className="desktop:hidden block">
          <SmallHeader />
        </div>

        {/* Background Elements */}
        <div className="-z-20">
          <Grid />
        </div>
        <div className="fixed inset-0 bg-[#020817] -z-30" />

        <HBorder />

        {/* Partners Title Section */}
        <div className="py-[70px] px-6 tablet:px-16 flex justify-between items-center w-full">
          <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">
            Partners
          </h1>
        </div>

        {partners.map((partner) => (
          <div key={partner.name}>
            <HBorder />
            <SponsorSection
              name={partner.name}
              description={partner.description}
              imageUrl={partner.imageUrl}
              href={partner.href}
            />
          </div>
        ))}

        <HBorder />

        {/* Sponsors Title Section */}
        <div className="py-[70px] px-6 tablet:px-16 flex justify-between items-center w-full">
          <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">
            Sponsors
          </h1>
        </div>

        {sponsors.map((sponsor) => (
          <div key={sponsor.name}>
            <HBorder />
            <SponsorSection
              name={sponsor.name}
              description={sponsor.description}
              imageUrl={sponsor.imageUrl}
              href={sponsor.href}
            />
          </div>
        ))}

        <HBorder />

        {/* Contact Section */}

        {/* Desktop & Tablet Layout */}
        <div className="hidden tablet:flex px-16 py-[70px] items-center justify-between gap-6">
          <ColSection width={2}>
            <div className="flex flex-col items-start gap-6">
              <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">
                Contact
              </h1>
              <a
                href="mailto:support@hack404.dev"
                className="text-3xl font-(family-name:--font-heading-light) gradient-text leading-loose hover:opacity-80 transition-opacity"
              >
                support@hack404.dev
              </a>
            </div>
          </ColSection>
          <ColSection width={2}>
            <div className="flex flex-col items-start gap-6">
              <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">
                Link to our socials
              </h1>
              <div className="flex gap-6">
                <InstagramButton url="https://www.instagram.com/hack404.dev/" />
                <LinkedInButton url="https://www.linkedin.com/company/hack404/" />
              </div>
            </div>
          </ColSection>
        </div>

        {/* Mobile Layout */}
        <div className="tablet:hidden px-6 py-[70px]">
          <h2 className="font-(family-name:--font-heading) text-5xl leading-[52.80px] mb-6">
            Contact
          </h2>
          <a
            href="mailto:support@hack404.dev"
            className="text-2xl font-(family-name:--font-heading-light) gradient-text leading-relaxed hover:opacity-80 transition-opacity block mb-8"
          >
            support@hack404.dev
          </a>

          <h2 className="font-(family-name:--font-heading) text-5xl leading-[52.80px] mb-6">
            Link to our socials
          </h2>
          <div className="flex gap-6">
            <InstagramButton url="https://www.instagram.com/hack404.dev/" />
            <LinkedInButton url="https://www.linkedin.com/company/hack404/" />
          </div>
        </div>
      </div>
    </GridColWidthProvider>
  );
};

export default SponsorsPage;
