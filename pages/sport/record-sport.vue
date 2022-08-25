<template>
	<!-- 记录运动界面 -->
	<view class="container">
			<view class="category-box box">
				运动项目
				<view class="category">{{info.name}}</view>
			</view>
			<view class="time-line-box box">
				<view class="time-box">
					<view>运动时长</view>
					<view class="input-container">
						<input type="text" v-model="duration" placeholder="填写" class="time-input" />
						<view style="margin-left: 10rpx;">分钟</view>
					</view>
					
				</view>
				<view class="line"></view>
				<view class="begin-box">
					<view>运动开始时间</view>
					<view class="chose-time">
						<view class="">
							<biaofun-datetime-picker
								placeholder="选择"
								:defaultValue="date"
								start="2000-02-03 02:08"
								end="2100-10-28 22:58"
								fields="minute"
								@change="changeDatetimePicker"
							></biaofun-datetime-picker>
						</view>
						<image src="../../static/icon/more_icon.png" mode="widthFix" class="more"></image>
					</view>
				</view>
			</view>
			<view class="remark-box box">
				<view class="">
					<text>备注</text> 
				</view>
				<view class="">
					<input type="text" v-model="remark" placeholder="选填" class="remark-input" />
				</view>
				 
			</view>
		
		<view class="save-box">
			<view class="savc-btn" @click="save">保存</view>
		</view>
		

	</view>
</template>



<script>
	const app = getApp();
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	export default {
		data() {
			return {
				date:'',
				info:{},
				duration:'',//运动时长
				remark:''// 备注
			}
		},
		methods: {
			changeDatetimePicker(date){
				this.date = date.f3;
			},
			save(){
				if(!this.date || !this.duration){
					app.tip('请填写完整信息');
					return;
				}
				app.saveSport({
					type:this.info.id,
					duration:this.duration,
					startTime:this.date,
					 remark:this.remark
				}).then(res =>{
					if(res.status ==1){
						app.tip('保存成功');
					   uni.navigateTo({
					   	url:'sport-record-feedback?info='+JSON.stringify(res.data)
					   })
					}
				});
				
			}
		},
		onLoad(props){
			this.info = JSON.parse(props.info);
		},

	}
</script>

 <style lang="scss">
  .container{
	  padding: 30rpx;
	  font-size: 30rpx;
	  .time-line-box {
		  position: relative;
	  }
	  .box {
	  	padding: 0 30rpx;
	  	margin-bottom: 30rpx;
	  	border-radius: 20rpx 20rpx 20rpx 20rpx;
	  	display: flex;
	  	flex-direction: column;
	  	box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.05);
	  	box-sizing: border-box;
		
		.line {
			top: 50%;
			position: absolute;
			width: 100%;
			left: 0;
			height: 1rpx;
			background: rgba(235,236,242,0.3900);
			opacity: 1;
		}
	  }
	  .category-box{
		  position: relative;
		  height: 100rpx;
		  line-height: 100rpx;
		  padding-left: 30rpx;
		  border-top: 2rpx solid #F7F7F7;
		  .category{
			  position: absolute;
			  right: 30rpx;
			  top: -5rpx;
			  
		  }
	  }
	  .time-box{
		  display: flex;
		  padding: 30rpx 0;
		  justify-content: space-between;
		  .input-container {
			  display: flex;
		  }
		  .time-input{
			  text-align: right;
			  font-size: 30rpx;
		  }
	  }
	  .begin-box{
		  height: 94rpx;
		  line-height: 94rpx;
		  position: relative;
		  .chose-time{
			  position: absolute;
			  color: #707578;
			  right: 5rpx;
			  top: 0rpx;
			  display: flex;
			  .more{
				  width: 10rpx;
				  height: 20rpx;
				  margin-left: 15rpx;
				  margin-top: 38rpx;
			  }
		  }
	  }
	  .remark-box{
		  display: flex;
		  flex-direction: row;
		  justify-content: space-between;
		  height: 100rpx;
		  align-items: center;
		  
		  .title{
			  height: 100%;
			  line-height: 100rpx;
		  }
		  .remark-input{
			  line-height: 100rpx;
			  color: #272727;
			  font-size: 30rpx;
			  text-align: right;
		  }
	  }
	  .save-box{
		  .savc-btn{
			  position: fixed;
			  bottom: 124rpx;
			  text-align: center;
			  font-size: 28rpx;
			  line-height: 90rpx;
			  color: #ffffff;
			  width: 690rpx;
			  height: 90rpx;
			  background: #57C1BB;
			  box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.0700);
			  opacity: 1;
			  border-radius: 45rpx;
		  }
	  }
  }
 </style>
