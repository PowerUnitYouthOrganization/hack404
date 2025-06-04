import React from "react";
import { StepProps } from "../types";
import SectionTitle from "../SectionTitle";

const PreferencesStep: React.FC<StepProps> = ({ form, handleChange }) => (
  <div>
    <SectionTitle title="Preferences" />
    <div className="grid grid-cols-2 gap-4">
      <select
        name="previousHackathons"
        value={form.previousHackathons}
        onChange={handleChange}
        required
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/70"
      >
        <option value="" disabled>
          Number of previously attended hackathons
        </option>
        <option>0</option>
        <option>1</option>
        <option>2-4</option>
        <option>5+</option>
      </select>
      <select
        name="shirtSize"
        value={form.shirtSize}
        onChange={handleChange}
        required
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/70"
      >
        <option value="" disabled>
          T-Shirt Size
        </option>
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>XXL</option>
      </select>
      <select
        name="allergies"
        value={form.allergies}
        onChange={handleChange}
        className="col-span-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/70"
      >
        <option value="" disabled>
          Allergies
        </option>
        <option>None</option>
        <option>Peanuts</option>
        <option>Shellfish</option>
        <option>Dairy</option>
        <option>Other</option>
      </select>
      <select
        name="dietaryRestrictions"
        value={form.dietaryRestrictions}
        onChange={handleChange}
        className="col-span-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/70"
      >
        <option value="" disabled>
          Dietary Restrictions
        </option>
        <option>None</option>
        <option>Vegetarian</option>
        <option>Vegan</option>
        <option>Halal</option>
        <option>Kosher</option>
        <option>Other</option>
      </select>
    </div>
  </div>
);

export default PreferencesStep;
