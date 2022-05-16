<script>
	import {
		api
	} from "common/api";
	export default {
		globalData: {
			baseUrl: "http://weixinapi.cvddr.com",
			imageUrl: "https://bgjdapi.ttxyw.cn/upload/mini",
			mydata: 1,
			channel: 1,
			isSales: false,
		},
		onLaunch: function(option) {

			console.log('App Launch', option);
			uni.baseImageUrl = 'https://bgjdapi.ttxyw.cn/upload/mini'

			let timeStamp = new Date()
			let windowUrl = window.location.href;

			let passurl = ["/pages/sales/register", "/pages/sales"]; //路径白名单
			for (var i = 0; i < passurl.length; i++) {
				if (passurl[i] == window.location.pathname) return;
			}

			if (option.query.isSales || this.globalData.isSales) { //判断业务员
				this.globalData.isSales = true;
				if (!this.getCache("salesToken"))
					uni.reLaunch({
						url: "/pages/sales/register"
					})
				return;
			}
			if(this.getCache("salesToken")&&window.location.pathname.indexOf("/pages/sales/")!=-1) return;
			
			if (option.query.nologin) return;

			let nowtime = new Date().getTime();
			let pretime = this.getCache("time") || nowtime;

			if ((nowtime - pretime) > 172800000) {
				localStorage.removeItem("uid");
				localStorage.setItem("time", nowtime);
			} else if (nowtime == pretime) {
				localStorage.setItem("time", nowtime);
			}

			let optionuid = option.query.uid;
			if (optionuid && (optionuid instanceof Array)) option.query.uid = optionuid[optionuid.length - 1]; //多次登录，uid会变成数组
			var uid = option.query.uid || this.getCache("uid");
			console.log('uid==' + uid);
			uid = parseInt(uid);
			if(option.query.visitor) return;
			if (!uid || isNaN(uid)) {
				window.location.href = this.globalData.baseUrl + '/wx/fwh/user/auth/index?returnUrl=' + encodeURIComponent(
					windowUrl) + "&channel=1";
			} else {
				localStorage.setItem('uid', uid);
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			...api,
			getdata() {
				console.log(this.globalData.mydata)
			},
			setCacheAsync(key, data) {
				//异步保存数据
				uni.setStorage({
					key: key,
					data: data,
					success() {
						console.log(key + ':' + data + '   ' + '保存成功')
					}
				});
			},
			getCache(key) { //获取缓存
				return uni.getStorageSync(key);
			},
			setCache(key, data) { //保存缓存
				localStorage.setItem(key, data);
			},
			tip(text, time) { //消息提示
				uni.showToast({
					title: text || "",
					duration: time || 1500,
					icon: "none",
				});
			},
			loading(content, mask) { //加载中
				content = content || "";
				uni.showLoading({
					title: content,
					mask: mask || false
				});
			},
			loaded() { //取消加载提示
				uni.hideLoading();
			},
			saveinfo(info) {
				if (info) {
					this.saveuserinfo({
						mobile: info.phone || "",
						wxPortrait: info.avatarUrl || "",
						wxNickname: info.nickName || "",
						province: info.province || "",
						city: info.city || "",
						sex: info.gender || "",
					}).then(res => {})
				} else {
					uni.getUserInfo({
						provider: 'weixin',
						lang: "zh_CN",
						success: res => {
							this.saveinfo(res.userInfo);
						}
					});
				}
			},
			replymessage() { //调起订阅消息
				uni.requestSubscribeMessage({
					tmplIds: ['BVYdVBTURSCuk2i9oH6IDIjwlimlMdaCcQE37vnYVe8'],
					success: (res) => {},
					fail: (res) => {},
				})
			},
			uploadImage(url, success, data) {
				let formData = {
					'uid': uni.getStorageSync("uid"),
					...data
				}
				uni.chooseImage({
					success: (res) => {
						const paths = res.tempFilePaths;
						for (let i = 0; i < paths.length; i++) {
							uni.uploadFile({
								url: this.globalData.baseUrl + url,
								filePath: paths[i],
								name: 'file',
								formData: formData,
								success: (res) => {
									success(JSON.parse(res.data))
								},
							});
						}
					}
				});
			},
			uploadImage2(url, success, data, maxSize) {
				let formData = {
					'tkbgjd-token': uni.getStorageSync("token"),
					...data
				}
				uni.chooseImage({
					success: (res) => {
						const paths = res.tempFilePaths;
						for (let i = 0; i < paths.length; i++) {
							uni.uploadFile({
								url: this.globalData.baseUrl + url,
								filePath: paths[i],
								name: 'file',
								formData: formData,
								success: (res) => {
									success(JSON.parse(res.data))
								},
							});
						}
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.pagenodata {
		text-align: center;
		color: #999;
		font-size: 28rpx;
		padding: 30rpx 0 42rpx;
	}

	img {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.edit {
		.uni-radio-wrapper {
			width: 100%;
			display: block;
			padding: 0 30rpx;
			box-sizing: border-box;
		}

		.uni-radio-input {
			float: right;
			margin: -6rpx 0 0 10rpx;
			width: 40rpx;
			height: 40rpx;
		}

		&.editdata .uni-radio-input {
			margin: -1px 0 0 0;
		}

		.uni-radio-input-checked {
			background-color: #52A29E !important;
			border-color: #52A29E !important;
		}

		.uni-checkbox-wrapper {
			width: 100%;
			display: block;
			padding: 0 30rpx;
			box-sizing: border-box;
		}

		uni-checkbox .uni-checkbox-input {
			height: 40rpx;
			float: right;
			margin: -2rpx 0 0 0;
			width: 40rpx;
			box-sizing: border-box;
			border-radius: 4rpx;
			margin-right: 0;
		}

		uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
			color: #FFFFFF;
			// content:"\2714";
			// top: 35%;

		}

		uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
			border-color: #999999;
		}

		uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
			background-color: #52A29E;
			border-color: #52A29E;
		}
	}

	html,
	body,
	page {
		font-family: PingFang SC;
		font-size: 32rpx;
	}

	image {
		height: auto;
	}

	.flex {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.flex.ct {
		justify-content: center;
	}

	.prelative {
		position: relative;
	}

	.pageredround {
		width: 12rpx;
		height: 12rpx;
		background: #E21313;
		border-radius: 50%;
		position: absolute;
		top: -6rpx;
		right: -6rpx;
	}

	.richtext {
		font-size: 26rpx !important;
		color: #666666;
	}

	.commonframebox {
		height: 55vh;
		overflow-y: auto;
		background: #fff;
		border-radius: 20rpx 20rpx 0 0;
		padding: 30rpx 24rpx 30rpx;
		box-sizing: border-box;
	}

	.richtextarea {
		font-size: 30rpx;

		img {
			max-width: 100%;
			height: auto;
		}
	}

	.pagebackground {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F7F8F8;
		z-index: -1;
	}
	.ccblock{display:block;}
</style>
