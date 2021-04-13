<template>
	<!-- 科室首页 -->
	<view class="container">
		<view class="title">{{doctorInfo.hospital+'  '+doctorInfo.department}}</view>
		<view class="list-box">
			<view class="list-item flex" v-for="(item,index) in doctorInfo.resultList" :key="index">
				<view class="name">
					{{item.doctorName}}
				</view>
				<view class="detail">
					{{item.technicalTitle}}
				</view>
				<view class="detail">
					{{'患者数: '+item.patientCount}}
				</view>
			</view>
		</view>
		<tabbar :now="1"></tabbar>
	</view>
</template>

<script>
	const app = getApp();
	import tabbar from "../../components/tabbar.vue"
	export default {
		components:{tabbar},
		data() {
			return {
				doctorInfo:''
			}
		},
		onLoad(){
		   this.getListData();
		},
		methods: {
			getListData(){
				app.allDoctorList().then(res =>{
					if(res.status == 1){
						this.doctorInfo = res.data;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F6;
	}
	.container{
	    .title{
			height: 100rpx;
			line-height: 120rpx;
			padding-left: 30rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.list-box{
			.list-item{
				margin-left: 30rpx;
				margin-right: 30rpx;
				padding-left: 40rpx;
				background-color: #fff;
				margin-top: 20rpx;
				height: 110rpx;
				line-height: 110rpx;
				.name{
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				.detail{
					margin-left: 20rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
				}
				
			}
		}
	}
</style>
