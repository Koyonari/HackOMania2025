import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiCommunityFill } from "react-icons/ri";
import { IoGameController } from "react-icons/io5";

const features = [
  {
    icon: <FaMapLocationDot className="text-2xl text-primary" />,
    title: "Verified Accountability",
    description:
      "Volunteers conduct surprise checks, such as nicotine or drug tests, to ensure individuals stay committed to their recovery.",
    hoverDescription:
      "Results are uploaded to the platform and revealed after community engagement, fostering a transparent and supportive system.",
  },
  {
    icon: <RiCommunityFill className="text-2xl text-primary" />,
    title: "Community Engagement",
    description:
      "Users receive motivation and peer support by engaging in an interactive, accountability-based betting system.",
    hoverDescription:
      "Before verification results are revealed, the community places wagers on whether an individual has stayed committed, reinforcing social pressure to succeed.",
  },
  {
    icon: <IoGameController className="text-2xl text-primary" />,
    title: "Believers vs. Doubters",
    description:
      "Community members can wager as 'Believers' or 'Doubters' on whether an individual has remained committed to their goal.",
    hoverDescription:
      "If the individual succeeds, Believers win the wager. If they relapse, Doubters win. This system leverages peer pressure to encourage accountability.",
  },
];

export const Works = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center pb-16 sm:pb-20 bg-gray-50"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-brand-primary bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Our platform makes finding and sharing accessible locations simple and
        rewarding. Here's how our key features work together.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
        {features.map(({ icon, title, description, hoverDescription }) => (
          <Card
            key={title}
            className="bg-muted/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden hover:border-violet-600 hover:border-2"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </div>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="group-hover:opacity-0 transition-opacity duration-300">
                {description}
              </p>
              <p className="absolute inset-x-6 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {hoverDescription}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
