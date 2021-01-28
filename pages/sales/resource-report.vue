<template>
	<view class="container">
		<view class="title-box">
			<view class="left">资源所在区域：</view>
           
			<picker mode="multiSelector" :value="areaIndex" :range="areaList" :range-key="'name'" @columnchange="columnChange" @cancel="hideArea(1)"
			 @change="hideArea(0)" style="flex: 1;">
				<view class="right">
					{{changeArea==1?((province&&city&&hasArea)?(province+city):'请选择地区'):(detailInfo.id?(detailInfo.area):((province&&city&&hasArea)?(province+city):'请选择地区'))}}
				</view>
			</picker>
		</view>

		<view class="list-content" @click="selectType">
			报备类型
			<view :class="type==4?'list-content-right-novalue':'list-content-right'">{{type==0?'医院':(type==1?'科室':(type==2?'医生':'请选择'))}}</view>
		</view>

		<view class="list-content" v-if="type==0||type==1||type==2" @click="selectHospital">
			医院名称
			<view :class="chooseHospital.id?'list-content-right':'list-content-right-novalue'">{{chooseHospital.id?chooseHospital.name:'请选择'}}</view>
		</view>

		<view class="remind" v-if="errMsgInfo.isError==1 &&errMsgInfo.errorType==0">{{errMsgInfo.errMsg}}</view>

		<view class="list-content" v-if="type==1||type==2" @click="fetctOptionList">
			科室名称
			<view :class="Option.code?'list-content-right':'list-content-right-novalue'">{{Option.code?Option.value:'请选择'}}</view>
		</view>

		<view class="remind" v-if="errMsgInfo.isError==1 &&errMsgInfo.errorType==1">{{errMsgInfo.errMsg}}</view>

		<view class="list-content" v-if="type==2">
			医生名字
			<input type="text" class="list-content-input" placeholder="请填写" v-model="doctorName" @input="input" />
		</view>

		<view class="remind" v-if="errMsgInfo.isError==1 &&errMsgInfo.errorType==2">{{errMsgInfo.errMsg}}</view>

		<view class="list-content" @click="selectTechnical" v-if="type==2">
			医生职称
			<view :class="technical?'list-content-right':'list-content-right-novalue'">{{technical?technical.value:'请选择'}}</view>
		</view>

		<view class="title-box" v-if="type!=4">
			<view class="left">{{tipItems[type]}}</view>
		</view>

		<view class="time-box" v-if="type!=4">
			<view class="time-tip">门诊时间</view>
			<view class="all-chose" v-if="type==0" @click="allChose">全选</view>
			<view class="time-item-box" v-for="(item,index) in timeChoseItem">
				<view class="time-item-tip">{{timeItems[index]}}</view>
				<view :class="item[0]==0?'time-detail-noChose':'time-detail-chose'" @click="selectTime(index,0)">上午</view>
				<view :class="item[1]==0?'time-detail-noChose':'time-detail-chose'" @click="selectTime(index,1)">下午</view>
			</view>
			<view class="common-input-box">
				月门诊量预估（人）
				<input type="number" class="commom-input" maxlength="5" v-model="outpatient" @input="patienChange"/>
			</view>
			<view class="common-tip">可以自行修改月门诊量预估数</view>
		</view>

		<view style="margin-top: 20rpx; background-color: #FFFFFF;" v-if="type!=4">
			<view style="height: 10rpx;"></view>
			<view class="common-input-box1">
				每周手术量（台）
				<input type="number" class="commom-input1" maxlength="5" placeholder="请填写台数" v-model="weekOperation" @input="weekOperationChange" />
			</view>

			<view class="common-input-box">
				月手术量预估（台）
				<input type="number" class="commom-input" maxlength="5" v-model="monthOperation" @input="patienChange"/>
			</view>
			<view class="common-tip">可以自行修改月手术量预估数</view>
		</view>


		<view style="margin-top: 20rpx; background-color: #FFFFFF;" v-if="type!=4">
			<view style="height: 10rpx;"></view>
			<view class="common-input-box1">
				主管床位数（张）
				<input type="number" class="commom-input1" maxlength="5" placeholder="请填写张数" v-model="bed1" @input="bedChange" />
			</view>
			
			<view class="common-input-box1">
				主管床位周转天数（天）
				<input type="number" class="commom-input1" maxlength="5" placeholder="请填写天数" v-model="bed2" @input="bedChange" />
			</view>

			<view class="common-input-box">
				月住院病人数预估（人）
				<input type="number" class="commom-input" maxlength="5" v-model="bedCount" @input="patienChange" />
			</view>
			<view class="common-tip">可以自行修改月住院病人预估数</view>
		</view>
        
		<view style="margin-top: 20rpx; background-color: #FFFFFF;" v-if="type!=4">
			<view style="height: 10rpx;"></view>
			
			<view class="common-input-box">
				月患者数量预估（人）
				<input type="number" class="commom-input" maxlength="5" v-model="patientNum" @input="orderChange" />
			</view>
			<view class="common-tip">可以自行修改月患者数量预估数</view>
		</view>
		
		<view style="margin-top: 20rpx; background-color: #FFFFFF;" v-if="type!=4">
			<view style="height: 20rpx;"></view>
			<view class="common-input-box2">
				客情关系程度
				<view :class="coefficient?'commom-input2':'commom-input2-noChose'" @click="openCoefficient">
                   {{coefficient?coefficient.value:'请选择'}}
				</view>
			</view>
			<view style="height: 50rpx;"></view>
		
		</view>
		
		<view style="margin-top: 20rpx; background-color: #FFFFFF;" v-if="type!=4">
			<view style="height: 10rpx;"></view>
			
			<view class="common-input-box">
				成交单数预估
				<input type="number" class="commom-input" maxlength="5" v-model="orderNum" />
			</view>
			<view class="common-tip">可以自行修改成交预估数</view>
		</view>


		<view class="list-content" v-if="type!=4">
			备注内容
			<input type="text" class="list-content-input" placeholder="选填项" v-model="remark" />

		</view>
		<view class="button-box">
			<button type="default" class="button" @click="submit">提交</button>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="popup-bg">
				<view style="height: 40rpx;"></view>
				<view class="popup-title">
					选择报备类别
					<image src="../../static/icon/close_new.png" mode="widthFix" class="popup-close" @click="close"></image>
				</view>
				<view style="height: 5rpx;"></view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view class="sport-item" v-for="(item,index) in types" :key="index" @click="selectsportType(index)">
						{{item}}
					</view>
				</scroll-view>
				<view style="height: 20rpx;"></view>
			</view>
		</uni-popup>

		<uni-popup ref="sucesPpopup" type="center">
			<view class="suc-popup-bg">
				<image src="../../static/end.png" class="suc-img"></image>
				<view class="suc-title">报备成功</view>
				<view class="btn-box">
					<view class="btn" @click="close">
						关闭
					</view>
					<view style="width: 30rpx;"></view>
					<view class="btn" @click="contentin">
						继续添加
					</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="hospitalPop" type="bottom" @change="hospitalPopChange">
			<view class="i-sex-content">
				<text class="i-sex-title">医院选择</text>
				<view class="search-box">
					<image src="../../static/icon/incon_search.png" class="search-icon" mode="widthFix"></image>
					<input type="text" v-model="searchHospital" class="search-input" placeholder="搜索" maxlength="10" @input="searchHospitalChange" />
				</view>
				<view style="height: 20rpx;"></view>
				<scroll-view scroll-y="true" style="height: 750rpx;" @scrolltolower="loadmore">
					<view>
						<view v-for="(item,index) in hospitalItems" :key="index" :class="chooseHospital.id==item.id?'i-sex-item line active':'i-sex-item line'"
						 @click="selectHospitalItem(item)">{{item.name}}</view>
					</view>
				</scroll-view>

			</view>
		</uni-popup>

		<uni-popup ref="optionPop" type="bottom" @change="optionPopChange">
			<view class="i-sex-content">
				<text class="i-sex-title">科室选择</text>
				<view class="search-box">
					<image src="../../static/icon/incon_search.png" class="search-icon" mode="widthFix"></image>
					<input type="text" v-model="searchOption" class="search-input" placeholder="搜索" maxlength="10" @input="searchOptionChange" />
				</view>
				<view style="height: 20rpx;"></view>
				<scroll-view scroll-y="true" style="height: 750rpx;">
					<view>
						<view v-for="(item,index) in OptionList" :key="index" :class="Option.code==item.code?'i-sex-item line active':'i-sex-item line'"
						 @click="selectOptionItem(item)">{{item.value}}</view>
					</view>
				</scroll-view>

			</view>
		</uni-popup>

		<uni-popup ref="technicalPopup" type="bottom">
			<view class="popup-bg">
				<view style="height: 40rpx;"></view>
				<view class="popup-title">
					选择医生职称
					<image src="../../static/icon/close_new.png" mode="widthFix" class="popup-close" @click="close"></image>
				</view>
				<view style="height: 5rpx;"></view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view class="sport-item" v-for="(item,index) in technicalItems" :key="index" @click="selectTechnicalItem(item)">
						{{item.value}}
					</view>
				</scroll-view>
				<view style="height: 20rpx;"></view>
			</view>
		</uni-popup>
		
		<uni-popup ref="coefficientPopup" type="bottom">
			<view class="popup-bg">
				<view style="height: 40rpx;"></view>
				<view class="popup-title">
					客情关系程度
					<image src="../../static/icon/close_new.png" mode="widthFix" class="popup-close" @click="close"></image>
				</view>
				<view style="height: 5rpx;"></view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view class="sport-item" v-for="(item,index) in coefficientItems" :key="index" @click="selectCoefficient(item)">
						{{item.value}}
					</view>
				</scroll-view>
				<view style="height: 20rpx;"></view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	const app = getApp();
	import http from '../../common/http.js'
	export default {

		data() {
			return {
				areaIndex:[0,0],
				changeArea:0,
				detailInfo:{},
				id:1,
				searchHospital: '',
				searchOption: '',
				types: ['医生', '科室', '医院'],
				type: 4,
				hasArea: false,
				cityId: '',
				city: '',
				provinceId: '',
				province: '',
				areaList: [
					[],
					[]
				],
				hospitalItems: [],
				chooseHospital: {},
				OptionList: [],
				Option: {},
				doctorName: '',
				remark: '',
				errMsgInfo: {
					errMsg: '',
					isError: 0,
					errorType: 4
				},
				dpageno: 1,
				technicalItems: [],
				technical: '',
				tipItems: ['请汇总医院信息填写以下内容', '请汇总科室信息填写以下内容', '请汇总医生信息填写以下内容'],
				timeItems: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
				timeChoseItem: [
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0]
				],
				outpatient: 0, //月门诊量预估（人）
				weekOperation: '', //周手术量
				monthOperation: 0 ,//月手术量
				bed1:'',//主管床位数（张）
				bed2:'',//主管床位周转天数（天）
				bedCount:0,//月住院病人数预估（人）
				patientNum:0,//月患者数量预估（人）
				coefficientItems:[],
				coefficient:'',//系数
				orderNum:0,//成交单数预估 
			}
		},
		onLoad(props) {
			if(props.id){
				this.id = props.id;
				this.getDetailRequest();
			}
            this.getTechnicalTitleList();
			if(!props.id){
				this.getAreaRequest();
			}
			this.relateListRequest();
		
		},
		onShow() {

		},
		methods: {
			//如果是点详情进来的，就要请求详情数据
			getDetailRequest(){
				app.resourceReportDetail({id:this.id}).then(res =>{
					if(res.status == 1){
						this.detailInfo = res.data;
						this.cityId = res.data.cityId;
						this.provinceId = res.data.provinceId;
						this.hasArea = true;
						//res.data.type==1?(this.type=2):(res.data.type==2?this.type=1:this.type=0);
						this.type = res.data.type-1;
						this.doctorName = res.data.doctorName;
						
						
						this.outpatient = res.data.monthlyConsulting;//月门诊量预估（人）
						this.weekOperation = res.data.weeklyOperate;//每周手术量（台）
						this.orderNum =res.data.completedOrder;// 成交单数
						this.patientNum = res.data.monthlyPatient;
						this.bedCount = res.data.monthlyInpatient;// 月住院病人人数预估（人）
						this.bed2 = res.data.masterBedsDay;// 主管床位周转天数（天）
						this.bed1 = res.data.masterBeds;// 主管床位数（张）
						this.monthOperation = res.data.monthlyOperate;//月手术量预估（台）
						this.remark = res.data.remark;
						
						//筛选客情关系// relate:this.coefficient.key,  // 客情关系
						
						app.relateList().then(res =>{
							if(res.status == 1){
								for (var i = 0; i < res.data.length; i++) {
									if(res.data[i].key==this.detailInfo.relate){
										this.coefficient = res.data[i];
										break;
									}
								}
							}
						});
						
						//涮选时间  JSON.parse(jsonString);
						var timeList =  JSON.parse(this.detailInfo.consultingHours);
						for (var i = 0; i < timeList.length; i++) {
						    var	time=timeList[i].split(' ');
							for (var j = 0; i < this.timeItems.length; j++) {
								if(this.timeItems[j] == time[0]){
									if(time.length==3){
										//选择了上午跟下午
										this.timeChoseItem[j] = [1,1];
									}else{
										//只选了上午或者下午
										if(time[1]=='上午'){
											this.timeChoseItem[j] = [1,0];
										}else{
											this.timeChoseItem[j] = [0,1];
										}
									}
									break;
								}
							}
						}
						this.$forceUpdate();
						
						//筛选医生职称
						app.technicalTitleList().then(res =>{
							if(res.status ==1){
								for (var i = 0; i < res.data.length; i++) {
									if(res.data[i].key==this.detailInfo.technicalTitle){
										this.technical = res.data[i];
										break;
									}
									
								}
							}
						});
						
						//筛选科室
					   app.getOptionList({
					   	code: 'depart'
					   }).then(res => {
					   	if (res.status == 1) {
					   		for (var i = 0; i < res.data.length; i++) {
					   			if(res.data[i].code==this.detailInfo.departId){
									this.Option = res.data[i];
									break;
								}
					   		}
					   	}
					   });
						
						//筛选医院
						app.hospitalList({
							provinceId: this.provinceId,
							cityId: this.cityId,
							pageNo: 1,
						}).then(res => {
							if (res.status == 1) {
								for (var i = 0; i < res.data.list.length; i++) {
									if(res.data.list[i].id == this.detailInfo.hospitalId){
										this.chooseHospital = res.data.list[i];
									    
										break;
									}
								}
								
							}
						
						})
						
						
						//筛选地区
						http.get(http.urls.get_all_province).then((res) => {
							this.areaList[0] = res.data;
							for (var i = 0; i < this.areaList[0].length; i++) {
								var province = this.areaList[0][i];
								if(province.id== this.provinceId){
									this.areaIndex[0] = i;
									break;
								}
							}
							http.get(http.urls.get_citys, {
								id: this.provinceId
							}).then((res) => {
								this.areaList[1] = res.data;
								for (var i = 0; i < this.areaList[1].length; i++) {
									var city = this.areaList[1][i];
									if(city.id == this.cityId){
										this.areaIndex = [this.areaIndex[0],i];
										break;
									}
								}
								this.$forceUpdate();
							})
						});
						
						
					}
				});
			},
			//客情关系程度 列表
			relateListRequest(){
				app.relateList().then(res =>{
					if(res.status == 1){
						this.coefficientItems = res.data;
					}
				});
			},
			//获取地区
			getAreaRequest(){
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
				});
			},
			//医生的职称
			getTechnicalTitleList(){
				app.technicalTitleList().then(res =>{
					if(res.status ==1){
						this.technicalItems = res.data;
					}
				});
			},
			
			//全选
			allChose(){
				for (var i = 0; i < this.timeChoseItem.length; i++) {
					this.timeChoseItem[i] = [1,1];
				}
				this.outpatient = 14 * 120;
				this.calculatePatientNum();
				this.$forceUpdate();
			},
			orderChange(){
				this.orderNum = Math.floor(this.coefficient.key*Number(this.patientNum)*0.01);
			},
			//计算订单数量
			calculateOrder(){
				if(!this.coefficient || !this.patientNum){
					//return;
				}
				this.orderNum = Math.floor(this.coefficient.key*this.patientNum*0.01);
			},
			openCoefficient(){
			   this.$refs.coefficientPopup.open();
		    },
			selectCoefficient(item){
				this.coefficient = item;
				this.calculateOrder();
			   this.$refs.coefficientPopup.close();
			},
			calculatePatientNum(){
			   this.patientNum = this.outpatient+this.monthOperation+this.bedCount;
			   this.calculateOrder();
			},
			patienChange(){
				this.patientNum = Number(this.outpatient)+Number(this.monthOperation)+Number(this.bedCount);
				this.calculateOrder();
			},
			bedChange(e){
				if(!this.bed1 || !this.bed2){
					return;
				}
			   // 月住院病人数预估= 30除以“主管床位周转天数”* 主管床位数
				this.bedCount =Math.floor((30/this.bed2)*this.bed1); 
				this.calculatePatientNum();
			},
			weekOperationChange(e) {
				this.monthOperation = e.detail.value * 4;
				this.calculatePatientNum();
			},
			selectTime(index, noon) {
				var time = this.timeChoseItem[index][noon];
				time == 0 ? time = 1 : time = 0;
				this.timeChoseItem[index][noon] = time;
				//outpatient
				var count = 0;
				for (var i = 0; i < this.timeChoseItem.length; i++) {
					var time = this.timeChoseItem[i];
					if (time[0] == 1) {
						count++;
					}
					if (time[1] == 1) {
						count++;
					}
				}
				this.outpatient = count * 120;
				this.calculatePatientNum();
				this.$forceUpdate();
			},
			selectTechnicalItem(item) {
				this.technical = item;
				this.$refs.technicalPopup.close();
			},
			selectTechnical() {
				this.$refs.technicalPopup.open();
			},
			loadmore() {
				this.dpageno++;
				this.fetchHospitalList(this.dpageno);
			},
			hospitalPopChange(e) {
				if (e.show == false) {
					this.searchHospital = '';
				}
			},
			optionPopChange(e) {
				if (e.show == false) {
					this.searchOption = '';
				}
			},
			searchHospitalChange(e) {
				this.fetchHospitalList();
			},
			searchOptionChange(e) {
				this.fetctOptionList();
			},
			input() {
				this.errMsgInfo.isError = 0;
			},
			selectType() {
				if (!this.hasArea) {
					app.tip('请选择地区')
					return
				}
				this.$refs.popup.open();
			},
			selectsportType(index) {
				if (index == 2) {
					this.doctorName = '';
					this.Option = {};
					this.type = 0;
				}
				if (index == 1) {
					this.doctorName = '';
					this.type = 1;
				}
				if (index == 0) {
					this.type = 2;
				}

				this.$refs.popup.close();
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
					for (var i = 0; i < this.areaList[0].length; i++) {
						var province = this.areaList[0][i];
						if(province.id== this.provinceId){
							this.areaIndex[0] = i;
							break;
						}
					}
					http.get(http.urls.get_citys, {
						id: this.provinceId
					}).then((res) => {
						this.areaList[1] = res.data
						if (this.areaList[1] && this.areaList[1].length > 0) {
							let obj2 = this.areaList[1][0];
							this.city = obj2.name
							this.cityId = obj2.id
							this.chooseHospital = {};
						}
						this.areaIndex = [this.areaIndex[0],0];
						this.$forceUpdate();
					})
					
				} else if (column == 1) {
					this.city = obj.name
					this.cityId = obj.id
					this.chooseHospital = {};
				}
				this.changeArea = 1;
			},
			submit() {
			
				if (!this.hasArea) {
					app.tip('请先填好报备资料');
					return;
				}
				if (this.type == 4) {
					app.tip('请先填好报备资料');
					return;
				}

				if (this.type == 0) {
					if (!this.chooseHospital.id) {
						app.tip('请先填好报备资料');
						return;
					}
				}
				if (this.type == 1) {
					if (!this.chooseHospital.id || !this.Option.code) {
						app.tip('请先填好报备资料');
						return;
					}
				}
				if (this.type == 2) {
					if (!this.chooseHospital.id || !this.Option.code || !this.doctorName || !this.technical || !this.coefficient) {
						app.tip('请先填好报备资料');
						return;
					}
				}
				if(this.outpatient ==0){
					app.tip('请先填好报备资料');
					return;
				}
				
				if(!this.weekOperation || !this.bed1 || !this.bed2){
					app.tip('请先填好报备资料');
					return;
				}
				
				let consultingHours = [];//门诊时间
				for (var i = 0; i < this.timeChoseItem.length; i++) {
				   var timeItem =this.timeChoseItem[i];
				   if(timeItem[0]==1 ||timeItem[1]==1){
					    var day = this.timeItems[i];
						if(timeItem[0]==1){
							day = day+' '+'上午';
						}
						if(timeItem[1]==1){
							day = day+' '+'下午';
						}
						consultingHours.push(day);
				   }
				}
				if(consultingHours.length==0){
					app.tip('请先填好报备资料');
					return;
				}
				consultingHours = JSON.stringify(consultingHours);
				//console.log([consultingHours class])
				let data = {
					hospitalId: this.chooseHospital.id,
					provinceId: this.provinceId,
					cityId: this.cityId,
					area: this.province + this.city,
					type: this.type + 1,
					consultingHours:consultingHours,
					monthlyConsulting:this.outpatient,//月门诊量预估（人）
					weeklyOperate:this.weekOperation, //每周手术量（台）
					monthlyOperate:this.monthOperation, //月手术量预估（台）
					masterBeds:this.bed1,  // 主管床位数（张）
					masterBedsDay:this.bed2, //// 主管床位周转天数（天）
					monthlyInpatient:this.bedCount,   // 月住院病人人数预估（人）
					monthlyPatient:this.patientNum,   // 月患者人数预估（人）
					relate:this.coefficient.key,  // 客情关系
					completedOrder:this.orderNum  // 成交单数
				}
				if (this.remark) {
					data = {
						...data,
						remark: this.remark
					}
				}
				if (this.type == 1) {
					data = {
						...data,
						departId: this.Option.code,
					}
				}
				if (this.type == 2) {
					data = {
						...data,
						departId: this.Option.code,
						doctorName: this.doctorName,
						technicalTitle:this.technical.key
					}
				}
				if(this.id){
					data = {
						...data,
						id:this.id
					}
				}
				app.saveResource(
					data
				).then(res => {
					if (res.status == 1) {
						this.$refs.sucesPpopup.open();
					} else if (res.status == -103) {
						if (this.type == 0) {
							this.errMsgInfo.errMsg = '该医院已存在报备记录'
						} else if (this.type == 1) {
							this.errMsgInfo.errMsg = '该科室已存在报备记录'
						} else {
							this.errMsgInfo.errMsg = '该医生已存在报备记录'
						}
						this.errMsgInfo.isError = 1;
						this.errMsgInfo.errorType = this.type;
					}
				})


			},
			close() {
				uni.navigateBack({

				})

			},
			//继续添加
			contentin() {
				this.remark = '';
				this.doctorName = '';
				this.Option = {};
				this.chooseHospital = {};
				for (var i = 0; i < this.timeChoseItem.length; i++) {
					this.timeChoseItem[i] = [0,0];
				}
				this.outpatient = 0;
				this.weekOperation = '';
				this.monthOperation = 0;
				this.bed1 = '';
				this.bed2 = '';
				this.bedCount = 0;
				this.patientNum = 0;
				this.coefficient = '';
				this.orderNum = 0;
				this.technical = '';
				//如果是继续添加，要把之前传进来的id置空
				this.id = '';
				this.$refs.sucesPpopup.close();

			},
			selectHospital() {
				if (!this.hasArea) {
					app.tip('请选择地区');
					return;
				}
				this.fetchHospitalList();
			},
			fetchHospitalList(page = 1) {
				app.hospitalList({
					provinceId: this.provinceId,
					cityId: this.cityId,
					name: this.searchHospital,
					pageNo: page,
				}).then(res => {
					if (res.status == 1) {
						if (page > res.data.pageCount) return;
						this.hospitalItems = page == 1 ? res.data.list : this.hospitalItems.concat(res.data.list);
						this.$refs.hospitalPop.open();
						this.errMsgInfo.isError = 0;
					}

				})
			},
			selectHospitalItem(item) {
				this.chooseHospital = item;
				this.$refs.hospitalPop.close();
			},
			fetctOptionList() {
				if (!this.chooseHospital.id) {
					app.tip('请先选择医院');
					return;
				}
				app.getOptionList({
					code: 'depart',
					value: this.searchOption
				}).then(res => {
					if (res.status == 1) {
						this.OptionList = res.data;
						this.$refs.optionPop.open();
						this.errMsgInfo.isError = 0;
					}
				});
			},
			selectOptionItem(item) {
				this.Option = item;
				this.$refs.optionPop.close();
			}

		},

	}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: #F5F6F6;
		overflow-y: auto;

		.title-box {
			margin-top: 30rpx;
			margin-left: 30rpx;
			font-size: 26rpx;
			display: flex;

			.left {
				color: #333333;
			}

			.right {
				color: #4B8BE8;
			}

			.sex-value {
				padding-right: 0;
				color: #999999;
				font-size: 15px;
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #007AFF;
			}

			.has-value {
				padding-right: 0;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #4CD964;
			}
		}

		.list-content {
			margin-top: 20rpx;
			padding-left: 30rpx;
			height: 90rpx;
			line-height: 90rpx;
			position: relative;
			background-color: #FFFFFF;
			font-size: 28rpx;
			color: #333333;

			.list-content-right {
				position: absolute;
				color: #333333;
				right: 30rpx;
				top: 0;
			}

			.list-content-right-novalue {
				position: absolute;
				color: #999999;
				right: 30rpx;
				top: 0;
			}

			.list-content-input {
				position: absolute;
				color: #333333;
				right: 30rpx;
				top: 26rpx;
				text-align: right;
				font-size: 28rpx;
				width: 500rpx;
			}
		}

		.remind {
			font-size: 26rpx;
			margin-top: 10rpx;
			margin-left: 30rpx;
			color: #E21414;
		}

		.button-box {
			//position: fixed;
			margin-top: 100rpx;
			bottom: 0;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #4B8BE8 !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}

		.popup-bg {
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0px 0px;

			.popup-title {
				height: 50rpx;
				font-size: 30rpx;
				color: #707578;
				text-align: center;
				position: relative;

				.popup-close {
					position: absolute;
					width: 36rpx;
					height: 36rpx;
					//background-color: #343434;
					right: 30rpx;
				}
			}

			.sport-item {
				font-size: 30rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;
				color: #272727;
				text-align: center;
				height: 96rpx;
				line-height: 96rpx;
				border-bottom: 1rpx solid #CFCFCF;
			}
		}

		.suc-popup-bg {
			background-color: #FFFFFF;
			border: 10rpx;
			height: 450rpx;
			width: 500rpx;

			.suc-img {
				width: 150rpx;
				height: 150rpx;
				margin-top: 40rpx;
				margin-left: 175rpx;
			}

			.suc-title {
				text-align: center;
				margin-top: 20rpx;
				color: #333333;
			}

			.btn-box {
				margin-top: 30rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;
				display: flex;
				height: 70rpx;
				line-height: 70rpx;

				.btn {
					border: 2rpx solid #666666;
					width: 200rpx;
					text-align: center;
					color: #666666;
				}
			}
		}


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

		.search-box {
			margin-left: 0rpx;
			margin-right: 0rpx;
			height: 78rpx;
			background-color: #F7F7F7;
			border-radius: 39rpx;
			display: flex;
			align-items: center;
			width: 85%;

			.search-icon {
				margin-left: 20rpx;
				height: 42rpx;
				width: 42rpx;
			}

			.search-input {
				margin-left: 0rpx;
				height: 78rpx;
				line-height: 78rpx;
				margin-right: 0rpx;
				flex: 1;
			}
		}

		.time-box {
			margin-top: 20rpx;
			position: relative;
			background-color: #FFFFFF;

			//height: 500rpx;
			.time-tip {
				padding-top: 30rpx;
				margin-left: 30rpx;
				font-size: 26rpx;
				color: #333333;
			}

			.all-chose {
				position: absolute;
				font-size: 26rpx;
				color: #4B8BE8;
				right: 50rpx;
				top: 30rpx;
			}

			.time-item-box {
				display: flex;
				height: 80rpx;
				line-height: 80rpx;
				margin-top: 20rpx;

				.time-item-tip {
					font-size: 26rpx;
					color: #333333;
					margin-left: 40rpx;
					width: 20%;
				}

				.time-detail-noChose {
					margin-left: 20rpx;
					width: 30%;
					font-size: 26rpx;
					color: rgba(16, 16, 16, 100);
					text-align: center;
					background-color: rgba(248, 248, 248, 100);
					border: 2rpx solid rgba(187, 187, 187, 100);
					border-radius: 5rpx;
				}

				.time-detail-chose {
					margin-left: 20rpx;
					width: 30%;
					font-size: 26rpx;
					color: #FFFFFF;
					border: 2rpx #4B8BE8 solid;
					border-radius: 5rpx;
					text-align: center;
					background-color: #4B8BE8;
				}

			}
		}

		.common-input-box {
			padding-left: 20rpx;
			margin-top: 40rpx;
			margin-left: 34rpx;
			width: 650rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 6rpx;
			background-color: rgba(227, 227, 227, 100);
			text-align: center;
			border: 2rpx solid rgba(255, 255, 255, 100);
			color: rgba(16, 16, 16, 100);
			font-size: 28rpx;
			text-align: left;
			font-family: PingFangSC-regular;
			position: relative;

			.commom-input {
				position: absolute;
				right: 20rpx;
				top: 16rpx;
				width: 150rpx;
				text-align: right;
			}
		}

		.common-input-box1 {
			padding-left: 20rpx;
			margin-left: 34rpx;
			width: 650rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 6rpx;
			text-align: left;
			border: 2rpx solid rgba(255, 255, 255, 100);
			color: rgba(16, 16, 16, 100);
			font-size: 28rpx;
			text-align: left;
			font-family: PingFangSC-regular;
			border-bottom: 2rpx solid rgba(187, 187, 187, 100);
			position: relative;

			.commom-input1 {
				position: absolute;
				right: 20rpx;
				top: 16rpx;
				width: 190rpx;
				text-align: right;
			}
		}

		.common-tip {
			margin-top: 12rpx;
			padding-bottom: 30rpx;
			margin-left: 36rpx;
			color: rgba(151, 150, 150, 100);
			font-size: 28rpx;
			text-align: left;
			font-family: PingFangSC-regular;
		}



     .common-input-box2 {
			padding-left: 20rpx;
			margin-left: 34rpx;
			width: 650rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 6rpx;
			text-align: left;
			border: 2rpx solid rgba(255, 255, 255, 100);
			color: rgba(16, 16, 16, 100);
			font-size: 28rpx;
			text-align: left;
			font-family: PingFangSC-regular;
			border-bottom: 2rpx solid rgba(187, 187, 187, 100);
			position: relative;

			.commom-input2 {
				position: absolute;
				right: 20rpx;
				top: 0rpx;
				text-align: right;
			}
			.commom-input2-noChose{
				position: absolute;
				right: 20rpx;
				top: 0rpx;
				text-align: right;
				color: #999999;
			}
		}

	}
</style>
