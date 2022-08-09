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
											<input type="text" placeholder="请填写真实名字" v-model="patientName" placeholder-style="font-size: 28rpx; color:#BDBDBD ;">
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*患者性别</view>
										<view class="content">
											<uni-data-select
											    v-model="patientGender"
											    :localdata="form.gender">
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
												:value="form.birthDay"
												start="1900-1-1"
												end="2022-12-30"
											/>
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*所在城市</view>
										<view class="content">
											<picker mode="multiSelector" :range="areaList" :range-key="'name'" @columnchange="columnChange" @cancel="hideArea(1)"
											 @change="hideArea(0)" style="flex: 1;">
												<!-- <view :class="(city&&province&&hasArea)||infoData.region?'has-value':'sex-value'">{{(city&&province&&hasArea)?(province+' '+city):(infoData.region?infoData.region:'点击选择')}}</view> -->
												<!-- <view>{{(city&&province&&hasArea)?(province+' '+city):(infoData.region?infoData.region:'点击选择')}}</view> -->
												<view>{{(city&&province)?(province+' '+city):(infoData.region?infoData.region:'点击选择')}}</view>
											</picker>
										</view>
										
										<!-- <view class="content">
											<picker name="picker" class="rightarea" mode="region" @change="bindPickerChange()" :value="form.region" >
											    <view style="padding:36rpx 0;">{{form.region[0]?(form.region[0]+" "+form.region[1]+" "+form.region[2]):"请选择"}}</view>
											</picker>
										</view> -->
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*所患疾病</view>
										<view class="content">
											<input type="text" v-model="illness" placeholder="请填写疾病名称" placeholder-style="font-size: 28rpx; color:#BDBDBD ;">
										</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*当前身高</view>
											<view class="content" style="display: flex;justify-content: space-between;">
												<input type="text" v-model="height" placeholder="请填写身高" placeholder-style="font-size: 28rpx; color:#BDBDBD ;">
												<view >cm</view>
											</view>
									</view>
								</uni-forms-item>
								
								<uni-forms-item>
									<view class="info-box">
										<view class="title">*当前体重</view>
										<view class="content" style="display: flex;justify-content: space-between;">
											<input type="text" v-model="weight" placeholder="请填写体重" placeholder-style="font-size: 28rpx; color:#BDBDBD ;">
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
								
								<view class="info-box">
									<view class="title">* 联系电话</view>
									<input class="content" type="number" value="" placeholder="请填写联系电话" v-model="phone" />
								</view>
								<view class="info-box">
									<view class="title">* 验证码</view>
									<view class="content">
										<input type="text" value="" placeholder="请填写手机验证码" v-model="code" />
										<button type="default" class="code-button" @click="getCode">{{codetext}}</button>
									</view>
									
								</view>
								
								<button class="update-btn" type="default" @click="submit()">更新信息</button>
							</uni-forms>
						</view>
					</view>
					
			</scroll-view>
	</view>
</template>

