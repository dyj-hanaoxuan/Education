import React, { Component } from 'react'
import { Row, Col,Form, Select,Radio,Input,Upload, message,Button } from 'antd';
import { LoadingOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';
import '../../Common/css/AddCourse.css'
const { Option } = Select;
//新增必修课程组件
// 上传图片
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
// 新增必修课程
class AddCourse extends Component {
    onFinish = values => {
        console.log(values);
      };
    //   下拉框
      onGenderChange = value => {
        this.formRef.current.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
      };
      state = {
    loading: false,
  };
    //   文件上传
    handleChange = info => {
        if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
            imageUrl,
            loading: false,
            }),
        );
        }
    };
    render() {
        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const { imageUrl } = this.state;
        return (
            <div>
                <Row justify="center">
                    <Col span={24}>
                        <div>
                            <div className='addCourseDiv'>新增必修课程</div>
                            <Form labelAlign="right"
                            labelCol={{
                            span: 3,
                            pull:1,
                            offset:3
                            }}
                            wrapperCol={{
                            span: 10,
                            }} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                                <Form.Item name="gender" label="所属科目">
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
                                <Form.Item
                                    name="name"
                                    label="课程名称"
                                    >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="radio-group" label="等级">
                                    <Radio.Group>
                                    <Radio value="a">初级</Radio>
                                    <Radio value="b">中级</Radio>
                                    <Radio value="c">高级</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={['user', 'upload']} label="课程封面">
                                    <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                              </Form.Item>
                              <Form.Item name={['user', 'uploadVideo']} label="课程视频">
                                <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
                                    <Button>
                                        <UploadOutlined /> 上传文件夹
                                    </Button>
                                </Upload>
                              </Form.Item>
                              <Form.Item name={['user', 'introduction']} label="课程简介">
                                    <Input.TextArea rows='4'/>
                              </Form.Item>
                              <Form.Item name={['user', 'btnAdd']} style={{textAlign:"center"}} 
                              wrapperCol={{
                                span: 24,
                                }}>
                                <Button type="primary" htmlType="submit" id="btnSave">
                                保存
                                </Button>
                                <Button type="primary" htmlType="reset" id="cancel">
                                取消
                                </Button>
                              </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default AddCourse
