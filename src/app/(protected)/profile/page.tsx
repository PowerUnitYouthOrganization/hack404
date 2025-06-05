"use client";

import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SimpleHeader from "@/components/simple-header";
import GradientBackgroundStatic from "@/components/gradient-background-static";
import RoundedButton from "@/components/ui/roundedbutton";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { FormData } from "./types";
import BasicInfoStep from "./steps/BasicInfoStep";
import EducationStep from "./steps/EducationStep";
import DetailsStep from "./steps/DetailsStep";
import LinksStep from "./steps/LinksStep";

function HackerApplicationContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
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

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (!session?.user?.email) {
        setIsCheckingProfile(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/profile-done?email=${encodeURIComponent(session.user.email)}`,
        );
        if (response.ok) {
          const data = await response.json();
          if (data.profileDone) {
            router.push("/launchpad");
            return;
          }
        }
      } catch (error) {
        console.error("Error checking profile completion:", error);
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkProfileCompletion();
  }, [router, session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return form.firstName && form.lastName && form.gender && form.ethnicity;
      case 2:
        return form.school && form.grade;
      case 3:
        return form.previousHackathons && form.shirtSize;
      case 4:
        return true; // Links are optional
      default:
        return false;
    }
  };

  const submitProfile = async () => {
    setIsSubmitting(true);

    try {
      const profileData = {
        legalFirstName: form.firstName,
        lastName: form.lastName,
        preferredFirstName: form.preferredName || "",
        age: form.age || "",
        gender: form.gender,
        ethnicity: form.ethnicity,
        institution: form.school,
        gradeYear: form.grade,
        hackathonsAttended: form.previousHackathons,
        tshirtSize: form.shirtSize,
        allergies: form.allergies || "",
        dietaryRestrictions: form.dietaryRestrictions || "",
        linkedin: form.linkedin || "",
        github: form.github || "",
        resume: form.resume || "",
        portfolio: form.portfolio || "",
      };

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save profile");
      }

      toast.success("Profile created successfully!");

      // Redirect to launchpad after successful submission
      setTimeout(() => {
        router.push("/launchpad");
      }, 1500);
    } catch (error) {
      console.error("Error submitting profile:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save profile",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (!validateStep()) {
      toast.error("Please fill out all required fields before continuing.");
      return;
    }

    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      submitProfile();
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
        return <DetailsStep form={form} handleChange={handleChange} />;
      case 4:
        return <LinksStep form={form} handleChange={handleChange} />;
      default:
        return <BasicInfoStep form={form} handleChange={handleChange} />;
    }
  };

  if (isCheckingProfile) {
    return (
      <div className="flex flex-col h-dvh gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116] text-white font-sans">
        <SimpleHeader />
        <GradientBackgroundStatic />
        <div className="absolute inset-0 bg-black/40 -z-40" />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-white text-xl">Checking profile status...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-dvh gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116] text-white font-sans">
        <SimpleHeader />
        <GradientBackgroundStatic />
        <div className="absolute inset-0 bg-black/40 -z-40" />

        <div className="mt-32 w-full border border-[rgba(48,242,242,0.20)] overflow-hidden flex min-h-[482px] items-start gap-2 self-stretch mx-auto">
          {/* Left Panel */}
          <div className="flex flex-col p-6 justify-between items-start self-stretch flex-1 border-r border-[rgba(48,242,242,0.20)]">
            <div className=" flex flex-col items-start gap-2.5">
              <h1 className="text-3xl font-medium font-(family-name:--font-heading)">
                Get set up
              </h1>
              <h2 className="text-2xl mt-2 font-(family-name:--font-heading-light)">
                Create your hacker profile
              </h2>
            </div>
            <p className="text-sm text-white/70 max-w-xs">
              Creating a hacker profile is the first step to joining Hack404. It
              gives you access to Launchpad, where you can apply, manage your
              application, and access important information and tools during the
              hackathon weekend if you are accepted.
            </p>
          </div>

          {/* Right Panel */}
          <div className="self-stretch flex-1 p-6 bg-cyan-400/0 border-l border-[rgba(48,242,242,0.20)] backdrop-blur-xl inline-flex flex-col justify-between items-start overflow-hidden">
            <div className="self-stretch flex flex-col justify-start items-start gap-12">
              <div className="self-stretch inline-flex justify-between items-start">
                <div className="justify-start text-white text-base font-normal font-['DM_Sans']">
                  {step === 1 && "Basic Details"}
                  {step === 2 && "Education"}
                  {step === 3 && "Details"}
                  {step === 4 && "Your Links"}
                </div>
                <div className="justify-start text-white text-sm font-extralight font-['DM_Sans']">
                  Step {step}/4
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                {renderStep()}
              </div>
            </div>
            <div className="self-stretch inline-flex justify-between items-end">
              <div className="justify-start text-white text-sm font-extralight font-['DM_Sans']">
                {step === 1 && "Make sure details are correct"}
                {step === 2 && "Verify your education info"}
                {step === 3 && "Check your details"}
                {step === 4 && "Add your links"}
              </div>
              <div className="flex gap-2 items-center">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="h-12 pl-6 pr-4 py-2 bg-transparent rounded-[100px] flex justify-center items-center gap-4 overflow-hidden text-white text-sm font-light font-['DM_Sans'] hover:bg-white/10"
                  >
                    Back
                  </button>
                )}
                <RoundedButton
                  type="button"
                  color="#30F2F2"
                  className="text-black text-sm font-light"
                  onClick={nextStep}
                  disabled={!validateStep() || isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : step < 4
                      ? "Continue"
                      : "Finish"}
                  <svg
                    className="w-5 h-5 text-black"
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
                </RoundedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default function HackerApplication() {
  return (
    <SessionProvider>
      <HackerApplicationContent />
    </SessionProvider>
  );
}
