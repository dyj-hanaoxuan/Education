import React from 'react'
import {Route} from 'react-router-dom'
import {inject,observer} from "mobx-react";
import loadable from '@loadable/component'
import AddCourse from '../Components/Add/AddCourse';


@inject('usersLogin')
@observer
class Router extends React.Component {
    constructor(){
        super()
        this.state = {
            routerList:[]
        }
    }

    bindRouter(list){
        let routerList= list.map((item)=>{
            if(item.powerList.length===0){
                return  <Route key={item.power_id} path={item.menUrl} component={ loadable(() => import(`./../Pages/${item.componentPath}`))}/>
            }else{

                // return  <Route key={item.menuId} path={item.menuUrl} render={() =>{
                //     let ComponentName =loadable(() => import(`./../Pages/${item.componentPath}`));
                //     return <ComponentName {...this.props}>
                //         {this.bindRouter(item.menuChilds)}
                //     </ComponentName>
                // }}>
                // </Route>

                return [...this.bindRouter(item.powerList),<Route key={item.power_id} path={item.menUrl} component={ loadable(() => import(`./${item.componentPath}`))}/>]
            }
        })
        return routerList;
    }

    componentDidMount() {
        let menuList = this.bindRouter(this.props.usersLogin.user.powerOrmList)
        this.setState({
            routerList:menuList
        })
    }

    render() {
        return (
            <div>
                {this.state.routerList}
                <Route path='/Index/AddCourse'><AddCourse/></Route>
            </div>
        )
    }
}

export {Router as default}