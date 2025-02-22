import { Button } from "../ui/button"
import { HeroVideoDialog } from "../ui/hero-video-dialog"
export function Hero() {
    return (
        <div className="bg-gradient-to-b from-primary to-background">
            <div className="flex flex-col items-center mx-8">
                <div className="m-16 text-center  w-full text-primary-foreground space-y-4">
                    <h2 className="text-xl md:text-2xl  font-semibold w-full">
                        Learning a new skill has never been easier
                    </h2>
                    <h1 className="text-2xl md:text-6xl font-semibold max-w-5xl mx-auto">
                        Master any skill with a <u className="font-bold">personalized</u> AI Generated Roadmap
                    </h1>
                    <p className="text-md md:text-xl w-full ">
                        No more confusion. No more wasted time. Just a clear, structured path to mastering your next skill.
                    </p>
                <Button variant={"outline"} className="font-bold mt-8">Get Your Custom Roadmap Now</Button>
                </div>

            </div>
            <div className="flex flex-col items-center max-w-6xl justify-center mx-8 lg:mx-auto">
                <HeroVideoDialog className="w-full" videoSrc="https://www.youtube.com/watch?v=E40jxRNIezo&ab_channel=fawazcentral" thumbnailSrc="" />
            </div>
        </div>
    )
}