import { RoadmapForm } from "../RoadmapForm";

export function RoadmapSection() {
    return (
        <div className="my-16" space-y-4 id="form">
            <div className="mx-auto max-w-5xl text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Start learning smarter seconds
                </h2>
                <h4 className="text-xl tracking-tight ">
                    Fill out form below and get your personalized roadmap
                </h4>
            </div>
            <div className="mt-8">
                <RoadmapForm />
            </div>
        </div>
    )
}