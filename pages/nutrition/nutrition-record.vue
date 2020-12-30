<template>
	<!-- 记录营养品界面 -->
	<view class="container">
		
		<view class="msg-box">
			<view class="input-tips">请填写摄入值</view>
			<view class="detail-box">
				<view class="name">{{nutritionInfo.name}}</view>
				<view>
					<text class="black">{{'每'+nutritionInfo.ediblePart+'克含'}}</text>
					<text class="red">{{nutritionInfo.energy+'千卡'}}</text>
					<text class="black">能量</text>
					<text class="red">{{nutritionInfo.carbohydrate+'g'}}</text>
					<text class="black">碳水</text>
				</view>
			</view>
			<view class="input-box">
				<input type="text" v-model="energy" class="input" placeholder="摄入值" @input="change" maxlength="6"/>
				<view class="ke">克</view>
			</view>
			<view class="bottom-tips">{{'提示: '+nutritionInfo.eachBag}}</view>
			
		</view>
		
		<view style="height: 21rpx; background-color:#F6F6F6 ;">
			
		</view>
		
		<view class="all-count">
			<view class="tips">本次合计</view>
			<view class="all-count-detail">
				<view class="left">
					<view class="left-value">{{allEnergy}}</view>
					<view class="distance">千卡</view>
				</view>
				<view class="right">
					<view class="right-value">{{allCarbohydrate}}</view>
					<view class="distance">克碳水</view>
				</view>
			</view>
		</view>
		<view style="height: 20rpx; background-color: #F7F7F7;"></view>
		<view class="time">
			<biaofun-datetime-picker :defaultValue="defaultTime" placeholder="选择" start="2000-02-03 02:08" end="2100-10-28 22:58"
			 fields="minute" @change="changeDatetimePicker"></biaofun-datetime-picker>

			<image src="../../static/icon/more_icon.png" mode="widthFix" class="more"></image>
		</view>

		<view style="height: 200rpx;"></view>

		<view class="bottom-box">
			<view class="button" @click="save">保存</view>
		</view>

		
	</view>
</template>

<script>
	const app = getApp();
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	export default {
		components: {
			biaofunDatetimePicker
		},
		data() {
			return {
				defaultTime: '',
				allCarbohydrate: 0,
				allEnergy: 0,
				nutritionInfo:{},
				energy:''

			}
		},
		methods: {
			getTime() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
				this.defaultTime = timer;
				this.$forceUpdate();
			},		
			changeDatetimePicker(date) {
				this.defaultTime = date.f3;
			},
			save() {
				
				var dietReocrdExtList = [];
				dietReocrdExtList.push({
					foodId:this.nutritionInfo.id,
					weight:this.nutritionInfo.weight,
					foodName:this.nutritionInfo.name,
					foodEnergy:'每'+this.nutritionInfo.ediblePart+'克含'+this.nutritionInfo.energy+'千卡'+this.nutritionInfo.carbohydrate+'碳水'
				});
				app.saveFood({
					genre:2,
					startTime: this.defaultTime,
					dietReocrdExtList:JSON.stringify(dietReocrdExtList)
				}).then(res => {
				   if(res.status == 1){
					   uni.navigateTo({
					   	url:'nutrition-record-feedback?info='+JSON.stringify(res.data)
					   })
				   }
				});

			},
			change(e){
			this.allCarbohydrate=this.nutritionInfo.carbohydrate/this.nutritionInfo.ediblePart*this.energy;
			this.allCarbohydrate=parseFloat(this.allCarbohydrate).toFixed(2);
			this.allEnergy=this.nutritionInfo.energy/this.nutritionInfo.ediblePart*this.energy;
			this.allEnergy=parseFloat(this.allEnergy).toFixed(2);
			}


		},
		onLoad(props) {
			this.getTime();
            this.nutritionInfo =  JSON.parse(props.nutritionInfo);
		}

	}
</script>

