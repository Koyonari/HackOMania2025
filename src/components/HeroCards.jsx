import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const HeroCards = () => {
    return (
        <div className="relative w-full min-h-[700px] grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
                {/* Testimonial Card */}
                <Card
                    className="w-full transform hover:-translate-y-1 transition-transform duration-200 bg-white/80 backdrop-blur-sm border border-gray-200/50">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar className="border-2 border-brand-primary">
                            <AvatarImage alt="" src="https://github.com/shadcn.png"/>
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <CardTitle className="text-lg font-semibold">Simon Tan</CardTitle>
                            <CardDescription className="text-accent-primary">
                                @simon_tan
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            "I've been using BETterHelp for a few months now and I've already
                            been nicotine-free for 3 weeks. I can't thank the community enough
                            for their support."
                        </p>
                    </CardContent>
                </Card>

                {/* Pricing Card */}
                <Card
                    className="w-full transform hover:-translate-y-1 transition-transform duration-200 bg-white/80 backdrop-blur-sm border border-gray-200/50">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-bold">
                                Be a Volunteer!
                            </CardTitle>
                        </div>
                        <div className="mt-4">
                            Aid in the journey of conquering addictions by volunteering to
                            help.
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full bg-accent-primary hover:bg-accent-primary/90">
                            Volunteer Now
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
                {/* Team Card */}
                <Card
                    className="w-full transform hover:-translate-y-1 transition-transform duration-200 bg-white/80 backdrop-blur-sm border border-gray-200/50">
                    <CardHeader className="mt-8 flex justify-center items-center pb-2">
                        <div
                            className="absolute -top-8 w-24 h-24 rounded-full border-4 border-brand-primary p-1 bg-white">
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
                                icon: <GitHubLogoIcon className="w-5 h-5"/>,
                                href: "https://github.com/leoMirandaa",
                            },
                            {
                                icon: <Linkedin size="20"/>,
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
                                })} hover:text-brand-primary`}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </CardFooter>
                </Card>

                {/* Feature Card */}
                <Card
                    className="w-full transform hover:-translate-y-1 transition-transform duration-200 bg-white/80 backdrop-blur-sm border border-gray-200/50">
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
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>
                        </div>
                        <div>
                            <CardTitle className="text-xl">Light & Dark Mode</CardTitle>
                            <CardDescription className="mt-2 text-gray-600">
                                Seamlessly switch between light and dark themes to match your
                                preference and reduce eye strain.
                            </CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};
