
import { rq } from "common/request";

var api = {
	 // //我的-我的图文咨询分页
	 // mineChatList:(data)=>{return rq("/wx/interpret/consult/findMyPage",data,"GET");},
	 // //保存报告寄出信息
	 // savePost:(data)=>{return rq("/wx/interpret/mri/savePost",data,"POST");},
	
	// 自测
	getQuestionSecondList:(data)=>{return rq("/wx/survey/question/secondList",data,"GET");},
	replySecond:(data)=>{return rq("/wx/survey/question/replySecond",JSON.stringify(data),"POST");},
	getPreQuestionPage:(data)=>{return rq("/wx/survey/question/prePage",data,"GET");},
	questiongetScore:(data)=>{return rq("/wx/survey/question/getScore",data,"GET");},//测试完成页，获取分数和结果
	//自测
	//获取认证详情
	authentication:(data)=>{return rq("/wx/doctor/authentication/get",data,"GET");},
	//保存当前用户的身份认证
	saveAuthentication:(data)=>{return rq("/wx/doctor/authentication/save",data,"POST");},
	//银行--省市地区列表
	findProvinces:(data)=>{return rq("/wx/system/bank/region/list",data,"GET");},
	//获取总行名称、编码
	banklist:(data)=>{return rq("/wx/system/bank/list",data,"GET");},
	//获取短信
	getCode:(data)=>{return rq("/wx/doctor/loginSms",data,"POST");},
	//获取分行 列表
	subBranchList:(data)=>{return rq("/wx/system/bank/getSubBranchList",data,"POST");},
	//治疗阶段选择
	getReplyRecord:(data)=>{return rq("/wx/survey/question/getReplyRecord",data,"GET");},
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
	//获取患者的所有测评记录,医生端也可复用此方法  surveyId固定传1
	memberReplyRecordList:(data)=>{return rq("/wx/survey/question/getMemberReplyRecordPage",data,"GET");},
	//患者营养主页
	patientNutrition:(data)=>{return rq("/wx/patient/patientNutrition",data,"GET");},
	//患者营养主页获取最近一次测评记录，医生端的患者详情页也可复用此方法
	patientNearlyRecord:(data)=>{return rq("/wx/survey/question/getMemberReplyDetail",data,"GET");},
	//完善病患信息
	savePatientInfo:(data)=>{return rq("/wx/patient/savePatient",data,"POST");},
	//账户首页的金额
	doctorAccountInfo:(data)=>{return rq("/wx/doctor/accountInfo",data,"GET");},
	//营养主页——医生头部信息
	doctorInfo:(data)=>{return rq("/wx/doctor/doctorInfo",data,"GET");},
	//待转账到银行卡
	doctorWaitDivide:(data)=>{return rq("/wx/doctor/waitDivide",data,"GET");},
	//已转账到银行卡
	doctorGetDivide:(data)=>{return rq("/wx/doctor/getDividePage",data,"GET");},
	//转账记录详情
	divideRecord:(data)=>{return rq("/wx/doctor/getDivideRecord",data,"GET");},
	//营养主页——病患列表
	patientListInfo:(data)=>{return rq("/wx/doctor/patientInfo",data,"GET");},
}

export {api};