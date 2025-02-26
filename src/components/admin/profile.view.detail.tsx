'use client'

import { Badge, Descriptions, Drawer } from 'antd';
import { useSession } from 'next-auth/react';

type ViewDetailProps = {
    openViewDetail: boolean;
    setOpenViewDetail: (v: boolean) => void;
}

const ProfileViewDetail = ({ openViewDetail, setOpenViewDetail }: ViewDetailProps) => {
    const { data: session, status } = useSession()

    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={'50vw'}
                onClose={() => setOpenViewDetail(false)}
                open={openViewDetail}
            >
                <Descriptions
                    title="Thông tin Người dùng"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{session?.user?._id}</Descriptions.Item>
                    <Descriptions.Item label="Email">{session?.user?.email}</Descriptions.Item>
                    <Descriptions.Item label="Họ và tên">{session?.user?.name}</Descriptions.Item>

                    <Descriptions.Item label="Role">
                        <Badge status="processing" text={session?.user?.role} />
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default ProfileViewDetail;