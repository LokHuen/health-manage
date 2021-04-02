import {
	rq
} from "common/request";

var api = {
	// //我的-我的图文咨询分页
	// mineChatList:(data)=>{return rq("/wx/interpret/consult/findMyPage",data,"GET");},
	// //保存报告寄出信息
	// savePost:(data)=>{return rq("/wx/interpret/mri/savePost",data,"POST");},
	getSgaType: (data) => {
		return rq("/wx/survey/question/getSgaType", data, "GET");
	}, //sga类型判断

	// 自测
	getQuestionSecondList: (data) => {
		return rq("/wx/survey/question/secondList", data, "GET");
	},
	replySecond: (data) => {
		return rq("/wx/survey/question/replySecond", JSON.stringify(data), "POST");
	},
	getPreQuestionPage: (data) => {
		return rq("/wx/survey/question/prePage", data, "GET");
	},
	questiongetScore: (data) => {
		return rq("/wx/survey/question/getScore", data, "GET");
	}, //测试完成页，获取分数和结果
	//自测
	//获取认证详情
	authentication: (data) => {
		return rq("/wx/doctor/authentication/get", data, "GET");
	},
	//保存当前用户的身份认证
	saveAuthentication: (data) => {
		return rq("/wx/doctor/authentication/save", data, "POST");
	},
	//银行--省市地区列表
	findProvinces: (data) => {
		return rq("/wx/system/bank/region/list", data, "GET");
	},
	//获取总行名称、编码
	banklist: (data) => {
		return rq("/wx/system/bank/list", data, "GET");
	},
	//获取短信
	getCode: (data) => {
		return rq("/wx/doctor/loginSms", data, "POST");
	},
	//获取分行 列表
	subBranchList: (data) => {
		return rq("/wx/system/bank/getSubBranchList", data, "POST");
	},
	//治疗阶段选择
	getReplyRecord: (data) => {
		return rq("/wx/survey/question/getReplyRecord", data, "GET");
	},
	//完善医生信息
	saveDoctorInfo: (data) => {
		return rq("/wx/doctor/saveRegister", data, "POST");
	},
	//新增当前患者病例
	savePatientCase: (data) => {
		return rq("/wx/patient/bl/saveBl", data, "POST");
	},
	//当前用户的病历
	patientCaseList: (data) => {
		return rq("/wx/patient/bl/blList", data, "GET");
	},
	//获取医生名片
	doctorBusinessCard: (data) => {
		return rq("/wx/doctor/cardInfo", data, "GET");
	},
	//病患的基础信息
	patientBasicInfo: (data) => {
		return rq("/wx/patient/basicInfo", data, "GET");
	},
	//获取患者的所有测评记录,医生端也可复用此方法  surveyId固定传1
	memberReplyRecordList: (data) => {
		return rq("/wx/survey/question/getMemberReplyRecordPage", data, "GET");
	},
	//患者营养主页
	patientNutrition: (data) => {
		return rq("/wx/patient/patientNutrition", data, "GET");
	},
	//患者营养主页获取最近一次测评记录，医生端的患者详情页也可复用此方法
	patientNearlyRecord: (data) => {
		return rq("/wx/survey/question/getMemberReplyDetail", data, "GET");
	},
	//完善病患信息
	savePatientInfo: (data) => {
		return rq("/wx/patient/savePatient", data, "POST");
	},
	//账户首页的金额
	doctorAccountInfo: (data) => {
		return rq("/wx/doctor/accountInfo", data, "GET");
	},
	doctor_settleInfo: (data) => {
		return rq("/wx/doctor/settleInfo", data, "GET");
	}, //账户已结算的金额
	//营养主页——医生头部信息
	doctorInfo: (data) => {
		return rq("/wx/doctor/doctorInfo", data, "GET");
	},
	//待转账到银行卡
	doctorWaitDivide: (data) => {
		return rq("/wx/doctor/waitDivide", data, "GET");
	},
	//已转账到银行卡
	doctorGetDivide: (data) => {
		return rq("/wx/doctor/getDividePage", data, "GET");
	},
	//转账记录详情
	divideRecord: (data) => {
		return rq("/wx/doctor/getDivideRecord", data, "GET");
	},
	//营养主页——病患列表
	patientListInfo: (data) => {
		return rq("/wx/doctor/patientInfo", data, "GET");
	},
	//患者详情
	patientDetailInfo: (data) => {
		return rq("/wx/patient/doctorPatient", data, "GET");
	},
	//医生端--患者详情--病例列表
	doctorBlList: (data) => {
		return rq("/wx/doctor/blList", data, "GET");
	},
	//判断用户身份，医生还是患者
	judgeUserAuth: (data) => {
		return rq("/wx/user/userAuth", data, "GET");
	},
	//根据患者id查询TA的营养主页
	doctorPatientx: (data) => {
		return rq("/wx/patient/doctorPatientx", data, "GET");
	},
	//根据病患id查询的病历
	patientBlListx: (data) => {
		return rq("/wx/patient/bl/blListx", data, "GET");
	},
	//医生请求患者基础信息
	basicInfox: (data) => {
		return rq("/wx/patient/basicInfox", data, "GET");
	},
	//保存病患医嘱
	saveAdvice: (data) => {
		return rq("/wx/patient/advice/save", data, "POST");
	},
	//病患医嘱分页列表
	adviceListRequest: (data) => {
		return rq("/wx/patient/advice/findPage", data, "GET");
	},
	//营养首页——演示数据（主页2）
	doctorShowInfo: (data) => {
		return rq("/wx/doctor/showInfo", data, "GET");
	},
	//关闭演示数据
	closeShowData: (data) => {
		return rq("/wx/doctor/closeShowData", data, "POST");
	},
	statTemplate: (data) => {
		return rq("/wx/diet/record/statTemplate", data, "GET");
	}, //7天30天摄入和运动能量图表


	//业务员
	//salesuserlist:(data)=>{return rq("/wx/salesman/bindUserList",data,"GET");}, //绑定的用户

	salesuserlist: (data) => {
		return rq("/wx/salesman/getBindDoctor", data, "GET");
	}, //绑定的用户
	salesregister: (data) => {
		return rq("/wx/salesman/login", data, "POST");
	}, //登录
	//保存当前用户的身份认证
	sale_saveAuthentication: (data) => {
		return rq("/wx/sales/auth/save", data, "POST");
	},
	//获取认证详情
	sale_authentication: (data) => {
		return rq("/wx/sales/auth/get", data, "GET");
	},
	//获取医生名片
	sale_doctorBusinessCard: (data) => {
		return rq("/wx/salesman/getQRCode", data, "GET");
	},
	saleshomepage: (data) => {
		return rq("/wx/salesman/homepage", data, "GET");
	}, //首页数据
	//账户首页的金额
	sale_doctorAccountInfo: (data) => {
		return rq("/wx/salesman/accountInfo", data, "GET");
	},
	//待转账到银行卡
	sale_doctorWaitDivide: (data) => {
		return rq("/wx/salesman/waitDivide", data, "GET");
	},
	//已转账到银行卡
	sale_doctorGetDivide: (data) => {
		return rq("/wx/salesman/getDividePage", data, "GET");
	},
	//转账记录详情
	sale_divideRecord: (data) => {
		return rq("/wx/salesman/getDivideRecord", data, "GET");
	},
	sale_settleInfo: (data) => {
		return rq("/wx/salesman/settleInfo", data, "GET");
	}, //账户已结算页的金额
	sales_changepassword: (data) => {
		return rq("/wx/salesman/changePassword", data, "POST");
	}, //修改密码

	//添加运动
	saveSport: (data) => {
		return rq("/wx/exercise/record/save", data, "POST");
	},
	//获取饮食 时间段list
	dietTimeType: (data) => {
		return rq("/wx/diet/record/dietTimeType", data, "GET");
	},
	//食物分类 列表
	foodTypeList: (data) => {
		return rq("/wx/food/type/list", data, "GET");
	},
	//食物 列表（不分页）
	foodList: (data) => {
		return rq("/wx/food/list", data, "GET");
	},
	//保存食物记录
	saveFood: (data) => {
		return rq("/wx/diet/record/save", data, "POST");
	},
	//运动分类list
	sportType: (data) => {
		return rq("/wx/exercise/type/list", data, "GET");
	},
	//运动列表
	sportList: (data) => {
		return rq("/wx/exercise/list", data, "GET");
	},
	//修改医嘱签名
	updateDoctorName: (data) => {
		return rq("/wx/doctor/updateInfo", data, "POST");
	},

	//资源报备
	//获取子地区，，没用
	getChildrenArea: (data) => {
		return rq("/wx/system/region/getChildren", data, "GET");
	},
	//医院列表
	hospitalList: (data) => {
		return rq("/wx/service/hospital/list", data, "GET");
	},
	//科室列表
	getOptionList: (data) => {
		return rq("/wx/system/dict/getDetailList", data, "GET");
	},
	//保存资源
	saveResource: (data) => {
		return rq("/wx/sales/business/resource/save", data, "POST");
	},
	//资源报备列表（分页）
	resourceList: (data) => {
		return rq("/wx/sales/business/resource/list", data, "GET");
	},
	//移除报备
	removeResource: (data) => {
		return rq("/wx/sales/business/resource/delete", data, "POST");
	},
	//患者列表
	salesmanPatientList: (data) => {
		return rq("/wx/salesman/patientList", data, "GET");
	},
	//疾病列表
	getIllnessSetting: (data) => {
		return rq("/wx/patient/getIllnessSetting", data, "GET");
	},

	//代理员
	//下属团队（代理渠道）业务情况
	agentInfo: (data) => {
		return rq("/wx/sales/agent/agentInfo", data, "GET");
	},
	//订单列表
	agentOrderList: (data) => {
		return rq("/wx/sales/agent/orderPage", data, "GET");
	},
	//按月统计订单数据
	agentOrderStatsList: (data) => {
		return rq("/wx/sales/agent/orderStatsList", data, "GET");
	},
	//团队列表（分页）
	agentTeamList: (data) => {
		return rq("/wx/sales/agent/teamList", data, "GET");
	},
	//成员详情
	salesmanDetail: (data) => {
		return rq("/wx/salesman/homepage", data, "GET");
	},
	//获取是否 代理员身份
	getIdentity: (data) => {
		return rq("/wx/salesman/getIdentity", data, "GET");
	},

	//职称列表（不分页）
	technicalTitleList: (data) => {
		return rq("/wx/sales/business/resource/technicalTitleList", data, "GET");
	},
	//客情关系程度 列表（不分页）
	relateList: (data) => {
		return rq("/wx/sales/business/resource/relateList", data, "GET");
	},

	//报备详情
	resourceReportDetail: (data) => {
		return rq("/wx/sales/business/resource/get", data, "GET");
	},

	//账号
	accountsave: (data) => {
		return rq("/wx/doctor/account/save", data, "POST");
	}, //保存账号
	accountdelete: (data) => {
		return rq("/wx/doctor/account/delete", data, "POST");
	}, //删除账号
	accountlist: (data) => {
		return rq("/wx/doctor/account/list", data, "GET");
	}, //账号列表
	accountget: (data) => {
		return rq("/wx/doctor/account/get", data, "GET");
	}, //账号详情

	getWxConfig: (data) => {
		return rq("/wx/common/wechatParam", data, "GET");
	}, //微信配置

	//sga类型判断
	getSgaType: (data) => {
		return rq("/wx/survey/question/getSgaType", data, "GET");
	},

	//获取医生下的患者
	getDoctorPatients: (data) => {
		return rq("/wx/doctor/patientList", data, "GET");
	},

	//医生管理的科室/病区内的医生列表
	getManageDepartment: (data) => {
		return rq("/wx/doctor/getManageDepartment", data, "GET");
	},

	//科室/病区里的医生列表——可将患者转给的医生
	getDepartmentDoctors: (data) => {
		return rq("/wx/doctor/getDepartmentDoctors", data, "GET");
	},
	//将患者转给其他医生
	changeBindDoctor: (data) => {
		return rq("/captcha/changeBindDoctor", data, "POST");
	},


	//业务员2.0
	// 查询组织部门架构
	getSalesManOrg: (data) => {
		return rq("/wx/salesman/org/getSalesManOrg", data, "GET");
	},

	//组织架构查看业务情况
	getOrgInfo: (data) => {
		return rq("/wx/salesman/org/orgInfo", data, "GET");
	},

	//获取团队成员人数
	getOrgMembers: (data) => {
		return rq("/wx/salesman/org/getOrgInfo", data, "GET");
	},

	//团队成员列表
	getTeamMembers: (data) => {
		return rq("/wx/salesman/getDirectSub", data, "GET");
	},

	changeBindDoctor: (data) => {
		return rq("/captcha/changeBindDoctor", data, "POST");
	},

	//跨平台数据 统计
	platformInfo: (data) => {
		return rq("/wx/commodity/platform/info", data, "GET");
	},

	//根据部门查询团队成员
	getSalesList: (data) => {
		return rq("/wx/salesman/org/getSalesList", data, "GET");
	},


	//是否有最新未读消息
	hasMessage: (data) => {
		return rq("/wx/user/message/get", data, "GET");
	},

	//读消息
	readMessage: (data) => {
		return rq("/wx/user/message/read", data, "GET");
	},
	
	readMessage: (data) => {
		return rq("/wx/user/message/read", data, "POST");
	},
	
	messageList: (data) => {
		return rq("/wx/user/message/list", data, "GET");
	},
	
	//========新加
	//资料库目录
	fileFindDir:(data)=>{return rq("/wx/doc/file/findDir",data,"GET");}, 
	//文件分页列表
	fileList:(data)=>{return rq("/wx/doc/file/findPage",data,"GET");}, 
	//发送邮件
	sendMail:(data)=>{return rq("/wx/doc/file/sendMail",data,"GET");}, 
	//首页模块配置列表
	homepage:(data)=>{return rq("/wx/homepage/setting/list",data,"GET");},
}

export {
	api
};
