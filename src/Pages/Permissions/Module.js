import React from 'react'
import { Table,Button,Input  } from 'antd';
import Axios from "../../Axios";
import api from '../../Api/index'
import { AudioOutlined } from '@ant-design/icons';
const columns = [
    {
        title: 'id',
        dataIndex: 'main_id',
        key: 'main_id',
    },
    {
        title: '菜名',
        dataIndex: 'd_name',
        key: 'd_name',
    },
    {
        title: '价格',
        dataIndex: 'd_price',
        key: 'd_price',
    },
    {
        title: '原料',
        dataIndex: 'd_tips',
        key: 'd_tips',
    },
    {
        title: '口味',
        dataIndex: 'd_taste',
        key: 'd_taste',
    },
    {
        title: '种类',
        dataIndex: 'd_type',
        key: 'd_type',
    },
    {
        title: '操作',
        dataIndex: 'button',
        key: 'button',
        render: () =><div><Button type='Default'>编辑</Button>
            <Button type="primary" danger>
                删除
            </Button></div>,
    },
];
const { Search } = Input;
class Module extends React.Component {
    constructor(){
        super()
        this.state={
            arr:[],
            loading:false
        }
    }
    componentWillMount() {
        Axios({
            url:api.Nav.list,
            method:'post',
            data:{

            },
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res.data)
            this.state.arr = res.data
            this.setState({
                loading:false,
                arr:this.state.arr,
            })
        }).catch(err =>{
            console.log(err)
        })
    }
    handleTableChange(value){
        console.log(value)
    }
    search(value){
        console.log(value)
        Axios({
            url:api.Nav.search,
            method:'post',
            data:{
                d_name:value
            },
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res.data)
        }).catch(err =>{
            console.log(err)
        })
    }
    render() {
        const {arr,loading} = this.state;
        let id = arr.map((item)=>{
            return item.main_id
        })
        return (
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={this.search}
                    style={{ width: 200 }}
                />
                <h2><Button className="add" type='primary'>新增</Button></h2>
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

export {Module as default}