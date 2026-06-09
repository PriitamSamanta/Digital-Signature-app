"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Documents",
        href: "/documents",
    },
    {
        name: "Profile",
        href: "/profile",
    },
];

export default function Sidebar() {
    const router = useRouter();

    const logout = useAuthStore(
        (state) => state.logout
    );
    const pathname = usePathname();

    return (
        <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-6">
                <h1 className="text-xl font-bold text-blue-600">
                    SignFlow
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Digital Signature
                </p>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`block rounded-lg px-4 py-3 transition ${pathname.startsWith(link.href)
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-700 hover:bg-slate-100"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto border-t border-slate-200 p-4">
                <button
                    onClick={() => {
                        logout();
                        router.push("/login");
                    }}
                    className="w-full rounded-lg bg-red-50 px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-100"
                >
                    Logout
                </button>
            </div>
        </aside>


    );
}