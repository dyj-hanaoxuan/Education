import React from 'react'
import { Table,Button,Input,Checkbox,Modal,Form  } from 'antd';
import Axios from "../../Axios";
import moment from "moment";
import api from '../../Api/index'
import {ExclamationCircleOutlined} from "@ant-design/icons";
import { UserOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple'];
const { Search } = Input;
class Role extends React.Component {
    constructor(){
        super()
        this.state={
            arr:[],
            loading:false,
            ids:[],
            indeterminate: true,
            checkAll: false,
            visible:false,
            addvisible:false,
            role_name:'',
            list:[],
            role_introduction:''
        }
    }
    componentWillMount() {
        Axios({
            url:api.Nav.rolelist,
            method:'get',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            res.data.data.map((item)=>{
                item["key"] = item.role_id;
            })
            let arr = res.data.data
            this.setState({
                loading:false,
                arr:arr,
            })
        }).catch(err =>{
            console.log(err)
        })
    }


    handleTableChange(value){
        console.log(value)
    }
    onChange(id,e) {
        console.log(id,e);
    }


    //编辑模态
    showModal = (id)=>{
        console.log(id)
        Axios({
            url:api.Nav.rolelist,
            method:'get',
            params:{
              role_id:id
            },
            timeout: 20000,
        }).then(res =>{
            let list = res.data.data[0]
            this.setState({
                visible:true,
                list:list
            })
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
    }
    //取消
    handleCancelss = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //编辑
    handleOk = (value) => {
        console.log(value.role_name)
        Axios({
            url:api.Nav.edit,
            method:'post',
            timeout: 20000,
            data:{
                role_name:value.role_name,
                role_introduction:value.role_introduction,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            this.setState({
                loading:false,
                visible:false,
            })
            // window.location.reload()
        }).catch(err =>{
            console.log(err)
        })
    };


    //新增模态
    showModal_two(){
        this.setState({
            loading:false,
            addvisible:true,
        })
    }
    //删除
    del(id) {
        console.log(id)
        Axios({
            url:api.Nav.del,
            method:'post',
            timeout: 20000,
            params:{
                role_id:id
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            window.location.reload()
        }).catch(err =>{
            console.log(err)
        })
    }
    handleCancel = e => {
        console.log(e);
        this.setState({
            addvisible: false,
        });
    };
    //新增
    handleOkss = (value) => {
        console.log(value.role_name)
        Axios({
            url:api.Nav.add,
            method:'post',
            timeout: 20000,
            data:{
                role_name:value.role_name,
                role_introduction:value.role_introduction,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            this.setState({
                loading:false,
                addvisible:false
            })
            window.location.reload()
        })
    };
    render() {
    let list = this.state.list
        const columns = [
            {
                title: ()=>
                    <div className="site-checkbox-all-wrapper">

                    </div>,
                dataIndex: 'role_id',
                render:(id)=> <Checkbox onChange={(e)=>this.onChange(id,e)}/>
            },
            {
                title: '角色编号',
                dataIndex: 'role_id',
            },
            {
                title: '角色名称',
                dataIndex: 'role_name',
            },
            {
                title: '修改时间',
                dataIndex: 'role_creatime',
                render: () => moment().format('YYYY.MM.DD.HH:mm')
            },
            {
                title: '角色描述',
                dataIndex: 'role_introduction',
            },
            {
                title: '操作',
                dataIndex: 'role_id',
                render:(id)=><div>
                    <Button onClick={()=>{ this.showModal(id)}}>编辑</Button>
                    <Button type='default' danger onClick={()=>this.del(id)}>删除</Button>
                </div>
            },
        ];
        const {arr,loading} = this.state;
        return (
            <div>
                <Button className="add" type='primary' onClick={this.showModal_two.bind(this)}>新增</Button>
                <Table
                    columns={columns}
                    dataSource={arr}
                    loading={loading}
                    pagination={{pageSize:5,defaultCurrent:1}}
                    onChange={this.handleTableChange}
                />
                <Modal
                    title="编辑"
                    visible={this.state.visible}
                    footer={null}
                >
                    <Form
                        style={{marginLeft:'-12px'}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        onFinish={this.handleOk}
                        layout="horizontal"
                    >
                        <Form.Item label={<UserOutlined />} name="role_name">
                            <Input type="text" placeholder="请输入角色名"/>
                        </Form.Item>
                        <Form.Item label="介绍" name="role_introduction">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item style={{margin:'20px 0 0 120px '}} >
                            <Button key="back" onClick={this.handleCancelss} style={{marginLeft:"20px",marginRight:"20px"}}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit" style={{marginLeft:"20px",marginRight:"20px"}}>
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="新增"
                    visible={this.state.addvisible}
                    onCancel={this.handleCancelss}
                    footer={null}
                >
                    <Form
                        style={{marginLeft:'-12px'}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        onFinish={this.handleOkss}
                        layout="horizontal"
                    >
                        <Form.Item label={<UserOutlined />} name="role_name">
                            <Input type="text" placeholder="请输入角色名"/>
                        </Form.Item>
                        <Form.Item label="介绍" name="role_introduction">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item style={{margin:'20px 0 0 120px '}} >
                            <Button key="back" onClick={this.handleCancel} style={{marginLeft:"20px",marginRight:"20px"}}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit" style={{marginLeft:"20px",marginRight:"20px"}}>
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        )
    }
}

export {Role as default}