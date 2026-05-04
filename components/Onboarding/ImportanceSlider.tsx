"use client";
import { Slider } from "@/components/ui/slider";
import {
  DEFAULT_IMPORTANCE_LEVEL,
  IMPORTANCE_OPTIONS,
} from "@/global/constants/onboarding.constants";
import { type ImportanceLevel } from "@/global/types/onboarding.types";

interface ImportanceSliderProps {
  value: ImportanceLevel;
  onValueChange: (val: ImportanceLevel) => void;
}

export default function ImportanceSlider({
  value,
  onValueChange,
}: ImportanceSliderProps) {
  const numericValue = value === "" ? DEFAULT_IMPORTANCE_LEVEL : Number(value);

  return (
    <div className="flex flex-col gap-2 pt-1">
      <div className="flex justify-between items-center text-sm px-0.5">
        <span className="text-muted-foreground text-xs">Nicht wichtig</span>
        <span className="text-muted-foreground text-xs">Neutral</span>
        <span className="text-muted-foreground text-xs">Sehr wichtig</span>
      </div>

      <Slider
        min={1}
        max={5}
        step={1}
        value={numericValue !== null ? [numericValue] : [1]}
        onValueChange={(vals) =>
          onValueChange(String(vals[0]) as ImportanceLevel)
        }
        className={numericValue === null ? "opacity-40" : ""}
      />

      <div className="flex justify-between px-0.5">
        {IMPORTANCE_OPTIONS.map((option) => (
          <span
            key={option.value}
            className={`text-xs transition-colors ${
              value === option.value
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {option.value}
          </span>
        ))}
      </div>
    </div>
  );
}
