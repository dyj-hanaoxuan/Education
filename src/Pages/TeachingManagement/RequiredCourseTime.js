import React from 'react'
import {Row, Col, Select, Form, Input, Button,  Table, Tag, Space, Modal, Switch, Pagination   } from 'antd'
import { SearchOutlined, ExclamationCircleOutlined, CloseOutlined, CheckOutlined   } from '@ant-design/icons';
const { Option } = Select
const { confirm } = Modal;
 
  

class RequiredCourseTime extends React.Component {
   
   
     constructor(props){
            super(props);
            this.state= {
             data :[
                {
                  key: '1',
                  name: 'John Brown',
                  age: 32,
                  address: 'New York No. 1 Lake Park',
                  status: 0,
                },
                {
                  key: '2',
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 1 Lake Park',
                  status: 1,
                },
                {
                  key: '3',
                  name: 'Joe Black',
                  age: 32,
                  address: 'Sidney No. 1 Lake Park',
                  status: 0,
                },
              ],
            //搜索栏值
                val1:'',
                val2:'',
                val3:'',
                input:'',
            //搜索栏结束   
              
        }
    }
    // 下拉框改变事件
    handleChange(value){
        console.log(value);
        this.setState({val1:value})
      }
    kemuChange(value){
        console.log(value);
        this.setState({val2:value})
    }  
    stateChange(value){
        console.log(value);
        this.setState({val3:value})
    }
    //下拉框结束
    //点击搜索事件
    search(){
        console.log(this.state.val1);  //下拉框
        console.log(this.state.val2);  //下拉
        console.log(this.state.val3);   //下拉
        console.log(this.refs.input.state.value);  // 输入框
    }
    add(){
        console.log("新增")
        this.props.history.push('/Index/AddCourse')
    }
    //删除事件
    dele(text, record, index) {
        confirm({
          title: '请注意',
          icon: <ExclamationCircleOutlined />,
          content: '此操作将删除该条数据！！！',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              console.log(111);
              console.log("1",index);  
              console.log("2",record);  
              console.log("3",text);  
              
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
      }
    //修改状态
    changestatus=(status)=>{
        console.log(status);

    }
      // 组件挂载前（生命周期）
    componentWillMount() {
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
        fetch(`api/classes/selectAllClassesType`,{
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
        }).then( (json) =>{
            console.log(json)
            this.setState({
                list:json
            })
        }).catch(function (err) {
            console.log(err)
        })
    }

    render() {
        const columns = [
            {
              title: '序号',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: '课程名称',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: '所属科目',
              dataIndex: 'address',
              key: 'address',
            },
            {
                title: '等级',
                dataIndex: 'up',
                key: 'up',
              },
              {
                title: '上架状态',
                key: 'tag',
                render: (text, record) => (
                  <Space size="middle">
                    {/* <a>Invite {record.name}</a>
                    <a>Delete</a> */}
                    <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={record.status}
                    onClick={this.changestatus}
                    />
                  </Space>
                ),
              },
            {
              title: '操作',
              key: 'action',
              render: (text, record, index) => (
                <Space size="middle">
                  {/* <a>Invite {record.name}</a>
                  <a>Delete</a> */}
                  <Button type="primary">修改</Button>
                  <Button type="primary" onClick={()=>this.dele(text, record, index)} danger>删除</Button>
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
                    <Form.Item label="所属科目">
                        <Select defaultValue="all" onChange={this.handleChange.bind(this)}>
                            <Option value="all">全部</Option>
                            <Option value="math">数学</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled"> Disable</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
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
                    <Form.Item label="所属科目">
                        <Select defaultValue="all" onChange={this.kemuChange.bind(this)}>
                            <Option value="all">全部</Option>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled"> Disable</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
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
                        <Form.Item label="课程名称">
                            <Input ref="input"/>
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
                    <Form.Item label="状态">
                        <Select defaultValue="all"  onChange={this.stateChange.bind(this)}>
                            <Option value="all">全部</Option>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled"> Disable</Option>
                            <Option value="Yiminghe">yiminghe</Option>
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
                dataSource={this.state.data} 
                pagination={ false }/>
                  
                {/* 表单内容--end */}
            </div>
        )
    }
}

export {RequiredCourseTime as default}