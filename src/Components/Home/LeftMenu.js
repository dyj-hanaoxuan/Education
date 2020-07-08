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
        let menuList = this.bingMenu(this.props.usersLogin.user.menuInfo)
        this.setState({
            leftMenu:menuList
        })
    }
    componentDidMount() {
        window.addEventListener('beforeunload',()=>{
            this.props.usersLogin.SetUser()
            this.props.usersLogin.SetUser()
        })
    }
    bingMenu(menuList){
        let MenuList = menuList.map((item)=>{
            if(item.menuChilds.length===0){  //没有子菜单
                let IconMenu =antIcons[item.menuImgClass]
                return <Menu.Item key={item.menuId}  icon={  <IconMenu />}>
                    <NavLink to={item.menuUrl}>{item.menuName}</NavLink>
                </Menu.Item>
            }else {
                let IconMenu =antIcons[item.menuImgClass];
                return <SubMenu key={item.menuId} title={item.menuName}  icon={  <IconMenu />}>
                    {this.bingMenu(item.menuChilds)}
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