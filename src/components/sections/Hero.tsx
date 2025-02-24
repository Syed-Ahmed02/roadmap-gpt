import { BlurFade } from "../ui/blur-fade"
import { Button } from "../ui/button"
import { HeroVideoDialog } from "../ui/hero-video-dialog"
import Link from "next/link"
export function Hero() {
    return (
        <div className="bg-gradient-to-b from-primary to-background">

            <div className="flex flex-col items-center mx-8">
                <div className="my-16 text-center  w-full text-primary-foreground space-y-4">
                    <BlurFade delay={0.01} inView={true}>
                        <h2 className="text-xl md:text-2xl  font-semibold w-full">
                            Learning a new skill has never been easier
                        </h2>
                    </BlurFade>
                    <BlurFade delay={0.02} inView={true}>
                        <h1 className="text-2xl md:text-6xl font-semibold max-w-5xl mx-auto">
                            Master any skill with a <u className="font-bold">personalized</u> AI Generated Roadmap
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.03} inView={true}>
                        <p className="text-md md:text-xl w-full ">
                            No more confusion. No more wasted time. Just a clear, structured path to mastering your next skill.
                        </p>
                    </BlurFade>
                    <BlurFade delay={0.04} inView={true}>
                        <Link href="#form">
                            <Button variant={"outline"} className="font-bold mt-8">Get Your Custom Roadmap Now</Button>
                        </Link>
                    </BlurFade>
                </div>

            </div>
            <div className="flex flex-col items-center max-w-6xl justify-center mx-4 lg:mx-auto">
                <BlurFade delay={0.5}>
                    <HeroVideoDialog className="w-full border rounded-xl p-1 border-neutral-300/50" videoSrc="https://www.tella.tv/video/cm76dxl6z00030alb39sjg5f8/view" thumbnailSrc="/thumbnail.jpg" />
                </BlurFade>
            </div>
        </div>
    )
}