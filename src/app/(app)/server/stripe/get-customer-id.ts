import "server-only"
import stripe from "../../lib/stripe";
import apiServer from "../../api/api-server-side";

export async function getOrCreateCustomer(usuarioId: number, usuarioEmail: string) {
    try {
        const res = await apiServer.get(`/usuarios?usuarioId=${usuarioId}`);
        

        if (res.data.stripeCustomerId) {
            return res.data.stripeCustomerId;
        }

        const userName = res.data.nome;

        const stripeCustomer = await stripe.customers.create({
            email: usuarioEmail,
            ...(userName && { name: userName }),
            metadata: {
                usuarioId
            }
        })

        //update no banco postgres com o stripeCustomerId
        apiServer.patch(`/usuarios/${usuarioId}`, {"stripeCustomerId": stripeCustomer.id })
        return stripeCustomer.id;

    } catch (error) {
        console.error(error);
        throw new Error("Failed to get or create customer");
    }
}
