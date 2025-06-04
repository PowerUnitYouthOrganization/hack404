import React from "react";
import { StepProps } from "../types";
import SectionTitle from "../SectionTitle";

const BasicInfoStep: React.FC<StepProps> = ({ form, handleChange }) => (
  <div>
    <SectionTitle title="Basic Details" />
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="First Name (Legal)"
        required
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
      <input
        type="text"
        name="preferredName"
        value={form.preferredName || ""}
        onChange={handleChange}
        placeholder="First Name (Preferred)"
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
      <input
        type="number"
        name="age"
        value={form.age || ""}
        onChange={handleChange}
        placeholder="Age"
        className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50"
      />
      <select
        name="gender"
        value={form.gender || ""}
        onChange={handleChange}
        required
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white"
      >
        <option value="" disabled>
          Gender
        </option>
        <option>Male</option>
        <option>Female</option>
        <option>Non-binary</option>
        <option>Prefer not to say</option>
        <option>Other</option>
      </select>
      <select
        name="ethnicity"
        value={form.ethnicity || ""}
        onChange={handleChange}
        required
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/70"
      >
        <option value="" disabled>
          Ethnicity
        </option>
        <option>East Asian or Pacific Islander</option>
        <option>Black or African American</option>
        <option>Hispanic or Latino</option>
        <option>Middle Eastern or North African</option>
        <option>First Nations or Indigenous</option>
        <option>White or European</option>
        <option>South Asian</option>
        <option>Mixed</option>
        <option>Prefer not to say</option>
        <option>Other</option>
      </select>
    </div>
  </div>
);

export default BasicInfoStep;
