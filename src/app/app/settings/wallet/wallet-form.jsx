"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { makePayment, completePayment } from "./actions";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Enhanced schema to include payment-related fields
const profileFormSchema = z.object({
    walletAddress: z.string({
        required_error: "Please enter a wallet address.",
    }),
    amount: z.string({
        required_error: "Please enter an amount to top up.",
    }),
});

const defaultValues = {
    walletAddress: "",
    amount: "",
};

export function WalletForm() {
    const [status, setStatus] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const [pendingPayment, setPendingPayment] = useState(null);
    const [showComplete, setShowComplete] = useState(false);
    const [accountBalance, setAccountBalance] = useState("0");

    useEffect(() => {
        async function loadInitialBalance() {
            const { data: authData } = await supabase.auth.getUser();
            if (authData?.user) {
                await fetchBalance(authData.user.id);
            }
        }
        
        loadInitialBalance();
    }, []); // Empty dependency array means this runs once on component mount

    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    async function fetchBalance(userId) {
        const { data, error } = await supabase
            .from("users")
            .select("balance")
            .eq("id", userId)
            .single();

        if (data) {
            setAccountBalance(data.balance);
        }
        return data?.balance || 0;
    }

    async function onSubmit(data) {
        setStatus("Processing...");

        try {
            // First handle the Supabase user authentication
            const { data: authData, error: authError } =
                await supabase.auth.getUser();
            if (authError) {
                toast({
                    title: "Authentication error",
                    description: authError.message,
                    variant: "destructive",
                });
                return;
            }

            // Attempt to make the payment
            const result = await makePayment(data.amount, data.walletAddress);

            if (result.redirect) {
                setPendingPayment(result.redirectUrl);
                setStatus(
                    "Please confirm to continue with payment authorization"
                );
                return;
            }

            if (result.success) {
                // Update the database with transaction details
                const { error } = await supabase.from("transactions").insert({
                    user_id: authData.user.id,
                    amount: data.amount,
                    wallet_address: data.walletAddress,
                    payment_id: result.paymentId,
                    status: "completed",
                });

                if (error) {
                    toast({
                        title: "Transaction recording failed",
                        description: error.message,
                        variant: "destructive",
                    });
                }

                setStatus("Payment successful!");
                setPaymentId(result.paymentId);

                toast({
                    title: "Payment successful",
                    description: `Payment completed with ID: ${result.paymentId}`,
                });
            }
        } catch (error) {
            setStatus("Failed to process payment");
            toast({
                title: "Payment failed",
                description: error.message,
                variant: "destructive",
            });
        }
    }

    const handleContinuePayment = () => {
        if (pendingPayment) {
            window.open(pendingPayment, "_blank");
            setPendingPayment(null);
            setShowComplete(true);
            setStatus(
                "After authorizing, click Complete Payment to finish the transaction"
            );
        }
    };

    const handleCompletePayment = async () => {
        try {
            const result = await completePayment();
            if (result.success) {
                const { data: authData } = await supabase.auth.getUser();
                const userId = authData.user.id;

                // Get current balance
                const currentBalance = await fetchBalance(userId);
                const newBalance =
                    parseFloat(currentBalance) +
                    parseFloat(form.getValues("amount"));

                // Update balance in database
                const { error: updateError } = await supabase
                    .from("users")
                    .update({ balance: newBalance })
                    .eq("id", userId);

                if (!updateError) {
                    setAccountBalance(newBalance);
                    setStatus("Payment completed successfully!");
                    setPaymentId(result.paymentId);
                    setShowComplete(false);

                    toast({
                        title: "Payment completed",
                        description:
                            "Your payment has been processed and balance updated.",
                    });
                }
            }
        } catch (error) {
            toast({
                title: "Payment completion failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="balance"
                        render={() => (
                            <FormItem>
                                <FormLabel>Current Balance</FormLabel>
                                <FormControl>
                                    <Input
                                        value={accountBalance}
                                        disabled={true}
                                        className="bg-gray-50"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Your current wallet balance
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="walletAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wallet Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://ilp.interledger-test.dev/..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your wallet's address.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter amount to top up."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the amount you want to top up.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Send Payment</Button>
                </form>
            </Form>

            {pendingPayment && (
                <Button onClick={handleContinuePayment} className="mt-4">
                    Continue with Payment
                </Button>
            )}

            {showComplete && (
                <Button onClick={handleCompletePayment} className="mt-4">
                    Complete Payment
                </Button>
            )}

            {status && (
                <div
                    className={`p-4 mt-4 rounded-md ${
                        status.includes("Error")
                            ? "bg-red-50 text-red-700"
                            : "bg-blue-50 text-blue-700"
                    }`}
                >
                    {status}
                </div>
            )}

            {paymentId && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="font-medium">Payment ID: {paymentId}</p>
                </div>
            )}
        </div>
    );
}
