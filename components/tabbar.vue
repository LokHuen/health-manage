<template>
	<view>
		<view style="height:140rpx;"></view>
		<view class="flex tabbar" v-if="real||(showCondition&&!real)">
			<view class="tabitem" v-if="hide!=0" @click="tootherpage(list[0])">
				<image :src="now==0?list[0].selected:list[0].img" class="img" mode="aspectFit"></image>
				<view :class="'text '+(now==0?'on':'')">{{list[0].name}}</view>
			</view>
			<view class="tabitem" v-if="(hide!=1)&&showCondition" @click="tootherpage(list[1])">
				<image :src="now==1?list[1].selected:list[1].img" class="img" mode="aspectFit"></image>
				<view :class="'text '+(now==1?'on':'')">{{list[1].name}}</view>
			</view>
			<view class="tabitem" v-if="hide!=2" @click="tootherpage(list[2])">
				<image :src="now==2?list[2].selected:list[2].img" class="img" mode="aspectFit"></image>
				<view :class="'text '+(now==2?'on':'')">{{list[2].name}}</view>
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
			if(localStorage.getItem("showCondition")==1) this.showCondition = true;
			app.allDoctorList().then(res =>{
				if(res.status == 1){
					//数组元素有1个的时候，查到的是自己本身，就是普通的医生
					//大于1的时候，表示主任
					if(!res.data){
						this.showCondition = false;
					}else{
						this.showCondition = res.data.resultList.length>1;
						localStorage.setItem("showCondition",this.showCondition==true?1:0);
					}
					
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
