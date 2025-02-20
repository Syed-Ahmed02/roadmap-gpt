import { BlurHeader } from "@/components/Header";
import { RoadmapForm } from "@/components/RoadmapForm";
import { ModeToggle } from "@/components/ui/darkmode";
import { HeroPill } from "@/components/ui/hero-pill";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <BlurHeader/>
      <div className="flex flex-col items-center">
        <div className="m-16 text-center space-y-4 md:max-w-2xl">
          <h1 className="text-2xl md:text-4xl  text-foreground font-bold">Learning a new skill has never been easier</h1>
          <p className="text-md md:text-xl ">Gone are the days when you search online for resources, in 3 simple steps have your own personalized roadmap</p>
        </div>
      </div>
    <RoadmapForm/>
    </div>
  );
}
