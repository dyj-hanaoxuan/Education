import React from 'react'
import {Row, Col, Select, Form, Input, Button,  Table, Tag, Space, Modal, Switch, Pagination   } from 'antd'
import { SearchOutlined, ExclamationCircleOutlined, CloseOutlined, CheckOutlined, ThunderboltFilled   } from '@ant-design/icons';
import axios from '../../Axios'
const { Option } = Select
const { confirm } = Modal;
 
  
// 班级管理组件
class ClassModel extends React.Component {
   
   
     constructor(props){
            super(props);
            this.state= {
            //表格数据数组
             ListArr :[],
            // 分页
            page:1,//当前页
            limit:5,//每页显示条数
            total:'',//总页数
            //搜索栏值
            classestype_id:'',//班级类型id
            classestype_name:'', // 班级类型名称,
            admin_name:'',//班主任名称
            classes_name:'',//班级名称
            classes_id:'',//班级编号
            classArr:[]
            //搜索栏结束   
              
        }
    }
    // 下拉框改变事件 
    TypeChange=(id,name)=>{
        console.log(name);
        this.setState({
            classestype_id:id,
            classestype_name:name
        })
    }
    //获取input框的值
    GetClasses_name=(event)=>{
        this.setState({
            classes_name : event.target.value
        })  
    }
    GetClasses_id=(event)=>{
        this.setState({
            classes_id : event.target.value
        })
    }
    GetAdmin_name=(event)=>{
        this.setState({
            admin_name : event.target.value
        })
    }


