import {observable,action} from "mobx";
import React, {Component} from "react";
import { message } from 'antd';
import api from '../Api/index'
import axios from '../Axios'
class user extends Component{
    @observable user = sessionStorage.getItem('user')?
        JSON.parse(sessionStorage.getItem('user')):'';
    @observable isLogin = false;
    @observable token = sessionStorage.getItem('token')?
        JSON.parse(sessionStorage.getItem('token')):'';
    @action
    SetUser=()=>{
        sessionStorage.setItem('user',JSON.stringify(this.user));
    }
    @action
    SetToken=()=>{
        sessionStorage.setItem('token',JSON.stringify(this.token));
    }
    @action
    login=()=>{

        return new Promise((resolve,reject)=> {
            axios({
                method: 'post',
                url: api.Nav.login,
                data: {
                    admin_phone:this.username.username,
                    admin_pwd: this.username.password
                },
                timeout: 20000,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.data.code ===200){
                    console.log(res.data)
                    this.user = res.data.data;
                    // this.token = res.data.token
                    message.success('登录成功')
                    resolve(res)
                }else {
                    message.warning('用户名或密码错误')
                }

            }).catch(err =>{
                reject(err)
            })
        }).then((data)=>{
            console.log(data)
        })
    }


}
export default user