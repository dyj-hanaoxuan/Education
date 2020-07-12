import React from 'react'
import {Drawer, Col, Row, Button, Tag} from 'antd';
import Axios from "../../Axios";
import api from "../../Api";
class Finni extends React.Component {
    constructor(){
        super()
        this.state={
            visible:false,
            list:[]
        }
    }

    showDrawer = (id)=>{
        console.log(id)
        this.setState({
            visible: true,
        });
        Axios({
            url: api.Nav.SH_dt,
            method: 'post',
            data: {
                reportreview_id: id
            },
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log(res)
            let list = res.data.data
            this.setState({
                list:list
            })
        }).catch(err => {
            console.log(err)
        })
    };

    onClose = () =>{
        this.setState({
            visible: false
        });
    };

    render() {
        const DescriptionItem = ({ title, content }) => (
            <div className="site-description-item-profile-wrapper">
                <p className="site-description-item-profile-p-label">{title}:</p>
                {content}
            </div>
        );
        let list = this.state.list
        let color = list.course_detection===2?'green':'red'
        let colors = list.course_state===1?'green':'red'
        if(list.course_state === 1){
            colors = "green"
        }else{
            colors = "red"
        }
        let colorss = list.report_state===1?'green':'red'
        if(list.report_state === 1){
            colorss = "green"
        }else{
            colorss = "red"
        }
        if(list.course_detection === 0){
            color = "red"
        }else if(list.course_detection===1) {
            color = "green"
        }else {
            color ='red'
        }
        if(list.course_detection ===0){
            list.course_detection="未审核"
            color = "red"
        }else if (list.course_detection === 1){
            list.course_detection='审核不通过'
            color = "red"
        }else {
            color = "green"
            list.course_detection="审核通过"
        }
        if(list.report_state ===1){
            list.report_state="已处理"
        }else if (list.report_state === 22){
            list.report_state='未处理'
        }else {
            list.report_state="驳回"
        }
        return (
            <div>
                <Button type="primary" onClick={()=>this.showDrawer(this.props.id)}>
                    查看
                </Button>
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div className='ct'>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem title="详细信息" content="如下：" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                用户名{list.adminname}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                章节id：{list.chapter_id}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                章节信息：{list.chapter_info}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                章节名：{list.chapter_name}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                课程id：{list.course_id}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                审核状态：<Tag color={color}>
                                            {list.course_detection}
                                        </Tag>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                课程名：{list.course_name}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                课程状态：<Tag color={colors}>
                                            {list.course_state===1?'上架中':'下架'}
                                         </Tag>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={30}>
                                举报id：{list.report_id}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                举报信息：{list.report_info}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                举报状态：
                                <Tag color={colorss}>
                                    {list.report_state}
                                </Tag>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                举报类型：
                                {list.retype_name}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                学生班级id：{list.student_classesID}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                学生姓名：{list.student_name}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                身份证号：{list.student_idCard}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                学生生日：{list.student_birth}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                举报时间：{list.student_date}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                学生电话：{list.student_phone}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                学生密码：{list.student_pwd}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                学生性别：{list.student_sex}
                            </Col>
                        </Row>
                    </div>

                </Drawer>

            </div>
        );
    }
}

export {Finni as default}