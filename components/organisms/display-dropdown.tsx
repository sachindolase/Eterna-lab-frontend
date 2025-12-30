"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/popover";
import {
  List,
  ChevronDown,
  Search,
  Hash,
  Eye,
  Circle,
  RefreshCw,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DisplayDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Layout");
  const [metricsSize, setMetricsSize] = useState("Large");
  const [quickBuySize, setQuickBuySize] = useState("Small");

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#222] transition-colors">
          <List className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-white">Display</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 bg-[#1a1a1a] border-[#2a2a2a] p-0"
        align="end"
      >
        <div className="p-4 space-y-4">
          {/* Metrics Section */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase">Metrics</label>
            <div className="flex gap-2">
              <button
                onClick={() => setMetricsSize("Small")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium transition-colors",
                  metricsSize === "Small"
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-[#0f0f0f] text-gray-400 hover:text-white"
                )}
              >
                MC 77K Small
              </button>
              <button
                onClick={() => setMetricsSize("Large")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium transition-colors",
                  metricsSize === "Large"
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-[#0f0f0f] text-gray-400 hover:text-white"
                )}
              >
                MC 77K Large
              </button>
            </div>
          </div>

          {/* Quick Buy Section */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase">Quick Buy</label>
            <div className="flex gap-2 flex-wrap">
              {["Small", "Large", "Mega", "Ultra"].map((size) => (
                <button
                  key={size}
                  onClick={() => setQuickBuySize(size)}
                  className={cn(
                    "relative px-3 py-1.5 rounded text-xs font-medium transition-colors",
                    quickBuySize === size
                      ? "bg-[#2a2a2a] text-white"
                      : "bg-[#0f0f0f] text-gray-400 hover:text-white"
                  )}
                >
                  {quickBuySize === size && (
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">47</span>
                    </div>
                  )}
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Sun className="h-4 w-4" />
            <span>Grey</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-[#2a2a2a]">
            {["Layout", "Metrics", "Row", "Extras"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-2 text-xs font-medium transition-colors border-b-2",
                  activeTab === tab
                    ? "border-blue-500 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Options List */}
          <div className="space-y-2 pt-2">
            {activeTab === "Layout" && (
              <>
                <button className="w-full flex items-center gap-3 px-2 py-2 hover:bg-[#0f0f0f] rounded transition-colors text-left">
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-white">Show Search Bar</span>
                </button>
                <button className="w-full flex items-center gap-3 px-2 py-2 hover:bg-[#0f0f0f] rounded transition-colors text-left">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-white"># No Decimals</span>
                </button>
                <button className="w-full flex items-center gap-3 px-2 py-2 hover:bg-[#0f0f0f] rounded transition-colors text-left">
                  <Eye className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-white">Show Hidden Tokens</span>
                </button>
                <button className="w-full flex items-center gap-3 px-2 py-2 hover:bg-[#0f0f0f] rounded transition-colors text-left">
                  <Eye className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-white">◎ Unhide on Migrated</span>
                </button>
                <button className="w-full flex items-center gap-3 px-2 py-2 hover:bg-[#0f0f0f] rounded transition-colors text-left">
                  <Circle className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-white">Circle Images</span>
                </button>
                <button className="w-full flex items-center gap-3 px-2 py-2 hover:bg-[#0f0f0f] rounded transition-colors text-left">
                  <RefreshCw className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-white">Progress Bar</span>
                </button>
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

