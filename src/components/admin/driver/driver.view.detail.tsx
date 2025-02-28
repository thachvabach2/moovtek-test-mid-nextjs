import { IDriver } from "@/types/driver";
import { KeyOutlined, StarFilled } from "@ant-design/icons";
import { Col, Descriptions, Drawer, Row, Table } from "antd";
import { MdContactPhone } from "react-icons/md";
import { RiEBike2Fill } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { MdRateReview } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { IoText } from "react-icons/io5";

interface IProps {
    isOpenDrawerViewDetail: boolean;
    setIsOpenDrawerViewDetail: (v: boolean) => void;
    dataViewDetail: IDriver | null;
    setDataViewDetail: (v: IDriver | null) => void;
}

const DriverViewDetail = (props: IProps) => {
    const { isOpenDrawerViewDetail, setIsOpenDrawerViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setIsOpenDrawerViewDetail(false)
        setDataViewDetail(null);
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (value: any) => {
                return (
                    <>
                        {value}
                    </>
                )
            }
        },
        {
            title: "Reviewer",
            dataIndex: "reviewer",
        },
        {
            title: "Comment",
            dataIndex: 'comment',
        },
        {
            title: "Rating",
            dataIndex: 'rating',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (value: any) => {
                return (
                    <>
                        <StarFilled style={{ color: '#FFA500' }} /> {value}
                    </>
                )
            }
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
        },
    ];

    return (
        <>
            <Drawer
                title="View Details"
                onClose={onClose}
                open={isOpenDrawerViewDetail}
                width={'100vw'}
            >
                <div>
                    <Descriptions
                        title="Driver Profile"
                        bordered
                        column={2} //default=3
                        layout="vertical"

                    >
                        <Descriptions.Item label={<span className="text-lg font-medium"><KeyOutlined style={{ color: 'blue' }} /> Driver ID</span>}>
                            {dataViewDetail?._id}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center text-lg font-medium"> <IoText color="blue" /> &nbsp;Full Name </span>}>{dataViewDetail?.fullName}</Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center text-lg font-medium"> <MdContactPhone color="blue" /> &nbsp;Contact Info </span>}>
                            <div className="flex flex-col">
                                <span>Phone: {dataViewDetail?.contactInfo?.phone}</span>
                                <span>Email: {dataViewDetail?.contactInfo?.email}</span>
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center text-lg font-medium"> <RiEBike2Fill color="blue" /> &nbsp;Vehicle Details </span>}>
                            <div>Company: {dataViewDetail?.vehicle?.company}</div>
                            <div>Model: {dataViewDetail?.vehicle?.model}</div>
                            <div>Year: {dataViewDetail?.vehicle?.year}</div>
                            <div>Plate: {dataViewDetail?.vehicle?.plateNumber}</div>
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center text-lg font-medium"> <SiTicktick color="blue" /> &nbsp;Completed Rides</span>}>
                            {dataViewDetail?.completedRides}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center text-lg font-medium"> <MdOutlineReviews color="blue" /> &nbsp;Ratings</span>}>
                            <StarFilled style={{ color: '#FFA500' }} /> {dataViewDetail?.rating}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center text-lg font-medium"> <MdRateReview color="blue" /> &nbsp;Reviews</span>}>
                            <Row gutter={[20, 20]}>
                                <Col span={24}>
                                    <Table
                                        className='reviews'
                                        columns={columns}
                                        dataSource={dataViewDetail?.reviews}
                                        // onChange={onChange}
                                        rowKey={'_id'}
                                        pagination={{
                                            // current: +meta.current,
                                            // pageSize: +meta.pageSize,
                                            // total: meta.total,
                                            showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} of {total} items</div>) },
                                            showSizeChanger: true,
                                            pageSizeOptions: ['3', '10', '20', '50', '100']
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Drawer >
        </>
    )
}

export default DriverViewDetail;