"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Filters = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white"
        >
          {value
            ? Filters.find((filter) => filter.value === value)?.label
            : "Select filter..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-zinc-900 border border-zinc-700">
        <Command className="bg-zinc-900">
          <CommandInput
            placeholder="Search filter..."
            className="h-9 bg-zinc-800 text-white border-zinc-700"
          />
          <CommandList className="bg-zinc-900">
            <CommandEmpty className="text-gray-300">
              No filter found.
            </CommandEmpty>
            <CommandGroup>
              {Filters.map((filter) => (
                <CommandItem
                  key={filter.value}
                  value={filter.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="text-gray-200 hover:bg-zinc-800"
                >
                  {filter.label}
                  <Check
                    className={cn(
                      "ml-auto text-white",
                      value === filter.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
