
export default {
    //登录
    "pwd" : "/personal/changePassword",//修改密码
    "emil":"user/sendMsg",//发送短信
    "login":'/user/adminLogin',//pc登录
    "AllPower":"/user/selectAllPower",//查询所有权限
    "rolelist":"user/roleList",//角色id查询
    "updata":"user/updatePower",//修改权限
    "FindPwd":"user/findPwd",//找回密码
    //角色模块
    "add" :"user/insertRole",//新增
    "edit":"user/updateRole",//修改
    "del":"user/deleteRole",//删除
    //审核
    "SH_jb":"/zh-server/selectretype",//查询举报接口
    "SH_ok":"/zh-server/selectfinishReportview",//查询所有审核完成接口
    "SH_dt":"/zh-server/selectfinishReportviewbyid",//查询单条完成审核完成详情
    "SH_or":"/zh-server/passUntreatedReportview",//待处理审核查询是否通过
    "SH_cx":"/zh-server/selectUntreatedReportview",//待处理事项审核查询
    "SH_content":"/zh-server/selectUntreatedReportviewbyid",//待处理审核查询具体内容
    "SH_kc":"/zh-server/selectcourse",//课程审核查询
    "SH_kc_dt_ro":"/zh-server/passselectcoursebyid",//课程审核单条是否通过
    "SH_kc_dt":"/zh-server/selectcoursebyid",//课程审核单条查询
    "KC_fl":"/zh-server/selectcourserecord",//分类查询
    "KC_cx":"/zh-server/selecttype",//课程类型查询


}

