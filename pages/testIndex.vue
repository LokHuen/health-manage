<template>
	<view class="testbox">
		<view class="flex">请选择治疗阶段<image src="../static/icon/wenhaoIcon.png" class="question" mode="widthFix" @click="$refs.popup.open()"></image></view>
		<view class="mintext">系统会帮您记录好每一个时间节点的营养状况，助您掌控营养变化趋势。</view>
		<view class="flex chooselist" v-for="(item,index) in chooselist" :key="index">
			<view class="title">{{item.name}}</view>
			<view class="flex" style="flex:1;justify-content:flex-end;">
				<view v-for="(item1,index1) in item.list" :key="index1" :class="'itemlist '+(chooseitem[index].choose==item1?'on':'')" @click="chooseindex(index,index1)">{{item1}}</view>
			</view>
		</view>
		<view class="pagebottombt" @click="submitchoose">确定</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="testbox" style="padding-top:30rpx;background:#fff;border-radius:20rpx 20rpx 0 0;">
			<view class="flex">治疗阶段选择指引</view>
			<view class="mintext">系统会帮您记录好每一个时间节点的营养状况，助您掌控营养变化趋势。</view>
			<view class="flex frameinfo" v-for="(item,index) in frameinfo" :key="index">
				<view class="infoleft">{{item.name}}：</view>
				<view class="inforight">{{item.text}}</view>
			</view>
			<view style="padding:60rpx 0rpx 50rpx;"><view class="pagebottombt1" @click="$refs.popup.close()">确定</view></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				id:1,
				baseUrl:app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				chooselist:[
					{name:'确诊情况',list:["未确诊","已确诊"]},
					{name:'手术治疗',list:["手术前","手术后"]},
					{name:'放疗治疗',list:["放疗前","放疗中","放疗后"]},
					{name:'化疗治疗',list:["化疗前","化疗中","化疗后"]},
					{name:'靶向治疗',list:["靶向前","靶向中","靶向后"]},
					{name:'免疫治疗',list:["免疫前","免疫中","免疫后"]},
					{name:'康复治疗',list:["康复期"]},
				],
				chooseitem:[
					{choose:""},
					{choose:""},
					{choose:""},
					{choose:""},
					{choose:""},
					{choose:""},
					{choose:""},
				],
				chooseclass:"",
				frameinfo:[
					{name:'前',text:"代表您将要进行的下一个治疗阶段，例:您准备进行化疗，选择化疗前。"},
					{name:'中',text:"代表您现在正在进行的治疗阶段，例:您正在进行靶向治疗，选择靶向中。"},
					{name:'后',text:"代表您已结束当前治疗阶段，后续没有安排治疗方案，例:您已完成化疗，没有安排后续的治疗方案，选择化疗后。"},
					{name:'未确诊',text:"疑似，尚未确诊。"},
					{name:'已确诊',text:"刚刚确诊，尚未制定任何治疗方案。"},
					{name:'康复期',text:"您已出院，在家进行家庭康复。"},
				],
			}
		},
		onLoad(options){
			if(options.id){
				this.id = options.id;
			}else{
				this.getSgaType();
			}
			this.$nextTick(()=>{
				if(!app.getCache("zhiyin")) {this.$refs.popup.open();app.setCache("zhiyin",1);}
			})
		},
		onShow(){
			
		},
		methods: {
			getSgaType(){
			    app.getSgaType().then(res =>{
					if(res.status == 1){
						this.id = res.data.sgaType;
					}
				});	
			},
			chooseindex(index,index1){
				this.chooseclass = this.chooselist[index].name;
				if(this.chooseitem[index].choose == this.chooselist[index].list[index1]){
					this.chooseitem[index].choose = "";this.chooseclass = "";
				}else this.chooseitem[index].choose = this.chooselist[index].list[index1];
			},
			submitchoose(){
				let longtext = "";
				for (var i = 0; i < this.chooseitem.length; i++) {
					if(this.chooseitem[i].choose){
						this.chooseclass = this.chooselist[i].name;
						if(longtext) longtext += "," + this.chooseitem[i].choose;
						else longtext = this.chooseitem[i].choose;
					}
				}
				if(!this.chooseclass) {app.tip("请选择其中一个选项");return;}
				app.getReplyRecord({surveyId:this.id,phase:longtext}).then(res=>{
					app.tip("保存成功");
					uni.navigateTo({
						url:"/pages/patient/test-questions?id="+this.id
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.testbox{
		padding:30rpx 60rpx 0;
		
		.question{
			width:30rpx;
			}
		.mintext{
			font-size:28rpx;
			color: #666666;
			padding:20rpx 0 60rpx;
			}
		.chooselist{
			padding-bottom:40rpx;
			.title{
				margin-right:42rpx;
				font-size: 30rpx;
				}
			.itemlist{
				line-height:68rpx;
				min-width:142rpx;
				box-sizing:border-box;
				padding:0 10rpx;
				margin:4rpx 20rpx 0rpx 0;
				color: #666666;
				border: 1rpx solid #ddd;
				border-radius: 6rpx;
				font-size: 30rpx;
				text-align:center;
				}
			.itemlist:last-child{
				margin-right:0;
				}
			.itemlist.on{
				color:#fff;
				background: #57C1BB;
				border-color: #62e5e1;
				}
		}
		.frameinfo{
			align-items:unset;
			font-size: 28rpx;
			padding-bottom:28rpx;
			
			.infoleft{
				color: #52A29E;
				}
			.inforight{
				color: #666666;
				flex:1;
				}
		}
		.pagebottombt{
			position:fixed;
			bottom:60rpx;
			left:62rpx;
			right:62rpx;
			color:#fff;
			text-align:center;
			font-size: 28rpx;
			line-height:88rpx;
			background: #57C1BB;
			border-radius: 45rpx;
			}
		.pagebottombt1{
			color:#fff;
			text-align:center;
			font-size: 28rpx;
			line-height:88rpx;
			background: #57C1BB;
			border-radius: 45rpx;
			}
	}
</style>
