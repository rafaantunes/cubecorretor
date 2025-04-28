"use client"
import { useRouter } from "next/navigation"
import AuthGuard from "../components/authGuard"
import Link from "next/link"

export default function DashboardPage() {
    const router = useRouter()

    function handleLogout() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("usuarioNome");
        sessionStorage.removeItem("usuarioEmail");
        sessionStorage.removeItem("usuarioId");
        router.push("/login");
    }

    return (
        <AuthGuard>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
                <h1 className="text-2xl font-bold text-center">Dashboard</h1>

                <div className="space-y-2">
                    <button onClick={handleLogout}>Logout</button>
                </div>

                <Link href="/pagamentos">Pagamentos</Link>
                
            </div>
        </div>
        </AuthGuard>
    )
}
