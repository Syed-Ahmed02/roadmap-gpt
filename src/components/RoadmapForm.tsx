"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { generatePromptEmbedding, getEmbeddingMetadata } from "@/utils/apiCalls"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import Link from "next/link"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Chat } from "./Chat"

export const FormSchema = z.object({
    skill: z.string().min(2, {
        message: "Skill must be at least 2 characters.",
    }),
    skillLevel: z.enum(["basic", "intermediate", "advanced"]),
    time: z.enum(["lessFive", "fiveToTen", "tenToTwenty", "twentyPlus"]),
    currentLevel: z.string().min(2, {
        message: "Current experience must be at least 2 characters.",
    }),
})

export function RoadmapForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<z.infer<typeof FormSchema> | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            skill: "",
            skillLevel: "basic",
            time: "lessFive",
            currentLevel: ""
        },
})
    useEffect(() => {
        if (!isLoading && data) {
            router.push("/chat?skill=" + data.skill + "&skillLevel=" + data.skillLevel + "&time=" + data.time + "&currentLevel=" + data.currentLevel);
        }
    }, [isLoading, data])
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);

        toast({
            title: "Success!",
           
        })
        setData(data);

        setIsLoading(false);

    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4 mx-4">

            {data === null && (

                <div className=" w-fit md:max-w-4xl md:w-full flex justify-center  rounded-md p-4 bg-card border border-primary-foreground ">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-11/12 space-y-6">
                            <FormField
                                control={form.control}
                                name="skill"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Skill</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Data Science" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the Skill you want to learn
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="skillLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Level</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="basic" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="basic">Basic</SelectItem>
                                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                                <SelectItem value="advanced">Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            What level do you hope to obtain (High level = more time needed)
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="1 month" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="lessFive">less than 5 hours</SelectItem>
                                                <SelectItem value="fiveToTen">5 - 10 hours</SelectItem>
                                                <SelectItem value="tenToTwenty">10 - 20 hours</SelectItem>
                                                <SelectItem value="twentyPlus">20+ hours</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            How much time per week can you give?
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="currentLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Experience</FormLabel>
                                        <FormControl>
                                            <Input placeholder="I know basic python skills" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            How much do you already know
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading}>
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    )
}