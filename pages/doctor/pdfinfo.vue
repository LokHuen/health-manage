<template>

	<view style="background:#f7f7f7;">
		<div id="imgcreatebox">

		<div class="pagebox">
			<div class="userinfo flex">
				<span class="infoitem">姓名：{{userData.patientName}}</span><span class="infoitem">性别：{{userData.patientGender||"无"}}</span><span
				 class="infoitem">年龄：{{userData.age?(userData.age+"岁"):"无"}}</span><span class="infoitem">疾病诊断：{{userData.illness||"无"}}</span><span
				 class="infoitem">联系方式：{{userData.phone||"无"}}</span>
			</div>
			<div class="neartest">
				<div class="flex nearitem">
					<span style="font-size: 34rpx;">{{userData.result}}</span><span class="nearright">{{userData.createTime}} 测评</span>
				</div>
				<div class="flex nearitem otherline">
					<span class="nearleft">体质量评分</span><span class="nearright">{{userData.oneScore}}分</span>
				</div>
				<div class="flex nearitem otherline">
					<span class="nearleft">疾病与营养关系</span><span class="nearright">{{userData.twoScore}}分</span>
				</div>
				<div class="flex nearitem otherline">
					<span class="nearleft">应激评分</span><span class="nearright">{{userData.threeScore}}分</span>
				</div>
				<div class="flex nearitem ">
					<span class="nearleft">体格检查</span><span class="nearright">{{userData.fourScore}}分</span>
				</div>
				<div class="flex nearitem other">
					<span class="nearleft1">脂肪丢失情况评价</span><span class="nearright">{{userData.checkOneScore}}分</span>
				</div>
				<div class="flex nearitem other">
					<span class="nearleft1">肌肉丢失情况评价</span><span class="nearright">{{userData.checkTwoScore}}分</span>
				</div>
				<div class="flex nearitem other otherline">
					<span class="nearleft1">水肿情况评价</span><span class="nearright">{{userData.checkThreeScore}}分</span>
				</div>
				<div class="flex nearitem ">
					<span class="nearleft">本次测评总得分</span><span class="nearright">{{userData.total}}分</span>
				</div>
				<view class="item-list flex" v-show="testtype==1" @click="topgdetail">
					<view class="left-name">测评答题记录</view>
					<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
				</view>
			</div>
			
			<div class="chartbox">
				<div class="charttitle">PG-SGA营养状况评估记录分值</div>
				<div class="">
					<div class="chartleft">
						<div id="echarts" class="echartsleft" ref="echartsline"></div>

						<view style="font-size:28rpx;padding:0 0 30rpx 20rpx;text-align:left;">
							<view class="flex">
								<view class="flexc" style="width: 300rpx;margin-right: 20rpx;">
									<view class="flex">
										<text class="smallblockleft color1"></text>
										<text>0-1: 无营养不良</text>
									</view>
									<view>
										<view class="flex">
											<text class="smallblockleft color3"></text>
											<text>4-8: 中度营养不良</text>
										</view>
									</view>
								</view>
								<view class="flexc" style="flex: 1;">
									<view class="flex">
										<text class="smallblockleft color2"></text>
										<text>2-3: 可疑营养不良</text>
									</view>
									<view>
										<view class="flex">
											<text class="smallblockleft color4"></text>
											<text>≥9: 重度营养不良</text>
										</view>
									</view>
								</view>
							</view>

						</view>
					</div>
					<div class="chartright">
						<div>
							<div id="moreecharts" class="echarts" style=""></div>
						</div>
						<div class="linetext">注：分值越大情况越差</div>
						<div style="margin-top:30rpx;">
							<div id="threeecharts" class="echarts" style=""></div>
						</div>
						<div class="linetext">注：分值越大情况越差</div>
					</div>
				</div>
			</div>
			<div class="nutritionadvice">
				<div class="advicetitle">营养建议</div>
				<div class="advicetext" v-html="userData.content"></div>
			</div>
		</div>
		<div style="height:150rpx;"></div>
		</div>
		<div class="bottomfixed" @click="tomakepdf">生成PDF文件并导出</div>
	</view>
</template>

