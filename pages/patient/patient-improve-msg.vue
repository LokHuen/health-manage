<template>
	<!-- 患者完善界面 -->
	<view class="container">
		<view class="title">完善资料，医生才能及时掌握您的营养状况和给予康复指导。</view>
		<view class="line-space"></view>
		<view class="name-box">
			<view class="name-tips">* 姓名</view>
			<input class="name-input" type="text" value="" placeholder="请填写真实名字" v-model="patientName" />
		</view>
		<view class="sex-box" @click="selectSex(0)">
			<view class="sex-tips">* 性别</view>
			<view :class="patientGender==0?'sex-value':'has-value'">{{patientGender==0?'点击选择':patientGender==1?'男':'女'}}</view>
		</view>
		<view class="sex-box" v-if="formQrCode==2">
			<view class="sex-tips">* 出生日期</view>
			<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange" style="flex: 1;">
				<view :class="birthday?'has-value':'sex-value'">{{birthday?birthday:'点击选择'}}</view>
			</picker>
		</view>
		<view class="sex-box" v-if="formQrCode==2">
			<view class="sex-tips">* 所在城市</view>
			<picker mode="multiSelector" :range="areaList" :range-key="'name'" @columnchange="columnChange" @cancel="hideArea(1)"
			 @change="hideArea(0)" style="flex: 1;">
				<view :class="(city&&province&&hasArea)||infoData.region?'has-value':'sex-value'">{{(city&&province&&hasArea)?(province+' '+city):(infoData.region?infoData.region:'点击选择')}}</view>
			</picker>
		</view>

		<view class="name-box">
			<view class="name-tips">* 联系电话</view>
			<input class="name-input" type="number" value="" placeholder="请填写联系电话" v-model="phone" />
		</view>
		<view class="name-box">
			<view class="name-tips">* 验证码</view>
			<input class="name-input" type="text" value="" placeholder="请填写手机验证码" v-model="code" />
			<button type="default" class="code-button" @click="getCode">{{codetext}}</button>
		</view>
		
		<view class="name-box" v-if="needAge">
			<view class="name-tips">* 年龄</view>
			<input class="name-input" type="number" value="" placeholder="请填写年龄" v-model="age" />
		</view>


		<view class="name-box">
			<view class="name-tips">* 当前身高</view>
			<input class="name-input" type="text" value="" placeholder="请填写身高" v-model="height" />
			<view class="right-tip">cm</view>
		</view>
		<view class="name-box">
			<view class="name-tips">* 当前体重</view>
			<input class="name-input" type="text" value="" placeholder="请填写体重" v-model="weight" />
			<view class="right-tip">kg</view>
		</view>


		<view class="name-box">
			<view class="name-tips">* 疾病诊断</view>
			<!-- <input class="name-input" type="text" value="" placeholder="请填写疾病名称" v-model="illness" /> -->
			<view style="flex:1;">
				<view :class="(illness?'name-input':'name-novalue-input')+' otherinput'" @click="openSelectResult">{{illness?illness:'请选择疾病诊断'}}</view>
				<input v-if="illness=='其它疾病'" class="name-input otherinput" type="text" placeholder="请填写疾病名称" v-model="illnessother" />
			</view>
		</view>

		<view class="projectList" v-for="(item,index) in projectList">
			<!-- 文本 -->
			<view class="name-box" v-if="item.type==1">
				<view class="name-tips">{{item.required==1?('* '+item.name):item.name}}</view>
				<input class="name-input" :placeholder="item.reminder" v-model="item.detailList" />
			</view>

			<!-- 下拉单选 -->
			<view class="name-box" v-if="item.type==2">
				<view class="name-tips">{{item.required==1?('* '+item.name):item.name}}</view>
				<view :class="item.choseContent?'name-input':'name-novalue-input'" @click="openSingleChose(index)">{{item.choseContent?item.choseContent:item.reminder}}</view>
			</view>

			<!-- 下拉多选 -->
			<view class="name-box" v-if="item.type==3">
				<view class="name-tips">{{item.required==1?('* '+item.name):item.name}}</view>
				<view :class="item.choseContent?'name-input':'name-novalue-input'" @click="multipleChose(index)">{{item.choseContent?item.choseContent:item.reminder}}</view>
			</view>

		</view>


		<view class="pic-title" v-if="!infoData.patientName &&formQrCode==2">病历照片</view>
		<view class="pic-tip" v-if="!infoData.patientName &&formQrCode==2">上传出院小结（重要）、影像报告等内容，方便医生 评估病情</view>
		<view class="pic-content-box" v-if="!infoData.patientName &&formQrCode==2">
			<view class="ccimglist">
				<view v-for="(item,index) in imgList" :key="index" :class="(index%3==0)?'img-box-first':'img-box'">
					<image :src="item" mode="aspectFill" @click="previewImage(index)" class="imagelist"></image>
					<image src="../../static/icon/icon_remove.png" mode="aspectFill" class="remove-icon" @click="remove(index)"></image>
				</view>
			</view>
		</view>
		<view class="upload-box" @click="choseImg" v-if="!infoData.patientName &&formQrCode==2">点击上传</view>


		<view class="button-box">
			<button type="default" class="button" @click="submit">提交</button>
		</view>

		<view style="height: 100rpx;"></view>

		<uni-popup ref="sexPop" type="bottom">
			<view class="i-sex-content">
				<text class="i-sex-title">性别选择</text>
				<text :class="patientGender==1?'i-sex-item line active':'i-sex-item line'" @click="selectSex(1)">男</text>
				<text :class="patientGender==2?'i-sex-item active':'i-sex-item'" @click="selectSex(2)">女</text>
			</view>
		</uni-popup>

		<uni-popup type="bottom" ref="tipPopup" :maskClick="maskClick">
			<view class="popup-content">
				<scroll-view scroll-y="true" style="max-height: 800rpx;">
					<view class="tips-title">用户隐私保护指引</view>
					<view style="height: 60rpx;"></view>
					<view class="tips-common">本指引是“肿瘤营养管理与干预”公众号内服务开发者收集、使用和存储你的信息而制定。</view>
					<view style="height: 50rpx;"></view>
					<view class="tips-common">开发者收集的信息</view>
					<view class="tips-common">根据法律规定，开发者仅收集实现肿瘤营养管理与干预功能所必要的信息。</view>
					<view class="tips-common">• 开发者收集你的用户信息（微信昵称、头像、性别、地区），用于注册、登录服务系统。</view>
					<view class="tips-common">• 开发者收集你的病例信息（姓名、性别、出生日期、所患疾病、所在城市、身高、体重、病例照片等），用于给您提供营养管理与干预服务、营养测评服务。</view>
					<view style="height: 40rpx;"></view>
					
					<view class="tips-common">同意接受开发者语音类随访，跟进疾病进展及营养状况。</view>
					<view style="height: 40rpx;"></view>
					<view class="tips-common">开发者对信息的存储</view>
					<view class="tips-common">存储地点：境内 </view>
					<view class="tips-common">存储期限：项目停止运营后及时删除 </view>
					<view style="height: 50rpx;"></view>
					<view class="tips-common">信息的使用规则</view>
					<view class="tips-common">开发者将会在本指引所涵盖的用途内使用收集的信息。</view>
					<view class="tips-common">如开发者使用你的信息超出本指引目的或合理范围，会及时更新本指引，并告知您。</view>
					<view style="height: 50rpx;"></view>
					<view class="tips-common">信息对外提供</view>
					<view class="tips-remind">使用肿瘤营养管理与干预服务，您必须同意授权开发者将您的信息（不限于用户信息和病例信息，也包括营养测评数据）展示给平台医生。平台上的医生有权查看您在平台上保存的所有资料，以给您提供相应的营养管理方案。</view>
					<view style="height: 50rpx;"></view>
					<view class="tips-common">开发者承诺</view>
					<view class="tips-common">• 不会主动共享或转让你的信息至任何第三方，如存在确需共享或转让时，开发者应当直接或确认第三方征得你的明示同意。</view>
					<view class="tips-common">• 不会对外公开披露你的信息，如必须公开披露时，开发者应当向你告知公开披露的目的、披露信息的类型及可能涉及的信息，并征得你的明示同意。</view>
					<view style="height: 50rpx;"></view>
					<view class="tips-common">若你认为开发者未遵守上述约定，或有其他的投诉建议、未成年人个人信息相关问题，可通过以下方式与开发者联系。</view>
					<view class="tips-common">联系电话：400-8585-095</view>
					<view style="height: 50rpx;"></view>
					<view class="tips-common">更新日期：2020-12-02</view>
					<view class="tips-common">生效日期：2020-12-02</view>
				</scroll-view>
				<view class="agree-btn" @click="agree">我已阅读并同意隐私保护指引内容</view>
				<view class="disagree-btn" @click="disagree">不同意</view>
				<view style="height: 30rpx;"></view>
			</view>
		</uni-popup>
		<uni-popup ref="resultPop" type="bottom">
			<view class="i-sex-content">
				<text class="i-sex-title">疾病选择</text>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view>
						<view v-for="(item,index) in inllList" :key="index" :class="illness==item?'i-sex-item line active':'i-sex-item line'"
						 @click="selectmicResult(item)">{{item}}</view>
					</view>
				</scroll-view>

			</view>
		</uni-popup>

		<uni-popup ref="singleChoosePop" type="bottom">
			<view class="i-sex-content">
				<text class="i-sex-title">{{currentProject.name}}</text>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view>
						<view v-for="(item,index) in currentProject.detailList" :key="index" :class="item.choose==1?'i-sex-item line active':'i-sex-item line'"
						 @click="selectSingle(index)">{{item.content}}</view>
					</view>
				</scroll-view>

			</view>
		</uni-popup>

		<uni-popup ref="multipleChoosePop" type="bottom">
			<view class="i-sex-content">
				<view class="i-sex-title1">
					{{currentProject.name}}
					<view class="i-sex-title-close" @click="sure">关闭</view>
					<view class="i-sex-title-sure" @click="sure">确认</view>

				</view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view>
						<view v-for="(item,index) in currentProject.detailList" :key="index" :class="item.choose==1?'i-sex-item line active':'i-sex-item line'"
						 @click="selectMultiple(index)">
							{{item.content}}
							<image src="../../static/icon/icon_checkbox_selected.png" class="img" v-if="item.choose==1"></image>
						</view>
					</view>
				</scroll-view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	import http from '../../common/http.js'
	export default {

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
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		data() {
			return {
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
		onShow() {
			if (!app.getCache("uid")) return;
			
		},
		methods: {
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
			inputAgeCheck(){
				app.inputAgeCheck().then(res =>{
					if(res.status == 1){
						this.needAge = res.data.ageInput;
					}
				})
			},
			selectmicResult(item) {
				this.illness = item;
				this.$refs.resultPop.close();
			},
			openSelectResult() {
				this.$refs.resultPop.open();
			},

			//单选
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
			bindDateChange(e) {
				this.birthday = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 100;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			previewImage(index) {
				uni.previewImage({
					urls: this.imgList,
					current: index
				})
			},
			remove(index) {
				this.imgList.splice(index, 1);
			},
			choseImg() {
				if (this.imgList.length > 8) {
					app.tip('最多选取9张图片');
					return;
				}
				uni.chooseImage({
					count: 9 - this.imgList.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgList = this.imgList.concat(res.tempFilePaths);
					}
				});
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
				if(this.illness=="其它疾病"&&!this.illnessother){
					app.tip('请输入疾病名称');return;
				}
				if(this.illness=="其它疾病"){
					this.illness=this.illnessother;
				}
				if(!this.code){
					app.tip('请输入验证码');return;
				}
				

				if (this.imgList.length > 0) {
					this.uploadImg();
				} else {
					this.submitRequest();
				}
			},
			uploadImg() {
				let uploadCount = 0;
				for (let i = 0; i < this.imgList.length; i++) {
					let formData = {
						'uid': uni.getStorageSync("uid")
					}
					uni.uploadFile({
						url: '/api' + '/wx/patient/bl/uploadPicture',
						filePath: this.imgList[i],
						name: 'file',
						formData: formData,
						success: (res) => {
							console.log(res.data);
							let data = JSON.parse(res.data);
							if (data.status == 1) {
								uploadCount++;
								this.pathologyUrl = this.pathologyUrl + data.data.pictureUrl + ',';
								console.log('uploadCount==' + uploadCount);
								if (uploadCount == this.imgList.length) {
									//移除最后的逗号
									this.pathologyUrl = this.pathologyUrl.substring(0, this.pathologyUrl.length - 1);
									this.submitRequest();
								}
							}

						},
					});
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
			selectSex(type) {
				if (type == 0) {
					this.$refs.sexPop.open();
				} else {
					this.patientGender = type;
					this.$refs.sexPop.close();
				}
			},

		},

	}
</script>

<style lang="scss">
	.i-sex-content {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		align-items: center;
		padding-top: 30rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.i-sex-title {
			color: #272727;
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;

		}

		.i-sex-title1 {
			color: #272727;
			font-size: 32rpx;
			//font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;
			width: 100%;
			position: relative;

			.i-sex-title-close {
				position: absolute;
				left: 40rpx;
				top: -10rpx;
				font-size: 26rpx;
				color: #999999;
			}

			.i-sex-title-sure {
				position: absolute;
				right: 40rpx;
				top: -10rpx;
				font-size: 26rpx;
				color: #333333;
			}
		}

		.i-sex-item {
			color: #272727;
			font-size: 32rpx;
			padding: 20rpx;
			text-align: center;
			position: relative;

			.img {
				position: absolute;
				width: 26rpx;
				height: 26rpx;
				right: 80rpx;
				top: 30rpx;
			}
		}

		.line {
			border-bottom: 1rpx solid #DDDDDD;
		}

		.active {
			background-color: #F7F7F7;
		}
	}

	.i-picker-container {
		background-color: #FFFFFF;

		.uni-padding-wrap {
			display: flex;
			justify-content: space-between;
			padding: 15rpx 30rpx;
			border-bottom: 1rpx solid #cfcfcf;
			color: #52A29E;
			font-size: 32rpx;
		}

		.i-picker-content {
			height: 450rpx;
			text-align: center;
		}
	}

	.imagelist {
		width: 175rpx;
		height: 175rpx;
		margin-top: 12.5rpx;
		margin-left: 12.5rpx;
		background-color: #D2D2D2;
	}

	.remove-icon {
		position: absolute;
		width: 25rpx;
		height: 25rpx;
		right: 0;
		top: 0;
	}

	.container {
		.title {
			color: #333333;
			font-size: 30rpx;
			margin-left: 44rpx;
			margin-right: 44rpx;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.name-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;flex-wrap: wrap;
			// height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			position: relative;

			.name-tips {
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				min-width: 130rpx;
			}

			.name-input {
				flex: 1;
				margin-left: 30rpx;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
			}

			.name-novalue-input {
				margin-left: 30rpx;
				color: #b2b2b2;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}



			.right-tip {
				position: absolute;
				color: #333333;
				font-size: 30rpx;
				right: 0;
				top: 30rpx;
			}
			
			.code-button {
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

		.sex-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;

			.sex-tips {
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				min-width: 130rpx;
			}

			.sex-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #999999;
				font-size: 15px;
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #007AFF;
			}

			.has-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #4CD964;
			}
		}

		.pic-title {
			color: #333333;
			font-size: 30rpx;
			padding-left: 43rpx;
			padding-top: 30rpx;
		}

		.pic-tip {
			font-size: 28rpx;
			color: #999999;
			padding-top: 20rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
		}

		.pic-content-box {
			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				// justify-content:space-between;
				margin-left: 44rpx;
				margin-right: 44rpx;

				.img-box-first {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					position: relative;
				}

				.img-box {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					margin-left: 31rpx;
					position: relative;
				}

			}

		}

		.upload-box {
			margin-top: 40rpx;
			margin-left: 44rpx;
			height: 60rpx;
			width: 210rpx;
			color: #59A29F;
			border: 2rpx solid #52A29E;
			text-align: center;
			line-height: 60rpx;
		}

		.button-box {
			margin-top: 100px;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 34rpx;
			}
		}

		.popup-content {
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			font-size: 26rpx;

			.tips-title {
				margin-top: 60rpx;
				text-align: center;
				font-size: 34rpx;
				color: #333333;
			}

			.tips-common {
				margin-left: 50rpx;
				margin-right: 50rpx;
				color: #666666;
			}

			.tips-remind {
				margin-left: 50rpx;
				margin-right: 50rpx;
				color: #EA132D;
			}

			.agree-btn {
				text-align: center;
				background-color: #59A29F;
				color: #FFFFFF;
				font-size: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin-top: 20rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;
			}

			.disagree-btn {
				text-align: center;
				background-color: #999999;
				color: #FFFFFF;
				font-size: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin-top: 30rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;

			}
		}
	}
	.otherinput{width:400rpx;flex: unset!important;}
</style>
