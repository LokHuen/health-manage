<template>
	<view class="container">
		<turnback></turnback>
		<view style="background:#fff;">
		<view class="name-box">
			<view class="name-tips">制作数量</view>
			<input class="name-input" type="text" value="" placeholder="请填写数量" v-model="form.quntity" />
			<view class="right-tip">{{unit}}</view>
		</view>
		<view class="name-box">
			<view class="name-tips">领取方式</view>
			<view class="flex" style="flex:1;">
				<view :class="'tabitem '+(now==0?'on':'')" @click="choosetab(0)">快递</view>
				<view :class="'tabitem '+(now==1?'on':'')" @click="choosetab(1)">到公司领取</view>
			</view>
		</view>
		<view v-show="now==0">
			<view class="name-box">
				<view class="name-tips">收件人</view>
				<input class="name-input" type="text" value="" placeholder="请填写收件人名字" v-model="form.receiver" />
			</view>
			<view class="name-box">
				<view class="name-tips">手机号</view>
				<input class="name-input" type="number" value="" placeholder="请填写收件人手机号码" v-model="form.receiverPhone" />
			</view>
			<view class="name-box" >
				<view class="name-tips">寄送区域</view>
				<view class="name-input" @click="openareachoose()">
					{{form.region?form.region:"请选择收件人所在省市区"}}
				</view>
			</view>
			<view class="name-box">
				<view class="name-tips">具体地址</view>
				<input class="name-input" type="text" value="" placeholder="请填写详细地址" v-model="form.address" />
			</view>
		</view>
		
		</view>


		<view class="button-box">
			<button type="default" class="button" @click="submit">提交申请</button>
		</view>

		<view style="height: 100rpx;"></view>

		<n-address ref="addr" @up-data="upData" ></n-address>
	</view>
</template>

<script>
	const app = getApp();
	import nAddress from "../../components/n-address/n-address.vue"
	import turnback from "../../components/turnback.vue"
	export default {
		components:{nAddress,turnback},
		onLoad(props) {
			this.form.applyId = props.applyId || "";
			this.getInfo();
		},
		data() {
			return {
				now:0,
				unit:"个",
				form:{
					applyId:"",
					quntity:"",//制作数量
					receiveType:"",//领取方式 0 不领取 1 快递 2 到公司领取
					receiver:"",//收件人
					receiverPhone:"",//收件人电话
					region:"",//寄送地址的区域，省 市 区
					address:"",//寄送的具体地址
				},
				rules:[
					{name:"receiver",text:"请填写收件人"},
					{name:"receiverPhone",text:"请填写收件人电话"},
					{name:"region",text:"请选择区域"},
					{name:"address",text:"请填写具体地址"},
				],
			}
		},
		onShow() {
			
		},
		methods: {
			upData (e) {
				this.form.region = e.regionArr.join(" ");
			},
			//省市区
			openareachoose(){
				this.$refs['addr'].popUp();
			},
			choosetab(index){
				this.now = index;
			},
			getInfo() {
				app.getMakeUnit({applyId:this.form.applyId}).then(res => {
					if (res.status == 1) {
						this.unit = res.data;
					}
				});
			},
			submit() {
				if(!this.form.quntity) {app.tip("请填写制作数量");return;}
				for (let i = 0; i < this.rules.length; i++) {
					if(this.now==0&&(!this.form[this.rules[i].name])) {app.tip(this.rules[i].text);return;}
				}
				if(this.now==0){
					if (!/^1[0-9]{10}$/.test(this.form.receiverPhone)) {
						app.tip('请填写11位手机号码')
						return;
					}
				}
				
				app.loading("保存中")
				let data = JSON.parse(JSON.stringify(this.form));
				data.receiveType = this.now+1;
				app.applytoMake(data).then(res => {
					app.loaded();
					uni.reLaunch({
						url:"/pages/card/finish"
					})
				});
			},

		},

	}
</script>

<style lang="scss" scoped>
	page{background: #F7F8F8;}
	.tabitem{
		font-size: 30rpx;color: #999;border: 2rpx solid #999999;border-radius: 10rpx;padding:12rpx 20rpx;margin-left:20rpx;min-width: 100rpx;line-height:1;text-align:center;
		&.on{color: #4789EB;border-color:#4789EB;}
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
		width: 25rpx;
		height: 25rpx;
		right: 0;
		top: 0;
	}

	.container {
		.title {
			color: #333333;
			font-size: 30rpx;
			margin-left: 44rpx;
			margin-right: 44rpx;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.name-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;flex-wrap: wrap;
			// height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			position: relative;

			.name-tips {
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				min-width: 130rpx;
			}

			.name-input {
				flex: 1;
				margin-left: 30rpx;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
			}

			.name-novalue-input {
				margin-left: 30rpx;
				color: #b2b2b2;
				font-size: 15px;
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
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;

			.sex-tips {
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				min-width: 130rpx;
			}

			.sex-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #999999;
				font-size: 15px;
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #007AFF;
			}

			.has-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #4CD964;
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
			margin-top: 100px;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #4789EB !important;
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
	.otherinput{width:400rpx;flex: unset!important;}
</style>
