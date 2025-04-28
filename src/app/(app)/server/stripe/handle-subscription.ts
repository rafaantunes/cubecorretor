import "server-only";
import Stripe from "stripe";

export async function handleStripeSubscription(event: Stripe.CheckoutSessionCompletedEvent) {
    if (event.data.object.payment_status === "paid") {
        console.log("Pagamento realizadoo com sucesso. Liberar acesso do usuario");
    }
}