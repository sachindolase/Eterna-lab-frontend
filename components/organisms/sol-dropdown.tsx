"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const chains = [
  {
    id: "sol",
    name: "Solana",
    logo: "🟣",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "bnb",
    name: "BNB",
    logo: "🟡",
    color: "from-yellow-500 to-orange-500",
  },
];

interface SolDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function SolDropdown({ value = "sol", onChange }: SolDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedChain = chains.find((c) => c.id === value) || chains[0];

  const handleSelect = (chainId: string) => {
    onChange?.(chainId);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#222] transition-colors">
          <div
            className={cn(
              "w-5 h-5 rounded-full bg-gradient-to-br flex items-center justify-center text-xs",
              selectedChain.color
            )}
          >
            {selectedChain.logo}
          </div>
          <span className="text-sm text-white">{selectedChain.name.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 bg-[#1a1a1a] border-[#2a2a2a] p-2"
        align="start"
      >
        <div className="space-y-1">
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleSelect(chain.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-[#0f0f0f] transition-colors text-left",
                value === chain.id && "bg-[#0f0f0f]"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-gradient-to-br flex items-center justify-center text-xs",
                  chain.color
                )}
              >
                {chain.logo}
              </div>
              <span className="text-sm text-white">{chain.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

