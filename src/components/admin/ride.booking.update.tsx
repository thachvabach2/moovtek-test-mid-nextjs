import { handleUpdateRideBookingAction } from "@/actions/actions";
import { IRideBooking } from "@/types/ride.booking";
import { Col, Divider, Form, Input, message, Modal, notification, Row, Select } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface IProps {
    isOpenModalUpdate: boolean;
    setIsOpenModalUpdate: (v: boolean) => void;
    dataUpdate: IRideBooking | null;
    setDataUpdate: (v: IRideBooking | null) => void;
}

const RideBookingUpdate = (props: IProps) => {
    const { isOpenModalUpdate, setIsOpenModalUpdate, dataUpdate, setDataUpdate } = props;

    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { data: session } = useSession();


    const statusOptions = [
        {
            value: 'Pending'
        },
        {
            value: 'In Progress'
        },
        {
            value: 'Completed'
        },
        {
            value: 'Canceled'
        }
    ]

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue(dataUpdate);
        }
    }, [dataUpdate])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: any) => {
        setIsSubmit(true);

        if (dataUpdate) {
            const { customerName, pickup, dropoff, driverName, status } = values;
            const res = await handleUpdateRideBookingAction({
                _id: dataUpdate._id,
                customerName, pickup, dropoff, driverName, status,
            })
            if (res && res.data) {
                setIsOpenModalUpdate(false);
                message.success('Update Ride Booking Succeed');
            } else {
                notification.error({
                    message: 'Update Ride Booking Error'
                })
            }
        }

        setIsSubmit(false);
        console.log('>>>> check values update: ', values)
    };

    return (
        <>
            <Modal
                title="Cập nhật Ride Booking"
                open={isOpenModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setIsOpenModalUpdate(false);
                    setDataUpdate(null)
                    form.resetFields();
                }}
                okText={'Cập nhật'}
                cancelText={'Hủy'}
                confirmLoading={isSubmit}
            // forceRender // hide warning
            >
                <Divider />

                <Form
                    form={form}
                    name="update-ride-booking"
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={[20, 20]}>
                        {session?.user?.role === 'ADMIN' &&
                            <>
                                <Col span={24}>
                                    <Form.Item
                                        label="Rid ID"
                                        name="_id"
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Customer Name"
                                        name="customerName"
                                        rules={[{ required: true, message: "Customer Name is required!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Driver Name"
                                        name="driverName"
                                        rules={[{ required: true, message: "Driver Name is required!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Pickup Location"
                                        name="pickup"
                                        rules={[{ required: true, message: "Pickup Location is required!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Drop-off Location"
                                        name="dropoff"
                                        rules={[{ required: true, message: "Drop-off Location is required!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </>
                        }
                        <Col span={8}>
                            <Form.Item
                                label="Ride Status"
                                name="status"
                                rules={[{ required: true, message: "Ride Status is required!" }]}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    options={statusOptions}
                                    placement='bottomRight'
                                >
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default RideBookingUpdate;