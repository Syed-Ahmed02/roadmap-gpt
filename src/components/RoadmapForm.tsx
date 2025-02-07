"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
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

const FormSchema = z.object({
    skill: z.string().min(2, {
        message: "Skill must be at least 2 characters.",
    }),
    skillLevel: z.enum(["basic", "intermidate", "advanced"]),
    time: z.enum(["oneWeek", "oneMonth", "sixMonths"]),
})

export function RoadmapForm() {
    const [isLoading, setIsLoading] = useState<Boolean>();
    const [data, setData] = useState<z.infer<typeof FormSchema>>();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            skill: "",
            skillLevel: "basic",
            time: "oneWeek"
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
        setData(data);
        setIsLoading(false);

    }

    return (
        <div className="w-[500px] flex justify-center border-primary-foreground border rounded-md p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="skill"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Skill</FormLabel>
                                <FormControl>
                                    <Input placeholder="Prompt Engineering" {...field} />
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
                                        <SelectItem value="intermidate">Intermidate</SelectItem>
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
                                            <SelectValue placeholder="1 Week" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="oneWeek">1 Week</SelectItem>
                                        <SelectItem value="oneMonth">1 Month</SelectItem>
                                        <SelectItem value="sixMonths">6 Months</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    How long do you want to take to learn this skill?
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            {!isLoading && data && <Chat/>}
        </div>
    )
}
