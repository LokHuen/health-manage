<template>
	<!-- 患者完善界面 -->
	<view class="container">
		<view class="title">完善患者资料，医生才能及时掌握您的营养状况和给予康复指导。</view>
		<view class="line-space"></view>
		<view class="name-box">
			<view class="name-tips">* 患者姓名</view>
			<input class="name-input" type="text" value="" placeholder="请填写患者的真实名字" v-model="patientName" />
		</view>
		<view class="sex-box" @click="selectSex(0)">
			<view class="sex-tips">* 患者性别</view>
			<view :class="patientGender==0?'sex-value':'has-value'">{{patientGender==0?'点击选择':patientGender==1?'男':'女'}}</view>
		</view>
		<view class="sex-box">
			<view class="sex-tips">* 出生日期</view>
			<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
				<view :class="birthday?'has-value':'sex-value'">{{birthday?birthday:'点击选择'}}</view>
			</picker>

		</view>
		<view class="sex-box">
			<view class="sex-tips">* 所在城市</view>
			<picker mode="multiSelector" :range="areaList" :range-key="'name'" @columnchange="columnChange" @cancel="areaCancel">
				<view :class="city&&province?'has-value':'sex-value'">{{city&&province?province+' '+city:'点击选择'}}</view>
			</picker>
		</view>
		<view class="name-box">
			<view class="name-tips">* 所患疾病</view>
			<input class="name-input" type="text" value="" placeholder="请填写疾病名称" v-model="illness" />
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
		<view class="pic-title">病历照片</view>
		<view class="pic-tip">上传出院小结（重要）、影像报告等内容，方便医生 评估病情</view>
		<view class="pic-content-box">
			<view class="ccimglist">
				<view v-for="(item,index) in imgList" :key="index" :class="(index%3==0)?'img-box-first':'img-box'">
					<image :src="item" mode="aspectFill" @click="previewImage(index)" class="imagelist"></image>
					<image src="../../static/icon/icon_remove.png" mode="aspectFill" class="remove-icon" @click="remove(index)"></image>
				</view>
			</view>
		</view>
		<view class="upload-box" @click="choseImg">点击上传</view>
		<view style="height: 400rpx;"></view>

		<view class="button-box">
			<button type="default" class="button" @click="submit">提交</button>
		</view>

		<uni-popup ref="sexPop" type="bottom">
			<view class="i-sex-content">
				<text class="i-sex-title">性别选择</text>
				<text :class="patientGender==1?'i-sex-item line active':'i-sex-item line'" @click="selectSex(1)">男</text>
				<text :class="patientGender==2?'i-sex-item active':'i-sex-item'" @click="selectSex(2)">女</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	import http from '../../common/http.js'
	export default {

		onLoad() {
			http.get(http.urls.get_all_province).then((res) => {
				this.areaList[0] = res.data;
				if (this.areaList[0] && this.areaList[0].length > 0) {
					let obj = this.areaList[0][0];
					// this.province = obj.name
					//this.provinceId = obj.id
					http.get(http.urls.get_citys, {
						id: obj.id
					}).then((res) => {
						this.areaList[1] = res.data
						if (this.areaList[1] && this.areaList[1].length > 0) {
							let obj2 = this.areaList[1][0];
							// this.city = obj2.name
							// this.cityId = obj2.id
						}
						this.$forceUpdate();
					})
				}
			})
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
				patientName: '',
				patientGender: 0,
				birthday: '',
				cityId: '',
				city: '',
				provinceId: '',
				province: '',
				illness: '',
				height: '',
				weight: '',
				areaList: [
					[],
					[]
				],
				imgList:[],
				pathologyUrl:'',
			}
		},
		methods: {
			areaCancel() {
				console.log(this.areaList)
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
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			previewImage(index) {
				uni.previewImage({
					urls:this.imgList,
					current:index
				})
			},
			remove(index) {
				this.imgList.splice(index, 1);
			},
			choseImg() {
                 if(this.imgList.length>8){
                 	app.tip('最多选取9张图片');
                 	return;
                 }
                 uni.chooseImage({
                     count: 9-this.imgList.length, //默认9
                     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                     // sourceType: ['album'], //从相册选择
                     success: (res)=>{
                 	    this.imgList = this.imgList.concat(res.tempFilePaths);
                     }
                 });
			},
			submit(){
				if(!this.patientName|| 
				    this.patientGender==0|| !this.birthday ||!this.cityId ||!this.provinceId ||!this.illness||
					!this.weight ||!this.height){
						app.tip('请输入完整信息');
						return;
					}
				if(this.imgList.length>0){
					this.uploadImg();
				}else{
					this.submitRequest();
				}
			},
			uploadImg(){
				let uploadCount = 0;
				for (let i = 0; i < this.imgList.length; i++) {
					let formData = {'uid':uni.getStorageSync("uid")}
					uni.uploadFile({
						url: '/api' + '/wx/patient/bl/uploadPicture',
						filePath: this.imgList[i],
						name: 'file',
						formData:formData,
						success:(res)=>{
							console.log(res.data);
							let data = JSON.parse(res.data);
							if(data.status==1){
								uploadCount ++;
								this.pathologyUrl = this.pathologyUrl+data.data.pictureUrl+',';
								console.log('uploadCount=='+uploadCount);
								if(uploadCount == this.imgList.length){
									//移除最后的逗号
									this.pathologyUrl = this.pathologyUrl.substring(0, this.pathologyUrl.length - 1);
									this.submitRequest();
								}
							}
						    
						},
					});
				}
			},
			submitRequest(){
				app.savePatientInfo({
					patientName:this.patientName,
					patientGender:this.patientGender,
					birthday:this.birthday,
					cityId:this.cityId,
					provinceId:this.provinceId,
					illness:this.illness,
					height:this.height,
					weight:this.weight,
					pathologyUrl:this.pathologyUrl
				}).then(res =>{
					if(res.status==1){
						uni.navigateTo({
							url:'patient-submit-sucess'
						});
					}
				});
			},
			selectSex(type) {
				if(type==0){
					this.$refs.sexPop.open();
				}else{
					this.patientGender=type;
					this.$refs.sexPop.close();
				}
			},
			
		},
		created() {

		}

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
			width: 100%;
			color: #272727;
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;
			// border-bottom: 1rpx solid #DDDDDD;
		}

		.i-sex-item {
			width: 100%;
			color: #272727;
			font-size: 32rpx;
			padding: 20rpx;
			text-align: center;
		}

		.line {
			// border-bottom: 1rpx solid #DDDDDD;
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
			font-size: 15px;
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
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			position: relative;

			.name-tips {
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}

			.name-input {
				margin-left: 30rpx;
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}

			.right-tip {
				position: absolute;
				color: #333333;
				font-size: 15px;
				right: 0;
				top: 30rpx;
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
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}
			.sex-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #999999;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}
			.has-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}
		}

		.pic-title {
			color: #333333;
			font-size: 15px;
			padding-left: 43rpx;
			padding-top: 30rpx;
		}

		.pic-tip {
			font-size: 14px;
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
			position: fixed;
			bottom: 0;
			height: 140rpx;
			width: 100%;

			.button {
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
