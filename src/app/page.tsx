import { RoadmapForm } from "@/components/RoadmapForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="m-16 text-center space-y-4">
        <h2 className="text-xl md:text-2xl font-medium text-secondary-foreground ">Learn your next skill for free</h2>
        <h1 className="text-2xl md:text-4xl  text-primary-foreground font-bold">With our AI Powered Roadmaps</h1>
        <h2 className="text-xl md:text-2xl font-medium">Get Started today for free below</h2>
      </div>
      <div className="w-[500px] flex justify-center border-primary-foreground border rounded-md p-4">
        <RoadmapForm/>
      </div>
    </div>
  );
}
