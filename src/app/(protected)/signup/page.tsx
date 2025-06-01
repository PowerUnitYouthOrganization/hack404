"use client";

import { useState } from "react";

export default function HackerApplication() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    pronouns: "",
    school: "",
    grade: "",
    previousHackathons: "",
    shirtSize: "",
    allergies: "",
    dietaryRestrictions: "",
    linkedin: "",
    github: "",
    resume: "",
    portfolio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      alert("Form submitted!");
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const SectionTitle = ({ title }) => (
    <div className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-2">{title}</div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#180032] via-[#003039] to-[#1a5200] flex items-center justify-center text-white font-sans">
      <div className="w-full max-w-6xl border border-white/10 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Left Panel */}
        <div className="p-10 space-y-6 relative">
          <img src="/logo.svg" alt="launchpad logo" className="h-6 mb-6" />
          <div>
            <h1 className="text-3xl font-medium">Get set up</h1>
            <h2 className="text-2xl mt-2">Create your hacker profile</h2>
          </div>
          <p className="text-sm text-white/70 max-w-xs">
            Creating a hacker profile is the first step to joining Hack404. It gives you access to Launchpad, where you can apply, manage your application, and access important information and tools during the hackathon weekend if you are accepted.
          </p>
        </div>

        {/* Right Panel */}
        <div className="p-10 relative">
          <div className="absolute top-6 right-6 text-sm text-white/60 z-10">Step {step}/4</div>
          <form onSubmit={nextStep} className="space-y-8">

            {/* Step 0 */}
            {step === 0 && (
              <div>
                <SectionTitle title="Login" />
                <label className="block text-sm mb-2">Create an account</label>
                <p className="text-xs text-white/60 mb-4">
                  We’ll send you a magic link to access the Launchpad
                </p>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50 focus:outline-none"
                />
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div>
                <SectionTitle title="Basic Info" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50" />
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50" />
                  <input type="text" name="pronouns" value={form.pronouns} onChange={handleChange} placeholder="Pronouns" className="col-span-2 p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50" />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <SectionTitle title="Education" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="school" value={form.school} onChange={handleChange} placeholder="Secondary/Post Secondary Institution Name" required className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50" />
                  <input type="text" name="grade" value={form.grade} onChange={handleChange} placeholder="Grade/Year" required className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50" />
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <SectionTitle title="Preferences" />
                <div className="grid grid-cols-2 gap-4">
                  <select name="previousHackathons" value={form.previousHackathons} onChange={handleChange} required className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/70">
                    <option value="" disabled>Number of previously attended hackathons</option>
                    <option>0</option>
                    <option>1</option>
                    <option>2-4</option>
                    <option>5+</option>
                  </select>
                  <select name="shirtSize" value={form.shirtSize} onChange={handleChange} required className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/70">
                    <option value="" disabled>T-Shirt Size</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                  </select>
                  <select name="allergies" value={form.allergies} onChange={handleChange} className="col-span-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/70">
                    <option value="" disabled>Allergies</option>
                    <option>None</option>
                    <option>Peanuts</option>
                    <option>Shellfish</option>
                    <option>Dairy</option>
                    <option>Other</option>
                  </select>
                  <select name="dietaryRestrictions" value={form.dietaryRestrictions} onChange={handleChange} className="col-span-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/70">
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
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div>
                <SectionTitle title="Your Links" />
                <div className="grid grid-cols-1 gap-4">
                  <input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn" className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50" />
                  <input type="url" name="github" value={form.github} onChange={handleChange} placeholder="GitHub" className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50" />
                  <input type="url" name="resume" value={form.resume} onChange={handleChange} placeholder="Resume (link)" className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50" />
                  <input type="url" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="Portfolio" className="p-3 bg-white/5 border border-white/20 rounded-lg placeholder-white/50" />
                </div>
                <p className="text-xs text-white/60 mt-4">
                  These are optional, but may help in your application! You can add these in the profile page before you apply.
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                className={`text-white/60 border border-white/20 px-4 py-2 rounded-full transition-opacity ${step === 0 ? "opacity-0 pointer-events-none" : "hover:border-white/40"}`}
              >
                Back
              </button>
              <button
                type="submit"
                className="flex items-center bg-lime-400 text-black px-6 py-2 rounded-full font-semibold shadow-md hover:bg-lime-300"
              >
                {step < 4 ? "Continue" : "Finish"}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
