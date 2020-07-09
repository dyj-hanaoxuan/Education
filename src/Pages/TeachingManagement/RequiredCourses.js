import React from 'react'

class RequiredCourses extends React.Component {
<<<<<<< HEAD
   
   
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
                current: 1,  // 当前页
                total: 15 ,  
              
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
    // 分页
    onChange = page => {
      console.log(page);
      this.setState({
        current: page,
      });
    };
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

=======
>>>>>>> 223b31e92dfdfec9616fd59bc3564dec75db5f35
    render() {
        return (
            <div>
<<<<<<< HEAD
                {/* RequiredCourses */}
                {/* 必修课程管理 */}
                {/* 顶部查询模块--start */}
                <Row>
                    <Col span={8}>
                    <Form
                    labelAlign="left"
                    labelCol={{
                    span: 4,
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
                    span: 4,
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
                    <Col span={8}>
                    <Button 
                    type="primary" 
                    onClick={this.search.bind(this)}
                    icon={<SearchOutlined />}>
                        查询
                    </Button>
                    </Col>
                </Row>
                {/* 顶部查询模块--end */}
                {/* 表单内容--start */}
                <Table 
                columns={columns} 
                dataSource={this.state.data} 
                pagination={ false  }/>
                  <Pagination
                   current={this.state.current}
                   onChange={this.onChange} 
                   total={this.state.total}
                  ></Pagination>
                {/* 表单内容--end */}
=======
                RequiredCourses
                必修课程管理
>>>>>>> 223b31e92dfdfec9616fd59bc3564dec75db5f35
            </div>
        )
    }
}

export {RequiredCourses as default}