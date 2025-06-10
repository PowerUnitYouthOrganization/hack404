"use client";

import GradientBackgroundStatic from "@/components/gradient-background-static";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyRequestContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const provider = searchParams.get("provider");

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116] p-4">
      <GradientBackgroundStatic />

      <div className="relative z-10 max-w-md w-full">
        <div className="text-center mb-8">
          <Image
            src="/clearlogo.png"
            alt="Hack404 Logo"
            width={52}
            height={38}
            className="mx-auto mb-4"
          />
          <h1 className="text-white text-3xl font-bold mb-2">
            Check your email
          </h1>
        </div>

        <div className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 backdrop-blur-[25px] rounded-lg p-8 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto mb-4 text-cyan-400"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="22,6 12,13 2,6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-white text-xl font-semibold mb-4">
            Sign in link sent!
          </h2>

          <p className="text-white/80 mb-4">
            {email ? (
              <>
                A sign in link has been sent to{" "}
                <span className="font-medium text-cyan-400">{email}</span>
              </>
            ) : (
              "A sign in link has been sent to your email address"
            )}
          </p>

          <p className="text-white/60 text-sm">
            Click the link in the email to sign in. You can close this tab.
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/40 text-sm">
            Didn't receive the email? Check your spam folder or try again.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyRequestPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
          <GradientBackgroundStatic />
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <VerifyRequestContent />
    </Suspense>
  );
}
