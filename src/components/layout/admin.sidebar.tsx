'use client';

import { AuditOutlined, DollarOutlined, FileTextOutlined, FormOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

const { Sider } = Layout;

type Props = {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}

const AdminSideBar = ({ collapsed, setCollapsed }: Props) => {
    const [activeMenu, setActiveMenu] = useState<string>('dashboard');

    const items = [
        {
            label: 'Dashboard',
            key: 'dashboard',
            icon: <MdOutlineDashboard />,
        },
        {
            label: 'Booking Management',
            key: 'user',
            icon: <FaRegUser />,
            children: [
                {
                    label: 'CRUD',
                    key: 'crud',
                    icon: <FormOutlined />,
                },
                {
                    label: 'Files1',
                    key: 'file1',
                    icon: <FileTextOutlined />,
                }
            ]
        },
        {
            label: 'Driver Management',
            key: 'book',
            icon: <AuditOutlined />,
        },
        {
            label: 'Manage Orders',
            key: 'order',
            icon: <DollarOutlined />,
        },
    ]

    // const itemsDropdown = [
    //     {
    //         label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
    //         key: 'account',
    //     },
    //     {
    //         label: <Link to='/'>Trang chủ</Link>,
    //         key: 'home',
    //     },
    //     {
    //         label: <label
    //             style={{ cursor: 'pointer' }}
    //             onClick={() => handleLogout()}
    //         >
    //             Đăng xuất
    //         </label>,
    //         key: 'logout',
    //     },

    // ];

    const siderStyle = {
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        // scrollbarWidth: 'thin',
        // scrollbarGutter: 'stable',
    }

    const handleLogout = async () => {

    }

    return (
        <>
            <Sider
                // trigger={null}
                theme='light' // default = dark
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            // style={siderStyle}
            >
                <div className='side-bar__header'
                    style={{ height: 32, margin: 16, textAlign: 'center' }}>
                    Admin
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[activeMenu,]}
                    items={items}
                    onClick={(event) => setActiveMenu(event.key)}
                />
            </Sider>
        </>
    )
}

export default AdminSideBar;