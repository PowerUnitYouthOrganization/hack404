import { Form, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { avatarToCanvas, canvasToBlob } from "@/lib/avatar-to-image";
import RoundedButton from "@/components/ui/roundedbutton";
import ShortAnswerCard from "@/components/application/ShortAnswerCard";
import CreativeQuestionCard from "@/components/application/CreativeQuestionCard";
import AvatarPickerCard from "@/components/application/AvatarPickerCard";
import WorkshopsCard from "@/components/application/WorkshopsCard";
import ActivityCard from "@/components/application/ActivityCard";
import ConsentCard from "@/components/application/ConsentCard";
import AiCard from "@/components/application/AiCard";

const workshopOptions = [
  "Artificial Intelligence",
  "Web Development",
  "AI-Assisted Development",
  "Entrepreneurship",
  "Hackathon Pitching",
  "UI/UX Design",
  "Project Deployment",
];

const formSchema = z.object({
  shortAnswer1: z.string().max(750, "Maximum 750 characters").min(1, "Required"),
  shortAnswer2: z.string().max(750, "Maximum 750 characters").min(1, "Required"),
  creativeQuestion: z.string().max(50, "Maximum 50 characters").min(1, "Required"),
  activity: z.string().max(300, "Maximum 300 characters").optional(),
  workshops: z.array(z.string()).max(3, "Select up to 3 workshops").min(1, "Select at least 1 workshop"),
  resumeConsented: z.boolean(),
  overnightConsented: z.boolean(),
  aiUsed: z.boolean(),
  otherWorkshop: z.string().optional(),
});

type ApplicationForm = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  stream: "beginner" | "normal";
  shortAnswer1: {
    label: string;
    maxLength?: number;
  };
  shortAnswer2: {
    label: string;
    maxLength?: number;
  };
  streamDescription: string;
}

export default function ApplicationForm({ stream, shortAnswer1, shortAnswer2, streamDescription }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatar, setAvatar] = useState<string[][]>(Array.from({ length: 8 }, () => Array(8).fill("#ffffff")));
  const [selectedColor, setSelectedColor] = useState<string>("#3e4da3");
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const form = useForm<ApplicationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shortAnswer1: "",
      shortAnswer2: "",
      creativeQuestion: "",
      activity: "",
      workshops: [],
      resumeConsented: false,
      overnightConsented: false,
      aiUsed: false,
      otherWorkshop: "",
    },
  });

  async function onSubmit(values: ApplicationForm) {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const canvas = avatarToCanvas(avatar);
      const blob = await canvasToBlob(canvas);
      const formData = new FormData();
      formData.append("stream", stream);
      formData.append("shortAnswer1", values.shortAnswer1);
      formData.append("shortAnswer2", values.shortAnswer2);
      formData.append("creativeQuestion", values.creativeQuestion);
      formData.append("activity", values.activity || "");
      formData.append("workshops", JSON.stringify(values.workshops));
      formData.append("resumeConsented", String(values.resumeConsented));
      formData.append("overnightConsented", String(values.overnightConsented));
      formData.append("aiUsed", String(values.aiUsed));
      formData.append("otherWorkshop", values.otherWorkshop || "");
      formData.append("avatarPixels", JSON.stringify(avatar));
      formData.append("avatar", blob, "avatar.png");
      const response = await fetch("/api/upload-application", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }
      // Success
      alert("Application submitted successfully!");
      // window.location.href = "/launchpad";
    } catch (error: any) {
      setSubmitError(error.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        {/* Short Answer Section */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">Short Answer Questions <span className="font-normal text-white/60">(maximum {shortAnswer1.maxLength || 250} characters)</span></h3>
          <div className="flex flex-col gap-6 mt-4">
            <ShortAnswerCard
              label={shortAnswer1.label}
              {...form.register("shortAnswer1")}
            />
            <ShortAnswerCard
              label={shortAnswer2.label}
              {...form.register("shortAnswer2")}
            />
          </div>
        </div>
        {/* Creative Questions Section */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">Creative Questions <span className="font-normal text-white/60">(maximum 250 characters)</span></h3>
          <div className="flex flex-col gap-6 mt-4">
            <CreativeQuestionCard
              label="If you could 'hack' any everyday object (like a toaster, a chair, or a backpack), what would you hack and what would it do?"
              {...form.register("creativeQuestion")}
            />
          </div>
        </div>
        {/* Avatar Picker */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">Draw yourself an avatar!</h3>
          <AvatarPickerCard
            avatar={avatar}
            setAvatar={setAvatar}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
        {/* Workshops */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">Feedback</h3>
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-white text-base font-normal mb-2">What workshops would you like to see at Hack404? <span className="font-normal text-white/60">(choose up to 3)</span></h4>
              <WorkshopsCard
                options={workshopOptions}
                selectedWorkshops={form.watch("workshops")}
                onWorkshopSelect={(workshop) => {
                  const current = form.getValues("workshops");
                  if (current.includes(workshop)) {
                    form.setValue("workshops", current.filter((w) => w !== workshop));
                  } else {
                    if (current.length < 3) {
                      form.setValue("workshops", [...current, workshop]);
                    }
                  }
                }}
                otherWorkshop={form.watch("otherWorkshop")}
                onOtherWorkshopChange={(e) => form.setValue("otherWorkshop", e.target.value)}
              />
              {form.watch("workshops").includes("Other") && (
                <div className="mt-4">
                  <ActivityCard
                    {...form.register("otherWorkshop")}
                    placeholder="Please specify your other workshop"
                  />
                </div>
              )}
              <FormMessage>{form.formState.errors.workshops?.message as string}</FormMessage>
            </div>
            <div>
              <h4 className="text-white text-base font-normal mb-2">What activities are you interested in seeing at Hack404? <span className="font-normal text-white/60">(Optional)</span></h4>
              <ActivityCard
                {...form.register("activity")}
              />
            </div>
          </div>
        </div>
        {/* Hacker Consent Section */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">Hacker Consent</h3>
          <div className="flex flex-col gap-4">
            <ConsentCard
              label="I consent to my resume being collected by sponsors"
              checked={form.watch("resumeConsented")}
              onCheckedChange={(v: boolean) => form.setValue("resumeConsented", v)}
            />
            <ConsentCard
              label="I plan to stay overnight at the event"
              checked={form.watch("overnightConsented")}
              onCheckedChange={(v: boolean) => form.setValue("overnightConsented", v)}
            />
          </div>
        </div>
        {/* AI Question */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">Artificial Intelligence</h3>
          <AiCard
            checked={form.watch("aiUsed")}
            onCheckedChange={(v: boolean) => form.setValue("aiUsed", !!v)}
          />
        </div>
        {submitError && <div className="text-red-400 text-sm mt-2">{submitError}</div>}
        <div className="flex justify-end">
          <RoundedButton type="submit" className="bg-[#C3F73A] text-black px-8 py-3 rounded-[100px] font-medium text-lg transition-all duration-200 flex items-center gap-2" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </RoundedButton>
        </div>
      </form>
    </Form>
  );
} 