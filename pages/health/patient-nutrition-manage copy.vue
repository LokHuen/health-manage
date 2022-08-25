<template>
	<view class="page">
	<!--滑动区-->
	  <scroll-view scroll-y style="height: 110vh;" bindscroll="fnScrollEvent" bindscrolltoupper="fnScrollToupper">
		  <view class="scroll-bg">
			<view class="box-container">
				<!--个人信息-->
			  <view class="self-info-box box">
				<image :src="infoData.portrait" mode="scaleToFill" class="avatar"></image>
				<!-- <image mode="aspectFill" class="avatar" src="../../static/img/doctor_center.png"></image> -->
				<view class="info-box">
					<text style="font-size: 32rpx;">{{infoData.patientName||"游客"}}</text>
					<view>
						<text style="font-size: 21rpx; margin-right: 26rpx;">{{ infoData.patientGender||"" }}</text>
						<text style="font-size: 21rpx; margin-right: 26rpx;">{{ (infoData.age || infoData.age!=0)?(infoData.age+'岁 '):'' }}岁</text>
						<text style="font-size: 21rpx;">{{ infoData.surveyResult||"" }}</text>
					</view>
					<text style="font-size: 21rpx;">最近一次评估健康值为&nbsp;{{ splitNumber }}</text>
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
				<view class="status-pic-box box">
					<view style="text-align: center; padding-top: 30rpx; font-size: 28rpx; font-weight: 700;">健康状况趋势图</view>
					<view id="main" ></view>
				</view>
			  <!--疾病管理-->
				  <!--管理导航-->
				  <view class="manage-box box">
				  	<view class="manage-item" v-for="(item, index) in manageNavList" :class="{'active':isActive == index}" @click="isActive=index">{{item}}</view>
				  </view>
				  <button class="diet-record-btn">记录饮食</button>
				  
			<view class="recommendation-box box">
				<text style="padding-top: 30rpx;text-align: center;">均衡饮食建议</text>
				<view class="record">
					<view class="record-item" style="border: 2rpx solid #FEC148;">
						<view style="margin-bottom: 2rpx;">
							<image src="../../static/doctor/weight.png" style="width: 60rpx; height: 60rpx;" mode="aspectFit"></image>
						</view>
						<text  style="margin-bottom: 9rpx;">体重</text>
						<view class="info-data">
							<text class="data" style="color: #FEC148;">{{infoData.weight}}</text>
							<text class="data">kg</text>
						</view>
					</view>
					<view class="record-item" style="border: 2rpx solid #57C1BB;">
						<view style="margin-bottom: 2rpx;">
							<image src="../../static/doctor/height.png" style="width: 60rpx; height: 60rpx;" mode="aspectFit"></image>
						</view>
						<text style="margin-bottom: 9rpx;">身高</text>
						<view class="info-fata">
							<text class="data" style="color: #57C1BB;">{{infoData.height}}</text>
							<text class="data">cm</text>
						</view>
					</view>
					<view class="record-item" style="border: 2rpx solid #859CF7;">
						<view style="margin-bottom: 2rpx;">
							<image src="../../static/doctor/bmi.png" style="width: 60rpx; height: 60rpx;" mode="aspectFit"></image>
						</view>
						<text  style="margin-bottom: 9rpx;">BMI</text>
						<text class="data" style="color: #859CF7;">{{infoData.bmi}}</text>
					</view>
				</view>
				<view class="suggestion">
					<view style="margin-bottom: 20rpx;font-weight: 700;">经典均衡饮食</view>
					<view style="margin-bottom: 30rpx;font-size: 24rpx;color: #666666">根据恶性肿瘤患者膳食营养处方专家共识推荐摄入食物标准</view>
					<view class="sug">
						<view class="left">
							<view class="left-item">
								<view class="dot" style="background: #FEC148;"></view>
								<view class="text">脂肪60g</view>
							</view>
							<view class="left-item">
								<view class="dot" style="background: #4CBDB6;"></view>
								<view class="text">蛋白质90g</view>
							</view>
							<view class="left-item">
								<view class="dot" style="background: #FA94C0;"></view>
								<view class="text">碳水化合物225g</view>
							</view>
						</view>
						<view class="middle-line"></view>
						<view class="right">
							<view style="display: flex;align-items: flex-end;margin-bottom: 20rpx;">
								<view style="font-size: 40rpx;">{{infoData.dailyEnergy}}</view>
								<view class="">kcal</view>
							</view>
							<view class="">每日总能量</view>
						</view>
					</view>
				</view>
			</view>
			<view class="diet-record">
				<view class="record-title">患者饮食记录</view>
				<view class="manage-box box">
					<view class="manage-item" v-for="(item, index) in dietNavList" :class="{'active':isActive1 == index}" @click="isActive1=index">{{item}}</view>
				</view>
				<view class="echarts-box box">
					<!-- <view class="echarts-box"> -->
						<view id="round-chart"></view>
						<view class="" style="display: flex;justify-content: space-between;margin: 0 auto; width: 144rpx; font-size: 20rpx;color: #4CBDB6;">
							<view class="" >0</view>
							<view class="">3000</view>
						</view>
					<!-- </view> -->
					<!-- <view class="echarts-box"> -->
						<view id="nutrition"></view>
					<!-- </view> -->
				</view>
			</view>
			<view class="nutri-inter box">
				<text style="font-size: 28rpx;  text-align: center;">营养干预情况</text>
				<view class="inter-box" v-for="item in interList">
					<view class="inter-time">{{item.time|formatDate()}}</view>
					<view class="inter-title">{{item.title}}</view>
					<view class="inter-desc">{{item.desc}}</view>
				</view>
			</view>
			  <!--饮食注意事项-->
			<view class="tips-box box">
				<text style="font-size: 28rpx;  text-align: center;padding:20rpx;margin-bottom: 20rpx;">饮食注意事项</text>
				<text class="tips"  v-for="item in tipsList">&nbsp;{{ item }}</text>
			</view>
			<button class="assessment-btn" type="default">健康状态评估</button>
			</view>
		  </view>

	  </scroll-view>
	</view>
