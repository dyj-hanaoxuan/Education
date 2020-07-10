import React from 'react'
import {Button,Modal,Tree } from 'antd';
import Axios from "../../Axios";
import api from "../../Api";
const { TreeNode } = Tree;

class Add extends React.Component {
    onSelect = (selectedKeys, info) => {
        // console.log('selected', selectedKeys, info);
        this.state={
            select:selectedKeys
        }
    };

    onCheck = (checkedKeys, info) => {
        let checkedKey = checkedKeys.concat(info.halfCheckedKeys)
        this.setState({
            checkedKeys: checkedKeys, // 不包括父元素
            checkedKey: checkedKey  // 包括父元素
        });
        // console.log('onCheck', checkedKeys);
    };
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            visible: false,
            list:[],
            loading:false,
            expandedKeys: [],
            autoExpandParent: true,
        }
    }
    handleOk = (id) => {
        console.log(id)
        let old = this.state.checkedKeys.map(Number)
        Axios({
            url:api.Nav.updata,
            method:'post',
            timeout: 20000,
            data:{
                role_id:id,
                oldPower:old
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>{
            console.log(res)
            this.setState({
                loading:false,
                visible:false,
            })
        })
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    getCheckedKeys = (data) =>{
    let arr =[];
    for (let i =0;i<data.length;i++){
        if (data[i].value){
            arr.push(data[i].key)
        }
        if (data[i].children){
            let res = this.getCheckedKeys(data[i].children)
            arr = [...arr,...res]
        }
    }
    return arr;
}
// 获取需要展开的节点
    renderTreeNodes =list => list.map(item =>{
            if (item.powerList){
                return (
                    <TreeNode title={item.power_name} key={item.power_id}>
                        {this.renderTreeNodes(item.powerList)}
                    </TreeNode>
                )
            }else {
                return <TreeNode titke={item.power_name} key={item.power_id}/>
            }
        })

    showModal = (id)=>{
        Axios({
                url:api.Nav.AllPower,
                method:'get',
                timeout: 20000,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res =>{
                this.state.list=res.data.data
                this.setState({
                    list:this.state.list,
                    visible: true,
                })
                console.log(res.data.data)

            }).catch(err =>{
                console.log(err)
            })
    }


    render() {
        return (
            <div>
                <Button type="primary"  onClick={()=>{ this.showModal(this.props.id)}}>
                    修改
                </Button>
                <Modal
                    title="修改权限"
                    visible={this.state.visible}
                    onOk={()=>this.handleOk(this.props.id)}
                    onCancel={this.handleCancel}
                >
                    <Tree
                        checkable
                        defaultExpandedKeys={[1]}
                        defaultCheckedKeys={[2,3]}
                        selectable={true}
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                    >
                        {this.renderTreeNodes(this.state.list)}
                    </Tree>
                </Modal>
            </div>
        )
    }
}

export {Add as default}