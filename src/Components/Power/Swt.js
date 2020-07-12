import React from 'react'
import { Switch } from 'antd';
import Axios from "../../Axios";
import api from '../../Api/index'
import moment from 'moment'
class Swt extends React.Component {
    constructor(){
        super()
        this.state={
            check:[]
        }
    }
    onChange=(id,checked)=> {
        console.log(id,checked);
        if (checked===true){
            checked=1
        }else {
            checked=2
        }
        this.setState({
            check:checked
        })
        console.log(checked)

        Axios({
            url:api.Nav.SH_or,
            method:'post',
            data:{
                report_id:id,
                reportreview_state:checked,
                reportreview_date:moment().format('YYYY-MM-DD')
            },
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            this.state.arr = res.data.data
            this.setState({
                loading:false,
                arr:this.state.arr,
            })
            // window.location.reload()
        }).catch(err =>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Switch checkedChildren="通过" unCheckedChildren="未审核" onChange={(checked)=>this.onChange(this.props.id,checked)}/>
            </div>
        )
    }
}

export {Swt as default}