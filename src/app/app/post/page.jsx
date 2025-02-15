import CreatePostForm from "./post-form";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navigation";
export default function CreatePost() {
    return (
        <>
        <Navbar/>
        <main className="mx-auto bg-bg-primary">
            <div className="space-y-6">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Create a Post</h3>
                        <p className="text-sm text-muted-foreground">
                            Create a new post.
                        </p>
                    </div>
                    <Separator/>
                    <CreatePostForm />
                </div>
            </div>
        </main>
        </>
    )
}