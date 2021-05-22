<template>
	<view class="">
	<view>
		<view class="white-background-pop1">
			<view>
				<input type="text" v-model="email" placeholder="请填写您的邮箱地址" class="emailinput">
				<view class="inputinfo">将给你发送PDF文件，便于查阅或打印</view>
			</view>
			<view class="sendemail" @click="sendemail">确定</view>
		</view>
	</view>
	<!-- <img v-if="imgUrl" :src="imgUrl" alt="" style="width:100%;height:auto;"> -->
	<!-- <img v-if="imgUrl1" :src="imgUrl1" alt="" style="width:100%;height:auto;"> -->
	<view v-show="showimgbox" style="width:1460px;">
		
		<div id="imgcreatebox">
		<div class="container1 flex" style="">
			<div class="left flex">
				<div class="flex cursor" @click="toindex">
					<img style="width: 33px; height: 33px;" :src="require('../../static/logo/logo1.png')" fit="fit">
					</img>
					<div class="flexc" style="margin-left: 0.38rem; color: #0F351B;border-right: 0.06rem solid #31746B;padding-right: 0.6rem;">
						<span style="font-size: 30px;font-weight: bold;">中国健康促进基金会</span>
						<span style="margin-top: 0.32rem;font-size: 15.12px;font-weight: bold;">肿瘤精准个体化防治公益项目</span>
					</div>

					<div class="flexc" style="padding-left: 0.6rem; color: #0F351B;">
						<span style="font-size: 25px;font-weight: bold;">肿瘤营养科普行动</span>
						<span style="margin-top: 0.32rem;font-size: 1.6rem;font-weight: bold;"></span>
					</div>

					<img style="width: 33px; height: 33px;margin-left: 2.81rem;" :src="require('../../static/logo/logo2.png')"
					 fit="fit"></img>
					<div class="flexc" style="margin-left: 0.38rem; color: #167146;">
						<span style="font-size: 30px;font-weight: bold;">肿瘤营养管理与干预</span>
						<span style="margin-top: 0.32rem;font-size: 15.12px;font-weight: bold;">Cancer Nutrition Management and
							Intervention</span>
					</div>
				</div>
			</div>
			<div class="headright flex">
				PG-SGA 营养状况反馈表
			</div>
		</div>
		<div class="pagebox">
			<div class="userinfo flex">
				<span class="infoitem">姓名：{{userData.patientName}}</span><span class="infoitem">性别：{{userData.patientGender||"无"}}</span><span
				 class="infoitem">年龄：{{userData.age?userData.age+'岁':"暂无"}}</span><span class="infoitem">疾病诊断：{{userData.illness||"无"}}</span><span
				 class="infoitem">联系方式：{{userData.phone||"无"}}</span>
			</div>
			<div class="neartest">
				<div class="flex nearitem">
					<span style="font-size: 65rpx;">{{userData.result}}</span><span class="nearright">{{userData.createTime}} 最近一次测评</span>
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
			</div>
			<div class="chartbox">
				<div class="charttitle">PG-SGA营养状况评估记录分值</div>
				<div class="flex">
					<div class="chartleft">
						<div id="echarts" class="echartsleft" ref="echartsline"></div>

						<view style="font-size:36rpx;padding:0 0 30rpx 160rpx;text-align:left;">
							<view class="flex">
								<view class="flexc" style="width: 400rpx;margin-right: 100rpx;">
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
		<div style="height:60rpx;"></div>
		</div>
		<view id="imgtablebox">
			<div class="container1 flex" style="">
				<div class="left flex">
					<div class="flex cursor" @click="toindex">
						<img style="width: 33px; height: 33px;" :src="require('../../static/logo/logo1.png')" fit="fit">
						</img>
						<div class="flexc" style="margin-left: 0.38rem; color: #0F351B;border-right: 0.06rem solid #31746B;padding-right: 0.6rem;">
							<span style="font-size: 30px;font-weight: bold;">中国健康促进基金会</span>
							<span style="margin-top: 0.32rem;font-size: 15.12px;font-weight: bold;">肿瘤精准个体化防治公益项目</span>
						</div>

						<div class="flexc" style="padding-left: 0.6rem; color: #0F351B;">
							<span style="font-size: 25px;font-weight: bold;">肿瘤营养科普行动</span>
							<span style="margin-top: 0.32rem;font-size:1.6rem;font-weight: bold;"></span>
						</div>

						<img style="width: 33px; height: 33px;margin-left: 2.81rem;" :src="require('../../static/logo/logo2.png')"
						 fit="fit"></img>
						<div class="flexc" style="margin-left: 0.38rem; color: #167146;">
							<span style="font-size: 30px;font-weight: bold;">肿瘤营养管理与干预</span>
							<span style="margin-top: 0.32rem;font-size: 15.12px;font-weight: bold;">Cancer Nutrition Management and
								Intervention</span>
						</div>
					</div>
				</div>
				<div class="headright flex">
					PG-SGA 营养状况反馈表
				</div>
			</div>
			<view class="content  flexc">
				<text class="table-des">{{createTime}}评测答题记录（最近一次评估）</text>
				<view class="i-table i-table-margin">
					<t-table border="1" border-color="#C3C3C3">
						<t-tr font-size="42" color="#333333" align="center" style="background-color: #F5F5F5;">
							<t-th align="center" class="flex1 i-td">序号</t-th>
							<t-th align="center" class="flex10 i-td">题目</t-th>
							<t-th align="center" class="flex4 i-td">回答内容</t-th>
						</t-tr>
						<t-tr font-size="40" align="center" v-for="(item,index) in list" :key="index">
							<t-td align="center" class="flex1 i-td">{{ index+1 }}</t-td>
							<t-td align="center" class="flex10 i-td">{{ item.title }}</t-td>
							<t-td align="center" class="flex4 i-td">{{ item.reply}}</t-td>
						</t-tr>
					</t-table>
				</view>
			</view>
			<div style="height:60rpx;"></div>
		</view>
	</view>
	</view>
