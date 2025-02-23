"use client"

import AdminFooter from "@/components/layout/admin.footer";
import AdminSideBar from "@/components/layout/admin.sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd"
import React, { useState } from "react";

const { Sider, Content } = Layout;


const DashboardPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <Layout
            style={{ minHeight: '100vh' }}
            className='layout-admin'
        >
            <AdminSideBar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <Layout >
                <div className='admin-header'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Dropdown
                        // menu={{ items: itemsDropdown }} 
                        placement="bottomRight" trigger={['hover']} >
                        <a onClick={(e) => e.preventDefault()}>
                            {/* <Space>
                                <Avatar
                                    src={urlAvatar}
                                    alt={'avatar'}
                                />
                                {user?.fullName}
                            </Space> */}
                        </a>
                    </Dropdown>
                </div>
                {/* style={{ padding: '10px' }} to fit with Manage User -> CRUD */}
                <Content style={{ padding: '15px' }}>
                    {/* <Outlet /> */}
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    )
}

export default DashboardPage;