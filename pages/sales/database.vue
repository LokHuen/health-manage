<template>
	<view class="container">
		<view class="top-box">
			<view v-for="(item,index) in dirList" :key="index" class="top-item" @click="toproduct(item)">
				<image class="top-img" src="" mode=""></image>
				<view class="top-title">{{item.directory}}</view>
			</view>
		</view>
		
		
		
		<view class="bottom-title">最近7天上传</view>
		<view class="bottom-box">
			
			<view v-for="(item,index) in bottomList" :key="index">
				<view class="bottom-item">
					<image class="img" src="" mode=""></image>
					<view class="content-box">
						<view class="content">{{item.fileName}}</view>
						<!-- <view class="toppost" v-if="">【置顶文档】</view> -->
					    <view class="flex" style="margin-top: 20rpx;">
					    	<view class="button-item" @click="sendEmail(item)">
					    		发送到邮箱
					    	</view>
					    	<view class="button-item" @click="toDetail(item)">
					    		阅读正文
					    	</view>
					    </view>
					</view>
				</view>
			</view>
			
		</view>
		
		
		
		<uni-popup ref="popup" type="center">
			<view class="white-background1">
				<view class="title-box">
					<view class="title1">发送邮件数据
						<image src="../../static/icon_close.png" mode="" class="closeBtn1" @click="closePopup"></image>
					</view>
				</view>
				<view class="detail-box1">
					系统会将文件信息通过邮件发送给您
				</view>
				<input class="input-box" placeholder="请输入邮箱地址" v-model="email"/>
				<button class="confirm-box" @click="exportSucess()">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app1 = getApp();
	export default {

		data() {
			return {
				dirList: [],
				bottomList:[],
				pageNo:1,
				currentItem:'',//操作的对象，分享/发邮件
				email:''
                
			}
		},
		onLoad(props) {
			this.refreshData();
		},
		methods: {
			toDetail(item){
				var u = navigator.userAgent, app = navigator.appVersion; 
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器 
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
				
				if(isiOS){
					window.open(app1.globalData.baseUrl+item.fileUrl,"_blank");
				}
				if(isAndroid){
					// 后缀获取
					 var suffix = ''
					 var flieArr = item.fileName.split('.')
					 suffix = flieArr[flieArr.length - 1];
			         if(suffix=='pdf'){
						 // uni.navigateTo({
						 // 	url:'file-detail?url='+item.fileUrl
						 // })	
						 
						 var fileSrc = encodeURIComponent(app1.globalData.baseUrl + item.fileUrl);
						 window.open('http://view.officeapps.live.com/op/view.aspx?src='+this.fileSrc,"_blank")
					 }else{
						var fileSrc = encodeURIComponent(app1.globalData.baseUrl + item.fileUrl);
						window.open('http://view.officeapps.live.com/op/view.aspx?src='+this.fileSrc,"_blank")
					 }
					
				}
			 
			},
			
			closePopup(){
				this.$refs.popup.close();
			},
			exportSucess(){
				if(!this.email){
					app1.tip('请输入邮箱地址')
					return;
				}
				let params = {email:this.email,fileUrl:this.currentItem.fileUrl};
				
				//导出数据
				app1.sendMail(params).then(res =>{
					if(res.status == 1){
						app1.tip('发送成功');
						this.email ='';
						this.closePopup();
					}
				});
				
			},
			share(item){
				
			},
			sendEmail(item){
			   this.currentItem = item;
			   this.$refs.popup.open();
			},
			
			toproduct(item){
				uni.navigateTo({
					url:'file-list?directoryId='+item.id
				})
			},
			// todetail(item){
			// 	let links =item.fileUrl; 
			// 	uni.navigateTo({
			// 		url:'file-detail?links='+ links,
			// 	})
			// },
			refreshData(){
				this.pageNo = 1;
				this.getData();
			},
			loadmoreData(){
				this.pageNo++;
				this.getData();
			},
			getData(){
				app1.fileFindDir({pageNo:this.pageNo}).then(res =>{
					if (res.status == 1) {
						this.dirList = res.data.dirList;
						if (this.pageNo == 1) {
							this.bottomList = res.data.filePage.list;
						} else {
							if (res.data.filePage.pageCount >= this.pageNo) {
								this.bottomList = this.bottomList.concat(res.data.filePage.list);
							}
						}
					}
				});
			}
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.loadmoreData();
		},

	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.container {
		
		.white-background1 {
			background-color: #FFFFFF;
			border-radius: 10rpx;
			margin: 0 60rpx;
			padding: 60rpx;
		}
		
		.title-box {
			text-align: center;
			.title1 {
				color: #52A29E;
				font-size: 34rpx;
				position: relative;
			}
		}
		
			.close1 {
				position: absolute;
				right: 0;
				height: 80rpx;
				width: 80rpx;
				background-color: #EAEAEA;
				color: #666666;
				font-size: 50rpx;
			}
		
		
		.detail-box1 {
			color: #666666;
			font: bold;
			font-size: 32rpx;
				line-height: 50rpx;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}
		
		.input-box {
			background-color: #EAEAEA;
			border-radius: 6rpx;
			height: 80rpx;
			padding-left: 15rpx;
			margin-bottom: 60rpx;
		}
		
		.confirm-box {
			width: 85%;
		  	height: 90rpx;
		  	font-size: 34rpx;
		  	color: white;
		  	background-color: #52A29E;
		  	border-radius: 45rpx;
		}
		
		.closeBtn1{
				width: 26rpx;
				height: 26rpx;
				position: absolute;
				right: 20rpx;
				top: 10rpx;
		}
		
		
		.top-box{
			background-color: #FFFFFF;
			display: flex;
			flex-wrap:wrap;
			.top-item{
				width: 250rpx;
				height: 250rpx;
				.top-img{
					background-color: #3B4144;
					margin-top: 40rpx;
					margin-left: 70rpx;
					width: 110rpx;
					height: 100rpx;
					
				}
				.top-title{
					margin-top: 20rpx;
					color: #666666;
					font-size: 28rpx;
					text-align: center;
				}
				
			}
		}
		
		.bottom-title{
			background-color: $uni-bg-color-grey;
			padding-left: 40rpx;
			padding-top: 30rpx;
		}
		.bottom-box{
			
			
			margin-top: 20rpx;
			background-color: #FFFFFF;
			.bottom-item{
				padding-top: 30rpx;
				display: flex;
				padding-left: 30rpx;
				padding-right: 30rpx;
				border-bottom: 20rpx solid $uni-bg-color-grey;
				.img{
					width: 40rpx;
					height: 40rpx;
					background-color: #3F536E;
					margin-top:10rpx;
				}
				.content-box{
					margin-left: 20rpx;
					line-height: 50rpx;
					flex: 1;
					font-size: 30rpx;
					text-align: left;
					padding-bottom: 30rpx;
					.content{
						color: #666666;
					}
					.toppost{
						margin-top: 15rpx;
						font-size: 22rpx;
						color: #2793EC;			 
					}
					.button-item{
						height: 60rpx;
						line-height: 60rpx;
						background-color: #00C6B2;
						color: #FFFFFF;
						font-size: 26rpx;
						text-align: center;
						margin-right: 20rpx;
						width: 180rpx;
						border-radius: 10rpx;
					}
				}
				 
			}
		}
	}
</style>
