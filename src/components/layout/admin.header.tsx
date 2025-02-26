"use client"

import { AdminContext } from "@/library/admin.context";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useContext, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfileViewDetail from "../admin/profile.view.detail";
import { IoMdArrowDropdown } from "react-icons/io";

const AdminHeader = () => {
    const { data: session, status } = useSession()
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;

    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false)

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
            <DropdownMenu>
                <DropdownMenuTrigger> <div className="text-blue-600 flex items-center m-3">Welcome {session?.user?.name} <IoMdArrowDropdown /></div></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setOpenViewDetail(true)} className="cursor-pointer">
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ProfileViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
            />
        </div>
    )
}

export default AdminHeader;