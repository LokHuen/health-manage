<template>
	<view class="page">
	<!--滑动区-->
	  <scroll-view scroll-y style="height: 90vh;" bindscroll="fnScrollEvent" bindscrolltoupper="fnScrollToupper">
		  <view class="scroll-bg">
			<view class="box-container">
				<!--个人信息-->
			  <view class="self-info-box box">
				<image mode="aspectFill" class="avatar" src="../../static/img/doctor_center.png"></image>
				<view class="info-box">
					<text style="font-size: 32rpx;">{{ name }}</text>
					<view>
						<text style="font-size: 21rpx; margin-right: 26rpx;">{{ gender }}</text>
						<text style="font-size: 21rpx; margin-right: 26rpx;">{{ age }}岁</text>
						<text style="font-size: 21rpx;">{{ physical }}+{{ symptom }}</text>
					</view>
					<text style="font-size: 21rpx;">最近一次评估健康值为&nbsp;{{ healValue }}</text>
				</view>
			  </view>
			  <!--导航框-->
			  <view class="nav-box box">
				  <view class="nav-item">
				  	<image mode="aspectFill" class="nav-icon" src="../../static/icon/baseInfoicon.png"></image>
					<text>基础信息</text>
				  </view>
				  <view class="nav-item">
				  	<image mode="aspectFill" class="nav-icon" src="../../static/icon/bingliMangmenticon.png"></image>
				  	<text>病例管理</text>
				  </view>
				  <view class="nav-item">
				  	<image mode="aspectFill" class="nav-icon" src="../../static/icon/testRecordIcon.png"></image>
				  	<text>测评记录</text>
				  </view>
				  <view class="nav-item">
				  	<image mode="aspectFill" class="nav-icon" src="../../static/icon/felling.png"></image>
				  	<text>健康日记</text>
				  </view>
			  </view>
			  <!--健康状况趋势图-->
			  <view class="health-status-box box">
				  <text style="line-height: 100rpx; text-align: center;font-size: 26rpx;height: 100rpx;">健康状况趋势图</text>
				  <div id="statusImage" style="height:369rpx;width: 630rpx;" @click="loadStatusImage()" ></div>
				  <!-- <image src="../../static/img/bannerImg.png" style="display: block; width: 100%;height: 100rpx;margin-bottom: 34rpx;"></image> -->
				  <view class="notes-box">
					  <view class="notes">
						  <view style="width:26rpx;height:26rpx; margin-right:16rpx; border-radius: 13rpx;background: #6b9ca0;"></view>
						  <text>健康状态优</text>
					  </view>
					  <view class="notes">
					  	  <view style="width:26rpx;height:26rpx; margin-right:16rpx; border-radius: 13rpx;background: #fdc147;"></view>
					  	  <text>健康状态良好</text>
					  </view>
					  <view class="notes">
					  	  <view style="width:26rpx;height:26rpx; margin-right:16rpx; border-radius: 13rpx;background: #fdcfcf;"></view>
					  	  <text>健康状态一般</text>
					  </view>
					  <view class="notes">
					  	  <view style="width:26rpx;height:26rpx; margin-right:16rpx; border-radius: 13rpx;background: #ff8185;"></view>
					  	  <text>健康状态差</text>
					  </view>
				  </view>
				  <view class="health-form">
					<text style="font-size: 24rpx;line-height: 96rpx;text-align: left;">查看健康情况反馈表</text>
				  </view>
			  </view>
			  <!--疾病管理-->
			  <view class="manage">
				  <view class="manage-box box">
				  	<view class="manage-item">疾病管理</view>
				  	<view class="manage-item">营养管理</view>
				  	<view class="manage-item">运动管理</view>
				  	<view class="manage-item">情绪管理</view>
				  </view>
				  <!--疾病管理-->
				  <view class="manage2-box box">
				  	 <view class="manage2-item">
				  		<text class="manage-title">疾病管理</text>
				  		<text class="manage-status">呼吸系统疾病</text>
				  	</view>
				  	<view class="manage2-item">
				  		<text class="manage-title">疾病进展</text>
				  		<text class="manage-status">治疗中</text>
				  	</view>
				  	<view class="manage2-item">
				  		<text class="manage-title">健康状况</text>
				  		<text class="manage-status">一般</text>
				  	</view>
				  </view>
			  </view>
			  <!--记录疾病-->
			  <view class="mark">
				  <button class="markBtn"></button>
				  <view class="statusNav box">
					  <text style="text-align: center;height: 105rpx;line-height: 105rpx;">记录疾病状况</text>
					  <view class="status-bar">
						  <view class="time-section selected" style="border-radius: 20rpx 0 0 20rpx;">今日</view>
						  <view class="time-section">近7天</view>
						  <view class="time-section">近15天</view>
						  <view class="time-section" style="border-radius: 0 20rpx 20rpx 0;">近30天</view>
					  </view>
				  </view>
			  <view class="health-status-card box">
				  <text class="date">{{ date|formatDate }}</text>
				  <view class="status-item">
					  <text>您空腹的血糖在</text>
					  <text><&nbsp;{{ BloodSugarValue }}&nbsp;mmol/L</text>
				  </view>
				  <view class="status-item">
				  	  <text>您今天的血压</text>
				  	  <text>{{ presureType }}&nbsp;{{ BloodPresureValue }}</text>
				  </view>
				  <text class="status-report">您最近的身体没有任何不舒服，请继续保持。</text>
			  </view>
			  </view>
    
			  <!--疾病改善小知识-->
			<view class="tips-box">
				<text style="font-size: 28rpx;  text-align: center;padding:20rpx;margin-bottom: 20rpx; border-bottom: 1rpx dashed #4BBDB6 ;">疾病改善小常识</text>
				<text class="tips"  v-for="item in tipsList">&nbsp;{{ item }}</text>
			</view>
			</view>
		  </view>

	  </scroll-view>
	</view>
