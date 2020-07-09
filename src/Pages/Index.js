import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import LeftMenu from '../Components/Home/LeftMenu'
import head from '../Common/images/head.png'
import Router from '../Router/Router'
import {inject,observer} from 'mobx-react'
const { Header, Content, Sider } = Layout;
@inject('usersLogin')
@observer
class Index extends React.Component {
    componentDidMount() {
        // console.log(this.props.usersLogin.user)
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="nav">
                            <h1>logo</h1>
                            <div>
                                <img src={head}/>
                                <span>管理员</span>
                            </div>
                            <div>admin</div>
                            <div>注销</div>
                        </div>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                            <Sider className="site-layout-background" width={200}>
                                <LeftMenu/>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Router/>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </div>
            // <ClassModel/>
        )
    }
}

export {Index as default}