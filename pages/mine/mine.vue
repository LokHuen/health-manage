<template>
	<view>
		<mine-top @loginClick="loginClick" @clikeIndex = "clikeIndex" v-if="userInfo" :userInfo="userInfo" :list="list"></mine-top>
		<view class="clear" style="height: 50px;"></view>
		
		<uni-popup ref="popup" type="bottom">
		      <view class="white-background">
				  <view class="title-box">
					  <view class="">
					  	<image class="close" :src="imageUrl+'/icon_close.png'" mode="aspectFill" @click="closeService"></image>
					  </view>
					 <view class="title">
					 	联系客服
					 </view>
				  </view>
				  <view class="service-photo">客服电话：400-033-0800</view>
				  <view class="service-time">工作时间：周一到周日 9点到21点 </view>
				  <button class="agree" type="default" @click="contactService">拨打客服电话</button>
				  <view class="white-bottom">
				  	
				  </view>
		      </view>
		    </uni-popup>
	</view>
</template>

<script>
	import mineTop from '../../components/mine/mineTop.vue'
	var app = getApp();
	
	export default {
		components:{
			mineTop
		},
		data() {
			return {
				imageUrl:this.$imageUrl,
				userInfo:{},
				list:[["健康体检咨询记录",getApp().globalData.imageUrl+"/mine/icon_mine_1.png"],
				      ["影像学报告解读",getApp().globalData.imageUrl+"/mine/icon_mine_2.png"],
					  ["订单",getApp().globalData.imageUrl+"/mine/icon_mine_3.png"],
					  ["优惠券",getApp().globalData.imageUrl+"/mine/icon_mine_4.png"],
					  ["联系客服",getApp().globalData.imageUrl+"/mine/icon_mine_5.png"],
					  ],
			}
		},
		onShow(){
			//未登陆状态，不请求接口
			if(!app.getCache('token')){
				return;
			}
			this.getMineInfo();
			
		},
		methods: {
			loginClick(){
				//登陆
				uni.login({
					success: (res) => {
						console.log(res.code)
						app.login({
							code: res.code
						}).then(res => {
							var token = res.data["tkbgjd-token"];
							app.setCache('token', token);
							console.log(token)
							this.getMineInfo();
							app.saveinfo();
						});
					}
				});
			},
			getMineInfo(){
				this.userInfo = false;
				app.mine({}).then(res=>{
					if(res.status==1){
						
						this.userInfo = res.data;
						console.log(this.userInfo)
						app.setCacheAsync('id',this.userInfo.id);
						app.setCacheAsync('nickname',this.userInfo.nickname);
						app.setCacheAsync('portrait',this.userInfo.portrait);
						app.setCacheAsync('moblie',this.userInfo.moblie);
						//FTODO 根据身份是否展示解读员工作台
						if(this.userInfo.isDoctor == 1){
							if(this.list.length==5){
							this.list.push(["解读员工作台",getApp().globalData.imageUrl+"/mine/icon_mine_6.png"])	
							}
							
						}
					}
				});
			},
			
			clikeIndex(e){
				switch (e){
					case "0":{
						console.log("健康体检咨询记录")
					    uni.navigateTo({
					    	url:'../advisoryRecord/advisoryRecord'
					    });
						break;
					}
					case "1":{
						console.log("影像学报告解读")
						uni.navigateTo({
						    url:'../imaging-report-interpretate/imaging-report-interpretate'
						});
						break;
					}
					case "2":{
						uni.navigateTo({
							url:'../order/order'
						});

						break;
					}
					case "3":{
						uni.navigateTo({
							url:'./coupon',
						});
						break;
					}
					case "4":{
						this.$refs.popup.open()
						break;
					}
					case "5":{
						uni.navigateTo({
							url:'../work/index',
						});
						break;
					}
					
				}
			},
			closeService(){
				this.$refs.popup.close()
			},
			contactService(){
				uni.makePhoneCall({
				 	
				 	// 手机号
				    phoneNumber: '400-033-0800', 
				
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
						this.closeService()
					},
				
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
						this.closeService()
					}
					
				  });
			    
			}
		},
		
	}
</script>

<style>	
.white-background{
		border-radius: 10px;
		height: 230px;
		background-color: #FFFFFF;
	}
	.white-bottom{
		height: 100px;
		background-color: #FFFFFF;
		margin-top: 5px;
	}
	.title{
		font-size: 21px;
		color: #333333;
		text-align:center;
		flex: 1;
		padding-right: 33px;
	}
	.service-photo{
		font-size: 16px;
		color: #666666;
		margin-top: 28px;
		margin-left: 30px;
		margin-right: 30px;
	}
	.service-time{
		font-size: 16px;
		color: #666666;
		margin-top: 10px;
		margin-left: 30px;
		margin-right: 30px;
	}
	.agree{
		font-size: 18px;
		color: #FFFFFF!important;
		background-color: #2793EC!important;
		width: 240px;
		line-height: 40px;
		margin-top: 32px;
		border-radius: 4px;
		
	}
	.close{
		width: 13px;
		height:13px;
		margin-left: 20px;
	}
	.title-box{
		display: flex;
		height: 20px;
		line-height: 20px;
		padding-top: 25px;
		
	}

</style>
