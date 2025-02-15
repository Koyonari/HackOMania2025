import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Navbar } from "@/components/Navigation";
import { Works } from "@/components/Works";

export default function Home() {
  return (
    <main className="mx-auto">
      {/* Main content */}
      <div className="pt-16 bg-gray-50">
        <Hero />
        <div className="container mx-auto bg-gray-50">
          <About />
          <Works />
        </div>
      </div>
    </main>
  );
}
