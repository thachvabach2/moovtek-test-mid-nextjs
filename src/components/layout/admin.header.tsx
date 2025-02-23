"use client"

import { AdminContext } from "@/library/admin.context";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useContext, useState } from "react";

type Props = {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}

const AdminHeader = () => {
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;

    return (
        <div className='admin-header'>
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
    )
}

export default AdminHeader;