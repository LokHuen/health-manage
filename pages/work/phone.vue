<template>
	<view class="">
		<view class="flex phonetab">
			<view class="itemlist" @click="clickthis(0)"><text :class="chooseindex==0?'on':''">待解读({{mriCount.forCount}})</text></view>
			<view class="itemlist" @click="clickthis(1)"><text :class="chooseindex==1?'on':''">解读中({{mriCount.inCount}})</text></view>
			<view class="itemlist" @click="clickthis(2)"><text :class="chooseindex==2?'on':''">解读完成({{mriCount.overCount}})</text></view>
		</view>
		<view>
			<view class="worklist" v-for="(item,index) in listData" :key="index">
				<view class="flex">
					<image mode="aspectFill" class="personimg" :src="item.portrait"></image>
					<view class="personinfo">
						<view>{{item.creator}}</view>
						<view>{{item.createTime}}</view>
					</view>
				</view>
				<view class="infotext">
					<view>问题描述</view>
					<view>{{item.illness?item.illness:'无'}}</view>
				</view>
				<imglist :list="item.imgList" v-if="item.imgList.length>0"></imglist>
				<view class="flex btlist">
					<view style="flex:1;"></view>
					<view v-show="chooseindex==0" class="btitem" @click="interpret(item)">给予解读</view>
					<view v-show="chooseindex==1" class="btitem" @click="finsh(item)">解读完成</view>
					<view v-show="chooseindex==1" class="btitem" @click="interpret(item)">继续拨打电话</view>
					<view v-show="chooseindex==2" class="end">{{'解读完成 '+item.interpretEnd}}</view>
				</view>
			</view>
		</view>
		<view class="empty-box" v-if="listData.length==0">
			<image :src="imageUrl+'/image/no_data.png'" mode="widthFix"></image>
			<text>无数据</text>
		</view>
		<uni-popup ref="popup" type="dialog">
			<!-- 拨打电话 -->
			<view style="" class="getframe">
				<uni-icons type="closeempty" size="25" class="closebt" color="#ccc" @click="$refs.popup.close()"></uni-icons>
				<view class="imgbox" style="">
					即将拨打用户电话
				</view>
				<view class="getbt" style="" @click="call">确定</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup1" type="dialog">
			<!-- 解读完成 -->
			<view style="" class="getframe">
				<uni-icons type="closeempty" size="25" class="closebt" color="#ccc" @click="$refs.popup1.close()"></uni-icons>
				<view class="imgbox" style="">
					解读完成
				</view>
				<view class="getbt" style="" @click="sureFinsh">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import imglist from "../../components/imgList.vue";
	const app = getApp();
	export default {
		components:{
			imglist
		},
		data() {
			return {
				imageUrl:this.$imageUrl,
				baseUrl:app.globalData.baseUrl,
				chooseindex:0,
				imglist:["/static/images/common/r1.png","/static/images/common/r2.png","/static/images/common/r1.png","/static/images/common/r2.png","/static/images/common/r1.png","/static/images/common/r2.png",],
				listData: [{}],
				mriCount:{},
				pageNo: 1,
				currentIndexItem:{}//当前点击的
			}
		},
		onLoad(props){
			this.chooseindex = props.status;
			this.getListData();
		},
		onShow(){
			
		},
		onPullDownRefresh() {
			this.pageNo = 1;
			this.getListData();
		},
		onReachBottom() {
			this.pageNo ++;
			this.getListData();
		},
		methods: {
			clickthis(index){
				this.chooseindex = index;
				this.getListData();
			},
			getListData(){
				app.telephoneInterpret({interpretStatus:this.chooseindex,pageNo:this.pageNo,pageSize:10}).then(res=>{
					console.log(res)
					if(res.status===1){
						this.mriCount = res.data.mriCount;
						if(this.pageNo===1){
							this.listData = res.data.pageList.list;
						}else{
							if(res.data.pageList.pageCount>this.pageNo){
								this.listData = this.listData.concat(res.data.pageList.list);
							}
						}
					}
					if(this.listData.length>0){
						for (var i = 0; i < this.listData.length; i++) {
							var item = this.listData[i];
							item.imgList = [];
							if(item.reportUrl){
								var imgItems = item.reportUrl.split(',');
								for (var i = 0; i < imgItems.length; i++) {
									var image = imgItems[i];
									item.imgList.push(app.globalData.baseUrl+'/'+image);
								}
								
							}
						}
					}
					console.log(this.listData)
					uni.stopPullDownRefresh();
				});
			},
			finsh(item){
				this.currentIndexItem = item;
				this.$refs.popup1.open();
			},
			interpret(item){
				this.currentIndexItem = item;
				this.$refs.popup.open();
			},
			sureFinsh(){
				console.log("完成解读");
				app.telephoneInterpretFinsh({id:this.currentIndexItem.id}).then(res=>{
					if(res.status===1){
						this.$refs.popup1.close();
						this.pageNo=1;
						this.getListData();
						app.tip('解读完成',1500);
					}
				});
				
			},
			call(){
				this.$refs.popup.close();
		
				uni.makePhoneCall({
				 	// 手机号
				    phoneNumber: this.currentIndexItem.mobile, 
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
						// this.closeService()
						if(this.chooseindex===0){
							//如果是待解读状态就调用这个接口，解读中的就不用调用
							app.telephoneInterpretSaveRcv({id:this.currentIndexItem.id}).then(respon=>{
								if(respon.status===1){
									this.pageNo = 1;
									this.getListData();
								}
							});
						}
						
					},
				
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
						// this.closeService()
					}
					
				  });
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.empty-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	
		image {
			margin-top: 140rpx;
			width: 250rpx;
			height: 240rpx;
		}
	
		text {
			color: #999999;
			font-size: 34rpx;
		}
	}
	.getframe {
		padding: 80rpx 34rpx 60rpx;
		border-radius: 8rpx;
		background: #fff;
		width: 80vw;
		box-sizing: border-box;
	
		.closebt {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
		}
	
		.imgbox {
			text-align:center;font-size: 32rpx;color: #343434;
		}
	
		.getbt {
			width: 260rpx;
			line-height: 78rpx;
			background: #2894EC;
			border-radius: 8rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			margin: 56rpx auto 0;
			text-align: center;
		}
	}
	.worklist{margin:10rpx 40rpx 26rpx;box-shadow: 0px 0px 9rpx 2rpx rgba(0, 0, 0, 0.18);border-radius: 10rpx;padding:30rpx;box-sizing:border-box;
		.personimg{width: 75rpx;height: 75rpx;border-radius: 2px;margin-right:30rpx;}
		.personinfo{flex:1;
			view:nth-child(1){font-size: 32rpx;color: #343434;padding-bottom:10rpx;}
			view:nth-child(2){font-size: 26rpx;color: #9A9A9A;}
		}
		.infotext{
			view:nth-child(1){font-size: 32rpx;color: #343434;padding:40rpx 0 30rpx;}
			view:nth-child(2){font-size: 30rpx;color: #666666;padding-bottom:40rpx;}
		}
		.btlist{padding:30rpx 0 10rpx;
			.btitem{line-height: 78rpx;text-align:center;background: #2894EC;border-radius: 8rpx;color:#fff;
font-size: 34rpx;margin-left:20rpx;min-width:260rpx;box-sizing:border-box;padding:0 28rpx;}
			.end{font-size: 26rpx;color: #9A9A9A;width:100%;}
		}
	}
	.flex{display: flex;align-items:center;flex-wrap:wrap;}
	.phonetab{position: sticky;top:0;padding:40rpx 0;background: #fff;z-index: 9;
		.itemlist{width: 33%;text-align: center;
			text{font-size: 32rpx;color: #343434;border-bottom:4rpx solid transparent;padding-bottom:10rpx;}
			.on{color: #2894EC;border-color:#2894EC;}
		}
	}
</style>