<script>
	const app = getApp();
	import echarts from '../../plugins/echarts';
	export default {
		components: {
			
		},
		data() {
			return {
				puid: "",
				isexmple: "",
				did: "",
				uid: localStorage.getItem("uid"),
				username: app.globalData.username || "",
				choosedoctor: app.globalData.choosedoctor || "",
				aname: app.getCache("accountName"),
				latelyData: {},
				userData: {},
				lineData: {
					//数字的图--折线图数据
					categories: [],
					series: [{
						data: [],
						name: ''
					}]
				},
				showDetail: true,
				hasLoadLindData: 0,
				splitNumber: 5,
				// puid: 1,
				recordList: [],
				writeRecord: false,
				advice: '',
				adviceId: '',
				answerid: "",
				daytab: ["近30天饮食摄入"],
				dayindex: 0,
				enptylist: ["总能量", "脂肪", "蛋白质", "碳水化合物"],
				enptyindex: 0,
				tlinedata: {},
				adviceName: app.getCache("adviceName"),
				tootherdoctor: "",
				doctorlist: [],
				testtype: 1, //1 pg-sga, 2 sga
				answertesttype: 1,
				imgUrl: "",
				imgUrl1: "",
				createTime: '',
				list: []
			}
		},
		onLoad(opt) {
			this.puid = opt.id||507;
			this.getUserData();
			
		},
		methods: {
			tomakepdf(){
				uni.navigateTo({
					url:"/pages/doctor/makepdf?id="+this.puid,
				})
			},
			getUserData() {
				
				if (this.puid == "") return;
				this.getInfo();

				this.getLineChartData();
				this.gettwolinedata();

			},
			getInfo() {
				app.getPatientScoreDetail({
					patientId: this.puid,
					surveyId: 1,
				}).then(res => {
					if (res.status == 1) {
						this.userData = res.data;
					}
				});
			},

			//拿曲线图的数据
			getLineChartData() {
				app.memberReplyRecordList({
					surveyId: this.testtype,
					pageNo: 1,
					userId: this.puid,pageSize:3,
				}).then(res => {
					if (res.status == 1) {
						this.lineData.categories = [];
						this.lineData.series[0].data = [];
						let tempArray = []
						if (res.data && res.data.length > 0) {
							res.data.reverse()
							res.data.forEach((item, index) => {
								var time = item.completeTime.split('/');
								var date = time[2].split(' ');
								this.lineData.categories.push(time[1] + '月' + date[0] + '日');
								//this.lineData.categories.push(item.phase);
								this.lineData.series[0].data.push(item.total)
								this.lineData.series[0].name = item.phase
								if (res.data.length - 1 == index) {
									this.latelyData = item;
									if (this.latelyData.content) this.latelyData.content = this.latelyData.content.replace(
										/\<span/gi,
										'<span class="richtext"');
								}
							})
							// console.log(this.lineData);
							this.$nextTick(() => {
								this.setlinebox();
							})
							// this.$refs['lineData'].showCharts();
						}
						this.hasLoadLindData = 1;
					}

				});
			},
			setlinebox() { //折线图
				var echartel = document.getElementById('echarts');
				if (echartel) {
					var myChart = echarts.init(echartel);
					// 指定图表的配置项和数据
					var option = {
						tooltip: {
							trigger: 'axis',
						},
						grid: {
							left: this.testtype == 1 ? '3%' : '0%',
							right: '3%',
							bottom: '6%',
							top: '10%',
							containLabel: true,
						},
						xAxis: {
							type: 'category',
							axisLabel: {
								fontSize: 15
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false,
								alignWithLabel: true
							},
							data: this.lineData.categories,
						},
						yAxis: {
							show: this.testtype == 1 ? true : false,
							name: "",
							axisLabel: {
								fontSize: 15
							},
							axisLine: {
								show: false
							},
							min: 0,
							axisTick: {
								show: false
							},
							type: 'value',
							splitLine: {
								show: false
							},
							scale: true,

						},

						series: [{
							name: '',
							type: 'line',
							symbolSize: 7,
							label: {
								normal: {
									show: this.testtype == 1 ? true : false,
									distance: 0,
									fontSize: 12,
									color: "#333",
									formatter: (opt) => { //设置拐点文字颜色
										if (opt.value > 9) return '{a|' + opt.value + '}';
									},
									rich: {
										a: {
											color: 'red',
										}
									}
								},

							},
							lineStyle: {
								color: this.testtype == 1 ? "#59A29F" : "#666666", //设置线条颜色
								width: 1,
							},
							itemStyle: {
								color: (opt) => { //设置拐点颜色
									if (opt.value > 9) return "red";
									else return "#59A29F";
								},
							},
							symbol: "circle",
							data: this.lineData.series[0].data,
							markArea: { //标记区域
								data: [
									[{
										yAxis: '0', //y轴坐标控制
										itemStyle: {
											color: '#6B9DA0'
										},
									}, {
										yAxis: '1'
									}],
									[{
										yAxis: '1',
										itemStyle: {
											color: '#F5CE8D'
										}
									}, {
										yAxis: '3'
									}],
									[{
										yAxis: '3',
										itemStyle: {
											color: '#F7E2DF'
										}
									}, {
										yAxis: '9'
									}],
									[{
										yAxis: '9',
										itemStyle: {
											color: '#BBC7DF'
										}
									}, {
										yAxis: '36'
									}],
								]
							},
						}]
					};
					if (this.testtype == 2) {
						option.yAxis.min = 0.5;
						option.yAxis.max = 3.5;
						option.series[0].markArea.data = [
							[{
								yAxis: '0.5', //y轴坐标控制
								itemStyle: {
									color: '#AFCEDF'
								},
							}, {
								yAxis: '1.5'
							}],
							[{
								yAxis: '1.5',
								itemStyle: {
									color: '#FFE7A5'
								}
							}, {
								yAxis: '2.5'
							}],
							[{
								yAxis: '2.5',
								itemStyle: {
									color: '#BCDCC4'
								}
							}, {
								yAxis: '3.5'
							}],
						]
					}
					// 使用刚指定的配置项和数据显示图表。
					myChart.clear();
					myChart.setOption(option);
				} else {
					setTimeout(res => {
						this.$nextTick(() => {
							this.setlinebox();
						})
					}, 500)
				}
			},
			setrightlinebox() { //多折线图
				var myChart = echarts.init(document.getElementById('moreecharts'));
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						bottom: "0%",
						// right: "2%",
						width: "100%",
						data: ['体质量评分', '疾病与营养', '应激评分', '体格检查']
					},
					grid: {
						top: "8%",
						left: '3%',
						right: '3%',
						bottom: '20%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						axisLabel: {
							fontSize: 13
						},
						axisLine: {
							show: true
						},
						axisTick: {
							show: false,
							alignWithLabel: true
						},
						data: this.tlinedata.timeList,
					},
					yAxis: {
						type: 'value',
						show: true,
						name: "",
						axisLabel: {
							fontSize: 13
						},
						axisLine: {
							show: true
						},
						min: 0,
						axisTick: {
							show: false
						},
						type: 'value',
						splitLine: {
							show: false
						},
						scale: true,
					},
					series: [{
							name: '体质量评分',
							type: 'line',
							symbol: "circle",
							symbolSize: 7,
							label: {
								normal: {
									show: true,
									distance: 0,
									fontSize: 12,
								},
							},
							data: this.tlinedata.oneScore,
						},
						{
							name: '疾病与营养',
							type: 'line',
							symbol: "circle",
							symbolSize: 7,
							label: {
								normal: {
									show: true,
									distance: 0,
									fontSize: 12,
								},
							},
							data: this.tlinedata.twoScore,
						},
						{
							name: '应激评分',
							type: 'line',
							symbol: "circle",
							symbolSize: 7,
							label: {
								normal: {
									show: true,
									distance: 0,
									fontSize: 12,
								},
							},
							data: this.tlinedata.threeScore,
						},
						{
							name: '体格检查',
							type: 'line',
							symbol: "circle",
							symbolSize: 7,
							label: {
								normal: {
									show: true,
									distance: 0,
									fontSize: 12,
								},
							},
							data: this.tlinedata.fourScore,
						},
					]
				};
				myChart.clear();
				myChart.setOption(option);
			},
			settiaoxingbox() { //柱状图
				var myChart = echarts.init(document.getElementById('threeecharts'));
				var option = {
					// color: ['#dddddd', '#52A29E'],
					tooltip: {
						trigger: 'axis',
					},
					legend: {
						bottom: "0%",
						// right: "2%",
						width: "100%",
						data: ['脂肪丢失', '肌肉丢失', '水肿情况']
					},
					grid: {
						top: "8%",
						left: '3%',
						right: '3%',
						bottom: '10%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						axisLabel: {
							fontSize: 13
						},
						data: this.tlinedata.timeList,
						axisTick: {
							show: false,
							alignWithLabel: true
						}

					}],
					yAxis: [{
						show: true,
						type: 'value',
						axisLabel: {
							fontSize: 13
						},
						axisLine: {
							show: true
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						},
					}],
					series: [{
							name: '脂肪丢失',
							type: 'bar',
							barWidth: '20%',
							data: this.tlinedata.checkOneScore,
							label: {
								normal: {
									show: true,
									fontSize: 12,
									color: "#333",
									position: 'top',
									formatter: (opt) => {
										if (opt.value == 0.01) return 0;
										return opt.value;
									}
								},

							},
						},
						{
							name: '肌肉丢失',
							type: 'bar',
							barWidth: '20%',
							data: this.tlinedata.checkTwoScore,
							label: {
								normal: {
									show: true,
									fontSize: 12,
									color: "#333",
									position: 'top',
									formatter: (opt) => {
										if (opt.value == 0.01) return 0;
										return opt.value;
									}
								},

							},
						},
						{
							name: '水肿情况',
							type: 'bar',
							barWidth: '20%',
							data: this.tlinedata.checkThreeScore,
							barGap: "10%",
							label: {
								normal: {
									show: true,
									distance: 3,
									fontSize: 12,
									color: "#333",
									position: 'top',
									formatter: (opt) => {
										if (opt.value == 0.01) return 0;
										return opt.value;
									}
								},
							},
						},
					]
				};
				myChart.clear();
				myChart.setOption(option);
			},
			gettwolinedata(cal) { //近7天数据
				app.getPatientScorePage({
					surveyId: 1,
					patientId: this.puid,pageSize:3,
				}).then(res => {
					res.data.oneScore = [];
					res.data.twoScore = [];
					res.data.threeScore = [];
					res.data.fourScore = [];
					res.data.checkOneScore = [];
					res.data.checkTwoScore = [];
					res.data.checkThreeScore = [];
					for (let i = 0; i < res.data.allList.length; i++) {
						res.data.oneScore.push(res.data.allList[i].oneScore);
						res.data.twoScore.push(res.data.allList[i].twoScore);
						res.data.threeScore.push(res.data.allList[i].threeScore);
						res.data.fourScore.push(res.data.allList[i].fourScore);
						res.data.checkOneScore.push(res.data.checkList[i].checkOneScore || 0.01);
						res.data.checkTwoScore.push(res.data.checkList[i].checkTwoScore || 0.01);
						res.data.checkThreeScore.push(res.data.checkList[i].checkThreeScore || 0.01);
					}
					this.tlinedata = res.data;

					this.$nextTick(() => {
						this.setrightlinebox();
						this.settiaoxingbox();
						
					})
					if (cal) cal();
				});
			},
			topgdetail(){
				uni.navigateTo({
					url:"/pages/patient/answer?id="+this.userData.recordId+"&testtype=1"
				})
			},
		},
		onShow() {

		},
	}
