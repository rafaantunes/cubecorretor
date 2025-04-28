import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export function useStripe() {
    const [stripe, setStripe] = useState<Stripe | null>(null);

    useEffect(() => {
        async function loadStripeAsync() {
            const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!);
            setStripe(stripeInstance);
        }
        loadStripeAsync()
    }, []);

    async function createPaymentStripeCheckout(checkoutData: any) {
        if (!stripe) return;

        try {
            const response = await fetch("/api/stripe/create-pay-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkoutData)
            })

            const data = await response.json();

            await stripe.redirectToCheckout({ sessionId: data.sessionId });
        } catch (error) {
            console.error(error);
        }
    }

    async function createSubscriptionStripeCheckout(checkoutData: any) {
        if (!stripe) return;

        try {
            const response = await fetch("/api/stripe/create-subscription-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkoutData)
            })
            const data = await response.json();

            await stripe.redirectToCheckout({ sessionId: data.sessionId });
        } catch (error) {
            console.error(error)
        }
    }

    

    return {
        createPaymentStripeCheckout,
        createSubscriptionStripeCheckout
    }
}