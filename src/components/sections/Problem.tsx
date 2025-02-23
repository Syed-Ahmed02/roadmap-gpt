import { Card, CardContent } from "@/components/ui/card";
import { Brain, Hourglass, BadgeDollarSign } from "lucide-react";

const problems = [
    {
        title: "Too Many Resources, No Clear Path",
        description:
            "You spend hours searching for tutorials, blog posts, and courses—only to feel more confused than when you started.",
        icon: Brain,
    },
    {
        title: "No Time to Waste on Trial & Error",
        description:
            "Between work, school, and life, you don’t have time to figure out what’s useful and what’s not. You need a roadmap, not a random collection of links.",
        icon: Hourglass,
    },
    {
        title: "Courses Are Expensive & Not Personalized",
        description:
            "Most paid courses follow a one-size-fits-all approach. But what if you already know the basics or only have 5 hours a week to learn?",
        icon: BadgeDollarSign,
    },
];

export default function Problem() {
    return (
        <div className="my-16">
            <div className="mx-auto max-w-5xl text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Struggling to Learn? Here’s Why It Feels So Hard…
                </h2>
                <h4 className="text-xl tracking-tight ">
                    You’re motivated to learn, but something keeps getting in the way. Sound familiar?
                </h4>
            </div>

            <div className="flex justify-center items-center">
                <div className="max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {problems.map((problem, index) => (
                            <Card className="bg-background border-none shadow-none">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                        <problem.icon className="w-6 h-6 text-foreground" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{problem.title}</h3>
                                    <p className="text-muted-foreground">{problem.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
