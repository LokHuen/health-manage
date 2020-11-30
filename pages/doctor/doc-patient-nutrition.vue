<template>
	<!-- 患者营养管理界面 -->
	<view class="container">
		<view style="position: fixed;top:0;left:0;bottom:0;right:0;z-index:999;background:#fff;" v-show="!infoData.patientName"></view>
		<view class="info-box">
			<image :src="infoData.portrait" mode="scaleToFill" class="avator"></image>
			<view class="user-msg-box">
				<view class="name">
					{{infoData.patientName||"游客"}}
				</view>
				<view class="msg">{{(infoData.patientGender||"")+' '+((infoData.age || infoData.age!=0)?(infoData.age+'岁 '):'')+(infoData.illness||"")}}

				</view>
			</view>
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
		<view class="health-msg-box" v-if="infoData.weight || infoData.standardWeight">
			<view class="health-list-box">
				<view class="health-list-item">
					<view class="top-title">当前体重</view>
					<view class="health-detail">
						<text style="font-size: 23px;">{{infoData.weight}}</text>KG
					</view>
				</view>
				<view class="health-list-item">
					<view class="top-title">
						<view class="">标准体重</view>
						<image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="askIcon" @click="showComputing"></image>
					</view>
					<view class="health-detail">
						<text style="font-size: 23px;">{{infoData.standardWeight}}</text>KG
					</view>
				</view>

				<view class="health-list-item">
					<view class="top-title">
						<view class="">BMI</view>
						<image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="askIcon" @click="showBMITips"></image>
					</view>
					<view class="health-detail">
						<text style="font-size: 23px;">{{infoData.bmi}}</text>
					</view>
					<view class="health-tips">
						{{infoData.normal==1?'属正常体重范围':'超出正常体重范围'}}
					</view>
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
		</view>

		<view class="record-chart-box" v-if="(hasLoadLindData==0)||(lineData.categories.length>0 &&hasLoadLindData ==1)">
			<view class="record-chart-title">营养自测评分记录图</view>
			<view class="record-chart-subtitle">分值越小，营养状况约好</view>

			<!-- 折线Line纯数字-->
			<view class="line-chart-box">
				<line-chart class="line-chart" ref="lineData" canvasId="index_line_2" :dataAs="lineData" :splitNumber="splitNumber" />
			</view>

		</view>

		<view class="last-one" v-if="latelyData.result">最近一次评价</view>

		<view class="listContent" v-if="latelyData.result">
			<view class="health-list-item" @click="toanswerlist(latelyData.id)">
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" src="../../static/icon/cry_icon.png"></image>
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
		</view>

		<view class="button-box">
			<button type="default" class="button" @click="beginTest">医 嘱</button>
		</view>
		<view style="height: 200px;"></view>
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
						<view class="record-motify" @click="motifyAdvice(item)">修改</view>
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
	</view>
</template>

<script>
	const app = getApp();
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	export default {
		components: {
			LineChart,
		},
		data() {
			return {
				latelyData: {},
				infoData: {},
				list: [
					["/static/icon/baseInfoicon.png", "基础信息"],
					["/static/icon/bingliMangmenticon.png", "病例管理"],
					["/static/icon/testRecordIcon.png", "测评记录"]
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
			}
		},
		onLoad(props){
			this.uid = props.uid;
		},
		methods: {
			medicalAdviceChange(e){
				if(e.show == false){
					this.writeRecord = false;
					this.advice = '';
				}
			},
			motifyAdvice(item){
				this.advice = item.advice;
				this.adviceId = item.id;
				this.writeRecord = !this.writeRecord;
			},
			writeAdvice(){
				if(!this.advice){
					app.tip('请填写建议');
					return;
				}
				app.saveAdvice({id:this.adviceId,advice:this.advice,patientId:this.uid,creatorId:app.getCache('uid')}).then(res =>{
					if(res.status ==1){
						app.tip('发送成功');
						this.writeRecord = !this.writeRecord;
						this.advice = '';
						this.beginTest();
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
				app.adviceListRequest({patientId:this.uid}).then(res=>{
				    if(res.status == 1){
						this.recordList = res.data;
						this.$refs.popupMedicalAdvice.open();
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
				} else {
					//测评记录
					uni.navigateTo({
						//url: '../patient/evaluation-record?id='+this.uid
						url:'doc-evaluation-record?id='+this.uid
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
			},
			//用户信息数据
			getData() {
				app.doctorPatientx({id:this.uid}).then(res => {
					if (res.status == 1) {
						this.infoData = res.data;
					}

				});
			},
			//最近一次测评的数据
			getNearlyRecord() {
				app.patientNearlyRecord({
					surveyId: 1,
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
					surveyId: 1,
					pageNo: 1,
					pageSize: 3,
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
							this.$refs['lineData'].showCharts();
						}
						this.hasLoadLindData = 1;
					}

				});
			},
			toanswerlist(id){
				uni.navigateTo({
					url:"/pages/patient/answer?id="+id
				})
			},
		},
		onShow() {
			this.getUserData();
		},


	}
</script>

<style lang="scss">
	.container {

		.info-box {
			height: 198rpx;
			display: flex;

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
			width: 650rpx;
			margin-left: 50rpx;
			box-shadow: 1px 1px 5px #999999;

			.health-list-box {
				text-align: center;
				display: flex;
				justify-content: space-around;
				height: 214rpx;
				border-bottom: 1px #EEEEEE solid;
				padding-bottom: 0.4rem;

				.health-list-item {
					color: #333333;

					.top-title {
						margin-top: 40rpx;
						display: flex;
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
			margin-top: 40rpx;
			width: 650rpx;
			height: 700rpx;
			margin-left: 50rpx;
			box-shadow: 1px 1px 5px #999999;
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
			font-size: 15px;
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
			bottom: 0;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
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
		padding: 30rpx 40rpx 28rpx;

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
</style>
