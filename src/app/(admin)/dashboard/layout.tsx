import AdminContent from "@/components/layout/admin.content";
import AdminFooter from "@/components/layout/admin.footer";
import AdminHeader from "@/components/layout/admin.header";
import AdminSideBar from "@/components/layout/admin.sidebar";
import { AdminContextProvider } from "@/library/admin.context";
import { Layout } from "antd"
import React from "react";

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <AdminContextProvider>
            <div className='layout-admin min-h-screen flex' >
                <div className="left-side">
                    <AdminSideBar />
                </div>

                <div className="right-side flex-1">
                    <AdminHeader />

                    <AdminContent>
                        {children}
                    </AdminContent>

                    {/* <AdminFooter /> */}
                </div>
            </div>
        </AdminContextProvider>
    )
}

export default AdminLayout;