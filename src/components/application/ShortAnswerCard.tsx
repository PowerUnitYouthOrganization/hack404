import { Card } from "@/components/ui/card";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

export default function ShortAnswerCard({ label, value, onChange, error, maxLength = 750, ...props }: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  maxLength?: number;
  [key: string]: any;
}) {
  const [currentValue, setCurrentValue] = useState(value || "");
  
  useEffect(() => {
    setCurrentValue(value || "");
  }, [value]);
  
  const currentLength = currentValue.length;
  const remainingChars = maxLength - currentLength;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Enforce hard character limit
    if (e.target.value.length <= maxLength) {
      setCurrentValue(e.target.value);
      onChange?.(e);
    }
  };

  return (
    <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none p-0 rounded-none">
      <div className="p-6">
        <FormItem>
          <FormLabel className="text-white text-base font-normal mb-2 block">
            {label}
          </FormLabel>
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
            <div className={`text-xs ${remainingChars < 50 ? 'text-red-400' : remainingChars < 100 ? 'text-yellow-400' : 'text-white/60'}`}>
              {remainingChars} characters remaining
            </div>
          </div>
        </FormItem>
      </div>
    </Card>
  );
}
