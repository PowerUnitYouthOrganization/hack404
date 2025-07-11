import React from "react";

import ColSection from "./col-section";

interface SponsorSectionProps {
  name: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  href: string;
}

const SponsorSection: React.FC<SponsorSectionProps> = ({
  name,
  description,
  imageUrl,
  imageAlt = `Logo for ${name}`,
  href,
}) => {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden desktop:flex py-[70px] px-[64px] justify-between items-start gap-12 w-full">
        <ColSection width={2}>
          <div className="flex-1 flex flex-col justify-start items-start gap-6">
            <h2 className="font-(family-name:--font-heading-light) text-5xl leading-relaxed">
              {name}
            </h2>
            <p className="text-xl font-(family-name:--font-heading-light) leading-relaxed text-gray-400">
              {description}
            </p>
          </div>
        </ColSection>

        <div className="flex-1 h-64 flex items-center justify-center rounded-lg">
          <a href={href}>
            <img
              className="max-w-full max-h-56 object-contain"
              src={imageUrl}
              alt={imageAlt}
            />
          </a>
        </div>
      </div>

      {/* Tablet & Mobile Layout */}
      <div className="desktop:hidden py-[70px] px-6 tablet:px-16 flex flex-col gap-6">
        <h2 className="font-(family-name:--font-heading-light) text-4xl tablet:text-5xl leading-relaxed">
          {name}
        </h2>
        <div className="h-48 tablet:h-64 bg-black/30 flex items-center justify-center rounded-lg w-full">
          <img
            className="max-w-full max-h-full object-contain p-4"
            src={imageUrl}
            alt={imageAlt}
          />
        </div>
        <p className="text-lg tablet:text-xl font-(family-name:--font-heading-light) leading-relaxed text-gray-400">
          {description}
        </p>
      </div>
    </>
  );
};

export default SponsorSection;
