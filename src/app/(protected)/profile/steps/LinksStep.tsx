import React from "react";
import { StepProps } from "../types";
import SectionTitle from "../SectionTitle";

const LinksStep: React.FC<StepProps> = ({ form, handleChange }) => (
  <div>
    <SectionTitle title="Your Links" />
    <div className="grid grid-cols-1 gap-4">
      <input
        type="url"
        name="linkedin"
        value={form.linkedin}
        onChange={handleChange}
        placeholder="LinkedIn"
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
      <input
        type="url"
        name="github"
        value={form.github}
        onChange={handleChange}
        placeholder="GitHub"
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
      <input
        type="url"
        name="resume"
        value={form.resume}
        onChange={handleChange}
        placeholder="Resume (link)"
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
      <input
        type="url"
        name="portfolio"
        value={form.portfolio}
        onChange={handleChange}
        placeholder="Portfolio"
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
    </div>
    <p className="text-xs text-white/60 mt-4">
      These are optional, but may help in your application! You can add these in
      the profile page before you apply.
    </p>
  </div>
);

export default LinksStep;
