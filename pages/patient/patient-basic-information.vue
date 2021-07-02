<template>

	<view>
		
		<view class="condition-box">
			<view :class="type1==0?'item-chose':'item-unchose'" @click="selectType(0)">基础资料</view>
			<view :class="type1==1?'item-chose':'item-unchose'" @click="selectType(1)">病例管理</view>
		</view>
		
		<view v-if="type1==1">
			<view class="add-case-box">
				<view class="dashed-box" @click="addCase">+ 新增病例</view>
				<view class="add-bottom"></view>
			</view>
			<view class="pic-content-box" v-for="(item,index) in list" :key="index" v-if="item.pathologyUrl.length>0">
				<view class="pic-time">{{item.createTime+'添加'}}</view>
				<view class="ccimglist">
					<image v-for="(imgItem,imgIndex) in item.pathologyUrl" :key="imgIndex" :src=imgItem mode="aspectFill" @click="previewImage(item,imgIndex)" :class="(imgIndex%3==0)?'imagelistfirst':'imagelist'"></image>
				</view>
			</view>
			<view class="no-data-tips" v-if="list.length ==0">暂无数据</view>
			<view style="height: 100rpx;"></view>
		</view>
		
		<view v-if="type1==0">
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">姓名</view>
					<view class="health-item-detail">{{infoData.patientName}}</view>
				</view>
			</view>
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">性别</view>
					<view class="health-item-detail">{{infoData.patientGender?infoData.patientGender:'暂未填写'}}</view>
				</view>
			</view>
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">出生日期</view>
					<view class="health-item-detail">{{infoData.birthday?infoData.birthday:'暂未填写'}}</view>
				</view>
			</view>
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">联系电话</view>
					<view class="health-item-detail">{{infoData.phone}}</view>
				</view>
			</view>
			
			<view class="health-content" v-if="needAge">
				<view class="health-item">
					<view class="health-item-title">年龄</view>
					<view class="health-item-detail">{{infoData.age}}</view>
				</view>
			</view>
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">疾病诊断</view>
					<view class="health-item-detail">{{infoData.illness}}</view>
				</view>
			</view>
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">所在城市</view>
					<view class="health-item-detail">{{infoData.region?infoData.region:'暂未填写'}}</view>
				</view>
			</view>
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">身高</view>
					<view class="health-item-detail">{{(infoData.height?infoData.height:'')+'cm'}}</view>
				</view>
			</view>
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">体重</view>
					<view class="health-item-detail">{{(infoData.weight?infoData.weight:'')+'kg'}}</view>
				</view>
			</view>
			
			<view class="health-content" v-for="(item,index) in projectList">
				<view class="projectItem">
					<view class="left">{{item.name}}</view>
					<view :class="item.choseContent?'right':'right-novalue'">{{item.choseContent?item.choseContent:'暂未填写'}}</view>
				</view>
			</view>
			
			<view style="height: 200rpx;"></view>
			
			<view class="health-update">
				<button class="health-update-button" @click="updateInfo">更新信息</button>
			</view>
		</view>
		
		

	</view>

</template>

<script>
	const app = getApp();
	export default {
		onShow() {
			// if(app.getCache('userType')==2){
			// 	//如果是医生，就跳过去医生的个人中心页面
			// 	uni.redirectTo({
			// 		url:'../doctor/doctor-center'
			// 	});
			// }else{

			// }
			if(app.getCache('uid')){
				this.judgeUserAuth();
			}

		},
		data() {
			return {
				infoData:{},
				type:1,
				projectList: [],
				type1:0,
				list: [],
				pageNo: 1,
				needAge:false
			}
		},
		onPullDownRefresh() {
			if(this.type1==0)return;
			this.pageNo = 1;
			this.getListData();
		},
		onReachBottom() {
			if(this.type1==0)return;
			this.pageNo ++;
			this.getListData();
		},
		onLoad(props){
			this.type = props.type ||1;
			this.getListData();
			this.inputAgeCheck();
		},
		methods:{
			inputAgeCheck(){
				app.inputAgeCheck().then(res =>{
					if(res.status == 1){
						this.needAge = res.data.ageInput;
					}
				})
			},
			previewImage(item,imgIndex) {
				uni.previewImage({
					urls:item.pathologyUrl,
					current:imgIndex
				})
			},
			addCase(){
				uni.navigateTo({
					url:'patient-add-case'
				});
			},
			getListData(){
				app.patientCaseList({pageNo:this.pageNo}).then(res =>{
					if(res.status===1){
						if(this.pageNo===1){
							for (var i = 0; i < res.data.list.length; i++) {
								let pathologyUrl = [];
								if(res.data.list[i].pathologyUrl){
									let imgItems = res.data.list[i].pathologyUrl.split(',');
									for(var j=0;j<imgItems.length;j++){
										pathologyUrl.push(app.globalData.baseUrl+imgItems[j]);
									}
									
								}
								res.data.list[i].pathologyUrl = pathologyUrl;
							}
							this.list = res.data.list;
							
						}else{
							if(res.data.pageCount>=this.pageNo){
								for (var i = 0; i < res.data.list.length; i++) {
									let pathologyUrl = [];
									if(res.data.list[i].pathologyUrl){
										let imgItems = res.data.list[i].pathologyUrl.split(',');
										for(var j=0;j<imgItems.length;j++){
											pathologyUrl.push(app.globalData.baseUrl+imgItems[j]);
										}
			
									}
									res.data.list[i].pathologyUrl = pathologyUrl;
								}
								this.list = this.list.concat(res.data.list);
							}
						}
					}
					console.log(this.list);
					uni.stopPullDownRefresh();
				})
			},
			selectType(type1){
				if(this.type1 != type1){
					this.type1 = type1;
				}
			},
			updateInfo(){
				uni.navigateTo({
					url:'patient-improve-msg?type='+this.type+'&formQrCode=2'
				})

			},
			getInfo(){
				app.patientBasicInfo({}).then(res =>{
					if(res.status==1){
						this.infoData = res.data;
						this.projectList = res.data.projectList;
						if (this.projectList.length > 0) {
							for (var i = 0; i < this.projectList.length; i++) {
								var project = this.projectList[i];
								if (project.type == 2) {
									//单选
									for (var j = 0; j < project.detailList.length; j++) {
										if (project.detailList[j].choose == 1) {
											project.choseContent = project.detailList[j].content;
										}
									}
								} else if (project.type == 3) {
									//多选
									var ids = [];
									var contents = [];
									var choseContent = '';
									for (var j = 0; j < project.detailList.length; j++) {
										if (project.detailList[j].choose == 1) {
											ids.push(project.detailList[j].id);
											contents.push(project.detailList[j].content);
											choseContent = choseContent + project.detailList[j].content + ','
										}
									}
									choseContent = choseContent.substring(0, choseContent.length - 1);
									project.ids = ids;
									project.contents = contents;
									project.choseContent = choseContent;
								}else{
									project.choseContent = project.detailList;
								}
								this.projectList[i] = project;
							}
						}
						console.log(this.projectList);
					}
				});
			},
			judgeUserAuth(){
				app.judgeUserAuth({}).then(res =>{
					if(res.status ==1){
						// app.setCache('userType',res.data.userType);
						if(res.data.userType == 2){
							//如果是医生，就跳过去医生的个人中心页面
							uni.redirectTo({
								url:'../doctor/doctor-center'
							});
						}else{
							if(res.data.perfect==true){
								this.getInfo();
							}else{
								uni.redirectTo({
									url:'patient-improve-msg?type=2&formQrCode=1'
								});
							}

						}
					}
				});
			},

		}
	}
