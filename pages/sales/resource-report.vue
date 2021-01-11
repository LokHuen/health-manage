<template>
	<view class="container">
		<view class="title-box">
		<view class="left">资源所在区域：</view>
		
		<picker mode="multiSelector" :range="areaList" :range-key="'name'" @columnchange="columnChange" @cancel="hideArea(1)"
		 @change="hideArea(0)" style="flex: 1;">
			<view class="right">
				{{(province&&city&&hasArea)?(province+city):'请选择地区'}}
			</view>
		</picker>
		</view>
		
		<view class="list-content" @click="selectType">
			报备类型
			<view class="list-content-right">{{type==0?'医院':(type==1?'科室':(type==2?'医生':'请选择'))}}</view>
		</view>
		
		<view class="list-content" v-if="type==0||type==1||type==2">
			医院名称
			<view class="list-content-right">请选择</view>
		</view>
		
		<view class="list-content" v-if="type==1||type==2">
			科室名称
			<view class="list-content-right">请选择</view>
		</view>
		
		<view class="list-content" v-if="type==2">
			医生名字
			<input type="text" class="list-content-input" placeholder="请填写"/>
		</view>
		
		<view class="remind" v-if="fault">该医生已存在报备记录</view>
		
		<view class="list-content" v-if="type==0||type==1||type==2">
			备注内容		
			<input type="text" class="list-content-input" placeholder="选填项"/>
		    
		</view>
		<view class="button-box">
			<button type="default" class="button" @click="submit">提交</button>
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="popup-bg">
				<view style="height: 40rpx;"></view>
				<view class="popup-title">
					选择报备类别
					<image src="../../static/icon/close_new.png" mode="widthFix" class="popup-close" @click="close"></image>
				</view>
				<view style="height: 5rpx;"></view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view class="sport-item" v-for="(item,index) in types" :key="index" @click="selectsportType(index)">
						{{item}}
					</view>
				</scroll-view>
				<view style="height: 20rpx;"></view>
			</view>
		</uni-popup>
		
		<uni-popup ref="sucesPpopup" type="center">
			<view class="suc-popup-bg">
				<image src="../../static/end.png"  class="suc-img"></image>
				<view class="suc-title">报备成功</view>
				<view class="btn-box">
					<view class="btn" @click="close">
						关闭
					</view>
					<view style="width: 30rpx;"></view>
					<view class="btn" @click="close">
						继续添加
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	import http from '../../common/http.js'
	export default {
	
		data() {
			return {
			   types:['医院','科室','医生'],
			   type:4,
			   hasArea:false,
			   cityId: '',
			   city: '',
			   provinceId: '',
			   province: '',
			   areaList: [
			   	[],
			   	[]
			   ],
			   
			}
		},
		onLoad(props) {
		
			http.get(http.urls.get_all_province).then((res) => {
				this.areaList[0] = res.data;
				if (this.areaList[0] && this.areaList[0].length > 0) {
					let obj = this.areaList[0][0];
					this.province = obj.name
					this.provinceId = obj.id
					http.get(http.urls.get_citys, {
						id: obj.id
					}).then((res) => {
						this.areaList[1] = res.data
						if (this.areaList[1] && this.areaList[1].length > 0) {
							let obj2 = this.areaList[1][0];
							this.city = obj2.name
							this.cityId = obj2.id
						}
						this.$forceUpdate();
					})
				}
			})
		},
		onShow(){
			this.getData();
		},
		methods: {
		    selectType(){
				this.$refs.popup.open();
			},
			selectsportType(index){
				this.type = index;
				this.$refs.popup.close();
			},
			hideArea(cancel) {
				if (cancel) {} else {
					this.hasArea = true
				}
			},
			columnChange(e) {
				let column = e.detail.column
				let value = e.detail.value
				let obj = this.areaList[column][value]
				if (column == 0) {
					this.province = obj.name
					this.provinceId = obj.id
					http.get(http.urls.get_citys, {
						id: this.provinceId
					}).then((res) => {
						this.areaList[1] = res.data
						if (this.areaList[1] && this.areaList[1].length > 0) {
							let obj2 = this.areaList[1][0];
							this.city = obj2.name
							this.cityId = obj2.id
						}
						this.$forceUpdate();
					})
				} else if (column == 1) {
					this.city = obj.name
					this.cityId = obj.id
				}
			},
			submit(){
				this.$refs.sucesPpopup.open();
			},
			close(){
				this.$refs.sucesPpopup.close();
			}
			
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		.title-box{
			margin-top: 30rpx;
			margin-left: 30rpx;
			font-size: 26rpx;
			display: flex;
			.left{
				color: #333333;
			}
			.right{
				color: #4B8BE8;
			}
			.sex-value {
				padding-right: 0;
				color: #999999;
				font-size: 15px;
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #007AFF;
			}
			
			.has-value {
				padding-right: 0;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #4CD964;
			}
		}
		.list-content{
			margin-top: 20rpx;
			padding-left: 30rpx;
			height: 90rpx;
			line-height: 90rpx;
			position: relative;
			background-color: #FFFFFF;
			font-size: 28rpx;
			color: #333333;
			.list-content-right{
				position: absolute;
				color: #999999;
				right: 30rpx;
				top: 0;
			}
			.list-content-input{
				position: absolute;
				color: #333333;
				right: 30rpx;
				top: 26rpx;
				text-align: right;
				font-size: 28rpx;
				width: 500rpx;
			}
		}
		.remind{
			font-size: 26rpx;
		    margin-top: 10rpx;
			margin-left: 30rpx;
			color: #E21414;
		}

		.button-box {
			//position: fixed;
			margin-top: 100rpx;
			bottom: 0;
			height: 140rpx;
			width: 100%;
		
			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #4B8BE8 !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}
		
		.popup-bg {
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0px 0px;
		
			.popup-title {
				height: 50rpx;
				font-size: 30rpx;
				color: #707578;
				text-align: center;
				position: relative;
		    
				.popup-close {
					position: absolute;
					width: 36rpx;
					height: 36rpx;
					//background-color: #343434;
					right: 30rpx;
				}
			}
			.sport-item {
				font-size: 30rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;
				color: #272727;
				text-align: center;
				height: 96rpx;
				line-height: 96rpx;
				border-bottom: 1rpx solid #CFCFCF;
			}
		}
		.suc-popup-bg{
			background-color: #FFFFFF;
			border: 10rpx;
			height: 450rpx;
			width: 500rpx;
			.suc-img{
				width: 150rpx;
				height: 150rpx;
				margin-top: 40rpx;
				margin-left: 175rpx;
			}
			.suc-title{
				text-align: center;
				margin-top: 20rpx;
				color: #333333;
			}
			.btn-box{
				margin-top: 30rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;
				display: flex;
				height: 70rpx;
				line-height: 70rpx;
				.btn{
					border: 2rpx solid #666666;
					width: 200rpx;
					text-align: center;
					color: #666666;
				}
			}
		}
		
		
		
	}
	
	
</style>
