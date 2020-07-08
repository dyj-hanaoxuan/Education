import React from 'react'
import Axios from '../../Axios'
import api from "../../Api";
import { Table,Button,Input  } from 'antd';
const columns = [
    {
        title: '角色编号',
        dataIndex: 'role_id',
        key: 'role_id',
    },
    {
        title: '角色名称',
        dataIndex: 'role_name',
        key: 'role_name',
    },
    {
        title: '修改时间',
        dataIndex: 'role_creatime',
        key: 'role_creatime',
    },
    {
        title: '角色描述',
        dataIndex: 'role_introduction',
        key: 'role_introduction',
    },
    {
        title: '操作',
        dataIndex: 'button',
        key: 'button',
        render: () =><Button type='Default' onChange={this.editPower}>修改</Button>
    },
];
class Power extends React.Component {
    editPower(){
        Axios({
            url:api.Nav.AllPower,
            method:'get',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            this.state.arr = res.data.data
            this.setState({
                loading:false,
                arr:this.state.arr,
            })
        })
    }
    constructor(){
        super()
        this.state={
            arr:[],
            loading:false
        }
    }
    componentDidMount() {
        Axios({
            url:api.Nav.rolelist,
            method:'get',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            this.state.arr = res.data.data
            this.setState({
                loading:false,
                arr:this.state.arr,
            })
        })
    }

    render() {
        const {arr,loading} = this.state;
        let id = arr.map((item)=>{
            return item.role_id
        })
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={arr}
                    key={id}
                    loading={loading}
                    pagination={{pageSize:5,defaultCurrent:1}}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

export {Power as default}