</script>

<style lang="scss">
	
	.add-case-box {
		height: 200rpx;
		position: relative;
	
		.dashed-box {
			text-align: center;
			margin-top: 60rpx;
			margin-left: 85rpx;
			margin-right: 85rpx;
			height: 120rpx;
			line-height: 120rpx;
			border: 2rpx dashed #52A29E;
			color: #52A29E;
		}
	
		.add-bottom {
			position: absolute;
			bottom: 0rpx;
			left: 0rpx;
			right: 0rpx;
			height: 20rpx;
			background-color: #F7F8F8;
		}
	}
	
	.pic-content-box {
		.pic-time {
			font-size: 15px;
			color: #333333;
			padding-top: 40rpx;
			padding-left: 44rpx;
		}
	
		.ccimglist {
			display: flex;
			flex-wrap: wrap;
			// justify-content:space-between;
			margin-left: 44rpx;
			margin-right: 44rpx;
		   
			.imagelistfirst {
				margin-top: 20rpx;
				width: 200rpx;
				height: 200rpx;
				background-color: #999999;
			}
			.imagelist {
				margin-top: 20rpx;
				width: 200rpx;
				height: 200rpx;
				background-color: #999999;
				margin-left: 31rpx;
			}
		}
	
	
	}
	.no-data-tips{
		margin-top: 100rpx;
		text-align: center;
		font-size: 30rpx;
		color: #666666;
	}
	
	.condition-box{
		height: 120rpx;
		display: flex;
	    justify-content:space-between;
		padding-left: 100rpx;
		padding-right: 100rpx;
		.item-chose{
			margin-top: 20rpx;
			width: 250rpx;
			height: 70rpx;
			line-height: 70rpx;
			background-color: #52A29E;
			color: #fff;
			font-size: 26rpx;
			border: 2rpx solid #52A29E;
			border-radius: 10rpx;
			text-align: center;
		}
		.item-unchose{
			margin-top: 20rpx;
			width: 250rpx;
			height: 70rpx;
			line-height: 70rpx;
			color: #999999;
			font-size: 26rpx;
			border: 2rpx solid #999999;
			border-radius: 10rpx;
			text-align: center;
		}
		
	}
	
	.health-content {
		margin: 0 44rpx;

		.health-item {
			border-bottom: 0.01rem #EEEEEE solid;
			padding-bottom: 0.4rem;
			display: block;
			height: 96rpx;
			text-align: center;

			.health-item-title {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: left;
			}

			.health-item-detail {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: right;
				
			}
			
			
		}
	}
	
	.projectItem{
		border-bottom: 0.01rem #EEEEEE solid;
		padding-bottom: 0.4rem;
		//display: block;
		display: flex;
		height: 96rpx;
		text-align: center;
		justify-content: space-between;
		.left{
			font-size: 30rpx;
			color: #333333;
			height: 100%;
			display: flex;
			justify-content: start;
			align-items: center;
			flex: 1;
		}
		.right{
			font-size: 30rpx;
			color: #333333;
			justify-content: flex-end;
			display: flex;
			align-items: center;
			flex: 2;
			text-align: right;
		}
		.right-novalue{
			font-size: 30rpx;
			color: #999999;
			justify-content: flex-end;
			display: flex;
			align-items: center;
			flex: 2;
			text-align: right;
		}
	}

	.health-update {
		
		text-align: center;
		//position: absolute;
		position: fixed;
		bottom: 50rpx;
		width: 100%;

		.health-update-button {
			width: 85%;
			height: 90rpx;
			font-size: 34rpx;
			color: white;
			background-color: #52A29E;
			border-radius: 45rpx;
		}
	}
</style>
