import { IRideBooking } from "@/types/ride.booking";
import { Badge, Descriptions, Drawer } from "antd";

interface IProps {
    isOpenDrawerViewDetail: boolean;
    setIsOpenDrawerViewDetail: (v: boolean) => void;
    dataViewDetail: IRideBooking | null;
    setDataViewDetail: (v: IRideBooking | null) => void;
}

const RideBookingViewDetail = (props: IProps) => {
    const { isOpenDrawerViewDetail, setIsOpenDrawerViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setIsOpenDrawerViewDetail(false)
        setDataViewDetail(null);
    }

    return (
        <>
            <Drawer
                title="View Details"
                onClose={onClose}
                open={isOpenDrawerViewDetail}
                width={'50vw'}
            >
                <div>
                    <Descriptions
                        title="Ride Booking Info"
                        bordered
                        column={2} //default=3
                    >
                        <Descriptions.Item label="Ride ID" span={2}>{dataViewDetail?._id}</Descriptions.Item>
                        <Descriptions.Item label="Customer Name">{dataViewDetail?.customerName}</Descriptions.Item>
                        <Descriptions.Item label="Driver Name">{dataViewDetail?.driverName}</Descriptions.Item>
                        <Descriptions.Item label="Pickup Location">{dataViewDetail?.pickup}</Descriptions.Item>
                        <Descriptions.Item label="Drop-off Location">{dataViewDetail?.dropoff}</Descriptions.Item>

                        <Descriptions.Item label="Ride Status" span={2}>
                            <Badge status="processing" text={dataViewDetail?.status} />
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Drawer>
        </>
    )
}

export default RideBookingViewDetail;