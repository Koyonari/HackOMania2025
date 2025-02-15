"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, Bell, User, LogIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signInWithGithub, signInWithGoogle } from "@/app/login/actions";
import { UserNav } from "./UserNav";
import { createClient } from '@/utils/supabase/client'

export const Navbar = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const openSignInPopup = () => {
    setShowSignInPopup(true);
  };

  const closeSignInPopup = () => {
    setShowSignInPopup(false);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data: user, error } = await supabase.auth.getUser();
    
      if (error) {
        console.error("Error fetching user:", error);
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(!!user);
      }
    };

    checkLoginStatus(); // Run on mount

    // Listen for storage changes (detect login/logout changes across tabs)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  return (
    <>
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
              <Button onClick={openSignInPopup} className="bg-brand-primary hover:bg-brand-primary/90 text-bg-primary font-bold">
              <LogIn size={18} />
              <span className="ml-2">Log In</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            ) : (
              <UserNav />
            )}
          </div>
        </div>
      </nav>

      {/* Sign In Popup */}
      {showSignInPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-black text-white rounded-lg w-full max-w-md mx-4 p-6 shadow-xl">
            <button
              onClick={closeSignInPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col justify-center items-center w-full p-4">
              <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
              <p className="text-gray-400 mb-6 text-sm text-center">
                Time to Bet and Earn Big
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                  onClick={() => {
                    signInWithGoogle();
                    closeSignInPopup();
                  }}
                  className="bg-gray-700 flex-1 py-3 rounded-lg font-semibold hover:bg-gray-600"
                >
                  Sign In with Google
                </button>
                <button
                  onClick={() => {
                    signInWithGithub();
                    closeSignInPopup();
                  }}
                  className="bg-gray-700 flex-1 py-3 rounded-lg font-semibold hover:bg-gray-600"
                >
                  Sign In with Github
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
