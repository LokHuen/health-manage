<template>
	<!-- 医生端信息完善界面 -->
	<view class="container">
		<view class="title">完善医生资料，开通患者管理功能。</view>
		<view class="line-space"></view>
		<view class="name-box">
			<view class="name-tips">* 医生姓名</view>
			<input class="name-input" type="text" value="" placeholder="请填写医生的真实名字" v-model="name"/>
        </view>
		
		<view class="name-box">
			<view class="name-tips">* 技术职称</view>
			<input class="name-input" type="text" value="" placeholder="请填写职称" v-model="position"/>
		</view>
		
		<view class="name-box">
			<view class="name-tips">* 所在医院</view>
			<input class="name-input" type="text" value="" placeholder="请填写医院名字" v-model="hospital"/>
		</view>
		
		<view class="name-box">
			<view class="name-tips">* 科室名称</view>
			<input class="name-input" type="text" value="" placeholder="请填写科室名称" v-model="department"/>
		</view>
		
		<view class="name-box">
			<view class="name-tips">* 手机号码</view>
			<input class="name-input" type="text" value="" placeholder="请填写手机号" v-model="mobile"/>
		</view>
		<view class="name-box">
			<view class="name-tips">* 验证码</view>
			<input class="name-input" type="text" value="" placeholder="请填写手机收到的验证码" v-model="code"/>
			<button type="default" class="code-button" @click="getCode">{{codetext}}</button>
		</view>
		
		  
		  <view class="button-box">
		  	<button type="default" class="button" @click="submit">提交</button>
		  </view>
	</view>
	
</template>

<script>
	const app = getApp();
	export default {
		components: {

		},
		data() {
			return {
				name:'',
				position:'',//职称
				hospital:'',
				department:'',//科室
				mobile:'',
				code:'',
				bindSale:1,  //	绑定销售id
				isSend: false,   // 是否发送验证码
				codetext:'获取验证码'
			}
		},
		onLoad(props) {
			this.bindSale = props.bindSale||1;
		},
		methods: {
			submit(){
				if(!this.name || 
				   !this.position || 
				   !this.hospital || 
				   !this.department ||
				   !this.mobile ||
				   !this.code){
					   app.tip('请输入完整信息');
					   return;
				   }
				   app.saveDoctorInfo({
					   doctorName:this.name,
					   technicalTitle:this.position,
					   hospital:this.hospital,
				       department:this.department,
					   mobile:this.mobile,
					   verifyCode:this.code,
					   bindSale:this.bindSale}).then(res =>{
					   if(res.status==1){
						   uni.navigateTo({
						   	url:'doctor-submit-result'
						   });
					   }
				   });
			},
			getCode(){
				if (this.isSend) return;
				if(!this.mobile){
					app.tip('请输入手机号码');
					return;
				}else if(!/^1[0-9]{10}$/.test(this.mobile)){
					app.tip('请填写正确的手机号码')
					return;
				}
				app.getCode({mobile:this.mobile}).then(res=>{
					if(res.status==1){
						app.tip(res.msg);
						this.isSend = true
						let ss = 60
						this.codeTimer = setInterval(() => { // 倒计时
						    if (ss <= 1) {
						        this.codetext = '重新获取'
						        this.isSend = false
						        clearInterval(this.codeTimer)
						        this.isSend = false
						    } else {
						        ss--
						        this.codetext = ss + 's'
						    }
						}, 1000)
					}
				});
			}
		},

	}
</script>

<style lang="scss">
	
	.container{
		.title{
			color: #333333;
			font-size: 15px;
			margin-left: 44rpx;
			margin-right: 44rpx;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}
		.line-space{
			background-color: #F7F8F8;
			height: 20rpx;
		}
		.name-box{
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom:  2rpx solid #EEEEEE;
			position: relative;
			.name-tips{
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}
			.name-input{
				margin-left: 30rpx;
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}
			.code-button{
				position: absolute;
				color: #FFFFFF;
				background-color: #52A29E !important;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 13px;
				right: 10rpx;
				top: 20rpx;
			}
		}
		
		.button-box{
			position: fixed;
			bottom: 0;
			height: 140rpx;
			width: 100%;
			.button{
				height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}
	}
</style>
