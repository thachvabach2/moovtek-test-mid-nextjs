
'use client'

import { IRideBooking } from "@/types/ride.booking";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Col, message, notification, Popconfirm, Row, Space, Table, TableProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import RideBookingViewDetail from "./ride.booking.view.detail";
import RideBookingUpdate from "./ride.booking.update";
import { handleDeleteRideBookingAction } from "@/actions/actions";
import InputSearch from "./input.search";
import { useSession } from "next-auth/react";

interface IProps {
    rideBookings: IRideBooking[];
    meta: {
        current: string | number;
        pageSize: string | number;
        pages: number;
        total: number;
    }
}

const RideBookingTable = (props: IProps) => {
    const { rideBookings, meta } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isOpenDrawerViewDetail, setIsOpenDrawerViewDetail] = useState<boolean>(false);
    const [dataViewDetail, setDataViewDetail] = useState<IRideBooking | null>(null);

    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IRideBooking | null>(null);

    const { data: session } = useSession();

    let columns: TableProps['columns'] = [
        {
            title: "Ride ID",
            dataIndex: "_id",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (value: any, record: any) => {
                return (
                    <>
                        <a onClick={() => {
                            setDataViewDetail(record);
                            setIsOpenDrawerViewDetail(true);
                        }}>{value}</a>
                    </>
                )
            }
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
        },
        {
            title: "Pickup Location",
            dataIndex: "pickup",
        },
        {
            title: "Drop-off Location",
            dataIndex: "dropoff",
        },
        {
            title: "Driver Name",
            dataIndex: "driverName",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (value: any) => {
                return (
                    <span>
                        {value}
                    </span>
                )
            }
        },
        {
            title: "Ride Status",
            dataIndex: "status",
            filters: [
                {
                    text: 'Pending',
                    value: 'Pending',
                },
                {
                    text: 'In Progress',
                    value: 'In Progress',
                },
                {
                    text: 'Completed',
                    value: 'Completed',
                },
                {
                    text: 'Canceled',
                    value: 'Canceled',
                },
            ],
            // onFilter: (value: any, record: any) => record.status.indexOf(value as string) === 0,
        },
    ];

    const columsActionAdmin: TableProps['columns'] = [{
        title: "Action",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: (record: any) => (
            <>
                <Space size={'large'}>
                    <Popconfirm
                        placement="left"
                        title={'Xác nhận xóa ride booking'}
                        description={"Bạn có chắc chắn muốn xóa ride booking này ?"}
                        onConfirm={async () => {
                            const res = await handleDeleteRideBookingAction(record._id)
                            if (res && res.message) {
                                message.success(res.message);
                            } else {
                                notification.error({
                                    message: 'Failed Delete'
                                })
                            }
                        }}
                        okText={'Xác nhận'}
                        cancelText={'Hủy'}
                    >
                        <DeleteTwoTone
                            twoToneColor={'#FF0000'}
                            style={{ cursor: 'pointer' }}
                        />
                    </Popconfirm>

                    <EditTwoTone
                        twoToneColor={'#FFA500'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setIsOpenModalUpdate(true);
                            setDataUpdate(record);
                        }}
                    />
                </Space>
            </>
        )
    }]
    const columnsActionsOperator: TableProps['columns'] = [{
        title: "Action",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: (record: any) => (
            <>
                <Space size={'large'}>
                    <EditTwoTone
                        twoToneColor={'#FFA500'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setIsOpenModalUpdate(true);
                            setDataUpdate(record);
                        }}
                    />
                </Space>
            </>
        )
    }]

    if (session?.user?.role === 'ADMIN')
        columns = [...columns, ...columsActionAdmin]
    else
        columns = [...columns, ...columnsActionsOperator]

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List of Ride Booking</span>
            </div>
        )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log("params", pagination, filters, sorter, extra);

        if (pagination && pagination.current !== meta.current) {
            const params = new URLSearchParams(searchParams);
            params.set('current', pagination.current)
            replace(`${pathname}?${params.toString()}`)
        }
        if (pagination && pagination.pageSize !== meta.pageSize) {
            const params = new URLSearchParams(searchParams);
            params.set('current', '1')
            params.set('pageSize', pagination.pageSize);
            replace(`${pathname}?${params.toString()}`)
        }
        if (extra?.action === 'filter') {
            if (Array.isArray(filters.status) && filters.status.length >= 2) {
                notification.error({
                    message: 'Vui lòng chỉ chọn 1 field!'
                })
                return;
            } else {
                const params = new URLSearchParams(searchParams);
                if (filters.status === null) {
                    params.delete('status');
                } else {
                    params.set('status', filters?.status[0])
                }
                replace(`${pathname}?${params.toString()}`)
            }
        }
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        className='def'
                        columns={columns}
                        dataSource={rideBookings}
                        onChange={onChange}
                        rowKey={'_id'}
                        pagination={{
                            current: +meta.current,
                            pageSize: +meta.pageSize,
                            total: meta.total,
                            showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} of {total} items</div>) },
                            showSizeChanger: true,
                            pageSizeOptions: ['3', '10', '20', '50', '100']
                        }}
                    />
                </Col>
            </Row>
            <RideBookingViewDetail
                isOpenDrawerViewDetail={isOpenDrawerViewDetail}
                setIsOpenDrawerViewDetail={setIsOpenDrawerViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />

            <RideBookingUpdate
                isOpenModalUpdate={isOpenModalUpdate}
                setIsOpenModalUpdate={setIsOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    )
}

export default RideBookingTable;