</template>

<script>

	import echarts from '@/plugins/echarts.js';
	export default {
		data() {
			return {
				date: new Date(),
				statusNavHeight: 20,
				nMenuButtonHeight: 40,
				opacity: 1,
				name: '曲文杰',
				gender: '女',
				age: 26,
				physical: '营养不良',
				symptom: '血糖异常',
				healValue: '10',
				tipsList:[
					'平时多吃具有降压、降脂作用的食物，如芹菜、番茄、黄瓜、木耳、海带、香蕉、山 楂、洋葱等;',
					'您平时食量较大，但吃过多食物会对肠胃造成负担，损害身体，在日后应尽量注意做到吃饭8分饱;',
					'您平时口味偏重，且存在口臭症状(提示胃肠道损)，在日后做饭时，应注意减少各类'
				],
				BloodSugarValue: 3.9,
				BloodPresureValue: 39,
				presureType:'',
			}
		},
		mounted() {
			this.loadStatusImage()
			this.getPresure()
		},
		filters: {
		    // 实时-时间-数据转换
		    formatDate(value) {
			  var formatNum = function(num){
				  return num < 10 ? "0" + num : num
				};
		      var year = value.getFullYear()
		      var month = formatNum(value.getMonth() + 1)
		      var day = formatNum(value.getDate())
		      var hour = formatNum(value.getHours())
		      var min = formatNum(value.getMinutes())
		      var sec = formatNum(value.getSeconds())
		      return year + "-" + month + "-" + day
			  // return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
		    }
		  },
		methods: {
			getPresure() {
				if(this.BloodPresureValue > 3.9){this.presureType = '高压'}
				else{this.presureType = '低压'}
			},
			 //  onLoad() {
			 //    // 获取状态栏和胶囊位置
			 //    const {top, height} = wx.getMenuButtonBoundingClientRect()
			 //    this.setData({
			 //      statusNavHeight: top,
			 //      nMenuButtonHeight: height
			 //    })
				// wx.setTopBarText({
				//   text: '健康评估'
				// })

			 //  },
			  // 滚动时触发
			  fnScrollEvent(e) {
				  this.loadStatusImage();
			    let scrolltop = e.detail.scrollTop;
			    if (scrolltop > 150) {
			      this.setData({
			        opacity: 0
			      })
			      return;
			    }
			    this.setData({
			      opacity: (150 - scrolltop) / 150
			    })
			  },
			  // 滚动到顶部
			  fnScrollToupper() {
			    this.setData({
			      opacity: 1
			    })
			  },
			  loadStatusImage() {
				  // 基于准备好的dom，初始化echarts实例
				  var myChart = echarts.init(document.getElementById('statusImage'),{
					  width:290,
					  height:100,
				  });
				  	  
				  // 指定图表的配置项和数据
				  var option = {
				    title: {
				      text: ''
				    },
				    tooltip: {},
				    // legend: {
				    //   data: ['我的']
				    // },
				    xAxis: {
				      data: ['1月', '2月', '3月', '4月', '5月', '6月']
				    },
				    yAxis: {},
				    series: [
				      {
				        // name: '我的',
				        type: 'bar',
				        data: [ {
							  value: 43,
							  // 设置单个柱子的样式
							  itemStyle: {
								color: '#ff8185',
								shadowColor: '#ff8185',
								borderType: 'dashed',
								opacity: 1
							  }
							}, {
							  value: 20,
							  // 设置单个柱子的样式
							  itemStyle: {
								color: '#fdcfd1',
								shadowColor: '#fdcfd1',
								borderType: 'dashed',
								opacity: 1
							  }
							},{
							  value: 36,
							  // 设置单个柱子的样式
							  itemStyle: {
								color: '#ff8185',
								shadowColor: '#ff8185',
								borderType: 'dashed',
								opacity: 1
							  }
							},{
							  value: 10,
							  // 设置单个柱子的样式
							  itemStyle: {
								color: '#fdc147',
								shadowColor: '#fdc147',
								borderType: 'dashed',
								opacity: 1
							  }
							},{
							  value: 10,
							  // 设置单个柱子的样式
							  itemStyle: {
								color: '#fdc147',
								shadowColor: '#fdc147',
								borderType: 'dashed',
								opacity: 1
							  }
							},{
							  value: 20,
							  // 设置单个柱子的样式
							  itemStyle: {
								color: '#fdcfd1',
								shadowColor: '#fdcfd1',
								borderType: 'dashed',
								opacity: 1
							  }
							},]
				      }
				    ]
				  };
				  	  
				  // 使用刚指定的配置项和数据显示图表。
				  myChart.setOption(option);
			  },
		}
	}
