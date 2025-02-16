"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
  image: z.instanceof(File, { message: "Please select a file" }),
});

const defaultValues = {
  title: "",
  caption: "",
  image: null,
};

export default function CreatePostForm() {
  const router = useRouter();
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
    const { data: fileData, error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(
        `${authData.user.id}/${Date.now()}-${data.image.name}`,
        data.image
      );

    if (uploadError) {
      toast({
        title: "Upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      return;
    }

    // Get public URL of uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from("post-images").getPublicUrl(fileData.path);

    // Create post with image URL
    const { error } = await supabase.from("posts").insert({
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
    <div className="flex min-h-screen items-center justify-center pt-24">
      <div className="max-w-2xl w-full mx-auto p-6 bg-background rounded-lg shadow-md">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-4">
            <button
              onClick={() => router.push("/app")}
              className="text-text-primary hover:text-accent-primary transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            Create New Post
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-primary font-medium">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title"
                      {...field}
                      className="border-input focus:border-accent-primary focus:ring-accent-primary"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-muted-foreground">
                    Give your post a compelling title.
                  </FormDescription>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-primary font-medium">
                    Caption
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your caption here..."
                      className="resize-none min-h-[120px] border-input focus:border-accent-primary focus:ring-accent-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-muted-foreground">
                    Add a description for your post.
                  </FormDescription>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-text-primary font-medium">
                    Image
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files[0])}
                        {...field}
                        className="border-input focus:border-accent-primary focus:ring-accent-primary"
                      />
                      {value && (
                        <p className="text-sm text-muted-foreground">
                          Selected: {value.name}
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="text-sm text-muted-foreground">
                    Upload an image for your post. Supported formats: JPEG, PNG,
                    GIF.
                  </FormDescription>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button
                type="submit"
                className=" hover:bg-accent-primary text-white transition-colors font-bold"
              >
                Create Post
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
