"use client"

import { Layout } from "antd";

const { Sider, Content } = Layout;

const AdminContent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Content>
                <div className="p-3 min-h-[calc(200vh)]">
                    {children}
                </div>
            </Content>
        </>
    )
}

export default AdminContent;