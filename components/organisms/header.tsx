"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { LoginModal } from "./login-modal";
import { SignUpModal } from "./signup-modal";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { cn } from "@/lib/utils";

export function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side - Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 h-5 w-5">
                <div className="h-0 w-0 border-l-0 border-r-[10px] border-t-[5px] border-b-[5px] border-l-transparent border-r-white border-t-transparent border-b-transparent" />
              </div>
            </div>
            <span className="text-lg font-semibold text-white">AXIOM Pro</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Discover
            </a>
            <a
              href="#"
              className="text-sm text-blue-500 font-medium hover:text-blue-400 transition-colors"
            >
              Pulse
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Trackers
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Perpetuals
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Yield
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Vision
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Rewards
            </a>
          </nav>
        </div>

        {/* Right Side - Search, Dropdown, Buttons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#2a2a2a]">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by token or CA..."
              className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-48"
            />
          </div>

          {/* SOL Dropdown */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] cursor-pointer hover:bg-[#222] transition-colors">
            <span className="text-sm text-white">SOL</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setSignUpOpen(true)}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Sign up
                </button>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded-md transition-colors"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      </header>

      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignUp={() => {
          setLoginOpen(false);
          setSignUpOpen(true);
        }}
      />
      <SignUpModal
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSwitchToLogin={() => {
          setSignUpOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
}

