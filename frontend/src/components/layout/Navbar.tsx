"use client";

import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
    const { user } = useAuthStore();

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div>
                <h2 className="text-lg font-semibold text-slate-800">
                    Digital Signature Platform
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">
                        {user?.name || "User"}
                    </p>

                    <p className="text-xs text-slate-500">
                        {user?.email || "user@example.com"}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
            </div>
        </header>
    );
}