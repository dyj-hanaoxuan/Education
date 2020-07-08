import {observable,action} from "mobx";
import React, {Component} from "react";
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
                url: api.Nav.Navbar,
                data: {
                    userName: 'xxx',
                    userPwd: 123
                },
                timeout: 20000,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                this.user = res.data.data;
                this.token = res.data.token
                resolve(res)
            }).catch(err =>{
                reject(err)
            })
        }).then((data)=>{
            console.log(data)
        })
    }


}
export default user