</script>

<style lang="scss" scoped>

	.health-status-card {
		flex-direction: column;
		padding: 30rpx;
		font-size: 28rpx;
		color: #333;
		
		.date {
			font-size: 24rpx;
		}
		.status-item {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding-bottom: 20rpx;
			padding-top: 30rpx;
			border-bottom: 1rpx dashed #4fbeb7 ;
		}
		.status-report {
			border: 1px solid #BDBDBD;
			border-radius: 10rpx;
			padding: 14rpx 24rpx;
			font-size: 28rpx;
			line-height: 40rpx;
			height: 135rpx;
			margin-top: 44rpx;
		}
	}
	.mark {
		display: flex;
		flex-direction: column;
		.statusNav {
			height: 167rpx;;
			display: flex;
			flex-direction: column;
			font-size: 28rpx;
			
			.status-bar {
				height: 62rpx;
				display: flex;
				text-align: center;
				font-size: 26rpx;
				color: #666666;
				
				.selected {
					background: #57C1BB;
					color: #fff;
				}
				
				.time-section {
					line-height: 62rpx;
					flex: 1;
				}
			}
		}
	}
	.manage-box {
		height:80rpx;
		text-align: center;
		
		.manage-item {
			height: 100%;
			flex: 1;
			line-height: 80rpx;
			display: flex;
			flex-direction: column;
		}
	}
	.manage2-box {
		text-align: center;
		height:157rpx;
		
		.manage2-item {

			height: 100%;
			flex: 1;
			line-height: 80rpx;
			display: flex;
			flex-direction: column;
			.manage-title {
				font-size: 28rpx;
				color: #000;
			}
			.manage-status {
				font-size: 26rpx;
				color: #666666;
			}
		}
	}
	.box {
		width: 690rpx;
		margin-bottom: 30rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.05);
		box-sizing: border-box;
	}
	.avatar {
		display: block;
		border-radius: 55rpx;
		width: 110rpx;
		height: 110rpx;
		align-items: center;
		background: #4fbeb7;
	}
	.info-box {
		margin-left: 22rpx;
	}
	.nav-box {
		height: 200rpx;
		align-items: center;
		padding: 22rpx;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		
		.nav-item {
			font-size: 26rpx;
			width: 110rpx;
			// text-align: center;
			flex: 1;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.nav-icon {
				width: 94rpx;
				height: 94rpx;
			}
		}
		
	}
	.page{
	  height: 100vh;
	  width: 100vw;
	  display: flex;
	  flex-direction: column;
	  background: #F5F5F5;
	}

	.hd-text{
	  position: fixed;
	  width: 100%;
	  text-align: center;
	  top: 20px;
	  font-size: 28rpx;
	  color: #333;
	}
	.scroll-bg{
	  width: 100vw;
	  height: 60vh;
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
	.me-bd{
	  height: 100vh;
	}
	.box-container{
	  height: 100%;
	  box-sizing: border-box;
	  padding: 30rpx 30rpx 0 30rpx;
	}
	.self-info-box{
	  height: 200rpx;
	  align-items: center;
	  padding-left: 22rpx;
	  box-sizing: border-box;
	}
	.box-title{
	  margin-top: 20rpx;
	  font-size: 28rpx;
	}
	.tips-box {
		width: 100%;
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 20rpx;
		box-sizing: border-box;
		.tips {
			position: relative;
			text-indent: 1.5em;
			font-size: 24rpx;
			line-height: 40rpx;
		}
		.tips::before {
			content: '';
			position: absolute;
			background: #000;
			width: 16rpx;
			height: 16rpx;
			border-radius: 8rpx;
			top: 10rpx;
			left:13rpx;
		}
	}
	.health-status-box {
		padding-left: 30rpx;
		padding-right: 30rpx;
		box-sizing: border-box;
		flex-direction: column;

		.notes-box {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			padding-left: 60rpx;
			
			.notes {
				display: flex;
				font-size: 22rpx;
				width: 50%;
				align-items: center;
				margin-bottom: 42rpx;
			}
		}
		.health-form {
			display: flex;
			align-items: center;
			justify-content: left;
			border-top: 1px solid #f6f6f8;
			box-sizing: border-box;
			width: 100%;
			position: relative;
			height: 96rpx;
		}
		.health-form::after {
			content: '';
			position:absolute;
			right: 20rpx;
			width: 16rpx;
			height: 16rpx;
			border-bottom: 1rpx solid #333;
			border-right: 1rpx solid #333;
			transform: rotate(-45deg);
		}
	}

</style>
