<script>
	import {
		api
	} from "common/api";
	export default {
		globalData: {
			baseUrl: "https://bgjdapi-test.ttxyw.cn",
			imageUrl: "https://bgjdapi-test.ttxyw.cn/upload/mini",
			mydata: 1,
			// AppID:"wx152a400c7aa92a9e",
			// AppSecret:"05ba4e0d30666a44d2c5be39fabf759d",
		},
		onLaunch: function() {
			console.log('App Launch');
			this.getupdate();
			uni.baseImageUrl='https://bgjdapi-test.ttxyw.cn/upload/mini'
			//更新用户信息
			if(this.getCache("token")) this.saveinfo();
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
			getupdate() {
				//小程序自动更新
				if (uni.canIUse('getUpdateManager')) {
					const updateManager = uni.getUpdateManager()
					updateManager.onCheckForUpdate(function(res) {})
					updateManager.onUpdateReady(function() {
						updateManager.applyUpdate()
					})
					updateManager.onUpdateFailed(function() {
						uni.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
						})
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '当前版本过低，请升级到最新微信版本。'
					})
				}
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
				uni.setStorageSync(key, data);
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
			saveinfo(info){
				if(info){
					this.saveuserinfo({
						mobile:info.phone||"",
						wxPortrait:info.avatarUrl||"",
						wxNickname:info.nickName||"",
						province:info.province||"",
						city:info.city||"",
						sex:info.gender||"",
					}).then(res=>{})
				}else{
					uni.getUserInfo({
					      provider: 'weixin',
						  lang:"zh_CN",
					      success: res=>{
							this.saveinfo(res.userInfo);
					      }
					});
				}
			},
			replymessage(){ //调起订阅消息
				uni.requestSubscribeMessage({
				  tmplIds: ['BVYdVBTURSCuk2i9oH6IDIjwlimlMdaCcQE37vnYVe8'], 
				  success:(res)=>{},
				  fail:(res)=>{},
				})
			},
			uploadImage(url, success, data) {
				let formData = {'tkbgjd-token':uni.getStorageSync("token"),...data}
				uni.chooseImage({
					success: (res) => {
						const paths = res.tempFilePaths;
						for (let i = 0; i < paths.length; i++) {
							uni.uploadFile({
								url: this.globalData.baseUrl + url,
								filePath: paths[i],
								name: 'file',
								formData:formData,
								success:(res)=>{
									success(JSON.parse(res.data))
								},
							});
						}
					}
				});
			},
			uploadImage2(url, success, data,maxSize) {
				let formData = {'tkbgjd-token':uni.getStorageSync("token"),...data}
				uni.chooseImage({
					success: (res) => {
						const paths = res.tempFilePaths;
						for (let i = 0; i < paths.length; i++) {
							uni.uploadFile({
								url: this.globalData.baseUrl + url,
								filePath: paths[i],
								name: 'file',
								formData:formData,
								success:(res)=>{
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

<style>
	html,
	body,
	page {
		font-family: PingFang SC;
	}
	.prelative{position:relative;}
	.pageredround{width: 12rpx;height: 12rpx;background: #E21313;border-radius: 50%;position: absolute;top:-6rpx;right:-6rpx;}
</style>
