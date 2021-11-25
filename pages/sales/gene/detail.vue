<template>
	<view class="containter">
		<turnback> </turnback>

		<view class="list-box">
			<view class="list-content ">
				<view class="enlisttitle">
					上传申请单：
					<view style="padding:30rpx 0 10rpx;">
						<view v-show="!info.requesitionUrl[0]&&!info.request1Files[0]" class="flex" style="color:#aaa;font-size:28rpx;">
							<uni-icons type="close" size="18" color="#aaa"></uni-icons>
							<view style="padding-left:10rpx;">您还没有上传申请单</view>
						</view>
						<image v-for="(item,index) in info.requesitionUrl" :src="baseUrl+item" mode="aspectFit" class="applyimg" @click="previewimg(baseUrl+item)"></image>
						<image v-for="(item,index) in info.request1Files" :src="item" mode="aspectFit" class="applyimg" @click="previewimg(item)"></image>
					</view>
				</view>
				<!-- <view class="enlistitem flex"><view class="title">检测项目：</view><view class="content">样本组合</view></view> -->
				<view class="enlistitem flex"><view class="title">样本组合：</view><view class="content">{{info.combination==0?"主样本":(info.combination==1?"主样本+对照血":(info.combination==2?"主样本+对照血+备用样本":""))}}</view></view>
				<view class="enlistitem flex"><view class="title">主样本编号：</view><view class="content">{{info.sampleCode}}</view></view>
				<view class="enlistitem flex"><view class="title">样本类型：</view><view class="content">{{info.sampleType}}</view></view>
				<view class="enlistitem flex" v-show="info.combination!=0"><view class="title">对照血样本编号：</view><view class="content">{{info.sampleCode1}}</view></view>
				<view class="enlistitem flex" v-show="info.combination!=0"><view class="title">对照血样本类型：</view><view class="content">{{info.sampleType1}}</view></view>
				<view class="enlistitem flex" v-show="info.combination==2"><view class="title">备用样本编号：</view><view class="content">{{info.sampleCode2}}</view></view>
				<view class="enlistitem flex" v-show="info.combination==2"><view class="title">备用样本类型：</view><view class="content">{{info.sampleType2}}</view></view>
				<!-- <view class="enlistitem flex"><view class="title">订单金额：</view><view class="content">样本组合</view></view> -->
				<view class="enlistitem flex"><view class="title">采集日期：</view><view class="content">{{info.collectTime}}</view></view>
				<view class="enlistitem flex"><view class="title">快递单号：</view><view class="content">{{info.expressCode}}</view></view>
				<view class="enlistitem flex"><view class="title">报告收货地址：</view><view class="content">{{info.sendReport==1?(info.reportAddress[0]+" "+info.reportAddress[1]+" "+info.reportAddress[2]+" "+info.reportAddressDetail):"不需要寄送纸质报告"}}</view></view>
				<view class="enlistitem flex"><view class="title">备注：</view><view class="content">{{info.remark}}</view></view>
				<view class="enlistitem flex"><view class="title">姓名：</view><view class="content">{{info.patientName}}</view></view>
				<view class="enlistitem flex"><view class="title">身份证号：</view><view class="content">{{info.idCard}}</view></view>
				<view class="enlistitem flex"><view class="title">性别：</view><view class="content">{{info.sex==1?"男":(info.sex==0?"女":"")}}</view></view>
				<view class="enlistitem flex"><view class="title">年龄：</view><view class="content">{{info.age}}</view></view>
				<view class="enlistitem flex"><view class="title">联系电话：</view><view class="content">{{info.mobile}}</view></view>
				<view class="enlistitem flex"><view class="title">生活过的城市：</view><view class="content">{{info.city?(info.city[0]+" "+info.city[1]+" "+info.city[2]):""}}</view></view>
				<view class="enlisttitle" style="margin-top:20rpx;">
					上传病理信息单：
					<view style="padding:30rpx 0 10rpx;">
						<view v-show="!info.pathologicalUrl[0]&&!info.bl1Files[0]" class="flex" style="color:#aaa;font-size:28rpx;">
							<uni-icons type="close" size="18" color="#aaa"></uni-icons>
							<view style="padding-left:10rpx;">您还没有上传病理信息单</view>
						</view>
						<image v-for="(item,index) in info.pathologicalUrl" :src="baseUrl+item" mode="aspectFit" class="applyimg" @click="previewimg(baseUrl+item)"></image>
						<image v-for="(item,index) in info.bl1Files" :src="item" mode="aspectFit" class="applyimg" @click="previewimg(item)"></image>
					</view>
				</view>
				<view class="enlistitem flex"><view class="title">输血或器官移植(3个月内)：</view><view class="content">{{info.organTrans==1?"是":(info.organTrans==0?"否":"")}}</view></view>
				<view v-show="info.ER">
					<view class="enlistitem flex"><view class="title">肿瘤大小参数：</view><view class="content">{{info.tumorSize}}</view></view>
					<view class="enlistitem flex"><view class="title">ki67：</view><view class="content">{{info.ki67}}</view></view>
					<view class="enlistitem flex"><view class="title">淋巴结转移情况：</view><view class="content">{{info.lymphTrans}}</view></view>
					<view class="enlistitem flex"><view class="title">ER：</view><view class="content">{{info.ER}}</view></view>
					<view class="enlistitem flex"><view class="title">PR：</view><view class="content">{{info.PR}}</view></view>
					<view class="enlistitem flex"><view class="title">HER-2：</view><view class="content">{{info.HER}}</view></view>
				</view>
				<view class="enlistitem flex"><view class="title">家族史：</view><view class="content">{{info.familyHistory}}</view></view>
				<view class="enlistitem flex"><view class="title">组织来源：</view><view class="content">{{info.tissueSource}}</view></view>
				<view class="enlistitem flex"><view class="title">送检癌种：</view><view class="content">{{info.tumorType}}</view></view>
				<view class="enlistitem flex"><view class="title">肿瘤分期：</view><view class="content">{{genelist[info.tumorStage||0].value}}</view></view>
				<view class="enlistitem flex"><view class="title">肿瘤细胞含量：</view><view class="content">{{info.tumorCellContent}}</view></view>
				<view class="enlistitem flex"><view class="title">疾病史：</view><view class="content">{{info.diseaseHistory}}</view></view>
				
				<view class="enlistitem flex"><view class="title">开具发票：</view><view class="content">{{info.isNeedInvoice==1?"需要":"不需要"}}</view></view>
				<view v-show="info.isNeedInvoice==1">
				<view v-show="info.isNeedInvoice==1" class="enlistitem "><view class="title">发票邮递地址/联系人/联系电话：</view><view class="content">{{info.invoiceAddress}}</view></view>
				<view class="enlistitem flex"><view class="title">发票类型：</view><view class="content">{{info.isCompanyInvoice==1?"个人普票":(info.isCompanyInvoice==0?"单位普票":(info.isCompanyInvoice==2?"单位专票":""))}}</view></view>
				<view v-show="info.isCompanyInvoice==2" class="enlistitem "><view class="title">单位的具体运营地址以及联系电话：</view><view class="content">{{info.companyAddress}}</view></view>
				<view class="enlistitem flex"><view class="title">电子邮箱：</view><view class="content">{{info.email}}</view></view>
				<view v-show="info.isCompanyInvoice!=1" class="enlistitem flex"><view class="title">纳税人识别号：</view><view class="content">{{info.taxpayerCode}}</view></view>
				<view v-show="info.isCompanyInvoice!=1" class="enlistitem flex"><view class="title">发票抬头：</view><view class="content">{{info.invoiceTitle}}</view></view>
				<view v-show="info.isCompanyInvoice==2" class="enlistitem flex"><view class="title">银行账户：</view><view class="content">{{info.bankCode}}</view></view>
				</view>
				<view class="flex" style="margin-top:50rpx;justify-content:space-around;">
					<view v-show="!id" class="cardicon" @click="addrecommend(1)">重新编辑</view>
					<view v-show="id" class="cardicon" @click="addrecommend(2)">修改</view>
					<view v-show="!id" class="cardicon delete" @click="addrecommend(3)">提交</view>
					<view v-show="id" class="cardicon delete" @click="removerecommend()">返回</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import turnback from "../../../components/turnback.vue"
	const app = getApp();
	export default {
		components: {
			turnback
		},
		data() {
			return {
				baseUrl: app.globalData.baseUrl,
				pageCount: 1,
				pageNo: 1,
				goodname: "",
				categoryItems: ['默认', '新品', '销量', '分类'],
				choseCategory: 0,
				list: [],
				subCategoryItms: [{
					name: "待送样",
					id: 1
				}, {
					name: "检测中",
					id: 2
				}, {
					name: "已出报告",
					id: 3
				}],
				subCate: '',
				orderBy: 1, //排序方式 （1.按序列号 2.按上架时间 3：销量）
				classId: 1,
				id: '',
				title: '',
				subTitle: '',
				intro: '',
				myinfo: {},
				buyid: "",
				buyshow: false,
				info:{requesitionUrl:[],request1Files:[],pathologicalUrl:[],bl1Files:[]},
				options:{},
				genelist:[{"value":"0","key":0},{"value":"I","key":1},{"value":"II","key":2},{"value":"III","key":3},{"value":"IV","key":4}],
			}
		},
		onLoad(options) {
			// console.log(app.newapplydata);
			this.options = options||{};
			
			//this.refreshData();
			// this.getAllClasses();
			this.id = options.id;
			this.goodname = options.name || "";
			uni.setNavigationBarTitle({
				title: options.title
			});
			this.title = options.title;
			this.subTitle = options.subTitle;
			this.intro = options.intro;
			// this.getListData();
			if(this.id){
				this.getInfo();
			}else{
				if(app.newapplydata) this.info = app.newapplydata;
			}
		},
		onShow() {
			// this.getmyinfo();
		},
		methods: {
			getInfo() {
				app.ordergetInfo({orderId:this.id}).then(res => {
					if (res.status == 1) {
						if (res.data) {
							res.data.requesitionUrl = res.data.requesitionUrl?res.data.requesitionUrl.split(","):[];
							res.data.pathologicalUrl = res.data.pathologicalUrl?res.data.pathologicalUrl.split(","):[];
							res.data.request1Files = [];
							res.data.bl1Files = [];
							res.data.reportAddress = res.data.reportAddress.split(" ");
							res.data.city = res.data.city.split(" ");
							if(res.data.immunResult) {
								res.data.immunResult = res.data.immunResult.split(",");
							}else res.data.immunResult = ["","",""];
							res.data.ER = res.data.immunResult[0];
							res.data.PR = res.data.immunResult[1];
							res.data.HER = res.data.immunResult[2];
							this.info = res.data;
						}
					}
				});
			},
			closepopup() {
				this.$refs.popup.close();
			},
			choseCate(index) {
				this.choseCategory = index;
				this.classId = this.subCategoryItms[index].id;
				// this.orderBy = index+1;
				this.refreshData();
				document.body.scrollIntoView();
			},
			refreshData() {
				this.pageNo = 1;
				this.getListData();
			},
			loadMoreDate() {
				this.pageNo++;
				this.getListData();
			},
			getListData() {
				if (this.pageCount < this.pageNo) return;
				app.loading("加载中")
				app.getRecommendPage({
					patientId: this.id,
					relateType: this.classId,
					name: this.goodname || "",
					pageNo: this.pageNo
				}).then(res => {
					app.loaded();
					this.pageCount = res.data.pageCount > 1 ? res.data.pageCount : 1;
					if (this.pageNo === 1) {
						this.list = res.data.list;
					} else {
						this.list = this.list.concat(res.data.list);
					}
					uni.stopPullDownRefresh();
				});
			},

			getAllClasses() {
				app.homeAllClasses({}).then(res => {
					if (res.status == 1) {
						this.subCategoryItms = this.subCategoryItms.concat(res.data);
						if (this.subCategoryItms[0]) {
							this.choseCategory = 0;
							this.classId = this.subCategoryItms[0].id;
							this.refreshData();
						}
					}
				});
			},
			getmyinfo() {
				if (app.getCache("token")) {
					app.mydata({}).then(res => {
						this.myinfo = res.data;
					});
				}
			},
			showbug(item) {
				this.buyshow = false;
				this.buyid = item.id;
				setTimeout(() => {
					this.buyshow = true;
				}, 200)
			},
			addrecommend(index) {
				switch (index) {
					case 1:
						uni.navigateBack({});
						break;
					case 2:
						uni.redirectTo({
							url: "/pages/sales/gene/new?id=" + this.info.orderId
						})
						break;
					case 3:
						this.senddata();
						break;
				}
			},
			uploadImg(cal) {
				let uploadCount = 0;
				for (let i = 0; i < this.info.request1Files.length; i++) {
					let formData = {
						"module": "gene",
						'salesToken':localStorage.getItem("salesToken"),
						'uid': localStorage.getItem("uid"),
						'channel':app.globalData.channel,
					}
					uni.uploadFile({
						url: '/api' + '/wx/file/uploadPicture',
						filePath: this.info.request1Files[i],
						name: 'file',
						formData: formData,
						success: (res) => {
							let data = JSON.parse(res.data);
							if (data.status == 1) {
								uploadCount++;
								// this.info.request1Files[i] = data.data.pictureUrl;
								this.info.requesitionUrl.push(data.data.pictureUrl);
								if (uploadCount == this.info.request1Files.length) {
									this.info.request1Files = [];
									this.uploadImg1(cal);
								}
							}
						},
						fail: (res) => {
							// app.tip("图片上传失败");
							uploadCount++;
						}
						
					});
				}
				if(!this.info.request1Files[0]) this.uploadImg1(cal);
			},
			uploadImg1(cal) {
				let uploadCount = 0;
				for (let i = 0; i < this.info.bl1Files.length; i++) {
					let formData = {
						"module": "gene",
						'salesToken':localStorage.getItem("salesToken"),
						'uid': localStorage.getItem("uid"),
						'channel':app.globalData.channel,
					}
					uni.uploadFile({
						url: '/api' + '/wx/file/uploadPicture',
						filePath: this.info.bl1Files[i],
						name: 'file',
						formData: formData,
						success: (res) => {
							let data = JSON.parse(res.data);
							if (data.status == 1) {
								uploadCount++;
								// this.info.bl1Files[i] = data.data.pictureUrl;
								this.info.pathologicalUrl.push(data.data.pictureUrl);
								if (uploadCount == this.info.bl1Files.length) {
									this.info.bl1Files = [];
									cal();
								}
							}
						},
						fail: (res) => {
							// app.tip("图片上传失败");
							uploadCount++;
						}
					});
				}
				if(!this.info.bl1Files[0]) cal();
			},
			senddata(){
				app.loading("保存中");
				this.uploadImg(()=>{
					let senddata = JSON.parse(JSON.stringify(this.info));
					// this.info.requesitionUrl = this.info.requesitionUrl.concat(this.info.request1Files);
					// this.info.pathologicalUrl = this.info.pathologicalUrl.concat(this.info.bl1Files);
					let reg = this.info.requesitionUrl.join(",");
					senddata.requesitionUrl = reg;
					let reg1 = this.info.pathologicalUrl.join(",");
					senddata.pathologicalUrl = reg1;
					let reg2 = this.info.reportAddress.join(" ");
					senddata.reportAddress = reg2;
					let reg3 = this.info.city.join(" ");
					senddata.city = reg3;
					if(senddata.ER){
						senddata.immunResult = senddata.ER+","+senddata.PR+","+senddata.HER
					}
					
					// console.log(this.info);
					if(this.options.change){
						app.orderupdateInfo(senddata).then(res => {
							app.tip(res.msg);
							uni.redirectTo({
								url: "/pages/sales/gene/detail?id=" + this.info.orderId
							})
						});
					}else{
						app.sampleordersave(senddata).then(res => {
							app.tip(res.msg);
							uni.redirectTo({
								url: "/pages/sales/gene/detail?id=" + this.info.orderId
							})
						});
					}
				});
			},
			removerecommend() {
				if(this.options.back) uni.navigateBack({delta:1});
				else{
					let pdata = getCurrentPages();
					for (let i = 0; i < pdata.length; i++) {
						if(pdata[i].route=="pages/sales/gene/order"){
							uni.navigateBack({delta:pdata.length-1-i});return;
						}
					}
				}
			},
			previewimg(url){
				uni.previewImage({
					urls:[url]
				})
			},
		},
		onReachBottom() {
			this.loadMoreDate();
		},

	}
