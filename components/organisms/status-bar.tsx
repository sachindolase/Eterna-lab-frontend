"use client";

import { useState } from "react";
import {
  Settings,
  FileText,
  Wallet,
  Twitter,
  Compass,
  Activity,
  BarChart3,
  RefreshCw,
  ChevronDown,
  Calendar,
  Bell,
  HelpCircle,
  MessageCircle,
  X,
  FileText as Docs,
} from "lucide-react";
import { SignUpModal } from "./signup-modal";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

export function StatusBar() {
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
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="mx-auto flex h-12 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side - Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#1a1a1a] cursor-pointer hover:bg-[#222] transition-colors">
            <Settings className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-white">PRESET 1</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#1a1a1a] cursor-pointer hover:bg-[#222] transition-colors">
            <FileText className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-400">0 0</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>

          <div
            onClick={handleClick}
            className="hidden sm:flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-[#1a1a1a] transition-colors"
          >
            <Wallet className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-white">Wallet</span>
          </div>

          <div
            onClick={handleClick}
            className="hidden md:flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-[#1a1a1a] transition-colors"
          >
            <Twitter className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-white">X Twitter</span>
          </div>

          <div
            onClick={handleClick}
            className="hidden lg:flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-[#1a1a1a] transition-colors"
          >
            <Compass className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-white">Discover</span>
          </div>

          <div
            onClick={handleClick}
            className="hidden lg:flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-[#1a1a1a] transition-colors"
          >
            <Activity className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-white">Pulse</span>
          </div>

          <div
            onClick={handleClick}
            className="hidden lg:flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-[#1a1a1a] transition-colors"
          >
            <BarChart3 className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-white">PnL</span>
          </div>

          <RefreshCw className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        </div>

        {/* Middle - Price Tickers */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-orange-500" />
            <span className="text-xs text-white font-medium">$90.4K</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-blue-500" />
            <span className="text-xs text-white font-medium">$3095</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-purple-500" />
            <span className="text-xs text-white font-medium">$132.96</span>
          </div>
        </div>

        {/* Right Side - Status and Icons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-red-500/20 border border-red-500/30">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs text-red-400">Disconnected</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-[#1a1a1a] transition-colors">
            <span className="text-xs text-white">GLOBAL</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>

          <Calendar
            onClick={handleClick}
            className="hidden lg:block h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors"
          />
          <Bell
            onClick={handleClick}
            className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors"
          />
          <HelpCircle
            onClick={handleClick}
            className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors"
          />
          <MessageCircle
            onClick={handleClick}
            className="hidden sm:block h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors"
          />
          <X
            onClick={handleClick}
            className="hidden sm:block h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors"
          />
          <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:bg-[#1a1a1a] px-2 py-1 rounded transition-colors">
            <Docs className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-white">Docs</span>
          </div>
        </div>
      </div>

    </footer>

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

