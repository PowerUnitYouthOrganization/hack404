import { Card } from "@/components/ui/card";
import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function ActivityCard({ value, onChange, error, maxLength = 300, ...props }: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <FormControl>
            <Input 
              {...props} 
              value={value} 
              onChange={handleChange} 
              className="bg-[rgba(48,242,242,0.10)] border-none text-white rounded-none px-4 py-2" 
              placeholder="e.g. team-building games, tech talks, etc."
              maxLength={maxLength}            />
          </FormControl>
          <div className="flex justify-between items-center mt-2">
            <div>
              {error && <FormMessage>{error}</FormMessage>}
            </div>
            <div className={`text-xs ${remainingChars < 30 ? 'text-red-400' : remainingChars < 60 ? 'text-yellow-400' : 'text-white/60'}`}>
              {remainingChars} characters remaining
            </div>
          </div>
        </FormItem>
      </div>
    </Card>
  );
}
