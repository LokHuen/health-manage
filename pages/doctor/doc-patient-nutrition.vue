<template>
	<!-- 患者营养管理界面 -->
	<view class="container">
		<view style="position: fixed;top:0;left:0;bottom:0;right:0;z-index:999;background:#fff;" v-show="!infoData.patientName" class="flex ct">{{nodata?"用户未完善资料":""}}</view>
		<view class="info-box">
			<image :src="infoData.portrait" mode="scaleToFill" class="avator"></image>
			<view class="user-msg-box">
				<view class="name flex" style="align-items:flex-end;">
					{{infoData.patientName||"游客"}}<view class="msg" style="padding:0 0 4rpx 16rpx;"> {{" "+(infoData.patientGender||"")+' '+((infoData.age || infoData.age!=0)?(infoData.age+'岁 '):'')}}
				</view> 
				</view>
				<view class="msg" style="padding-top:10rpx;">{{(infoData.illness||"")}} {{latelyData.result?(testtype==1?`${latelyData.result}(${latelyData.total}分)`:latelyData.result):""}} {{(latelyData.result&&latelyData.result!='营养良好')?(' '+infoData.isBuy):""}}
				</view>
			</view>
			<!-- <view class="eidt" @click="more" v-if="showAdvice==1">...</view> -->
			<view class="eidt">{{infoData.createTime}} 加入</view>
		</view>
		<view class="line-space"></view>
		<view class="content">
			<view class="function-box">
				<view class="function-item" v-for="(item,index) in list" :key="index" @click="clickFuction(index)">
					<image :src="item[0]" mode="widthFix" class="function-item-img"></image>
					<view class="function-item-title">{{item[1]}}</view>
				</view>
			</view>
		</view>
		<view class="line-space"></view>
		
		<view class="record-chart-box" v-if="(hasLoadLindData==0)||(lineData.categories.length>0 &&hasLoadLindData ==1)">
			<view class="record-chart-title">{{testtype==1?"PG-":""}}SGA营养状况评估</view>
			<view v-show="testtype==1" class="record-chart-subtitle">分值越小，营养状况越好</view>
		
			<!-- 折线Line纯数字-->
			<!-- <view class="line-chart-box">
				<line-chart class="line-chart" ref="lineData" canvasId="index_line_2" :dataAs="lineData" :splitNumber="splitNumber" />
			</view> -->
			<div id="echarts" class="echarts"></div>
			<view style="font-size:24rpx;padding:0 0 30rpx 40rpx;text-align:left;">
				<view v-show="testtype==1">
			<view ><text class="centerwh"><text class="smallblockleft color1"></text>0~1:无营养不良</text><text class="smallblockleft color2"></text>2~3:可疑营养不良 </view>
			<view ><text class="centerwh"><text class="smallblockleft color3"></text>4~8:中度营养不良</text><text class="smallblockleft color4"></text>>=9:重度营养不良</view>
				</view>
				<view v-show="testtype==2">
					<text class="centerwh1"><text class="smallblockleft color1" style="background-color:#a8cd97;"></text>营养良好</text>
					<text class="centerwh1"><text class="smallblockleft color2"></text>轻-中度营养不良</text>
					<text class="centerwh1"><text class="smallblockleft color3"></text>重度营养不良</text>
				</view>
			</view>
		</view>
		
		<!-- <view class="last-one" v-if="latelyData.result">最近一次评价</view>
		
		<view class="listContent" v-if="latelyData.result">
			<view class="health-list-item" @click="toanswerlist(latelyData)">
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" :src="latelyData.result=='营养良好'?'../../static/icon/smile.png':'../../static/icon/cry_icon.png'"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">{{latelyData.result}}</view>
					<view class="health-list-item-detail">{{latelyData.phase}}</view>
					<view class="health-list-item-time">{{'测评时间：'+latelyData.completeTime}}</view>
					<view class="line" v-if="showDetail"></view>
					<view class="advice-content">
						<rich-text :nodes="latelyData.content" v-if="showDetail"></rich-text>
					</view>
		
				</view>
				<image class="health-list-item-arrow" :src="showDetail?'../../static/icon/right_arrow_top.png':'../../static/icon/right_arrow.png'"
				 mode="widthFix" @click.stop="showDetailMessage" v-show="false"></image>
			</view>
		</view> -->
		<view class="line-space"></view>
		<view class="itemboxtitle">均衡饮食建议</view>
		<view class="health-msg-box" v-if="infoData.weight || infoData.standardWeight" style="padding-top: 6rpx;">
			<view class="health-list-box">
				<view class="health-list-item">
					<image src="../../static/doctor/weight.png" mode="widthFix" class="bodyimg"></image>
					<view class="top-title">体重</view>
					<view class="health-detail">
						<text style="font-size: 23px;">{{infoData.weight}}</text>kg
					</view>
				</view>
				<view class="health-list-item" style="border-color:#3FBACE;">
					<image src="../../static/doctor/height.png" mode="widthFix" class="bodyimg"></image>
					<view class="top-title">
						<view class="">身高</view>
						<!-- <image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="askIcon" @click="showComputing"></image> -->
					</view>
					<view class="health-detail">
						<text style="font-size: 23px;">{{infoData.height}}</text>cm
					</view>
				</view>

				<view class="health-list-item" style="border-color:#728DF6;">
					<image src="../../static/doctor/bmi.png" mode="widthFix" class="bodyimg"></image>
					<view class="top-title" @click="showBMITips">
						<view class="">BMI</view>
						<image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="askIcon" ></image>
					</view>
					<view class="health-detail">
						<text style="font-size: 23px;">{{infoData.bmi}}</text>
					</view>
					<!-- <view class="health-tips">
						{{infoData.normal==1?'属正常体重范围':'超出正常体重范围'}}
					</view> -->
				</view>

			</view>
			<view class="notice-box">
				<view class="notice-info">
					经典均衡饮食<view class="notice-text">恶性肿瘤患者膳食营养处方专家共识推荐</view>
				</view>
				<view class="flex">
					<view class="leftinfo">
						<view class="flex infolist">
							<view class="inforound"></view>
							{{'脂肪'+infoData.dailyFat+'g'}}
						</view>
						<view class="flex infolist">
							<view class="inforound bcolor2"></view>
							{{'蛋白质'+infoData.dailyProtein+'g'}}
						</view>
						<view class="flex infolist">
							<view class="inforound bcolor3"></view>
							{{'碳水化合物'+infoData.dailyCarbonHydrate+'g'}}
						</view>
					</view>
					<view class="rightinfo">
						<view @click="showEnergyTips" style="font-size:26rpx;"><text style="font-size:46rpx;">{{infoData.dailyEnergy}}</text>kcal<image
							 src="../../static/icon/wenhaoIcon.png" mode="widthFix" style="width:24rpx;"></image>
						</view>
						<view class="mintext">建议每日总能量</view>
					</view>
				</view>
			</view>
		<view class="line-space"></view>
		<view class="itemboxtitle">患者饮食记录</view>
		<view class="flex choosedaybox">
			<view v-for="(item,index) in daytab" :key="index" :class="dayindex==index?'daylist on':'daylist'" @click="clickday(index)" style="">{{item}}</view>
		</view>
		<view v-if="dayindex==0">
			<view class="prelative " style="">
					<view class="blockbox">
						<view class="blockbigbox flex">
							{{infoData.dietCalories}}
							<view class="smfont pabs20">总能量已摄入</view>
							<view class="smfont pabs0">0</view>
							<view class="smfont pabs10">{{infoData.dailyEnergy}}</view>
							<view v-for="(item,index) in 25" :key="index" :class="'greenline position'+(index+1)+' '+(index<greenindex?'green':'')"></view>
						</view>
						<view>单位：千卡</view>
					</view>			
			</view>
			<view class="prelative marlr20" style="">
				<div id="threeecharts" class="echarts" style="height:70vw;width:95vw;"></div>
				<view class="flex blocklistbox">
					<view class="blockgreen"></view>
					建议摄入值
					<view class="blockblue"></view>
					<view click="$refs.leavepopup.open()">实际摄入</view>
					<!-- <image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="askIcon" @click="$refs.leavepopup.open()"></image> -->
				</view>
				
			</view>
		</view>
		<view v-if="dayindex!=0">
			
			<view class="prelative marlr20" style="margin-bottom:80rpx;">
				<block v-if="tlinedata.dietList&&tlinedata.dietList[0]">
				<view class="flex" style="padding:0 0 15rpx 10rpx;">摄入:
					<view v-for="(item,index) in enptylist" :class="enptyindex==index?'enptylist on':'enptylist'" @click="clickenpty(index)">{{item}}</view>
				</view>
				<div id="line71echarts" class="echarts"></div>
				</block>
				<block v-if="tlinedata.dietList&&!tlinedata.dietList[0]">
					<view class="flex" style="padding:0 0 15rpx 10rpx;">摄入:
					</view>
					<view class="nodatabox">
						<image src="../../static/patient/nodata.png" mode="widthFix" class="nodata"></image>
						<view>暂时没有数据</view>
					</view>
				</block>
				<view style="padding:0 0 15rpx 10rpx;margin-top:45rpx;">运动消耗能量：</view>
				<block v-if="tlinedata.exerciseList&&tlinedata.exerciseList[0]">
				<div id="line72echarts" class="echarts"></div>
				</block>
				<block v-if="tlinedata.exerciseList&&!tlinedata.exerciseList[0]">
					<view class="nodatabox">
						<image src="../../static/patient/nodata.png" mode="widthFix" class="nodata"></image>
						<view>暂时没有数据</view>
					</view>
				</block>
			</view>
			
		</view>
		<view class="item-list" @click="tofooddetail">
			<view class="left-name">查看患者饮食详情</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
		</view>
		<view class="line-space"></view>
		<view class="itemboxtitle">营养干预情况</view>
		<view class="goodsbox">
			<view class="buggoodslist" v-for="(item,index) in infoData.orderList" :key ="index" >
				<view class="ltime">{{item.createTime}}</view>
				<view v-for="(item1,index1) in item.orderDetailList" :key ="index1">
					<view class="lname">{{item1.shortName}}（{{item1.quantity}}盒）</view>
					<view class="linfo">{{item1.usages}}</view>
				</view>
			</view>
			<view v-if="!infoData.orderList.length" class="pagenodata">暂无干预记录</view>
		</view>
		<!-- <view class="flex ct bottomtip">
			<image src="../../static/doctor/warn.png" mode="widthFix" class="tips" ></image>干预情况依据本平台数据判断，存在局限性
		</view> -->
		<view class="line-space"></view>
		<view class="itemboxtitle">医嘱记录</view>
		<view class="recordbox">
			<scroll-view scroll-y="true" style="max-height:1000rpx;">
				<view :class="(index==recordList.length-1)?'MA-record-list1 flex':'MA-record-list flex'" v-for="(item,index) in recordList" :key ="index" v-if="recordList.length>0">
					<image src="../../static/doctor/email.png" mode="widthFix" class="recordimg" ></image>
					<view style="flex:1;">
						<view class="record-content">{{item.advice}}</view>
						<view class="record-time-box">
							<view class="record-time">{{item.createTime}}</view>
							<view class="record-motify" @click="motifyAdvice(item)">复制</view>
						</view>
					</view>
				</view>
				<view v-if="!recordList.length" class="pagenodata">暂无数据</view>
			</scroll-view>
		</view>
		<view style="height:200rpx;background:#F7F8F8;"></view>
		</view>

		

		<view class="button-box flex">
			<button type="default" class="button" @click="beginTest" v-show="showAdvice==1">发送医嘱</button>
			<view class="button btother" @click="moreOnClick">更多功能</view>
		</view>
		<!-- <view style="height: 200px;"></view> -->
		<uni-popup ref="popup" type="bottom">
			<!-- 标准体重计算方法 -->
			<view class="white-background">
				<view class="white-background-title">标准体重计算方法</view>
				<view class="white-background-subtitle">标准体重=身高（cm）-105</view>
				<view class="white-background-line-space"></view>
				<view class="white-background-close" @click="closdComputing">关闭</view>
			</view>
		</uni-popup>

		<uni-popup ref="popupBMI" type="bottom">
			<!-- BMI -->
			<view class="white-background-BMI">
				<view class="white-background-BMI-title">BMI</view>
				<view class="white-background-BMI-des">BMI一般指身体质量指数，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。</view>
				<view class="white-background-BMI-des2">BMI=体重（kg）除以身高（m）的平方</view>
				<view class="white-background-BMI-line-space"></view>
				<view class="white-background-BMI-close" @click="closeBMITips">关闭</view>
			</view>
		</uni-popup>

		<uni-popup ref="popupEnergy" type="bottom">
			<!-- 能量说明 -->
			<view class="white-background-energy">
				<view class="white-background-energy-title">能量值说明</view>
				<view class="white-background-energy-desc-title">
					根据恶性肿瘤患者膳食营养处方专家共识
				</view>
				<view class="white-background-energy-desc">
					1. 每日总能量按每天30kcal/kg计算，每日总能量=体重（kg）×30kcal/kg
				</view>
				<view class="white-background-energy-desc">
					2. 脂肪按总能量的30%计算，脂肪=每日总能量×30%÷9kcal/g
				</view>
				<view class="white-background-energy-desc">
					3.蛋白质按1.5g/(kg.d)计算，蛋白质=体重（kg）×1.5g/(kg.d)×1d
				</view>
				<view class="white-background-energy-desc">
					4.碳水化合物=（每日总能量-脂肪×9kcal/g-蛋白质×4kcal/g）÷4kcal/g
				</view>
				<view class="white-background-energy-space-white"></view>
				<view class="white-background-energy-space-gray"></view>
				<view class="white-background-energy-close" @click="closeEnergyTips">关闭</view>
			</view>
		</uni-popup>
        <uni-popup ref="popupMedicalAdvice" type="bottom" @change="medicalAdviceChange"> 
		<view class="white-bg-MA" v-if="!writeRecord">
			<view class="MA-title" v-if="recordList.length>0">{{recordList.length+'条记录'}}</view>
			<scroll-view scroll-y="true" style="max-height:500rpx;">
				<view :class="(index==recordList.length-1)?'MA-record-list1':'MA-record-list'" v-for="(item,index) in recordList" :key ="index" v-if="recordList.length>0">
					<view class="record-content">{{item.advice}}</view>
					<view class="record-time-box">
						<view class="record-time">{{item.createTime}}</view>
						<view class="record-motify" @click="motifyAdvice(item)">复制</view>
					</view>
				</view>
			</scroll-view>
			
			<view class="MA-title" v-if="recordList.length==0">暂无记录</view>
			<view class="MA-space" v-if="recordList.length==0"></view>
			<view class="MA-line"></view>
			<view class="MA-send" @click="sendAdvice">发送医嘱</view>
			<view class="MA-close" @click="closeRecord">关闭</view>
		</view>
		
		<view class="white-bg-MA-write" v-if="writeRecord">
			<view class="MA-write-top">
				<image src="../../static/icon/turnback_icon.png" mode="widthFix" class="turnback" @click="turnbcak"></image>
				<image src="../../static/icon_close.png" mode="widthFix" class="close-write" @click="closeRecord"></image>
			</view>
			<textarea placeholder="请填写医嘱内容" class="textarea" v-model="advice" />
			<view class="MA-write-sure" @click="writeAdvice">确定</view>
			<view class="MA-write-tips">发送后，患者会即时收到医嘱内容</view>
		</view>
		     
		</uni-popup>
		
		<uni-popup ref="leavepopup" type="bottom">
			<!-- 留存值 -->
			<view class="white-background">
				<view style="padding:60rpx 30rpx;text-align:left;">
					<view style="text-align:center;">留存值=摄入值-运动消耗值</view>
					
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popupPatient" type="bottom">
			<!-- 选择患者 -->
			<view class="white-background-patient">
				<scroll-view scroll-y="true" style="max-height: 650rpx;">
					<view v-for="(item,index) in doctorList" :key=index>
						<view class="first-item" @click="selectInfo(item)">{{item.doctorName+item.technicalTitle}}</view>
						<view class="lines"></view>
					</view>
				</scroll-view>
				<view class="liness"></view>
				<view class="cancel" @click="closePatienScreen">取消</view>
			</view>
		</uni-popup>
		
		
		
		<uni-popup ref="pop1" type="bottom">
			<!-- 更多功能 -->
			<view class="white-background-pop1">
				<view class="white-background-pop1-title">
					更多功能
					<image src="../../static/icon_close.png" mode="aspectFill" @click="closeMore" class="close"></image>
				</view>
				<view class="transferButton" @click="transfer">将患者转给同科室的医生</view>
				<view style="height: 260rpx;"></view>
				
			</view>
		</uni-popup>
		
		
		<uni-popup ref="doctorPop" type="bottom">
			<!-- 更多功能 -->
			<view class="white-background-doctorPop">
				<view class="white-background-doctorPop-title">
					将患者转给同科室的医生
					<image src="../../static/icon/turnback_icon.png" mode="aspectFill" @click="closeDoctorPop" class="close"></image>
				</view>
				<scroll-view scroll-y="true" style="max-height:600rpx;margin-top: 20rpx;">
					<view class="docItem" v-for="(item,index) in doctorList" :key="index" @click="selectDoc(index)">
				    {{item.doctorName+item.technicalTitle}}
					<image src="../../static/icon/chose_icon1.png" mode="aspectFill" class="doctorSelect"  v-show="item.select==1"></image>
					</view>
				</scroll-view>
				<view class="sureBtn" @click="sureTransfer">确定</view>
				<view style="height: 60rpx;"></view>
				
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	const app = getApp();
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	import echarts from '../../plugins/echarts';
	export default {
		components: {
			LineChart,
		},
		data() {
			return {
				isMy:true, //是否我的病人
				nodata:false,
				latelyData: {},
				infoData: {},
				list: [
					["/static/icon/baseInfoicon.png", "基础信息"],
					["/static/icon/bingliMangmenticon.png", "病例管理"],
					["/static/icon/testRecordIcon.png", "测评记录"],
					["/static/icon/food.png", "饮食配餐"]
				],
				lineData: {
					//数字的图--折线图数据
					categories: [],
					series: [{
						data: [],
						name: ''
					}]
				},
				showDetail: true,
				hasLoadLindData: 0,
				splitNumber: 5,
				uid: 1,
				recordList:[],
				writeRecord:false,
				advice:'',
				adviceId:1,
				daytab: ["今日","近7天", "近30天"],
				dayindex: 0,
				greenindex:20,
				enptylist:["总能量","脂肪","蛋白质","碳水化合物"],
				enptyindex:0,
				tlinedata:{},
				testtype:1,
				doctorList:'',
				showAdvice:1,
				goodslist:[],
			}
		},
		onLoad(props){
			this.uid = props.id;
		},
		methods: {
			sureTransfer(){
				let transferId = '';
				for (var i = 0; i < this.doctorList.length; i++) {
					 if(this.doctorList[i].select==1){
						 transferId = this.doctorList[i].id;
					 }
				}
				if(!transferId){
					app.tip('请选择转交的医生');
					return;
				}
				app.changeBindDoctor({patientId:this.uid,id:transferId}).then(res =>{
					if(res.status == 1){
						app.tip('转交成功');
						this.closeDoctorPop();
						uni.navigateBack({});
						this.getData();
					}
				});
				
			},
			selectDoc(index){
				for (var i = 0; i < this.doctorList.length; i++) {
					this.doctorList[i].select = index==i?1:0;
				}
				this.$forceUpdate()
			},
			closeDoctorPop(){
				for (var i = 0; i < this.doctorList.length; i++) {
					this.doctorList[i].select = 0;
				}
				this.$refs.doctorPop.close();
				this.$forceUpdate();
			},
			transfer(){
				this.closeMore();
				if(!this.isMy){
					app.tip("您不是患者所属医生");return;
				}
				this.$refs.doctorPop.open();
			},
			moreOnClick(){
				this.$refs.pop1.open();
			},
			closeMore(){
				this.$refs.pop1.close();
			},
			selectInfo(item){
				app.changeBindDoctor({patientId:this.uid,id:item.id}).then(res =>{
					if(res.status == 1){
						app.tip('转交成功');
						this.closePatienScreen();
						this.getData();
					}
				});
			},
			closePatienScreen(){
				this.$refs.popupPatient.close();
			},
			more(){
				uni.showModal({
				    title: '提示',
				    content: '将患者转给其他医生？',
				    success: (res)=>{
				        if (res.confirm) {
				            this.$refs.popupPatient.open();
				        } 
				    }
				});
			    
			},
			getDepartmentDoctors(){
			  app.getDepartmentDoctors().then(res =>{
				 if(res.status == 1){
					 this.doctorList = res.data;
					 for (var i = 0; i < this.doctorList.length; i++) {
					 	this.doctorList[i].select = 0;
					 }
				 } 
			  });	
			},
			clickenpty(index){
				this.enptyindex = index;
				this.$nextTick(() => {
					this.settwolinebox();
				})
			},
			clickday(index) {
				this.dayindex = index;
				switch (index) {
					case 0:this.getData();
						break;
					case 1:
						this.gettwolinedata(() => {
							this.$nextTick(() => {
								this.settwolinebox();
								this.settwolinebox1();
							})
						})
						break;
					case 2:
						this.gettwolinedata(() => {
							this.$nextTick(() => {
								this.settwolinebox();
								this.settwolinebox1();
							})
						})
						break;
				}
			},
			gettwolinedata(cal){ //近7天数据
				app.statTemplate({type:this.dayindex,uid:this.uid}).then(res => {
					// if(res.data.dietList) res.data.dietList.reverse();
					// if(res.data.exerciseList) res.data.exerciseList.reverse();
					this.tlinedata = res.data;
					cal();
				});
			},
			settwolinebox() { //近7天图1
				let list = this.tlinedata.dietList;
				let xdata=[],linedata=[];
				if(list.length==0) return;
				for (var i = 0; i < list.length; i++) {
					let date = list[i].cDate.split("-");
					xdata.push(date[1] + "/" + date[2]);
					let onedata = "";
					switch(parseInt(this.enptyindex)){
						case 0:onedata = list[i].sum;break;
						case 1:onedata = list[i].fat;break;
						case 2:onedata = list[i].protein;break;
						case 3:onedata = list[i].carbohydrate;break;
					}
					linedata.push(onedata);
				}
				let mindata = Math.min(...linedata);
				// let maxdata = Math.max(...linedata);
				var myChart = echarts.init(document.getElementById('line71echarts'));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '3%',
						right: '3%',
						bottom: '4%',
						top: '10%',
						containLabel: true,
					},
					xAxis: {
						type: 'category',
						axisLabel: {
							fontSize: 10
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
							alignWithLabel: true
						},
						data: xdata
					},
					yAxis: {
						show:true,
						name: this.enptyindex==0?"千卡 ":"g ",
						// nameLocation:"start",
						nameGap:10,
						nameTextStyle:{
							fontSize:10,
							color:"#666",
							align:"right"
						},
						axisLabel: {
							fontSize: 10,
						},
						axisLine: {
							// show: true
						},
						// min: mindata>3.5?3.5:mindata,
						// max: maxdata>11?maxdata:11,
						axisTick: {
							// show: true
						},
						type: 'value',
						splitLine: {
							show: true,
							lineStyle:{type:"dashed"}
						},
						scale: true,
			
					},
					series: [{
						name: this.enptylist[this.enptyindex],
						type: 'line',
						symbolSize: 7,
						label: {
							normal: {
								show: true,
								distance: 0,
								fontSize: 11,
								color: "#333",
								formatter: (opt) => { //设置拐点文字颜色
									// if (opt.value > 11.1||opt.value<3.9) return '{a|' + opt.value + '}';
								},
								rich: {
									a: {
										color: 'red',
									}
								}
							},
			
						},
						lineStyle: {
							color: "#979797", //设置线条颜色
							width: 1,
						},
						itemStyle: {
							color: (opt) => { //设置拐点颜色
								// if (opt.value > 11.1||opt.value<3.9) return "red";
								// else 
								return "#59A29F";
							},
						},
						symbol: "circle",
						data: linedata,
						markArea: { //标记区域
							// data: [
							// 	[{
							// 		yAxis: '3.9', //y轴坐标控制
							// 		itemStyle: {
							// 			color: '#DCF4E7'
							// 		},
							// 	}, {
							// 		yAxis: '6.1'
							// 	}],
							// 	[{
							// 		yAxis: '6.1',
							// 		itemStyle: {
							// 			color: '#DAF2FF'
							// 		}
							// 	}, {
							// 		yAxis: '11.1'
							// 	}]
							// ]
						},
					}]
				};
			
				// 使用刚指定的配置项和数据显示图表。
				myChart.clear();
				myChart.setOption(option);
			},
			settwolinebox1() { //近7天图2
				let list = this.tlinedata.exerciseList;
				let xdata=[],linedata=[];
				if(list.length==0) return;
				for (var i = 0; i < list.length; i++) {
					let date = list[i].cDate.split("-");
					xdata.push(date[1] + "/" + date[2]);
					linedata.push(list[i].sum);
				}
				let mindata = Math.min(...linedata);
				// let maxdata = Math.max(...linedata);
				var myChart = echarts.init(document.getElementById('line72echarts'));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '3%',
						right: '3%',
						bottom: '4%',
						top: '10%',
						containLabel: true,
					},
					xAxis: {
						type: 'category',
						axisLabel: {
							fontSize: 10
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
							alignWithLabel: true
						},
						data: xdata
					},
					yAxis: {
						show:true,
						name: "千卡 ",
						// nameLocation:"start",
						nameGap:10,
						nameTextStyle:{
							fontSize:10,
							color:"#666",
							align:"right"
						},
						axisLabel: {
							fontSize: 10,
						},
						axisLine: {
							// show: true
						},
						// min: mindata>3.5?3.5:mindata,
						// max: maxdata>11?maxdata:11,
						axisTick: {
							show: false
						},
						type: 'value',
						splitLine: {
							show: true,
							lineStyle:{type:"dashed"}
						},
						scale: true,
			
					},
					series: [{
						name: '能量',
						type: 'line',
						symbolSize: 7,
						label: {
							normal: {
								show: true,
								distance: 0,
								fontSize: 11,
								color: "#333",
								formatter: (opt) => { //设置拐点文字颜色
									// if (opt.value > 11.1||opt.value<3.9) return '{a|' + opt.value + '}';
								},
								rich: {
									a: {
										color: 'red',
									}
								}
							},
			
						},
						lineStyle: {
							color: "#979797", //设置线条颜色
							width: 1,
						},
						itemStyle: {
							color: (opt) => { //设置拐点颜色
								// if (opt.value > 11.1||opt.value<3.9) return "red";
								// else 
								return "#59A29F";
							},
						},
						symbol: "circle",
						data: linedata,
						markArea: { //标记区域
							// data: [
							// 	[{
							// 		yAxis: '3.9', //y轴坐标控制
							// 		itemStyle: {
							// 			color: '#DCF4E7'
							// 		},
							// 	}, {
							// 		yAxis: '6.1'
							// 	}],
							// 	[{
							// 		yAxis: '6.1',
							// 		itemStyle: {
							// 			color: '#DAF2FF'
							// 		}
							// 	}, {
							// 		yAxis: '11.1'
							// 	}]
							// ]
						},
					}]
				};
			
				// 使用刚指定的配置项和数据显示图表。
				myChart.clear();
				myChart.setOption(option);
			},
			settiaoxingbox() { //柱状图
				
				var myChart = echarts.init(document.getElementById('threeecharts'));
				var option = {
				    color: ['#dddddd','#52A29E'],
				    tooltip: {
				        trigger: 'axis',
				    },
				    grid: {
						top:"5%",
				        left: '-5%',
				        right: '3%',
				        bottom: '5%',
				        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
							axisLabel:{fontSize:10},
				            data: ["碳水化合物","脂肪","蛋白质"],//xdata,
				            axisTick: {
								show: false,
				                alignWithLabel: true
				            }
							
				        }
				    ],
				    yAxis: [
				        {
							show:false,
				            type: 'value',
							axisLabel:{fontSize:10},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
				        }
				    ],
				    series: [
				        {
				            name: '建议摄入值',
				            type: 'bar',
				            barWidth: '20%',
				            data: [this.infoData.dailyCarbonHydrate,this.infoData.dailyFat,this.infoData.dailyProtein],//linedata,
							label: {
								normal: {
									show: true,
									fontSize: 10,
									color: "#333",
									position: 'top',
									formatter:(opt)=>{
										return opt.value+"g";
									}
								},
							
							},
				        },
						{
						    name: '留存值',
						    type: 'bar',
						    barWidth: '20%',
						    data: [this.infoData.carbohydrate,this.infoData.fat,this.infoData.protein],//linedata,
							barGap:"40%",
							label: {
								normal: {
									show: true,
									distance:3,
									fontSize: 10,
									color: "#52A29E",
									position: 'top',
									formatter:(opt)=>{
										if(opt.value==1.01) return "";
										return opt.value+"g";
									}
								},
							},
						}
				    ]
				};
				myChart.clear();
				myChart.setOption(option);
			},
			medicalAdviceChange(e){
				if(e.show == false){
					this.writeRecord = false;
					this.advice = '';
				}
			},
			motifyAdvice(item){
				let oInput = document.createElement('input');
				oInput.value = item.advice;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				oInput.remove();
				app.tip("复制成功")
				// this.advice = item.advice;
				// this.adviceId = "";//item.id;
				// this.writeRecord = !this.writeRecord;
			},
			writeAdvice(){
				if(!this.advice){
					app.tip('请填写建议');
					return;
				}
				if(app.getCache('uid')!=this.infoData.bindDoctor){
					app.tip('您不是该患者所属医生');return;
				}
				app.saveAdvice({id:this.adviceId,advice:this.advice,patientId:this.uid,creatorId:app.getCache('uid')}).then(res =>{
					if(res.status ==1){
						app.tip('发送成功');
						this.writeRecord = !this.writeRecord;
						this.advice = '';
						//this.beginTest();
					}
				});
			},
			turnbcak(){
				this.writeRecord = !this.writeRecord;
				this.advice = '';
			},
			sendAdvice(){
				this.adviceId = '';
				this.writeRecord = !this.writeRecord;
			},
			beginTest() {
				// app.adviceListRequest({patientId:this.uid}).then(res=>{
				//     if(res.status == 1){
				// 		this.recordList = res.data;
				// 	}
					
				// });
				if(!this.isMy){
					app.tip("您不是患者所属医生");return;
				}
				uni.navigateTo({
					url:'send-advice?uid='+this.uid
				})
			},
			getTest() {
				app.adviceListRequest({patientId:this.uid}).then(res=>{
				    if(res.status == 1){
						this.recordList = res.data;
					}
				});
			},
		    closeRecord(){
				this.$refs.popupMedicalAdvice.close();
				this.writeRecord = false;
				this.advice = '';
				
			},
			clickFuction(index) {
				if (index == 0) {
					if(!this.infoData.weight){
						app.tip('患者暂未完善信息');
						return;
					}
					//基础信息
					uni.navigateTo({
						url: 'doc-patient-basic-information?id='+this.uid 
					});
				} else if (index == 1) {
					//病例管理
					uni.navigateTo({
						url: 'doc-patient-case-manage?patientId='+this.uid
					});
				}else if (index == 2){
					//测评记录
					uni.navigateTo({
						url:'doc-evaluation-record?id='+this.uid
					});
				}else{
					uni.navigateTo({
						url: '/pages/diet/diet-catering?id='+this.uid
					});
				}

			},
			showDetailMessage() {
				this.showDetail = !this.showDetail;
			},
			showComputing() {
				this.$refs.popup.open();
			},
			closdComputing() {
				this.$refs.popup.close();
			},
			showBMITips() {
				this.$refs.popupBMI.open();

			},
			closeBMITips() {
				this.$refs.popupBMI.close();
			},
			showEnergyTips() {
				this.$refs.popupEnergy.open();
			},
			closeEnergyTips() {
				this.$refs.popupEnergy.close();
			},
			
			getUserData() {
				this.getData();
				this.getNearlyRecord();
				this.getLineChartData();
				
				app.getSgaType({uid: this.uid}).then(res => {
					if (res.status == 1) {
						this.testtype = res.data.sgaType;
						if(this.testtype==2){
							this.getNearlyRecord();
							this.getLineChartData();
						}
					}
				});
				
			},
			//用户信息数据
			getData() {
				app.doctorPatientx({id:this.uid}).then(res => {
					if (res.status == 1) {
						for (let i = 0; i < res.data.orderList.length; i++) {
							res.data.orderList[i].createTime = res.data.orderList[i].createTime.split(" ")[0];
						}
						res.data.createTime = res.data.createTime?res.data.createTime.split(" ")[0]:"";
						this.infoData = res.data;
					}
					this.showAdvice = 1;
					if(!this.infoData.patientName) this.nodata = true;
					this.isMy = localStorage.getItem("uid")==this.infoData.bindDoctor;
					this.infoData.protein = this.infoData.protein>0?this.infoData.protein:1.01;
					this.infoData.fat = this.infoData.fat>0?this.infoData.fat:1.01;
					this.infoData.carbohydrate = this.infoData.carbohydrate>0?this.infoData.carbohydrate:1.01;
					this.$nextTick(() => {
						this.settiaoxingbox();
					})
					let gindex = parseFloat(this.infoData.dietCalories/this.infoData.dailyEnergy*25);
					this.greenindex = 0;
					let ghandler = setInterval(()=>{
						if(this.greenindex<gindex) ++this.greenindex;
						else clearInterval(ghandler);
					},50)
					this.getTest();
				});
			},
			//最近一次测评的数据
			getNearlyRecord() {
				app.patientNearlyRecord({
					surveyId: this.testtype,
					userId:this.uid
				}).then(res => {
					if (res.status == 1) {
						this.latelyData = res.data;
						if (this.latelyData.content) this.latelyData.content = this.latelyData.content.replace(/\<span/gi,
							'<span class="richtext"');
					}

				});
			},
			//拿曲线图的数据
			getLineChartData() {
				app.memberReplyRecordList({
					surveyId: this.testtype,
					pageNo: 1,
					userId:this.uid
				}).then(res => {
					if (res.status == 1) {
						this.lineData.categories = [];
						this.lineData.series[0].data = [];
						let tempArray = []
						if (res.data && res.data.length > 0) {
							res.data.reverse()
							res.data.forEach((item, index) => {
								var time = item.completeTime.split('/');
								var date = time[2].split(' ');
								this.lineData.categories.push(time[1] + '月' + date[0] + '日');
								//this.lineData.categories.push(item.phase);
								this.lineData.series[0].data.push(item.total)
								this.lineData.series[0].name = item.phase
							})
							console.log(this.lineData);
							this.$nextTick(()=>{
								this.setlinebox();
							})
							// this.$refs['lineData'].showCharts();
						}
						this.hasLoadLindData = 1;
					}

				});
			},
			setlinebox() { //折线图
				var myChart = echarts.init(document.getElementById('echarts'));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '0%',
						right: '3%',
						bottom: '6%',
						top: '8%',
						containLabel: true,
					},
					xAxis: {
						type: 'category',
						axisLabel:{fontSize:10},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
							alignWithLabel: true
						},
						data: this.lineData.categories,
					},
					yAxis: {
						show:false,
						name:"",
						axisLabel:{fontSize:10},
						axisLine: {
							show: false
						},
						min: 0,
						max:36,
						axisTick: {
							show: false
						},
						type: 'value',
						splitLine: {
							show: false
						},
						scale: true,
			
					},
			
					series: [{
						name: '',
						type: 'line',
						symbolSize: 7,
						label: {
							normal: {
								show: this.testtype==1?true:false,
								distance: 0,
								fontSize: 11,
								color: "#333",
								formatter: (opt) => { //设置拐点文字颜色
									if (opt.value > 9) return '{a|' + opt.value + '}';
								},
								rich: {
									a: {
										color: 'red',
									}
								}
							},
			
						},
						lineStyle: {
							color: "#59A29F", //设置线条颜色
							width:1,
						},
						itemStyle: {
							color: (opt) => { //设置拐点颜色
								if (opt.value > 9) return "red";
								else return "#59A29F";
							},
						},
						symbol: "circle",
						data: this.lineData.series[0].data,
						markArea: { //标记区域
							data: [
								[{
									yAxis: '0', //y轴坐标控制
									itemStyle: {
										color: '#52a29e'
									},
								}, {
									yAxis: '1'
								}],
								[{
									yAxis: '1',
									itemStyle: {
										color: '#ffcf76'
									}
								}, {
									yAxis: '3'
								}],
								[{
									yAxis: '3',
									itemStyle: {
										color: '#ffe1e1'
									}
								}, {
									yAxis: '9'
								}],
								[{
									yAxis: '9',
									itemStyle: {
										color: '#b7c8e3'
									}
								}, {
									yAxis: '36'
								}],
							]
						},
					}]
				};
				if(this.testtype==2){
					option.yAxis.min = 0.5;
					option.yAxis.max = 3.5;
					option.series[0].markArea.data=[
								[{
									yAxis: '0.5', //y轴坐标控制
									itemStyle: {
										color: '#a8cd97'
									},
								}, {
									yAxis: '1.5'
								}],
								[{
									yAxis: '1.5',
									itemStyle: {
										color: '#ffcf76'
									}
								}, {
									yAxis: '2.5'
								}],
								[{
									yAxis: '2.5',
									itemStyle: {
										color: '#ffe1e1'
									}
								}, {
									yAxis: '3.5'
								}],
							]
				}
				// 使用刚指定的配置项和数据显示图表。
				myChart.clear();
				myChart.setOption(option);
			},
			toanswerlist(val){
				uni.navigateTo({
					url:"/pages/patient/answer?id="+val.id+"&testtype="+val.surveyId
				})
			},
			tootherpage(src){
				uni.navigateTo({
					url:src
				})
			},
			tofooddetail(){
				uni.navigateTo({
					url:"/pages/doctor/dietDetail?id="+this.uid
				})
			},
		},
		onShow() {
			this.getUserData();
			this.getDepartmentDoctors();
		},
		
	}
