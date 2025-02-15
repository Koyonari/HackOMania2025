import { ProfileForm } from "@/app/app/settings/profile-form";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
    return (
        <main className="mx-auto bg-bg-primary">
            <div className="space-y-6">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Profile</h3>
                        <p className="text-sm text-muted-foreground">
                            This is how others will see you on the site.
                        </p>
                    </div>
                    <Separator/>
                    <ProfileForm/>
                </div>
            </div>
        </main>
    )
}