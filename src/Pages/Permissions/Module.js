import React from 'react'
import { Table } from 'antd';
import Axios from "../../Axios";
import api from '../../Api/index'
const dataSource = [

];
const columns = [
    {
        title: 'id',
        // dataIndex: 'd_id',
        // key: 'd_id',
    },
    {
        title: '菜名',
        // dataIndex: 'd_name',
        // key: 'd_name',
    },
    {
        title: '价格',
        // dataIndex: 'd_price',
        // key: 'd_price',
    },
    {
        title: '原料',
        // dataIndex: 'd_tips',
        // key: 'd_tips',
    },
    {
        title: '口味',
        // dataIndex: 'd_taste',
        // key: 'd_taste',
    },
    {
        title: '种类',
        // dataIndex: 'd_type',
        // key: 'd_type',
    },
];

class Module extends React.Component {
    constructor(){
        super()
        this.state={
            arr:[],
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
            // console.log(res.data)
            this.state.arr = res.data
            this.setState({
                arr:this.state.arr
            })
            console.log(this.state.arr)
        }).catch(err =>{
            console.log(err)
        })
    }
    render() {
        let list = this.state.arr.map((item)=>{
            return  <tr key={item.main_id}>
                        <td>{item.d_id}</td>
                        <td>{item.d_name}</td>
                        <td>{item.d_price}</td>
                        <td>{item.d_tips}</td>
                        <td>{item.d_taste}</td>
                        <td>{item.d_type}</td>
                    </tr>
        })
        return (
            <Table
                dataSource={list}
                // dataSource={this.state.list}
                columns={columns}
                pagination={{pageSize:5}}
            />
    )
    }
}

export {Module as default}