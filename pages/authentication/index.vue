<template>
	<view>
		<view class="contentbox">
			<view class="introbox">
				<view class="bigtitle">请完善身份信息</view>
				<view class="textinfo">提现前，您需要提交个人身份信息，并通过平台审核。</view>
				<view class="textinfo">平台审核通过后，您会收到手机短信通知。审核时长一般在1个工作日内完成。</view>
			</view>
			<view class="uploadbox flex" @click="sendpicture(1)">
				<image src="../../static/auth/1.png" mode="widthFix"></image>
				<view class="textbox">
					<view>上传身份证人像面</view>
					<text>请保持照片中身份证显示完整\n字体清晰可见，亮度均匀</text>
				</view>
			</view>
			<view class="uploadbox flex" @click="sendpicture(2)">
				<image src="../../static/auth/2.png" mode="widthFix"></image>
				<view class="textbox">
					<view>上传身份证国徽面</view>
					<text>请保持照片中身份证显示完整\n字体清晰可见，亮度均匀</text>
				</view>
			</view>
			<view class="uploadbox flex" @click="sendpicture(3)">
				<image src="../../static/auth/3.png" mode="widthFix"></image>
				<view class="textbox">
					<view>上传手持身份证照片</view>
					<text>照片中应包含完整身份证\n人像面以及本人胸部以上头像</text>
				</view>
			</view>
			<view class="uploadbox flex" @click="sendpicture(4)">
				<image src="../../static/auth/4.png" mode="widthFix"></image>
				<view class="textbox">
					<view>上传银行卡正面</view>
					<text>请保持照片中银行卡显示完整\n字体清晰可见，亮度均匀</text>
				</view>
			</view>
			<view class="uploadbox flex" @click="sendpicture(5)">
				<image src="../../static/auth/5.png" mode="widthFix"></image>
				<view class="textbox">
					<view>上传银行卡背面</view>
					<text>请保持照片中银行卡显示完整\n字体清晰可见，亮度均匀</text>
				</view>
			</view>
			<view class="uploadbox flex" @click="sendpicture(6)">
				<image src="../../static/auth/6.png" mode="widthFix"></image>
				<view class="textbox">
					<view>上传手持银行卡照片</view>
					<text>照片中应包含完整银行卡正面\n以及本人胸部以上头像</text>
				</view>
			</view>
		</view>
		<view class="pageline"></view>
		<view class="contentbox">
			<view class="introbox">
				<view class="bigtitle">银行账户信息</view>
				<view class="textinfo">请填写拍照银行卡的信息，款项将转入该卡账户。</view>
				<view class="textinfo">注意：银行卡的户名必须与拍照身份证的姓名一致。</view>
			</view>
			<view class="flex linebox">
				<view class="lefttext">户主</view>
				<input class="rightarea" v-model="form.name" maxlength="20" placeholder="请填写户主姓名" />
			</view>
			<view class="flex linebox" @click="$refs.popup.open()">
				<view class="lefttext">开户行</view>
				<view class="rightarea">{{form.rank?form.rank:"点击选择开户行"}}</view>
			</view>
			<view class="flex linebox">
				<view class="lefttext">账号</view>
				<input class="rightarea" type="number" v-model="form.card" maxlength="30" placeholder="请填写银行卡账号" />
			</view>

			<view class="pagebottombt">
				<view @click="saveinfo">确定</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="choosebox">
				<view class="headtitle">{{chooseindex==1?"银行名称":(chooseindex==2?"开户行所在省":(chooseindex==3?"开户行所在市":"开户行名称"))}}
					<uni-icons type="arrowleft" size="15" class="backicon" v-show="chooseindex!=1" @click="choosechange"></uni-icons>
				</view>
				<scroll-view class="choosebody" scroll-y="true">
					<view v-show="chooseindex==1" class="itemlist flex" v-for="(item,index) in ranklist" :key="index" @click="choosenext(1,index)">
						<p>{{item.text}}</p>
						<uni-icons type="arrowright" size="15" ></uni-icons>
					</view>
					<view v-show="chooseindex==2" class="itemlist flex" v-for="(item,index) in provlist" :key="index" @click="choosenext(2,index)">
						<p>{{item.text}}</p>
						<uni-icons type="arrowright" size="15" ></uni-icons>
					</view>
					<view v-show="chooseindex==3" class="itemlist flex" v-for="(item,index) in citylist" :key="index" @click="choosenext(3,index)">
						<p>{{item.text}}</p>
						<uni-icons type="arrowright" size="15" ></uni-icons>
					</view>
					<view v-show="chooseindex==4" class="itemlist flex" v-for="(item,index) in childlist" :key="index" @click="choosenext(4,index)">
						<p>{{item.text}}</p>
						<uni-icons type="arrowright" size="15" ></uni-icons>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl: app.globalData.baseUrl,
				imgUrl: app.globalData.imageUrl,
				form: {
					name:"",
					rank:"",
					card:"",
					img1:"",
					img2:"",
					img3:"",
					img4:"",
					img5:"",
					img6:"",
				},
				warn: {
					name:"请填写户主姓名",
					rank:"请选择开户行",
					card:"请填写银行卡账号",
					img1:"请上传身份证人像面",
					img2:"请上传身份证国徽面",
					img3:"请上传手持身份证照片",
					img4:"请上传银行卡正面",
					img5:"请上传银行卡背面",
					img6:"请上传手持银行卡照片",
				},
				chooseindex:1, //1 银行 2 省 3 市 4分行
				ranklist:[{text:"中国银行"},{text:"农业银行"},{text:"中国银行"},{text:"农业银行"},{text:"中国银行"},{text:"农业银行"},{text:"中国银行"},{text:"农业银行"},],
				provlist:[{text:"广东省"},{text:"云南省"},{text:"广东省"},{text:"云南省"},],
				citylist:[{text:"广州市"},{text:"深圳市"},],
				childlist:[{text:"天河分行"},],
				chooserank:["","","",""]
			}
		},
		onLoad(options) {

		},
		onShow() {

		},
		methods: {
			sendpicture(index) {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: (res) => {
						var imglist = res.tempFilePaths[0];
						wx.uploadFile({
							url: this.baseUrl + "/",
							filePath: imglist,
							name: 'file',
							formData: {},
							header: {
								'content-type': 'multipart/form-data',
								'token': uni.getStorageSync("token"),
							},
							success: (rq) => {

							},
						})
					}
				})
			},
			choosechange(){
				this.chooseindex--;
			},
			choosenext(type,index){
				switch(type){
					case 1:this.chooseindex=2;this.chooserank[0]=index;break;
					case 2:this.chooseindex=3;this.chooserank[1]=index;break;
					case 3:this.chooseindex=4;this.chooserank[2]=index;break;
					case 4:
						this.chooserank[3]=index;
						this.form.rank = this.chooserank[0];
						this.$refs.popup.close();
						this.chooseindex = 1;
						break;
				}
			},
			saveinfo(){
				for (let key in this.warn) {
					if(!this.form[key]) {app.tip(this.warn[key]);return;}
				}
				app.loading("保存中");
				api.save({}).then(res => {
				    app.loaded();
				})
			},
		}
	}
