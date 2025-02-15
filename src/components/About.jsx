import { Statistics } from "./Statistics";
import Image from "next/image";

export const About = () => {
  return (
    <section id="about" className="container pb-40 sm:pb-60 bg-gray-50">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src="/helping-hand.png"
            alt="About company"
            height={300}
            width={300}
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-brand-primary bg-clip-text">
                  About{" "}
                </span>
                Our Platform
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Our platform harnesses the power of community-driven
                accountability to help individuals overcome addictions. By
                integrating real-world verification and gamification, we create
                a structured environment where users commit to their recovery
                journey while receiving support from their peers.
              </p>
            </div>
            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
