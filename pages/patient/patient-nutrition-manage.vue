<template>
	<!-- 患者营养管理界面 -->
	<view class="container">
		<view style="position: fixed;top:0;left:0;bottom:0;right:0;z-index:999;background:#fff;" v-show="!infoData.patientName"></view>
		<view class="info-box">
			<image :src="infoData.portrait" mode="scaleToFill" class="avator"></image>
			<view class="user-msg-box">
				<view class="name">
					{{infoData.patientName||"游客"}}
				</view>
				<view class="msg">{{(infoData.patientGender||"")+' '+((infoData.age || infoData.age!=0)?(infoData.age+'岁 '):'')+(infoData.illness||"")}}
				
				</view>
			</view>
		</view>
		<view class="line-space"></view>
		<view class="content">
			<view class="function-box">
				<view class="function-item" v-for="(item,index) in list" :key="index" @click="clickFuction(index)">
					<image :src="item[0]" mode="widthFix" class="function-item-img"></image>
					<view class="function-item-title">{{item[1]}}</view>
				</view>
			</view>
		</view>
		<view class="health-msg-box">
			<view class="health-list-box">
				<view class="health-list-item">
					<view class="top-title">当前体重</view>
					<view class="health-detail">
						<text style="font-size: 23px;">{{infoData.weight}}</text>KG
					</view>
				</view>
				<view class="health-list-item">
					<view class="top-title">
						<view class="">标准体重</view>
						<image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="askIcon" @click="showComputing"></image>
					</view>
					<view class="health-detail">
						<text style="font-size: 23px;">{{infoData.standardWeight}}</text>KG
					</view>
				</view>

				<view class="health-list-item">
					<view class="top-title">
						<view class="">BMI</view>
						<image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="askIcon" @click="showBMITips"></image>
					</view>
					<view class="health-detail">
						<text style="font-size: 23px;">{{infoData.bmi}}</text>
					</view>
					<view class="health-tips">
						{{infoData.normal==1?'属正常体重范围':'超出正常体重范围'}}
					</view>
				</view>

			</view>
			<view class="notice-box">
				<view class="notice-info">
					经典均衡饮食<view class="notice-text">恶性肿瘤患者膳食营养处方专家共识推荐</view>
				</view>
				<view class="flex">
					<view class="leftinfo">
						<view class="flex infolist">
							<view class="inforound"></view>
							{{'脂肪'+infoData.dailyFat+'g'}}
						</view>
						<view class="flex infolist">
							<view class="inforound bcolor2"></view>
							{{'蛋白质'+infoData.dailyProtein+'g'}}
						</view>
						<view class="flex infolist">
							<view class="inforound bcolor3"></view>
							{{'碳水化合物'+infoData.dailyCarbonHydrate+'g'}}
						</view>
					</view>
					<view class="rightinfo">
						<view @click="showEnergyTips" style="font-size:26rpx;"><text style="font-size:46rpx;">{{infoData.dailyEnergy}}</text>kcal<image
							 src="../../static/icon/wenhaoIcon.png" mode="widthFix" style="width:24rpx;"></image>
						</view>
						<view class="mintext">建议每日总能量</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="flex choosedaybox">
			<view v-for="(item,index) in daytab" :key="index" :class="dayindex==index?'daylist on':'daylist'" @click="clickday(index)" style="">{{item}}</view>
		</view>
		<view v-if="dayindex==0">
			<view class="health-msg-box other prelative" style="">
					<view class="blockbox">
						<view class="blockbigbox flex">
							{{echartsdata.needEnergy}}
							<view class="smfont pabs20">总能量已摄入</view>
							<view class="smfont pabs0">0</view>
							<view class="smfont pabs10">{{echartsdata.dailyEnergy}}</view>
							<view v-for="(item,index) in 25" :key="index" :class="'greenline position'+(index+1)+' '+(index<greenindex?'green':'')"></view>
						</view>
						<view>单位：千卡</view>
					</view>			
			</view>
			<view class="health-msg-box other prelative" style="">
				<div id="threeecharts" class="echarts"></div>
				<view class="flex blocklistbox">
					<view class="blockgreen"></view>
					空腹血糖正常区间
					<view class="blockblue"></view>
					餐后2小时正常区间
				</view>
			</view>
		</view>
		<view v-if="dayindex!=0">
			<block>
			<view class="health-msg-box other prelative" style="margin-bottom:80rpx;">
				<view >摄入：</view>
				<div id="line71echarts" class="echarts"></div>
				<view class="flex blocklistbox">
					<view class="blockgreen"></view>
					空腹血糖正常区间
					<view class="blockblue"></view>
					餐后2小时正常区间
				</view>
				<view >运动消耗：</view>
				<div id="line72echarts" class="echarts"></div>
			</view>
			</block>
			<block >
				<view class="nodatabox">
					<image src="../../static/patient/nodata.png" mode="widthFix" class="nodata"></image>
					<view>暂时没有数据</view>
				</view>
			</block>
		</view>

		<view class="record-chart-box" v-if="(hasLoadLindData==0)||(lineData.categories.length>0 &&hasLoadLindData ==1)">
			<view class="record-chart-title">PG-SGA营养状况评估</view>
			<view class="record-chart-subtitle">分值越小，营养状况越好</view>

			<!-- 折线Line纯数字-->
			<!-- <view class="line-chart-box">
				<line-chart class="line-chart" ref="lineData" canvasId="index_line_2" :dataAs="lineData" :splitNumber="splitNumber" />
			</view> -->
			<div id="echarts" class="echarts"></div>
			<view style="font-size:24rpx;padding:0 0 30rpx 40rpx;text-align:left;">
			<view ><text class="centerwh">0~1:无营养不良</text>2~3:可疑营养不良 </view>
			<view ><text class="centerwh">4~8:中度营养不良</text>>=9:重度营养不良</view>
			</view>
		</view>

		<view class="last-one" v-if="latelyData.result">最近一次评价</view>

		<view class="listContent" v-if="latelyData.result">
			<view class="health-list-item" @click="toanswerlist(latelyData.id)">
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" :src="latelyData.result=='营养良好'?'../../static/icon/smile.png':'../../static/icon/cry_icon.png'"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">{{latelyData.result}}</view>
					<view class="health-list-item-detail">{{latelyData.phase}}</view>
					<view class="health-list-item-time">{{'测评时间：'+latelyData.completeTime}}</view>
					<view class="line" v-if="showDetail"></view>
					<view class="advice-content">
						<rich-text :nodes="latelyData.content" v-if="showDetail"></rich-text>
					</view>
					
				</view>
				<image class="health-list-item-arrow" :src="showDetail?'../../static/icon/right_arrow_top.png':'../../static/icon/right_arrow.png'"
				 mode="widthFix" @click.stop="showDetailMessage" v-show="false"></image>
			</view>
		</view>

		<view class="button-box">
			<button type="default" class="button" @click="beginTest">PG-SGA 营养测评</button>
		</view>
		<view style="height: 200px;"></view>
		<uni-popup ref="popup" type="bottom">
			<!-- 标准体重计算方法 -->
			<view class="white-background">
				<view class="white-background-title">标准体重计算方法</view>
				<view class="white-background-subtitle">标准体重=身高（cm）-105</view>
				<view class="white-background-line-space"></view>
				<view class="white-background-close" @click="closdComputing">关闭</view>
			</view>
		</uni-popup>

		<uni-popup ref="popupBMI" type="bottom">
			<!-- BMI -->
			<view class="white-background-BMI">
				<view class="white-background-BMI-title">BMI</view>
				<view class="white-background-BMI-des">BMI一般指身体质量指数，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。</view>
				<view class="white-background-BMI-des2">BMI=体重（kg）除以身高（m）的平方</view>
				<view class="white-background-BMI-line-space"></view>
				<view class="white-background-BMI-close" @click="closeBMITips">关闭</view>
			</view>
		</uni-popup>

		<uni-popup ref="popupEnergy" type="bottom">
			<!-- 能量说明 -->
			<view class="white-background-energy">
				<view class="white-background-energy-title">能量值说明</view>
				<view class="white-background-energy-desc-title">
					根据恶性肿瘤患者膳食营养处方专家共识
				</view>
				<view class="white-background-energy-desc">
					1. 每日总能量按每天30kcal/kg计算，每日总能量=体重（kg）×30kcal/kg
				</view>
				<view class="white-background-energy-desc">
					2. 脂肪按总能量的30%计算，脂肪=每日总能量×30%÷9kcal/g
				</view>
				<view class="white-background-energy-desc">
					3.蛋白质按1.5g/(kg.d)计算，蛋白质=体重（kg）×1.5g/(kg.d)×1d
				</view>
				<view class="white-background-energy-desc">
					4.碳水化合物=（每日总能量-脂肪×9kcal/g-蛋白质×4kcal/g）÷4kcal/g
				</view>
				<view class="white-background-energy-space-white"></view>
				<view class="white-background-energy-space-gray"></view>
				<view class="white-background-energy-close" @click="closeEnergyTips">关闭</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	const app = getApp();
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	import echarts from '../../plugins/echarts';
	export default {
		components: {
			LineChart,
		},
		data() {
			return {
				latelyData: {},
				infoData: {},
				list: [
					["/static/icon/baseInfoicon.png", "基础信息"],
					["/static/icon/bingliMangmenticon.png", "病例管理"],
					["/static/icon/testRecordIcon.png", "测评记录"]
				],
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
				echartsdata:{},
				daytab: ["今日","近7天", "近30天"],
				dayindex: 0,
				greenindex:20,
			}
		},
		methods: {
			clickday(index) {
				this.dayindex = index;
				switch (index) {
					case 0:
						// this.getxuetangdata(() => {
							this.$nextTick(() => {
								this.settiaoxingbox();
							})
						// })
						// this.getdietstatTemplate();
						break;
					case 1:
						// this.gettwolinedata(() => {
							this.$nextTick(() => {
								this.settwolinebox();
								this.settwolinebox1();
							})
						// })
						break;
					case 2:
						// this.gettwolinedata(() => {
							this.$nextTick(() => {
								this.settwolinebox();
								this.settwolinebox1();
							})
						// })
						break;
				}
			},
			gettwolinedata(cal){ //近7天数据
				app.statTemplate({}).then(res => {
					res.data.reverse();
					this.uricacid = res.data;
					cal();
				});
			},
			settwolinebox() { //近7天图1
				// let list = this.blooddata.resultList0;
				// let xdata=[],linedata=[];
				// if(list.length==0) return;
				// for (var i = 0; i < list.length; i++) {
				// 	let date = list[i].bgdate.split("-");
				// 	xdata.push(date[1] + "/" + date[2]);
				// 	linedata.push(list[i].bloodGlucose);
				// }
				// this.nowblood = list[list.length-1].bloodGlucose;
				// let mindata = Math.min(...linedata);
				// let maxdata = Math.max(...linedata);
				var myChart = echarts.init(document.getElementById('line71echarts'));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '-5%',
						right: '3%',
						bottom: '4%',
						top: '10%',
						containLabel: true,
					},
					xAxis: {
						type: 'category',
						axisLabel: {
							fontSize: 10
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
							alignWithLabel: true
						},
						data: ["12/1","12/2"]//xdata
					},
					yAxis: {
						show:false,
						name: "",
						axisLabel: {
							fontSize: 10,
							formatter: function(v){
							    return  tranNumber(v);
							}
						},
						axisLine: {
							show: false
						},
						// min: mindata>3.5?3.5:mindata,
						// max: maxdata>11?maxdata:11,
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
						name: '血糖',
						type: 'line',
						symbolSize: 7,
						label: {
							normal: {
								show: true,
								distance: 0,
								fontSize: 11,
								color: "#333",
								formatter: (opt) => { //设置拐点文字颜色
									if (opt.value > 11.1||opt.value<3.9) return '{a|' + opt.value + '}';
								},
								rich: {
									a: {
										color: 'red',
									}
								}
							},
			
						},
						lineStyle: {
							color: "#979797", //设置线条颜色
							width: 1,
						},
						itemStyle: {
							color: (opt) => { //设置拐点颜色
								if (opt.value > 11.1||opt.value<3.9) return "red";
								else return "#008FD9";
							},
						},
						symbol: "circle",
						data: [12,20],//linedata,
						markArea: { //标记区域
							data: [
								[{
									yAxis: '3.9', //y轴坐标控制
									itemStyle: {
										color: '#DCF4E7'
									},
								}, {
									yAxis: '6.1'
								}],
								[{
									yAxis: '6.1',
									itemStyle: {
										color: '#DAF2FF'
									}
								}, {
									yAxis: '11.1'
								}]
							]
						},
					}]
				};
			
				// 使用刚指定的配置项和数据显示图表。
				myChart.clear();
				myChart.setOption(option);
			},
			settwolinebox1() { //近7天图2
				// let list = this.blooddata.resultList0;
				// let xdata=[],linedata=[];
				// if(list.length==0) return;
				// for (var i = 0; i < list.length; i++) {
				// 	let date = list[i].bgdate.split("-");
				// 	xdata.push(date[1] + "/" + date[2]);
				// 	linedata.push(list[i].bloodGlucose);
				// }
				// this.nowblood = list[list.length-1].bloodGlucose;
				// let mindata = Math.min(...linedata);
				// let maxdata = Math.max(...linedata);
				var myChart = echarts.init(document.getElementById('line72echarts'));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '-5%',
						right: '3%',
						bottom: '4%',
						top: '10%',
						containLabel: true,
					},
					xAxis: {
						type: 'category',
						axisLabel: {
							fontSize: 10
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
							alignWithLabel: true
						},
						data: ["12/1","12/2"]//xdata
					},
					yAxis: {
						show:false,
						name: "",
						axisLabel: {
							fontSize: 10,
							formatter: function(v){
							    return  tranNumber(v);
							}
						},
						axisLine: {
							show: false
						},
						// min: mindata>3.5?3.5:mindata,
						// max: maxdata>11?maxdata:11,
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
						name: '血糖',
						type: 'line',
						symbolSize: 7,
						label: {
							normal: {
								show: true,
								distance: 0,
								fontSize: 11,
								color: "#333",
								formatter: (opt) => { //设置拐点文字颜色
									if (opt.value > 11.1||opt.value<3.9) return '{a|' + opt.value + '}';
								},
								rich: {
									a: {
										color: 'red',
									}
								}
							},
			
						},
						lineStyle: {
							color: "#979797", //设置线条颜色
							width: 1,
						},
						itemStyle: {
							color: (opt) => { //设置拐点颜色
								if (opt.value > 11.1||opt.value<3.9) return "red";
								else return "#008FD9";
							},
						},
						symbol: "circle",
						data: [23,34],//linedata,
						markArea: { //标记区域
							data: [
								[{
									yAxis: '3.9', //y轴坐标控制
									itemStyle: {
										color: '#DCF4E7'
									},
								}, {
									yAxis: '6.1'
								}],
								[{
									yAxis: '6.1',
									itemStyle: {
										color: '#DAF2FF'
									}
								}, {
									yAxis: '11.1'
								}]
							]
						},
					}]
				};
			
				// 使用刚指定的配置项和数据显示图表。
				myChart.clear();
				myChart.setOption(option);
			},
			settiaoxingbox() { //柱状图
				// let list = this.blooddata.resultList2;
				// let xdata=[],linedata=[];
				// if(list.length==0) return;
				// let typetext=["",'凌晨', '空腹', '早餐后', '午餐前', '午餐后', '晚餐前', '晚餐后', '睡前', '随机'];
				// for (var i = 0; i < list.length; i++) {
				// 	let name = typetext[list[i].timeQuantum];
				// 	xdata.push(name);
				// 	linedata.push({name:name,value:list[i].avg});
				// }
				
				var myChart = echarts.init(document.getElementById('threeecharts'));
				var option = {
				    color: ['#333333','#12C660'],
				    tooltip: {
				        trigger: 'axis',
				    },
				    grid: {
						top:"10%",
				        left: '0%',
				        right: '0%',
				        bottom: '5%',
				        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
							axisLabel:{fontSize:10},
				            data: ["蛋白质","脂肪","碳水化合物"],//xdata,
				            axisTick: {
								show: false,
				                alignWithLabel: true
				            }
							
				        }
				    ],
				    yAxis: [
				        {
							show:false,
				            type: 'value',
							axisLabel:{fontSize:10},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
				        }
				    ],
				    series: [
				        {
				            name: '建议摄入值',
				            type: 'bar',
				            barWidth: '20%',
				            data: [60,60,160],//linedata,
							label: {
								normal: {
									show: true,
									fontSize: 11,
									color: "#333",
									position: 'top',
								},
							
							},
				        },
						{
						    name: '留存值',
						    type: 'bar',
						    barWidth: '20%',
						    data: [30,20,100],//linedata,
							label: {
								normal: {
									show: true,
									fontSize: 11,
									color: "#333",
									position: 'top',
								},
							
							},
						}
				    ]
				};
				myChart.clear();
				myChart.setOption(option);
			},
			getdietstatTemplate(cal){ //仪表盘
				app.dietstatTemplate({}).then(res => {
					this.echartsdata = res.data;
					let gindex = parseFloat(this.echartsdata.needEnergy/this.echartsdata.dailyEnergy*25);
					this.greenindex = 0;
					let ghandler = setInterval(()=>{
						if(this.greenindex<gindex) ++this.greenindex;
						else clearInterval(ghandler);
					},50)
				});
			},
			beginTest() {
				uni.navigateTo({
					url: 'nutritional-self-test'
				});
			},
			clickFuction(index) {
				if (index == 0) {
					//基础信息
					uni.navigateTo({
						url: 'patient-basic-information?type='+2
					});
				} else if (index == 1) {
					//病例管理
					uni.navigateTo({
						url: 'patient-case-manage'
					});
				} else {
					//测评记录
					uni.navigateTo({
						url: 'evaluation-record'
					});
				}

			},
			showDetailMessage() {
				this.showDetail = !this.showDetail;
			},
			showComputing() {
				this.$refs.popup.open();
			},
			closdComputing() {
				this.$refs.popup.close();
			},
			showBMITips() {
				this.$refs.popupBMI.open();

			},
			closeBMITips() {
				this.$refs.popupBMI.close();
			},
			showEnergyTips() {
				this.$refs.popupEnergy.open();
			},
			closeEnergyTips() {
				this.$refs.popupEnergy.close();
			},
			judgeUserAuth(){
				app.judgeUserAuth({}).then(res =>{
					if(res.status ==1){
						if(res.data.userType == 2){
							//如果是医生，就跳过去医生的营养管理页面
							uni.redirectTo({
								url:'../doctor/doctor-nutrition-manage'
							});
						}else{
							if(res.data.perfect==true){
								this.getUserData();
							}else{
								uni.redirectTo({
									url:'patient-improve-msg?type=2'
								});
							}
							
						}
					}
				});
			},
			getUserData(){
				this.loadCount = 0;
				this.getData();
				this.getNearlyRecord();
				this.getLineChartData();
			},
			//用户信息数据
			getData() {
				app.patientNutrition({}).then(res => {
					if (res.status == 1) {
						this.infoData = res.data;
					}

				});
			},
			//最近一次测评的数据
			getNearlyRecord() {
				app.patientNearlyRecord({
					surveyId: 1
				}).then(res => {
					if (res.status == 1) {
						this.latelyData = res.data;
						if(this.latelyData.content) this.latelyData.content=this.latelyData.content.replace(/\<span/gi, '<span class="richtext"');
					}
				
				});
			},
			//拿曲线图的数据
			getLineChartData() {
				app.memberReplyRecordList({
					surveyId: 1,
					pageNo: 1,
					pageSize: 3
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
								this.lineData.series[0].name=item.phase
							})
							console.log(this.lineData);
							this.$nextTick(()=>{
								this.setlinebox();
							})
							// this.$refs['lineData'].showCharts();
						}
						this.hasLoadLindData = 1;
					}

				});
			},
			setlinebox() { //折线图
				var myChart = echarts.init(document.getElementById('echarts'));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '3%',
						right: '3%',
						bottom: '6%',
						top: '5%',
						containLabel: true,
					},
					xAxis: {
						type: 'category',
						axisLabel:{fontSize:10},
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
						name:"",
						axisLabel:{fontSize:10},
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
								show: true,
								distance: 0,
								fontSize: 11,
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
							color: "#59A29F", //设置线条颜色
							width:1,
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
										color: '#a8cd97'
									},
								}, {
									yAxis: '1'
								}],
								[{
									yAxis: '2',
									itemStyle: {
										color: '#ffd687'
									}
								}, {
									yAxis: '3'
								}],
								[{
									yAxis: '4',
									itemStyle: {
										color: '#ffc000'
									}
								}, {
									yAxis: '8'
								}],
								
							]
						},
					}]
				};
			
				// 使用刚指定的配置项和数据显示图表。
				myChart.clear();
				myChart.setOption(option);
			},
			toanswerlist(id){
				uni.navigateTo({
					url:"/pages/patient/answer?id="+id
				})
			},
		},
		onShow() {
			  if(app.getCache('uid')){
				  this.judgeUserAuth();
				  this.clickday(this.dayindex);
			  } 
		},


	}
