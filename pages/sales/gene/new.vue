<template>
	<view class="container">
		<turnback> </turnback>
		<view class="title" style="margin-top:26rpx;">样本信息</view>
		<view class="uploadimgbox">
			<view class="thead">上传申请单</view>
			<view class="imgbox flex">
				<view class="upimgbox flex ct" @click="choseImg"><uni-icons type="plusempty" size="30" color="#ccc"></uni-icons></view>
				<view style="position:relative;" v-for="(item,index) in form.requesitionUrl" :key="index">
					<image class="upimgbox" :src="baseUrl+item" mode="aspectFit" style="display:block;"></image>
					<image src="../../../static/icon/icon_remove.png" mode="widthFix" class="remove-icon" @click="remove(index,1)"></image>
				</view>
				<view style="position:relative;" v-for="(item,index) in form.request1Files" :key="index">
					<image class="upimgbox" :src="item" mode="aspectFit" style="display:block;"></image>
					<image src="../../../static/icon/icon_remove.png" mode="widthFix" class="remove-icon" @click="remove(index,2)"></image>
				</view>
			</view>
			
		</view>
		<!-- <view class="name-box">
			<view class="name-tips">检测项目:</view>
			<input class="name-input" disabled type="text" value="" placeholder="请填写检测项目" v-model="form.project" />
		</view> -->
		<view class="name-box" style="align-items:flex-start;">
			<view class="name-tips">* 样本组合:</view>
			<view class="name-input">
				<radio-group @change="radioChange">
					<label class="ccblock radioline flex"> <radio value="0" :checked="form.combination==0?true:false" style="zoom:0.7;"/>主样本 </label>
					<label class="ccblock radioline flex"> <radio value="1" :checked="form.combination==1?true:false" style="zoom:0.7;"/>主样本+对照血 </label>
					<label class="ccblock radioline flex"> <radio value="2" :checked="form.combination==2?true:false" style="zoom:0.7;"/>主样本+对照血+备用样本 </label>
				</radio-group>
			</view>
		</view>
		<view class="name-box">
			<view class="name-tips">* 主样本编号:</view>
			<input class="name-input" type="text" value="" placeholder="请填写主样本编号" v-model="form.sampleCode" />
			<uni-icons type="scan" size="22" @click="wxScan(0)"></uni-icons>
		</view>
		
		<view class="name-box">
			<view class="name-tips">* 样本类型:</view>
			<view style="flex:1;">
				<view :class="(form.sampleType?'name-input':'name-novalue-input')+' otherinput'" @click="$refs.typePop.open();sampleType=1;">{{form.sampleType?form.sampleType:'请选择样本类型'}}</view>
			</view>
		</view>
		<view class="name-box" v-show="form.combination!=0">
			<view class="name-tips">* 对照血样本编号:</view>
			<input class="name-input" type="text" value="" placeholder="请填写对照血样本编号" v-model="form.sampleCode1" />
			<uni-icons type="scan" size="22" @click="wxScan(2)"></uni-icons>
		</view>
		<view class="name-box" v-show="form.combination!=0">
			<view class="name-tips">* 对照血样本类型:</view>
			<view style="flex:1;">
				<view :class="(form.sampleType1?'name-input':'name-novalue-input')+' otherinput'" @click="$refs.type1Pop.open()">{{form.sampleType1?form.sampleType1:'请选择对照血样本类型'}}</view>
			</view>
		</view>
		<view class="name-box" v-show="form.combination==2">
			<view class="name-tips">* 备用样本编号:</view>
			<input class="name-input" type="text" value="" placeholder="请填写备用样本编号" v-model="form.sampleCode2" />
			<uni-icons type="scan" size="22" @click="wxScan(1)"></uni-icons>
		</view>
		<view class="name-box" v-show="form.combination==2">
			<view class="name-tips">* 备用样本类型:</view>
			<view style="flex:1;">
				<view :class="(form.sampleType2?'name-input':'name-novalue-input')+' otherinput'" @click="$refs.typePop.open();sampleType=2;">{{form.sampleType2?form.sampleType2:'请选择备用样本类型'}}</view>
			</view>
		</view>
		<!-- <view class="name-box">
			<view class="name-tips">订单金额:</view>
			<input class="name-input" disabled type="text" value="" placeholder="请填写订单金额" v-model="form.money" />
		</view> -->
		<view class="sex-box" >
			<view class="sex-tips">* 采集日期:</view>
			<picker mode="date" :value="form.collectTime" :start="startDate" :end="endDate" @change="bindDateChange" style="flex: 1;">
				<view :class="form.collectTime?'has-value':'sex-value'">{{form.collectTime?form.collectTime:'点击选择'}}</view>
			</picker>
		</view>
		<view class="name-box">
			<view class="name-tips">* 快递单号:</view>
			<input class="name-input" type="text" value="" placeholder="请填写快递单号" v-model="form.expressCode" />
		</view>
		<view class="name-box" style="align-items:flex-start;">
			<view class="name-tips">寄送纸质报告:</view>
			<view class="name-input">
				<radio-group @change="radioreportChange">
					<label class=""> <radio value="1" :checked="form.sendReport==1?true:false" style="zoom:0.7;"/><text class="changetext">需要</text></label>
					<label class="" style="margin-left:40rpx;"> <radio value="0" :checked="form.sendReport==0?true:false" style="zoom:0.7;"/><text class="changetext">不需要</text></label>
				</radio-group>
			</view>
		</view>
		<view class="name-box" style="align-items:flex-start;" v-show="form.sendReport==1">
			<view class="name-tips">* 报告寄送地址:</view>
			<picker name="picker" class="name-input" @click="openareachoose(1)" disabled="true" change="bindPickerChange" :value="form.reportAddress" :style="form.reportAddress[0]?'':'color:#888'">
			    <view style="">{{form.reportAddress[0]?(form.reportAddress[0]+" "+form.reportAddress[1]+" "+form.reportAddress[2]):"请选择"}}</view>
			</picker>
		</view>
		<view class="name-box" v-show="form.sendReport==1">
			<view class="name-tips">* 详细地址和联系电话:</view>
			<textarea class="textareainput" placeholder="请输入详细地址/联系人/联系电话" auto-height v-model="form.reportAddressDetail"/>
		</view>
		<view class="name-box">
			<view class="name-tips">备注:</view>
			<textarea class="textareainput" placeholder="请填写备注" auto-height v-model="form.remark"/>
		</view>
		<view class="title">病患信息</view>
		<view class="name-box">
			<view class="name-tips">* 姓名:</view>
			<input class="name-input" type="text" value="" placeholder="请填写姓名" v-model="form.patientName" />
		</view>
		<view class="name-box">
			<view class="name-tips">* 身份证号:</view>
			<input class="name-input" type="text" value="" placeholder="请填写身份证号" v-model="form.idCard" />
		</view>
		<view class="name-box" style="align-items:flex-start;">
			<view class="name-tips">性别:</view>
			<view class="name-input">
				<radio-group @change="radiosexChange">
					<label class=""> <radio value="1" :checked="form.sex==1?true:false" style="zoom:0.7;"/><text class="changetext">男</text></label>
					<label class="" style="margin-left:40rpx;"> <radio value="0" :checked="form.sex==0?true:false" style="zoom:0.7;"/><text class="changetext">女</text></label>
				</radio-group>
			</view>
		</view>
		<view class="name-box" >
			<view class="name-tips">* 年龄:</view>
			<input class="name-input" type="number" value="" placeholder="请填写年龄" v-model="form.age" />
		</view>
		<view class="name-box">
			<view class="name-tips">* 联系电话:</view>
			<input class="name-input" type="number" value="" placeholder="请填写联系电话" v-model="form.mobile" />
		</view>
		<view class="name-box" style="align-items:flex-start;">
			<view class="name-tips">* 生活过的城市:</view>
			<picker name="picker" class="name-input" @click="openareachoose(2)" disabled="true" change="bindPickerChange" :value="form.city" :style="form.city[0]?'':'color:#555'">
			    <view style="">{{form.city[0]?(form.city[0]+" "+form.city[1]+" "+form.city[2]):"请选择最近5年生活的城市"}}</view>
			</picker>
		</view>
		<view class="title">病理信息</view>
		<view class="uploadimgbox">
			<view class="thead">上传病理信息单</view>
			<view class="imgbox flex">
				<view class="upimgbox flex ct" @click="chose1Img"><uni-icons type="plusempty" size="30" color="#ccc"></uni-icons></view>
				<view style="position:relative;" v-for="(item,index) in form.pathologicalUrl" :key="index">
					<image class="upimgbox" :src="baseUrl+item" mode="aspectFit" style="display:block;"></image>
					<image src="../../../static/icon/icon_remove.png" mode="widthFix" class="remove-icon" @click="re1move(index,1)"></image>
				</view>
				<view style="position:relative;" v-for="(item,index) in form.bl1Files" :key="index">
					<image class="upimgbox" :src="item" mode="aspectFit" style="display:block;"></image>
					<image src="../../../static/icon/icon_remove.png" mode="widthFix" class="remove-icon" @click="re1move(index,2)"></image>
				</view>
			</view>
		</view>
		<view class="name-box" style="align-items:flex-start;">
			<view class="name-tips">输血或器官移植(3个月内):</view>
			<view class="name-input">
				<radio-group @change="radio3Change">
					<label class=""> <radio value="1" :checked="form.organTrans==1?true:false" style="zoom:0.7;"/><text class="changetext">是</text></label>
					<label class="" style="margin-left:40rpx;"> <radio value="0" :checked="form.organTrans==0?true:false" style="zoom:0.7;"/><text class="changetext">否</text></label>
				</radio-group>
			</view>
		</view>
		<view v-show="showgroup">
			<view class="name-box">
				<view class="name-tips">* 肿瘤大小参数:</view>
				<input class="name-input" type="text" value="" placeholder="请填写肿瘤大小参数" v-model="form.tumorSize" />
			</view>
			<view class="name-box">
				<view class="name-tips">* ki67:</view>
				<input class="name-input" type="text" value="" placeholder="请填写ki67" v-model="form.ki67" />
			</view>
			<view class="sex-box" >
				<view class="sex-tips">* 淋巴结转移情况:</view>
				<picker mode="selector" :value="form.lymphTrans" :range="lymphTransOptions" @change="bindlymphTransOptions" style="flex: 1;">
					<view :class="form.lymphTrans?'has-value':'sex-value'">{{form.lymphTrans?form.lymphTrans:'点击选择'}}</view>
				</picker>
			</view>
			<view class="sex-box" >
				<view class="sex-tips">* ER:</view>
				<picker mode="selector" :value="form.ER" :range="EROptions" @change="bindEROptions" style="flex: 1;">
					<view :class="form.ER?'has-value':'sex-value'">{{form.ER?form.ER:'点击选择'}}</view>
				</picker>
			</view>
			<view class="sex-box" >
				<view class="sex-tips">* PR:</view>
				<picker mode="selector" :value="form.PR" :range="PROptions" @change="bindPROptions" style="flex: 1;">
					<view :class="form.PR?'has-value':'sex-value'">{{form.PR?form.PR:'点击选择'}}</view>
				</picker>
			</view>
			<view class="sex-box" >
				<view class="sex-tips">* HER-2:</view>
				<picker mode="selector" :value="form.HER" :range="HEROptions" @change="bindHEROptions" style="flex: 1;">
					<view :class="form.HER?'has-value':'sex-value'">{{form.HER?form.HER:'点击选择'}}</view>
				</picker>
			</view>
		</view>
		<view class="name-box">
			<view class="name-tips">* 家族史:</view>
			<input class="name-input" type="text" value="" placeholder="请填写家族史" v-model="form.familyHistory" />
		</view>
		<view class="name-box">
			<view class="name-tips">组织来源:</view>
			<input class="name-input" type="text" value="" placeholder="请填写组织来源" v-model="form.tissueSource" />
		</view>
		<view class="name-box">
			<view class="name-tips">送检癌种:</view>
			<input class="name-input" type="text" value="" placeholder="请填写送检癌种" v-model="form.tumorType" />
		</view>
		<view class="name-box">
			<view class="name-tips">肿瘤分期:</view>
			<view style="flex:1;">
				<view :class="(form.tumorStage?'name-input':'name-novalue-input')+' otherinput'" @click="$refs.genePop.open();">{{form.tumorStage!==""?genelist[form.tumorStage].value:"请选择"}}</view>
			</view>
		</view>
		<view class="name-box">
			<view class="name-tips">肿瘤细胞含量:</view>
			<input class="name-input" type="text" value="" placeholder="请填写肿瘤细胞含量" v-model="form.tumorCellContent" />
		</view>
		<view class="name-box">
			<view class="name-tips">疾病史:</view>
			<input class="name-input" type="text" value="" placeholder="请填写疾病史" v-model="form.diseaseHistory" />
		</view>
		
		<view class="title">财务信息</view>
		<view class="name-box" style="align-items:flex-start;">
			<view class="name-tips">开具发票:</view>
			<view class="name-input" >
				<radio-group @change="radiotipChange">
					<label class=""> <radio value="1" :checked="form.isNeedInvoice==1?true:false" style="zoom:0.7;"/><text class="changetext">需要</text></label>
					<label class="" style="margin-left:40rpx;"> <radio value="0" :checked="form.isNeedInvoice==0?true:false" style="zoom:0.7;"/><text class="changetext">不需要</text></label>
				</radio-group>
			</view>
		</view>
		<view v-show="form.isNeedInvoice==1">
			<view class="name-box">
				<view class="name-tips">* 发票邮递地址/联系人/联系电话:</view>
				<textarea class="textareainput" placeholder="请输入发票邮递地址/联系人/联系电话" auto-height v-model="form.invoiceAddress"/>
			</view>
			<view class="name-box" style="align-items:flex-start;">
				<view class="name-tips">* 发票类型:</view>
				<view class="name-input" style="flex:unset;width:100%;padding-top:0;">
					<radio-group @change="radiofapiaoChange">
						<label class=""> <radio value="1" :checked="form.isCompanyInvoice==1?true:false" style="zoom:0.7;"/><text class="changetext">个人普票</text></label>
						<label class="" style="margin-left:40rpx;"> <radio value="0" :checked="form.isCompanyInvoice==0?true:false" style="zoom:0.7;"/><text class="changetext">单位普票</text></label>
						<label class="" style="margin-left:40rpx;"> <radio value="2" :checked="form.isCompanyInvoice==2?true:false" style="zoom:0.7;"/><text class="changetext">单位专票</text></label>
					</radio-group>
				</view>
			</view>
			<view class="name-box" v-show="form.isCompanyInvoice==2">
				<view class="name-tips">* 单位的具体运营地址以及联系电话:</view>
				<textarea class="textareainput" placeholder="请输入单位的具体运营地址以及联系电话" auto-height v-model="form.companyAddress"/>
			</view>
			<view class="name-box">
				<view class="name-tips">* 电子邮箱:</view>
				<input class="name-input" type="text" value="" placeholder="请填写电子邮箱" v-model="form.email" />
			</view>
			<view class="name-box" v-show="form.isCompanyInvoice!=1">
				<view class="name-tips">* 纳税人识别号:</view>
				<input class="name-input" type="text" value="" placeholder="请填写纳税人识别号" v-model="form.taxpayerCode" />
			</view>
			<view class="name-box" v-show="form.isCompanyInvoice!=1">
				<view class="name-tips">* 发票抬头:</view>
				<input class="name-input" type="text" value="" placeholder="请填写发票抬头" v-model="form.invoiceTitle" />
			</view>
			<view class="name-box" v-show="form.isCompanyInvoice==2">
				<view class="name-tips">* 银行账户:</view>
				<input class="name-input" type="text" value="" placeholder="请填写银行账户" v-model="form.bankCode" />
			</view>
		</view>


		<view class="button-box">
			<button type="default" class="button" @click="submit">预览</button>
		</view>

		<view style="height: 100rpx;"></view>

		<uni-popup ref="typePop" type="bottom">
			<view class="i-sex-content">
				<text class="i-sex-title">样本类型</text>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view>
						<view v-for="(item,index) in typelist" :key="index" :class="illness==item.value?'i-sex-item line active':'i-sex-item line'"
						 @click="selecttypeResult(item.value)">{{item.value}}</view>
					</view>
				</scroll-view>
		
			</view>
		</uni-popup>
		<uni-popup ref="type1Pop" type="bottom">
			<view class="i-sex-content">
				<text class="i-sex-title">对照血样本类型</text>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view>
						<view v-for="(item,index) in type1list" :key="index" :class="illness==item.value?'i-sex-item line active':'i-sex-item line'"
						 @click="selecttype1Result(item.value)">{{item.value}}</view>
					</view>
				</scroll-view>
		
			</view>
		</uni-popup>
		<uni-popup ref="genePop" type="bottom">
			<view class="i-sex-content">
				<text class="i-sex-title">肿瘤分期</text>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view>
						<view v-for="(item,index) in genelist" :key="index" :class="illness==item.value?'i-sex-item line active':'i-sex-item line'"
						 @click="selectgeneResult(index)">{{item.value}}</view>
					</view>
				</scroll-view>
		
			</view>
		</uni-popup>

		<n-address ref="addr" @up-data="upData" ></n-address>
	</view>
