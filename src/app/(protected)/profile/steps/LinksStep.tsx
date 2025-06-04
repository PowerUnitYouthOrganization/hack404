import React from "react";
import { StepProps } from "../types";
import SectionTitle from "../SectionTitle";

const LinksStep: React.FC<StepProps> = ({ form, handleChange }) => (
  <div className="self-stretch flex flex-col justify-start items-start gap-4">
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <input
          type="url"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn"
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/50"
        />
      </div>
    </div>
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <input
          type="url"
          name="github"
          value={form.github}
          onChange={handleChange}
          placeholder="GitHub"
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/50"
        />
      </div>
    </div>
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <input
          type="url"
          name="resume"
          value={form.resume}
          onChange={handleChange}
          placeholder="Resume (link)"
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/50"
        />
      </div>
    </div>
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <input
          type="url"
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
          placeholder="Portfolio"
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/50"
        />
      </div>
    </div>
    <p className="text-xs text-white/60 mt-4">
      These are optional, but may help in your application! You can add these in
      the profile page before you apply.
    </p>
  </div>
);

export default LinksStep;
