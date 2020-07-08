import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import Axios from '../../Axios'
import api from "../../Api";
class Password extends React.Component {
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        const onFinish = values => {
            console.log('Success:', values.oldpwd);
            Axios({
                method: 'post',
                url:api.Nav.pwd,
                data: {
                    user_name: values.username,
                    user_pwd: values.oldpwd,
                    new_user_pwd:values.password,
                    confirm_new_user_pwd:"12345678"
                },
                timeout: 20000,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res =>{
                console.log(res)
            })

        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="旧密码"
                        name="oldpwd"
                        rules={[{ required: true, message: '请输入旧密码!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="新密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次密码不一致!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export {Password as default}