</script>

<style lang="scss">
	.blocklistbox{
		font-size:26rpx;color:#555;margin-bottom: 10px;justify-content: center;
		.blockgreen{border-radius:4rpx;width:40rpx;height:20rpx;background:#DCF4E7;margin-right:12rpx;}
		.blockblue{border-radius:4rpx;width:40rpx;height:20rpx;background:#DAF2FF;margin:0 12rpx 0 50rpx;}
	}
	.blockbox{
		text-align:center;
		padding:60rpx 0;
		.blockbigbox{
			width:240rpx;height:204rpx;position:relative;margin:0 auto 26rpx;justify-content:center;
			.smfont{font-size:20rpx;color:#888;}
			.pabs0{position:absolute;left:40rpx;bottom:0rpx;}
			.pabs10{position:absolute;right:40rpx;bottom:0rpx;}
			.pabs20{position:absolute;left:82rpx;bottom:50rpx;color:#aaa;}
			.greenline{position:absolute;background:#eaeaea;width:26rpx;height:6rpx;
				&.green{background:#9be352;}
			}
			//左下
			.position1{transform: rotate(-32deg);left:12rpx;top:170rpx;}
			.position2{transform: rotate(-28deg);left:6rpx;top:154rpx;}
			.position3{transform: rotate(-20deg);left:0rpx;top:136rpx;}
			.position4{transform: rotate(-10deg);left:-4rpx;top:118rpx;}
			.position5{transform: rotate(-5deg);left:-4rpx;top:98rpx;}
			
			//右下
			.position25{transform: rotate(28deg);right:10rpx;top:172rpx;}
			.position24{transform: rotate(17deg);right:2rpx;top:156rpx;}
			.position23{transform: rotate(9deg);right:-2rpx;top:136rpx;}
			.position22{transform: rotate(-2deg);right:-2rpx;top:116rpx;}
			.position21{transform: rotate(-10deg);right:0rpx;top:96rpx;}
			
			//中
			.position13{transform: rotate(90deg);left:106rpx;top:4rpx;}
			
			//左中
			.position6{transform: rotate(12deg);left:-2rpx;top:80rpx;}
			.position7{transform: rotate(25deg);left:6rpx;top:60rpx;}
			.position8{transform: rotate(37deg);left:20rpx;top:44rpx;}
			.position9{transform: rotate(50deg);left:32rpx;top:30rpx;}
			.position10{transform: rotate(56deg);left:48rpx;top:18rpx;}
			.position11{transform: rotate(65deg);left:68rpx;top:10rpx;}
			.position12{transform: rotate(78deg);left:88rpx;top:6rpx;}
			
			//右中
			.position20{transform: rotate(-21deg);right:4rpx;top:78rpx;}
			.position19{transform: rotate(-29deg);right:14rpx;top:60rpx;}
			.position18{transform: rotate(-37deg);right:24rpx;top:46rpx;}
			.position17{transform: rotate(-47deg);right:36rpx;top:32rpx;}
			.position16{transform: rotate(-57deg);right:50rpx;top:22rpx;}
			.position15{transform: rotate(-65deg);right:68rpx;top:13rpx;}
			.position14{transform: rotate(-78deg);right:88rpx;top:6rpx;}
		}
	}
	.nodatabox{
		text-align:center;padding-bottom:80rpx;
		image{margin:80rpx 0 60rpx;width:308rpx;}
	}
	.choosedaybox {
		margin: 0 30rpx 50rpx;
		border: 1rpx solid #ddd;
		border-radius: 60rpx;
		flex-wrap: unset;
		font-size: 30rpx;
	
		.daylist {
			width: 33.3%;
			box-sizing: border-box;
			line-height: 1;padding:24rpx 0;
			text-align: center;
			border-radius: 60rpx;
			-webkit-box-flex: 1;
			-webkit-flex: 1 0 auto;
			flex: 1 0 auto;
	
			&.on {
				color: #fff;
				background: #FCA62B;
			}
		}
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
					font-size: 20px;
				}

				.msg {
					font-size: 14px;
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
						font-size: 26rpx;
					}
				}
			}
		}

		.health-msg-box {
			margin: 0 30rpx 30rpx;
			box-shadow: 1px 1px 5px #999999;
			&.other {
				padding: 30rpx;
				box-sizing: border-box;
			}

			.health-list-box {
				text-align: center;
				display: flex;
				justify-content: space-around;
				height: 214rpx;
				border-bottom: 1px #EEEEEE solid;
				padding-bottom: 0.4rem;

				.health-list-item {
					color: #333333;

					.top-title {
						margin-top: 40rpx;
						display: flex;align-items: center;
						font-size: 13px;
						justify-content: center;

						.askIcon {
							width: 24rpx;
							height: 24rpx;
						}
					}

					.health-detail {
						font-size: 13px;
					}

					.health-tips {
						font-size: 12px;
						color: #999999;
					}
				}
			}

			.tips-box {
				display: flex;

				.tips {
					color: #333333;
					font-size: 12px;
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
				font-size: 12px;
			}

		}

		.record-chart-box {
			margin-top: 40rpx;
			width: 650rpx;
			// height: 700rpx;
			margin-left: 50rpx;
			box-shadow: 1px 1px 5px #999999;
			color: #333333;
			text-align: center;

			.record-chart-title {
				padding-top: 49rpx;
				font-size: 15px;
			}

			.record-chart-subtitle {
				color: #59A29F;
				font-size: 12px;
				margin-top: 19rpx;
			}

		}

		.last-one {
			color: #333333;
			font-size: 15px;
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
						font-size: 30rpx;
						color: #52A29E;
					}

					.health-list-item-detail {
						color: #999999;
						font-size: 26rpx;
						margin-top: 20rpx;
					}

					.health-list-item-time {
						color: #666666;
						font-size: 26rpx;
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
						font-size: 22rpx!important;
						color: #666666;
						padding:20rpx 20rpx 0 0;
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
				font-size: 17px;
			}
		}

		.white-background {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-title {
				font-size: 14px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-subtitle {
				font-size: 15px;
				color: #333333;
				margin-top: 40rpx;
			}

			.white-background-line-space {
				background-color: #F6F6F6;
				height: 20rpx;
				margin-top: 60rpx;
			}

			.white-background-close {
				font-size: 15px;
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
				font-size: 14px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-BMI-des {
				font-size: 15px;
				color: #333333;
				margin-top: 40rpx;
				margin-left: 60rpx;
				margin-right: 60rpx;
				text-align: left;
			}

			.white-background-BMI-des2 {
				font-size: 15px;
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
				font-size: 15px;
				color: #666666;
			}
		}

		.white-background-energy {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-energy-title {
				font-size: 14px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-energy-desc-title {
				margin-left: 60rpx;
				margin-right: 60rpx;
				margin-top: 60rpx;
				text-align: left;
				color: #333333;
				font-size: 15px;
			}

			.white-background-energy-desc {
				margin-left: 60rpx;
				margin-right: 60rpx;
				margin-top: 20rpx;
				text-align: left;
				color: #333333;
				font-size: 15px;
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
				font-size: 15px;
				color: #666666;
			}
		}
	}

	.notice-box {
		padding: 30rpx 40rpx 28rpx;

		.notice-info {
			font-size: 26rpx;
			padding-bottom: 20rpx;

			.notice-text {
				font-size: 24rpx;
				color: #999;
				padding-top: 10rpx;
			}
		}

		.leftinfo {
			flex: 1;
			font-size: 24rpx;

			.infolist {
				padding-bottom: 10rpx;

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
			padding-right: 20rpx;

			.mintext {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	.echarts {
		width: 85vw;
		height: 85vw;
	}
	.centerwh{width:250rpx;display:inline-block;}
</style>
