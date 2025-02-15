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

    async function onSubmit(data) {
        // Get the authenticated user
        const { data: authData, error: authError } = await supabase.auth.getUser()
        if (authError) {
          toast({
            title: "User retrieval error",
            description: authError.message,
            variant: "destructive",
          })
          return
        }
    
        const userId = authData.user?.id
        if (!userId) {
          toast({
            title: "User not logged in",
            description: "Please log in to update your profile.",
            variant: "destructive",
          })
          return
        }
    
        // Check if the user's profile already exists in the SQL users table.
        const { data: existingProfile, error: profileQueryError } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .maybeSingle()
    
        if (profileQueryError) {
          toast({
            title: "Profile lookup failed",
            description: profileQueryError.message,
            variant: "destructive",
          })
          return
        }
    
        if (existingProfile) {
          // If the row exists, update only the goal.
          const { error } = await supabase
            .from("users")
            .update({ public_key: data.publicKey,
                private_key: data.privateKey,
                key_id: data.keyId,
                auth_id: data.authId,
                wallet_address: data.walletAddress,
             })
            .eq("id", userId)
    
          if (error) {
            toast({
              title: "Profile update failed",
              description: error.message,
              variant: "destructive",
            })
          } else {
            toast({
              title: "Wallet updated successfully",
              description: "Your wallet has been updated.",
            })
          }
      }
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
                    name="publicKey"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Public Key</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="-----BEGIN PUBLIC KEY-----"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public key.
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
                <FormField
                    control={form.control}
                    name="authId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Auth ID</FormLabel>
                            <FormControl>
                                <Input placeholder="ce72e7d5-cd4a-477e-ac08-bf1677a679bc" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your Auth ID.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Update wallet</Button>
            </form>
        </Form>
    )
}