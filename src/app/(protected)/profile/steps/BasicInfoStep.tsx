import React from "react";
import { StepProps } from "../types";
import SectionTitle from "../SectionTitle";

const BasicInfoStep: React.FC<StepProps> = ({ form, handleChange }) => (
  <div className="self-stretch flex flex-col justify-start items-start gap-4">
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name (Legal)"
          required
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/50"
        />
      </div>
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/50"
        />
      </div>
    </div>
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <input
          type="text"
          name="preferredName"
          value={form.preferredName || ""}
          onChange={handleChange}
          placeholder="First Name (Preferred)"
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/50"
        />
      </div>
      <div className="w-32 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <input
          type="number"
          name="age"
          value={form.age || ""}
          onChange={handleChange}
          placeholder="Age"
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/50"
        />
      </div>
    </div>
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <select
          name="gender"
          value={form.gender || ""}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-none outline-none text-white text-sm"
        >
          <option value="" disabled>Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
          <option>Prefer not to say</option>
          <option>Other</option>
        </select>
      </div>
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <select
          name="ethnicity"
          value={form.ethnicity || ""}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-none outline-none text-white text-sm"
        >
          <option value="" disabled>Ethnicity</option>
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
  </div>
);

export default BasicInfoStep;
