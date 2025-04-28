"use client"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow z-10 px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Meu Painel</h1>
      <div>
        <span className="text-sm text-gray-500">Usuário Genérico</span>
      </div>
    </header>
  )
}
