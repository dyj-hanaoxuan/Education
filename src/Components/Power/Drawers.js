import React from 'react';
import { Drawer, Col, Row,Button } from 'antd';
import Axios from "../../Axios";
import api from "../../Api";
import {inject,observer} from 'mobx-react'

@inject('usersLogin')
@observer

class Drawers extends React.Component {
    constructor(){
        super()
        this.state={
            visible:false,
            list:[]
        }
    }

    showDrawer = (id)=>{
        this.setState({
            visible: true,
        });
        Axios({
            url: api.Nav.SH_kc_dt,
            method: 'post',
            data: {
                course_id: id
            },
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log(res)
            this.setState({
                list:res.data.data
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
        if(list.course_detection ===0){
            list.course_detection="未审核"
        }else if (list.course_detection === 1){
            list.course_detection='审核不通过'
        }else {
            list.course_detection="审核通过"
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
                                    <DescriptionItem title="用户信息" content="如下：" />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={30}>
                                    用户id：{list.admin_id}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={30}>
                                    用户名：{list.admin_name}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={30}>
                                    性别：{list.admin_sex}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={30}>
                                    创建时间：{list.admin_data}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={30}>
                                    卡号：{list.admin_idCard}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={30}>
                                    电话：{list.admin_phone}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    密码：{list.admin_pwd}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    生日：{list.admin_birth}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    课程名称：{list.course_name}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    课程价格：{list.course_price}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    课程状态：{list.course_state===1?"上架":"下架"}
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    审核状态：{list.course_detection}
                                </Col>
                            </Row>
                        </div>

                    </Drawer>

                </div>
            );
        }
}

export {Drawers as default}