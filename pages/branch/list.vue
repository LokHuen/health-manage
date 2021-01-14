<template>
	<view class="listbox">
		<view class="addnewbranch" @click="toadd()">新增管理帐号</view>
		<view>帐号列表</view>
		<view class="branchlist" v-for="(item,index) in list" :key="index">
			<view class="flex" style="padding-bottom:20rpx;"><text style="padding-right:60rpx;">用户名：{{item.accountCode}}</text>使用人：{{item.accountName}}</view>
			<view >
				<text class="changtext" @click="toadd(item.id)">修改</text>
				<text class="changtext" @click="deleteone(item.id)">删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				info:{pageCount:1},
				list:[],
				pageNo:1,
			}
		},
		onLoad(options){
			
		},
		onShow(){
			this.getlist(1);
		},
		onReachBottom(){
			this.getlist(++this.pageNo);
		},
		methods: {
			getlist(pageNo) {
				if(pageNo>this.info.pageCount) return;
				app.accountlist({pageNo}).then(res => {
					this.info = res.data;
					this.list = pageNo==1?res.data.list:this.list.concat(res.data.list);
				})
			},
			toadd(id=""){
				uni.navigateTo({
					url:"/pages/branch/add?id="+id
				})
			},
			deleteone(id){
				uni.showModal({
				    title: '',
				    content: '删除该账号？',
				    success: (res)=>{
				        if (res.confirm) {
				            app.accountdelete({id}).then(res => {
								app.tip(res.msg);
				            	this.getlist(1);
				            })
				        }
				    }
				});
			},
		}
	}
</script>

<style lang="scss">
	.listbox{
		padding:0 38rpx;font-size:30rpx;
		.changtext{padding-right:60rpx;color:#BF0909;}
		.branchlist{background-color: rgba(248, 248, 248, 100);margin-top:30rpx;border-radius:10rpx;box-sizing:border-box;padding:38rpx;}
	}
	.addnewbranch{line-height:96rpx;margin:42rpx 0rpx;background-color: rgba(248, 248, 248, 100);border-radius:10rpx;text-align:center;}
</style>
