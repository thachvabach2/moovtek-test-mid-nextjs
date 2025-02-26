/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { IDriver } from "@/types/driver";
import { Col, Row, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DriverViewDetail from "./driver.view.detail";

interface IProps {
    listDriver: IDriver[];
    meta: {
        current: string | number;
        pageSize: string | number;
        pages: number;
        total: number;
    }
}

const DriverTable = (props: IProps) => {
    const { listDriver, meta } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isOpenDrawerViewDetail, setIsOpenDrawerViewDetail] = useState<boolean>(false);
    const [dataViewDetail, setDataViewDetail] = useState<IDriver | null>(null);


    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
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
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Phone",
            dataIndex: ['contactInfo', 'phone'],
        },
        {
            title: "Vehicle",
            dataIndex: ['vehicle', 'model'],
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
        },
    ];

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List of Driver</span>
            </div>
        )
    }

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
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        className='def'
                        columns={columns}
                        dataSource={listDriver}
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
            <DriverViewDetail
                isOpenDrawerViewDetail={isOpenDrawerViewDetail}
                setIsOpenDrawerViewDetail={setIsOpenDrawerViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
        </>
    )
}

export default DriverTable;