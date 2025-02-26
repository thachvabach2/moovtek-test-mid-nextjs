"use client"

import { Layout } from "antd";
import { useSession } from "next-auth/react";

const { Sider, Content } = Layout;

const AdminContent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { data: session, status } = useSession()
    return (
        <>
            {/* <div>{JSON.stringify(session)}</div> */}
            <Content>
                <div className="p-3 min-h-[calc(100vh-114px)]">
                    {children}
                </div>
            </Content>
        </>
    )
}

export default AdminContent;