import stripe from "@/app/(app)/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/(app)/server/stripe/handle-cancel";
import { handleStripePayment } from "@/app/(app)/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/(app)/server/stripe/handle-subscription";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    
    try {
        const body = await req.text();
        const headerList = await headers();
        const signature = headerList.get("stripe-signature");

        if (!signature || !secret) {
            return NextResponse.json({ error: "No signature or secret" }, { status: 400 });
        }

        const event = stripe.webhooks.constructEvent(body, signature, secret);

        switch (event.type) {
            case "checkout.session.completed":
                const metadata = event.data.object.metadata;

                if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
                    await handleStripePayment(event)
                }
                if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
                    await handleStripeSubscription(event)
                }

                break;
            case "checkout.session.expired":
                console.log("Enviar um email para o usuario avisando que o pagamento expirou");
                break;
            case "checkout.session.async_payment_succeeded":
                console.log("Enviar um email para o usuario avisando que o pagamento foi realizado");
                break;
            case "checkout.session.async_payment_failed":
                console.log("Enviar um email para o usuario avisando que o pagamento falhou");
                break;
            case "customer.subscription.created":
                console.log("Mensagem de boas vindas porque acabou de assinar");
                break;
            case "customer.subscription.deleted":
                await handleStripeCancelSubscription(event);
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({messagee: "Webhook received"}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}