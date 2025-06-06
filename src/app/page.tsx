
import { RoadmapForm } from "@/components/RoadmapForm";
import { Hero } from "@/components/sections/Hero";
import { FeatureSection } from "@/components/sections/How-it-works";
import Problem from "@/components/sections/Problem";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero/>
      <Problem/>
      <FeatureSection/>
      <RoadmapSection/>
    </div>
  );
}
