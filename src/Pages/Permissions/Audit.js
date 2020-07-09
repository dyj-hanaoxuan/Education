import React from 'react'
import {Button, Table} from "antd";
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
class Audit extends React.Component {
    render() {
        return (
            <Table
                columns={columns}
                // dataSource={arr}
                // loading={loading}
                pagination={{pageSize:5,defaultCurrent:1}}
                // onChange={this.handleTableChange}
            />
        )
    }
}

export {Audit as default}