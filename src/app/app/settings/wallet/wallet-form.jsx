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
    walletAddress: z.string({
        required_error: "Please enter a wallet address.",
    }),
    privateKey: z.string({
        required_error: "Please enter a private key.",
    }),
    keyId: z.string({
        required_error: "Please enter a key ID.",
    }),
})

// This can come from your database or API.
const defaultValues = {
    walletAddress: "",
    privateKey: "",
    keyId: "",
}

export function WalletForm() {
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
                    name="walletAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Wallet Address</FormLabel>
                            <FormControl>
                                <Input placeholder="$ilp.interledger-test.dev/..." {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your wallet's address.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="privateKey"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Private Key</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="-----BEGIN PRIVATE KEY-----"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your private key.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="keyId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Key ID</FormLabel>
                            <FormControl>
                                <Input placeholder="ce72e7d5-cd4a-477e-ac08-bf1677a679bc" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your key ID.
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