</template>

<script>
	const app = getApp();
	import turnback from "../../../components/turnback.vue"
	import nAddress from "components/n-address/n-address.vue"
	import setconfig from "../../../common/wxconfig.js"
	import wx from '../../../plugins/jweixin.js'
	export default {
		components: {
			turnback,nAddress
		},
		data() {
			return {
				patientName: '',
				phone: "",
				birthday: this.getDate('now'),
				illness: '',
				age:'',
				infoData: {},
				inllList: [],
				//
				baseUrl:app.globalData.baseUrl,
				id:"",
				form:{
					orderId:"",//订单id
					requesitionUrl:[],
					request1Files:[],//申请单图片，文件对象数组
					combination:0,//样本组合，0'主样本', 1'主样本+对照血', 2'主样本+对照血+备用样本'
					sampleType:"",//主样本类型
					sampleCode:"",//主样本编码
					sampleType1:"",//对照血采样类型
					sampleCode1:"",//对照血样本编码
					sampleType2:"",//备用采样类型
					sampleCode2:"",//备用样本编码
					collectTime:this.getDate('now'),//样本采集时间
					expressCode:"",//纸质申请单的快递单号
					sendReport:0,//是否需要纸质报告 0否 1是
					reportAddress:[],//报告邮寄地址
					reportAddressDetail:"",//报告邮寄详细地址和联系方式
					remark:"",//备注
					patientName:"",//检测者姓名
					sex:1,//性别：（1：男，0：女）
					age:"",//年龄
					idCard:"",//身份证号
					mobile:"",//手机号
					city:[],//最近五年居住城市
					pathologicalUrl:[],
					bl1Files:[],//病理图片，文件对象数组
					familyHistory:"",//家族史
					isNeedInvoice:0,//是否开具发票（0：不需要 1：需要）
					isCompanyInvoice:0,//发票类型（0：公司普票 1：个人普票  2：公司专票）
					email:"",//接收发票邮箱
					invoiceTitle:"",//发票抬头
					taxpayerCode:"",//纳税人识别号
					invoiceAddress:"",//发票邮寄地址
					companyAddress:"",//公司住所电话
					bankCode:"",//银行账号
					project:"",
					money:"",
					organTrans:'0',//是否有输血或器官移植(3个月内)：（0 否，1 是）
					immunResult: '', //p免疫组化结果
					tissueSource: '', //组织来源
					tumorType: '', //送检癌种
					tumorStage: "", //肿瘤分期
					tumorCellContent: '', //肿瘤细胞含量
					diseaseHistory: '', //疾病史
					tumorSize:'',//肿瘤大小参数手动输入
					ki67:'',//手动输入
					lymphTrans:'',//淋巴结转移情况
					//以下三项拼接成免疫组化用顿号隔开
					ER:'',
					PR:'',
					HER:'',
				},
				sampleType:1,//1主样本类型 2备用采样类型
				reportAddress:1, //1报告邮寄地址 2最近五年居住城市
				typelist:[{"value":"一次性使用取样器","key":10},{"value":"新鲜组织","key":9},{"value":"EDTA管","key":8},{"value":"streck管","key":7},{"value":"石蜡切片","key":6},{"value":"蜡块","key":5},{"value":"蜡卷","key":4},{"value":"胸腹水","key":3},{"value":"脑积液","key":2},{"value":"唾液","key":1},{"value":"口腔拭子","key":0}],
				type1list:[{"value":"EDTA管","key":1},{"value":"streck管","key":0},{"value":"唾液","key":2}],
				genelist:[{"value":"0","key":0},{"value":"I","key":1},{"value":"II","key":2},{"value":"III","key":3},{"value":"IV","key":4}],
				showgroup:false,//免疫组化
				lymphTransOptions:["无转移","1-3PLN","4-10PLN"],
				EROptions:["ER(阳性)","ER(阴性)","不确定"],
				PROptions:["PR(阳性)","PR(阴性)","不确定"],
				HEROptions:["HER-2(阳性)","HER-2(阴性)","不确定"],
			}
		},
		onLoad(props) {
			if (!app.getCache("salesToken")) return;
			// this.getIllnessList();
			if(props&&props.id){
				this.id = props.id;
				this.getInfo();
			}
			if(props&&props.name){
				if(props.name.indexOf("普姿康")!=-1||props.name.indexOf("普瑞妍")!=-1) this.showgroup = true;
			}
			if(props&&props.orderid){
				this.form.orderId = props.orderid;
			}
			setconfig().then(res => {
				let phone = uni.getSystemInfoSync();
				if(phone.platform == "ios"){
					if (!sessionStorage.getItem("reloadgenepage")) {
						sessionStorage.setItem("reloadgenepage", 1);
						location.reload();
					}
				}
			});
			if(props&&props.orderid){
				this.getorderinfo();
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		
		onShow() {
			if (!app.getCache("salesToken")) return;
		},
		methods: {
			bindlymphTransOptions(e){
				this.form.lymphTrans = this.lymphTransOptions[e.detail.value];
			},
			bindEROptions(e){
				this.form.ER = this.EROptions[e.detail.value];
			},
			bindPROptions(e){
				this.form.PR = this.PROptions[e.detail.value];
			},
			bindHEROptions(e){
				this.form.HER = this.HEROptions[e.detail.value];
			},
			bindPickerChange(e){
				if(this.reportAddress==1) this.form.reportAddress = e.detail.value;
				if(this.reportAddress==2) this.form.city = e.detail.value;
			},
			upData (e) {
			    // console.log(e)
				if(this.reportAddress==1) this.form.reportAddress = e.regionArr;
				if(this.reportAddress==2) this.form.city = e.regionArr;
			},
			//省市区
			openareachoose(index){
				this.reportAddress=index;
				this.$refs['addr'].popUp();
			},
			selecttypeResult(item) {
				if(this.sampleType==1) this.form.sampleType = item;
				if(this.sampleType==2) this.form.sampleType2 = item;
				this.$refs.typePop.close();
			},
			selecttype1Result(item) {
				this.form.sampleType1 = item;
				this.$refs.type1Pop.close();
			},
			getIllnessList() {
				app.getIllnessSetting().then(res => {
					if (res.status == 1) {
						let hasother = false;
						for (let i = 0; i < res.data.illness.length; i++) {
							if(res.data.illness[i]=="其它疾病") hasother = true;
						}
						if(!hasother) res.data.illness.push("其它疾病");
						this.inllList = res.data.illness;
					}
				});
			},
			getorderinfo() {
				app.addressgetDetail({orderId:this.form.orderId}).then(res => {
					if (res.data) {
						let region = [];
						if(res.data.region) region = res.data.region.split(" ");
						this.form.reportAddress = region;
						this.form.reportAddressDetail = res.data.address+"/"+res.data.contactPerson+"/"+res.data.contactPhone;
					}
				});
			},
			selectgeneResult(item) {
				this.form.tumorStage = item;
				this.$refs.genePop.close();
			},
			getInfo() {
				app.ordergetInfo({orderId:this.id}).then(res => {
					if (res.status == 1) {
						if (res.data) {
							res.data.requesitionUrl = res.data.requesitionUrl?res.data.requesitionUrl.split(","):[];
							res.data.pathologicalUrl = res.data.pathologicalUrl?res.data.pathologicalUrl.split(","):[];
							res.data.request1Files = [];
							res.data.bl1Files = [];
							res.data.reportAddress = res.data.reportAddress.split(" ");
							res.data.city = res.data.city.split(" ");
							if(res.data.immunResult) {
								res.data.immunResult = res.data.immunResult.split(",");
							}else res.data.immunResult = ["","",""];
							res.data.ER = res.data.immunResult[0];
							res.data.PR = res.data.immunResult[1];
							res.data.HER = res.data.immunResult[2];
							if(res.data.ER) this.showgroup = true;
							this.form = res.data;
							// if (this.infoData.birthday) {
							// 	var year = this.infoData.birthday.split('年')[0];
							// 	var month = this.infoData.birthday.split('年')[1].split('月')[0];
							// 	var day = this.infoData.birthday.split('年')[1].split('月')[1].split('日')[0];
							// 	this.birthday = year + '-' + month + '-' + day;
							// }
						}
					}
				});
			},
			
			bindDateChange(e) {
				this.form.collectTime = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 100;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			previewImage(index) {
				uni.previewImage({
					urls: this.imgList,
					current: index
				})
			},
			remove(index,flag) {
				if(flag==1) this.form.requesitionUrl.splice(index, 1);
				if(flag==2) this.form.request1Files.splice(index, 1);
			},
			choseImg() {
				if (this.form.request1Files.length >= 9) {
					app.tip('最多选取9张图片');
					return;
				}
				uni.chooseImage({
					count: 9 - this.form.request1Files.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						// console.log(res)
						this.form.request1Files = this.form.request1Files.concat(res.tempFilePaths);
					}
				});
			},
			re1move(index,flag) {
				if(flag==1) this.form.pathologicalUrl.splice(index, 1);
				if(flag==2) this.form.bl1Files.splice(index, 1);
			},
			chose1Img() {
				if (this.form.bl1Files.length >= 9) {
					app.tip('最多选取9张图片');
					return;
				}
				uni.chooseImage({
					count: 9 - this.form.bl1Files.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						this.form.bl1Files = this.form.bl1Files.concat(res.tempFilePaths);
					}
				});
			},
			submit() {
				// if(!this.form.requesitionUrl[0]&&!this.form.request1Files[0]) {app.tip("请上传申请单",2000);return;}
				// if(!this.form.pathologicalUrl[0]&&!this.form.bl1Files[0]) {app.tip("请上传病理单",2000);return;}
				let error = [
					{val:"sampleCode",text:"请填写主样本编码"},
					{val:"sampleType",text:"请选择主样本类型"},
					{val:"expressCode",text:"请填写快递单号"},
					{val:"patientName",text:"请填写检测者姓名"},
					{val:"idCard",text:"请填写身份证号"},
					{val:"age",text:"请填写年龄"},
					{val:"mobile",text:"请填写手机号"},
					{val:"familyHistory",text:"请填写家族史"},
				];
				for (var i = 0; i < error.length; i++) {
					if(!this.form[error[i].val]) {app.tip(error[i].text,2000);return;}
				}
				if(this.showgroup){
					let error = [
						{val:"tumorSize",text:"请填写肿瘤大小参数"},
						{val:"ki67",text:"请填写ki67"},
						{val:"lymphTrans",text:"请选择淋巴结转移情况"},
						{val:"ER",text:"请填写ER"},
						{val:"PR",text:"请填写PR"},
						{val:"HER",text:"请填写HER"},
					];
					for (var i = 0; i < error.length; i++) {
						if(!this.form[error[i].val]) {app.tip(error[i].text,2000);return;}
					}
				}
				if(!this.form.city[0]) {app.tip("请选择最近居住城市",2000);return;}
				
				if(this.form.combination==1||this.form.combination==2){
					if(!this.form.sampleCode1) {app.tip("请填写对照血样本编码",2000);return;}
					if(!this.form.sampleType1) {app.tip("请选择对照血采样类型",2000);return;}
				}
				if(this.form.combination==2){
					if(!this.form.sampleCode2) {app.tip("请填写备用样本编码",2000);return;}
					if(!this.form.sampleType2) {app.tip("请选择备用采样类型",2000);return;}
				}
				if(this.form.sendReport==1){
					if(!this.form.reportAddressDetail) {app.tip("请填写报告邮寄详细地址和联系方式",2000);return;}
					if(!this.form.reportAddress[0]) {app.tip("请选择报告邮寄地址",2000);return;}
				}
				if(this.form.sendReport==0){
					this.form.reportAddressDetail = "";
					this.form.reportAddress = [];
				}
				app.newapplydata = this.form;
				// console.log(this.form)
				uni.navigateTo({
					url:"/pages/sales/gene/detail?change="+(this.id?1:"")
				});
				return;
				
				// if (this.imgList.length > 0) {
				// 	this.uploadImg();
				// } else {
				// 	this.submitRequest();
				// }
			},
			uploadImg() {
				let uploadCount = 0;
				for (let i = 0; i < this.imgList.length; i++) {
					let formData = {
						'salesToken':localStorage.getItem("salesToken"),
						'uid': localStorage.getItem("uid"),
						'channel':app.globalData.channel,
					}
					uni.uploadFile({
						url: '/api' + '/wx/patient/bl/uploadPicture',
						filePath: this.imgList[i],
						name: 'file',
						formData: formData,
						success: (res) => {
							// console.log(res.data);
							let data = JSON.parse(res.data);
							if (data.status == 1) {
								uploadCount++;
								this.pathologyUrl = this.pathologyUrl + data.data.pictureUrl + ',';
								// console.log('uploadCount==' + uploadCount);
								if (uploadCount == this.imgList.length) {
									//移除最后的逗号
									this.pathologyUrl = this.pathologyUrl.substring(0, this.pathologyUrl.length - 1);
									this.submitRequest();
								}
							}

						},
					});
				}
			},
			submitRequest() {
				app.loading("保存中");
				app.savePatientInfo({
					patientName: this.patientName,
					patientGender: this.patientGender,
					phone: this.phone,
					illness: this.illness,
					height: this.height,
					weight: this.weight,
					detailList: projectList,
					age:this.age
				}).then(res => {
					app.loaded();
					uni.navigateTo({
						url: 'nutritional-self-test'
					});
				});

			},
			radioChange(e){
			    this.form.combination = e.detail.value;
			},
			radioreportChange(e){
			    this.form.sendReport = e.detail.value;
			},
			radiosexChange(e){
			    this.form.sex = e.detail.value;
			},
			radio3Change(e){
			    this.form.organTrans = e.detail.value;
			},
			radiotipChange(e){
			    this.form.isNeedInvoice = e.detail.value;
			},
			radiofapiaoChange(e){
			    this.form.isCompanyInvoice = e.detail.value;
			},
			/* 微信扫一扫 */
			wxScan(type){
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: (res)=>{
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						var finalRes = result.substring((result.lastIndexOf(",") + 1));
						if(type==0){
							this.form.sampleCode=finalRes;
						}else if(type==1){
							this.form.sampleCode2=finalRes;
						}else{
							this.form.sampleCode1=finalRes;
						}
					}
				});
			},
		},

	}
