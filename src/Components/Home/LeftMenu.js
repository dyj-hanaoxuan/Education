import React from 'react'
import {Menu} from "antd";
import { inject,observer} from "mobx-react";
import {NavLink} from 'react-router-dom'
import * as antIcons from '@ant-design/icons';
const { SubMenu } = Menu;
@inject('usersLogin')
@observer
class LeftMenu extends React.Component {
    constructor(){
        super()
        this.state = {
            leftMenu:[],
        }
    }
    componentWillMount() {
        let menuList = this.bingMenu(this.props.usersLogin.user.powerOrmList)
        this.setState({
            leftMenu:menuList
        })
    }
    componentDidMount() {
        window.addEventListener('beforeunload',()=>{
            this.props.usersLogin.SetUser()
            this.props.usersLogin.SetToken()
        })
    }
    bingMenu(menuList){
        let MenuList = menuList.map((item)=>{
            if(item.powerList.length === 0){  //没有子菜单
                let IconMenu =antIcons[item.menuImgClass]
                return <Menu.Item key={item.power_id}  icon={  <IconMenu />}>
                    <NavLink to={item.menUrl}>{item.power_name}</NavLink>
                </Menu.Item>
            }
            else {
                let IconMenu =antIcons[item.menuImgClass];
                return <SubMenu key={item.power_id} title={item.power_name}  icon={  <IconMenu />}>
                    {this.bingMenu(item.powerList)}
                </SubMenu>
            }
        })
        return MenuList
    }

    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['1']}
                style={{ height: '100%' }}
            >
                {this.state.leftMenu}
            </Menu>
        )
    }
}

export {LeftMenu as default}