"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const postFormSchema = z.object({
  title: z.string().min(1, "Please enter a title."),
  caption: z.string().optional(),
  image: z.instanceof(File, { message: "Please select a file" })
});

const defaultValues = {
  title: "",
  caption: "",
  image: null
};

export default function CreatePostForm() {
  const form = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data) {
    const supabase = createClient();
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      toast({
        title: "Not logged in",
        description: "Please log in to create a post",
        variant: "destructive",
      });
      return;
    }

    // Upload file to Supabase storage
    const { data: fileData, error: uploadError } = await supabase
      .storage
      .from('post-images')
      .upload(`${authData.user.id}/${Date.now()}-${data.image.name}`, data.image);

    if (uploadError) {
      toast({
        title: "Upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      return;
    }

    // Get public URL of uploaded file
    const { data: { publicUrl } } = supabase
      .storage
      .from('post-images')
      .getPublicUrl(fileData.path);

    // Create post with image URL
    const { error } = await supabase
      .from("posts")
      .insert({
        user_id: authData.user.id,
        title: data.title,
        caption: data.caption,
        image: publicUrl,
        reveal_datetime: new Date(Date.now() + 10 * 1000).toISOString(),
      });

    if (error) {
      toast({
        title: "Post creation failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Post created successfully",
        description: "Your post has been published.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormDescription>
                This is a title for your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your caption here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is a caption for your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files[0])}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Upload an image for your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Post</Button>
      </form>
    </Form>
  );
}
