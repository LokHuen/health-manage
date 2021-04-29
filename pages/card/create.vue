<template>
	<view class="">
		<turnback></turnback>
		<view class="headtips"></view>
		<view>
			<swiper class="swiperbox" next-margin="20px" previous-margin="30px">
				<!-- a5 -->
				<swiper-item v-if="info.templateCode=='0401'||info.templateCode=='0402'||info.templateCode=='0403'||info.templateCode=='0404'">
					<view :class="'swiperimgbox '+(create?'big':'')" @click="getallimg" id="doctorcode">
						<image v-if="info.cardFrontPic" :src="'/api'+info.cardFrontPic" class="swiperimg" mode="widthFix"></image>
						<view :class="'a5infobox '+(create?'big':'') +(info.templateCode=='0401'?' noall':'')+(info.templateCode=='0402'?' noname':'')+(info.templateCode=='0403'?' nonum':'')">
							<!-- nonum:0403无编号 noname:0402无名字 noall:0401无编号无名字 -->
							<image :src="'/api'+info.qrCode" class="a5img"></image>
							<view class="teamtext">{{info.userHospital}}</view>
							<view class="depttext">
								<view :class="create?'movetext':''">{{info.userDepartment}}</view>
							</view>
							<view v-show="(info.templateCode=='0404')||(info.templateCode=='0403')" class="doctortext">{{info.userName}}  {{info.userTitle||""}}</view>
							<view v-show="(info.templateCode=='0404')||(info.templateCode=='0402')"><view class="numtext">编号：{{info.userCode}}</view></view>
						</view>
					</view>
				</swiper-item>
				<swiper-item v-if="info.templateCode=='0401'||info.templateCode=='0402'||info.templateCode=='0403'||info.templateCode=='0404'">
					<view class="swiperimgbox" @click="getsecondimg(baseUrl+info.cardBackPic)">
						<image :src="baseUrl+info.cardBackPic" class="swiperimg" mode="widthFix"></image>
					</view>
				</swiper-item>
				<!-- a5 -->
				<!-- 60*96 -->
				<swiper-item v-if="info.templateCode=='0101'||info.templateCode=='0102'||info.templateCode=='0103'||info.templateCode=='0104'">
					<view :class="'swiperimgbox '+(create?'big':'')" @click="getallimg" id="doctorcode">
						<image v-if="info.cardFrontPic" :src="'/api'+info.cardFrontPic" class="swiperimg" mode="widthFix"></image>
						<view :class="'a6infobox '+(create?'big':'') +(info.templateCode=='0101'?' noall':'')+(info.templateCode=='0102'?' noname':'')+(info.templateCode=='0103'?' nonum':'')">
							<!-- nonum:0103无编号 noname:0102无名字 noall:0101无编号无名字 -->
							<image :src="'/api'+info.qrCode" class="a6img"></image>
							<view class="teamtext">{{info.userHospital}}</view>
							<view class="depttext">
								<view :class="create?'movetext':''">{{info.userDepartment}}</view>
							</view>
							<view class="doctortext" v-show="(info.templateCode=='0104')||(info.templateCode=='0103')">{{info.userName}}  {{info.userTitle||""}}</view>
							<view v-show="(info.templateCode=='0104')||(info.templateCode=='0102')"><view class="numtext">编号：{{info.userCode}}</view></view>
						</view>
					</view>
				</swiper-item>
				<swiper-item v-if="info.templateCode=='0101'||info.templateCode=='0102'||info.templateCode=='0103'||info.templateCode=='0104'">
					<view class="swiperimgbox" @click="getsecondimg(baseUrl+info.cardBackPic)">
						<image :src="baseUrl+info.cardBackPic" class="swiperimg" mode="widthFix"></image>
					</view>
				</swiper-item>
				<!-- 60*96 -->
				<!-- 绿色 -->
				<swiper-item v-if="info.templateCode=='0201'||info.templateCode=='0202'">
					<view :class="'swiperimgbox '+(create?'big':'')" @click="getallimg" id="doctorcode">
						<image v-if="info.cardFrontPic" :src="'/api'+info.cardFrontPic" class="swiperimg" mode="widthFix"></image>
						<view :class="'greeninfobox '+(create?'big':'') +(info.templateCode=='0201'?' nonum':'')">
							<!-- nonum:0201无编号 -->
							<image :src="'/api'+info.qrCode" class="greenimg"></image>
							<view v-show="info.templateCode=='0202'"><view class="numtext">编号:{{info.userCode}}</view></view>
						</view>
					</view>
					<view class="swiperimgbox" style="margin-top:50rpx;" @click="getsecondimg(baseUrl+info.cardBackPic)">
						<image :src="baseUrl+info.cardBackPic" class="swiperimg" mode="widthFix"></image>
					</view>
				</swiper-item>
				<!-- 绿色 -->
				<!-- 蓝色 -->
				<swiper-item v-if="info.templateCode=='0301'||info.templateCode=='0302'">
					<view :class="'swiperimgbox '+(create?'big':'')" @click="getallimg" id="doctorcode">
						<image v-if="info.cardFrontPic" :src="'/api'+info.cardFrontPic" class="swiperimg" mode="widthFix"></image>
						<view :class="'blueinfobox '+(create?'big':'') +(info.templateCode=='0301'?' nonum':'')">
							<!-- nonum:0301无编号 -->
							<image :src="'/api'+info.qrCode" class="blueimg"></image>
							<view v-show="info.templateCode=='0302'"><view class="numtext">编号：{{info.userCode}}</view></view>
						</view>
					</view>
					<view class="swiperimgbox" style="margin-top:50rpx;" @click="getsecondimg(baseUrl+info.cardBackPic)">
						<image :src="baseUrl+info.cardBackPic" class="swiperimg" mode="widthFix"></image>
					</view>
				</swiper-item>
				<!-- 蓝色 -->
				<!-- 一张长 -->
				<swiper-item v-if="info.templateCode=='0501'">
					<view :class="'swiperimgbox '+(create?'big':'')" @click="getallimg" id="doctorcode">
						<image v-if="info.cardFrontPic" :src="'/api'+info.cardFrontPic" class="swiperimg" mode="widthFix"></image>
						<view :class="'cardinfobox '+(create?'big':'') ">
							<view class="dname">{{info.userName}}</view>
							<view class="work">志愿者</view>
							<view><view class="numtext">{{info.userCode}}</view></view>
						</view>
					</view>
					
				</swiper-item>
				<!-- 一张长 -->
				<!-- 海吉a5 -->
				<swiper-item v-if="info.templateCode=='0701'||info.templateCode=='0702'">
					<view :class="'swiperimgbox '+(create?'big':'')" @click="getallimg" id="doctorcode">
						<image v-if="info.cardFrontPic" :src="'/api'+info.cardFrontPic" class="swiperimg" mode="widthFix"></image>
						<view :class="'haiji_a5infobox '+(create?'big':'') +(info.templateCode=='0701'?' noall':'')">
							<!-- noall:0701无医院 -->
							<image :src="'/api'+info.qrCode" class="haiji_a5img"></image>
							<view v-show="info.templateCode=='0702'">
								<view class="teamtext">{{info.userHospital}}</view>
								<view class="depttext">
									<view :class="create?'movetext':''">{{info.userDepartment}}</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item v-if="info.templateCode=='0701'||info.templateCode=='0702'">
					<view class="swiperimgbox" @click="getsecondimg(baseUrl+info.cardBackPic)">
						<image :src="baseUrl+info.cardBackPic" class="swiperimg" mode="widthFix"></image>
					</view>
				</swiper-item>
				<!-- 海吉a5 -->
				<!-- 海吉60*96 -->
				<swiper-item v-if="info.templateCode=='0601'||info.templateCode=='0602'">
					<view :class="'swiperimgbox '+(create?'big':'')" @click="getallimg" id="doctorcode">
						<image v-if="info.cardFrontPic" :src="'/api'+info.cardFrontPic" class="swiperimg" mode="widthFix"></image>
						<view :class="'haiji_a6infobox '+(create?'big':'') +(info.templateCode=='0601'?' noall':'')">
							<!-- noall:0601无医院 -->
							<image :src="'/api'+info.qrCode" class="haiji_a6img"></image>
							<view v-show="info.templateCode=='0602'">
								<view class="teamtext">{{info.userHospital}}</view>
								<view class="depttext">
									<view :class="create?'movetext':''">{{info.userDepartment}}</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item v-if="info.templateCode=='0601'||info.templateCode=='0602'">
					<view class="swiperimgbox" @click="getsecondimg(baseUrl+info.cardBackPic)">
						<image :src="baseUrl+info.cardBackPic" class="swiperimg" mode="widthFix"></image>
					</view>
				</swiper-item>
				<!-- 海吉60*96 -->
				<!-- 推广 -->
				<swiper-item v-if="info.templateCode=='0801'">
					<view :class="'swiperimgbox '+(create?'big':'')" @click="getallimg" id="doctorcode">
						<image v-if="info.cardFrontPic" :src="'/api'+info.cardFrontPic" class="swiperimg" mode="widthFix"></image>
						<view :class="'outinfobox '+(create?'big':'') ">
							
							<image :src="'/api'+info.qrCode" class="outimg"></image>
							<view class="teamtext flex ct">扫码关注<image src="../../static/index/right.png" mode="widthFix" class="rightarrow"></image>信息注册<image src="../../static/index/right.png" mode="widthFix" class="rightarrow"></image>患者管理</view>
							<view class="depttext">
								<view :class="create?'movetext':''">推广志愿者</view>
							</view>
							<view class="doctortext">{{info.userName}}</view>
							<view ><view class="numtext">【编号：{{info.userCode}}】</view></view>
						</view>
					</view>
				</swiper-item>
				<swiper-item v-if="info.templateCode=='0801'">
					<view class="swiperimgbox" @click="getsecondimg(baseUrl+info.cardBackPic)">
						<image :src="baseUrl+info.cardBackPic" class="swiperimg" mode="widthFix"></image>
					</view>
				</swiper-item>
				<!-- 推广 -->
			</swiper>
		</view>
		<view class="foottips">点击上图后长按保存</view>
		<view class="footerbt flex">
			<view class="btitem" @click="toreply">申请制作</view>
			<view class="btitem other" @click="$refs.pop1.open()">发送到邮箱</view>
			<view class="btitem other" @click="finish">完成</view>
		</view>
		
		<uni-popup ref="imgbox" type="bottom" >
			<view scroll-y="true" style="background:#fff;padding: 20rpx;border-radius:20rpx 20rpx 0 0;max-height:80vh;box-sizing:border-box;overflow-y: auto;">
				<view style="line-height:3;text-align:center;">长按下面图片，保存到手机</view>
				<view style="padding:0 30rpx 30px;">
					<image :src="imgUrl" mode="widthFix" style="width:100%;"></image>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="imgbox1" type="bottom" >
			<view scroll-y="true" style="background:#fff;padding: 20rpx;border-radius:20rpx 20rpx 0 0;max-height:80vh;box-sizing:border-box;overflow-y: auto;">
				<view style="line-height:3;text-align:center;">长按下面图片，保存到手机</view>
				<view style="padding:0 30rpx 30px;">
					<image :src="secondUrl" mode="widthFix" style="width:100%;"></image>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="pop1" type="center">
			<view class="white-background-pop1">
				<view class="white-background-pop1-title">
					发送到邮箱
					<image src="../../static/icon_close.png" mode="aspectFill" @click="$refs.pop1.close()" class="close"></image>
				</view>
				<view>
					<input type="text" v-model="email" placeholder="请输入邮箱地址" class="emailinput">
				</view>
				<view class="sendemail" @click="sendemail">确认无误</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import html2canvas from "plugins/html2canvas"
	import turnback from "../../components/turnback.vue"
	const app = getApp();
	export default {
		components: {
			turnback
		},
		data() {
			return {
				mid:"",
				baseUrl: app.globalData.baseUrl,
				imgUrl:"",
				info:{},
				serimgurl:"",
				secondUrl:"",
				a5img:"/api/info/common/img/card/a51.png?88",
				a6img:"/api/info/common/img/card/601.png?88",
				greenimg:"/api/info/common/img/card/card1.png?88",
				blueimg:"/api/info/common/img/card/card3.png?88",
				cardimg:"/api/info/common/img/card/card5.png?8",
				haiji_a5img:"/api/info/common/img/card/haiji_a51.png?88",
				haiji_a6img:"/api/info/common/img/card/haiji_601.png?88",
				email:localStorage.getItem("email")||"",
				create:false,
			}
		},
		onLoad(options) {
			console.log("options",options);
			this.mid = options.mid;
			this.getinfo();
		},
		onShow() {
			
		},
		methods: {
			getinfo(){
				app.applygetDetail({makeId:this.mid}).then((res) => {
					if(res.data) {
						this.info = res.data;
						this.email = res.data.applyEmail||this.email;
					}
					else{app.tip("获取数据失败！")}
					console.log("info",this.info);
				})
			},
			sendemail(){
				if(!this.email){app.tip("请输入邮箱");return;}
				localStorage.setItem("email",this.email);
				if(!this.serimgurl){
					this.sendpic(rep=>{
						this.saveemail();
					});
				}else{
					this.saveemail();
				}
			},
			saveemail(cal){
				app.sendEmail({applyId:this.info.applyId,email:this.email}).then((res) => {
						app.tip("发送成功");
						this.$refs.pop1.close();
						if(cal) cal(res.data);
				})
			},
			getallimg(){
				this.saveimg();
			},
			saveimg(cal){
				this.create = true;
				app.loading("生成中");
				setTimeout(()=>{
					let qselect = document.querySelector("#doctorcode");
					var w = qselect.offsetWidth;
					var h = qselect.offsetHeight; //要将 canvas 的宽高设置成容器宽高的 2 倍
					var canvas = document.createElement("canvas");
					canvas.width = w*1-2;
					canvas.height = h*1;
					// canvas.style.width = w + "px";
					// canvas.style.height = h + "px";
					var context = canvas.getContext("2d"); //然后将画布缩放，将图像放大两倍画到画布上 
					// context.scale(3, 3);
					context.mozImageSmoothingEnabled = false;
					context.webkitImageSmoothingEnabled = false;
					context.msImageSmoothingEnabled = false;
					context.imageSmoothingEnabled = false;
					html2canvas(qselect, {
						canvas: canvas,
						scale: 1,
						width: w,
						height: h,
						allowTaint: false,
						taintTest: false,
						useCORS: true,
					}).then(canvas => {
						// canvas.style.width = w + "px";
						// canvas.style.height = h + "px";
						let dataURL = canvas.toDataURL("image/png");
						this.imgUrl = dataURL;
						app.loaded();this.create = false;
						if(cal) {cal();return false;}
						this.$refs.imgbox.open();
					}).catch(res=>{alert(JSON.stringify(res))});
				},500)
			},
			getsecondimg(url){
				this.secondUrl = url;
				this.$refs.imgbox1.open();
			},
			downImage(url, callback) {
				uni.getImageInfo({
					src: url,
					success: function(image) {
						callback(image.path);
					}
				});
			},
			finish(){
				uni.reLaunch({
					url:"/pages/sales/index"
				})
				// if(!this.serimgurl){
				// 	this.sendpic(rep=>{
				// 		uni.reLaunch({
				// 			url:"/pages/card/index"
				// 		})
				// 	});
				// }else{
				// 	uni.reLaunch({
				// 		url:"/pages/card/index"
				// 	})
				// }
			},
			toreply(){
				if(!this.serimgurl){
					this.sendpic(rep=>{
						uni.navigateTo({
							url:"/pages/card/reply?applyId="+this.info.applyId
						})
					});
				}else{
					uni.navigateTo({
						url:"/pages/card/reply?applyId="+this.info.applyId
					})
				}
				
			},
			sendpic(cal){
				var that = this;
				if(!this.imgUrl){
					this.saveimg(rep=>{
						uploadimg(that,cal);
					});
				}else{
					uploadimg(that,cal);
				}
				function uploadimg(that,cal){
					app.loading("上传中");
					uni.uploadFile({
					    url: "/api/wx/card/apply/uploadPic",
					    filePath: that.imgUrl,
					    name: 'file',
					    formData: {
					    	applyId:that.info.applyId,
					    },
					    header: {
					      // 'content-type': 'multipart/form-data',
						  'salesToken':localStorage.getItem("salesToken"),
						  'uid': localStorage.getItem("uid"),
						  'channel':1,
					    },
					    success: (rq)=>{
							let data = JSON.parse(rq.data);
							that.serimgurl = data.data.fileUrl;
							app.tip("上传成功");
					    	if(cal) cal(data.data.fileUrl);
					    },
						fail:()=>{app.tip("上传失败");}
					})
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.emailinput{width: 80%;background: #F5F5F5;border-radius:8rpx;padding:18rpx 24rpx;text-align: left;margin:auto;}
	.white-background-pop1 {
		text-align: center;width:90vw;
		background-color: #FFFFFF;padding:0 0 30rpx 0;
		border-radius: 10px;
	
		.white-background-pop1-title {
			font-size: 30rpx;
			color: #333;font-weight:bold;
			padding: 35rpx 0;
			position: relative;
			.close{
				position: absolute;
				right: 50rpx;
				width: 30rpx;
				height: 30rpx;
				top: 40rpx;
			}
		}
		.sendemail{
			line-height:1;padding:24rpx 0;
			border-radius: 60rpx;font-size: 32rpx;
			background:#4789EB;
			width: 74%;color:#fff;margin:40rpx auto 20rpx;
			text-align: center;
		}
	}
	.a5infobox{
		position:absolute;z-index:3;top:140rpx;left:0;right:0;text-align:center;
		.a5img{border: 12rpx solid #0063B3;box-sizing: border-box;width: 262rpx;height: 262rpx;margin-top:40rpx;}
		.teamtext{font-size: 32rpx;color: #2E75B6;line-height: 1;padding:22rpx 0 20rpx;}
		.depttext{
			line-height:1;padding:12rpx 0;
			border-radius: 60rpx;font-size: 32rpx;
			background:#2E75B6;
			width: 296rpx;color:#fff;margin:auto;
			text-align: center;
		}
		.movetext{margin-top:-20*5rpx;padding-top:10*5rpx;}
		.doctortext{font-size: 32rpx;color: #2E75B6;padding:20rpx 15rpx;}
		.numtext{font-size: 27rpx;color: #666666;display: inline-block;padding:16rpx 15rpx 0;border-top:2rpx solid #D2D2D2;}
		&.nonum{
			.a5img{margin-top:58rpx;}
			.teamtext{padding:28rpx 0 28rpx;}
			.doctortext{padding:26rpx 15rpx;}
		}
		&.noname{
			.a5img{margin-top:58rpx;}
			.teamtext{padding:28rpx 0 28rpx;}
			.numtext{margin-top:34rpx;}
		}
		&.noall{
			.a5img{margin-top:80rpx;}
			.teamtext{padding:46rpx 0 44rpx;}
		}
		&.big{
			top:140*5rpx;
			.a5img{border: 12*5rpx solid #0063B3;width: 262*5rpx;height: 262*5rpx;margin-top:40*5rpx;}
			.teamtext{font-size: 32*5rpx;padding:22*5rpx 0 20*5rpx;}
			.depttext{
				padding:12*5rpx 0;
				border-radius: 60*5rpx;font-size: 32*5rpx;
				width: 296*5rpx;
			}
			.doctortext{font-size: 32*5rpx;padding:20*5rpx 15*5rpx;}
			.numtext{font-size: 27*5rpx;padding:16*5rpx 15*5rpx 0;border-top:2*5rpx solid #D2D2D2;}
			&.nonum{
				.a5img{margin-top:58*5rpx;}
				.teamtext{padding:28*5rpx 0 28*5rpx;}
				.doctortext{padding:26*5rpx 15*5rpx;}
			}
			&.noname{
				.a5img{margin-top:58*5rpx;}
				.teamtext{padding:28*5rpx 0 28*5rpx;}
				.numtext{margin-top:34*5rpx;}
			}
			&.noall{
				.a5img{margin-top:80*5rpx;}
				.teamtext{padding:46*5rpx 0 44*5rpx;}
			}
		}
	}
	.a6infobox{
		position:absolute;z-index:3;top:140rpx;left:0;right:0;text-align:center;
		.a6img{border: 12rpx solid #0063B3;box-sizing: border-box;width: 262rpx;height: 262rpx;margin-top:50rpx;}
		.teamtext{font-size: 32rpx;color: #2E75B6;line-height: 1;padding:30rpx 0 28rpx;}
		.depttext{
			line-height:1;padding:12rpx 0;
			border-radius: 60rpx;font-size: 32rpx;
			background:#2E75B6;
			width: 296rpx;color:#fff;margin:auto;
			text-align: center;
		}
		.movetext{margin-top:-20*5rpx;padding-top:10*5rpx;}
		.doctortext{font-size: 32rpx;color: #2E75B6;padding:22rpx 15rpx;}
		.numtext{font-size: 27rpx;color: #666666;display: inline-block;padding:20rpx 15rpx 0;border-top:2rpx solid #D2D2D2;}
		&.nonum{
			.a6img{margin-top:68rpx;}
			.teamtext{padding:40rpx 0 36rpx;}
			.doctortext{padding:34rpx 15rpx 0;}
		}
		&.noname{
			.a6img{margin-top:74rpx;}
			.teamtext{padding:40rpx 0 36rpx;}
			.numtext{margin-top:34rpx;}
		}
		&.noall{
			.a6img{margin-top:90rpx;}
			.teamtext{padding:60rpx 0 50rpx;}
		}
		&.big{
			top:140*5rpx;
			.a6img{border: 12*5rpx solid #0063B3;width: 262*5rpx;height: 262*5rpx;margin-top:50*5rpx;}
			.teamtext{font-size: 32*5rpx;padding:30*5rpx 0 28*5rpx;}
			.depttext{
				padding:12*5rpx 0;
				border-radius: 60*5rpx;font-size: 32*5rpx;
				width: 296*5rpx;
			}
			.doctortext{font-size: 32*5rpx;padding:22*5rpx 15*5rpx;}
			.numtext{font-size: 27*5rpx;padding:20*5rpx 15*5rpx 0;border-top:2*5rpx solid #D2D2D2;}
			&.nonum{
				.a6img{margin-top:68*5rpx;}
				.teamtext{padding:40*5rpx 0 36*5rpx;}
				.doctortext{padding:34*5rpx 15*5rpx 0;}
			}
			&.noname{
				.a6img{margin-top:74*5rpx;}
				.teamtext{padding:40*5rpx 0 36*5rpx;}
				.numtext{margin-top:34*5rpx;}
			}
			&.noall{
				.a6img{margin-top:90*5rpx;}
				.teamtext{padding:60*5rpx 0 50*5rpx;}
			}
		}
	}
	.greeninfobox{
		position:absolute;z-index:3;top:195rpx;left:456rpx;right:0;text-align:center;
		.greenimg{width: 86rpx;height: 86rpx;margin:auto;display:block;}
		.numtext{font-size: 10rpx;color: #333;padding:6rpx 0rpx 0;}
		&.nonum{
			.greenimg{margin-top:10rpx;}
		}
		&.big{
			top:195*5rpx;left:456*5rpx;
			.greenimg{width: 86*5rpx;height: 86*5rpx;}
			.numtext{font-size: 10*5rpx;padding:6*5rpx 0rpx 0;}
			&.nonum{
				.greenimg{margin-top:10*5rpx;}
			}
		}
	}
	.blueinfobox{
		position:absolute;z-index:3;top:54rpx;left:0rpx;right:256rpx;text-align:center;
		.blueimg{width: 160rpx;height: 160rpx;margin:32rpx auto 0;display:block;border: 7rpx solid #4368A6;box-sizing: border-box;border-radius: 5rpx;}
		.numtext{font-size: 18rpx;color: #4368A6;padding:12rpx 0rpx 0;}
		&.nonum{
			.blueimg{margin-top:44rpx;}
		}
		&.big{
			top:54*5rpx;right:256*5rpx;
			.blueimg{width: 160*5rpx;height: 160*5rpx;margin:32*5rpx auto 0;border: 7*5rpx solid #4368A6;border-radius: 5*5rpx;}
			.numtext{font-size: 18*5rpx;padding:12*5rpx 0rpx 0;}
			&.nonum{
				.blueimg{margin-top:44*5rpx;}
			}
		}
	}
	.cardinfobox{
		position:absolute;z-index:3;top:36rpx;left:0rpx;right:402rpx;text-align:center;
		.dname{padding-top:28rpx;font-size: 35rpx;color: #2655A5;}
		.work{font-size: 24rpx;padding:4rpx 0 10rpx;}
		.numtext{font-size: 14rpx;padding:0rpx 0rpx 0;}
		&.big{
			top:36*5rpx;right:402*5rpx;
			.dname{padding-top:28*5rpx;font-size: 35*5rpx;}
			.work{font-size: 24*5rpx;padding:4*5rpx 0 10*5rpx;}
			.numtext{font-size: 14*5rpx;}
		}
	}
	.haiji_a5infobox{
		position:absolute;z-index:3;top:140rpx;left:0;right:0;text-align:center;
		.haiji_a5img{box-sizing: border-box;width: 230rpx;height: 230rpx;margin-top:36rpx;}
		.teamtext{font-size: 32rpx;color: #2E75B6;line-height: 1;padding:22rpx 0 20rpx;}
		.depttext{
			line-height:1;padding:12rpx 0;
			border-radius: 60rpx;font-size: 32rpx;
			background:#2E75B6;
			width: 296rpx;color:#fff;margin:auto;
			text-align: center;
		}
		.movetext{margin-top:-20*5rpx;padding-top:10*5rpx;}
		&.noall{
			.haiji_a5img{margin-top:80rpx;width: 270rpx;height: 270rpx;}
		}
		&.big{
			top:140*5rpx;
			.haiji_a5img{width: 230*5rpx;height: 230*5rpx;margin-top:36*5rpx;}
			.teamtext{font-size: 32*5rpx;padding:22*5rpx 0 20*5rpx;}
			.depttext{
				padding:12*5rpx 0;
				border-radius: 60*5rpx;font-size: 32*5rpx;
				width: 296*5rpx;
			}
			&.noall{
				.haiji_a5img{margin-top:80*5rpx;width: 270*5rpx;height: 270*5rpx;}
			}
		}
	}
	.haiji_a6infobox{
		position:absolute;z-index:3;top:140rpx;left:0;right:0;text-align:center;
		.haiji_a6img{box-sizing: border-box;width: 230rpx;height: 230rpx;margin-top:56rpx;}
		.teamtext{font-size: 32rpx;color: #2E75B6;line-height: 1;padding:38rpx 0 30rpx;}
		.depttext{
			line-height:1;padding:12rpx 0;
			border-radius: 60rpx;font-size: 32rpx;
			background:#2E75B6;
			width: 296rpx;color:#fff;margin:auto;
			text-align: center;
		}
		.movetext{margin-top:-20*5rpx;padding-top:10*5rpx;}
		&.noall{
			.haiji_a6img{margin-top:100rpx;width: 290rpx;height: 290rpx;}
		}
		&.big{
			top:140*5rpx;
			.haiji_a6img{width: 230*5rpx;height: 230*5rpx;margin-top:56*5rpx;}
			.teamtext{font-size: 32*5rpx;padding:38*5rpx 0 40*5rpx;}
			.depttext{
				padding:12*5rpx 0;
				border-radius: 60*5rpx;font-size: 32*5rpx;
				width: 296*5rpx;
			}
			&.noall{
				.haiji_a6img{margin-top:100*5rpx;width: 290*5rpx;height: 290*5rpx;}
			}
		}
	}
	.outinfobox{
		position:absolute;z-index:3;top:140rpx;left:0;right:0;text-align:center;
		.outimg{border: 12rpx solid #0063B3;box-sizing: border-box;width: 282rpx;height: 282rpx;margin-top:54rpx;}
		.teamtext{font-size: 16rpx;color: #2E75B6;line-height: 1;padding:0rpx 0 40rpx;width:300rpx;margin:auto;}
		.depttext{
			line-height:1;padding:12rpx 0;
			border-radius: 60rpx;font-size: 32rpx;
			background:#2E75B6;
			width: 296rpx;color:#fff;margin:auto;
			text-align: center;
		}
		.rightarrow{width:18rpx;height:18rpx;margin:0 10rpx;}
		.movetext{margin-top:-20*5rpx;padding-top:10*5rpx;}
		.doctortext{font-size: 32rpx;color: #2E75B6;padding:20rpx 15rpx 10rpx;}
		.numtext{font-size: 24rpx;color: #2E75B6;display: inline-block;padding:0rpx 0rpx 0;}
		&.big{
			top:140*5rpx;
			.outimg{border: 12*5rpx solid #0063B3;width: 282*5rpx;height: 282*5rpx;margin-top:54*5rpx;}
			.teamtext{font-size: 16*5rpx;padding:0rpx 0 40*5rpx;width:300*5rpx;}
			.depttext{
				padding:12*5rpx 0;
				border-radius: 60*5rpx;font-size: 32*5rpx;
				width: 296*5rpx;
			}
			.rightarrow{width:18*5rpx;height:18*5rpx;margin:0 10*5rpx;}
			.doctortext{font-size: 32*5rpx;padding:20*5rpx 15*5rpx 16*5rpx;}
			.numtext{font-size: 24*5rpx;}
		}
	}
	.foottips{font-size: 28rpx;color: #999999;padding:10rpx 30rpx 30rpx;text-align:center;}
	.swiperbox{height:78vh;}
	.swiperimgbox{
		width:calc(100% - 13px);position: relative;
		.swiperimg{width:100%;display: block;}
		&.big{
			width:calc(100%*5 - 13*5px);
		}
	}
	
	.footerbt {
		padding: 20rpx 20rpx 30rpx;
		box-sizing: border-box;
		justify-content: space-around;

		.btitem {
			line-height: 80rpx;
			border-radius: 60rpx;
			background:#4789EB;font-size:30rpx;
			width: 30%;color:#fff;
			text-align: center;

			&.other {width: 30%;background:#4789EB;}
		}
	}

	.headtips {
		padding: 16rpx 0 16rpx 42rpx;
		line-height: 1;
	}
</style>