</script>

<style lang="scss" scoped>
	.recordbox{
		margin:0 50rpx;
		.recordimg{width:30rpx;margin:8rpx 12rpx 0 0;}
		.MA-record-list{
			margin-top: 30rpx;
			padding-bottom: 30rpx;align-items:flex-start;
			border-bottom: 1rpx solid #E5E5E5;
			&:first-child{margin-top:6rpx;}
		}
		.MA-record-list1{
			margin-top: 30rpx;align-items:flex-start;
			padding-bottom: 30rpx;			
		}
		
		.record-content{
			color: #333333;
			font-size: 28rpx;
		}
		.record-time-box{
			display: flex;
			margin-top: 15rpx;
			.record-time{
				font-size: 14px;
				color: #999999;
			}
			.record-motify{
				font-size: 14px;
				color: #666666;
				margin-left: 25rpx;
			}
		}
		
		.MA-line{
			margin-top: 30rpx;
			background-color: #F6F6F6;
			height: 20rpx;
		}
		.MA-send{
			text-align: center;
			height: 104rpx;
			line-height: 104rpx;
			color: #52A29E;
			font-size: 15px;
			border-bottom: 2rpx solid #E5E5E5;
		}
	}
	.goodsbox{
		margin:0 50rpx;
		.buggoodslist{
			padding-bottom:30rpx;margin-bottom:30rpx;border-bottom: 1rpx solid #DCDCDC;
			.ltime{font-size: 26rpx;color: #999999;}
			.lname{padding:20rpx 0;font-size: 30rpx;font-weight: 600;color: #333333;}
			.linfo{font-size: 26rpx;color: #666666;}
			&:last-child{border:none;margin:0;}
		}
	}
	.bottomtip{
		padding:30rpx 0;font-size:26rpx;color:#999;
		.tips {
			width: 26rpx;margin-right:8rpx;
			height: 26rpx;
		}
	}
	
	.item-list{
		height: 106rpx;margin:0rpx 30rpx;
		position: relative;border-top: 1rpx solid #eee;
		.left-name{
			height: 106rpx;
			line-height: 106rpx;
			font-size: 15px;
			color: #333333;
			padding-left: 26rpx;
		}
		.right-arrow{
			position: absolute;
			right: 20rpx;
			width: 15rpx;
			height: 26rpx;
			top: 40rpx;
			
		}
	}
	.itemboxtitle{line-height:100rpx;text-align:center;font-size: 36rpx;font-weight: 600;color: #333333;padding-top:10rpx;}
	.white-background-patient {
		text-align: center;
		background-color: #FFFFFF;
		border-radius: 10px 10px 0px 0px;
		color: #333333;
		font-size: 15px;
	
		.first-item {
			height: 120rpx;
			line-height: 120rpx;
		}
	
		.lines {
			height: 2rpx;
			margin-left: 200rpx;
			margin-right: 200rpx;
			background-color: #DCDCDC;
		}
	
		.second-item {
			height: 128rpx;
			line-height: 128rpx;
		}
	
		.liness {
			height: 20rpx;
			background-color: #F6F6F6;
		}
	
		.cancel {
			height: 100rpx;
			line-height: 100rpx;
		}
	}
	.smallblockleft{width:20rpx;height:20rpx;border-radius:4rpx;margin:0 10rpx 0 8rpx;display: inline-block;background:#4CD964;
		&.color1{background:#52a29e;}
		&.color2{background:#ffcf76;}
		&.color3{background:#ffe1e1;}
		&.color4{background:#b7c8e3;}
	}
	.actionlist{
		margin:0 38rpx 38rpx;
		.sportitem{
			width:281.8rpx;margin-left:8rpx;box-shadow: 1px 2px 19px 2px rgba(192, 192, 192, 0.3);justify-content:center;height:172.3rpx;
			image{width:74rpx;margin-right:20rpx;}
		}
		.leftaction{
			box-shadow: 1px 2px 19px 2px rgba(192, 192, 192, 0.3);justify-content:center;height:83rpx;width:100%;
			&.mrbt{margin-bottom:6rpx;}
			image{width:38rpx;margin-right:20rpx;
				&.other{width:28rpx;margin:0 24rpx 0 6rpx;}
			}
			
		}
	}
	.marlr20{margin:0 20rpx;}
	.enptylist{
		padding-left:24rpx;
		&.on{color:#52A29E;}
	}
	.blocklistbox{
		font-size:26rpx;color:#555;padding:0 0 40rpx 20rpx;
		.blockgreen{width:16rpx;height:16rpx;background:#ddd;margin-right:8rpx;}
		.blockblue{width:16rpx;height:16rpx;background:#52A29E;margin:0 8rpx 0 60rpx;}
	}
	.blockbox{
		text-align:center;
		padding:60rpx 0;
		.blockbigbox{
			width:240rpx;height:204rpx;position:relative;margin:0 auto 26rpx;justify-content:center;
			.smfont{font-size:20rpx;color:#888;}
			.pabs0{position:absolute;left:40rpx;bottom:0rpx;}
			.pabs10{position:absolute;right:40rpx;bottom:0rpx;}
			.pabs20{position:absolute;left: 0px;right: 0;bottom:50rpx;color:#aaa;}
			.greenline{position:absolute;background:#eaeaea;width:26rpx;height:6rpx;
				&.green{background:#52A29E;}
			}
			//左下
			.position1{transform: rotate(-32deg);left:12rpx;top:170rpx;}
			.position2{transform: rotate(-28deg);left:6rpx;top:154rpx;}
			.position3{transform: rotate(-20deg);left:0rpx;top:136rpx;}
			.position4{transform: rotate(-10deg);left:-4rpx;top:118rpx;}
			.position5{transform: rotate(-5deg);left:-5rpx;top:100rpx;}
			
			//右下
			.position25{transform: rotate(28deg);right:10rpx;top:172rpx;}
			.position24{transform: rotate(17deg);right:2rpx;top:156rpx;}
			.position23{transform: rotate(9deg);right:-2rpx;top:136rpx;}
			.position22{transform: rotate(-2deg);right:-2rpx;top:116rpx;}
			.position21{transform: rotate(-10deg);right:0rpx;top:96rpx;}
			
			//中
			.position13{transform: rotate(90deg);left:106rpx;top:4rpx;}
			
			//左中
			.position6{transform: rotate(12deg);left:-2rpx;top:80rpx;}
			.position7{transform: rotate(25deg);left:6rpx;top:60rpx;}
			.position8{transform: rotate(37deg);left:20rpx;top:44rpx;}
			.position9{transform: rotate(50deg);left:32rpx;top:30rpx;}
			.position10{transform: rotate(56deg);left:48rpx;top:18rpx;}
			.position11{transform: rotate(65deg);left:68rpx;top:10rpx;}
			.position12{transform: rotate(78deg);left:88rpx;top:6rpx;}
			
			//右中
			.position20{transform: rotate(-21deg);right:4rpx;top:78rpx;}
			.position19{transform: rotate(-29deg);right:14rpx;top:60rpx;}
			.position18{transform: rotate(-37deg);right:24rpx;top:46rpx;}
			.position17{transform: rotate(-47deg);right:36rpx;top:32rpx;}
			.position16{transform: rotate(-57deg);right:50rpx;top:22rpx;}
			.position15{transform: rotate(-65deg);right:68rpx;top:13rpx;}
			.position14{transform: rotate(-78deg);right:88rpx;top:6rpx;}
		}
	}
	.nodatabox{
		text-align:center;padding-bottom:80rpx;color:#aaa;font-size:30rpx;
		image{margin:80rpx 0 60rpx;width:308rpx;}
	}
	.choosedaybox {
		margin: 20rpx 30rpx 40rpx;
		border: 1rpx solid #eee;
		border-radius: 10rpx;overflow:hidden;
		flex-wrap: unset;box-shadow: 1px 2px 19px 2px rgba(192, 192, 192, 0.3);
		font-size: 30rpx;
	
		.daylist {
			width: 33.3%;
			box-sizing: border-box;
			line-height: 1;padding:24rpx 0;
			text-align: center;
			border-radius: 0rpx;
			-webkit-box-flex: 1;
			-webkit-flex: 1 0 auto;
			flex: 1 0 auto;
	
			&.on {
				color: #fff;
				background: #52A29E;
			}
		}
	}
	.askIcon {
		width: 24rpx;
		height: 24rpx;
	}
	.container {

		.info-box {
			height: 198rpx;
			display: flex;
			position: relative;
			.eidt{
				position: absolute;
				right: 40rpx;color:#999;
				font-size: 26rpx;
				top: 20rpx;
			}

			.avator {
				margin-top: 40rpx;
				background-color: #909399;
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				margin-left: 50rpx;
			}

			.user-msg-box {
				padding-top: 50rpx;
				color: #333333;
				margin-left: 31rpx;

				.name {
					font-size: 20px;
				}

				.msg {
					font-size: 14px;
				}
			}
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.content {
			.function-box {
				height: 209rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.function-item {
					.function-item-img {
						height: 92rpx;
						width: 96rpx;
					}

					.function-item-title {
						color: #333333;
						font-size: 26rpx;
					}
				}
			}
		}

		.health-msg-box {
			// margin: 0 40rpx 30rpx;
			// box-shadow: 1px 1px 5px #999999;
			&.other {
				padding: 30rpx;
				box-sizing: border-box;
			}

			.health-list-box {
				text-align: center;
				display: flex;box-sizing: border-box;
				justify-content: space-around;
				border-bottom: 0px #EEEEEE solid;
				padding:10rpx 30rpx 0.4rem;

				.health-list-item {
					color: #333333;width:30%;
					border: 2rpx solid #F8AE58;padding: 18rpx;box-sizing:border-box;
					border-radius: 10rpx;margin:0 20rpx;
					.bodyimg{width:64rpx;}
					.top-title {
						margin-top: 0rpx;
						display: flex;align-items: center;
						font-size: 13px;
						justify-content: center;

						.askIcon {
							width: 22rpx;
							height: 22rpx;
						}
					}

					.health-detail {
						font-size: 13px;
					}

					.health-tips {
						font-size: 12px;
						color: #999999;
					}
				}
			}

			.tips-box {
				display: flex;

				.tips {
					color: #333333;
					font-size: 12px;
					margin-left: 40rpx;
					margin-top: 25rpx;
				}

				.ask-icon {
					margin-top: 32rpx;
					width: 24rpx;
					height: 24rpx;
				}

			}

			.tips-detail {
				margin-left: 40rpx;
				margin-top: 15rpx;
				padding-bottom: 48rpx;
				color: #999999;
				font-size: 12px;
			}

		}

		.record-chart-box {
			// margin-top: 40rpx;
			margin-right: 40rpx;
			margin-left: 40rpx;
			// box-shadow: 1px 1px 5px #999999;
			color: #333333;
			text-align: center;

			.record-chart-title {
				padding-top: 49rpx;
				font-size: 15px;
			}

			.record-chart-subtitle {
				color: #59A29F;
				font-size: 12px;
				margin-top: 19rpx;
			}
		}

		.last-one {
			color: #333333;
			font-size: 14px;
			margin-left: 50rpx;
			margin-top: 60rpx;
		}

		.listContent {
			margin-top: 20rpx;
			margin-left: 50rpx;
			margin-right: 50rpx;
			background-color: #F7F8F8;

			.health-list-item {
				position: relative;
				margin-top: 30rpx;
				display: flex;

				.health-list-item-avatar-content {
					.health-list-item-avatar {
						margin-left: 20rpx;
						margin-top: 40rpx;
						width: 45rpx;
						height: 45rpx;
						border-radius: 50%;
					}
				}

				.health-list-item-content {
					margin-left: 15rpx;
					margin-top: 40rpx;
					padding-bottom: 40rpx;
					width: 100%;

					.health-list-item-title {
						font-size: 30rpx;
						color: #52A29E;
					}

					.health-list-item-detail {
						color: #999999;
						font-size: 26rpx;
						margin-top: 20rpx;
					}

					.health-list-item-time {
						color: #666666;
						font-size: 26rpx;
						margin-top: 20rpx;
						padding-bottom: 10rpx;
					}

					.line {
						background-color: #CCCCCC;
						margin-top: 15rpx;
						height: 2rpx;
						margin-right: 20rpx;
					}

					.advice-content {
						font-size: 22rpx !important;
						color: #666666;
						padding: 20rpx 20rpx 0 0;
					}
				}

				.health-list-item-arrow {
					position: absolute;
					width: 35rpx;
					height: 19rpx;
					right: 20rpx;
					top: 120rpx;

				}
			}
		}

		.button-box {
			position: fixed;
			bottom: 0;justify-content: space-around;
			height: 200rpx;
			width: 100%;padding: 0 20rpx;box-sizing: border-box;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 360rpx;
				background-color: #F6B861 !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 34rpx;margin:auto;text-align:center;
			}
			.btother{background-color: #52A29E !important;width:280rpx;}
		}

		.white-background {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-title {
				font-size: 14px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-subtitle {
				font-size: 15px;
				color: #333333;
				margin-top: 40rpx;
			}

			.white-background-line-space {
				background-color: #F6F6F6;
				height: 20rpx;
				margin-top: 60rpx;
			}

			.white-background-close {
				font-size: 15px;
				color: #666666;
				height: 100rpx;
				line-height: 100rpx;
			}
		}

		.white-background-BMI {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-BMI-title {
				font-size: 14px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-BMI-des {
				font-size: 15px;
				color: #333333;
				margin-top: 40rpx;
				margin-left: 60rpx;
				margin-right: 60rpx;
				text-align: left;
			}

			.white-background-BMI-des2 {
				font-size: 15px;
				color: #333333;
				margin-left: 60rpx;
				margin-right: 60rpx;
				text-align: left;
				height: 120rpx;
				line-height: 120rpx;
			}

			.white-background-BMI-line-space {
				background-color: #F6F6F6;
				height: 20rpx;
			}

			.white-background-BMI-close {
				height: 100rpx;
				line-height: 100rpx;
				font-size: 15px;
				color: #666666;
			}
		}

		.white-background-energy {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-energy-title {
				font-size: 14px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-energy-desc-title {
				margin-left: 60rpx;
				margin-right: 60rpx;
				margin-top: 60rpx;
				text-align: left;
				color: #333333;
				font-size: 15px;
			}

			.white-background-energy-desc {
				margin-left: 60rpx;
				margin-right: 60rpx;
				margin-top: 20rpx;
				text-align: left;
				color: #333333;
				font-size: 15px;
			}

			.white-background-energy-space-white {
				background-color: #FFFFFF;
				height: 60rpx;
			}

			.white-background-energy-space-gray {
				background-color: #F6F6F6;
				height: 20rpx;
			}

			.white-background-energy-close {
				height: 100rpx;
				line-height: 100rpx;
				font-size: 15px;
				color: #666666;
			}
		}
		.white-bg-MA{
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
		    .MA-title{
				padding-top: 30rpx;
				text-align: center;
				color: #666666;
				font-size: 13px;
			}
			.MA-space{
				height: 300rpx;
			}
			.MA-record-list{
				margin-top: 30rpx;
				margin-left: 61rpx;
				margin-right: 61rpx;
				padding-bottom: 15rpx;
				border-bottom: 2rpx solid #E5E5E5;
				
			}
			.MA-record-list1{
				margin-top: 30rpx;
				margin-left: 61rpx;
				margin-right: 61rpx;
				padding-bottom: 15rpx;			
			}
			
			.record-content{
				color: #333333;
				font-size: 14px;
			}
			.record-time-box{
				display: flex;
				margin-top: 15rpx;
				.record-time{
					font-size: 14px;
					color: #999999;
				}
				.record-motify{
					font-size: 14px;
					color: #666666;
					margin-left: 25rpx;
				}
			}
			
			.MA-line{
				margin-top: 30rpx;
				background-color: #F6F6F6;
				height: 20rpx;
			}
			.MA-send{
				text-align: center;
				height: 104rpx;
				line-height: 104rpx;
				color: #52A29E;
				font-size: 15px;
				border-bottom: 2rpx solid #E5E5E5;
			}
			.MA-close{
				text-align: center;
				height: 102rpx;
				line-height: 102rpx;
				color:#666666;
				font-size: 15px;
			}
		}
	    .white-bg-MA-write{
			background-color: #FFFFFF;
			.MA-write-top{
				height: 104rpx;
				position: relative;
				.turnback{
					position: absolute;
					left: 60rpx;
					top: 36rpx;
					width: 16.5rpx;
					height: 28.5rpx;
				}
				.close-write{
					position: absolute;
					right: 60rpx;
					top: 36rpx;
					width: 22.6rpx;
					height: 22.6rpx;
				}
			}
			.textarea{
				height: 300rpx;
				margin-left: 60rpx;
				width: 630rpx;
				border: 1rpx solid #DCDCDC ;
				font-size: 15px;
				padding: 10px;
				box-sizing: border-box;
			}
			.MA-write-sure{
				margin-top: 50rpx;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 45rpx;
				color: #FFFFFF;
				background-color: #52A29E;
				margin-left: 60rpx;
				margin-right: 60rpx;
				font-size: 17px;
				text-align: center;
			}
			.MA-write-tips{
				margin-top: 15rpx;
				color: #999999;
				font-size: 13px;
				text-align: center;
				padding-bottom: 40rpx;
			}
		}
	}

	.notice-box {
		padding: 30rpx 50rpx 28rpx;

		.notice-info {
			font-size: 26rpx;
			padding-bottom: 20rpx;

			.notice-text {
				font-size: 24rpx;
				color: #999;
				padding-top: 10rpx;
			}
		}

		.leftinfo {
			flex: 1;
			font-size: 24rpx;

			.infolist {
				padding-bottom: 10rpx;

				.inforound {
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					background: #F6BC6A;
					margin-right: 12rpx;

					&.bcolor2 {
						background: #52A29E;
					}

					&.bcolor3 {
						background: #FA94C0;
					}
				}
			}
		}

		.rightinfo {
			padding-right: 20rpx;

			.mintext {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	.echarts {
		width: 85vw;
		height: 85vw;margin: auto;
	}
	.centerwh{width:250rpx;display:inline-block;}
	.centerwh1{display:inline-block;padding-right:16rpx;}
	
	
	
	.white-background-pop1 {
		text-align: center;
		background-color: #FFFFFF;
		border-radius: 10px 10px 0px 0px;
	
		.white-background-pop1-title {
			font-size: 14px;
			color: #666666;
			padding-top: 35rpx;
			position: relative;
			.close{
				position: absolute;
				right: 50rpx;
				width: 30rpx;
				height: 30rpx;
				top: 40rpx;
			}
		}
	    .transferButton{
			margin-left: 105rpx;
			width: 540rpx;
			height: 74rpx;
			line-height: 74rpx;
			background: #52A29E;
			border-radius: 6rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 77rpx;
		}
		
	}
	
	
	.white-background-doctorPop {
		text-align: center;
		background-color: #FFFFFF;
		border-radius: 10px 10px 0px 0px;
	
		.white-background-doctorPop-title {
			font-size: 14px;
			color: #666666;
			padding-top: 35rpx;
			position: relative;
			.close{
				position: absolute;
				left: 60rpx;
				width: 17rpx;
				height: 29rpx;
				top: 45rpx;
			}
		}
	   
	   .docItem{
		   height: 108rpx;
		   line-height: 108rpx;
		   font-size: 30rpx;
		   font-family: PingFang SC;
		   font-weight: 400;
		   color: #333333;
		   margin-left: 60rpx;
		   margin-right: 60rpx;
		   border-bottom: 2rpx solid #DCDCDC;
		   text-align: left;
		   position: relative;
		   
		   .doctorSelect{
			   position: absolute;
			   right: 10rpx;top: 42rpx;
			   width: 30rpx;height: 21rpx;
		   }
	   }
	   .sureBtn{
		   margin-left: 185rpx;
		   width: 380rpx;
		   height: 80rpx;
		   line-height: 80rpx;
		   background: #52A29E;
		   border-radius: 40rpx;
		   margin-top: 70rpx;
		   text-align: center;
		   font-size: 34rpx;
		   font-family: PingFang SC;
		   font-weight: 400;
		   color: #FFFFFF;
		   
	   }
		
	}
	
</style>
