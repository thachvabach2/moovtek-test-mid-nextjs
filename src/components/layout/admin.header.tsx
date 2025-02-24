"use client"

import { AdminContext } from "@/library/admin.context";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";

const AdminHeader = () => {
    const { data: session, status } = useSession()
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;

    console.log('>>>> check data: ', session)

    return (
        <div className='admin-header flex justify-between'>
            <Button
                type="text"
                icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapseMenu(!collapseMenu)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            {/* <Dropdown
                // menu={{ items: itemsDropdown }} 
                placement="bottomRight" trigger={['hover']} > */}
            <Space>
                Welcome {session?.user?.email}
            </Space>
            {/* </Dropdown> */}
        </div>
    )
}

export default AdminHeader;