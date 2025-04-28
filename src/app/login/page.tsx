"use client"

import { useState, useRef } from "react"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { useRouter } from "next/navigation"
import { Toast } from "primereact/toast"

export default function LoginPage() {
  const router = useRouter()
  const toast = useRef<Toast>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarioEmail: email,
          usuarioSenha: password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("access_token", data.access_token); 
        sessionStorage.setItem("usuarioNome", data.usuarioNome);
        sessionStorage.setItem("usuarioEmail", data.usuarioEmail);
        sessionStorage.setItem("usuarioId", data.usuarioId);

        router.push("/dashboard");
      } else {
        throw new Error(data.message || "Não foi possível fazer login.");
      }

    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Erro de login",
        detail: error.message || "Erro desconhecido",
        life: 3000,
      });
    }

    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toast ref={toast} />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div className="p-float-label">
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="p-float-label">
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
            toggleMask
            className="w-full"
          />
          <label htmlFor="password">Senha</label>
        </div>

        <Button
          label={loading ? "Entrando..." : "Entrar"}
          icon="pi pi-sign-in"
          className="w-full"
          type="submit"
          loading={loading}
        />
      </form>
    </div>
  )
}
