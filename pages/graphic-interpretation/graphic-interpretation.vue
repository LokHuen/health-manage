<template>
	<view class="contain">

		<view class="flex phonetab">		
			<view class="itemlist" @click="clickthis(1)">
					<view :class="chooseindex==1?'on':''" style="position: relative; display: inline-block;"><text>待解读({{consultCount.forCount}})</text>
					<view class="red-point" v-if="consultCount.forUnread==1"></view>
					</view>
			</view>
	
			<view class="itemlist" @click="clickthis(2)">
				<view :class="chooseindex==2?'on':''" style="position: relative; display: inline-block;"><text>解读完成({{consultCount.overCount}})</text>
				<view class="red-point" v-if="consultCount.overUnread==1"></view>
				</view>

				</view>
		</view>
		
		<view class="list" v-if="listData.length>0">
			<view class="list-box" @click="open(item)" v-for="(item,index) in listData" :key="index">
				<view class="prelative">
					<image class="image" :src="item.portrait" mode="aspectFill"></image>
					<text class="pageredround" v-if="item.doctorRead==0"></text>
				</view>
				<view class="content-box">
					<view class="name">{{item.modifier}}</view>
					<view class="content">{{item.title}}</view>
				</view>
				<view class="last-time">{{item.modifyTime}}</view>
			</view>
		</view>
		<view class="no-data-tip" v-if="listData.length==0">
			<image class="no-data-img" :src="imageUrl+'/image/no_data.png'"></image>
			<view>无数据</view>
		</view>

	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				imageUrl:this.$imageUrl,
				chooseindex:0,
				listData: [{}],
				consultCount:{},
				pageNo: 1,
			}
		},
		onShow(){
			this.pageNo=1;
			this.getListData();
		},
		onLoad(props){
			this.chooseindex = props.status;
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
			clickthis(index) {
				this.chooseindex = index;
				this.pageNo = 1;
				this.getListData();
			},
			open(item){
				uni.navigateTo({
					url:'../chat/index?type=2&id='+item.id,
					// 医生聊天跳转pages/chat/index?type=2&id=咨询id
				});
			},
			getListData(){
				app.chatList({answerStatus:this.chooseindex,pageNo:this.pageNo,pageSize:10}).then(res=>{
					console.log(res)
					if(res.status===1){
						this.consultCount = res.data.consultCount;
						if(this.pageNo===1){
							this.listData = res.data.pageList.list;
						}else{
							if(res.data.pageList.pageCount>this.pageNo){
								this.listData = this.listData.concat(res.data.pageList.list);
							}
						}
					}
					console.log(this.listData)
					uni.stopPullDownRefresh();
				});
			},
			
			
		}
	}
</script>

<style lang="scss">
	.contain {
	    background-color: #F8F8F8;
		min-height: 100vh;
	}

	.flex {
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		// flex-wrap: wrap;
		
		flex-flow:row nowrap;
	}

	.phonetab{
		position: sticky;
		top: 0;
		padding:40rpx 0;
		.itemlist{
			.red-point{
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background-color: #E21414;
				position:absolute;
				right: -15rpx;
				top: 10rpx;
			}
		   
			width: 50%;
			text-align: center;
			color: #343434;
			text{
				font-size: 32rpx;
				border-bottom: 4rpx solid #FFFFFF;
				padding-bottom: 10rpx;

			}
			.on{
				color: #2894EC;
				text{
				border-color: #2894EC;}
			}
		}
	}
    .no-data-tip{
    	padding-top: 65px;
    	text-align: center;
    	font-size: 17px;
    	color: #9A9A9A;
    }
    .no-data-img{
    	width: 185px;
    	height: 120px;
    }
    .list{
    	height: 90px;
    }
	.pageredround{
		top: 15rpx;
		right: -8rpx;
	}
   
    .list-box{
    	position: relative;
    	display: flex;
    	margin-left: 15px;
    	margin-top:10px;
    	margin-right: 15px;
    	height: 60px;
    	font-size: 15px;
    	background-color: #FFFFFF;
    	color: #333333;
    	border-radius: 5px;
    	box-shadow: 1px 1px 5px #999999;
    }
    .image{
    	width: 35px; height: 35px; margin-left: 10px;
    	margin-top: 12.5px;
    }
    .content-box{
    	margin-left: 7px;
    	margin-top: 8px;
    	flex: 1;
    }
    .name{
    	font-size: 13px;
    	margin-top: 1px;
    	margin-left: 0px;
    }
    .content{
    	font-size: 11px;
    	margin-top: 5px;
    	margin-left: 0px;
    	margin-right: 10rpx;
    }
    .last-time{
    	font-size: 11px;
    	right: 10px;
    	top: 10px;
    	position: absolute;
    }
</style>
