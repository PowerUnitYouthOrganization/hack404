"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { isProfileComplete } from "../utils/profileCompletion";
import { useSession, signIn } from "next-auth/react";
import SimpleHeader from "@/components/simple-header";
import RoundedButton from "@/components/ui/roundedbutton";

/**
 * LoginForm component handles user login via email.
 * @returns Login form component that handles email login and redirects based on profile completion.
 */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email) {
        console.error("Email is required");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        console.error("Invalid email format");
        return;
      }
      // Check if email is already registered
      // if we never find a reason to use this, just delete it lol
      const emailResponse = await fetch(
        `/api/email-exists?email=${encodeURIComponent(email)}`,
      );
      console.log(emailResponse);
      const data = await emailResponse.json();

      if (!data.exists) console.log("New email, register: ", email);
      else console.log("Existing email, login: ", email);

      if (session?.user?.email) {
        isProfileComplete(session.user.email).then((profileDone) => {
          if (profileDone) {
            window.location.href = "/application";
          } else {
            window.location.href = "/profile";
          }
        });
      }

      await signIn("resend", { email, redirectTo: "/profile" });
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  /* likely dont need this.
	if (status === "authenticated") {
		if (session?.user?.email) {
			isProfileComplete(session.user.email).then((profileDone) => {
				if (profileDone) {
					window.location.href = "/application";
				} else {
					window.location.href = "/profile";
				}
			});
		}
		return null;
	}
	*/

  return (
    <>
      <SimpleHeader />
      <div className="flex self-stretch pt-0 tablet:pt-32 flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="self-stretch h-full tablet:h-96 px-2 outline outline-offset-[-1px] outline-cyan-400/20 flex flex-col tablet:flex-row justify-start items-start gap-2 overflow-hidden">
          <div className="flex tablet:flex-1 self-stretch p-6 outline outline-cyan-400/20 flex-col gap-6 tablet:justify-between items-start">
            <div className="flex flex-col justify-start items-start tablet:gap-2.5">
              <h1 className="justify-start text-white text-4xl font-normal font-(family-name:--font-heading)">
                Welcome to Hack404
              </h1>
              <p className="justify-start text-white text-xl tablet:text-4xl font-(family-name:--font-heading-light)">
                Launchpad
              </p>
            </div>
            <p className="justify-start text-white text-base font-extralight font-['DM_Sans']">
              Applications close June 18
            </p>
          </div>
          <div className="flex-1 mobile:flex-1 self-stretch p-6 bg-cyan-400/0 border border-cyan-400/20 backdrop-blur-xl flex flex-col gap-5 tablet:justify-between items-start overflow-hidden">
            <div className="self-stretch flex flex-col justify-start items-start gap-12">
              <div className="self-stretch inline-flex justify-between items-start">
                <p className="justify-start text-white text-base font-normal">
                  Sign in to your account
                </p>
                <p className="text-right mobile:text-left text-white text-sm font-extralight">
                  We'll send you a magic link to access the Launchpad
                </p>
              </div>
              <form
                onSubmit={handleEmailSubmit}
                className="self-stretch flex flex-col justify-start items-start gap-6"
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="flex flex-col items-end gap-6 self-stretch p-6 border-b border-cyan-400/20 bg-cyan-400/5 backdrop-blur-[25px]"
                />
                <div className="flex flex-col items-end gap-[9px] self-stretch">
                  <RoundedButton
                    type="submit"
                    className="bg-wlime w-full text-wblack dark:text-white py-4 pl-6 pr-4 rounded-[100px] font-light"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Continue"}
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
                </div>
              </form>
            </div>
            <p className="justify-start text-white text-sm font-extralight font-['DM_Sans']">
              Use the same email to log in each time
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
