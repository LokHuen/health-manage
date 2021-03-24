<template>
	<view class="container">
		<view class="common-box">
			<view class="left">资源所在区域</view>
			<view class="right">{{detailInfo.area}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">报备类型</view>
			<view class="right">{{detailInfo.typeValue}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">医院名称</view>
			<view class="right">{{detailInfo.hospitalName}}</view>
		</view>
		
		<view class="common-box" v-if="detailInfo.type !=1">
			<view class="left">科室名称</view>
			<view class="right">{{detailInfo.depart}}</view>
		</view>
		
		<view class="common-box" v-if="detailInfo.type==3">
			<view class="left">医生名字</view>
			<view class="right">{{detailInfo.doctorName}}</view>
		</view>
		
		<view class="common-box" v-if="detailInfo.type==3">
			<view class="left">医生职称</view>
			<view class="right">{{detailInfo.technicalTitleValue}}</view>
		</view>
		
		
		<view class="time-box">
			<view class="time-left">门诊时间</view>
			<view class="time-right">
				 <view  v-for="(item,index) in timeList">
				 	{{item}}
				 </view>
				 
			</view>
		</view>
		
		<view class="common-box">
			<view class="left">月门诊量预估（人）</view>
			<view class="right">{{detailInfo.monthlyConsulting||0}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">每周手术量（台）</view>
			<view class="right">{{detailInfo.weeklyOperate||0}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">月手术量预估（台）</view>
			<view class="right">{{detailInfo.monthlyOperate||0}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">主管床位数（张）</view>
			<view class="right">{{detailInfo.masterBeds||0}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">主管床位周转天数（天）</view>
			<view class="right">{{detailInfo.masterBedsDay||0}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">月住院病人数预估（人）</view>
			<view class="right">{{detailInfo.monthlyInpatient||0}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">月患者数量预估（人）</view>
			<view class="right">{{detailInfo.monthlyPatient}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">客情关系程度</view>
			<view class="right">{{detailInfo.relateValue}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">月销售潜力（单数）</view>
			<view class="right">{{detailInfo.completedOrder||0}}</view>
		</view>
		
		<view class="common-box">
			<view class="left">备注内容</view>
			<view class="right">{{detailInfo.remark ||'未填写'}}</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
	
		data() {
			return {
				detailInfo:{},
				id:'',
				timeList:[],
				
			}
		},
		onLoad(props) {
		    this.id = props.id;
			this.getDetailRequest();
		},
		methods: {
			getDetailRequest(){
				app.resourceReportDetail({id:this.id}).then(res =>{
					if(res.status == 1){
						this.detailInfo = res.data;
						
						if(this.detailInfo.type==1){
							this.detailInfo.typeValue = "医院";
						}else if(this.detailInfo.type==2){
							this.detailInfo.typeValue = "科室";
						}else{
							this.detailInfo.typeValue = "医生";
						}
						
						var timeList =  JSON.parse(this.detailInfo.consultingHours);
						for (var i = 0; i < timeList.length; i++) {
						    var	time=timeList[i];
							this.timeList.push(time);
						}
						console.log(this.timeList)
						
						//筛选科室
					   app.getOptionList({
					   	code: 'depart'
					   }).then(res => {
					   	if (res.status == 1) {
					   		for (var i = 0; i < res.data.length; i++) {
					   			if(res.data[i].code==this.detailInfo.departId){
									this.detailInfo.departId = res.data[i].value;
									break;
								}
					   		}
					   	}
					   });
						
						//筛选医院
						app.hospitalList({
							provinceId: this.detailInfo.provinceId,
							cityId: this.detailInfo.cityId,
							pageNo: 1,
						}).then(res => {
							if (res.status == 1) {
								for (var i = 0; i < res.data.list.length; i++) {
									if(res.data.list[i].id == this.detailInfo.hospitalId){
									    this.detailInfo.hospitalId = res.data.list[i].name;
										break;
									}
								}
								
							}
						
						})
						console.log(this.detailInfo);
					}
				});
			},
	
		},

	}
</script>

<style lang="scss">
	.container{
		.common-box{
			margin-top: 10rpx;
			padding-left: 30rpx;
			display: flex;
			height: 70rpx;
			line-height: 70rpx;
			font-family: PingFangSC-regular;
			text-align: left;
			font-size: 32rpx;
			.left{
				color: rgba(16, 16, 16, 100);
			}
			.right{
				margin-left: 35rpx;
				color: rgba(151, 150, 150, 100);
			}
			
		}
		.time-box{
			margin-top: 10rpx;
			padding-left: 30rpx;
			display: flex;
			//height: 70rpx;
			line-height: 70rpx;
			font-family: PingFangSC-regular;
			text-align: left;
			font-size: 32rpx;
			.time-left{
				color: rgba(16, 16, 16, 100);
			}
			.time-right{
				margin-left: 35rpx;
				color: rgba(151, 150, 150, 100);
			}
		}
	}
	
</style>
