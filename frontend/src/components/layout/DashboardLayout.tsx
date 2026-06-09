"use client";

import { ReactNode, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    return (
        <AuthGuard>
            <div className="min-h-screen bg-slate-50">
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    />
                )}

                <div className="flex">
                    {/* Mobile Sidebar */}
                    <div
                        className={`fixed left-0 top-0 z-50 h-full transform transition-transform duration-300 lg:hidden ${sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                            }`}
                    >
                        <Sidebar />
                    </div>

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <div className="flex min-h-screen flex-1 flex-col">
                        {/* Mobile Header */}
                        <div className="flex h-16 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
                            <button
                                onClick={() =>
                                    setSidebarOpen(true)
                                }
                                className="rounded-lg border px-3 py-2"
                            >
                                ☰
                            </button>

                            <span className="ml-4 font-semibold">
                                SignFlow
                            </span>
                        </div>

                        {/* Desktop Navbar */}
                        <div className="hidden lg:block">
                            <Navbar />
                        </div>

                        <main className="flex-1">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}