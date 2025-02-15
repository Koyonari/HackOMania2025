"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
    username: z
        .string({
            required_error: "Please enter a username.",
        }),
    goal: z.string()
})

// This can come from your database or API.
const defaultValues = {
    username: "",
    email: "",
    goal: "",
}

export function ProfileForm() {
    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { fields, append } = useFieldArray({
        name: "urls",
        control: form.control,
    })

    function onSubmit(data) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name. It can be your real name or a
                                pseudonym.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input disabled={true} placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your email address. It cannot be changed.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Goals</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="I am to quit smoking by the end of the year!"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Use this to tell the world about your goals.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}