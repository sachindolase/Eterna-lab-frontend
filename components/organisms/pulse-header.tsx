"use client";

import { useState } from "react";
import { Menu, Box, HelpCircle, Bookmark, Grid3x3, Volume2, Settings, FileText, ChevronDown } from "lucide-react";
import { SignUpModal } from "./signup-modal";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

export function PulseHeader() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setSignUpOpen(true);
    }
  };

  return (
    <>
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-[#1a1a1a]">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Pulse</h1>
        <div className="flex items-center gap-2">
          <Menu className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          <Box className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>

      {/* Right Side - Controls */}
      <div className="flex items-center gap-3">
        <HelpCircle className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] cursor-pointer hover:bg-[#222] transition-colors">
          <span className="text-sm text-white">Display</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <Bookmark
            onClick={handleClick}
            className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors"
          />
          <Grid3x3
            onClick={handleClick}
            className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors"
          />
          <Volume2
            onClick={handleClick}
            className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors"
          />
          <Settings
            onClick={handleClick}
            className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors"
          />
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#1a1a1a] cursor-pointer hover:bg-[#222] transition-colors">
            <FileText className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-400">0 0</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#1a1a1a] cursor-pointer hover:bg-[#222] transition-colors">
            <span className="text-xs text-white">0</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
        </div>
      </div>

      </div>

      <SignUpModal
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSwitchToLogin={() => {
          setSignUpOpen(false);
        }}
      />
    </>
  );
}

