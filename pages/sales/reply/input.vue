<template>
	<view class="addressbox">
		<turnback> </turnback>
		<view class=" contentbox">
			<view class="flex numbox">
				总数量：{{count}}
				<view style="padding-right:40rpx">合计金额：{{amount}}元</view>
			</view>
			<view class="flex linebox" style="">
				<view class="lefttext" style="width:100%;">申请原因：</view>
				<textarea class="rightarea textinput" placeholder="请输入" auto-height v-model="form.applyReason" />
			</view>
			<view class="flex linebox">
				<view class="lefttext">领取方式</view>
				<view class="rightarea flex">
					<view :class="'sendtype'+(sendtype==1?' on':'')" @click="changesendtype(1)">快递</view>
					<view :class="'sendtype'+(sendtype==2?' on':'')" @click="changesendtype(2)">自提</view>
				</view>
			</view>
			<view v-show="sendtype==1">
			<view class="flex linebox">
				<view class="lefttext">收件人</view>
				<input class="rightarea" v-model="form.linkman" maxlength="25" placeholder="收件人姓名" />
			</view>
			<view class="flex linebox">
				<view class="lefttext">手机号码</view>
				<input class="rightarea" type="number" v-model="form.phone" placeholder="11位手机号码" />
			</view>
			<view class="flex linebox">
				<view class="lefttext">寄送区域</view>
				<picker name="picker" class="rightarea" @click="openareachoose()" disabled="true" change="bindPickerChange" :value="form.region" >
				    <view style="padding:36rpx 0;">{{form.region[0]?(form.region[0]+" "+form.region[1]+" "+form.region[2]):"请选择收件人所在省市区"}}</view>
				</picker>
			</view>
			<view class="flex linebox" style="">
				<view class="lefttext">具体地址</view>
				<textarea class="rightarea" placeholder="街道门牌信息" auto-height v-model="form.address" />
			</view>
			</view>
		</view>
		<view class="buttonbox">
			<view class="buttonitem" @click="saveanduse">提交申请</view>
		</view>
		<n-address ref="addr" @up-data="upData" ></n-address>
	</view>
</template>

<script>
	import turnback from "../../../components/turnback.vue"
	const app = getApp();
	import nAddress from "components/n-address/n-address.vue"
	export default {
		components:{nAddress,turnback},
		data() {
			return {
				imgUrl:app.globalData.imageUrl,
				id:undefined,
				form:{
					linkman:"",
					phone:"",
					region:[],
					address:"",
					applyReason:"",
				},
				sendtype:1,//配送方式
				chooselist:[],
				amount:0,
				count:0,
			}
		},
		onLoad(options){
			this.chooselist = app.replychooselist||[];
			// this.id = options.id||this.id;
			// if(this.id) {
			// 	this.init();
			// }
			let num = 0,count=0;
			for (let i = 0; i < this.chooselist.length; i++) {
				num += this.chooselist[i].num * this.chooselist[i].price;
				count += this.chooselist[i].num;
			}
			this.amount = num.toFixed(2);
			this.count = count;
		},
		onShow(){
			
		},
		methods: {
			init(){
				app.getareadetail({id:this.id}).then(res => {
					res.data.region = res.data.region.split(" ");
					res.data.defaultAddress = res.data.defaultAddress==1?true:false;
					this.form = res.data;
				});
			},
			saveanduse(){
				let data = JSON.parse(JSON.stringify(this.form));
				//判断
				if(!data.applyReason) {app.tip("请填写申请原因");return;}
				if(this.sendtype==1){
					if(!data.linkman) {app.tip("请填写收件人");return;}
					if(!data.region[0]) {app.tip("请选择寄送区域");return;}
					if(!data.address) {app.tip("请填写详细地址");return;}
					if(!/^1[0-9]{10}$/.test(data.phone)) {
					    app.tip('请填写11位手机号码')
					    return;
					}
				}
				let reg = data.region.join(" ");
				data.region = reg;
				data.sendType = this.sendtype;
				data.applyDetailList = [];
				for (let i = 0; i < this.chooselist.length; i++) {
					data.applyDetailList.push({materialId:this.chooselist[i].id,amount:this.chooselist[i].num});
				}
				data.applyDetailList = JSON.stringify(data.applyDetailList);
				app.loading("保存中");
				app.materialapply(data).then(res => {
					app.tip(res.msg);
					app.reloadreplylist = true;
					setTimeout(()=>{
						uni.redirectTo({
							url:"/pages/sales/reply/list"
						})
					},1000)
				});
			},
			deletethis(){
				uni.showModal({
				    content: '删除该地址？',
				    success:(res)=>{
				        if (res.confirm) {
				            app.deletearea({id:this.id}).then(res => {
				            	app.tip(res.msg);
				            	setTimeout(()=>{
				            		uni.navigateBack({
				            			delta:1
				            		})
				            	},1000)
				            });
				        }
				    }
				});
			},
			bindPickerChange(e){
				this.form.region = e.detail.value;
			},
			upData (e) {
			    // console.log(e)
				this.form.region = e.regionArr;
			},
			//省市区
			openareachoose(){
				this.$refs['addr'].popUp();
			},
			switchChange: function (e) {
			   this.form.defaultAddress = e.target.value;
			},
			changesendtype(index){
				this.sendtype = index;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.numbox{padding:30rpx 0;justify-content:space-between;}
	.contentbox{padding:0 30rpx;background:#fff;
		.linebox{
			border-bottom: 1px solid #ddd;min-height:126rpx;font-size:32rpx;
			.lefttext{width:130rpx;padding-right:36rpx;}
			.rightarea{flex:1;color: #888;font-size:32rpx;}
			.textinput{min-height:80rpx;width:100%;flex:unset;border-radius:10rpx;border:2rpx solid #ddd;padding:16rpx;box-sizing:border-box;margin-top:10rpx;}
			textarea{line-height:40rpx;height:40rpx;padding-top:4rpx;}
		}
		.linebox:last-child{border-color:transparent;}
	}
	.buttonbox{padding:100rpx 74rpx 40rpx;
		.buttonitem{line-height: 80rpx;background: #007AFF;border-radius: 10rpx;font-size: 34rpx;color: #FFFFFF;margin-bottom:30rpx;text-align:center;}
	}
	.defaulttip{font-size: 28rpx;color: #9B9B9B;padding:30rpx;}
	.bbuttom{border-top:20rpx solid #F7F7F7;}
	page{background: #F7F7F7;}
	.sendtype{
		text-align:center;line-height: 54rpx;width:120rpx;border-radius:10rpx;margin:0 0 0 26rpx;border:1rpx solid #ddd;
		&.on{background:#007AFF;color:#fff;border-color:#007AFF;}
	}
</style>
