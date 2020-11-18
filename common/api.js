
import { rq } from "common/request";

var api = {
	login:(data)=>{return rq("/wx/member/preLogin",data,"POST");}, //登录
	
	list:(data)=>{return rq("/klwy_app/user/appShareWx",data,"GET");},
	
	//聊天
	userchat:(data)=>{return rq("/wx/interpret/consult/myGet",data,"GET");},
	doctorchat:(data)=>{return rq("/wx/interpret/consult/interpretGet",data,"GET");},
	savetext:(data)=>{return rq("/wx/interpret/consult/session/save",data,"POST");}, //保存文字
	endchat:(data)=>{return rq("/wx/interpret/consult/saveInterpret",data,"POST");},
	tellhadsend:(data)=>{return rq("/wx/interpret/consult/startSession",data,"POST");},
	
	
	//我的
    mine:(data)=>{return rq("/wx/member/myInfo",data,"GET");},
	//保存用户信息
	saveuserinfo:(data)=>{return rq("/wx/member/save",data,"POST");},
	//我的--优惠券列表
	myCouponList:(data)=>{return rq("/wx/coupon/myCouponList",data,"GET");},
	//领取优惠券
	drawCoupon:(data)=>{return rq("/wx/coupon/draw",data,"GET");},
	//我的图文咨询详情
	myInterpretConsult:(data)=>{return rq("/wx/interpret/consult/myGet",data,"GET");},
	//我的订单列表
	myOrderList:(data)=>{return rq("/mini/order/myOrderList",data,"GET");},
	//解读员工作台
	 interpretationConsole:(data)=>{return rq("/wx/order/count/getConsole",data,"GET");},
	 //我的-影像报告解读列表
	 myInterpretList:(data)=>{return rq("/wx/interpret/mri/findMyPage",data,"GET");},
	 //影像学解读分页
	 interpretList:(data)=>{return rq("/wx/interpret/mri/findPage",data,"GET");},
	 //影像学解读详情
	 interpretMriDetail:(data)=>{return rq("/wx/interpret/mri/get",data,"GET");},
	 //保存解读信息
	 saveInterpret:(data)=>{return rq("/wx/interpret/mri/saveInterpret",data,"POST");},
	 //影像学报告解读 确认收件
	 sureRecive:(data)=>{return rq("/wx/interpret/mri/saveRcv",data,"POST");},
	 //保存快递信息
	 savePostBack:(data)=>{return rq("/wx/interpret/mri/savePostBack",data,"POST");},
	 //电话解读分页
	 telephoneInterpret:(data)=>{return rq("/wx/interpret/telephone/findPage",data,"GET");},
	 //电话解读-给予解读
	 telephoneInterpretSaveRcv:(data)=>{return rq("/wx/interpret/telephone/saveRcv",data,"POST");},
	 //电话解读--完成解读
	 telephoneInterpretFinsh:(data)=>{return rq("/wx/interpret/telephone/saveInterpret",data,"POST");},
	 //图文咨询分页
	 chatList:(data)=>{return rq("/wx/interpret/consult/findPage",data,"GET");},
	 //我的-我的图文咨询分页
	 mineChatList:(data)=>{return rq("/wx/interpret/consult/findMyPage",data,"GET");},
	 //保存报告寄出信息
	 savePost:(data)=>{return rq("/wx/interpret/mri/savePost",data,"POST");},
	 //订单的服务评价
	 orderEvaluation:(data)=>{return rq("/mini/order/appraise",data,"POST");},
}

export {api};