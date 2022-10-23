import { Button, Form, Input, Row, Col, Typography, Space, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
const { Title, Text } = Typography;
import { useMutation } from '@tanstack/react-query'
import { NextPage } from "next"
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn } from "next-auth/react";

const LoginPage: NextPage = () => {
  const router = useRouter()

  const loginMutation = useMutation((params: any) => {
    return signIn("credentials", { redirect: false, username: params.username, password: params.password });
  }, {
    onSuccess(data, _, __) {
      if (data?.ok) {
        notification['success']({
          message: 'Login Success'
        });
        router.push('/');
      } else {
        notification['error']({
          message: 'Login Error',
          description: `Wrong username or password, please try again`
        });  
      }
    },
    onError(error, _, __) {
      notification['error']({
        message: 'Login Error',
        description: `${error}`
      });
    },
  });

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={4}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <div>
          <Title level={2}>Login</Title>
          <Text type="secondary">please login to continue</Text>
          </div>
          <Form
            disabled={loginMutation.isLoading}
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={loginMutation.mutate}
            layout='vertical'
            autoComplete="off">
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder='username' prefix={<UserOutlined/>} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder='password' prefix={ <LockOutlined/> }/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size='large' loading={loginMutation.isLoading} block>
                Submit
              </Button>
            </Form.Item>
          </Form>
          </Space>
      </Col>
    </Row>
  )
}

export default LoginPage