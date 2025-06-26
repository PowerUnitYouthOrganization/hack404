import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { handleSignOut } from "@/lib/utils";

interface ProfileDropdownProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({ isVisible, onClose }: ProfileDropdownProps) {
  const { data: session } = useSession();
  const avatarUrl = session?.user?.image || null;

  // Get user's name parts
  const fullName = session?.user?.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  if (!isVisible) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 backdrop-blur-[25px] rounded-lg p-4 z-50">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12 rounded-md">
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback className="bg-wblack/20 text-white">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-white font-medium">
            {firstName} {lastName}
          </span>
          <span className="text-white/60 text-xs">{session?.user?.email}</span>
        </div>
      </div>
      <div className="border-t border-cyan-400/20 pt-3">
        {/* TODO: figure out why this is not working */}
        <Button
          variant="outline"
          size="sm"
          className="bg-wlime w-full text-black border-cyan-400/20 hover:bg-cyan-400/10"
          onClick={() => {
            handleSignOut();
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
