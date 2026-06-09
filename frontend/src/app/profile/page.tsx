"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-3xl font-bold">
              Profile
            </h1>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Name
                </label>

                <input
                  type="text"
                  value="User"
                  readOnly
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value="user@example.com"
                  readOnly
                  className="w-full rounded-lg border p-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}