import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function AiCard({ checked, onCheckedChange }: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none p-0 rounded-none">
      <div className="p-6 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
          <span className="text-white text-base font-light">I used AI to help with my application</span>
        </div>
        <span className="text-white/60 text-xs mt-1">This question is for data collection only and will not be used to evaluate your application.</span>
      </div>
    </Card>
  );
} 