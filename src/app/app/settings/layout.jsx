import { SidebarNav } from "@/app/app/settings/components/sidebar-nav";
import { Navbar } from "@/components/Navigation";

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/app/settings",
    },
    {
        title: "Wallet",
        href: "/app/settings/wallet",
    },
]

export default function SettingsLayout({ children }) {
    return (
        <>
            <Navbar/>
            <div className="pt-16 max-w-7xl px-4 mx-auto">
                <div className="hidden space-y-6 p-10 pb-16 md:block">
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <aside className="-mx-4 lg:w-1/5">
                            <SidebarNav items={sidebarNavItems}/>
                        </aside>
                        <div className="flex-1 lg:max-w-2xl">{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}