</script>

<style lang="scss">
	.choosebox{background:#fff;height:758rpx;
		.headtitle{line-height:140rpx;font-size:34rpx;text-align:center;position: relative;
			.backicon{padding-left:28rpx;position:absolute;left: 0;}
		}
		.choosebody{height:610rpx;overflow-y: auto;
			.itemlist{line-height:96rpx;border-bottom: 1rpx solid #eee;margin:0 30rpx;padding:0 6rpx;
				p{flex:1}
			}
		}
	}
	.contentbox {
		padding: 0 30rpx;

		.uploadbox {
			padding: 40rpx 0;
			border-bottom: 1px solid #eee;

			image {
				width: 268rpx;
				margin-right: 36rpx;
			}

			.textbox {
				view:nth-child(1) {
					font-size: 34rpx;
					padding-bottom: 12rpx;
				}

				text:nth-child(2) {
					font-size: 28rpx;
					color: #707578;
				}
			}
		}

		.introbox {
			padding-bottom: 25rpx;

			.bigtitle {
				padding: 50rpx 0 20rpx;
				font-size: 44rpx;
			}

			.textinfo {
				font-size: 28rpx;
			}
		}

		.linebox {
			border-bottom: 1px solid #eee;
			min-height: 100rpx;
			padding: 0 0 0 6rpx;

			.lefttext {
				width: 100rpx;
				padding-right: 32rpx;
			}

			.rightarea {
				flex: 1;
				color: #888;
			}
		}

		.pagebottombt {
			padding: 100rpx 0;

			view {
				background: #FF460A;
				color: #fff;
				text-align: center;
				font-size: 38rpx;
				line-height: 88rpx;
				border-radius: 10rpx;
				margin: 0 74rpx 0 74rpx;
			}
		}
	}

	.pageline {
		height: 20rpx;
		background: #F7F7F7;
	}
</style>
