import React from 'react'
import { Layout,PageHeader } from 'antd';
import LeftMenu from '../Components/Home/LeftMenu'
import head from '../Common/images/head.png'
import Router from '../Router/Router'

import {inject,observer} from 'mobx-react'
const { Header, Content, Sider } = Layout;
const routes = [
    {
        path: 'Index/Home',
        breadcrumbName: '首页',
    },
    {
        path: 'first',
        breadcrumbName: '个人中心',
    },
    {
        path: 'Index/Accounts',
        breadcrumbName: '账户管理',
    },
    {
        path: 'Index/Module',
        breadcrumbName: '模块管理',
    },
    {
        path: 'Index/Role',
        breadcrumbName: '角色管理',
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
            // <ClassModel/>
        )
    }
}

export {Index as default}