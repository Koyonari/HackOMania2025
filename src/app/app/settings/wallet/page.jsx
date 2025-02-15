import { Separator } from "@/components/ui/separator";
import { WalletForm } from "@/app/app/settings/wallet/wallet-form";

export default function WalletSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Wallet</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your wallet settings.
                </p>
            </div>
            <Separator/>
            <WalletForm/>
        </div>
    )
}