</script>

<style scoped lang="scss">
	.applyimg{width:200rpx;height:200rpx;margin:10rpx 10rpx 0 0;}
	.containter {

		.cardicon {
			font-size: 32rpx;
			padding: 20rpx 26rpx;
			color: #fff;width:35%;
			background: #2894EC;box-sizing:border-box;
			border-radius: 10rpx;text-align:center;
			line-height: 1;

			&.delete {
				margin-left: 0rpx;
			}

			&.finish {
				background: #ccc;
			}
		}

		.list-box {
			background-color: #fff;

			.list-content {
				background-color: #FFFFFF;
				margin-left: 30rpx;
				margin-right: 30rpx;
				box-sizing: border-box;
				padding: 20rpx 20rpx 80rpx 20rpx;
				border-radius: 5px 5px 0px 0px;

				.goodsimg {
					width: 260rpx;
					height: 260rpx;
					margin-right: 20rpx;
				}

				.swiper-content {
					position: relative;

					.swiper {
						height: 420rpx;

						swiper-item {
							width: 100%;
							height: 100%;

							image {
								width: 100%;
								height: 420rpx;
								border-radius: 5px 5px 5px 5px;
							}
						}
					}

					.playbox {
						position: absolute;
						right: 30rpx;
						bottom: 18rpx;
						width: 84rpx;
						line-height: 46rpx;
						background: rgba(38, 42, 38, 0.4);
						border-radius: 22rpx;
						font-size: 22rpx;
						color: #fff;
						text-align: center;
					}
				}

				.list-title {
					font-size: 30rpx;
					color: #272727;
					margin-bottom: 2rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.list-tag {
					// position: absolute;
					right: 50rpx;
					top: 10rpx;
					font-size: 13px;
					color: #C10000;
					border-radius: 19rpx;
					padding: 10rpx 0px 0;
				}

				.list-price {
					position: relative;
					color: #C10000;
					font-size: 16px;
					margin-top: 15rpx;
					display: flex;



					.originalPrice {
						font-size: 26rpx;
						margin-left: 15rpx;
						margin-top: 4rpx;
						color: #666666;
						text-decoration: line-through;
					}

					.price {
						margin-left: 15rpx;
						color: #C10000;
						font-size: 26rpx;
					}


				}

				.list-buybtn {
					margin-top: 40rpx;
					border-radius: 10rpx;
					margin-left: 55rpx;
					margin-right: 55rpx;
					background-color: #CC0000;
					color: #FFFFFF;
					font-size: 19px;
					height: 75rpx;
					line-height: 75rpx;
					text-align: center;
				}
			}
		}
	}

	.enlistitem {
		font-size: 30rpx;
		color: #333;
		padding: 10rpx 0 30rpx;
		.title{font-weight:bold;padding-right:24rpx;color:#000;font-size:32rpx;}
		.content{flex:1;}
	}

	.enlisttitle {
		font-size: 32rpx;
		font-weight: bold;
		padding-bottom: 26rpx;
		border-bottom: 2rpx solid #e5e5e5;
		margin-bottom: 24rpx;
	}
</style>
