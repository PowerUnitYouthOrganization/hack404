import { SessionProvider } from "next-auth/react";
import LoginForm from "@/app/login/loginForm";
import GradientBackgroundStatic from "@/components/gradient-background-static";

export default function SignIn() {
  return (
    <div className="flex flex-col h-dvh gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.5)] to-[#0E1116]">
      <GradientBackgroundStatic />
      <SessionProvider>
        <LoginForm />
      </SessionProvider>
    </div>
  );
}
