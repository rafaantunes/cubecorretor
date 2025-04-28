"use client"

import Sidebar from "./components/sidebar"
import Header from "./components/header"

type Props = {
  children: React.ReactNode // Define que a propriedade "children" será do tipo React.ReactNode (pode ser qualquer conteúdo React)
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="pt-16 ml-64 p-6 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
