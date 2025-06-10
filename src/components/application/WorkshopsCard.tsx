import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function WorkshopsCard({
  options,
  selectedWorkshops,
  onWorkshopSelect,
  otherWorkshop = "",
  onOtherWorkshopChange,
}: {
  options: string[];
  selectedWorkshops: string[];
  onWorkshopSelect: (workshop: string) => void;
  otherWorkshop?: string;
  onOtherWorkshopChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const allOptions = [...options, "Other"];

  return (
    <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none p-0 rounded-none">
      <div className="p-6">
        <div className="flex flex-col gap-3">
          {allOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer text-white text-sm font-light py-1"
            >
              <Checkbox
                checked={selectedWorkshops.includes(option)}
                onCheckedChange={() => onWorkshopSelect(option)}
                id={option}
                className="size-5"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
}
