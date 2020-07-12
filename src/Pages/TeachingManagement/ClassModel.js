import React from 'react'
import {Row, Col, Select, Form, Input, Button,  Table, Tag, Space, Modal, Switch, Pagination   } from 'antd'
import { SearchOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import axios from '../../Axios'
// import '../../Common/css/Table.css'
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
            classArr:[],//班级数据数组
            teacherArr:[],//未带班的老师数据数组
            //搜索栏结束
            //修改模态框值
            visible: false,//模态框默认隐藏
            add_visible:false,
            modalTitle:'',//模态框标题
            Modal_classes_id:'',
            Modal_classes_name:'',
            Modal_classestype_id:'',
            Modal_classes_introduction:'',
            modal_classes_adminID:''

        }
    }
    // 班级下拉框改变事件
    TypeChange=(id,name)=>{
        console.log(name);
        this.setState({
            classestype_id:id,
            classestype_name:name
        })
    }
    //获取班级input框的值
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

    // 未带班老师下拉框改变事件
    TeacherChange=(id,name)=>{
        console.log(name);
        this.setState({
            classestype_id:id,
            classestype_name:name
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
                        resolve(res)
                        // 调用表格列表数据
                        this.listFun()
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

    // 模态框方法
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            add_visible:false
        });
    };


    //点击新增按钮出现模态框
    add(){
        this.setState({
            add_visible:true,
            modalTitle:'新增班级信息',
            modal_classes_id: '',
            modal_classes_name:'',
            modal_classes_introduction:'',
            modal_classestype_id:'',
            modal_classes_adminID:''
        })
    }

    hideCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            add_visible:false,
            modal_classes_id: '',
            modal_classes_name:'',
            modal_classes_introduction:'',
            modal_classestype_id:'',
            modal_classes_adminID:''
        });
    }




    //点击修改按钮，激发模态框
    update=(title,record)=>{
        this.setState({
            visible:true,
            add_visible:true,
            modalTitle:title,
            modal_classes_id: record.classes_id,
            modal_classes_name:record.classes_name,
            modal_classes_introduction:record.classes_introduction,
            modal_classestype_id:record.classes_typeName,
            modal_classes_adminID:record.classes_adminName
        })
    }
    //新增模态框
    onAddFinish = values => {
        console.log("顶顶顶顶")
        console.log(values)
        axios.post(`/fengduomodule/classes/addClass`,{
            "classes_adminID": values.classes_adminName,
            "classes_date":null,
            "classes_id": values.classes_id,
            "classes_name": values.classes_name,
            "classes_adminName":null,
            "classes_typeName":null,
            "classes_introduction":values.classes_introduction,
            "classes_state": 1,
            "classes_typeID": values.classes_typeName,
        }).then((res)=>{
            console.log("新增结果怎么样")
            console.log(res)
            // 调用表格列表数据
            this.listFun()
        }).catch((err)=>{
            console.log(err)
        })

    }
    //修改点击保存向后台请求
    onUpdateFinish = values => {
        console.log("恒呵呵呵呵呵")
        console.log(values)
        axios.post(`/fengduomodule/classes/updateClassInfo`,{
            "classes_adminID": values.classes_adminName,
            "classes_date":null,
            "classes_id": values.classes_id,
            "classes_name": values.classes_name,
            "classes_adminName":null,
            "classes_typeName":null,
            "classes_introduction":values.classes_introduction,
            "classes_state": 1,
            "classes_typeID": values.classes_typeName,
        }).then((res)=>{
            console.log("结果怎么样")
            console.log(res)
            this.setState({
                Classes_id: '',
                Classes_name:'',
                Classes_introduction:'',
                Classes_typeName:'',
                classes_adminID:''
            })
            // 调用表格列表数据
            this.listFun()
        }).catch((err)=>{
            console.log(err)
        })
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
            let listData=res.data.map((item)=>{
                item["key"] = item.classes_id
                return item
            })
            this.setState({
                listArr:listData,
                total:res.total
            })
        }).catch(function (err) {
            console.log(err)
        })
    }
    //加载表格列表数据
    listFun(){
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
            console.log("加载后的数据")
            console.log(res)
            let listData=res.data.map((item)=>{
                item["key"] = item.classes_id
                return item
            })
            this.setState({
                listArr:listData,
                total:res.total
            })
        }).catch(function (err) {
            console.log(err)
        });
    }

    // 组件挂载后（生命周期）
    componentDidMount() {
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
                classArr:res.data,
                total:res.total
            })
        }).catch(function (err) {
            console.log(err)
        })

        // 查询未带班的老师名字和老师编号
        fetch(`api/fengduomodule/classes/selectAllFreeTeacher`,{
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
                teacherArr:res.data,
                total:res.total
            })
        }).catch(function (err) {
            console.log(err)
        })

        // 表格列表数据
        this.listFun()

    }

    render() {
        const columns = [
            {
                title: '班级编号',
                dataIndex: 'classes_id',
                key: 'classes_id',
                className:'tableStyle'
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
                        <Button type="primary" onClick={()=>this.update('编辑班级信息',record)}>修改</Button>
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
                <Pagination showQuickJumper defaultCurrent={1} onChange={this.onChange} total={(Math.ceil(this.state.total / this.state.limit)) * 10} showSizeChanger={false} style={{ marginTop: '20px' }} />
                {/* 表单内容--end */}
                {/* 新增模态框 */}
                <Modal
                    title={this.state.modalTitle}
                    visible={this.state.add_visible}
                    onCancel={this.hideCancel}

                    footer={null}
                >
                    <Form
                        style={{marginLeft:'-12px'}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        onFinish={this.onAddFinish}
                        layout="horizontal"
                    >
                        <Form.Item label="班级编号" name="classes_id">
                            <Input disabled type="text"/>
                        </Form.Item>
                        <Form.Item label="班级名称" name="classes_name">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item label="班级类型" name="classes_typeName">
                            <Select
                                showSearch
                                onChange={this.TypeChange}
                                placeholder="请选择"
                            >
                                {
                                    this.state.classArr.length && this.state.classArr.map( (item) => (
                                        <Option key={item.classestype_id} value={item.classestype_id}>{item.classestype_name}</Option>)
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="班主任" name="classes_adminName">
                            <Select
                                showSearch
                                onChange={this.TeacherChange}
                                placeholder="请选择"
                                value={this.state.modal_classes_adminName}
                            >
                                {
                                    this.state.teacherArr.length && this.state.teacherArr.map( (item) => (
                                        <Option key={item.admin_id} value={item.admin_id}>{item.admin_name}</Option>)
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="班级介绍" name="classes_introduction">
                            <Input.TextArea type="text" value={this.state.modal_classes_introduction}/>
                        </Form.Item>
                        <Form.Item style={{margin:'20px 0 0 120px '}} >
                            <Button key="back" onClick={this.hideCancel} style={{marginLeft:"20px",marginRight:"20px"}}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit"  onClick={this.handleOk} style={{marginLeft:"20px",marginRight:"20px"}}>
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* 修改模态框 */}
                <Modal
                    title={this.state.modalTitle}
                    visible={this.state.visible}
                    onCancel={this.hideCancel}
                    footer={null}
                >
                    <Form
                        style={{marginLeft:'-12px'}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={this.onUpdateFinish}
                        initialValues={{
                            classes_id:this.state.modal_classes_id,
                            classes_name:this.state.modal_classes_name,
                            classes_typeName:this.state.modal_classestype_name,
                            classes_adminName:this.state.modal_classes_adminName,
                            classes_introduction:this.state.modal_classes_introduction
                        }}
                    >
                        <Form.Item label="班级编号" name="classes_id">
                            <Input disabled type="text"/>
                        </Form.Item>
                        <Form.Item label="班级名称" name="classes_name">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item label="班级类型" name="classes_typeName">
                            <Select
                                showSearch
                                onChange={this.TypeChange}
                                placeholder="请选择"
                            >
                                {
                                    this.state.classArr.length && this.state.classArr.map( (item) => (
                                        <Option key={item.classestype_id} value={item.classestype_id}>{item.classestype_name}</Option>)
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="班主任" name="classes_adminName">
                            <Select
                                showSearch
                                onChange={this.TeacherChange}
                                placeholder="请选择"
                                value={this.state.modal_classes_adminName}
                            >
                                {
                                    this.state.teacherArr.length && this.state.teacherArr.map( (item) => (
                                        <Option key={item.admin_id} value={item.admin_id}>{item.admin_name}</Option>)
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="班级介绍" name="classes_introduction">
                            <Input.TextArea type="text"/>
                        </Form.Item>
                        <Form.Item style={{margin:'20px 0 0 120px '}} >
                            <Button key="back" onClick={this.hideCancel} style={{marginLeft:"20px",marginRight:"20px"}}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit"  onClick={this.handleOk} style={{marginLeft:"20px",marginRight:"20px"}}>
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export {ClassModel as default}