
import { rq } from "common/request";

var api = {
	 // //我的-我的图文咨询分页
	 // mineChatList:(data)=>{return rq("/wx/interpret/consult/findMyPage",data,"GET");},
	 // //保存报告寄出信息
	 // savePost:(data)=>{return rq("/wx/interpret/mri/savePost",data,"POST");},
	
	//保存当前用户的身份认证
	saveAuthentication:(data)=>{return rq("/wx/doctor/authentication/saveAuthentication",data,"POST");},
}

export {api};