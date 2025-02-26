'use client';

import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSession } from "next-auth/react"
import { authenticate } from '@/actions/authActions';
import { useRouter } from 'next/navigation';


const Login = () => {
    const { update } = useSession();
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: any) => {
        console.log('>>>> On finish form:', values);
        const { email, password } = values;

        //trigger signin
        const res = await authenticate(email, password);
        console.log('>>> check res: ', res)

        if (res?.error) {
            // login fail
            notification.error({
                message: 'Error login',
                description: res?.error,
            })
        } else {
            await update();
            router.push('/dashboard');
        }

        // const data = await signIn("credentials", { email, password, redirect: false })
        // console.log('>>>> checkdata: ', data)
    };

    return (
        <Row className='login-container justify-center mt-28'>
            <Col xs={24} md={16} lg={8}>
                <fieldset className='p-5 m-2 border border-solid border-gray-300'>
                    <legend>Đăng Nhập</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link href={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                    <Divider />
                    <div className='text-center'>
                        Chưa có tài khoản? <Link href={"/auth/register"}>Đăng ký tại đây</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    )
}

export default Login;