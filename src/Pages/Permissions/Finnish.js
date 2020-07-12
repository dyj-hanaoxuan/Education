import React from 'react'
import {Table, Select, Button, message, Tag} from 'antd';
import Axios from "../../Axios";
import api from '../../Api/index'
import Finn from '../../Components/Power/Finni'
const { Option } = Select;
class Finnish extends React.Component {
    constructor(props){
        super(props)
        this.state={
            arr:[],
            loading:false,
            type:[]
        }
    }
    onChange=(value)=> {
        console.log(value);
        Axios({
            url:api.Nav.SH_ok,
            method:'post',
            data:{
                limit: 9999,
                page: 1,
                retype_id:value
            },
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            if (res.data.code ===200){
                res.data.data.finishReportviewlist.map((item)=>{
                    item["key"] = item.reportreview_id;
                })
                this.state.arr = res.data.data.finishReportviewlist
                this.setState({
                    loading:false,
                    arr:res.data.data.finishReportviewlist
                })
                console.log(res)
            }else if (res.data.code===500){
                message.warning('数据为空')
            }

        }).catch(err =>{
            console.log(err)
        })
    }
    cz(value){
        window.location.reload(true)
    }
    onSearch=(val)=>{
        // console.log(val);
    }
    componentDidMount() {

        Axios({
            url:api.Nav.SH_ok,
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
            res.data.data.finishReportviewlist.map((item)=>{
                item["key"] = item.reportreview_id;
            })
            this.state.arr = res.data.data.finishReportviewlist
            this.setState({
                loading:false,
                arr:this.state.arr,
            })
        }).catch(err =>{
            console.log(err)
        })
        Axios({
            url:api.Nav.SH_jb,
            method:'post',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            res.data.data.map((item)=>{
                item["key"] = item.retype_id;
            })
            this.setState({
                loading:false,
                type:res.data.data
            })
        }).catch(err =>{
            console.log(err)
        })
    }

    render() {
        const {arr,loading} = this.state;
        let type = this.state.type.map((item)=>{
            return <Option key={item.retype_id} value={item.type_id}>{item.retype_name}</Option>
        })
        const columns = [
            {
                title: '审核人',
                dataIndex: 'admin',
            },
            {
                title: '审核日期',
                dataIndex: 'reportreview_date',
            },
            {
                title: '审核id',
                dataIndex: 'reportreview_id',
            },
            {
                title: '审核状态',
                dataIndex: 'reportreview_state',
                render:(id)=>{
                    let color = id===2?'green':'red'
                    if(id === 0){
                        color = "red"
                        id = "未审核"
                    }else if(id===1) {
                        color = "green"
                        id = "审核通过"
                    }else {
                        color ='red'
                        id = "未知"
                    }
                    return (
                        <Tag color={color}>
                            {id}
                        </Tag>
                    )
                }
            },
            {
                title: '举报类型',
                dataIndex: 'retype_name',
            },
            {
                title: '举报人',
                dataIndex: 'student_name',
            },
            {
                title: '被举报老师',
                dataIndex: 'teacher',
            },
            {
                title: '操作',
                dataIndex: 'reportreview_id',
                render: (id) =><Finn id={id}/>
            },
        ]
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
                <Button onClick={this.cz.bind(this)}>重置</Button>
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

export {Finnish as default}