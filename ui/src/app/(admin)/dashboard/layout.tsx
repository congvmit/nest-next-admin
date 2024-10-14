"use client";

import React from "react";
import { Layout } from "antd";
import AdminFooter from "@/components/layout/admin/footer";
import AdminHeader from "@/components/layout/admin/header";
import AdminSidebar from "@/components/layout/admin/sidebar";
import AdminContent from "@/components/layout/admin/content";
import { Content } from "antd/es/layout/layout";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Layout>
                <AdminSidebar />
                <Layout>
                    <AdminHeader />
                    <AdminContent>
                        {children}
                    </AdminContent>
                    <AdminFooter />
                </Layout>
            </Layout>
        </>
    );
};

export default AdminLayout;
