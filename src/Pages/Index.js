import React from 'react'
import { Layout,PageHeader } from 'antd';
import LeftMenu from '../Components/Home/LeftMenu'
import head from '../Common/images/head.png'
import Router from '../Router/Router'
import Logo from '../Common/images/logo_two.png'
import {inject,observer} from 'mobx-react'
const { Header, Content, Sider } = Layout;
const routes = [
    {
        path: 'Index/Home',
        breadcrumbName: '首页',
    },
    {
        path: 'Index/Role',
        breadcrumbName: '个人中心',
    },
];
@inject('usersLogin')
@observer
class Index extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="nav">
                            <h1><img id='logo' src={Logo}/></h1>
                            <div>
                                <img src={head}/>
                                <span>管理员</span>
                            </div>
                            <div>admin</div>
                            <div>注销</div>
                        </div>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <PageHeader
                            className="site-page-header"
                            title="后台管理"
                            breadcrumb={{ routes }}
                            subTitle="welcome me!"
                        />
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
        )
    }
}

export {Index as default}