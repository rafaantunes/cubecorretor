"use client"

import { useEffect, useState } from "react";
import AuthGuard from "../components/authGuard"
import { useStripe } from "../hooks/useStripe"

export default function Pagamentos() {
    const [usuarioEmail, setUsuarioEmail] = useState<string | null>(null);
    const [usuarioId, setUsuarioId] = useState<string | null>(null);

    useEffect(()=>{
        setUsuarioEmail(sessionStorage.getItem("usuarioEmail"));
        setUsuarioId(sessionStorage.getItem("usuarioId"));
    })
    

    const { createPaymentStripeCheckout, createSubscriptionStripeCheckout } = useStripe();
    

    return (
        <AuthGuard>
            <div>
                <h1>Pagamentos</h1>
                <button className="border rounded-md px-1" onClick={()=>{createPaymentStripeCheckout({testeId: "123", usuarioEmail: usuarioEmail, usuarioId: usuarioId})}}>Criar Pagamento Stripe</button>
                <button className="border rounded-md px-1" onClick={()=>{createSubscriptionStripeCheckout({testeId: "123", usuarioEmail: usuarioEmail, usuarioId: usuarioId})}}>Criar Assinatura Stripe</button>
            </div>
        </AuthGuard>
    )
}