import React from "react";
import { cn } from "@/lib/utils";
import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  MessageCircle,
  Video,
} from "lucide-react";

interface SocialButtonProps {
  platform:
    | "instagram"
    | "twitter"
    | "linkedin"
    | "github"
    | "discord"
    | "tiktok";
  url: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const platformConfig = {
  instagram: {
    name: "Instagram",
    color: "#E4405F",
    icon: Instagram,
  },
  twitter: {
    name: "Twitter",
    color: "#1DA1F2",
    icon: Twitter,
  },
  linkedin: {
    name: "LinkedIn",
    color: "#0077B5",
    icon: Linkedin,
  },
  github: {
    name: "GitHub",
    color: "#333",
    icon: Github,
  },
  discord: {
    name: "Discord",
    color: "#5865F2",
    icon: MessageCircle,
  },
  tiktok: {
    name: "TikTok",
    color: "#000",
    icon: Video,
  },
};

export default function SocialButton({
  platform,
  url,
  className,
}: SocialButtonProps) {
  const config = platformConfig[platform];
  const IconComponent = config.icon;

  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded-[100px] font-light cursor-pointer transition-all",
        "bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px] border border-[rgba(48,242,242,0.2)]",
        "hover:bg-[rgba(48,242,242,0.30)] hover:border-[rgba(48,242,242,0.4)]",
        "text-white hover:text-white p-4",
      )}
    >
      <IconComponent className={cn("transition-colors size-8")} />
    </button>
  );
}

// Convenience component for Instagram specifically
export function InstagramButton({
  url,
  className,
  size = "md",
}: Omit<SocialButtonProps, "platform">) {
  return (
    <SocialButton
      platform="instagram"
      url={url}
      className={className}
      size={size}
    />
  );
}

// Convenience component for LinkedIn specifically
export function LinkedInButton({
  url,
  className,
  size = "md",
}: Omit<SocialButtonProps, "platform">) {
  return (
    <SocialButton
      platform="linkedin"
      url={url}
      className={className}
      size={size}
    />
  );
}