<style lang="scss">
	.container {
		
		.distance {
			margin-top: 10rpx;
			text-align: center;
			font-size: 26rpx;
			color: #333333;
		}
		
		.msg-box{
			height: 374rpx;
		    text-align: center;
			.input-tips{
				font-size: 28rpx;
				color: #666666;
				margin-top: 40rpx;
			}
			.detail-box{
				width: 560rpx;
				height: 134rpx;
				margin-left: 95rpx;
				margin-top: 28rpx;
				box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
				border-radius: 2px;
				.name{
					color:#333333;
					font-size: 32rpx;
					padding-top: 29rpx;
				}
				.black{
					font-size: 24rpx;
					color:#333333;
					font-family: PingFang SC;
				}
				.red{
					font-size: 24rpx;
					color: #FB0D1B;
					font-family: PingFang SC;
				}
			}
			.input-box{
				display: flex;
				.input{
					margin-left: 275rpx;
					width: 170rpx;
					border-bottom: 1rpx solid #DCDCDC;
					color: #333333;
					font-size: 26rpx;
					margin-top: 33rpx;
				}
				.ke{
					margin-left: 0;
					margin-top: 30rpx;
					font-size: 26rpx;
				}
				
			}
			.bottom-tips{
				font-size: 18rpx;
				color: #999999;
				text-align: center;
				margin-top: 20rpx;
			}
			
		}

		.all-count {
			color: #272727;
			height: 219rpx;
			.tips {
				font-size: 28rpx;
				margin-top: 40rpx;
				margin-left: 49rpx;
				color: #666666;
			}

			.all-count-detail {
				display: flex;
				height: 180rpx;
				margin-top: 20rpx;
				.left {
					width: 50%;
					.left-value{
						color: #52A29E;
						font-size: 44rpx;
						text-align: center;
					}
				}
				.right {
					width: 50%;
					.right-value{
						color: #F8BD63;
						font-size: 44rpx;
						text-align: center;
					}
				}

			}
		}

		.time {
			height: 96rpx;
			line-height: 96rpx;
			color: #272727;
			margin-left: 30rpx;
			margin-right: 30rpx;
			border-bottom: 1rpx solid #CFCFCF;
			position: relative;

		}

		.type {
			height: 96rpx;
			line-height: 96rpx;
			color: #272727;
			margin-left: 30rpx;
			margin-right: 30rpx;
			position: relative;

		}

		.more {
			position: absolute;
			width: 12rpx;
			height: 24rpx;
			right: 0;
			top: 36rpx;
		}

		.food-list-tips {
			margin-top: 40rpx;
			margin-left: 30rpx;
			font-size: 30rpx;
			color: #272727;
		}

		.list-content-box {
			display: flex;
			height: 152rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			border-bottom: 2rpx solid #CFCFCF;
			position: relative;

			.list-msg-right {
				position: absolute;
				right: 0;
				font-size: 36rpx;
				color: #272727;
				top: 50rpx;
			}

			.list-img {
				width: 100rpx;
				height: 100rpx;
				background-color: #CFCFCF;
				margin-top: 30rpx;
			}

			.list-msg {
				margin-left: 30rpx;
				margin-top: 30rpx;
				height: 100rpx;

				.list-title {
					font-size: 34rpx;
					color: #272727;
				}

				.list-detail {
					margin-top: 10rpx;
					font-size: 30rpx;
					display: flex;

					.list-detail-number {
						color: #52A29E;
					}

					.list-detail-tip {
						color: #272727;
					}
				}

			}

		}

		.bottom-box {
			position: fixed;
			bottom: 0;
			height: 128rpx;
			width: 100%;

			.button {
				margin-left: 74rpx;
				margin-right: 74rpx;
				height: 88rpx;
				background: #52A29E;
				border-radius: 10rpx;
				line-height: 88rpx;
				font-size: 38rpx;
				color: #FFFFFF;
				text-align: center;
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
					right: 30rpx;
				}
			}
		}

		.food-item {
			font-size: 30rpx;
			color: #272727;
			text-align: center;
			height: 96rpx;
			line-height: 96rpx;
			border-bottom: 1rpx solid #DDDDDD;
		}
	}
</style>
