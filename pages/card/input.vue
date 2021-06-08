<template>
	<view class="container">
		<turnback></turnback>
		<view class="headtips">
			请确认或完善医生资料
			<view class="mini">如果资料有误，可以进行修改，修改的内容仅用于物料制作。</view>
		</view>
		<view class="name-box">
			<view class="name-tips">医生名字：</view>
			<input class="name-input" type="text" value="" placeholder="请填写医生的真实名字" v-model="userName" />
		</view>

		<view class="name-box">
			<view class="name-tips">技术职称：</view>
			<input class="name-input" type="text" value="" placeholder="请填写职称" v-model="position" />
		</view>

		<view class="name-box">
			<view class="name-tips">医院名称：</view>
			<input class="name-input" type="text" value="" placeholder="请填写医院名称" v-model="hospital" @blur="setcode(1,0)"/>
			<!-- <text @click="openOption(0)" style="flex: 1;" :class="{empty:!hospital,'no-empty':hospital}">{{hospital?hospital:'请选择医院'}}</text> -->
		</view>

		<view class="name-box">
			<view class="name-tips">科室名称：</view>
			<input class="name-input" type="text" value="" placeholder="请填写科室名称" v-model="department" @blur="setcode(0,1)"/>
			<!-- <text @click="openOption(1)" style="flex: 1;" :class="{empty:!department,'no-empty':department}" >{{department?department:'请选择科室'}}</text> -->
		</view>
		<view class="mintips">如果物料上需要显示医生编码，请完善下方信息</view>
		<view class="name-box">
			<view class="name-tips">医院编码：</view>
			<text @click="openOption(0)" style="flex: 1;" :class="{empty:!hospital,'no-empty':hospital}">{{hospitalCode?hospitalCode:'请选择'}}</text>
		</view>
		
		<view class="name-box">
			<view class="name-tips">科室编码：</view>
			<text @click="openOption(1)" style="flex: 1;" :class="{empty:!department,'no-empty':department}" >{{departmentCode?departmentCode:'请选择'}}</text>
		</view>

		<view class="button-box">
			<button type="default" class="button" @click="submit">确认无误</button>
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
							maxlength="30" @input="inputChange(0,$event)" />
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
							maxlength="30" @input="inputChange(1,$event)" />
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
	</view>
</template>

<script>
	const app = getApp();
	import turnback from "../../components/turnback.vue"
	export default {
		components: {
			turnback
		},
		data() {
			return {
				templateCode:'', //模版编码
				cardType:'', //卡片用户类型 1 医生 2护士 3 业务员
				userId:'', //医生/护士/业务的id
				userName:'', //医生名字/护士名字
				userHospitalId:'', //医院ID
				hospitalCode:"",//医院编码
				departmentCode:"",//科室编码
				position: '', //职称
				hospital: '',
				department: '', //科室
				commiting: false,
				departParams: {
					code: 'depart',
					value: ''
				},
				hospitalParams: {
					provinceId: "",
					cityId: "",
					pageNo: 1,
					name: ''
				},
				hospitalInfo: {
					pageCount: 1,
				},
				hospitalList: [],
				departList: []
			}
		},
		onLoad(props) {
			console.log("app.cardinfo",app.cardinfo)
			this.templateCode = app.cardinfo.templateCode||""; //模版编码
			this.cardType = app.cardinfo.cardType||""; //卡片用户类型 1 医生 2护士 3 业务员
			this.userId = app.cardinfo.userId||""; //医生/护士/业务的id
			this.userName = app.cardinfo.userName||""; //医生名字/护士名字
			this.userHospitalId = app.cardinfo.userHospitalId||""; //医院ID
			this.hospitalCode = app.cardinfo.hospitalCode||"";//医院编码
			this.departmentCode = app.cardinfo.departmentCode||"";//科室编码
			this.position = app.cardinfo.userTitle||""; //职称
			this.hospital = app.cardinfo.hospital||"";
			this.department = app.cardinfo.userDepartment||""; //科室
			this.getHospitals(1)
			this.getOptionList()
			this.setcode(1,1);
		},
		onShow() {
			
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
				this.hospital = item.name;
				this.hospitalCode = `${item.hospitalCode}（${item.name}）`;//医院编码
				if(!item.hospitalCode) this.hospitalCode = "无"
				this.userHospitalId = item.id;
				this.closeOption(0)
			},
			selectDepart(item) {
				this.department = item.value;
				this.departmentCode = `${item.code}（${item.value}）`;//科室编码
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
				
				if (!this.userName || !this.position || !this.hospital || !this.department) {
					app.tip('请输入完整信息');
					return;
				}
				
				if (this.commiting) return;
				this.commiting = true;
				app.loading("保存中");
				app.cardapplysave({
					templateId:app.cardinfo.templateId,
					templateCode:app.cardinfo.templateCode,//模版编码
					cardType:app.cardinfo.cardType,//卡片用户类型 1 医生 2护士 3 业务员
					userId:app.cardinfo.userId,//医生的id
					userName:this.userName||"",//医生名字/护士名字
					userDepartment:this.department||"",//科室
					userHospitalId:this.userHospitalId||"",//医院ID
					userTitle:this.position||"",//医生职称
				}).then(res => {
					app.loaded();
					this.commiting = false;
					if (res.status == 1) {
						let data = {
							...app.cardinfo,
							userName:this.userName,
							userDepartment:this.department,
							userHospitalId:this.hospitalId,
							hospital:this.hospital,
							userTitle:this.position,
						};
						app.cardinfo = data;
						uni.navigateTo({
							url: '/pages/card/create?mid='+res.data.makeId
						});
					}
				}).catch(res => {
					app.tip("保存失败");
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
			setcode(gh,gd){
				if(gh) app.hospitalgetOne({name:this.hospital}).then((res) => {
					if(res.data){
						this.userHospitalId = res.data.id;
						if(res.data.hospitalCode) this.hospitalCode = `${res.data.hospitalCode}（${this.hospital}）`;
						else this.hospitalCode = "无";
					}else{
						this.userHospitalId = "";
						this.hospitalCode = "";
					}
					
				})
				if(gd) app.dictgetOne({code:"depart",value:this.department}).then((res) => {
					if(res.data){
						this.departmentCode = `${res.data.code}（${this.department}）`;
					}else{
						this.departmentCode = "";
					}
				})
			},
		},

	}
</script>

<style lang="scss" scoped>
	.mintips{font-size: 26rpx;color: #333333;padding: 30rpx 34rpx 20rpx;}
	.headtips{
		padding:34rpx 0 34rpx 34rpx;font-size: 32rpx;color: #333333;
		.mini{font-size: 26rpx;color: #999999;padding-top:16rpx;}
	}
	page{background:#F7F8F8;}
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
			padding:30rpx;
			border-radius: 10rpx;
			height: 100rpx;background:#fff;box-sizing: border-box;
			position: relative;margin:0 34rpx 16rpx;
			align-items: center;

			.input-placeholder {
				color: #999999;
				font-size: 32rpx;
			}

			.empty {
				// margin-left: 32rpx;
				font-size: 32rpx;
				color: #999999;
			}

			.no-empty {
				// margin-left: 32rpx;
				font-size: 32rpx;
				color: #333333;
			}

			.name-tips {
				color: #333333;
				font-size: 32rpx;
				height: 100rpx;
				line-height: 100rpx;
			}

			.name-input {
				// margin-left: 32rpx;
				color: #333333;
				font-size: 32rpx;
				height: 100rpx;
				flex: 1;
				line-height: 100rpx;
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
			margin-top: 100rpx;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				width: 81%;
				background-color: #4789EB !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}

	}
</style>
