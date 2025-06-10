import { Card } from "@/components/ui/card";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function CreativeQuestionCard({ label, value, onChange, error, maxLength = 250, ...props }: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  maxLength?: number;
  [key: string]: any;
}) {
  const currentLength = value?.length || 0;
  const remainingChars = maxLength - currentLength;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Enforce hard character limit
    if (e.target.value.length <= maxLength) {
      onChange?.(e);
    }
  };
  return (
    <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none p-0 rounded-none">
      <div className="p-6">
        <FormItem>
          <FormLabel className="text-white text-base font-normal mb-2 block">{label}</FormLabel>
          <FormControl>
            <Textarea 
              {...props} 
              value={value} 
              onChange={handleChange} 
              className="bg-[rgba(48,242,242,0.10)] border-none text-white rounded-none" 
              rows={4}
              maxLength={maxLength}
            />
          </FormControl>
          <div className="flex justify-between items-center mt-2">
            <div>
              {error && <FormMessage>{error}</FormMessage>}
            </div>
            <div className={`text-xs ${remainingChars < 25 ? 'text-red-400' : remainingChars < 50 ? 'text-yellow-400' : 'text-white/60'}`}>
              {currentLength}/{maxLength} characters
            </div>
          </div>
        </FormItem>
      </div>
    </Card>
  );
} 