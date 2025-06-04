import { Card } from "@/components/ui/card";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function ShortAnswerCard({ label, value, onChange, error, ...props }: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  [key: string]: any;
}) {
  return (
    <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none p-0 rounded-none">
      <div className="p-6">
        <FormItem>
          <FormLabel className="text-white text-base font-normal mb-2 block">{label}</FormLabel>
          <FormControl>
            <Textarea {...props} value={value} onChange={onChange} className="bg-[rgba(48,242,242,0.10)] border-none text-white rounded-none" rows={4} />
          </FormControl>
          {error && <FormMessage>{error}</FormMessage>}
        </FormItem>
      </div>
    </Card>
  );
} 