<template>
	<view class="container">
		<view class="line-space"></view>
		<view class="name-box">
			<view class="name-tips">姓名</view>
			<input class="name-input" type="text" value="" placeholder="请填写医生的真实名字" v-model="name" />
		</view>

		<view class="name-box">
			<view class="name-tips">职称</view>
			<input class="name-input" type="text" value="" placeholder="请填写职称" v-model="position" />
		</view>

		<view class="name-box">
			<view class="name-tips">单位</view>
			<input class="name-input" type="text" value="" placeholder="请填写医院名称" v-model="hospital" />
			<text @click="openOption(0)" style="flex: 1;" :class="{empty:!hospital,'no-empty':hospital}"
				v-if="false">{{hospital?hospital:'请选择医院'}}</text>
		</view>

		<view class="name-box">
			<view class="name-tips">科室</view>
			<input class="name-input" type="text" value="" placeholder="请填写科室名称" v-model="department" />
			<text @click="openOption(1)" style="flex: 1;" :class="{empty:!department,'no-empty':department}"
				v-if="false">{{department?department:'请选择科室'}}</text>
		</view>
		
		<view class="name-box" style="align-items:flex-start;">
			<view class="name-tips">个人简介</view>
			<textarea class="info-input" type="text" value="" placeholder="请填写" v-model="intro" />
		</view>
		<view class="name-box" style="align-items:flex-start;">
			<view class="name-tips">帐号头像</view>
			<view class="imagebox" @click="chooseimg(1)">
				<view v-if="!headimg" class="flex upimgbox ct"><uni-icons type="plusempty" size="30" color="#ccc"></uni-icons></view>
				<image v-if="headimg" class="upimgbox" :src="headimg" mode="aspectFit"></image>
				<view class="uptext">上传</view>
			</view>
		</view>
		<view class="name-box" style="align-items:flex-start;border-bottom:none;">
			<view class="name-tips">工作照</view>
			<view class="imagebox" @click="chooseimg(2)">
				<view v-if="!workimg" class="flex upimgbox ct"><uni-icons type="plusempty" size="30" color="#ccc"></uni-icons></view>
				<image v-if="workimg" class="upimgbox" :src="workimg" mode="aspectFit"></image>
				<view class="uptext">上传</view>
				<view class="uptext other">可上传上半身工作照，当患者在CNMI.CN网站上查询志愿者信息时，患者能看到此张照片</view>
			</view>
		</view>

		<view class="button-box">
			<button type="default" class="button" @click="submit">保 存</button>
		</view>


		<uni-popup ref="hospitalPop" type="bottom">
			<view class="popup-box flexc">
				<view class="flexc head">
					<view class="flex title-box"><text class="popup-title">选择医院</text>
						<image src="../../static/icon_close.png" style="width: 32rpx;height: 32rpx;"
							@click="closeOption(0)">
						</image>
					</view>
					<view class="search-box flex">
						<image src="../../static/icon/incon_search.png" class="search-icon" mode="widthFix"></image>
						<input type="text" v-model="hospitalParams.name" class="search-input" placeholder="搜索"
							maxlength="10" @input="inputChange(0,$event)" />
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;"
					@scrolltolower="getHospitals(hospitalParams.pageNo+1)">
					<view v-for="(item,idex) in hospitalList" :class="{'option-item':true,selected:item.name==hospital}"
						@click="selectHospital(item)">
						<text>{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="departPop" type="bottom">
			<view class="popup-box flexc">
				<view class="flexc head">
					<view class="flex title-box"><text class="popup-title">选择科室</text>
						<image src="../../static/icon_close.png" style="width: 32rpx;height: 32rpx;"
							@click="closeOption(1)">
						</image>
					</view>
					<view class="search-box flex">
						<image src="../../static/icon/incon_search.png" class="search-icon" mode="widthFix"></image>
						<input type="text" v-model="departParams.value" class="search-input" placeholder="搜索"
							maxlength="10" @input="inputChange(1,$event)" />
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view v-for="(item,idex) in departList"
						:class="{'option-item':true,selected:item.value==department}" @click="selectDepart(item)">
						<text>{{item.value}}</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<view v-if="preimg" style="position: fixed;left:0;right:0;top:0;bottom:0;">
			<avatar selWidth="280px" selHeight="360px" ref='avatar' @upload="myUpload" :avatarSrc="preimg" avatarStyle="width: 280px; height: 360px; margin: 40px;"></avatar>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			avatar
		},
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				name: '',
				position: '', //职称
				hospital: '',
				department: '', //科室
				intro:"",
				bindSale: 1, //	绑定销售id
				isSend: false, // 是否发送验证码
				commiting: false,
				departParams: {
					code: 'depart',
					value: ''
				},
				hospitalParams: {
					pageNo: 1,
					name: ''
				},
				hospitalInfo: {
					pageCount: 1,
				},
				hospitalList: [],
				departList: [],
				imgindex:1,
				preimg:"",
				headimg:"",
				workimg:"",
			}
		},
		onLoad(props) {
			this.bindSale = props.bindSale || 1;
			this.getHospitals(1)
			this.getOptionList()
			app.doctorBusinessCard({uid:app.getCache('uid')}).then(res => {
				if (res.status == 1) {
					this.name = res.data.doctorName;
					this.position = res.data.technicalTitle;
					this.hospital = res.data.hospital;
					this.department = res.data.department;
					this.intro = res.data.intro;
					this.headimg = res.data.portrait;
					this.workimg = res.data.workPhoto;
				}
			});
		},
		onShow() {
			if (app.getCache('uid')) {
				
			}
		},
		methods: {
			openOption(depart) {
				if (depart == 1) {
					this.$refs.departPop.open()
				} else {
					this.$refs.hospitalPop.open()
				}
			},
			closeOption(depart) {
				if (depart == 1) {
					this.$refs.departPop.close()
				} else {
					this.$refs.hospitalPop.close()
				}
			},
			selectHospital(item) {
				this.hospital = item.name
				this.closeOption(0)
			},
			selectDepart(item) {
				this.department = item.value
				this.closeOption(1)
			},
			inputChange(depart) {
				if (depart == 1) {
					this.getOptionList()
				} else {
					this.getHospitals(1)
				}
			},
			submit() {
				if (!this.name ||
					!this.position ||
					!this.hospital ||
					!this.department) {
					app.tip('请输入完整信息');
					return;
				}
				if (this.commiting) return;
				this.commiting = true;
				app.loading("保存中");
				app.doctorsaveInfo({
					doctorName: this.name,
					technicalTitle: this.position,
					hospital: this.hospital,
					department: this.department,
					intro: this.intro,
					portrait:this.headimg,
					workPhoto:this.workimg,
				}).then(res => {
					app.loaded();
					this.commiting = false;
					if (res.status == 1) {
						uni.reLaunch({
							url:"/pages/doctor/doctor-center"
						})
					}
				}).catch(res => {
					app.loaded();
					this.commiting = false;
				});
			},
			
			getHospitals(pageNo = 1) {
				if (this.hospitalInfo.pageCount >= pageNo) {
					this.hospitalParams.pageNo = pageNo
					app.hospitalList(this.hospitalParams).then((res) => {
						this.hospitalInfo = res.data
						if (pageNo == 1) {
							this.hospitalList = res.data.list
						} else {
							if (this.hospitalInfo.pageCount >= pageNo) {
								this.hospitalList = this.hospitalList.concat(res.data.list)
							}
						}
					})
				}
			},
			getOptionList() {
				app.getOptionList(this.departParams).then((res) => {
					this.departList = res.data
				})
			},
			chooseimg(index){
				this.imgindex = index;
				uni.chooseImage({
				    count: 1, //默认1
				    success: (res)=>{
					    this.preimg = res.tempFilePaths[0];
				    }
				});
			},
			myUpload(rsp) {
				this.preimg = "";
				if(rsp.path){
					if(this.imgindex==1){
						this.headimg = rsp.path;
					}else{
						this.workimg = rsp.path;
					}
					this.uploadimg();
				}
				else this.preimg = "";
				
			},
			uploadimg(){
				let img;
				if(this.imgindex==1){
					img = this.headimg;
				}else{
					img = this.workimg;
				}
				uni.uploadFile({
					url: '/api' + "/wx/file/uploadPicture",
					filePath: img,
					name: 'file',
					formData: {
						"module": "doctor",
						'salesToken':localStorage.getItem("salesToken"),
						'uid': localStorage.getItem("uid"),
						'channel':app.globalData.channel,
					},
					success: (rq) => {
						let data = JSON.parse(rq.data);
						if(this.imgindex==1){
							this.headimg = this.baseUrl +data.data.pictureUrl;
						}else{
							this.workimg = this.baseUrl +data.data.pictureUrl;
						}
					},
					complete: re => {
						app.loaded();
					}
				})
			},
		},

	}
