import React, { Component } from 'react'
import { Row, Col,Form, Select } from 'antd';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 6,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 6,
  },
};
// 新增课程
export default class AddCourse extends Component {
    onFinish = values => {
        console.log(values);
      };
      onGenderChange = value => {
        this.formRef.current.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
      };
    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <div>
                            <div>新增课程</div>
                            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                                <Form.Item name="gender" label="所属科目" rules={[{ required: true }]}>
                                    <Select
                                        placeholder="Select a option and change input text above"
                                        onChange={this.onGenderChange}
                                        allowClear
                                    >
                                        <Option value="male">male</Option>
                                        <Option value="female">female</Option>
                                        <Option value="other">other</Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