<script>
	import http from '../../common/http.js'
	const app = getApp();
	export default {
		data() {
			return {
				imageValue: [],
				id: '',
				form:{
					value: '',
					name: '张小明',
					gender: [
						{value: 0, text: '男'},
						{value: 1, text: '女'}
					],
					birthDay: new Date(),
					disease: '乳腺癌',
					region: [],
					address: "",
					defaultAddress: false,
				},
				maskClick: false,
				patientName: '',
				phone: "",
				patientGender: 0,
				birthday: '',
				cityId: '',
				city: '',
				provinceId: '',
				province: '',
				illness: '',
				illnessother:"",
				height: '',
				weight: '',
				age:'',
				areaList: [
					[],
					[]
				],
				imgList: [],
				pathologyUrl: '',
				
				type: 1, //1表示点击更新信息进来，2表示用户未填写信息系统自动跳进来的
				hasArea: false,
				infoData: {},
				inllList: [],
				projectList: [],
				currentProject: {},
				currentIndex: '',
				formQrCode: '', //1表示患者扫描医生二维码后，点击公众号消息进入信息完善页 2从基础信息进入
				selfTest: '', //1表示从评估页面进来，完善信息后直接返回评估页面
				needAge:false,//检查患者是否需要输入年龄
				code: '',
				codetext: '获取验证码',
				isSend: false, // 是否发送验证码
			}
		},
		onLoad(props) {
			if (!app.getCache("uid")) return;
			this.inputAgeCheck();
			this.getIllnessList();
			this.type = props.type || 1;
			this.formQrCode = props.formQrCode || 1;
			if(this.type==2&&this.formQrCode==1){
				localStorage.setItem("newuser",1);
			}
			this.selfTest = props.selfTest || 0;
			http.get(http.urls.get_all_province).then((res) => {
				this.areaList[0] = res.data;
				if (this.areaList[0] && this.areaList[0].length > 0) {
					let obj = this.areaList[0][0];
					this.province = obj.name
					this.provinceId = obj.id
					http.get(http.urls.get_citys, {
						id: obj.id
					}).then((res) => {
						this.areaList[1] = res.data
						if (this.areaList[1] && this.areaList[1].length > 0) {
							let obj2 = this.areaList[1][0];
							this.city = obj2.name
							this.cityId = obj2.id
						}
						this.$forceUpdate();
					})
				}
			})
			this.getInfo();
			console.log(this.areaList)
		},
		methods: {
			openSingleChose(index) {
				this.currentProject = this.projectList[index];
				this.currentIndex = index;
				this.$refs.singleChoosePop.open();
			},
			selectSingle(index) {
				for (var i = 0; i < this.currentProject.detailList.length; i++) {
					var detail = this.currentProject.detailList[i];
					if (index == i) {
						detail.choose = 1;
						this.currentProject.choseContent = detail.content;
						this.currentProject.choseId = detail.id;
					} else {
						detail.choose = 0;
					}
					this.currentProject.detailList[i] = detail;
				}
				this.projectList[this.currentIndex] = this.currentProject;
				this.$refs.singleChoosePop.close();
			},
			//多选
			multipleChose(index) {
				this.currentProject = this.projectList[index];
				this.currentIndex = index;
				this.$refs.multipleChoosePop.open();
			},
			selectMultiple(index) {
				var detail = this.currentProject.detailList[index];
				if (detail.choose == 1) {
					detail.choose = 0;
				} else {
					detail.choose = 1
				}
				this.currentProject.detailList[index] = detail;
				this.projectList[this.currentIndex] = this.currentProject;
			
				for (var i = 0; i < this.projectList.length; i++) {
					var project = this.projectList[i];
					if (project.type == 3) {
						//多选
						var ids = [];
						var contents = [];
						var choseContent = '';
						for (var j = 0; j < project.detailList.length; j++) {
							if (project.detailList[j].choose == 1) {
								ids.push(project.detailList[j].id);
								contents.push(project.detailList[j].content);
								choseContent = choseContent + project.detailList[j].content + ','
							}
						}
						choseContent = choseContent.substring(0, choseContent.length - 1);
						project.ids = ids;
						project.contents = contents;
						project.choseContent = choseContent;
					}
					this.projectList[i] = project;
				}
			
			},
			sure() {
				this.$refs.multipleChoosePop.close();
			},
			disagree() {
				// uni.redirectTo({
				// 	url:'patient-nutrition-manage'
				// });
				app.tip('很抱歉，暂时无法为您提供服务，请关闭页面');
			},
			agree() {
				this.$refs.tipPopup.close();
			},
			showTipPopup() {
				this.$refs.tipPopup.open();
			},
			getIllnessList() {
				app.getIllnessSetting().then(res => {
					if (res.status == 1) {
						let hasother = false;
						for (let i = 0; i < res.data.illness.length; i++) {
							if(res.data.illness[i]=="其它疾病") hasother = true;
						}
						if(!hasother) res.data.illness.push("其它疾病");
						this.inllList = res.data.illness;
					}
				});
			},
			getInfo() {
				app.patientBasicInfo({}).then(res => {
					// this.showTipPopup();
					if (res.status == 1) {
						if (res.data) {
							this.infoData = res.data;
							this.patientName = this.infoData.patientName;
							this.phone = this.infoData.phone;
							this.patientGender = this.infoData.patientGender?(this.infoData.patientGender == '男' ? 1 : 2):0;
							this.cityId = this.infoData.cityId;
							this.provinceId = this.infoData.provinceId;
							this.illness = this.infoData.illness;
							this.age = this.infoData.age||"";
							this.height = this.infoData.height==0?'':this.infoData.height;
							this.weight = this.infoData.weight==0?'':this.infoData.weight;
							if (this.infoData.birthday) {
								var year = this.infoData.birthday.split('年')[0];
								var month = this.infoData.birthday.split('年')[1].split('月')[0];
								var day = this.infoData.birthday.split('年')[1].split('月')[1].split('日')[0];
								this.birthday = year + '-' + month + '-' + day;
							}
							if(!this.patientName) this.showTipPopup();
						} else {
							this.showTipPopup();
						}
			
						this.projectList = res.data.projectList;
						if (this.projectList) {
							for (var i = 0; i < this.projectList.length; i++) {
								var project = this.projectList[i];
								if (project.type == 2) {
									//单选
									for (var j = 0; j < project.detailList.length; j++) {
										if (project.detailList[j].choose == 1) {
											project.choseId = project.detailList[j].id;
											project.choseContent = project.detailList[j].content;
										}
									}
								} else if (project.type == 3) {
									//多选
									var ids = [];
									var contents = [];
									var choseContent = '';
									for (var j = 0; j < project.detailList.length; j++) {
										if (project.detailList[j].choose == 1) {
											ids.push(project.detailList[j].id);
											contents.push(project.detailList[j].content);
											choseContent = choseContent + project.detailList[j].content + ','
										}
									}
									choseContent = choseContent.substring(0, choseContent.length - 1);
									project.ids = ids;
									project.contents = contents;
									project.choseContent = choseContent;
								}
								this.projectList[i] = project;
							}
						}
			
					}
				});
			},
			//获取验证码
			getCode() {
				if (this.isSend) return;
				if (!this.phone) {
					app.tip('请输入手机号码');
					return;
				} else if (!/^1[0-9]{10}$/.test(this.phone)) {
					app.tip('请填写正确的手机号码')
					return;
				}
				app.getCode({
					mobile: this.phone
				}).then(res => {
					if (res.status == 1) {
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
			},
			hideArea(cancel) {
				if (cancel) {} else {
					this.hasArea = true
				}
			},
			bindDateChange(e) {
				this.birthday = e.target.value
			},
			getIllnessList() {
				app.getIllnessSetting().then(res => {
					if (res.status == 1) {
						let hasother = false;
						for (let i = 0; i < res.data.illness.length; i++) {
							if(res.data.illness[i]=="其它疾病") hasother = true;
						}
						if(!hasother) res.data.illness.push("其它疾病");
						this.inllList = res.data.illness;
					}
				});
			},
			inputAgeCheck(){
				app.inputAgeCheck().then(res =>{
					if(res.status == 1){
						this.needAge = res.data.ageInput;
					}
				})
			},
			getInfo() {
				app.patientBasicInfo({}).then(res => {
					// this.showTipPopup();
					if (res.status == 1) {
						if (res.data) {
							this.infoData = res.data;
							this.patientName = this.infoData.patientName;
							this.phone = this.infoData.phone;
							this.patientGender = this.infoData.patientGender?(this.infoData.patientGender == '男' ? 1 : 2):0;
							this.cityId = this.infoData.cityId;
							this.provinceId = this.infoData.provinceId;
							this.illness = this.infoData.illness;
							this.age = this.infoData.age||"";
							this.height = this.infoData.height==0?'':this.infoData.height;
							this.weight = this.infoData.weight==0?'':this.infoData.weight;
							if (this.infoData.birthday) {
								var year = this.infoData.birthday.split('年')[0];
								var month = this.infoData.birthday.split('年')[1].split('月')[0];
								var day = this.infoData.birthday.split('年')[1].split('月')[1].split('日')[0];
								this.birthday = year + '-' + month + '-' + day;
							}
							if(!this.patientName) this.showTipPopup();
						} else {
							this.showTipPopup();
						}
			
						this.projectList = res.data.projectList;
						if (this.projectList) {
							for (var i = 0; i < this.projectList.length; i++) {
								var project = this.projectList[i];
								if (project.type == 2) {
									//单选
									for (var j = 0; j < project.detailList.length; j++) {
										if (project.detailList[j].choose == 1) {
											project.choseId = project.detailList[j].id;
											project.choseContent = project.detailList[j].content;
										}
									}
								} else if (project.type == 3) {
									//多选
									var ids = [];
									var contents = [];
									var choseContent = '';
									for (var j = 0; j < project.detailList.length; j++) {
										if (project.detailList[j].choose == 1) {
											ids.push(project.detailList[j].id);
											contents.push(project.detailList[j].content);
											choseContent = choseContent + project.detailList[j].content + ','
										}
									}
									choseContent = choseContent.substring(0, choseContent.length - 1);
									project.ids = ids;
									project.contents = contents;
									project.choseContent = choseContent;
								}
								this.projectList[i] = project;
							}
						}
			
					}
				});
			},
			hideArea(cancel) {
				if (cancel) {} else {
					this.hasArea = true
				}
			},
			columnChange(e) {
				let column = e.detail.column
				let value = e.detail.value
				let obj = this.areaList[column][value]
				if (column == 0) {
					this.province = obj.name
					this.provinceId = obj.id
					http.get(http.urls.get_citys, {
						id: this.provinceId
					}).then((res) => {
						this.areaList[1] = res.data
						if (this.areaList[1] && this.areaList[1].length > 0) {
							let obj2 = this.areaList[1][0];
							this.city = obj2.name
							this.cityId = obj2.id
						}
						this.$forceUpdate();
					})
				} else if (column == 1) {
					this.city = obj.name
					this.cityId = obj.id
				}
			},
			submitRequest() {
				app.loading("保存中");
				var projectList = [];
				if (this.projectList) {
					for (var i = 0; i < this.projectList.length; i++) {
						var project = this.projectList[i];
						if (project.type == 1) {
							if (project.detailList) {
								projectList.push({
									projectId: project.id,
									answer: project.detailList
								})
							}
						} else if (project.type == 2) {
							if (project.choseContent) {
								projectList.push({
									projectId: project.id,
									answer: project.choseId
								})
							}
						} else {
							if (project.choseContent) {
								var ids = '';
								for (var j = 0; j < project.ids.length; j++) {
									ids = ids + project.ids[j] + ',';
								}
								ids = ids.substring(0, ids.length - 1);
								projectList.push({
									projectId: project.id,
									answer: ids
								})
							}
			
						}
					}
					projectList = JSON.stringify(projectList);
				}
				if (this.formQrCode == 1) {
					app.savePatientInfo({
						patientName: this.patientName,
						patientGender: this.patientGender,
						phone: this.phone,
						illness: this.illness,
						height: this.height,
						weight: this.weight,
						verifyCode: this.code,
						detailList: projectList,
						age:this.age
					}).then(res => {
						app.loaded();
						if(this.selfTest==1){
							    uni.navigateTo({
							    	url: 'nutritional-self-test'
							    });
								
							}else
						app.getSgaType({age:this.age}).then(res =>{
							if(res.data.surveyType==1){
								uni.navigateTo({
									url:'/pages/doctor/select/index?id='+res.data.surveyId+'&name='+res.data.surveyName,
								});
							}else{
								uni.navigateTo({
									url: 'patient-submit-sucess?type=' + this.type+'&age='+this.age
								});
							}
						});	
						// if (res.status == 1) {
						// 	if(this.selfTest==1){
						// 	    uni.navigateTo({
						// 	    	url: 'nutritional-self-test'
						// 	    });
								
						// 	}else{
						// 	    uni.navigateTo({
						// 	    	url: 'patient-submit-sucess?type=' + this.type+'&age='+this.age
						// 	    });
							    	
						// 	}
						// }
					});
				} else {
					app.savePatientInfo({
						patientName: this.patientName,
						phone: this.phone,
						patientGender: this.patientGender,
						birthday: this.birthday,
						cityId: this.cityId,
						provinceId: this.provinceId,
						illness: this.illness,
						height: this.height,
						weight: this.weight,
						verifyCode: this.code,
						pathologyUrl: this.pathologyUrl,
						detailList: projectList,
						age:this.age
					}).then(res => {
						app.loaded();
						if (res.status == 1) {
							if(this.selfTest==1){
								    uni.navigateTo({
								    	url: 'nutritional-self-test'
								    });
									
								}else
							app.getSgaType({age:this.age}).then(res =>{
								if(res.data.surveyType==1){
									uni.navigateTo({
										url:'/pages/doctor/select/index?id='+res.data.surveyId+'&name='+res.data.surveyName,
									});
								}else{
									uni.navigateTo({
										url: 'patient-submit-sucess?type=' + this.type+'&age='+this.age
									});
								}
							});	
							// uni.navigateTo({
							// 	url: 'patient-submit-sucess?type=' + this.type +'&age='+this.age
							// });
			
						}
					});
				}
			
			},
			submit() {
				if (this.projectList) {
					for (var i = 0; i < this.projectList.length; i++) {
						var project = this.projectList[i];
						if (project.type == 1) {
							if (project.required == 1 && !project.detailList) {
								app.tip('请输入必填信息')
								return;
							}
			
						} else {
							if (project.required == 1 && !project.choseContent) {
								app.tip('请输入必填信息')
								return;
							}
						}
					}
				}
			
				if (this.formQrCode == 1) {
					if (!this.patientName ||
						!this.illness ||
						!this.weight || !this.height || !this.phone) {
						app.tip('请输入完整信息');
						return;
					}
			
				} else {
					if (!this.patientName || !this.weight || !this.height || !this.phone) {
						app.tip('请输入完整信息');
						return;
					}
				}
				if(this.height<10){
					app.tip('请填写正确的身高，例如170',2000);return;
				}
				if(this.illness=="其它疾病"&&!this.illnessother){
					app.tip('请输入疾病名称');return;
				}
				if(this.illness=="其它疾病"){
					this.illness=this.illnessother;
				}
				// if(!this.code){
				// 	app.tip('请输入验证码');return;
				// }
				
			
				if (this.imgList.length > 0) {
					this.uploadImg();
				} else {
					this.submitRequest();
				}
			},
			// init(){
			// 	app.getareadetail().then(res => {
			// 		res.data.region = res.data.region.split(" ");
			// 		res.data.defaultAddress = res.data.defaultAddress==1?true:false;
			// 		this.form.region = res.data.region;
			// 		console.log(this.form.region);
			// 	});
			// },
			// bindPickerChange(e){
			// 	this.form.region = e.detail.value.region;
			// },
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
			  display: flex;
			  justify-content: space-between;
			  
			  /deep/.uni-input-input{
				  font-size: 24rpx;
			  }
			  /deep/.uni-select {
				  border: none;
			  }
			  /deep/.uni-date-x--border[data-v-6e13d7e2] {
				  border: none;
			  }
			  
			  .code-button {
				  margin: 0;
				  background: #57C1BB;
				  font-size: 24rpx;
				  color: #fff;
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
		  color: #fff;
	  }
	}
	.scroll-bg{
	  width: 100vw;
	  height: 300vh;
	 // /* background-image: url(https://636c-cloud1-5gfii8jlc56b5045-1306536140.tcb.qcloud.la/wxfile/background.png?sign=6a62c2c13c024f0091a1f8034f4d6155&t=1627552695);
	 //  background-repeat: no-repeat; */
	 //  background: -webkit-linear-gradient(#4fbeb7, #F5F5F5);
	 //          /*  Safari 5.1 到 6.0 */
	 //  background: -o-linear-gradient(#4fbeb7, #F5F5F5);
	 //          /*  Opera 11.6 到 12.0 */
	 //  background: -moz-linear-gradient(#4fbeb7, #F5F5F5);
	 //          /*  Fx 3.6 到 15 */
	 //  background: linear-gradient(#4fbeb7, #F5F5F5);
	 //  background-size: contain;
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
