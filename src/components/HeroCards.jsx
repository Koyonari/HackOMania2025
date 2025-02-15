"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Facebook } from "lucide-react";
import { BsTelegram } from "react-icons/bs";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Simon Tan",
    username: "@simon_tan",
    text: "I've been using this for a few months now and I've already been nicotine-free for 3 weeks. I can't thank the community enough for their support.",
    image: "https://github.com/shadcn.png",
  },
  {
    name: "Alice Wong",
    username: "@alice_wong",
    text: "The support system here is incredible. I never thought I'd make it this far, but now I'm 2 months free of my addiction!",
    image: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "James Lee",
    username: "@james_lee",
    text: "This platform has truly changed my life. The encouragement from the community kept me going when I wanted to give up.",
    image: "https://i.pravatar.cc/150?img=30",
  },
  {
    name: "Maria Gomez",
    username: "@maria_gomez",
    text: "Finding this community was the best thing that happened to me. I'm now living a healthier, addiction-free life!",
    image: "https://i.pravatar.cc/150?img=50",
  },
  {
    name: "Daniel Cho",
    username: "@daniel_cho",
    text: "I was skeptical at first, but the stories and support here pushed me forward. 100 days clean and counting!",
    image: "https://i.pravatar.cc/150?img=25",
  },
];

export const HeroCards = () => {
  const [testimonial, setTestimonial] = useState(testimonials[0]);

  useEffect(() => {
    const randomTestimonial =
      testimonials[Math.floor(Math.random() * testimonials.length)];
    setTestimonial(randomTestimonial);
  }, []);

  return (
    <div className="relative w-full min-h-[700px] grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 py-20">
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        {/* Testimonial Card */}
        <Card className="w-full transform hover:-translate-y-1 transition-transform duration-200 bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="border-2 border-brand-primary">
              <AvatarImage alt="" src={testimonial.image} />
              <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold">
                {testimonial.name}
              </CardTitle>
              <CardDescription className="text-accent-primary">
                {testimonial.username}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">"{testimonial.text}"</p>
          </CardContent>
        </Card>

        {/* Volunteer Card */}
        <Card className="w-full transform hover:-translate-y-1 transition-transform duration-200 bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Be a Volunteer!
            </CardTitle>
            <div className="mt-4">
              Aid in the journey of conquering addictions by volunteering to
              help.
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full font-bold bg-accent-primary text-secondary-text hover:bg-brand-primary transform hover:scale-105 transition-all duration-200 ease-in-out">
              Volunteer Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        {/* Community Card */}
        <Card className="w-full transform hover:-translate-y-1 transition-transform duration-200 bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <CardHeader className="mt-8 flex justify-center items-center pb-2">
            <div className="absolute -top-8 w-24 h-24 rounded-full border-4 border-brand-primary p-1 bg-white">
              <img
                src="https://i.pravatar.cc/150?img=58"
                alt="Our Community"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <CardTitle className="text-xl mt-8">Our Community</CardTitle>
          </CardHeader>
          <CardContent className="text-center pb-4">
            <p className="text-gray-600">
              Through compassion, our community volunteers to aid in the journey
              of conquering addictions.
            </p>
          </CardContent>
          <CardFooter className="justify-center gap-2">
            {[
              {
                icon: <Facebook className="w-5 h-5" />,
                href: "https://github.com/leoMirandaa",
              },
              {
                icon: <BsTelegram size="20" />,
                href: "https://www.linkedin.com/in/leopoldo-miranda/",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className={`${buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })} bg-primary text-secondary-text hover:accent-brand-primary/80 hover:text-secondary-text rounded-full p-2  transition-all duration-500 ease-in-out`}
              >
                {social.icon}
              </a>
            ))}
          </CardFooter>
        </Card>

        {/* Key Feature Card */}
        <Card className="w-full transform hover:-translate-y-1 transition-transform duration-200 bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="mt-1 p-2 rounded-xl bg-brand-primary/10">
              <svg
                className="w-6 h-6 text-brand-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2L2 12h3v7h6v-6h2v6h6v-7h3L12 2z"
                />
              </svg>
            </div>
            <div>
              <CardTitle className="text-xl">Safe Space for Healing</CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                A judgment-free platform that provides peer support, expert
                advice, and resources for addiction recovery.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
