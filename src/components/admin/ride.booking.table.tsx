
'use client'

import { IRideBooking } from "@/types/ride.booking";
import { DeleteTwoTone, EditTwoTone, ExportOutlined, PlusCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Space, Table } from "antd";
import { useState } from "react";

interface IProps {
    rideBookings: IRideBooking[];
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    }
}

const RideBookingTable = (props: IProps) => {
    const { rideBookings, meta } = props;

    // const [listUser, setListUser] = useState<IRideBooking[]>(rideBookings);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);

    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

    const columns = [
        {
            title: "Ride ID",
            dataIndex: "_id",
            render: (value: any, record: any, index: any) => {
                return (
                    <>
                        <a onClick={() => {
                            // setDataUserViewDetail(record);
                            // setIsOpenDrawerViewDetail(true);
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
                        {/* {moment(record?.updatedAt).format(FOR_DATE_DISPLAY)} */}
                        12:12:12
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
                            // onConfirm={() => handleDeleteUser(record._id)}
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
                        // onClick={() => {
                        //     setIsOpenModalUpdate(true);
                        //     setDataUserUpdate(record);
                        // }}
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
                <span>
                    <Space size="middle">
                        <Button
                            icon={<PlusCircleOutlined />}
                            type="primary"
                        // onClick={() => setIsOpenModalCreate(true)}
                        >Thêm mới</Button>

                        <Button
                            type='text'
                        // onClick={() => {
                        //     setFilter('');
                        //     setSortQuery('');
                        //     setCurrent(1);
                        // }}
                        >
                            <ReloadOutlined />
                        </Button>
                    </Space>
                </span>
            </div>
        )
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        className='def'
                        columns={columns}
                        dataSource={rideBookings}
                        // onChange={onChange}
                        rowKey={'_id'}
                        loading={isLoading}
                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            total: total,
                            showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} of {total} items</div>) },
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '20', '50', '100']
                        }}
                    />
                </Col>
            </Row>
            {/* <UserDrawerViewDetail
                isOpenDrawerViewDetail={isOpenDrawerViewDetail}
                setIsOpenDrawerViewDetail={setIsOpenDrawerViewDetail}
                dataUserViewDetail={dataUserViewDetail}
                setDataUserViewDetail={setDataUserViewDetail}
            />

            <UserModalCreate
                isOpenModalCreate={isOpenModalCreate}
                setIsOpenModalCreate={setIsOpenModalCreate}
                fetchUsersWithPaginate={fetchUsersWithPaginate}
            />

            <UserModalUpdate
                isOpenModalUpdate={isOpenModalUpdate}
                setIsOpenModalUpdate={setIsOpenModalUpdate}
                dataUserUpdate={dataUserUpdate}
                setDataUserUpdate={setDataUserUpdate}
                fetchUsersWithPaginate={fetchUsersWithPaginate}
            /> */}
        </>
    )
}

export default RideBookingTable;