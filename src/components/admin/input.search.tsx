import { Button, Col, Form, Input, Row, Space, theme } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const InputSearch = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        // margin: 15,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = (values: any) => {
        if (values.customerName) {
            const params = new URLSearchParams(searchParams);
            params.set('customerName', values.customerName)
            replace(`${pathname}?${params.toString()}`)
        }
    };

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                name="advanced_search"
                style={formStyle}
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            name={'customerName'}
                            label={'Customer Name'}
                        >
                            <Input placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'driverName'}
                            label={'Driver Name'}
                        >
                            <Input placeholder="placeholder" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'Booking ID'}
                            label={'_id'}
                        >
                            <Input placeholder="placeholder" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Space size="small">
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    const params = new URLSearchParams(searchParams);
                                    params.delete('customerName')
                                    replace(`${pathname}?${params.toString()}`)
                                }}
                            >
                                Reset
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default InputSearch;