"use server";

import { createAuthenticatedClient } from "@interledger/open-payments";
import { cookies } from "next/headers";

export async function makePayment(amount, senderWalletAddress) {
    try {
        const client = await createAuthenticatedClient({
            walletAddressUrl: process.env.OPEN_PAYMENTS_SENDER_WALLET,
            privateKey: process.env.OPEN_PAYMENTS_PRIVATE_KEY,
            keyId: process.env.OPEN_PAYMENTS_KEY_ID,
        });

        const senderWallet = await client.walletAddress.get({
            url: senderWalletAddress,
        });

        const receiverWalletDetails = await client.walletAddress.get({
            url: process.env.OPEN_PAYMENTS_SENDER_WALLET,
        });

        const incomingGrant = await client.grant.request(
            { url: receiverWalletDetails.authServer },
            {
                access_token: {
                    access: [
                        {
                            type: "incoming-payment",
                            actions: ["create"],
                        },
                    ],
                },
            }
        );

        const incomingPayment = await client.incomingPayment.create(
            {
                url: new URL(receiverWalletDetails.id).origin,
                accessToken: incomingGrant.access_token.value,
            },
            {
                walletAddress: receiverWalletDetails.id,
                incomingAmount: {
                    value: amount + "00",
                    assetCode: receiverWalletDetails.assetCode,
                    assetScale: receiverWalletDetails.assetScale,
                },
                expiresAt: new Date(Date.now() + 600000).toISOString(),
            }
        );

        const quoteGrant = await client.grant.request(
            { url: senderWallet.authServer },
            {
                access_token: {
                    access: [
                        {
                            type: "quote",
                            actions: ["create"],
                        },
                    ],
                },
            }
        );

        const quote = await client.quote.create(
            {
                url: new URL(senderWallet.id).origin,
                accessToken: quoteGrant.access_token.value,
            },
            {
                method: "ilp",
                walletAddress: senderWallet.id,
                receiver: incomingPayment.id,
            }
        );

        const outgoingGrant = await client.grant.request(
            { url: senderWallet.authServer },
            {
                access_token: {
                    access: [
                        {
                            type: "outgoing-payment",
                            actions: ["read", "create"],
                            limits: {
                                debitAmount: {
                                    assetCode: quote.debitAmount.assetCode,
                                    assetScale: quote.debitAmount.assetScale,
                                    value: quote.debitAmount.value,
                                },
                            },
                            identifier: senderWallet.id,
                        },
                    ],
                },
                interact: {
                    start: ["redirect"],
                },
            }
        );

        // Store necessary data in cookies for after redirect
        const cookie = await cookies();
        cookie.set(
            "paymentState",
            JSON.stringify({
                quoteId: quote.id,
                continueUri: outgoingGrant.continue.uri,
                continueToken: outgoingGrant.continue.access_token.value,
                senderWallet: senderWalletAddress,
            })
        );

        // Return redirect information to client
        return {
            redirect: true,
            redirectUrl: outgoingGrant.interact.redirect,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Payment failed",
        };
    }
}

export async function completePayment() {
    "use server";

    let cookie = await cookies();
    const paymentState = JSON.parse(cookie.get("paymentState").value);
    console.log(paymentState);
    const client = await createAuthenticatedClient({
        walletAddressUrl: process.env.OPEN_PAYMENTS_SENDER_WALLET,
        privateKey: process.env.OPEN_PAYMENTS_PRIVATE_KEY,
        keyId: process.env.OPEN_PAYMENTS_KEY_ID,
    });

    const finalizedOutgoingGrant = await client.grant.continue({
        url: paymentState.continueUri,
        accessToken: paymentState.continueToken,
    });

    const senderWallet = await client.walletAddress.get({
        url: paymentState.senderWallet,
    });

    const outgoingPayment = await client.outgoingPayment.create(
        {
            url: new URL(senderWallet.id).origin,
            accessToken: finalizedOutgoingGrant.access_token.value,
        },
        {
            walletAddress: senderWallet.id,
            quoteId: paymentState.quoteId,
        }
    );

    cookie.delete("paymentState");

    return {
        success: true,
        paymentId: outgoingPayment.id,
    };
}
