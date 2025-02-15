"use client"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { createClient } from '@supabase/supabase-js'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Set up your Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Schema for only the goal field
const profileFormSchema = z.object({
  goal: z.string().min(1, "Please enter a goal."),
})

// Default form values for the goal field
const defaultValues = {
  goal: "",
}

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
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
        .update({ goal: data.goal })
        .eq("id", userId)

      if (error) {
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Profile updated successfully",
          description: "Your goal has been updated.",
        })
      }
    } else {
      // If the row doesn't exist, insert a new row with name, email, and goal.
      const profileData = {
        id: userId,
        name: authData.user.user_metadata.full_name,
        email: authData.user.email,
        goal: data.goal,
      }

      const { error } = await supabase.from("users").insert(profileData)

      if (error) {
        toast({
          title: "Profile creation failed",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Profile created successfully",
          description: "Your profile has been created with your goal.",
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