    //点击搜索事件
    search(){
       console.log("班主任名称")
       console.log(this.state.classestype_name)
        fetch(`api/fengduomodule/classes/selectClassesByRequirement`,{
            // 请求的方式
            method:"POST",
            // 请求头
            headers:{
                'Content-Type': 'application/json'
            },
            // 要传的参数
            body:JSON.stringify({
                "admin_name": this.state.admin_name,
                "classes_id": this.state.classes_id,
                "classes_name": this.state.classes_name,
                "classes_state": null,
                "classes_typeID": this.state.classestype_id,
                "limit": 5,
                "page": 1
            })
        }).then( (res) =>{
            return res.json()
        }).then( (res) =>{
            console.log("测试数据")
            console.log(res)
            console.log(res.total)
            this.setState({
                listArr:res.data,
                total:res.total
            })
        }).catch(function (err) {
            console.log(err)
        })

    }
    //点击新增按钮出现模态框
    add(){
        console.log("新增")
        this.props.history.push('/Index/AddCourse')
    }
    //删除事件
    dele(record) {
        confirm({
          title: '请注意',
          icon: <ExclamationCircleOutlined />,
          content: '此操作将删除该条数据！！！',
          onOk() {
            return new Promise((resolve,reject)=> {
                console.log("2",record.classes_id);  
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                axios({
                    method: 'post',
                    url: `/fengduomodule/classes/fakeDeleteClass`,
                    data: {
                        classes_id:record.classes_id
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    console.log(res.data)
                    // this.token = res.data.token
                    resolve(res)
                    this.setState({
                        listArr:res.data,
                        total:res.total
                    })
                }).catch(err =>{
                    reject(err)
                })
            }).then((data)=>{
                console.log(data)
            })
          },
          onCancel() {},
        });
      }
    //修改状态
    changestatus=(status)=>{
        console.log(status);

    }
    // 页码点击更改事件
    onChange=(pageNumber)=> {
        console.log('Page: ', pageNumber);
        fetch(`api/fengduomodule/classes/selectClassesByRequirement`,{
            // 请求的方式
            method:"POST",
            // 请求头
            headers:{
                'Content-Type': 'application/json'
            },
            // 要传的参数
            body:JSON.stringify({
                "classes_adminID": null,
                "classes_id": null,
                "classes_name": null,
                "classes_state": null,
                "classes_typeID": null,
                "limit": 5,
                "page": pageNumber
            })
        }).then( (res) =>{
            return res.json()
        }).then( (res) =>{
            console.log(res)
            this.setState({
                listArr:res.data,
                total:res.total
            })
        }).catch(function (err) {
            console.log(err)
        })
    }
      // 组件挂载前（生命周期）
    componentDidMount() {
        // Axios请求
        // Axios.post("/reception/queryType")
        //     .then((res)=>{
        //         console.log(res.data)
        //     this.setState({
        //         list:res.data
        //     })
        // }).catch(function (err) {
        //     console.log(err)
        // })
        // fetch请求（第一个then是返回的格式是什么格式；第二个then才是说具体的json是什么数据;catch是出现的错误）
        fetch(`api/fengduomodule/classes/selectClassesByRequirement`,{
            // 请求的方式
            method:"POST",
            // 请求头
            headers:{
                'Content-Type': 'application/json'
            },
            // 要传的参数
            body:JSON.stringify({
                "classes_adminID": null,
                "classes_id": null,
                "classes_name": null,
                "classes_state": null,
                "classes_typeID": null,
                "limit": 5,
                "page": 1
            })
        }).then( (res) =>{
            return res.json()
        }).then( (res) =>{
            console.log(res)
            this.setState({
                listArr:res.data,
                total:res.total
            })
        }).catch(function (err) {
            console.log(err)
        });
        // 查询班级所有类型接口
        fetch(`api/fengduomodule/classes/selectAllClassesType`,{
            // 请求的方式
            method:"POST",
            // 请求头
            headers:{
                'Content-Type': 'application/json'
            },
            // 要传的参数
            body:JSON.stringify({
            })
        }).then( (res) =>{
            return res.json()
        }).then( (res) =>{
            console.log(res)
            this.setState({
                // classestype_id:res.data.classestype_id,
                // classestype_name:res.data.classestype_name,
                classArr:res.data
            })
        }).catch(function (err) {
            console.log(err)
        })


    }

    render() {
        const columns = [
            {
              title: '班级编号',
              dataIndex: 'classes_id',
              key: 'classes_id',
              render: text => <a>{text}</a>,
            },
            {
              title: '班级名称',
              dataIndex: 'classes_name',
              key: 'classes_name',
            },
            {
              title: '班级介绍',
              dataIndex: 'classes_introduction',
              key: 'classes_introduction',
            },
            {
                title: '班级类型',
                dataIndex: 'classes_typeName',
                key: 'classes_typeName',
              },
            {
            title: '班主任',
            dataIndex: 'classes_adminName',
            key: 'classes_adminName',
            },
            {
              title: '操作',
              key: 'classes_id',
              dataIndex:'classes_id',
              render: (text, record, index) => (
                <Space size="middle">
                  {/* <a>Invite {record.name}</a>
                  <a>Delete</a> */}
                  <Button type="primary">修改</Button>
                  <Button type="primary" onClick={()=>this.dele(record)} danger>删除</Button>
                </Space>
              ),
            },
          ];
        return (
            <div>
                {/* RequiredCourses */}
                {/* 必修课程管理 */}
                {/* 顶部查询模块--start */}
                <Row>
                    <Col span={8}>
                    <Form
                    labelAlign="left"
                    labelCol={{
                    span: 4,
                    offset:2
                    }}
                    wrapperCol={{
                    span: 10,
                    }}>
                    <Form.Item label="班级编号">
                        <Input
                        value={this.state.classes_id}
                        onChange={this.GetClasses_id}/>
                    </Form.Item>
                    </Form>
                    </Col>
                    <Col span={8}>
                    <Form
                    labelAlign="left"
                    labelCol={{
                    span: 4
                    }}
                    wrapperCol={{
                    span: 10,
                    }}>
                    <Form.Item label="班级名称">
                        <Input
                        value={this.state.classes_name}
                        onChange={this.GetClasses_name}
                        />
                    </Form.Item>
                    </Form>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                    <Form
                    labelAlign="left"
                    labelCol={{
                    span: 4,
                    offset:2
                    }}
                    wrapperCol={{
                    span: 10,
                    }}>
                        <Form.Item label="班主任">
                            <Input value={this.state.admin_name}
                            onChange={this.GetAdmin_name}/>
                        </Form.Item>
                    </Form>
                    </Col>
                    <Col span={8}>
                    <Form
                    labelAlign="left"
                    labelCol={{
                    span: 4,
                    }}
                    wrapperCol={{
                    span: 10,
                    }}>
                    <Form.Item label="班级类型">
                        <Select
                            showSearch
                            onChange={this.TypeChange}
                            placeholder="请选择"   
                            onSearch={this.search}
                        >
                        {
                            this.state.classArr.length && this.state.classArr.map( (item) => (
                                <Option key={item.classestype_id} value={item.classestype_id}>{item.classestype_name}</Option>)
                            ) 
                        }
                        </Select>
                    </Form.Item>

                    </Form>
                    </Col>
                    <Col span={2}>
                    <Button 
                    type="primary" 
                    onClick={this.search.bind(this)}
                    icon={<SearchOutlined />}>
                        查询
                    </Button>
                    </Col>
                    <Col span={2}>
                    <Button 
                    type="primary" 
                    onClick={this.add.bind(this)}
                    icon={<SearchOutlined />}>
                        新增
                    </Button>
                    </Col>
                </Row>
                {/* 顶部查询模块--end */}
                {/* 表单内容--start */}
                <Table 
                columns={columns} 
                dataSource={this.state.listArr} 
                pagination={ false }/>
                <Pagination showQuickJumper defaultCurrent={1} total={this.state.total} onChange={this.onChange}/>     
                {/* 表单内容--end */}
            </div>
        )
    }
}

export {ClassModel as default}