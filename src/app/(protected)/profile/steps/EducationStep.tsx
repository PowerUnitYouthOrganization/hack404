import React from "react";
import { StepProps } from "../types";
import SectionTitle from "../SectionTitle";

const EducationStep: React.FC<StepProps> = ({ form, handleChange }) => (
  <div>
    <SectionTitle title="Education" />
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        name="school"
        value={form.school}
        onChange={handleChange}
        placeholder="Secondary/Post Secondary Institution Name"
        required
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
      <input
        type="text"
        name="grade"
        value={form.grade}
        onChange={handleChange}
        placeholder="Grade/Year"
        required
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
    </div>
  </div>
);

export default EducationStep;