</script>

<style lang="scss" scoped>
	.bottomfixed{position:fixed;bottom:0;left:0;right:0;line-height:110rpx;text-align:center;font-size:36rpx;color:#fff;background: $maincolor;}
	.linetext {
		font-size: 28rpx;
		padding: 30rpx 0;
		text-align: center;
	}

	.pagebox {
		.chartbox {
			.chartleft {
				width: 100%;
			}

			.chartright {
				width: 100%;
			}

			.charttitle {
				font-size: 42*0.8rpx;
				padding-bottom: 10rpx;
			}

			border-radius: 7rpx;
			padding:30rpx;
			box-sizing:border-box;
			background-color: #fff;
			margin-bottom:34rpx;
		}

		.nutritionadvice {
			.advicetitle {
				font-size: 48*0.8rpx;
				padding-bottom: 30rpx;
			}

			.advicetext {
				font-size: 36*0.8rpx;
			}

			border-radius: 7rpx;
			padding:30rpx;
			box-sizing:border-box;
			background-color: #fff;
			margin-bottom:34rpx;
		}

		.neartest {
			.nearitem {
				justify-content: space-between;
				font-size: 36*0.8rpx;
				padding: 20rpx 0;
				box-sizing: border-box;

				.nearleft {
					padding-left: 20rpx;
				}

				.nearleft1 {
					padding-left: 50rpx;
					color: #555;
				}

				.nearright {
					padding-right: 20rpx;
				}

				&.other {
					padding: 20rpx 0;
				}

				&.otherline {
					border-bottom: 2rpx solid #ccc;
				}
			}

			border-radius: 7rpx;
			padding:20rpx 30rpx 30rpx;
			box-sizing:border-box;
			background-color: #fff;
			margin-bottom:34rpx;
		}

		padding:0 20rpx;

		.userinfo {
			border-radius: 8rpx;
			padding:30rpx 10rpx 30rpx 30rpx;
			box-sizing:border-box;
			background-color: #fff;
			margin-bottom:34rpx;margin-top:30rpx;
			line-height: 50rpx;

			.infoitem {
				padding-right: 40rpx;
				font-size: 36*0.8rpx;
			}
		}

	}

	.headright {
		font-size: 48*0.8rpx;
	}

	.container1 {
		justify-content: space-between;
		flex-wrap: nowrap;
		padding: 3.6rem 136rpx;
		border-bottom: 2rpx solid #ccc;

		span {
			display: inline-flex;
		}
	}

	.turnbox {
		padding: 50rpx 0;
		margin: 0 50rpx;
		border-bottom: 1px solid #ddd;

		.el-radio {
			width: 50%;
			margin-right: 0;
			padding-bottom: 30rpx;
		}
	}

	.turnboxsure {
		padding: 30rpx 0;
		text-align: center;
		font-size: 36*0.8rpx;
		cursor: pointer;
	}

	.nodatabox {
		padding-left: 20rpx;
	}

	.actionlist {
		margin: 0 38rpx 38rpx;

		.sportitem {
			width: 281.8rpx;
			margin-left: 8rpx;
			box-shadow: 1px 2px 19px 2px rgba(192, 192, 192, 0.3);
			justify-content: center;
			height: 172.3rpx;

			image {
				width: 74rpx;
				margin-right: 20rpx;
			}
		}

		.leftaction {
			box-shadow: 1px 2px 19px 2px rgba(192, 192, 192, 0.3);
			justify-content: center;
			height: 83rpx;
			width: 100%;

			&.mrbt {
				margin-bottom: 6rpx;
			}

			image {
				width: 38rpx;
				margin-right: 20rpx;

				&.other {
					width: 28rpx;
				}
			}

		}
	}

	.marlr20 {
		margin: 0 20rpx;
	}

	.enptylist {
		//padding-left: 24rpx;
		text-align: center;
		cursor: pointer;

		width: 150rpx;

		&.on {
			color: #52A29E;
		}

		&:nth-child(4) {
			width: 230rpx;
		}
	}

	.blocklistbox {
		font-size: 26*0.8rpx;
		color: #555;
		padding: 0 0 40rpx 30rpx;

		.blockgreen {
			width: 16rpx;
			height: 16rpx;
			background: #ddd;
			margin-right: 8rpx;
		}

		.blockblue {
			width: 16rpx;
			height: 16rpx;
			background: #52A29E;
			margin: 0 8rpx 0 60rpx;
		}
	}

	.choosedaybox {
		margin: 20rpx 30rpx 40rpx;
		//width: 600rpx;
		//min-width: 900rpx;
		//border-radius: 10rpx;
		overflow: hidden;
		flex-wrap: unset;
		//box-shadow: 1px 2px 19px 2px rgba(192, 192, 192, 0.3);
		font-size: 30*0.8rpx;
		text-align: center;
		padding-right: 10rpx;
		//background-color: #00FFFF;

		.daylist {
			width: 33.3%;
			box-sizing: border-box;
			line-height: 1;
			padding: 24rpx 0;
			text-align: center;
			border-radius: 0rpx;
			-webkit-box-flex: 1;
			-webkit-flex: 1 0 auto;
			flex: 1 0 auto;

			&.on {
				color: #fff;
				background: #52A29E;
			}
		}
	}

	.i-assess-detail {
		width: 1100rpx;
		background: #fff;
		border-radius: 12rpx;
		overflow: hidden;

		.headtitle {
			height: 92rpx;
			background: #EAEAEA;
			font-size: 34*0.8rpx;
			padding: 0 29rpx;
		}

		.doctorinfodetail {
			padding: 50rpx 0rpx;

		}
	}

	.doctorinfobox {
		width: 914rpx;
		background: #fff;
		border-radius: 12rpx;
		overflow: hidden;

		.headtitle {
			height: 92rpx;
			background: #EAEAEA;
			font-size: 34*0.8rpx;
			padding: 0 29rpx;
		}

		.doctorinfodetail {
			padding: 50rpx 30rpx;

		}
	}

	.rightnodata {
		width: 100%;
		height: 90vh;
		justify-content: center;
	}

	.resulttext {
		font-size: 27*0.8rpx;
		color: #D80000;
		padding-bottom: 16rpx;
	}

	.patientbox {
		padding: 30rpx 50rpx;
		padding-right: 0rpx;

		.detail-box {
			background-color: #FFFFFF;
			box-shadow: -10rpx 8rpx 22rpx 2px rgba(101, 101, 101, 0.1);
			border-radius: 10rpx;

			.detail-box-title {

				padding-top: 45rpx;
				padding-left: 75rpx;
				font-size: 39*0.8rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #419490;
				line-height: 67rpx;

			}

			.infodetaillist {
				padding-top: 37.5rpx;
				padding-left: 75rpx;
				color: #666666;
				font-size: 33*0.8rpx;
				font-family: PingFang SC;
				font-weight: 400;


				.tit {
					//width: 180rpx;
				}

				.detai {
					//color: #999;
				}
			}

			.img-box {
				padding: 10rpx 30rpx;

				.img-item {
					width: 104rpx;
					height: 104rpx;
					background-color: #999999;
					margin-left: 20rpx;
				}

				.img-time {
					margin-top: 10rpx;
					font-size: 16*0.8rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 46rpx;
					margin-left: 20rpx;
				}

			}
		}


	}

	.username {
		padding: 10rpx 70rpx 0rpx;
		box-sizing: border-box;
		font-size: 51*0.8rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #419490;
		line-height: 67rpx;

	}


	.container {
		.info-box {
			height: 198rpx;
			display: flex;

			.avator {
				margin-top: 40rpx;
				background-color: #909399;
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				margin-left: 50rpx;
			}

			.user-msg-box {
				padding-top: 50rpx;
				color: #333333;
				margin-left: 31rpx;

				.name {
					font-size: 20*0.8px;
				}

				.msg {
					font-size: 14*0.8px;
				}
			}
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.content {
			.function-box {
				height: 209rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.function-item {
					.function-item-img {
						height: 92rpx;
						width: 96rpx;
					}

					.function-item-title {
						color: #333333;
						font-size: 26*0.8rpx;
					}
				}
			}
		}

		.health-msg-box {
			background-color: #FFFFFF;
			margin-top: 20rpx;
			box-shadow: -10rpx 8px 22rpx 2rpx rgba(101, 101, 101, 0.1);
			border-radius: 10rpx;

			.health-list-box {
				text-align: center;
				width: 50%;
				padding-bottom: 0.4rem;

				.health-list-item {
					color: #333333;

					.top-title {
						margin-top: 40rpx;
						display: flex;
						font-size: 13*0.8px;
						justify-content: center;

						.askIcon {
							width: 22rpx;
							height: 22rpx;
						}
					}

					.health-detail {
						font-size: 13*0.8px;
					}

					.health-tips {
						font-size: 12*0.8px;
						color: #999999;
					}
				}
			}

			.tips-box {
				display: flex;

				.tips {
					color: #333333;
					font-size: 12*0.8px;
					margin-left: 40rpx;
					margin-top: 25rpx;
				}

				.ask-icon {
					margin-top: 32rpx;
					width: 24rpx;
					height: 24rpx;
				}

			}

			.tips-detail {
				margin-left: 40rpx;
				margin-top: 15rpx;
				padding-bottom: 48rpx;
				color: #999999;
				font-size: 12*0.8px;
			}

		}

		.record-chart-box {
			width: 50%;
			display: flex;
			flex-direction: column;

			color: #333333;
			text-align: center;
			align-items: center;
			justify-content: center;

			.record-chart-title {
				font-size: 27*0.8rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 67rpx;
				text-align: center;
			}

			.record-chart-subtitle {
				color: #59A29F;
				font-size: 12*0.8px;
				margin-top: 19rpx;
			}

		}

		.last-one {
			color: #333333;
			font-size: 15*0.8px;
			margin-left: 50rpx;
			margin-top: 60rpx;
		}

		.listContent {
			margin-top: 20rpx;
			margin-left: 50rpx;
			margin-right: 50rpx;
			background-color: #F7F8F8;

			.health-list-item {
				position: relative;
				margin-top: 30rpx;
				display: flex;

				.health-list-item-avatar-content {
					.health-list-item-avatar {
						margin-left: 20rpx;
						margin-top: 40rpx;
						width: 45rpx;
						height: 45rpx;
						border-radius: 50%;
					}
				}

				.health-list-item-content {
					margin-left: 15rpx;
					margin-top: 40rpx;
					padding-bottom: 40rpx;
					width: 100%;

					.health-list-item-title {
						font-size: 30*0.8rpx;
						color: #52A29E;
					}

					.health-list-item-detail {
						color: #999999;
						font-size: 26*0.8rpx;
						margin-top: 20rpx;
					}

					.health-list-item-time {
						color: #666666;
						font-size: 26*0.8rpx;
						margin-top: 20rpx;
						padding-bottom: 10rpx;
					}

					.line {
						background-color: #CCCCCC;
						margin-top: 15rpx;
						height: 2rpx;
						margin-right: 20rpx;
					}

					.advice-content {
						font-size: 22*0.8rpx !important;
						color: #666666;
						padding: 20rpx 20rpx 0 0;
					}
				}

				.health-list-item-arrow {
					position: absolute;
					width: 35rpx;
					height: 19rpx;
					right: 20rpx;
					top: 120rpx;

				}
			}
		}

		.button-box {
			position: fixed;
			bottom: 0;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17*0.8px;
			}
		}

		.white-background {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-title {
				font-size: 14*0.8px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-subtitle {
				font-size: 15*0.8px;
				color: #333333;
				margin-top: 40rpx;
			}

			.white-background-line-space {
				background-color: #F6F6F6;
				height: 20rpx;
				margin-top: 60rpx;
			}

			.white-background-close {
				font-size: 15*0.8px;
				color: #666666;
				height: 100rpx;
				line-height: 100rpx;
			}
		}

		.white-background-BMI {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-BMI-title {
				font-size: 14*0.8px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-BMI-des {
				font-size: 15*0.8px;
				color: #333333;
				margin-top: 40rpx;
				margin-left: 60rpx;
				margin-right: 60rpx;
				text-align: left;
			}

			.white-background-BMI-des2 {
				font-size: 15*0.8px;
				color: #333333;
				margin-left: 60rpx;
				margin-right: 60rpx;
				text-align: left;
				height: 120rpx;
				line-height: 120rpx;
			}

			.white-background-BMI-line-space {
				background-color: #F6F6F6;
				height: 20rpx;
			}

			.white-background-BMI-close {
				height: 100rpx;
				line-height: 100rpx;
				font-size: 15*0.8px;
				color: #666666;
			}
		}

		.white-background-energy {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-energy-title {
				font-size: 14*0.8px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-energy-desc-title {
				margin-left: 60rpx;
				margin-right: 60rpx;
				margin-top: 60rpx;
				text-align: left;
				color: #333333;
				font-size: 15*0.8px;
			}

			.white-background-energy-desc {
				margin-left: 60rpx;
				margin-right: 60rpx;
				margin-top: 20rpx;
				text-align: left;
				color: #333333;
				font-size: 15*0.8px;
			}

			.white-background-energy-space-white {
				background-color: #FFFFFF;
				height: 60rpx;
			}

			.white-background-energy-space-gray {
				background-color: #F6F6F6;
				height: 20rpx;
			}

			.white-background-energy-close {
				height: 100rpx;
				line-height: 100rpx;
				font-size: 15*0.8px;
				color: #666666;
			}
		}

		.white-bg-MA {
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.MA-title {
				padding-top: 10rpx;
				padding-left: 75rpx;
				text-align: left;
				color: #666666;
				font-size: 13*0.8px;
			}

			.MA-space {
				height: 300rpx;
			}

			.MA-record-list {
				margin-top: 30rpx;
				padding-bottom: 15rpx;
				border-bottom: 2rpx solid #E5E5E5;

			}

			.MA-record-list1 {
				margin-top: 30rpx;
				padding-bottom: 15rpx;
			}

			.record-content {
				display: flex;
				padding-left: 75rpx;
				color: #666666;
				font-size: 33*0.8rpx;
			}

			.record-time-box {
				display: flex;
				margin-top: 15rpx;
				padding-left: 125rpx;
				padding-bottom: 20rpx;

				.record-time {
					font-size: 27*0.8rpx;
					color: #999999;
					margin-right: 25rpx;
				}

				.record-motify {
					font-size: 14*0.8px;
					color: #666666;

				}
			}

			.MA-line {
				margin-top: 30rpx;
				background-color: #F6F6F6;
				height: 20rpx;
			}

			.MA-send {
				text-align: center;
				height: 104rpx;
				line-height: 104rpx;
				color: #52A29E;
				font-size: 15*0.8px;
				border-bottom: 2rpx solid #E5E5E5;
			}

			.MA-close {
				text-align: center;
				height: 102rpx;
				line-height: 102rpx;
				color: #666666;
				font-size: 15*0.8px;
			}
		}

		.white-bg-MA-write {
			margin-top: 20rpx;
			background-color: #EDF5F4;
			padding: 20rpx 0 30rpx;
			margin-left: 75rpx;
			margin-right: 75rpx;
			border-radius: 10rpx;


			.MA-write-top {
				height: 104rpx;
				position: relative;

				.turnback {
					position: absolute;
					left: 60rpx;
					top: 36rpx;
					width: 16.5rpx;
					height: 28.5rpx;
				}

				.close-write {
					position: absolute;
					right: 60rpx;
					top: 36rpx;
					width: 22.6rpx;
					height: 22.6rpx;
				}
			}

			.textarea {
				height: 90rpx;
				margin-top: 20rpx;
				margin-left: 44rpx;
				margin-right: 44rpx;
				background: #fff;
				padding-left: 20rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
				color: #BBBBBB;
				font-size: 30*0.8rpx;
				font-family: PingFang SC;
				font-weight: 400;
				//line-height: 90rpx;


			}

			.write-box {}

			.MA-write-tips {
				margin-top: 15rpx;
				color: #999999;
				font-size: 13*0.8px;
				text-align: center;
				padding-bottom: 40rpx;
			}
		}
	}

	.notice-box {
		//padding: 30rpx 60rpx 28rpx;
		//width: 50%;
		width: 984rpx;
		height: 377rpx;
		border-radius: 15rpx;
		box-sizing: border-box;
		padding-bottom: 60rpx;
		background-color: #EDF5F4;
		margin-top: 60rpx;
		margin-left: 75rpx;

		.notice-info {
			padding-top: 30rpx;
			padding-left: 75rpx;
			text-align: left;
			font-size: 33*0.8rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 67rpx;

			.notice-text {
				color: #999;
				margin-top: 15rpx;
				font-size: 27*0.8rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 67rpx;

			}
		}

		.leftinfo {
			flex: 1;
			font-size: 24*0.8rpx;
			padding-left: 75rpx;

			.infolist {
				padding-bottom: 10rpx;

				font-size: 30*0.8rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 56rpx;


				.inforound {
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					background: #F6BC6A;
					margin-right: 12rpx;


					&.bcolor2 {
						background: #52A29E;
					}

					&.bcolor3 {
						background: #FA94C0;
					}
				}
			}
		}

		.rightinfo {
			padding-right: 120rpx;

			.mintext {
				font-size: 24*0.8rpx;
				color: #999;
			}
		}
	}

	.echarts {
		width: 100%;
		height: 700rpx;
	}

	.echartsleft {
		width: 100%;
		height: 600rpx;
	}

	.centerwh {
		width: 216rpx;
		padding-bottom: 20rpx;
	}

	.centerwh1 {
		display: inline-block;
		padding-right: 16rpx;
	}

	.smallblockleft {
		width: 24rpx;
		height: 24rpx;
		border-radius: 4rpx;
		margin: 0 8rpx 0 8rpx;
		display: inline-block;
		background: #4CD964;

		&.color1 {
			background: #6B9DA0;
		}

		&.color2 {
			background: #F5CE8D;
		}

		&.color3 {
			background: #F7E2DF;
		}

		&.color4 {
			background: #BBC7DF;
		}
	}

	.content {
		padding: 0 240rpx;
		padding-bottom: 50rpx;

		.table-des {
			font-size: 46*0.8rpx;
			font-weight: bold;
			margin-top: 60rpx;
		}

		.i-table {
			.i-td {
				width: 100%;
				justify-content: flex-start !important;
				padding: 16rpx 32rpx;
				line-height: 60rpx;
				text-align: left !important;
			}

			.flex1 {
				flex: 1;

			}

			.flex4 {
				flex: 4;
			}

			.flex10 {
				flex: 10;
			}

			.weight-table-title {
				background: rgba(252, 166, 43, 0.06);
				color: #FCA62B !important;
			}
		}

		.i-table-margin {
			margin-top: 48rpx;
		}
	}
	.item-list{
		margin:20rpx 0rpx 0;
		position: relative;background:#f7f7f7;
		.left-name{
			height: 100rpx;
			line-height: 100rpx;
			font-size: 16px;
			color: #333333;
			padding-left: 26rpx;
		}
		.right-arrow{
			position: absolute;
			right: 20rpx;
			width: 15rpx;
			height: 26rpx;
			// top: 40rpx;
			
		}
	}
</style>
