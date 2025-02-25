
'use client'

import { IRideBooking } from "@/types/ride.booking";
import { DeleteTwoTone, EditTwoTone, ExportOutlined, PlusCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Space, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import RideBookingViewDetail from "./ride.booking.view.detail";
import RideBookingUpdate from "./ride.booking.update";
import { handleDeleteRideBookingAction } from "@/actions/actions";

interface IProps {
    rideBookings: IRideBooking[];
    meta: {
        current: any;
        pageSize: any;
        pages: number;
        total: number;
    }
}

const RideBookingTable = (props: IProps) => {
    const { rideBookings, meta } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isOpenDrawerViewDetail, setIsOpenDrawerViewDetail] = useState<boolean>(false);
    const [dataViewDetail, setDataViewDetail] = useState<IRideBooking | null>(null);

    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IRideBooking | null>(null);

    const columns = [
        {
            title: "Ride ID",
            dataIndex: "_id",
            render: (value: any, record: any, index: any) => {
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
            sorter: true,
        },
        {
            title: "Pickup Location",
            dataIndex: "pickup",
            sorter: true,
        },
        {
            title: "Drop-off Location",
            dataIndex: "dropoff",
            sorter: true,
        },
        {
            title: "Driver Name",
            dataIndex: "driverName",
            sorter: true,
            render: (value: any, record: any, index: any) => {
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
            sorter: true,
        },
        {
            title: "Action",
            render: (value: any, record: any, index: any) => (
                <>
                    <Space size={'large'}>
                        <Popconfirm
                            placement="left"
                            title={'Xác nhận xóa ride booking'}
                            description={"Bạn có chắc chắn muốn xóa ride booking này ?"}
                            onConfirm={() => handleDeleteRideBookingAction(record._id)}
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
        },
    ];

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List of Ride Booking</span>
            </div>
        )
    }

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
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

        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        className='def'
                        columns={columns}
                        dataSource={rideBookings}
                        onChange={onChange}
                        rowKey={'_id'}
                        loading={isLoading}
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