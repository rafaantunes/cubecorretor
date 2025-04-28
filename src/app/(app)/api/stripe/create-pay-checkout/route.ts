import stripe from "@/app/(app)/lib/stripe";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { testeId, usuarioEmail, usuarioId } = await req.json();

    const price = process.env.STRIPE_PRODUCT_PRICE_ID;

    if(!price) {
        return NextResponse.json({error: "Price not found"}, {status: 500});
    }
    
    const metadata = {
        testeId,
        usuarioId,
        price
    }

    
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{price, quantity: 1}],
            mode: "payment",
            payment_method_types: ["card", "boleto"],
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/`,
            metadata,
            ...(usuarioEmail && {customer_email: usuarioEmail})
        })

        if(!session.url){
            return NextResponse.json({error: "Session URL not found"}, {status: 500});
        }

        return NextResponse.json({ sessionId: session.id}, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}