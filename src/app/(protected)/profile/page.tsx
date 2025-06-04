"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import SimpleHeader from "@/components/simple-header";
import GradientBackground from "@/components/gradient-background";
import { FormData } from "./types";
import BasicInfoStep from "./steps/BasicInfoStep";
import EducationStep from "./steps/EducationStep";
import PreferencesStep from "./steps/PreferencesStep";
import LinksStep from "./steps/LinksStep";

export default function HackerApplication() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      alert("Form submitted!");
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfoStep form={form} handleChange={handleChange} />;
      case 2:
        return <EducationStep form={form} handleChange={handleChange} />;
      case 3:
        return <PreferencesStep form={form} handleChange={handleChange} />;
      case 4:
        return <LinksStep form={form} handleChange={handleChange} />;
      default:
        return <BasicInfoStep form={form} handleChange={handleChange} />;
    }
  };

  return (
    <SessionProvider>
      <div className="flex flex-col h-dvh gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116] text-white font-sans">
        <SimpleHeader />
        <GradientBackground />
        <div className="absolute inset-0 bg-black/40 -z-40" />

        <div className="w-full max-w-6xl border border-white/10 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10 mx-auto">
          {/* Left Panel */}
          <div className="p-10 space-y-6 relative">
            <div>
              <h1 className="text-3xl font-medium font-[var(--font-heading)]">Get set up</h1>
              <h2 className="text-2xl mt-2">Create your hacker profile</h2>
              <br />
              <br />
              <p className="text-sm text-white/70 max-w-xs">
                Creating a hacker profile is the first step to joining Hack404.
                It gives you access to Launchpad, where you can apply, manage
                your application, and access important information and tools
                during the hackathon weekend if you are accepted.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-10 relative">
            <div className="absolute top-6 right-6 text-sm text-white/60 z-10">
              Step {step}/4
            </div>
            <form onSubmit={nextStep} className="space-y-8">
              {renderStep()}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`text-white/60 border border-white/20 px-4 py-2 rounded-full transition-opacity ${step === 1 ? "opacity-0 pointer-events-none" : "hover:border-white/40"}`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex items-center bg-lime-400 text-black px-6 py-2 rounded-full font-semibold shadow-md hover:bg-lime-300"
                >
                  {step < 4 ? "Continue" : "Finish"}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
