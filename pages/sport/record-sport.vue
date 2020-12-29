<template>
	<!-- 记录运动界面 -->
	<view class="container">
		<view class="category-box">
			运动项目
			<view class="category">{{info.name}}</view>
		</view>
		<view class="space-line"></view>
		<view class="time-box">
			<view>运动时长</view>
			<view style="width: 390rpx;"></view>
			<input type="text" v-model="duration" placeholder="填写" class="time-input" maxlength="5"/>
			<view style="margin-left: 10rpx;">分钟</view>
		</view>
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
		<view class="space-line"></view>
		<view class="remark-box">
			 备注
			 <input type="text" v-model="remark" placeholder="选填" class="remark-input" />
		</view>
		<view style="height: 300rpx; background-color: #F7F7F7;"></view>
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
	  color: #272727;
	  font-size: 30rpx;
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
	  .space-line{
		  background-color: #F7F7F7;
		  height: 20rpx;
	  }
	  .time-box{
		  margin-left: 30rpx;
		  margin-right: 30rpx;
		  height: 94rpx;
		  line-height: 94rpx;
		  border-bottom: 2rpx solid #CFCFCF;
		  display: flex;
		  .time-input{
			  width: 100rpx;
			  height: 94rpx;
			  line-height: 94rpx;
			  text-align: right;
			  font-size: 30rpx;
		  }
	  }
	  .begin-box{
		  height: 94rpx;
		  line-height: 94rpx;
		  margin-left: 30rpx;
		  margin-right: 30rpx;
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
		  height: 100rpx;
		  line-height: 100rpx;
		  margin-left: 30rpx;
		  margin-right: 30rpx;
		  display: flex;
		  .remark-input{
			  flex: 1;
			  margin-left: 20rpx;
			  height: 100rpx;
			  line-height: 100rpx;
			  color: #272727;
			  font-size: 30rpx;
		  }
	  }
	  .save-box{
		  background-color: #F7F7F7;
		  height: 620rpx;
		  .savc-btn{
			  height: 88rpx;
			  line-height: 88rpx;
			  width: 600rpx;
			  font-size: 38rpx;
			  background-color: #FCA62B;
			  color: #FFFFFF;
			  text-align: center;
			  margin-left: 74rpx;
			  border-radius: 10rpx;
		  }
	  }
  }
 </style>
