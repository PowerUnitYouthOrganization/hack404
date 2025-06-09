import { Card } from "@/components/ui/card";
import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ActivityCard({ value, onChange, error, ...props }: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  [key: string]: any;
}) {
  return (
    <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none p-0 rounded-none">
      <div className="p-6">
        <FormItem>
          <FormControl>
            <Input {...props} value={value} onChange={onChange} className="bg-[rgba(48,242,242,0.10)] border-none text-white rounded-none px-4 py-2" placeholder="e.g. team-building games, tech talks, etc." />
          </FormControl>
          {error && <FormMessage>{error}</FormMessage>}
        </FormItem>
      </div>
    </Card>
  );
} 