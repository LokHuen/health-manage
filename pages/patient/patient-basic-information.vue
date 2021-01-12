<template>

	<view>
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">姓名</view>
				<view class="health-item-detail">{{infoData.patientName}}</view>
			</view>
		</view>
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">性别</view>
				<view class="health-item-detail">{{infoData.patientGender}}</view>
			</view>
		</view>

		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">出生日期</view>
				<view class="health-item-detail">{{infoData.birthday}}</view>
			</view>
		</view>

		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">联系电话</view>
				<view class="health-item-detail">{{infoData.phone}}</view>
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
				<view class="health-item-detail">{{infoData.region}}</view>
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
			}
		},
		onLoad(props){
			this.type = props.type ||1;
		},
		methods:{
			updateInfo(){
				uni.navigateTo({
					url:'patient-improve-msg?type='+this.type
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
				this.getInfo();
				return;
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
									url:'patient-improve-msg'
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