</template>

<script>
	const app = getApp();
	import tTable from '@/components/t-table/t-table.vue'
	import tTh from '@/components/t-table/t-th.vue'
	import tTr from '@/components/t-table/t-tr.vue'
	import tTd from '@/components/t-table/t-td.vue'
	import echarts from '../../plugins/echarts';
	import html2canvas from "plugins/html2canvas"
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd,
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
				list: [],
				showimgbox:true,
				email:"",
			}
		},
		onLoad(opt) {
			this.email = localStorage.getItem("email")||"";
			this.puid = opt.id||507;
			this.getUserData();
			app.getPatientReplyList({
				patientId: this.puid,
				surveyId: 1
			}).then((res) => {
				this.createTime = res.data.createTime
				this.list = res.data.detailList
				this.$forceUpdate()
			})
		},
		methods: {
			getUserData() {
				app.loading("生成中");
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
						top: "30%",
						right: "2%",
						width: "25%",
						data: ['体质量评分', '疾病与营养', '应激评分', '体格检查']
					},
					grid: {
						top: "10%",
						left: '3%',
						right: '26%',
						bottom: '0%',
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
						top: "30%",
						right: "2%",
						width: "25%",
						data: ['脂肪丢失', '肌肉丢失', '水肿情况']
					},
					grid: {
						top: "10%",
						left: '3%',
						right: '26%',
						bottom: '0%',
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
						setTimeout(() => {
							this.createimg();
						}, 3000)
					})
					if (cal) cal();
				});
			},
			createimg(next) {
				
				document.body.scrollTop = document.documentElement.scrollTop = 0;
				setTimeout(() => {
					let qselect;
					if (!next) qselect = document.querySelector("#imgcreatebox");
					else qselect = document.querySelector("#imgtablebox");
					var w = qselect.offsetWidth;
					var h = qselect.offsetHeight; //要将 canvas 的宽高设置成容器宽高的 2 倍
					var canvas = document.createElement("canvas");
					canvas.width = w * 1;
					canvas.height = h * 1;
					// canvas.style.width = w + "px";
					// canvas.style.height = h + "px";
					var context = canvas.getContext("2d"); //然后将画布缩放，将图像放大两倍画到画布上 
					// context.scale(3, 3);
					// context.mozImageSmoothingEnabled = false;
					// context.webkitImageSmoothingEnabled = false;
					// context.msImageSmoothingEnabled = false;
					// context.imageSmoothingEnabled = false;
					html2canvas(qselect, {
						canvas: canvas,
						scale: 1,
						width: w,
						height: h,
						allowTaint: false,
						taintTest: false,
						useCORS: true,
					}).then(canvas => {
						// canvas.style.width = w + "px";
						// canvas.style.height = h + "px";
						let dataURL = canvas.toDataURL("image/png");
						if (!next) this.imgUrl = dataURL;
						else {
							this.imgUrl1 = dataURL;
							app.loaded();
							this.sendpic();
						}

						if (!next) {
							this.createimg(1);
						}
						// this.$refs.imgbox.open();
					}).catch(res => {
						app.loaded();
						alert(JSON.stringify(res))
					});
				}, 500)
			},
			sendpic() {
				app.loading("生成中");
				
				uni.uploadFile({
					url: "/api/pc/doctor/survey/uploadPic",
					files: [{name:"file1",file:this.imgUrl,uri:this.imgUrl}, {name:"file2",file:this.imgUrl1,uri:this.imgUrl1}],
					formData: {
						recordId: this.userData.recordId,
					},
					header: {
						// 'content-type': 'multipart/form-data',
						'salesToken': localStorage.getItem("salesToken"),
						'uid': localStorage.getItem("uid"),
						'channel': 1,
					},
					success: (rq) => {
						app.loaded();
						let data = JSON.parse(rq.data);
						this.showimgbox = false;
						app.tip("生成成功");
						window.open(app.globalData.baseUrl+data.data);
						// console.log(rq)
					},
					fail: (res) => {
						app.tip("上传失败");alert(JSON.stringify(res));
					}
				})

				function dataURItoBlob(dataurl) {
					var arr = dataurl.split(',');
					//注意base64的最后面中括号和引号是不转译的   
					var _arr = arr[1].substring(0, arr[1].length - 2);
					var mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(_arr),
						n = bstr.length,
						u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					return new Blob([u8arr], {
						type: mime
					});
				}
			},
			sendemail(){
				if(!this.email){app.tip("请输入邮箱");return;}
				localStorage.setItem("email",this.email);
				this.saveemail();
			},
			saveemail(cal){
				app.loading("发送中");
				app.surveysendEmail({recordId:this.userData.recordId,email:this.email}).then((res) => {
					app.tip("发送成功");
					setTimeout(()=>{
						uni.redirectTo({
							url:"/pages/doctor/pdfresult",
						})
					},1000)
					if(cal) cal(res.data);
				})
			},
		},
		onShow() {
			
		},
	}
