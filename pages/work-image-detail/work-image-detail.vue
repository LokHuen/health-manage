<template>
	<view class="container">
		<view class="info-box">
			<view class="head">
				<image :src="detail.portrait" ></image>
				<text>{{detail.nickName}}</text>
				<text>{{detail.createTime}}</text>
			</view>

			<view class="user-box">
				<view class="text-info">
					<text>{{'体检人：'+detail.subjectName}}</text>
					<text>{{'影像类型：'+(detail.mriType==1?'X光':(detail.mriType==2?'CT':(detail.mriType==3?'磁共振':(detail.mriType==4?'彩超':'核医学检查'))))}}</text>
					<text>{{'影像出具机构：'+detail.mriOrg}}</text>
					<text>{{'出具时间：'+detail.mriDate}}</text>
					<text>疾病信息或问题描述：</text>
					<text class="des">{{detail.illness?detail.illness:'无'}}</text>
				</view>
			</view>

			<view class="image-box" v-if="imglist.length>0">
				<text>影像图</text>
				<view class="imgs-list">
					<image v-for="(item,index) in imglist" :key="index" :src="item" @click="previewImage(index)"></image>
				</view>
			</view>

			<view class="back-post-box">
				<text>影像报告回寄</text>
				<view class="address">
					<text>地 址：</text>
					<text>{{detail.rcvAddress}}</text>
				</view>
				<text class="contact">{{'联系人：'+detail.rcvName}}</text>
				<text class="phone">{{'电 话：'+detail.rcvTelephone}}</text>
				<text class="SF-no" v-if="detail.expressCompany && detail.expressNumber">{{detail.expressCompany+' '+detail.expressNumber}}</text>
			</view>

			<view class="read-box" v-if="detail.interpretContent">
				<text>解读内容</text>
				<text class="read-content">{{detail.interpretContent}}</text>
				<text class="read-date">{{'解读日期：'+detail.interpretStart}}</text>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" class="poupu">
			<view class="white-background">
				<text>已收到该用户的影像学报告</text>
				<text @click="closeReceive">确定</text>
			</view>
		</uni-popup>

		<view class="express_mask" @touchmove.stop.prevent="false" v-if="isWriteExpresse">
			<view class="express_content">
				<text class="title">请填写快递信息</text>
				<image :src="imageUrl+'/icon_close.png'" @click="closeWriteExpresse"></image>
				<view class="edit_box">
					<text>快递公司</text>
					<input v-model="expressCompany"/>
					
				</view>
				<view class="edit_box">
					<text>快递单号</text>
					<input v-model="expressNumber"/>
				</view>
				<text class="confirm" @click="submitExpress">确定</text>
			</view>
		</view>

		<view class="button-box">
			<text class="bottom-btn" v-if="detail.interpretStatus==0" @click="openReceive">收件确认</text>
			<text class="bottom-btn" v-if="detail.interpretStatus==1" @click="toWriteContent">填写解读内容</text>
			<text class="bottom-btn" v-if="detail.interpretStatus==2 && detail.postBackStatus!=1" @click="openWriteExpresse">确认回寄</text>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				imageUrl:this.$imageUrl,
				status: 0,
				imglist: [],
				isWriteExpresse: false,
				id: 0,
				detail: {},
				expressCompany:'',
				expressNumber:'',
			}

		},
		onShow(){
			this.getDetail();
		},
		onLoad(props) {
			this.id = props.id;
		},
		methods: {
			previewImage(res){
				uni.previewImage({
					current:res,
				    urls: this.imglist
				})
			},
			toWriteContent() {
				console.log(this.id);
				uni.navigateTo({
					url: "../write-reading-content/write-reading-content?id=" + this.id+"&content="+this.detail.interpretContent
				})
			},
			openReceive() {
				this.$refs.popup.open()
			},
			closeReceive() {
				app.sureRecive({
					id: this.id
				}).then(res => {
					if (res.status === 1) {
						app.tip('确认收件成功', 1500);
						this.$refs.popup.close();
						this.getDetail();
					}
				});

			},
			openWriteExpresse() {
				this.isWriteExpresse = true
				
			},
			closeWriteExpresse() {
				this.isWriteExpresse = false
			},
			submitExpress(){
				if(this.expressCompany.lengt===0 || this.expressNumber.lengt===0){
					app.tip('请补全快递信息',1500);
					return;
				}
				app.savePostBack({id:this.id,expressCompany:this.expressCompany,expressNumber:this.expressNumber}).then(res=>{
					if(res.status ===1){
						this.closeWriteExpresse();
						app.tip('填写成功',1500);
						this.expressCompany = '';
						this.expressNumber = '';
						this.getDetail();
					}
				});
				
				
			},
			getDetail() {
				app.interpretMriDetail({
					id: this.id
				}).then(res => {
					if (res.status === 1) {
						this.detail = res.data;
						if(this.detail.mriUrl){
							if(this.imglist.length>0){
								this.imglist = [];
							}
							var imageItems = this.detail.mriUrl.split(',');
							for (var i = 0; i < imageItems.length; i++) {
								var item = imageItems[i];
								this.imglist.push(app.globalData.baseUrl+'/'+item);
							}
						}
						
					}
                    console.log(this.imglist);
				});
			}


		}
	}
