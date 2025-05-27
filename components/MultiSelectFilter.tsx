"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectFilterProps {
  title: string;
  options: { value: string | number; label: string }[];
  selectedValues: (string | number)[];
  onSelectionChange: (values: (string | number)[]) => void;
  className?: string;
}

export const MultiSelectFilter = ({
  title,
  options,
  selectedValues,
  onSelectionChange,
  className = "",
}: MultiSelectFilterProps) => {
  const [open, setOpen] = useState(false);

  const handleToggleOption = (value: string | number) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onSelectionChange(newSelection);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return `All ${title}`;
    }
    if (selectedValues.length === 1) {
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option ? option.label : `1 ${title}`;
    }
    return `${selectedValues.length} ${title}`;
  };

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white"
          >
            {getDisplayText()}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-zinc-900 border border-zinc-700">
          <div className="max-h-60 overflow-auto p-1">
            {" "}
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 p-2 hover:bg-zinc-800 cursor-pointer rounded text-gray-200 transition-colors"
                onClick={() => handleToggleOption(option.value)}
              >
                <div className="flex items-center justify-center w-4 h-4 border border-gray-600 rounded cursor-pointer">
                  {selectedValues.includes(option.value) && (
                    <Check className="h-3 w-3 text-[#D6FF00]" />
                  )}
                </div>
                <span className="text-sm cursor-pointer">{option.label}</span>
              </div>
            ))}
          </div>{" "}
          {selectedValues.length > 0 && (
            <div className="border-t border-zinc-700 p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectionChange([])}
                className="w-full text-gray-300 hover:text-white hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                Clear All
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
