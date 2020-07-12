import React from 'react'
import Axios from '../../Axios'
import api from "../../Api";
import tree from '../../Components/Power/Add'
import { Table  } from 'antd';
import moment from "moment";
const columns = [
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
        render: (id) => <tree id={id}/>
    },
    ];


class Power extends React.Component {
    constructor(props){
        super(props)
        this.state={
            arr:[],
            loading:false,
        }
    }
    componentDidMount() {
        //查看所有人员
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
            this.state.arr = res.data.data
            this.setState({
                loading:false,
                arr:this.state.arr,
            })
        })
    }


    render() {
        const {arr,loading} = this.state;

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={arr}
                    loading={loading}
                    pagination={{pageSize:5,defaultCurrent:1}}
                    onChange={this.handleTableChange}
                />
            </div>
        )

    }
}

export {Power as default}