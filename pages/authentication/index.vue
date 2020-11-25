<template>
	<view>
		<view class="contentbox">
			<view class="introbox">
				<view class="bigtitle">请完善身份信息</view>
				<view class="textinfo">提现前，您需要提交个人身份信息，并通过平台审核。</view>
				<view class="textinfo">平台审核通过后，您会收到手机短信通知。审核时长一般在1个工作日内完成。</view>
			</view>
			<view class="uploadbox flex" @click="sendpicture(1)">
				<image :src="form.idCardFront?(baseUrl+form.idCardFront):'../../static/auth/1.png'" mode="widthFix"></image>
			</view>
			<view class="uploadbox flex" @click="sendpicture(2)">
				<image :src="form.idCardBack?(baseUrl+form.idCardBack):'../../static/auth/2.png'" mode="widthFix"></image>
			</view>
			<view class="uploadbox flex" @click="sendpicture(3)">
				<image :src="form.handIdCard?(baseUrl+form.handIdCard):'../../static/auth/3.png'" mode="widthFix"></image>
				<view class="textbox">
					<view>照片必须清晰可见上半身及身份证人像面信息</view>
				</view>
			</view>
			<view class="uploadbox flex" @click="sendpicture(4)">
				<image :src="form.bankCardFront?(baseUrl+form.bankCardFront):'../../static/auth/4.png'" mode="widthFix"></image>
			</view>
			<view class="uploadbox flex" @click="sendpicture(5)">
				<image :src="form.bankCardBack?(baseUrl+form.bankCardBack):'../../static/auth/5.png'" mode="widthFix"></image>
				
			</view>
			<view class="uploadbox flex" @click="sendpicture(6)">
				<image :src="form.handBankCard?(baseUrl+form.handBankCard):'../../static/auth/6.png'" mode="widthFix"></image>
				<view class="textbox">
					<view>照片必须清晰可见上半身及银行卡卡号面信息</view>
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
				<input class="rightarea" v-model="form.legalName" maxlength="20" placeholder="请填写户主姓名" />
			</view>
			<view class="flex linebox">
				<view class="lefttext">身份证</view>
				<input class="rightarea" v-model="form.legalIdCard" maxlength="20" placeholder="请填写身份证号码" />
			</view>
			<view class="flex linebox" @click="openframe">
				<view class="lefttext">开户行</view>
				<view class="rightarea">{{form.bank?form.bank:"点击选择开户行"}}</view>
			</view>
			<view class="flex linebox">
				<view class="lefttext">账号</view>
				<input class="rightarea" type="number" v-model="form.cardNo" maxlength="30" placeholder="请填写银行卡账号" />
			</view>

			<view class="pagebottombt">
				<view @click="saveinfo">确定</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" @change="changeframe">
			<view class="choosebox">
				<view class="headtitle">{{chooseindex==1?"银行名称":(chooseindex==2?"开户行所在省":(chooseindex==3?"开户行所在市":"开户行名称"))}}
					<uni-icons type="arrowleft" size="15" class="backicon" v-show="chooseindex!=1" @click="choosechange"></uni-icons>
				</view>
				<scroll-view class="choosebody" scroll-y="true">
					<view v-if="chooseindex==1" class="itemlist flex" v-for="(item,index) in ranklist" :key="index" @click="choosenext(1,index)">
						<p>{{item.name}}</p>
						<uni-icons type="arrowright" size="15" ></uni-icons>
					</view>
					<view v-if="chooseindex==2" class="itemlist flex" v-for="(item,index) in provlist" :key="index" @click="choosenext(2,index)">
						<p>{{item.name}}</p>
						<uni-icons type="arrowright" size="15" ></uni-icons>
					</view>
					<view v-if="chooseindex==3" class="itemlist flex" v-for="(item,index) in citylist" :key="index" @click="choosenext(3,index)">
						<p>{{item.name}}</p>
						<uni-icons type="arrowright" size="15" ></uni-icons>
					</view>
					<view v-if="chooseindex==4" class="itemlist flex" v-for="(item,index) in childlist" :key="index" @click="choosenext(4,index)">
						<p>{{item.name}}</p>
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
				options:{},
				baseUrl: app.globalData.baseUrl,
				imgUrl: app.globalData.imageUrl,
				form: {
					legalName:"",//银行账户
					bank:"",
					legalIdCard:"",//身份证号
					cardNo:"", //账号
					id:"",
					idCardFront:"", // 身份证正面图片url
					idCardBack:"", // 身份证背面图片url
					bankCardFront:"",// 银行卡正面图片url
					bankCardBack:"", // 银行卡背面图片url
					handIdCard:"", //手持身份证正面图片url
					handBankCard:"", // 手持银行卡背面图片url
					bankCity:"",//银行卡城市id
					bankProvince:"",//银行卡开户省id
					bankCode:"",//支行编码
					headBankNo:"",//开户银行总行编码
				},
				warn: {
					idCardFront:"请上传身份证人像面",
					idCardBack:"请上传身份证国徽面",
					handIdCard:"请上传手持身份证照片",
					bankCardFront:"请上传银行卡正面",
					bankCardBack:"请上传银行卡背面",
					handBankCard:"请上传手持银行卡照片",
					legalName:"请填写户主姓名",
					legalIdCard:"请填写身份证号码",
					bank:"请选择开户行",
					cardNo:"请填写银行卡账号",
					
				},
				chooseindex:1, //1 银行 2 省 3 市 4分行
				ranklist:[],
				provlist:[],
				citylist:[],
				childlist:[],
				chooserank:["","","",""]
			}
		},
		onLoad(options) {
			this.options = options;
			if(options.id) this.getinfo();
			
		},
		onShow() {

		},
		methods: {
			getinfo(){
				app.loading("连接中");
				app.authentication({id:this.options.id}).then(res => {
					this.form = res.data;
				    app.loaded();
				})
			},
			openframe(){
				this.$refs.popup.open();
				if(!this.ranklist[0]) this.banklist();
				if(!this.provlist[0]) this.findProvinces();
			},
			banklist(){ //总行
				app.loading();
				app.banklist({}).then(res => {
					app.loaded();
					this.ranklist = res.data;
				})
			},
			subBranchList(headBankNo,bankProvinceNo,bankCityNo){ //分行
				app.loading();
				app.subBranchList({headBankNo,bankProvinceNo,bankCityNo}).then(res => {
					app.loaded();
					let list = [];
					for (let key in res.data) {
						list.push({id:key,name:res.data[key]});
					}
					this.childlist = list;
				})
			},
			findProvinces(){
				app.loading();
				app.findProvinces({pid:0}).then(res => {
					app.loaded();
					this.provlist = res.data;
				})
			},
			findCities(pid){
				app.loading();
				app.findProvinces({pid}).then(res => {
					app.loaded();
					this.citylist = res.data;
				})
			},
			sendpicture(index) {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: (res) => {
						app.loading("保存中");
						var imglist = res.tempFilePaths[0];
						uni.uploadFile({
							url: '/api' + "/wx/file/uploadPicture",
							filePath: imglist,
							name: 'file',
							formData: {
								"module":"bank",
								'uid': uni.getStorageSync("uid"),
							},
							success: (rq) => {
								console.log(rq)
								let data = JSON.parse(rq.data);
								switch(index){
									case 1:this.form.idCardFront = data.data.pictureUrl;break;
									case 2:this.form.idCardBack = data.data.pictureUrl;break;
									case 3:this.form.handIdCard = data.data.pictureUrl;break;
									case 4:this.form.bankCardFront = data.data.pictureUrl;break;
									case 5:this.form.bankCardBack = data.data.pictureUrl;break;
									case 6:this.form.handBankCard = data.data.pictureUrl;break;
								}
								
							},
							complete:re=>{app.loaded();}
						})
					}
				})
			},
			choosechange(){
				this.chooseindex--;
			},
			choosenext(type,index){
				switch(type){
					case 1:this.chooseindex=2;this.chooserank[0]=this.ranklist[index];
						break;
					case 2:this.chooseindex=3;this.chooserank[1]=this.provlist[index];
						this.findCities(this.chooserank[1].id);
						break;
					case 3:this.chooseindex=4;this.chooserank[2]=this.citylist[index];
						this.subBranchList(this.chooserank[0].code,this.chooserank[1].id,this.chooserank[2].id);
						break;
					case 4:
						this.chooserank[3]=this.childlist[index];
						this.form.bank = this.chooserank[0].name;
						this.form.headBankNo = this.chooserank[0].code;
						this.form.bankCity = this.chooserank[2].id;
						this.form.bankProvince = this.chooserank[1].id;
						this.form.bankCode = this.chooserank[3].id;
						this.$refs.popup.close();
						this.chooseindex = 1;
						break;
				}
			},
			changeframe(e){
				if(!e.show) this.chooseindex = 1;
			},
			saveinfo(){
				for (let key in this.warn) {
					if(!this.form[key]) {app.tip(this.warn[key]);return;}
				}
				let data = JSON.parse(JSON.stringify(this.form));
				
				app.loading("保存中");
				app.saveAuthentication(data).then(res => {
				    app.loaded();
					uni.reLaunch({
						url:"/pages/authentication/result",
					})
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
		padding: 0 40rpx;

		.uploadbox {
			padding: 40rpx 0;
			border-bottom: 1px solid #eee;

			image {
				width: 100%;
			}

			.textbox {
				font-size:28rpx;color:#BA0000;padding-top:10rpx;
			}
		}

		.introbox {
			padding-bottom: 25rpx;

			.bigtitle {
				padding: 50rpx 0 20rpx;
				font-size: 36rpx;
			}

			.textinfo {
				font-size: 26rpx;
			}
		}

		.linebox {
			border-bottom: 1px solid #eee;
			min-height: 100rpx;font-size:32rpx;
			padding: 0 0 0 6rpx;

			.lefttext {
				width: 120rpx;
				padding-right: 32rpx;
			}

			.rightarea {
				flex: 1;font-size:32rpx;
				color: #888;
			}
		}

		.pagebottombt {
			padding: 100rpx 0;

			view {
				background: #52A29E;
				color: #fff;
				text-align: center;
				font-size: 34rpx;
				line-height: 88rpx;
				border-radius: 45rpx;
				margin: 0 20rpx 0 20rpx;
			}
		}
	}

	.pageline {
		height: 20rpx;
		background: #F7F7F7;
	}
</style>
