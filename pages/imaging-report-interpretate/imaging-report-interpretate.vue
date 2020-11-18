<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<imaging-report-interpretate-list @showAddress = "showAddress" :item="item"></imaging-report-interpretate-list>
		</view>
		<view class="empty-box" v-if="list.length==0">
			<image :src="imageUrl+'/image/no_data.png'" mode="widthFix"></image>
			<text>无数据</text>
		</view>
		
		<view style="height: 50px;"></view>
		<uni-popup ref="popup" type="center" :mask-click="false">
		      <view class="box">
		      	<view class="top">
					<view class="title">请将影像报告寄送到此地址</view>
					<image class="image-close" :src="imageUrl+'/icon_close.png'" @click="hideAddress"></image>
				</view>
				<view class="address-box">
					<view class="address-tips">{{'地 址 ：'}}</view>
					<view class="address-content">{{address}}</view>
				</view>
				<view class="person">{{'收   件   人 ：'+name}}</view>
				<view class="person">{{'联系电话：'+mobile}}</view>
				<button class="button" type="default" @click="savePost">如已寄送，请点此确认</button>
				<view style="height: 25px;"></view>
		      </view>
		 </uni-popup>
		
	</view>
</template>

<script>
	var app = getApp()
	import imagingReportInterpretateList from '../../components/imaging-report-interpretate/imaging-report-interpretate-list.vue'
	export default {
		components:{
			imagingReportInterpretateList
		},
		data() {
			return {
			   imageUrl:this.$imageUrl,
			   list:[],
			   addressInfo:{},
			   address:'',
			   name:'',
			   mobile:'',
			   id:'',
			}
		},
		methods: {
			showAddress(e){
				//通过详情的接口去拿到地址电话名字信息
				this.id = e;
				app.interpretMriDetail({id:this.id}).then(res=>{
					if(res.status===1){
						this.address = res.data.rcvAddress;
						this.name = res.data.rcvName;
						this.mobile = res.data.rcvTelephone;
						this.$refs.popup.open()
					}
				
				})
			
			},
			hideAddress(){
				this.$refs.popup.close()
			},
			savePost(){
				
				app.savePost({id:this.id}).then(res=>{
					if(res.status===1){
						this.hideAddress();
						app.tip('确认成功',1500);
					    this.getListData();
					}
				})
			},
			getListData(){
				app.myInterpretList({}).then(res=>{
					if(res.status===1){
						this.list = res.data;
						
						if(this.list.length>0){
							for (var i = 0; i < this.list.length; i++) {
								var item = this.list[i];
								item.imgList = [];
								if(item.mriUrl){
								     var imageItems = item.mriUrl.split(',');
								     for (var j = 0; j < imageItems.length; j++) {
								     	var img = imageItems[j];
								     	item.imgList.push(app.globalData.baseUrl+'/'+img);
								     }
								}
							}
						}
						
						console.log(this.list);
					}
					
				})
			}
			
		},
		onLoad(){
		  this.getListData();
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
	.box{
		height: auto;
		width: 640rpx;
		margin:auto;
		background-color: #FFFFFF;
		border-radius: 4px;
	}
	.top{
		display: flex;
	}
	.title{
		color: #2894EC;
		font-size: 15px;
		margin-left: 20px;
		padding-top: 20px;
		flex: 1;
	}
	.image-close{
	   width: 15px;
	   height: 15px;
	   padding-top: 20px;
	   margin-right: 20px;
	}
	.address-box{
		margin-top: 20px;
		display: flex;
		font-size: 16px;
		color: #333333;
	}
	.address-tips{
	   margin-left: 20px;
	   width: 80px;
	}
	.address-content{
		padding-right: 18px;
	}
	.person{
		margin-left: 20px;
		margin-top: 10px;
		padding-right: 18px;
		font-size: 16px;
		color: #333333;
	}
	.button{
		background-color: #2894EC !important;
		border-radius: 4px;
		color: #FFFFFF !important;
		margin-top: 29px;
		width: 240px;
		height: 39px;
		font-size: 17px;
	}

</style>
