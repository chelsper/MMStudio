"use client";

import { useState } from "react";
import useUser from "@/utils/useUser";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminSidebar } from "@/components/AdminPage/AdminSidebar";
import { LoadingState } from "@/components/AdminPage/LoadingState";
import { AccessDenied } from "@/components/AdminPage/AccessDenied";
import { DashboardTab } from "@/components/AdminPage/DashboardTab";
import { UsersTab } from "@/components/AdminPage/UsersTab/UsersTab";
import { MysteriesTab } from "@/components/AdminPage/MysteriesTab/MysteriesTab";
import { CouponsTab } from "@/components/AdminPage/CouponsTab/CouponsTab";
import { EmailsTab } from "@/components/AdminPage/EmailsTab/EmailsTab";

export default function AdminPage() {
  const { data: user, loading: userLoading } = useUser();
  const { isAdmin, stats } = useAdminAuth(user, userLoading);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (userLoading || isAdmin === null) {
    return <LoadingState />;
  }

  if (!user || !isAdmin) {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row">
      <AdminSidebar
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {activeTab === "dashboard" && <DashboardTab stats={stats} />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "mysteries" && <MysteriesTab />}
        {activeTab === "coupons" && <CouponsTab />}
        {activeTab === "emails" && <EmailsTab />}
      </main>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