</template>

<script>
	const app = getApp();
	import * as echarts from '@/plugins/echarts.js';
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	// import echarts from '@/plugins/echarts.js';
	

	
	export default {
		data() {
			return {
				interList: [
					{
						time: new Date(),
						title: '益爱宁-21天装',
						desc: '科学配方，黄金配比，内容含28种优势核心成分、全面符合最新指南的ONS产品，温水冲泡，简单易操作，颗粒制剂，易副好吸收，每日2袋，1大盒42袋/疗程，快速修复肠道，全面补充营养。',
					},
					{
						time: new Date(),
						title: '益爱宁-21天装',
						desc: '科学配方，黄金配比，内容含28种优势核心成分、全面符合最新指南的ONS产品，温水冲泡，简单易操作，颗粒制剂，易副好吸收，每日2袋，1大盒42袋/疗程，快速修复肠道，全面补充营养。',
					},
				],
				calories: 50,
				test: 2,
				color: '#4CBDB6',
				dietNavList: [
					'今日', '近七天', '近30天',
				],
				manageNavList: [
					'疾病管理', '营养管理', '运动管理', '情绪管理',
				],
				isActive: 0,
				isActive1: 0,
				tipsList:[
					'平时多吃具有降压、降脂作用的食物，如芹菜、番茄、黄瓜、木耳、海带、香蕉、山 楂、洋葱等;',
					'您平时食量较大，但吃过多食物会对肠胃造成负担，损害身体，在日后应尽量注意做到吃饭8分饱;',
					'您平时口味偏重，且存在口臭症状(提示胃肠道损)，在日后做饭时，应注意减少各类'
				],
				BloodSugarValue: '1',
				BloodPresureValue: '1',
				latelyData: {},
				infoData: {},
				list: [
					["/static/icon/baseInfoicon.png", "基础信息"],
					["/static/icon/bingliMangmenticon.png", "病例管理"],
					["/static/icon/testRecordIcon.png", "测评记录"],
					["/static/icon/food.png", "饮食配餐"]
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
				daytab: ["今日", "近7天", "近30天"],
				dayindex: 0,
				greenindex: 20,
				enptylist: ["总能量", "脂肪", "蛋白质", "碳水化合物"],
				enptyindex: 0,
				tlinedata: {},
				testtype: '',
				surveyId:'',
				patientScreenItems:[],
				sgaType:'',//用于区分曲线图  测评所属问卷类型 =1，PG-SGA；=2，SGA	
		
			}
		},
		mounted() {
			var chartDom2 = document.getElementById('round-chart');
			var chartDom = document.getElementById('main');
			var myChart = echarts.init(chartDom);
			var myChart2 = echarts.init(chartDom2);
			var option, option2;
			option2 = {
				
				  series: [
					  {
					  center: ['50%', '70%'],
					  name: '摄入量',
					  type: 'gauge',
					  radius: "130%",//表盘大小
					  //进度条
					 progress: {
						 show: false,
						 width: 1000,
						 roundCap: false,
						 itemStyle: {
						     color: '#ffffff',
						 },
					  },
					   axisLine: {
						   lineStyle: {
							   show: false,
						       width: 20,
						       // 透明度设置为0
						       opacity: 0
						   }
					  },
					  //刻度数值显示
					  axisLabel: {
						  show: false
					  },
					  // 刻度条样式
					  splitNumber: 5,
					  axisTick: {
						  length: '12rpx',
						  lineStyle: {
							  width:2,
							  color: this.color
						  }
					  },
					// 整数刻度样式
					  splitLine: {
						  show: false
					  },
					  //表针显示
					  pointer: {
						  show: false,
						  length: '80%',
						  // width: fontChart(8),
						  // offsetCenter: [0, '-55%'],
						  itemStyle:{
						    color:"#207ade",
						    // opacity: 0.7
						  	},
					  },
					  // startAngle: fontChart(225), //开始角度
					  // endAngle: -20, //结束角度
					   // axisLine: {
					   //              // 控制表格展开范围
					   //              show: false,
					   //              lineStyle: {
					   //                width: fontChart(5),
					   //                opacity: 0,
					   //              },
					   //            },
					  min: 0,
					  max: 3000,
					  detail: {
						valueAnimation: true,
						formatter: '{value}'
					  },

					  data: [
						{
						  value: this.infoData.dietCalories||0,
						  // offset: [0, 1000],
						  name: '总能量已摄入',
						  title: {
							  offsetCenter: [0, '10rpx'],
							  fontSize: 12
						  },
						  detail: {
							  position: 'top',
						  	  offsetCenter: [0, '-10rpx'],
							  fontSize: 14,
							  fontWeight:700
							  
						  },
						  itemStyle:{
							  color:'#4CBDB6',
							  }
						}
					  ],
					},
					           
				  ]
				};
			myChart2.clear();	
			myChart.clear();
			option2 && myChart2.setOption(option2);
			
			option = {
				
			  xAxis: {
					  axisTick: {
						    inside: true,
							length: 5,
							lineStyle: {
							  type: 'solid',
							  // ...
							}
						  },
				      axisLine: {
				        lineStyle: {
				          type: 'solid',
							
				          // ...
				        }
				      },
			    type: 'category',
			    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			  },
			    grid: {
			           left:'3%',
			            top:'20%',
			            right: '10%',
			            bottom: '3%',
			            containLabel: true
			          },
			  yAxis: {
				  
				  // padding:[10,10,10,10],
				  type: 'value',
				  name: '营养分值',
				  min: 0,
				  max: 20,
				  position: 'left',
			      axisLabel: {
			      formatter: '{value}',
			      align: 'center'
				      // ...
				    },
			  },
			       
			  series: [
			    {
			      data: [2, 7, 3, 10, 15, 1, 6],
			      type: 'line',
				  markArea: {
				    
				    data: [
				      [
				        {
				          name: '健康状态优',
				          yAxis: 0,
						  itemStyle: {
						    color: '#6B9CA0'
						  },
						  label:{
						    show: true,
						    // position: "bottom", // markArea中文字（name）位置
						    offset: [0, 28], // markArea中文字（name）显示在位置基础上x、y轴偏移
						                      }
				        },
				        {
				          yAxis: 5
				        }
				      ],
				      [
				        {
				          name: '健康状态良',
				          yAxis: 5,
						  itemStyle: {
						    color: '#FEC148'
						  },
						  label:{
						      show: true,
						      // position: "bottom", // markArea中文字（name）位置
						      offset: [0, 28], // markArea中文字（name）显示在位置基础上x、y轴偏移
						   }
				        },
				        {
				          yAxis: 10
				        }
				      ],
					  [
					    {
					      name: '健康状态一般',
					      yAxis: 10,
						  itemStyle: {
						    color: '#FECFD1'
						  },
						  label:{
						      show: true,
						      // position: "bottom", // markArea中文字（name）位置
						      offset: [0, 28], // markArea中文字（name）显示在位置基础上x、y轴偏移
						                        }
					    },
					    {
					      yAxis: 15
					    }
					  ],
					  [
					    {
					      name: '健康状态差',
					      yAxis: 15,
						  itemStyle: {
						    color: '#FF8085'
						  },
						  label:{
						      show: true,
						      // position: "bottom", // markArea中文字（name）位置
						      offset: [0, 28], // markArea中文字（name）显示在位置基础上x、y轴偏移
						                        }
					    },
					    {
					      yAxis: 20
					    }
					  ],
				    ]
				  },
			    }
			  ]
			};
			myChart.clear();
			option && myChart.setOption(option);
			
			var chartDom3 = document.getElementById('nutrition');
			var myChart3 = echarts.init(chartDom3);
			var option3;
			
			option3 = {
				grid: {
				       left:'3%',
				        top:'20%',
				        right: '10%',
				        bottom: '10%',
				        containLabel: true
				      },
			  title: {
				  //图表标题
			    text: '',
			    // subtext: 'Fake Data'
			  },
			  tooltip: {
			    trigger: 'axis'
			  },
			  // legend: {
			  //   data: ['Rainfall', 'Evaporation']
			  // },
			  
			  //小图标
			  // toolbox: {
			  //   show: true,
			  //   feature: {
			  //     dataView: { show: true, readOnly: false },
			  //     magicType: { show: true, type: ['line', 'bar'] },
			  //     restore: { show: true },
			  //     saveAsImage: { show: true }
			  //   }
			  // },
			  calculable: true,
			  xAxis: [
			    {
			      type: 'category',
			      // prettier-ignore
			      data: ['蛋白质', '脂肪', '碳水化合物'],
			    }
			  ],
			  yAxis: [
			    {
			      type: 'value',
				  show: false
			    }
			  ],
			  series: [
			    {
				  barWidth: '20%',
				  label: {
				    normal: {
				      show: true,//开启显示
				      position: 'top',//柱形上方
				      textStyle: { //数值样式
				        color: '#666666',
				  						fontSize: 10,
				  						
				      }
				    }
				  },
					itemStyle: {
						color: '#DCDCDC',
						width: 20,
					},  
			      name: 'Rainfall',
			      type: 'bar',
			      data: [60, 60, 160],
			      // markPoint: {
			      //   data: [
			      //     { type: 'max', name: 'Max' },
			      //     { type: 'min', name: 'Min' }
			      //   ]
			      // },
			      // markLine: {
			      //   data: [{ type: 'average', name: 'Avg' }]
			      // }
			    },
			    {
					barWidth: '20%',
					itemStyle: {
						color: '#4CBDB6',
					},  
					label: {
					  normal: {
					    show: true,//开启显示
					    position: 'top',//柱形上方
					    textStyle: { //数值样式
					      color: '#4CBDB6',
											fontSize: 10,
					    }
					  }
					},
						
			      name: 'Evaporation',
			      type: 'bar',
			      data: [30, 30, 130],
			      // markPoint: {
			      //   data: [
			      //     { name: 'Max', value: 200, xAxis: 7, yAxis: 183 },
			      //     { name: 'Min', value: 2.3, xAxis: 11, yAxis: 200 }
			      //   ]
			      // },
			      // markLine: {
			      //   data: [{ type: 'average', name: 'Avg' }]
			      // }
			    }
			  ]
			};
			
			option3 && myChart3.setOption(option3);
			
			this.color = this.calories == undefined&&''||this.calories <= 999 ? '#FF8085': this.color;
			this.color = this.calories > 999 == ''&&this.calories <= 1999 ? '#FEC148': this.color;
			this.color = this.calories > 1999 == ''&&this.calories <= 3000 ? '#4CBDB6': this.color;
			console.log(this.calories);
			console.log(this.color);
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
			clickenpty(index) {
				this.enptyindex = index;
				this.$nextTick(() => {
					this.settwolinebox();
				})
			},
			clickday(index) {
				this.dayindex = index;
				switch (index) {
					case 0:
						this.getData();
						break;
					case 1:
						this.gettwolinedata(() => {
							this.$nextTick(() => {
								this.settwolinebox();
								this.settwolinebox1();
							})
						})
						break;
					case 2:
						this.gettwolinedata(() => {
							this.$nextTick(() => {
								this.settwolinebox();
								this.settwolinebox1();
							})
						})
						break;
				}
			},
			gettwolinedata(cal) { //近7天数据
				app.statTemplate({
					type: this.dayindex
				}).then(res => {
					// if(res.data.dietList) res.data.dietList.reverse();
					// if(res.data.exerciseList) res.data.exerciseList.reverse();
					this.tlinedata = res.data;
					cal();
				});
			},
			settwolinebox() { //近7天图1
				let list = this.tlinedata.dietList;
				let xdata = [],
					linedata = [];
				if (list.length == 0) return;
				for (var i = 0; i < list.length; i++) {
					let date = list[i].cDate.split("-");
					xdata.push(date[1] + "/" + date[2]);
					let onedata = "";
					switch (parseInt(this.enptyindex)) {
						case 0:
							onedata = list[i].sum;
							break;
						case 1:
							onedata = list[i].fat;
							break;
						case 2:
							onedata = list[i].protein;
							break;
						case 3:
							onedata = list[i].carbohydrate;
							break;
					}
					linedata.push(onedata);
				}
				let mindata = Math.min(...linedata);
				// let maxdata = Math.max(...linedata);
				var myChart = echarts.init(document.getElementById('line71echarts'));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '3%',
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
						data: xdata
					},
					yAxis: {
						show: true,
						name: this.enptyindex == 0 ? "千卡 " : "g ",
						// nameLocation:"start",
						nameGap: 10,
						nameTextStyle: {
							fontSize: 10,
							color: "#666",
							align: "right"
						},
						axisLabel: {
							fontSize: 10,
						},
						axisLine: {
							// show: true
						},
						// min: mindata>3.5?3.5:mindata,
						// max: maxdata>11?maxdata:11,
						axisTick: {
							// show: true
						},
						type: 'value',
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed"
							}
						},
						scale: true,

					},
					series: [{
						name: this.enptylist[this.enptyindex],
						type: 'line',
						symbolSize: 7,
						label: {
							normal: {
								show: true,
								distance: 0,
								fontSize: 11,
								color: "#333",
								formatter: (opt) => { //设置拐点文字颜色
									// if (opt.value > 11.1||opt.value<3.9) return '{a|' + opt.value + '}';
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
								// if (opt.value > 11.1||opt.value<3.9) return "red";
								// else 
								return "#59A29F";
							},
						},
						symbol: "circle",
						data: linedata,
						markArea: { //标记区域
							// data: [
							// 	[{
							// 		yAxis: '3.9', //y轴坐标控制
							// 		itemStyle: {
							// 			color: '#DCF4E7'
							// 		},
							// 	}, {
							// 		yAxis: '6.1'
							// 	}],
							// 	[{
							// 		yAxis: '6.1',
							// 		itemStyle: {
							// 			color: '#DAF2FF'
							// 		}
							// 	}, {
							// 		yAxis: '11.1'
							// 	}]
							// ]
						},
					}]
				};

				// 使用刚指定的配置项和数据显示图表。
				
				myChart.clear();
				myChart.setOption(option);
			},
			settwolinebox1() { //近7天图2
				let list = this.tlinedata.exerciseList;
				let xdata = [],
					linedata = [];
				if (list.length == 0) return;
				for (var i = 0; i < list.length; i++) {
					let date = list[i].cDate.split("-");
					xdata.push(date[1] + "/" + date[2]);
					linedata.push(list[i].sum);
				}
				let mindata = Math.min(...linedata);
				// let maxdata = Math.max(...linedata);
				var myChart = echarts.init(document.getElementById('line72echarts'));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '3%',
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
						data: xdata
					},
					yAxis: {
						show: true,
						name: "千卡 ",
						// nameLocation:"start",
						nameGap: 10,
						nameTextStyle: {
							fontSize: 10,
							color: "#666",
							align: "right"
						},
						axisLabel: {
							fontSize: 10,
						},
						axisLine: {
							// show: true
						},
						// min: mindata>3.5?3.5:mindata,
						// max: maxdata>11?maxdata:11,
						axisTick: {
							show: false
						},
						type: 'value',
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed"
							}
						},
						scale: true,

					},
					series: [{
						name: '能量',
						type: 'line',
						symbolSize: 7,
						label: {
							normal: {
								show: true,
								distance: 0,
								fontSize: 11,
								color: "#333",
								formatter: (opt) => { //设置拐点文字颜色
									// if (opt.value > 11.1||opt.value<3.9) return '{a|' + opt.value + '}';
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
								// if (opt.value > 11.1||opt.value<3.9) return "red";
								// else 
								return "#59A29F";
							},
						},
						symbol: "circle",
						data: linedata,
						markArea: { //标记区域
							// data: [
							// 	[{
							// 		yAxis: '3.9', //y轴坐标控制
							// 		itemStyle: {
							// 			color: '#DCF4E7'
							// 		},
							// 	}, {
							// 		yAxis: '6.1'
							// 	}],
							// 	[{
							// 		yAxis: '6.1',
							// 		itemStyle: {
							// 			color: '#DAF2FF'
							// 		}
							// 	}, {
							// 		yAxis: '11.1'
							// 	}]
							// ]
						},
					}]
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart.clear();
				myChart.setOption(option);
			},
			settiaoxingbox() { //柱状图

				var myChart = echarts.init(document.getElementById('threeecharts'));
				var option = {
					color: ['#dddddd', '#52A29E'],
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						top: "5%",
						left: '-5%',
						right: '3%',
						bottom: '5%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						axisLabel: {
							fontSize: 10
						},
						data: ["碳水化合物", "脂肪", "蛋白质"], //xdata,
						axisTick: {
							show: false,
							alignWithLabel: true
						}

					}],
					yAxis: [{
						show: false,
						type: 'value',
						axisLabel: {
							fontSize: 10
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						},
					}],
					series: [{
							name: '建议摄入值',
							type: 'bar',
							barWidth: '20%',
							data: [this.infoData.dailyCarbonHydrate, this.infoData.dailyFat, this.infoData.dailyProtein], //linedata,
							label: {
								normal: {
									show: true,
									fontSize: 10,
									color: "#333",
									position: 'top',
									formatter: (opt) => {
										return opt.value + "g";
									}
								},

							},
						},
						{
							name: '留存值',
							type: 'bar',
							barWidth: '20%',
							data: [this.infoData.carbohydrate, this.infoData.fat, this.infoData.protein], //linedata,
							barGap: "40%",
							label: {
								normal: {
									show: true,
									distance: 3,
									fontSize: 10,
									color: "#52A29E",
									position: 'top',
									formatter: (opt) => {
										if (opt.value == 1.01) return "";
										return opt.value + "g";
									}
								},
							},
						}
					]
				};
				myChart.clear();
				myChart.setOption(option);
			},
			cancel(){
				this.$refs.popup1.close();
			},
			beginTest() {
				if(this.infoData.surveyName == '营养风险筛查或评估'){
					this.$refs.popup1.open();
				}else{
					uni.navigateTo({
						url: 'nutritional-self-test?id='+this.surveyId
					});
				}
				
			},
			beginTest1(item){
					if(item.id<4){
						uni.navigateTo({
							url: 'nutritional-self-test?id='+item.id
						});
					}else{
						uni.navigateTo({
							url:'/pages/doctor/select/index?id='+item.id+'&name='+item.name
						})
					}
					this.$refs.popup1.close();
			},
			
			clickFuction(index) {
				if (index == 0) {
					//基础信息
					uni.navigateTo({
						url: 'patient-basic-information?type=' + 2
					});
				} else if (index == 1) {
					//病例管理
					uni.navigateTo({
						url: 'patient-case-manage'
					});
				} else if (index == 2) {
					//测评记录
					uni.navigateTo({
						url: 'evaluation-record'
					});
				} else {
					uni.navigateTo({
						url: '/pages/diet/diet-catering'
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
			getPatientScreen(){
				app.getPatientScreen().then(res =>{
					if(res.status == 1){
						this.patientScreenItems = res.data;
					}
				});
			},
			getSgaType(){
			    app.getSgaType().then(res =>{
					if(res.status == 1){
						this.testtype = res.data.surveyId;
						this.surveyId = res.data.surveyId;
						this.getNearlyRecord();
						this.getLineChartData1();
					}
				});	
			},
			judgeUserAuth() {
				app.judgeUserAuth({}).then(res => {
					if (res.status == 1) {
						if (res.data.userType == 2) {
							//如果是医生，就跳过去医生的营养管理页面
							uni.redirectTo({
								url: '../doctor/nutrition-manage'
							});
						} else {
							if (res.data.perfect == true) {
								this.getUserData();
							} else {
								uni.redirectTo({
									url: 'patient-improve-msg?type=2&formQrCode=1'
								});
							}

						}
					}
				});
			},
			getUserData() {
				this.loadCount = 0;
				this.getData();
				this.getSgaType();
				
			},
			
			//用户信息数据
			getData() {
				app.patientNutrition({}).then(res => {
					if (res.status == 1) {
						this.infoData = res.data;
					}
					
					if(this.infoData.surveyName == '营养风险筛查或评估'){
						this.getPatientScreen();
					}
					this.infoData.protein = this.infoData.protein > 0 ? this.infoData.protein : 1.01;
					this.infoData.fat = this.infoData.fat > 0 ? this.infoData.fat : 1.01;
					this.infoData.carbohydrate = this.infoData.carbohydrate > 0 ? this.infoData.carbohydrate : 1.01;
					this.$nextTick(() => {
						this.settiaoxingbox();
					})
					let gindex = parseFloat(this.infoData.dietCalories / this.infoData.dailyEnergy * 25);
					this.greenindex = 0;
					let ghandler = setInterval(() => {
						if (this.greenindex < gindex) ++this.greenindex;
						else clearInterval(ghandler);
					}, 50)
				});
			},
			//最近一次测评的数据
			getNearlyRecord() {
				app.patientNearlyRecord().then(res => {
					if (res.status == 1) {
						this.latelyData = res.data;
						if (this.latelyData.content) this.latelyData.content = this.latelyData.content.replace(/\<span/gi,
							'<span class="richtext"');
					}

				});
			},
			//拿曲线图的数据 new4.0
			getLineChartData1(){
				app.getPgSgaRada({
					pageNo: 1,
					userId:localStorage.getItem("uid")
				}).then(res => {
					if (res.status == 1) {
						this.lineData.categories = [];
						this.lineData.series[0].data = [];
						let tempArray = []
						if (res.data && res.data.length > 0) {
							this.sgaType = res.data[0].surveyId;
							res.data.reverse()
							res.data.forEach((item, index) => {
								var time = item.completeTime.split('/');
								var date = time[2].split(' ');
								this.lineData.categories.push(time[1] + '月' + date[0] + '日');
								//this.lineData.categories.push(item.phase);
								this.lineData.series[0].data.push(item.total)
								this.lineData.series[0].name = item.phase
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
			
			//拿曲线图的数据
			getLineChartData() {
				app.memberReplyRecordList({
					surveyId: this.surveyId,
					pageNo: 1,
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
							})
							console.log(this.lineData);

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
				var myChart = echarts.init(document.getElementById('echarts'));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '0%',
						right: '3%',
						bottom: '6%',
						top: '8%',
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
						data: this.lineData.categories,
					},
					yAxis: {
						show: false,
						name: "",
						axisLabel: {
							fontSize: 10
						},
						axisLine: {
							show: false
						},
						min: this.sgaType==1?0:0.5,
						max: this.sgaType==1?36:3.5,
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
								show: this.sgaType==1?true:false,
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
							color: "#333", //设置线条颜色
							width: 1,
						},
						itemStyle: {
							color: (opt) => { //设置拐点颜色
								if (opt.value > 9) return "red";
								else return "#333";
							},
						},
						symbol: "circle",
						data: this.lineData.series[0].data,
						markArea: { //标记区域
							data: [
								[{
									yAxis: '0', //y轴坐标控制
									itemStyle: {
										color: '#52a29e'
									},
								}, {
									yAxis: '1'
								}],
								[{
									yAxis: '1',
									itemStyle: {
										color: '#ffcf76'
									}
								}, {
									yAxis: '3'
								}],
								[{
									yAxis: '3',
									itemStyle: {
										color: '#ffe1e1'
									}
								}, {
									yAxis: '9'
								}],
								[{
									yAxis: '9',
									itemStyle: {
										color: '#b7c8e3'
									}
								}, {
									yAxis: '36'
								}],
							]
						},
					}]
				};
               
				if (this.sgaType == 2) {
					option.series[0].markArea.data = [
						[{
							yAxis: '0.5', //y轴坐标控制
							itemStyle: {
								color: '#52a29e'
							},
						}, {
							yAxis: '1.5'
						}],
						[{
							yAxis: '1.5',
							itemStyle: {
								color: '#ffcf76'
							}
						}, {
							yAxis: '2.5'
						}],
						[{
							yAxis: '2.5',
							itemStyle: {
								color: '#ffe1e1'
							}
						}, {
							yAxis: '3.5'
						}],
					]
				}

				// 使用刚指定的配置项和数据显示图表。
				myChart.clear();
				myChart.setOption(option);
			},
			toanswerlist(id) {
				uni.navigateTo({
					url: "/pages/patient/answer?id=" + id+'&surveyId='+this.latelyData.surveyId
				})
			},
			tootherpage(src) {
				uni.navigateTo({
					url: src
				})
			},
			towarnpage(){
				uni.navigateTo({
					url:"/pages/doctor/warn"
				})
			},
			toanswerlist(){
				uni.navigateTo({
					url:"/pages/patient/answer?id="+this.latelyData.id+'&surveyId='+this.latelyData.surveyId
				})
			},
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

			  onShow() {
			  	if (app.getCache('uid')) {
			  		this.judgeUserAuth();
			  	}
			  },
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
		overflow: hidden;
		
		.active {
			background: #57C1BB;
			color: #fff;
		}
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
	.scroll-bg{
	  width: 100vw;
	  height: 100vh;
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
	  // height: 1;
	  box-sizing: border-box;
	  padding: 30rpx 30rpx 50rpx 30rpx;
	
	  .nutri-inter {
		  display: flex;
		  flex-direction: column;
		  padding: 30rpx;
		  
		  .inter-box {
			  display: flex;
			  flex-direction: column;
			  border-bottom: 1rpx solid #EBECF2;
			  padding: 30rpx 0;
			  
			  .inter-time {
				  font-size: 24rpx;
				  color: #666666;
				  margin-bottom: 20rpx;
			  }
			  .inter-title {
				  font-size: 28rpx;
				  color: #333333;
				  font-weight: 700;
				  margin-bottom: 20rpx;
			  }
			  .inter-desc {
				  font-size: 24rpx;
				  color: #666666
			  }
		  }
		  .inter-box:last-child {
			  border: none;
		  }
	  }
	 
	  .diet-record {
		  text-align: center;
		  font-weight: 700;
		  font-size: 28rpx;
		  display: flex;
		  flex-direction: column;
		  
		  .echarts-box {
			  width: 100%;
			  display: flex;
			  flex-direction: column;
			  
			  #round-chart {
				margin-top: -200rpx;
			  	width: 100%;
			  	height: 300rpx;
			  	margin-top: -20rpx;
			  }
			  #nutrition {
			  	width: 100%;
			  	height: 350rpx;
			  	margin-top: -20rpx;  
			  }
			  .record-title {
			  	padding-bottom: 30rpx;
			  }
		  }
		 
		  
	  }
	  .recommendation-box {
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  font-size: 28rpx;
		  
		  .suggestion {
			  padding: 0 30rpx;
		  	  display: flex;
		  	  flex-direction: column;
		  	  text-align: left;
		  				  
		  	  .sug {
		  		  display: flex;
				  align-items: center;
		  				  
				.left {
					flex: 1;
		  			  display: flex;
		  			  flex-direction: column;
		  					  
		  			  .left-item {
		  				  display: flex;
		  				  flex-direction: row;
						  align-items: center;
						  margin-bottom: 30rpx;
		  						  
		  				  .dot {
							  margin-right: 11rpx;
		  					  display: inline-block;
		  					  width: 22rpx;
		  					  height: 22rpx;
							  border-radius: 11rpx;
		  					  }
							  .text {
								  font-size: 28rpx;
								  font-weight: 700;
							  }
		  				  }
		  			  }
				.middle-line {
					width: 1rpx;
					height: 130rpx;
					background: #EBECF2;
				}
				.right {
					text-align: left;
					color: #666666;
					flex: 1;
					justify-content: center;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
		  	 }
		  }
		  .record {
			  text-align: center;
			  display: flex;
			  
			  .record-item {
				  font-size: 26rpx;
				  color: #666666;
				  padding: 20rpx 0 7rpx 0;
				  margin:30rpx;
				  border-radius: 10rpx;
				  flex: 1;
				  display: flex;
				  flex-direction: column;
				  justify-content: center;
				  .data {
					  font-weight: 700;
				  }
				  .info-data {
					  justify-content: center;
					  display: flex;
				  }
			  }
		  }
	  }
	  .diet-record-btn {
		  width: 100%;
		  height: 80rpx;
		  background: #57C1BB;
		  box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.0700);
		  opacity: 1;
		  border-radius: 20rpx;
		  color: #fff;
		  margin-bottom: 30rpx;
		  line-height: 80rpx;
	  }
	  .status-pic-box {
		  flex-direction: column;
		  #main {
		  	width: 100%;
		  	height: 500rpx;
			margin-top: -20rpx;
		  }
	  }
	  .assessment-btn {
		  height: 90rpx;
		  background: #57C1BB;
		  box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.0700);
		  opacity: 1;
		  border-radius: 45rpx;
		  color: #fff;
		  font-size: 28rpx;
		  line-height: 90rpx;
	  }
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
			padding: 5rpx 0;
			color: #666666;
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
