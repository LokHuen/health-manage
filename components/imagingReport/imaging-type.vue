<template>
	<view>
		<uni-popup ref="popup" type="bottom">
			<view class="white-background">
				<view class="title-box">
					<view class="">
						<image class="close" :src="imageUrl+'/icon_close.png'" mode="aspectFill" @click="closePopup"></image>
					</view>
					<view class="title"></view>
				</view>
				<view v-for="(item,index) in list" :key="index">
					<view class="itemList" @click="selectIndex(index)">
						<view class="itemContent">{{item}}</view>
					</view>
					<view class="line" v-show="(index!=list.length-1)"></view>
				</view>

				<view class="white-bottom"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				list: ["X光", "CT", "磁共振", "彩超", "核医学检查"],
				imageUrl: this.$imageUrl,
			};
		},
		methods: {
			shopView() {
				this.$refs.popup.open()
			},
			selectIndex(e) {
				console.log(e)
				this.$emit("selectMriType", {
					type:e+1,
					text:this.list[e]
				})
				this.$refs.popup.close()
			},
			closePopup(){
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	.white-background {
		border-radius: 10px;
		height: 330px;
		background-color: #FFFFFF;
	}

	.white-bottom {
		height: 100px;
		background-color: #FFFFFF;
		margin-top: 5px;
	}

	.close {
		width: 13px;
		height: 13px;
		margin-left: 20px;
	}

	.title-box {
		display: flex;
		height: 20px;
		line-height: 20px;
		padding-top: 25px;

	}

	.itemList {
		font-size: 18px;
		text-align: center;
		color: #333333;
		height: 53px;
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: #F6F6F6;
	}

	.itemContent {
		padding-top: 18px;
		height: 17px;
		line-height: 17px;
	}
</style>
