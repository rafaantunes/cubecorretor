// components/AuthGuard.tsx
"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      setIsAuthenticated(false)
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }

    setCheckingAuth(false)
  }, [router])

  if (checkingAuth || isAuthenticated === null) {
    return <div>Carregando...</div>
  }

  if (!isAuthenticated) {
    return null 
  }

  return <>{children}</>
}
