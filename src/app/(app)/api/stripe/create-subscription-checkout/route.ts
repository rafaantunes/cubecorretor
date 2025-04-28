import stripe from "@/app/(app)/lib/stripe";
import { getOrCreateCustomer } from "@/app/(app)/server/stripe/get-customer-id";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { usuarioId, usuarioEmail, testeId } = await req.json();

    const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

    if (!price) {
        return NextResponse.json({ error: "Price not found" }, { status: 500 });
    }

    if(!usuarioId || !usuarioEmail){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const customerId = await getOrCreateCustomer(usuarioId, usuarioEmail);

    const metadata = {
        testeId,
        price
    }

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{price, quantity: 1}],
            mode: "subscription",
            payment_method_types: ["card"],
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/`,
            metadata,
            customer: customerId
        });

        if(!session.url){
            return NextResponse.json({error: "Session URL not found"}, {status: 500})
        }

        return NextResponse.json({sessionId: session.id}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.error()
    }
}