</script>

<style lang="scss" scoped>
	.linetext {
		font-size: 28*1.1rpx;
		padding: 30rpx 0;
		text-align: center;
	}

	.pagebox {
		.chartbox {
			.chartleft {
				width: 49.9%;
			}

			.chartright {
				width: 49.9%;
			}

			.charttitle {
				font-size: 48*1.1rpx;
				padding-bottom: 40rpx;
			}

			border-radius: 7rpx;
			padding:56rpx;
			box-sizing:border-box;
			background-color: rgba(248, 248, 248, 100);
			margin-bottom:78rpx;
		}

		.nutritionadvice {
			.advicetitle {
				font-size: 48*1.1rpx;
				padding-bottom: 30rpx;
			}

			.advicetext {
				font-size: 36*1.1rpx;
			}

			border-radius: 7rpx;
			padding:56rpx;
			box-sizing:border-box;
			background-color: rgba(248, 248, 248, 100);
			margin-bottom:78rpx;
		}

		.neartest {
			.nearitem {
				justify-content: space-between;
				font-size: 36*1.1rpx;
				padding: 38rpx 0;
				box-sizing: border-box;

				.nearleft {
					padding-left: 50rpx;
				}

				.nearleft1 {
					padding-left: 120rpx;
					color: #555;
				}

				.nearright {
					padding-right: 56rpx;
				}

				&.other {
					padding: 32rpx 0;
				}

				&.otherline {
					border-bottom: 2rpx solid #ccc;
				}
			}

			border-radius: 7rpx;
			padding:56rpx;
			box-sizing:border-box;
			background-color: rgba(248, 248, 248, 100);
			margin-bottom:78rpx;
		}

		padding:0 136rpx;

		.userinfo {
			height: 216rpx;

			.infoitem {
				padding-right: 80rpx;
				font-size: 36*1.1rpx;
			}
		}

	}

	.headright {
		font-size: 48*1.1rpx;
	}

	.container1 {
		justify-content: space-between;
		flex-wrap: nowrap;
		padding: 43px 136rpx;
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
		font-size: 36*1.1rpx;
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
		font-size: 26*1.1rpx;
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
		font-size: 30*1.1rpx;
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
			font-size: 34*1.1rpx;
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
			font-size: 34*1.1rpx;
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
		font-size: 27*1.1rpx;
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
				font-size: 39*1.1rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #419490;
				line-height: 67rpx;

			}

			.infodetaillist {
				padding-top: 37.5rpx;
				padding-left: 75rpx;
				color: #666666;
				font-size: 33*1.1rpx;
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
					font-size: 16*1.1rpx;
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
		font-size: 51*1.1rpx;
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
					font-size: 20*1.1px;
				}

				.msg {
					font-size: 14*1.1px;
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
						font-size: 26*1.1rpx;
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
						font-size: 13*1.1px;
						justify-content: center;

						.askIcon {
							width: 22rpx;
							height: 22rpx;
						}
					}

					.health-detail {
						font-size: 13*1.1px;
					}

					.health-tips {
						font-size: 12*1.1px;
						color: #999999;
					}
				}
			}

			.tips-box {
				display: flex;

				.tips {
					color: #333333;
					font-size: 12*1.1px;
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
				font-size: 12*1.1px;
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
				font-size: 27*1.1rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 67rpx;
				text-align: center;
			}

			.record-chart-subtitle {
				color: #59A29F;
				font-size: 12*1.1px;
				margin-top: 19rpx;
			}

		}

		.last-one {
			color: #333333;
			font-size: 15*1.1px;
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
						font-size: 30*1.1rpx;
						color: #52A29E;
					}

					.health-list-item-detail {
						color: #999999;
						font-size: 26*1.1rpx;
						margin-top: 20rpx;
					}

					.health-list-item-time {
						color: #666666;
						font-size: 26*1.1rpx;
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
						font-size: 22*1.1rpx !important;
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
				font-size: 17*1.1px;
			}
		}

		.white-background {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-title {
				font-size: 14*1.1px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-subtitle {
				font-size: 15*1.1px;
				color: #333333;
				margin-top: 40rpx;
			}

			.white-background-line-space {
				background-color: #F6F6F6;
				height: 20rpx;
				margin-top: 60rpx;
			}

			.white-background-close {
				font-size: 15*1.1px;
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
				font-size: 14*1.1px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-BMI-des {
				font-size: 15*1.1px;
				color: #333333;
				margin-top: 40rpx;
				margin-left: 60rpx;
				margin-right: 60rpx;
				text-align: left;
			}

			.white-background-BMI-des2 {
				font-size: 15*1.1px;
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
				font-size: 15*1.1px;
				color: #666666;
			}
		}

		.white-background-energy {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;

			.white-background-energy-title {
				font-size: 14*1.1px;
				color: #666666;
				padding-top: 35rpx;
			}

			.white-background-energy-desc-title {
				margin-left: 60rpx;
				margin-right: 60rpx;
				margin-top: 60rpx;
				text-align: left;
				color: #333333;
				font-size: 15*1.1px;
			}

			.white-background-energy-desc {
				margin-left: 60rpx;
				margin-right: 60rpx;
				margin-top: 20rpx;
				text-align: left;
				color: #333333;
				font-size: 15*1.1px;
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
				font-size: 15*1.1px;
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
				font-size: 13*1.1px;
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
				font-size: 33*1.1rpx;
			}

			.record-time-box {
				display: flex;
				margin-top: 15rpx;
				padding-left: 125rpx;
				padding-bottom: 20rpx;

				.record-time {
					font-size: 27*1.1rpx;
					color: #999999;
					margin-right: 25rpx;
				}

				.record-motify {
					font-size: 14*1.1px;
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
				font-size: 15*1.1px;
				border-bottom: 2rpx solid #E5E5E5;
			}

			.MA-close {
				text-align: center;
				height: 102rpx;
				line-height: 102rpx;
				color: #666666;
				font-size: 15*1.1px;
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
				font-size: 30*1.1rpx;
				font-family: PingFang SC;
				font-weight: 400;
				//line-height: 90rpx;


			}

			.write-box {}

			.MA-write-tips {
				margin-top: 15rpx;
				color: #999999;
				font-size: 13*1.1px;
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
			font-size: 33*1.1rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 67rpx;

			.notice-text {
				color: #999;
				margin-top: 15rpx;
				font-size: 27*1.1rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 67rpx;

			}
		}

		.leftinfo {
			flex: 1;
			font-size: 24*1.1rpx;
			padding-left: 75rpx;

			.infolist {
				padding-bottom: 10rpx;

				font-size: 30*1.1rpx;
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
				font-size: 24*1.1rpx;
				color: #999;
			}
		}
	}

	.echarts {
		width: 90%;
		height: 500rpx;
	}

	.echartsleft {
		width: 90%;
		height: 1200rpx;
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
		width: 40rpx;
		height: 40rpx;
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
			font-size: 46*1.1rpx;
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
	.white-background-pop1 {
		text-align: center;
		background-color: #FFFFFF;padding:0 0 30rpx 0;
		border-radius: 10px;
	
		.white-background-pop1-title {
			font-size: 30rpx;
			color: #333;font-weight:bold;
			padding: 35rpx 0;
			position: relative;
			.close{
				position: absolute;
				right: 50rpx;
				width: 30rpx;
				height: 30rpx;
				top: 40rpx;
			}
		}
		.sendemail{
			line-height:1;padding:24rpx 0;
			border-radius: 60rpx;font-size: 32rpx;
			background:$maincolor;
			width: 74%;color:#fff;margin:40rpx auto 20rpx;
			text-align: center;
		}
		.emailinput{width: 80%;background: #F5F5F5;border-radius:8rpx;padding:18rpx 24rpx;text-align: left;margin:40rpx auto 20rpx;}
		.inputinfo{width: 80%;margin:0 auto 40rpx;text-align:left;color:#aaa;font-size:28rpx;}
	}
</style>