</script>

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
	}

	.container {
		padding-bottom: 96rpx;
		display: flex;
		flex-direction: column;

		.info-box {
			padding: 0 30rpx 40rpx 30rpx;
			border-radius: 10rpx;
			box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.18);
			margin: 40rpx;

			.head {
				display: flex;
				position: relative;
				flex-direction: column;
				padding-left: 100rpx;
				padding-top: 30rpx;

				image:nth-child(1) {
					position: absolute;
					top: 36rpx;
					left: 0rpx;
					width: 70rpx;
					height: 70rpx;
				}

				text:nth-child(2) {
					color: #343434;
					font-size: 32rpx;
				}

				text:nth-child(3) {
					color: #9a9a9a;
					font-size: 26rpx;
				}
			}

			.user-box {
				.text-info {
					position: relative;
					display: flex;
					flex-direction: column;
					background-color: #FFFFFF;
					margin: 50rpx 40rpx 40rpx 0rpx;

					text {
						font-size: 30rpx;
						color: #333333;
						margin-top: 10rpx;
					}

					.des {
						color: #999999;
					}

					.time {
						position: absolute;
						right: 30rpx;
						font-size: 26rpx;
						color: #666666;
					}
				}
			}

			.image-box {
				display: flex;
				flex-direction: column;

				text:nth-child(1) {
					color: #343434;
					font-size: 32rpx;
				}

				.imgs-list {
					justify-content: space-evenly;
					width: 100%;
					padding-left: 1%;
					margin-top: 20rpx;

					image {
						width: 22%;
						margin-right: 3%;
						margin-top: 12rpx;
						height: 134rpx;
					}
				}
			}

			.back-post-box {
				margin-top: 50rpx;
				display: flex;
				flex-direction: column;

				text:nth-child(1) {
					color: #343434;
					font-size: 32rpx;
				}

				.address {
					margin-top: 30rpx;
					display: flex;

					text:nth-child(1) {
						color: #666666;
						font-size: 30rpx;
					}

					text:nth-child(2) {
						flex: 1;
						color: #666666;
						font-size: 30rpx;
					}
				}

				.contact {
					margin-top: 10rpx;
					color: #666666;
					font-size: 30rpx;
				}

				.phone {
					margin-top: 10rpx;
					color: #666666;
					font-size: 30rpx;
				}

				.SF-no {
					margin-top: 50rpx;
					color: #666666;
					font-size: 30rpx;
				}
			}

			.read-box {
				margin-top: 50rpx;
				display: flex;
				flex-direction: column;

				text:nth-child(1) {
					color: #343434;
					font-size: 32rpx;
				}

				.read-content {
					margin-top: 20rpx;
					color: #666666;
					font-size: 30rpx;
				}

				.read-date {
					margin-top: 40rpx;
					color: #999999;
					font-size: 26rpx;
				}
			}
		}

		.poupu {
			.white-background {
				display: flex;
				flex-direction: column;
				background-color: #FFFFFF;
				width: 100%;
				padding: 80rpx 0;
				align-items: center;
				border-radius: 20rpx 20rpx 0 0;
			}

			text:nth-child(1) {
				color: #666666;
				font-size: 36rpx;
			}

			text:nth-child(2) {
				width: 260rpx;
				height: 78rpx;
				line-height: 78rpx;
				background: #2793EC;
				border-radius: 8px;
				text-align: center;
				color: #ffffff;
				font-size: 36rpx;
				margin-top: 40rpx;
			}
		}

		.express_mask {
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2000;
			background: rgba(0, 0, 0, 0.4);

			.express_content {
				position: relative;
				display: flex;
				flex-direction: column;
				background-color: #FFFFFF;
				border-radius: 8rpx;
				width: 100%;
				margin-left: 50rpx;
				padding-right: 30rpx;
				padding-left: 30rpx;
				padding-bottom: 60rpx;
				margin-right: 50rpx;
				justify-content: center;
				align-items: center;

				image {
					right: 30rpx;
					top: 30rpx;
					width: 30rpx;
					height: 30rpx;
					position: absolute;
				}

				.title {
					color: #333333;
					font-size: 32rpx;
					margin-top: 50rpx;
				}

				.edit_box {
					margin-top: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						color: #333333;
						margin-right: 15rpx;
						font-size: 32rpx;
					}

					input {
						width: 430rpx;
						height: 60rpx;
						border: 1px solid #BFBFBF;
						border-radius: 4px;
					}
				}

				.confirm {
					width: 260rpx;
					height: 78rpx;
					text-align: center;
					color: #FFFFFF;
					line-height: 78rpx;
					margin-top: 40rpx;
					background: #2793EC;
					border-radius: 8px;
				}
			}
		}
		
		.button-box{
			display: flex;
			flex-direction: column;
			align-items: center;
			.bottom-btn {
				padding: 0 90rpx;
				text-align: center;
				height: 78rpx;
				line-height: 78rpx;
				background-color: #2793EC;
				color: #FFFFFF;
				border-radius: 8rpx;
				font-size: 34rpx;
			}
		}
	}
</style>
