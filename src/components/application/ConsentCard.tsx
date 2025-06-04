import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ConsentCard({ label, checked, onCheckedChange }: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none p-0 rounded-none">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={checked}
            onCheckedChange={onCheckedChange}
            id={label}
            className="size-5"
          />
          <label htmlFor={label} className="text-white text-sm font-light cursor-pointer py-1">
            <span>{label}</span>
          </label>
        </div>
      </div>
    </Card>
  );
} 