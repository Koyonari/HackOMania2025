import React from "react";
import { Github, ChevronRight } from "lucide-react"; // Assuming these are from lucide-react
import { Button } from "@/components/ui/button"; // Adjust the import path if needed

export const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
    {/* Navigation */}
    <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
      <div className="flex items-center gap-8">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-accent-primary text-transparent bg-clip-text">
            BETter
          </span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-gray-600 hover:text-accent-primary"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-accent-primary"
          >
            Pricing
          </a>
          <a href="#about" className="text-gray-600 hover:text-accent-primary">
            About
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/leoMirandaa/shadcn-landing-page.git"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 text-gray-600 hover:text-accent-primary"
        >
          <Github size={20} />
          <span>GitHub</span>
        </a>
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          Get Started
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </nav>
);
