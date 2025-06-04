"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import RoundedButton from "@/components/ui/roundedbutton";
import { Checkbox } from "@/components/ui/checkbox";

const workshopOptions = [
  "Artificial Intelligence",
  "Web Dev",
  "AI-Assisted Development (e.g. Cursor, vibe coding, prompt engineering)",
  "Entrepreneurship",
  "Hackathon Pitching",
  "UI/UX Design",
  "Project Deployment",
  "Other",
];

const initialForm = {
  // Step 1
  legalFirstName: "",
  lastName: "",
  preferredFirstName: "",
  age: "",
  gender: "",
  ethnicity: "",
  // Step 2
  linkedin: "",
  resume: "",
  github: "",
  portfolio: "",
  consentSponsors: false,
  // Step 3
  experienceLevel: "beginner", // beginner | normal
  q1: "",
  q2: "",
  q3: "",
  silly: "",
  sillyDraw: "",
  // Step 4
  workshops: [],
  activities: "",
  consentResume: false,
  overnight: false,
  usedAI: false,
  waiver: false,
  under18: false,
};

function validateStep(step, form) {
  if (step === 0) {
    return (
      form.legalFirstName &&
      form.lastName &&
      form.preferredFirstName &&
      form.age &&
      form.gender &&
      form.ethnicity
    );
  }
  if (step === 1) {
    // Resume is optional (file or link), all else optional
    return true;
  }
  if (step === 2) {
    if (form.experienceLevel === "beginner") {
      return form.q1 && form.q2 && form.q3 && (form.silly || form.sillyDraw);
    } else {
      return form.q1 && form.q2 && (form.silly || form.sillyDraw);
    }
  }
  if (step === 3) {
    return form.waiver && (form.age >= 18 || form.under18);
  }
  return false;
}

const stepTitles = [
  "Basic Details",
  "Links & Consent",
  "Short Answers",
  "Feedback & Waivers",
];