</script>

<style lang="scss" scoped>
	.uptext{
		color:#555;padding-top:10rpx;
		&.other{color:#aaa;font-size:28rpx;}
	}
	.upimgbox{
		border:2rpx solid #ccc;width:160rpx;height:160rpx;
	}
	.container {
		.popup-box {
			display: flex;
			flex-direction: column;
			background-color: #ffffff;
			border-radius: 16rpx 16rpx 0 0;
			padding-top: 32rpx;
			height: 720rpx;

			.head {
				.title-box {
					position: relative;
					justify-content: center;

					image {
						position: absolute;
						top: 0rpx;
						right: 40rpx;
					}
				}

				.popup-title {
					margin-bottom: 10rpx;
					font-size: 36rpx;
					color: #333333;
				}

				.search-box {
					background-color: #F7F7F7;
					border-radius: 38rpx;
					padding: 10rpx 24rpx;
					margin: 10rpx 32rpx;

					.search-icon {
						width: 32rpx;
						height: 32rpx;
						margin-right: 12rpx;
					}

					input {
						font-size: 32rpx;
						color: #333333;
						flex: 1;
					}
				}
			}

			.option-item {
				width: 100%;
				padding: 20rpx 0;
				font-size: 32rpx;
				color: #333333;
				text-align: center;
				border-bottom: 1rpx solid #eee;
			}

			.selected {
				background-color: #f7f7f7;
			}
		}

		.title {
			color: #333333;
			font-size: 34rpx;
			margin-left: 44rpx;
			margin-right: 44rpx;
			padding-top: 30rpx;
			padding-bottom: 30rpx;
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.name-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			// height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			position: relative;
			align-items: center;

			.input-placeholder {
				color: #999999;
				font-size: 32rpx;
			}

			.empty {
				margin-left: 32rpx;
				font-size: 32rpx;
				color: #999999;
			}

			.no-empty {
				margin-left: 32rpx;
				font-size: 32rpx;
				color: #333333;
			}

			.name-tips {
				color: #333333;
				font-size: 32rpx;
				height: 100rpx;width:130rpx;
				line-height: 100rpx;
			}

			.name-input {
				margin-left: 32rpx;
				color: #333333;
				font-size: 32rpx;
				height: 100rpx;
				flex: 1;
				line-height: 100rpx;
			}
			.info-input {
				margin-left: 32rpx;
				color: #333333;
				font-size: 32rpx;
				height: 120rpx;
				flex: 1;margin-top:20rpx;
				line-height: 60rpx;
			}
			.imagebox{
				flex: 1;margin:34rpx 0 34rpx 32rpx;
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

		.button-box {
			// position: fixed;
			// bottom: 0;
			height: 140rpx;
			width: 100%;
			margin-top: 40rpx;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}

	}
</style>
