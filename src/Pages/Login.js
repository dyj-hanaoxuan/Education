import React from 'react'
import Axios from '../Axios'
import api from '../Api/index'
import {Form, Input, Button, Checkbox, Modal, message} from 'antd';
import {inject,observer} from 'mobx-react'

@inject('usersLogin')
@observer
class Login extends React.Component {
    constructor(){
        super()
        this.state={
            newPwd:'',
            phone:'',
            yzm:'',
            visible: false,
            confirmLoading: false,
        };
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
    };
    Find = (values) => {
        console.log(values)
        this.setState({
            newPwd:values.newPwd,
            phone:values.phone,
            yzm:values.yzm
        })
        console.log('Success:', values);
    };
    //找回密码
    reg = value =>{
        Axios({
            url:api.Nav.FindPwd,
            method:'post',
            data: {
                phone:this.state.phone,
                newPwd:this.state.newPwd,
                code:this.state.yzm
            },
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            if (res.data.code===200){
                message.success('修改成功')
                this.setState({
                    visible: false,
                })
            }
            console.log(res)
        })
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    fa =() =>{
        console.log(this.state.phone)
        Axios({
            url:api.Nav.emil,
            method:'post',
            timeout: 20000,
            params:{
              phone:15682008662
            },
        }).then(res =>{
            console.log(res)
            if (res.data.code===200){
                message.success('发送成功')
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    render() {
        const { visible, confirmLoading } = this.state;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        const onFinish = values => {
            this.props.usersLogin.username = values
            console.log('Success:', values);
            this.props.usersLogin.login()
                .then((data)=>{
                    this.props.history.push('/Index')
                    console.log(data)
                }).catch((err)=>{
                console.log(err)
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
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <span className='find' onClick={this.showModal}>
                            找回密码
                        </span>
                    </Form.Item>
                </Form>
                <Modal
                    title="Title"
                    visible={visible}
                    footer={null}
                >
                    <Form
                        {...layout}
                        name="basics"
                        initialValues={{ remember: true }}
                        onFinish={this.Find}
                    >
                        <Form.Item
                            label="手机号"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="新密码"
                            name="newPwd"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="验证码"
                            name="yzm"
                            rules={[{ required: true, message: '验证码不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button type="default" onClick={this.fa}>发送验证码</Button>
                        <Form.Item>
                            <Button key="back" onClick={this.handleCancel}>
                                返回
                            </Button>,
                            <Button type="default" htmlType="submit" onClick={this.reg.bind(this)}>找回</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export {Login as default}