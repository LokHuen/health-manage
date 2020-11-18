<template>
	<view>
	    <view class="box">
	    	<view class="name">{{'体检人: '+item.subjectName}}</view>
			<view class="title">{{'影像类型：'+(item.mriType==1?'X光':(item.mriType==2?'CT':(item.mriType==3?'磁共振':(item.mriType==4?'彩超':'核医学检查'))))}}</view>
			<view class="title">{{'影像出具机构：'+item.mriOrg}}</view>
			<view style="height: 15px;"></view>
			<view class="title" v-if="item.imgList.length>0">影像图</view>
			<view class="ccimglist" v-if="item.imgList.length>0">
				<view class="imagelist" v-for="(img,index) in item.imgList" :key="index">
					<image class="image" :src="img" mode="aspectFill" @click="previewImage(index)" ></image>
				</view>
			</view>
			<view class="uninterpretation-status" v-if="item.postStatus==0" @click="showAddress"> 
			 请将影像报告寄送到此地址
			 <image class="address-right" :src="imageUrl+'/icon/icon_right.png'"></image>
			</view>
			<view class="interpretation-status" v-if="item.postStatus==1">影像报告已寄送</view>
			<view class="line"></view>
			<view class="title">解读内容</view>
			<view class="content" v-if="item.postStatus==0">待出具</view>
			<view class="content" v-if="item.postStatus==1 && item.interpretContent">
		          {{item.interpretContent}}                          
			</view>
			<view class="remind">
				解读内容仅供参考，具体诊疗建议请咨询医疗机构主治医师。
			</view>
			<view class="person" v-if="item.postStatus==1 && item.interpretContent">{{'解读人：'+item.doctor}}</view>
			<view class="date" v-if="item.postStatus==1 && item.interpretContent">{{'解读日期：'+item.interpretEnd}}</view>
			<view class="bottom-blank"></view>
	    </view>
	</view>
</template>

<script>
	export default {
		props:["item"],
		data() {
			return {
				imageUrl:this.$imageUrl,
				list:[],
			    uninterpretation :true,
			    interpretation :false
			};
		},
		methods:{
			previewImage(res){
				console.log(res)
				uni.previewImage({
					current:res,
				    urls: this.item.imgList
				})
			},
			showAddress(){
               this.$emit("showAddress",this.item.id)
			}
			
		}
		
	
	}
</script>

<style>
	.box{
		margin-top: 10px;
		margin-left: auto;
		margin-right: auto;
		height: auto;
		width: 93%;
		background-color: #FFFFFF;
		color: #333333;
		border-radius: 5px;
		box-shadow: 1px 1px 5px #999999;
	}
	.name{
		font-size: 15px;
		color: #333333;
		margin-left: 15px;
		padding-top: 18px;
	}
	.title{
	    font-size: 15px;
	    color: #333333;
	    margin-left: 15px;
		/* margin-top: 10px; */
		padding-top:10px;
	}
	.content{
		font-size: 15px;
		color: #666666;
		margin-left: 15px;
		margin-top: 15px;
        margin-right: 15px;
	}
	.bottom-blank{
		padding-bottom: 15px;
	}
	.uninterpretation-status{
	    margin-top: 20px;
		margin-left: 15px;
		font-size: 15px;
		color: #2894EC;
		float: flex;
	}
	.interpretation-status{
		margin-top: 20px;
		margin-left: 15px;
		font-size: 15px;
		color: #9A9A9A;
	}
	.address-right{
		width: 7px;
		height: 12px;
		margin-left: 6.5px;
		padding-top: 5px;
	}
	.line{
		background-color:#D2D2D2;
		margin-top: 10px;
		margin-left: 15px;
		margin-right: 15px;
		height: 1px;
	}
	.remind{
		font-size: 13px;
	    color: #E21414;
		 margin-top: 15px;
		 margin-left: 15px;
		 margin-right: 15px;
	}
	.person{
		font-size: 13px;
		color: #9A9A9A;
		margin-top: 20px;
		margin-left: 15px;
		margin-right: 15px
	}
	.date{
		font-size: 13px;
		color: #9A9A9A;
		margin-top: 5px;
		margin-left: 15px;
		margin-right: 15px
	}

	/* .ccimglist{display:flex;flex-wrap:wrap;}
	.ccimglist .imagelist{width:67px;height:67px;margin:10rpx 8px;} */
	.ccimglist{display:flex;flex-wrap:wrap;}
	.ccimglist .imagelist{width:23%;height:20vw;margin:8rpx 1%;}
	.imagelist {position: relative;}
	.imagelist .image{width: 100%;height: 100%;}
	
	
	
	
</style>
