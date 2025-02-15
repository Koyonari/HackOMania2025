"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  ChevronRight,
  Bell,
  Home,
  MessageSquare,
  User,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    // This is a placeholder - replace with your actual auth check
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl my-2">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center font-bold text-3xl">
            <span className="inline bg-gradient-to-r from-brand-primary ml-[-1vw] to-accent-primary text-transparent bg-clip-text">
              BET
            </span>
            <span className="text-text-primary">ter</span>
            <span className="inline bg-gradient-to-r bg-brand-primary/10 bg-clip-text pr-10">
              Help
            </span>
          </a>
          <div className="hidden md:flex items-center gap-12 font-bold text-2xl">
            <a
              href="#features"
              className="text-gray-600 hover:text-accent-primary flex items-center gap-1"
            >
              <span>Home</span>
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-accent-primary flex items-center gap-1"
            >
              <span>Forum</span>
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-accent-primary flex items-center gap-1"
            >
              <span>Notifications</span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <a
              href="/notifications"
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-accent-primary"
            >
              <Bell size={20} />
              <span>Notifications</span>
            </a>
          )}

          {!isLoggedIn ? (
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-bg-primary font-bold">
              <LogIn size={18} />
              <span className="ml-2">Log In</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="bg-brand-primary hover:bg-brand-primary/90">
              <User size={18} />
              <span className="ml-2">Profile</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
