"use client"

import { useState } from "react"
import { FiMenu, FiChevronDown, FiChevronRight } from "react-icons/fi"

export default function SidebarLayout() {
    const [openMenus, setOpenMenus] = useState<string[]>([])

    const toggleMenu = (menu: string) => {
        setOpenMenus((prev) =>
            prev.includes(menu)
                ? prev.filter((m) => m !== menu)
                : [...prev, menu]
        )
    }

    const menuItems = [
        {
            label: "Dashboard",
            icon: <FiChevronRight />,
            path: "/dashboard",
        },
        {
            label: "Gestão",
            icon: <FiChevronRight />,
            children: [
                { label: "Usuários", path: "/usuarios" },
                { label: "Permissões", path: "/permissoes" },
            ],
        },
        {
            label: "Relatórios",
            children: [
                { label: "Mensal", path: "/relatorios/mensal" },
                { label: "Anual", path: "/relatorios/anual" },
            ],
        },
    ]

    return (
        <div className="flex min-h-screen">
            <aside className="fixed top-0 left-0 h-full bg-gray-800 text-white border-r w-64">
                <div className="p-4">
                    <h2 className="text-lg font-semibold">Logo</h2>
                </div>

                <nav className="px-2 space-y-2">
                    {menuItems.map((item, index) => (
                        <div key={index}>
                            {item.children ? (
                                <>
                                    <button
                                        className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-gray-700 rounded"
                                        onClick={() => toggleMenu(item.label)}
                                    >
                                        <span>{item.label}</span>
                                        <FiChevronDown />
                                    </button>
                                    {openMenus.includes(item.label) && (
                                        <div className="pl-6 space-y-1">
                                            {item.children.map((child, idx) => (
                                                <a
                                                    key={idx}
                                                    href={child.path}
                                                    className="block py-1 px-2 rounded hover:bg-gray-700 text-sm text-gray-300"
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <a
                                    href={item.path}
                                    className="block px-4 py-2 rounded hover:bg-gray-700 text-sm text-gray-300"
                                >
                                    {item.label}
                                </a>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

        </div>
    )
}
