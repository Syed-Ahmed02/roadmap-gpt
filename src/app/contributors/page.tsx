import { BlurFade } from "@/components/ui/blur-fade"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
export default function Contributors() {

    const contributorsList = [
        'https://github.com/codecrafters-io/build-your-own-x', 'https://github.com/practical-tutorials/project-based-learning',
        'https://github.com/josephmisiti/awesome-machine-learning', 'https://github.com/anthropics/courses',
        'https://github.com/lorinpop17/app-ideas', 'https://github.com/charlax/professional-programming',
        'https://github.com/aishwaryanr/awesome-generative-ai-guide', 'https://github.com/liuchong/awesome-roadmaps',
        'https://github.com/detailyang/awesome-cheatsheet', 'https://github.com/cloudcommunity/Free-Certifications',
        'https://github.com/ChristosChristofidis/awesome-deep-learning', 'https://github.com/docker/awesome-compose',
        'https://github.com/academic/awesome-datascience', 'https://github.com/freeCodeCamp/freeCodeCamp',
        'https://github.com/EbookFoundation/free-programming-books', 'https://github.com/A-to-Z-Resources-for-Students',
        'https://github.com/Hack-with-Github/Awesome-Hacking', 'https://github.com/prakhar1989/awesome-courses',
        'https://github.com/trimstray/the-book-of-secret-knowledge', 'https://github.com/brexhq/prompt-engineering',
        'https://github.com/mlabonne/llm-course', 'https://github.com/sindresorhus/awesome', 'https://github.com/MunGell/awesome-for-beginners',
        'https://github.com/kamranahmedse/developer-roadmap', 'https://github.com/bradtraversy/50projects50days',
        'https://github.com/mtdvio/every-programmer-should-know', 'https://github.com/shahednasser/awesome-resources',
        'https://github.com/microsoft/Data-Science-For-Beginners', 'https://github.com/natnew/Awesome-Data-Science',
        'https://github.com/goabstract/Marketing-for-Engineers']


    return (
        <div className="min-h-screen bg-primary">
            <div className="flex flex-col items-center mx-8">
                <div className="my-16 text-center  w-full text-primary-foreground space-y-4">
                    <BlurFade delay={0.01} inView={true}>
                        <h1 className="text-2xl md:text-6xl font-semibold max-w-5xl mx-auto">
                            This was only possible due to the amazing resources on github.
                        </h1>
                    </BlurFade>

                    <BlurFade delay={0.03} inView={true}>
                        <p className="text-md md:text-xl w-full ">
                            Here is the list of reposotires we used
                        </p>
                    </BlurFade>
                </div>
                <ScrollArea className="h-96 rounded-md border bg-secondary">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Repos</h4>
                        {contributorsList.map((tag) => (
                            <div >
                                <Link href={tag} key={tag} className="text-sm hover:bg-secondary-foreground hover:text-primary ease-linear duration-100 hover:border hover:rounded-md p-2 ">
                                    {tag}
                                </Link>
                                <Separator className="my-2 bg-primary-foreground " />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

