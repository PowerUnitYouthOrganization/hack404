import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function AvatarPickerCard({ avatar, setAvatar, selectedColor, setSelectedColor }: {
  avatar: string[][];
  setAvatar: (a: string[][]) => void;
  selectedColor: string;
  setSelectedColor: (c: string) => void;
}) {
  const colors = ["#3e4da3", "#ffffff", "#000000", "#acf652", "#d3d3d3", "#27cecd"];
  const [isDrawing, setIsDrawing] = useState(false);

  const handleCellChange = (rowIndex: number, colIndex: number) => {
    const newAvatar = avatar.map((r, i) =>
      i === rowIndex ? r.map((c, j) => (j === colIndex ? selectedColor : c)) : r
    );
    setAvatar(newAvatar);
  };

  return (
    <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none p-6 rounded-none">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-3 mb-2">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 cursor-pointer rounded-md transition-all ${selectedColor === color ? "ring-2 ring-offset-2 ring-primary" : "ring-1 hover:ring-2 hover:ring-offset-1"}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="border border-gray-200/20 p-2 rounded-md">
          <div 
            className="grid grid-cols-8 gap-0 w-fit rounded-0"
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          >
            {avatar.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onMouseDown={() => handleCellChange(rowIndex, colIndex)}
                  onMouseEnter={() => isDrawing && handleCellChange(rowIndex, colIndex)}
                  className="w-8 h-8 cursor-pointer transition-colors hover:opacity-80"
                  style={{ backgroundColor: cell }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
} 