export default function ApplicationPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [transitioning, setTransitioning] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckbox = (field) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleWorkshopChange = (option) => {
    setForm((prev) => {
      const workshops = prev.workshops.includes(option)
        ? prev.workshops.filter((w) => w !== option)
        : prev.workshops.length < 3
          ? [...prev.workshops, option]
          : prev.workshops;
      return { ...prev, workshops };
    });
  };

  const nextStep = () => {
    if (!validateStep(step, form)) return;
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setTransitioning(false);
    }, 350);
  };

  const prevStep = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setTransitioning(false);
    }, 350);
  };

  // --- Step content ---
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <Input
                placeholder="First Name (Legal)"
                value={form.legalFirstName}
                onChange={(e) => handleChange("legalFirstName", e.target.value)}
                required
              />
              <Input
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
            </div>
            <div className="flex gap-4">
              <Input
                placeholder="First Name (Preferred)"
                value={form.preferredFirstName}
                onChange={(e) =>
                  handleChange("preferredFirstName", e.target.value)
                }
                required
              />
              <Input
                placeholder="Age"
                type="number"
                value={form.age}
                onChange={(e) => handleChange("age", e.target.value)}
                required
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={form.gender}
                onValueChange={(v) => handleChange("gender", v)}
                placeholder="Gender"
                options={[
                  "Male",
                  "Female",
                  "Non-binary",
                  "Prefer not to say",
                  "Other",
                ]}
                required
              />
              <Select
                value={form.ethnicity}
                onValueChange={(v) => handleChange("ethnicity", v)}
                placeholder="Ethnicity"
                options={[
                  "Asian",
                  "Black",
                  "Latino",
                  "White",
                  "Indigenous",
                  "Other",
                  "Prefer not to say",
                ]}
                required
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col gap-6">
            <Input
              placeholder="LinkedIn (optional)"
              value={form.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
            />
            <Input
              placeholder="Resume (link or upload, optional)"
              value={form.resume}
              onChange={(e) => handleChange("resume", e.target.value)}
              type="text"
            />
            <Input
              placeholder="GitHub (optional)"
              value={form.github}
              onChange={(e) => handleChange("github", e.target.value)}
            />
            <Input
              placeholder="Personal Portfolio (e.g. devpost, dorahacks, optional)"
              value={form.portfolio}
              onChange={(e) => handleChange("portfolio", e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.consentSponsors}
                onCheckedChange={() => handleCheckbox("consentSponsors")}
                id="consentSponsors"
              />
              <label htmlFor="consentSponsors" className="text-white text-sm">
                Consent to send to sponsors?
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <Select
                value={form.experienceLevel}
                onValueChange={(v) => handleChange("experienceLevel", v)}
                options={[
                  { label: "Beginner", value: "beginner" },
                  { label: "Advanced", value: "normal" },
                ]}
                placeholder="Experience Level"
              />
            </div>
            {form.experienceLevel === "beginner" ? (
              <>
                <Textarea
                  placeholder="What excites you about tech? (150 words max)"
                  value={form.q1}
                  onChange={(e) => handleChange("q1", e.target.value)}
                  maxLength={1000}
                  required
                />
                <Textarea
                  placeholder="What’s something you failed at that you’re proud of? (150 words max)"
                  value={form.q2}
                  onChange={(e) => handleChange("q2", e.target.value)}
                  maxLength={1000}
                  required
                />
                <Textarea
                  placeholder="What’s something you persevered through? (150 words max)"
                  value={form.q3}
                  onChange={(e) => handleChange("q3", e.target.value)}
                  maxLength={1000}
                  required
                />
              </>
            ) : (
              <>
                <Textarea
                  placeholder="You wake up one morning and everything you know how to do has been ‘404’d’ from your memory. What’s the first thing you teach yourself again? (150 words max)"
                  value={form.q1}
                  onChange={(e) => handleChange("q1", e.target.value)}
                  maxLength={1000}
                  required
                />
                <Textarea
                  placeholder="What’s a technical project that you’ve built that you’re most proud of? (150 words max)"
                  value={form.q2}
                  onChange={(e) => handleChange("q2", e.target.value)}
                  maxLength={1000}
                  required
                />
              </>
            )}
            <div className="flex flex-col gap-2">
              <Textarea
                placeholder="If you could ‘hack’ any everyday object, what would you hack and what would it do? (50 words max)"
                value={form.silly}
                onChange={(e) => handleChange("silly", e.target.value)}
                maxLength={350}
              />
              <span className="text-white text-xs text-center">OR</span>
              <Textarea
                placeholder="Draw a lil avatar for yourself in an 8x8 grid (describe or paste text art)"
                value={form.sillyDraw}
                onChange={(e) => handleChange("sillyDraw", e.target.value)}
                maxLength={100}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-white text-sm mb-2 block">
                What workshops would you like to see at Hack 404? (choose up to
                3)
              </label>
              <div className="flex flex-wrap gap-2">
                {workshopOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-xs ${form.workshops.includes(option) ? "bg-cyan-400/80 text-black border-cyan-400" : "bg-transparent text-white border-cyan-400/40"}`}
                    onClick={() => handleWorkshopChange(option)}
                    disabled={
                      !form.workshops.includes(option) &&
                      form.workshops.length >= 3
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <Textarea
              placeholder="What activities are you interested in seeing at Hack404? (Optional)"
              value={form.activities}
              onChange={(e) => handleChange("activities", e.target.value)}
              maxLength={300}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.consentResume}
                onCheckedChange={() => handleCheckbox("consentResume")}
                id="consentResume"
              />
              <label htmlFor="consentResume" className="text-white text-sm">
                Consent for resume to be collected by sponsors
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.overnight}
                onCheckedChange={() => handleCheckbox("overnight")}
                id="overnight"
              />
              <label htmlFor="overnight" className="text-white text-sm">
                Overnight?
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.usedAI}
                onCheckedChange={() => handleCheckbox("usedAI")}
                id="usedAI"
              />
              <label htmlFor="usedAI" className="text-white text-sm">
                Did you use AI for your application? (just for data collection,
                not for evaluation)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.waiver}
                onCheckedChange={() => handleCheckbox("waiver")}
                id="waiver"
              />
              <label htmlFor="waiver" className="text-white text-sm">
                General hackathon waiver
              </label>
            </div>
            {form.age < 18 && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={form.under18}
                  onCheckedChange={() => handleCheckbox("under18")}
                  id="under18"
                />
                <label htmlFor="under18" className="text-white text-sm">
                  Waiver for hackers under the age of 18
                </label>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div
        className="flex flex-1 mx-auto w-full max-w-6xl mt-12 shadow-lg rounded-lg overflow-hidden"
        style={{ height: "80vh" }}
      >
        {/* Left static section */}
        <div className="w-1/2 bg-gradient-to-br from-[#1a2a6c] via-[#1e3c72] to-[#2e8b57] p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-white text-5xl font-light mb-4">Apply</h1>
            <h2 className="text-white text-3xl font-light mb-8">
              Attend Hack404!
            </h2>
          </div>
          <p className="text-white text-xs opacity-80">
            Creating a hacker profile is the first step to joining Hack404. It
            gives you access to Launchpad, where you can apply, manage your
            application, and access important information and tools during the
            hackathon weekend if you are accepted.
          </p>
        </div>
        {/* Right animated section */}
        <div className="w-1/2 relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#43cea2] p-12">
          <div className="flex justify-between items-center mb-8">
            <span className="text-white text-lg font-light">
              {stepTitles[step]}
            </span>
            <span className="text-white text-xs opacity-60">
              Step {step + 1}/4
            </span>
          </div>
          <form
            className={`flex-1 flex flex-col justify-between transition-transform duration-300 ${transitioning ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            autoComplete="off"
          >
            <div className="flex-1 flex flex-col gap-6">{renderStep()}</div>
            <div className="flex justify-between items-center mt-8">
              {step > 0 ? (
                <RoundedButton
                  type="button"
                  onClick={prevStep}
                  className="bg-cyan-400/80 text-black px-6 py-2 rounded-full"
                >
                  Back
                </RoundedButton>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <RoundedButton
                  type="submit"
                  className="bg-wlime text-wblack dark:text-white px-8 py-3 rounded-full"
                  disabled={!validateStep(step, form)}
                >
                  Continue
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#1C1B1F"
                  >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                  </svg>
                </RoundedButton>
              ) : (
                <RoundedButton
                  type="submit"
                  className="bg-wlime text-wblack dark:text-white px-8 py-3 rounded-full"
                  disabled={!validateStep(step, form)}
                >
                  Submit
                </RoundedButton>
              )}
            </div>
            <div className="text-white text-xs mt-2 opacity-70">
              Make sure details are correct
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