</script>

<style lang="scss" scoped>
	.changetext{position:relative;bottom:-4rpx;}
	.radioline{padding:6rpx 0;}
	.uploadimgbox{
		border-radius:10rpx;border:2rpx solid #ddd;margin:0 43rpx;
		.thead{line-height:2.5;padding:0 20rpx;background:#ddd;}
		.imgbox{padding:20rpx;}
		.upimgbox{
			border:2rpx solid #ccc;width:140rpx;height:140rpx;margin:10rpx 10rpx 0 0;
		}
	}
	.i-sex-content {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		align-items: center;
		padding-top: 30rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.i-sex-title {
			color: #272727;
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;

		}

		.i-sex-title1 {
			color: #272727;
			font-size: 32rpx;
			//font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;
			width: 100%;
			position: relative;

			.i-sex-title-close {
				position: absolute;
				left: 40rpx;
				top: -10rpx;
				font-size: 26rpx;
				color: #999999;
			}

			.i-sex-title-sure {
				position: absolute;
				right: 40rpx;
				top: -10rpx;
				font-size: 26rpx;
				color: #333333;
			}
		}

		.i-sex-item {
			color: #272727;
			font-size: 32rpx;
			padding: 20rpx;
			text-align: center;
			position: relative;

			.img {
				position: absolute;
				width: 26rpx;
				height: 26rpx;
				right: 80rpx;
				top: 30rpx;
			}
		}

		.line {
			border-bottom: 1rpx solid #DDDDDD;
		}

		.active {
			background-color: #F7F7F7;
		}
	}

	.i-picker-container {
		background-color: #FFFFFF;

		.uni-padding-wrap {
			display: flex;
			justify-content: space-between;
			padding: 15rpx 30rpx;
			border-bottom: 1rpx solid #cfcfcf;
			color: #52A29E;
			font-size: 32rpx;
		}

		.i-picker-content {
			height: 450rpx;
			text-align: center;
		}
	}

	.imagelist {
		width: 175rpx;
		height: 175rpx;
		margin-top: 12.5rpx;
		margin-left: 12.5rpx;
		background-color: #D2D2D2;
	}

	.remove-icon {
		position: absolute;
		width: 36rpx;
		height: 36rpx;z-index:2;
		right: 6rpx;
		top: 6rpx;
	}

	.container {
		.title {
			color: #000;
			font-size: 34rpx;font-weight:bold;
			margin:36rpx 44rpx 26rpx 26rpx;padding-left:20rpx;border-left:10rpx solid #007AFF;
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.name-box {
			display: flex;align-items: center;
			margin-left: 43rpx;
			margin-right: 43rpx;flex-wrap: wrap;
			// height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			position: relative;

			.name-tips {
				color: #333333;
				font-size: 30rpx;font-weight:bold;
				// height: 100rpx;
				line-height: 1;padding:40rpx 0;
				min-width: 130rpx;
			}

			.name-input {
				flex: 1;
				margin-left: 30rpx;
				color: #333333;height: unset;min-height: unset;
				font-size: 30rpx;padding:40rpx 0;
				// height: 100rpx;
				line-height: 1;
			}
			.textareainput{
				width: 100%;font-size: 30rpx;padding:10rpx 16rpx;border:2rpx solid #ddd;border-radius:10rpx;line-height: 40rpx;min-height:80rpx;margin:-10rpx 0 0rpx;
			}

			.name-novalue-input {
				margin-left: 30rpx;
				color: #555;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
			}



			.right-tip {
				position: absolute;
				color: #333333;
				font-size: 30rpx;
				right: 0;
				top: 30rpx;
			}
		}

		.sex-box {
			display: flex;align-items: center;
			margin-left: 43rpx;
			margin-right: 43rpx;flex-wrap: wrap;
			// height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;

			.sex-tips {
				color: #333333;
				font-size: 30rpx;font-weight:bold;
				// height: 100rpx;
				line-height: 1;padding:40rpx 0;
				min-width: 130rpx;
			}

			.sex-value {
				flex: 1;
				margin-left: 30rpx;
				color: #555;height: unset;min-height: unset;
				font-size: 30rpx;padding:40rpx 0;
				// height: 100rpx;
				line-height: 1;
			}

			.has-value {
				flex: 1;
				margin-left: 30rpx;
				color: #333333;height: unset;min-height: unset;
				font-size: 30rpx;padding:40rpx 0;
				// height: 100rpx;
				line-height: 1;
			}
		}

		.pic-title {
			color: #333333;
			font-size: 30rpx;
			padding-left: 43rpx;
			padding-top: 30rpx;
		}

		.pic-tip {
			font-size: 28rpx;
			color: #999999;
			padding-top: 20rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
		}

		.pic-content-box {
			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				// justify-content:space-between;
				margin-left: 44rpx;
				margin-right: 44rpx;

				.img-box-first {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					position: relative;
				}

				.img-box {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					margin-left: 31rpx;
					position: relative;
				}

			}

		}

		.upload-box {
			margin-top: 40rpx;
			margin-left: 44rpx;
			height: 60rpx;
			width: 210rpx;
			color: #59A29F;
			border: 2rpx solid #52A29E;
			text-align: center;
			line-height: 60rpx;
		}

		.button-box {
			margin-top: 100rpx;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #007AFF !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 34rpx;
			}
		}

		.popup-content {
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			font-size: 26rpx;

			.tips-title {
				margin-top: 60rpx;
				text-align: center;
				font-size: 34rpx;
				color: #333333;
			}

			.tips-common {
				margin-left: 50rpx;
				margin-right: 50rpx;
				color: #666666;
			}

			.tips-remind {
				margin-left: 50rpx;
				margin-right: 50rpx;
				color: #EA132D;
			}

			.agree-btn {
				text-align: center;
				background-color: #59A29F;
				color: #FFFFFF;
				font-size: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin-top: 20rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;
			}

			.disagree-btn {
				text-align: center;
				background-color: #999999;
				color: #FFFFFF;
				font-size: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin-top: 30rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;

			}
		}
	}
	.otherinput{flex: unset!important;}
</style>
