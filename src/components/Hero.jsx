import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { HeroCards } from "./HeroCards";

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-accent-primary/10 blur-3xl" />
      </div>

      <div className="container relative grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 mx-auto">
        <div className="text-center lg:text-start space-y-8 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="inline bg-gradient-to-r from-brand-primary to-accent-primary text-transparent bg-clip-text">
                BET
              </span>
              <span className="text-text-primary">ter</span>{" "}
              <span className="inline bg-gradient-to-r from-accent-primary via-brand-primary to-accent-secondary text-transparent bg-clip-text">
                Help
              </span>
            </h1>

            <p className="text-xl text-gray-600 md:w-10/12 mx-auto lg:mx-0 leading-relaxed">
              Bet your addictions away with the help of our community of
              volunteers. Built by addicts, for addicts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium px-8 py-6 text-lg">
              Get Started
            </Button>

            <a
              href="https://github.com/leoMirandaa/shadcn-landing-page.git"
              target="_blank"
              rel="noreferrer noopener"
              className={`${buttonVariants({
                variant: "outline",
              })} px-8 py-6 text-lg border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white transition-colors`}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Bet now
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                />
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
  );
};
