<template>
	<view class="page">
			<!--滑动区-->
			<scroll-view scroll-y style="height: 300vh;" bindscroll="fnScrollEvent" bindscrolltoupper="fnScrollToupper">
					<view class="scroll-bg">
						<view class="box-container">
							<uni-forms>
								<view class="tips">完善资料，医生才能及时掌握您的营养状况和给与 康复指导。</view>
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*姓名</view>
										<view class="content">
											<input type="text" placeholder="请填写真实名字" placeholder-style="font-size: 28rpx; color:#BDBDBD ;">
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*患者性别</view>
										<view class="content">
											<uni-data-select
											    v-model="form.value"
											    :localdata="form.gender"
											    @change="change">
											</uni-data-select>
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*出生日期</view>
										<view class="content">
											<uni-datetime-picker
												type="date"
												:value="form.single"
												start="1900-1-1"
												end="2022-12-30"
												@change="change"
											/>     
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*所在城市</view>
										<view class="content">
											<picker name="picker" class="rightarea" mode="region" @change="bindPickerChange()" :value="form.region" >
											    <view style="padding:36rpx 0;">{{form.region[0]?(form.region[0]+" "+form.region[1]+" "+form.region[2]):"请选择"}}</view>
											</picker>
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*所患疾病</view>
										<view class="content">
											<input type="text" placeholder="请填写疾病名称" placeholder-style="font-size: 28rpx; color:#BDBDBD ;">
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*当前身高</view>
										<view class="content">
											<view style="display: flex;justify-content: space-between;">
												<input type="text" placeholder="请填写身高" placeholder-style="font-size: 28rpx; color:#BDBDBD ;">
												<view >cm</view>
											</view>
											
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*当前体重</view>
										<view style="display: flex;justify-content: space-between;">
											<input type="text" placeholder="请填写体重" placeholder-style="font-size: 28rpx; color:#BDBDBD ;">
											<view >kg</view>
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*上传体检报告照片/病例照片</view>
										<view class="example-body" style="display: flex;">
											<uni-file-picker mode="grid" v-model="imageValue" fileMediatype="image"  limit="9" title="最多选择9张图片"></uni-file-picker>
										</view>
									</view>
								</uni-forms-item>
								
								<button class="update-btn" type="primary">更新信息</button>
							</uni-forms>
						</view>
					</view>
					
			</scroll-view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				id: '',
				form:{
					value: '',
					name: '张小明',
					gender: [
						{value: 0, text: '男'},
						{value: 1, text: '女'}
					],
					birthDay: '1949年1月10日',
					disease: '乳腺癌',
					region: [],
					address: "",
					defaultAddress: false,
				}
			}
		},
		onLoad(){
				this.init();
			},
		beforeCreate() {
			this.init();
		},
		methods: {
			init(){
				app.getareadetail().then(res => {
					res.data.region = res.data.region.split(" ");
					res.data.defaultAddress = res.data.defaultAddress==1?true:false;
					this.form.region = res.data.region;
					console.log(this.form.region);
				});
			},
			bindPickerChange(e){
				this.form.region = e.detail.value.region;
			},
		},
	}
</script>

<style lang="scss" scoped>
	.uni-forms-item {
		margin: 0;
	}
	/* #ifndef H5 */
	/* page {
		padding-top: 85px;
	} */
	/* #endif */
	.uni-group {
		display: flex;
		align-items: center;
	}
	.page {
	  height: 300vh;
	  width: 100vw;
	  display: flex;
	  flex-direction: column;
	  background: #F5F5F5;
	}
	.box-container{
	  height: 100%;
	  box-sizing: border-box;
	  padding: 40rpx 30rpx 0 40rpx;
	  background: #fff;
	  border-radius: 30rpx;
	  width: 100%;
	  font-size: 28rpx;
	  position: relative;
	  
	  .tips {
		  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
		  padding: 30rpx 32rpx;
		  background: #fff;
		  border-radius: 20rpx;
		  margin-top: 30rpx;
	  }
	  .info-box {
		  border-bottom: 1rpx solid #EBECF2;
		  .title {
			  padding: 30rpx 0;
		  }
		  .content {
			  padding-bottom: 20rpx;
			  
			  /deep/.uni-select {
				  border: none;
			  }
			  /deep/.uni-date-x--border[data-v-6e13d7e2] {
				  border: none;
			  }
		  }
	  }
	  .update-btn {
		  border-radius: 45rpx;
		  background: #57C1BB;
		  position: fixed;
		  bottom: 111rpx;
		  width: 90%;
		  box-sizing: border-box;
	  }
	}
	.scroll-bg{
	  width: 100vw;
	  height: 300vh;
	 /* background-image: url(https://636c-cloud1-5gfii8jlc56b5045-1306536140.tcb.qcloud.la/wxfile/background.png?sign=6a62c2c13c024f0091a1f8034f4d6155&t=1627552695);
	  background-repeat: no-repeat; */
	  background: -webkit-linear-gradient(#4fbeb7, #F5F5F5);
	          /*  Safari 5.1 到 6.0 */
	  background: -o-linear-gradient(#4fbeb7, #F5F5F5);
	          /*  Opera 11.6 到 12.0 */
	  background: -moz-linear-gradient(#4fbeb7, #F5F5F5);
	          /*  Fx 3.6 到 15 */
	  background: linear-gradient(#4fbeb7, #F5F5F5);
	  background-size: contain;
	  /* background-position: 0 -10vh; */
	}/*背景*/
	.box {
		width: 690rpx;
		margin-bottom: 30rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.05);
		box-sizing: border-box;
	}	
	.rightarea{flex:1;color: #888;}
	.example-body {
			padding: 10px;
			padding-top: 0;
		}

</style>
