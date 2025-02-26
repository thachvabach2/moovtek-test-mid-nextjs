"use client"
import { AdminContext } from "@/library/admin.context";
import { AuditOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";

const { Sider } = Layout;

const AdminSideBar = () => {
    const [activeMenu, setActiveMenu] = useState<string>('dashboard');
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;
    const { data: session } = useSession();

    let items = [
        {
            label: <Link href={'/dashboard'}>Dashboard</Link>,
            key: 'dashboard',
            icon: <MdOutlineDashboard />,
        },
    ]

    const itemsAdmin = {
        label: <Link href={'/driver'}>Driver Management</Link>,
        key: 'driver-management',
        icon: <AuditOutlined />,
    }

    if (session?.user?.role === 'ADMIN') items = [...items, itemsAdmin]

    return (
        <div className="overflow-auto h-screen sticky top-0 bottom-0 start-0"
        >
            <Sider
                // trigger={null}
                theme='light' // default = dark
                collapsible
                collapsed={collapseMenu}
                onCollapse={(value) => setCollapseMenu(value)}
            >
                <div className='side-bar__header h-[32px] m-[16px] text-center'>
                    Admin
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[activeMenu,]}
                    items={items}
                    onClick={(event) => setActiveMenu(event.key)}
                />
            </Sider>
        </div>
    )
}

export default AdminSideBar;