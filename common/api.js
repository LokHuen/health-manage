
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
    //完善医生信息
	saveDoctorInfo:(data)=>{return rq("/wx/doctor/saveRegister",data,"POST");},
	//新增当前患者病例
	savePatientCase:(data)=>{return rq("/wx/patient/bl/saveBl",data,"POST");},
	//当前用户的病历
	patientCaseList:(data)=>{return rq("/wx/patient/bl/blList",data,"GET");},
	//获取医生名片
	doctorBusinessCard:(data)=>{return rq("/wx/doctor/cardInfo",data,"GET");},
	//病患的基础信息
	patientBasicInfo:(data)=>{return rq("/wx/patient/basicInfo",data,"GET");},
}

export {api};