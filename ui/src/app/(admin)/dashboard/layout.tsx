// "use client";

import React from "react";
import { Layout } from "antd";
import AdminFooter from "@/components/layout/admin/footer";
import AdminHeader from "@/components/layout/admin/header";
import AdminSidebar from "@/components/layout/admin/sidebar";
import AdminContent from "@/components/layout/admin/content";
import { AdminContextProvider } from "@/providers/admin.provider";
import { auth } from "@/auth";

const AdminLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const session = await auth();
  return (
    <AdminContextProvider>
      <div style={{ display: "flex" }}>
        <div className="left-side" style={{ minWidth: 80 }}>
          <AdminSidebar />
        </div>
        <div className="right-side" style={{ flex: 1 }}>
          <AdminHeader session={session} />
          <AdminContent>{children}</AdminContent>
          <AdminFooter />
        </div>
      </div>
    </AdminContextProvider>
  );
};

export default AdminLayout;
