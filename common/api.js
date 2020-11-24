
import { rq } from "common/request";

var api = {
	 // //我的-我的图文咨询分页
	 // mineChatList:(data)=>{return rq("/wx/interpret/consult/findMyPage",data,"GET");},
	 // //保存报告寄出信息
	 // savePost:(data)=>{return rq("/wx/interpret/mri/savePost",data,"POST");},
	
	//保存当前用户的身份认证
	saveAuthentication:(data)=>{return rq("/wx/doctor/authentication/saveAuthentication",data,"POST");},
	//银行--省市地区列表
	findProvinces:(data)=>{return rq("/wx/system/bank/region/list",data,"GET");},
	//获取总行名称、编码
	banklist:(data)=>{return rq("/wx/system/bank/list",data,"GET");},
	//获取短信
	getCode:(data)=>{return rq("/wx/doctor/loginSms",data,"POST");},
	//获取分行 列表
	subBranchList:(data)=>{return rq("/wx/system/bank/getSubBranchList",data,"POST");},

}

export {api};