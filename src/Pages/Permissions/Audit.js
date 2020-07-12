import React from 'react'
import { Table,Input,Select,Tag   } from 'antd';
import Axios from "../../Axios";
import api from '../../Api/index'
import Wer from '../../Components/Power/Drawers'
const { Search } = Input;
const { Option } = Select;
class Audit extends React.Component {
    //按类名搜索
    onChange=(value)=> {
        console.log(value);
        Axios({
            url:api.Nav.KC_fl,
            method:'post',
            timeout: 20000,
            data:{
                page:1,
                limit:9999,
                type_id:value,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            res.data.data.courselist.map((item)=>{
                item["key"] = item.course_id;
            })
            this.setState({
                arr:res.data.data.courselist
            })
        }).catch(err =>{
            console.log(err)
        })
    }

    onSearch=(val)=>{
        // console.log(val);
    }
    //按id搜索
    towChange=(value)=> {

    }

    towSearch=(val)=>{
        console.log(val);
        Axios({
            url:api.Nav.KC_fl,
            method:'post',
            timeout: 20000,
            data:{
                page:1,
                limit:9999,
                course_id:val,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            res.data.data.courselist.map((item)=>{
                item["key"] = item.course_id;
            })
            this.setState({
                arr:res.data.data.courselist
            })
        }).catch(err =>{
            console.log(err)
        })
    }
    //按状态搜索
    threeChange=(value)=> {
        // console.log(value);
        Axios({
            url:api.Nav.KC_fl,
            method:'post',
            timeout: 20000,
            data:{
                page:1,
                limit:9999,
                course_detection:value,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            res.data.data.courselist.map((item)=>{
                item["key"] = item.course_id;
            })
            this.setState({
                arr:res.data.data.courselist
            })
        }).catch(err =>{
            console.log(err)
        })
    }

    threeSearch=(val)=>{
        // console.log(val);
    }
    // ——————————————————————--------------
    constructor(props){
        super(props)
        this.state={
            arr:[],
            loading:false,
            list:[],
            type:[],
            id:'',
            sta:''
        }
    }
    componentDidMount() {
        Axios({
            url:api.Nav.SH_kc,
            method:'post',
            data:{
                limit: 9999,
                page: 1,
            },
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            res.data.data.courselist.map((item)=>{
                item["key"] = item.course_id;
            })
            this.state.arr = res.data.data.courselist
            this.setState({
                loading:false,
                list:res.data.data.courselist,
                arr:this.state.arr,
            })
        }).catch(err =>{
            console.log(err)
        })
        Axios({
            url:api.Nav.KC_cx,
            method:'post',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            let type = res.data.data
            this.setState({
                type:type
            })
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
    }
    render() {
        let type = this.state.type.map((item)=>{
            return <Option key={item.type_id} value={item.type_id}>{item.type_name}</Option>
        })
        const {arr,loading} = this.state;
        const columns = [
            {
                title: '教师名',
                dataIndex: 'admin_name',
            },
            {
                title: '课程id',
                dataIndex: 'course_id',
            },
            {
                title: '课程名',
                dataIndex: 'course_name',
            },
            {
                title: '课程价格',
                dataIndex: 'course_price',
            },
            {
                title: '课程类型',
                dataIndex: 'type_name',
            },
            {
                title: '状态',
                dataIndex: 'course_state',
                render: (id) =>{
                    let color = id===2?'green':'red'
                    if(id === 2){
                        color = "red"
                        id = "已下架"
                    }else if(id===1) {
                        color = "green"
                        id = "上架中"
                    }else {
                        color ='red'
                        id = "NAN"
                    }
                    return (
                        <Tag color={color}>
                            {id}
                        </Tag>
                    )
                }


            },
            {
                title: '操作',
                dataIndex: 'course_id',
                render: (id) =><Wer id={id}/>
            },
        ];
        return (
            <div>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="按类名搜索"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {type}
                </Select>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="按id搜索"
                    optionFilterProp="childrens"
                    onChange={this.towChange}
                    onSearch={this.towSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="按状态搜索"
                    optionFilterProp="childrenss"
                    onChange={this.threeChange}
                    onSearch={this.threeSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option key='1'>审核不通过</Option>
                    <Option key='2'>审核通过</Option>
                </Select>
                <Table
                    columns={columns}
                    dataSource={arr}
                    loading={loading}
                    pagination={{pageSize:5,defaultCurrent:1}}
                />

            </div>

        )
    }
}

export {Audit as default}