"use client";

import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { HeroCards } from "./HeroCards";
import { signInWithGithub, signInWithGoogle } from "@/app/login/actions";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export const Hero = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      let {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      let user = session?.user;

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
  }, []); // Empty dependency array

  const openSignInPopup = () => {
    if (isLoggedIn) {
      router.push("/app");
    } else {
      setShowSignInPopup(true);
    }
  };

  const closeSignInPopup = () => {
    setShowSignInPopup(false);
  };

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl" />
          <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-accent-primary/10 blur-3xl" />
        </div>

        <div className="container relative grid lg:grid-cols-2 place-items-center py-12 md:py-20  mx-auto">
          <div className="text-center lg:text-start space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                <span className="inline bg-gradient-to-r from-brand-primary to-accent-primary text-transparent bg-clip-text">
                  BET
                </span>
                <span className="text-text-primary">ter</span>
                <span className="inline bg-gradient-to-r bg-brand-primary/10 bg-clip-text">
                  Help
                </span>
              </h1>

              <p className="text-xl text-gray-600 md:w-10/12 mx-auto lg:mx-0 leading-relaxed">
                Bet your addictions away with the help of our community of
                volunteers. Built by addicts, for addicts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className="bg-brand-primary hover:bg-brand-primary/70 text-white font-bold px-8 py-6 text-lg"
                onClick={openSignInPopup}
              >
                Get Started
              </Button>

              <button
                onClick={openSignInPopup}
                className={`${buttonVariants({
                  variant: "outline",
                })} px-8 py-6 text-xl border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white transition-colors`}
              >
                <FaMoneyBillTrendUp className="mr-2 w-5 h-5" />
                <div className="font-bold">Bet Now</div>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex -space-x-2">
                {[
                  { id: 1, img: "https://i.pravatar.cc/150?img=70" },
                  { id: 2, img: "https://i.pravatar.cc/150?img=65" },
                  { id: 3, img: "https://i.pravatar.cc/150?img=60" },
                  { id: 4, img: "https://i.pravatar.cc/150?img=20" },
                ].map((avatar) => (
                  <div
                    key={avatar.id}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img
                      src={avatar.img}
                      alt={`User ${avatar.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-gray-600">
                <span className="font-semibold text-brand-primary">1,000+</span>{" "}
                addicts trust BETterHelp
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-2xl">
            <HeroCards />
          </div>
        </div>
      </section>

      {/* Sign In Popup */}
      <AnimatePresence>
        {showSignInPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-card text-card-foreground rounded-lg w-full max-w-md mx-4 p-8 shadow-2xl border border-border/30"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <motion.button
                onClick={closeSignInPopup}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ rotate: 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <X size={24} />
              </motion.button>

              <div className="flex flex-col justify-center items-center w-full p-2">
                <motion.h2
                  className="text-3xl font-bold mb-4 text-foreground"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Welcome Back
                </motion.h2>

                <motion.p
                  className="text-muted-foreground mb-8 text-md text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Start your journey with us
                </motion.p>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <motion.button
                    onClick={() => {
                      signInWithGoogle();
                      closeSignInPopup();
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                        fill="white"
                      />
                    </svg>
                    Sign In with Google
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      signInWithGithub();
                      closeSignInPopup();
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        fill="white"
                      />
                    </svg>
                    Sign In with Github
                  </motion.button>
                </div>

                <motion.div
                  className="text-xs text-center mt-6 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  By signing in, you agree to our Terms of Service and Privacy
                  Policy
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
