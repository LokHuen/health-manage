<template>
	<view class="container flexc">
		<turnback v-if="!reback" @back="backaction" :isback="bindchannel?'':1" :title="hio==1?'肿瘤营养与干预的业务':'健康国际在线的业务'"></turnback>
		<turnback v-if="reback"></turnback>
		<view class="head flexc">
			<text class="sales-name" v-if="sales.salesName">{{sales.salesName}}</text>
			<view class="flex head-data" @click="toOrder">
				<view class="head-item flexc">
					<text class="value">{{info.orderNum||0}}</text>
					<text class="key">本月订单数</text>
				</view>
				<view class="head-item flexc">
					<text class="value">{{info.income||0}}</text>
					<text class="key">本月收益（元）</text>
				</view>
				
			</view>
		</view>


		<view class="flexc">
			<view class="item-outer" v-for="(item,index) in list" :key="index" @click="clickItem(index)" v-if="item">
				<view class="item flex">
					<text class="left-name">{{item}}</text>
					<view class="flex">
						<text
							v-if="index==2 ||index==3 ">{{index==2?(info.bindDoctorCount||0):(info.bindPatientCount||0)}}</text>
						<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="pageselect" v-show="showselet">
			<turnback url="/pages/sales/index"> </turnback>
			<view class="flexc">
				<view class="item-outer" @click="selecttype(1)" >
					<view class="item flex">
						<text class="left-name">肿瘤营养与干预业务</text>
						<view class="flex">
							<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
						</view>
					</view>
				</view>
				<view class="item-outer" @click="selecttype(2)" >
					<view class="item flex">
						<text class="left-name">健康国际在线业务</text>
						<view class="flex">
							<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="pageselect" v-show="showselet">
			<turnback url="/pages/sales/index"> </turnback>
			<view class="flex projectbox" >
				<view class="projectitem" @click="selecttype(1)">
					<image class="itemicon" src="../../static/haitao.png" mode="aspectFill"></image>
					<view>肿瘤营养与干预</view>
				</view>
				<view class="centerline"></view>
				<view class="projectitem" @click="selecttype(2)">
					<image class="itemicon" src="../../static/haitao1.png" mode="aspectFill" style="width:180rpx;"></image>
					<view>健康国际在线</view>
				</view>
			</view>
		</view>
		<uni-popup ref="pop1" type="center">
			<view class="white-background-pop1">
				<view class="white-background-pop1-title">
					<image src="../../static/icon_close.png" mode="aspectFill" @click="$refs.pop1.close()" class="close"></image>
				</view>
				<view v-show="hio==1" class="bindtips">
					请绑定微信帐号，便于及时收取患者中、<br>重度营养评估数据；收取待付款订单通知。
				</view>
				<view v-show="hio==2" class="bindtips">
					请绑定微信帐号，便于及时收取通知。
				</view>
				<view class="sendemail" @click="toapplication">去绑定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	export default {
        components: {turnback},
		data() {
			let that = this
			return {
				sales: {
					salesId: '',
					salesName: ''
				},
				info: {},
				isMiniProgram:false,
				showselet:true,
				hio:1, //1维新 2hio
				reback:false,
				bindchannel:false,
			}
		},
		onLoad(props) {
			if (props.salesId) {
				this.sales.salesId = props.salesId
			}
			this.sales.salesName = props.salesName
			if(app.getCache('bindchannel')){
				let bindchannel = app.getCache('bindchannel');
				if(bindchannel==1){
					this.bindchannel = true;
					this.selecttype(1);
				}else if(bindchannel==6){
					this.bindchannel = true;
					this.selecttype(2);
				}else if(bindchannel==16){
					this.bindchannel = false;
					this.showselet = true;
				}
			}
			if(props.hio){
				this.hio = props.hio;
				this.showselet = false;
				this.reback = true;
			}
			this.getMiniProgramStatic();
		},
		onShow() {
			if(!this.showselet) this.getData();
		},
		onReady() {
			if (this.sales.salesId) {
				uni.setNavigationBarTitle({
					title: '个人业务情况'
				})
			}
		},
		computed: {
			list: function() {
				return ["按月统计订单数据", this.hio==2 ? "" : (this.sales.salesId ? "" : '名片码'), this.hio==2 ? "" : "医生列表", this.hio==2 ? "" : "患者列表", this.hio==2 ? "" : "资源报备", this.info.sampleAgentId?"样本登记":"样本登记"]
			}
		},
		methods: {
			hasMesage() {
				app.hasMessage({channel:this.hio==1?1:6}).then((res) => {
					this.msgInfo = res.data;
			        if(!this.msgInfo.fwOpenid){
			        	this.$nextTick(()=>{
			        		this.$refs.pop1.open();
			        	})
			        }
				})
			},
			toapplication(){
				this.$refs.pop1.close();
				wx.miniProgram.navigateTo({url:"/pages/right?t="+localStorage.getItem("salesToken")+"&c="+(this.hio==1?1:6)});
			},
			backaction(){
				this.showselet = true;
			},
			selecttype(index){
				localStorage.setItem("hio",index);
				this.hio = index;
				this.getData();
				this.showselet = false;
				this.hasMesage();
			},
			getMiniProgramStatic(){
			 wx.miniProgram.getEnv((res)=>{
			    this.isMiniProgram = res.miniprogram?true:false;
			 })
			},
			back(){
			  uni.navigateBack({
			   
			  })
			},
			
			clickItem(index) {
				if (index == 0) {
					uni.navigateTo({
						url: 'month-order-list?pageResource=1' + '&salesId=' + this.sales.salesId
					})
				} else if (index == 1) {
					let sid=this.sales.salesId ? this.sales.salesId : app.getCache('uid')
					uni.navigateTo({
						url: 'sales-business-card?id=' + sid
					});
				} else if (index == 2) {
					uni.navigateTo({
						url: '../sales/user?salesManId=' + this.sales.salesId
					});
				} else if (index == 3) {
					uni.navigateTo({
						url: '../sales/patient-list?salesManId=' + this.sales.salesId
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: '../sales/resource-report-list?salesId=' + this.sales.salesId
					});
				} else if (index == 5) {
					uni.navigateTo({
						url: "/pages/sales/gene/order"
					});
					// location.href = "http://gzhtest.itopone.com/#/jump?id="+this.info.sampleAgentId;
				}
			},
			getData() {
				app.saleshomepage({
					salesManId: this.sales.salesId,
					channel:this.hio==1?1:6
				}).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.info = res.data;
					}
				});
			},
			toOrder() {
				let date = new Date()
				let month = date.getFullYear() + '-' + (date.getMonth() + 1)
				uni.navigateTo({
					url: 'order-list?pageResource=1' + '&month=' + month+'&salesId='+this.sales.salesId
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.projectbox{
		padding:26rpx 0rpx 0;box-sizing:border-box;background:#fff;
		.projectitem{
			width:49%;padding:40rpx 0 60rpx;text-align:center;font-size:34rpx;position:relative;
			.itemicon{width:130rpx;height:130rpx;margin-bottom:10rpx;}
		}
		.centerline{width:2rpx;height:230rpx;background:#ccc;}
	}
	.white-background-pop1 {
		text-align: center;width:90vw;
		background-color: #FFFFFF;padding:0 0 30rpx 0;
		border-radius: 10px;
	
		.white-background-pop1-title {
			font-size: 30rpx;
			color: #333;font-weight:bold;
			padding: 35rpx 0;
			position: relative;
			.close{
				position: absolute;
				right: 50rpx;
				width: 30rpx;
				height: 30rpx;
				top: 40rpx;
			}
		}
		.bindtips{font-size:30rpx;padding:50rpx 0 30rpx;}
		.sendemail{
			line-height:1;padding:24rpx 0;
			border-radius: 60rpx;font-size: 32rpx;
			background:#4789EB;
			width: 74%;color:#fff;margin:40rpx auto 20rpx;
			text-align: center;
		}
	}
	.pageselect{
		position:fixed;top:0;left:0;right:0;bottom:0;z-index:3;background:#f5f5f5;
	}
	.container {
		height: 100vh;
		background-color: #F5F6F6;

		.head {
			.sales-name {
				color: #333333;
				font-size: 32rpx;
				padding: 36rpx 0 40rpx 50rpx;
			}

			.head-data {

				padding: 60rpx 30rpx;
				background: #FFFFFF;
				flex-wrap: nowrap;

				.head-item {
					flex: 1;
					font-size: 30rpx;
					justify-content: center;
					align-items: center;

					&:nth-child(1) {
						border-right: 2rpx solid #ddd;
					}

					.value {
						font-size: 52rpx;
						padding-bottom: 10rpx;
						color: #4B8BE8;
					}
				}
			}
		}


		.item-outer {
			margin-top: 20rpx;

			.item {
				background-color: #FFFFFF;
				height: 90rpx;
				justify-content: space-between;
				align-items: center;
				padding: 0 50rpx;

				.left-name {
					font-size: 30rpx;
					color: #333333;
				}

				.right-arrow {
					width: 15rpx;
					height: 27rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
