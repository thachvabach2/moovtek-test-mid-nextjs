"use client"
import { AdminContext } from "@/library/admin.context";
import { AuditOutlined, DollarOutlined, FileTextOutlined, FormOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

const { Sider } = Layout;

const AdminSideBar = () => {
    const [activeMenu, setActiveMenu] = useState<string>('dashboard');
    // const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;

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

    const handleLogout = async () => {

    }

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