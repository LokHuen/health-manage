<template>
	<view>
		<view style="height:140rpx;"></view>
		<view class="flex tabbar">
			<view class="tabitem" v-for="(item,index) in list" :key="index" v-if="hide!=index" v-show="(index==1&&showCondition)||index!=1" @click="tootherpage(item)">
				<image :src="now==index?item.selected:item.img" class="img" mode="aspectFit"></image>
				<view :class="'text '+(now==index?'on':'')">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	export default {
		props:{
			hide:{
				default:10,
			},
			now:{
				default:0,
			},
			real:{
				default:true,
			},
		},
		data() {
			return {
				showCondition:false,
				list:[
					{
						name:"首页",
						img:"/static/doctor/1.png",
						selected:"/static/doctor/11.png",
						path:"/pages/doctor/nutrition-manage",
						path1:"/pages/showdata/nutrition-manage",
					},
					{
						name:"科室",
						img:"/static/doctor/2.png",
						selected:"/static/doctor/22.png",
						path:"/pages/department/index",
						path1:"/pages/showdata/department",
					},
					{
						name:"服务",
						img:"/static/doctor/3.png",
						selected:"/static/doctor/33.png",
						path:"/pages/doctor/serve",
					},
				]
			};
		},
		created(){
			if(!this.real) this.showCondition = true;
			app.allDoctorList().then(res =>{
				if(res.status == 1){
					//数组元素有1个的时候，查到的是自己本身，就是普通的医生
					//大于1的时候，表示主任
					if(this.real) this.showCondition = res.data.resultList.length>1;
				}
			});
		},
		methods:{
			tootherpage(item){
				let url = this.real==true?item.path:item.path1
				uni.redirectTo({
					url:url
				})
			}
		},
	}
</script>

<style scoped lang="scss">
.tabbar{
	position: fixed;bottom:0;right:0;left:0;z-index:999;background:#fff;border-top:1rpx solid #eee;padding:10rpx 30rpx 6rpx;box-sizing: border-box;justify-content: space-around;
	.tabitem{
		.img{width: 60rpx;height: 60rpx;}
		.text{
			font-size:30rpx;color:#999;text-align: center;
			&.on{color:#333;}
		}
	}
}
</style>
