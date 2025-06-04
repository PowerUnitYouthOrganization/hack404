import React from "react";
import { StepProps } from "../types";
import SectionTitle from "../SectionTitle";

const DetailsStep: React.FC<StepProps> = ({ form, handleChange }) => (
  <div className="self-stretch inline-flex flex-col justify-start items-start gap-4">
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <select
          name="previousHackathons"
          value={form.previousHackathons}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-none outline-none text-white text-sm"
        >
          <option value="" disabled>Number of previously attended hackathons</option>
          <option>0</option>
          <option>1</option>
          <option>2-4</option>
          <option>5+</option>
        </select>
      </div>
      <div className="w-52 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <select
          name="shirtSize"
          value={form.shirtSize}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-none outline-none text-white text-sm"
        >
          <option value="" disabled>T-Shirt Size</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
        </select>
      </div>
    </div>
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <select
          name="allergies"
          value={form.allergies}
          onChange={handleChange}
          className="w-full bg-transparent border-none outline-none text-white text-sm"
        >
          <option value="" disabled>Allergies</option>
          <option>None</option>
          <option>Peanuts</option>
          <option>Shellfish</option>
          <option>Dairy</option>
          <option>Other</option>
        </select>
      </div>
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <select
          name="dietaryRestrictions"
          value={form.dietaryRestrictions}
          onChange={handleChange}
          className="w-full bg-transparent border-none outline-none text-white text-sm"
        >
          <option value="" disabled>Dietary Restrictions</option>
          <option>None</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Halal</option>
          <option>Kosher</option>
          <option>Other</option>
        </select>
      </div>
    </div>
  </div>
);

export default DetailsStep;
