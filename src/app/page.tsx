
import { Hero } from "@/components/sections/Hero";
import { FeatureSection } from "@/components/sections/How-it-works";
import Problem from "@/components/sections/Problem";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero/>
      <FeatureSection/>
      <Problem/>

    </div>
  );
}
