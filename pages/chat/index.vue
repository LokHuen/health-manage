<template>
	<view class="">
		<view style='' class="chatbox">
			<view v-if="ptype==2&&info.orderInfo.interpretStart!=2" class="doctortime">
				<!-- <view style="flex:1;">咨询时长：{{info.orderInfo.interpretStart==0?"待解读":info.orderInfo.duration}}</view> -->
				<view style="flex:1;">解读完成后，请执行完成操作</view>
				<view class="askfinish" @click="askfinish">解读完成</view>
			</view>
		  <view class='news' id='scroll'>
		    <view class="historycon">
		      <scroll-view scroll-y="true" :scroll-top="scrollTop">
		        <view class="history" v-for="(item,index) in centendata" :key='index'>
		          <!-- 右边 -->
		          <block v-if="item.is_show_right ==1">
		            <view class='my_right'>
		              <view class='page_row'>
		                <image class='fr new_img' :src='item.head_owner'></image>
						<view class="fr">
		                <view v-show='item.type == 2' class='fr sanjiao my' style=''></view>
		                <view class='fr' style='max-width:480rpx;margin-top:6rpx;'>
		                  <text v-if='item.type == 2' class='fr new_txt'>{{item.content}}</text>
		                </view>
		                <image mode='widthFix' v-if='item.type == 1' :src='item.piture' class='new_imgtent' :data-src='item.piture' @click='previewImage' style='margin-right:20rpx;'></image>
		                </view>
		              </view>
		            </view>
		          </block>
		          <!-- 左边 -->
		          <block v-if="item.is_show_right ==0">
		            <view class='you_left'>
		              <view class='page_row'>
		                <image class='fl new_img' :src='item.head_owner'></image>
						<view class="fl">
							<view style="font-size: 24rpx;color: #666666;line-height: 44rpx;text-align:left;margin: -8rpx 0 0 18rpx;">{{item.username}}</view>
							<view>
								<view v-show='item.type == 2' class='fl sanjiao you' style=''></view>
								<view class='fl' style='max-width:480rpx;margin-top:6rpx;'>
								  <text v-if='item.type == 2' class='fl new_questiontxt'>{{item.content}}</text>
										
								</view>
								<image mode='widthFix' v-if='item.type == 1' :src='item.piture' class='new_imgtent' :data-src='item.piture' @click='previewImage' style="margin-left:20rpx;"></image>
							</view>
						</view>
		              </view>
		            </view>
		          </block>
		          <!-- 中间 -->
		          <block v-if="item.is_show_right ==2">
		            <view style='text-align:center;'>
		              <view v-if="item.txttype==0" class='time'>{{item.time}}</view>
		              <view v-if="item.txttype==1" class='tipscss'><text>{{item.content}}</text></view>
					  <view v-if="item.txttype==2" class='tipscss' @click="tootherpage" :data-href="item.page"><text>{{item.content}}\n</text><text class="jumpcolor">去评价 ></text></view>
		            </view>
		          </block>
		          <view class='clear'></view>
		        </view>
		      </scroll-view>
		    </view>
		  </view>
		
		</view>
		
		<form>
		  <view class='footershare'>

		    <textarea fixed style='' cursor-spacing='10' auto-height="true" v-model="haveinputv" @confirm="sendinput"></textarea>
			<image v-show='!haveinputv' @click='sendpicture' mode='widthFix' style='' class="sendpic" :src="imgurl+'/images/common/tupian.png'"></image>
		    <view v-show='haveinputv' style='' class="sendinput" @click='sendinput'>发送</view>
			<view v-if="askend" class="serviceend">解读服务已完成</view>
		  </view>
		</form>
		<uni-popup ref="popup" type="bottom">
			<view class="endthisask">
				<view class="boxtitle">咨询完成</view>
				<view>结束服务前请确保用户的问题已经得到解答</view>
				<view class="surecloseask" @click="surecloseask">确定</view>
				<uni-icons type="closeempty" size="22" class="closebt" color="#ccc" @click="$refs.popup.close()"></uni-icons>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import util from "../../common/FormatUtil"
	const app = getApp();
	export default {
		data() {
			return {
				options:{},
				id:1,
				ptype:1, //1用户，2医生
				baseUrl:app.globalData.baseUrl,
				imgurl:app.globalData.imageUrl,
				info:{},
				haveinputv:"",
				centendata: [
					// {
					//         is_show_right: 2, //0左边 1右边 2中间
					//         type: 0, //2文字，1图片，
					//         head_owner: "",
					//         piture: "",
					//         content: "会话已创建，请及时回复用户的问题。",
					//         txttype: 1, //0时间 1句话
					// },
					// {
				 //        is_show_right: 2, //0左边 1右边 2中间
				 //        type: 0, //2文字，1图片，
				 //        head_owner: "",
				 //        piture: "",
				 //        content: "请发送您想要咨询的内容，拍摄报告照片更方便医生做出判断和给出合理的建议。\n医生收到咨询内容后会尽快回复您，系统会通过小程序服务通知告知，请留意。",
				 //        txttype: 1, //0时间 1句话 
				 //        time: ""
				 //      },
				 //      {
				 //        is_show_right: 2, //0左边 1右边 2中间
				 //        type: 0, //2文字，1图片，
				 //        head_owner: "",
				 //        piture: "",
				 //        content: "",
				 //        txttype: 0, //0时间 1句话 
				 //        time: "15:25"
				 //      },
				 //      {
				 //        is_show_right: 0, //0左边 1右边 2中间
				 //        type: 0, //2文字，1图片，
				 //        head_owner: "/static/images/common/r1.png",
				 //        piture: "",
				 //        content: "想要知道自己属于什么类型的白羊，现在开始测测吧"
				 //      },
				 //      {
				 //        is_show_right: 0, //0左边 1右边 2中间
				 //        type: 1, //2文字，1图片，
				 //        head_owner: "/static/images/common/r1.png",
				 //        piture: "/static/images/common/r1.png",
				 //        content: "想要知道自己属于什么类型的白羊，现在开始测测吧"
				 //      },
				 //      {
				 //        is_show_right: 1, //0左边 1右边 2中间
				 //        type: 0, //2文字，1图片
				 //        head_owner: "/static/images/common/r2.png",
				 //        piture: "",
				 //        content: "想要知道自己属于什么类型的白羊，现在开始测测吧"
				 //      },
				 //      {
				 //        is_show_right: 1, //0左边 1右边 2中间
				 //        type: 1, //2文字，1图片
				 //        head_owner: "/static/images/common/r2.png",
				 //        piture: "/static/images/common/r2.png",
				 //        content: ""
				 //      },
				 //      {
				 //        is_show_right: 0, //0左边 1右边 2中间
				 //        type: 0, //2文字，1图片
				 //        head_owner: "/static/images/common/r1.png",
				 //        piture: "",
				 //        content: "想要知道自己属于什么类型的白羊，现在开始测测吧",
				 //      },
					//   {
					//     is_show_right: 2, //0左边 1右边 2中间
					//     type: 0, //2文字，1图片
					//     head_owner: "",
					//     piture: "",
					// 	txttype: 1, //0时间 1句话
					//     content: "报告解读服务到8月12日12:09:09截止，请知悉。",
					//   },
					//   {
					//     is_show_right: 2, //0左边 1右边 2中间
					//     type: 0, //2文字，1图片
					//     head_owner: "",
					//     piture: "",
					//   	txttype: 2, //0时间 1句话 2跳转
					//     content: "本次解读服务已完成，请您对我们的服务进行评价。",
					// 	page:"/pages/index/index",
					//   },

				    ],
				scrollTop: 0,
				askend:false,
				user:{},
				getdatatimer:null,
				doctorFirstSend:true, //true医生未发 false医生已发
			}
		},
		onLoad(options){
			this.options = options;
			this.id = options.id||this.id;
			this.ptype = options.type||this.ptype;
			uni.setNavigationBarTitle({
			    title: '咨询'
			})
			this.myinfo();
			this.init();
			this.getdatatimer = setInterval(()=>{this.init();},7000);
		},
		onShow(){
			if(!this.getdatatimer){
				this.init();
				this.getdatatimer = setInterval(()=>{this.init();},7000);
			}
		},
		onHide(){
			clearInterval(this.getdatatimer);
			this.getdatatimer = null;
		},
		onUnload(){
			clearInterval(this.getdatatimer);
			if(this.options.close) 
			// uni.navigateBack({
			// 	delta:0,
			// })
			uni.switchTab({
			   url:"/pages/index/index"	
			})

		},
		methods: {
			myinfo(){
				app.mine({}).then(res=>{
					this.user = res.data;
				})
			},
			init(force){
				if(!this.centendata[0]) app.loading("加载中");
				if(this.ptype==1){//用户
					app.userchat({id:this.id}).then(res=>{
						app.loaded();
						if(res.data.interpretStatus==2) this.askend = true;
						if((!force)&&this.info.sessionList&&this.info.sessionList[0]&&res.data.sessionList[res.data.sessionList.length-1].creatTime==this.info.sessionList[this.info.sessionList.length-1].creatTime) return;
						this.info =  res.data;
						let clist = this.info.sessionList,cdata=[
							{
								is_show_right: 2, //0左边 1右边 2中间
								type: 0, //2文字，1图片，
								head_owner: "",
								piture: "",
								content: "请详细描述您的问题，医生回复后，本次解读服务即完成。\n 附上体检报告更有助于医生作出判断和给以合理的建议。\n 医生回复后，系统会通过小程序服务通知告知您，请留意。",
								txttype: 1, //0时间 1句话 
								time: ""
							}
						];
						let d,tipshow=true;
						for(let i=0,l=clist.length;i<l;i++){
							if(i==0||(i>0&&clist[i-1].creator!=clist[i].creator)){
								d={
									  is_show_right: 2, //0左边 1右边 2中间
									  txttype: 0, //0时间 1句话 
									  time: clist[i].creatTime,
									};
								cdata.push(d);
							}
							d={
								is_show_right: this.ptype==1&&clist[i].role==1?1:(this.ptype==1&&clist[i].role==2?0:(this.ptype==2&&clist[i].role==1?0:1)), //0左边 1右边 2中间
								type: clist[i].type, //2文字，1图片，
								head_owner: clist[i].portrait,
								username:clist[i].creator,
								piture: this.baseUrl+"/"+clist[i].pictureUrl,
								content: clist[i].text,
							  };
							cdata.push(d);
							// if(tipshow&&clist[i].role==2){
							// 	let endtime = new Date(clist[i].creatTime).getTime();
							// 	endtime = util.formatDate(endtime+86400000,"yyyy-MM-dd hh:mm");
							// 	d={
							// 		is_show_right: 2, //0左边 1右边 2中间
							// 		txttype: 1, //0时间 1句话 2跳转
							// 		content: `报告解读服务到${endtime}截止，请知悉`,
							// 	};
							// 	cdata.push(d);
							// 	tipshow = false;
							// }
						}
						if(this.info.interpretStatus==2){
							d={
								is_show_right: 2, //0左边 1右边 2中间
								txttype: 2, //0时间 1句话 2跳转
								content: "本次解读服务已完成，请您对我们的服务进行评价。",
								page:"/pages/order/order",
							};
							cdata.push(d);
							d={
								is_show_right: 2, //0左边 1右边 2中间
								txttype: 1, //0时间 1句话 2跳转
								content: "解读内容仅供参考，具体诊疗建议请咨询医疗机构主治医师。",
							};
							cdata.push(d);
						}
						this.centendata = cdata;
						this.$nextTick(()=>{
							this.bottom();
						})
					});
				}else if(this.ptype==2){//医生
					app.doctorchat({id:this.id}).then(res=>{
						app.loaded();
						
						if(res.data.orderInfo.interpretStart==2) this.askend = true;
						res.data.orderInfo.duration = formatSeconds(res.data.orderInfo.duration||0);
						
						if((!force)&&this.info.sessionList&&this.info.sessionList[0]&&res.data.sessionList[res.data.sessionList.length-1].creatTime==this.info.sessionList[this.info.sessionList.length-1].creatTime) return;
						
						this.info =  res.data;

						let clist = this.info.sessionList,cdata=[
							{
								is_show_right: 2, //0左边 1右边 2中间
								type: 0, //2文字，1图片，
								head_owner: "",
								piture: "",
								content: "会话已创建，请及时回复用户的问题。",
								txttype: 1, //0时间 1句话
							}
						];
						for(let i=0,l=clist.length;i<l;i++){
							let d;
							if(i==0||(i>0&&clist[i-1].creator!=clist[i].creator)){
								d={
									  is_show_right: 2, //0左边 1右边 2中间
									  txttype: 0, //0时间 1句话 
									  time: clist[i].creatTime,
									};
								cdata.push(d);
							}
							d={
								is_show_right: this.ptype==1&&clist[i].role==1?1:(this.ptype==1&&clist[i].role==2?0:(this.ptype==2&&clist[i].role==1?0:1)), //0左边 1右边 2中间
								type: clist[i].type, //2文字，1图片，
								head_owner: clist[i].portrait,
								username:clist[i].creator,
								piture: this.baseUrl+"/"+clist[i].pictureUrl,
								content: clist[i].text,
							  };
							cdata.push(d);
							if(clist[i].role==2) this.doctorFirstSend = false;
						}
						
						this.centendata = cdata;
						this.$nextTick(()=>{
							this.bottom();
						})
					});
				}
			},
			sendinput(e) {
			    var _this = this;
			    if (!_this.haveinputv){
			      app.tip("请输入内容");return;
			    }
				let data={
					consultId:this.id,
					type:2,
					creatorId:this.user.id,
					text:this.haveinputv,
					role:this.ptype,
				};
				app.loading("发送中");
				app.savetext(data).then(res=>{
					app.loaded();
					this.init();
					this.haveinputv = "";
					if(this.ptype==2&&this.doctorFirstSend) this.tellhadsend();
				}).catch(res=>app.loaded())
			    // var centendata = _this.centendata,d;
			    // d = [{
			    //   is_show_right: 1, //0左边 1右边 2中间
			    //   type: 2, //2文字，1图片
			    //   head_owner: "/static/images/common/r2.png",
			    //   piture: "",
			    //   content: _this.haveinputv,
			    // }];
			    // _this.centendata = _this.centendata.concat(d);
			    // _this.haveinputv = "";
			    // _this.bottom();
			},
			sendpicture(e) {
			    var _this = this;
			    uni.chooseImage({
			      count: 9,
			      sizeType: ['compressed'],
			      sourceType: ['album', 'camera'],
			      success:(res)=>{
			        console.log(res.tempFilePaths)
			        var imglist = res.tempFilePaths;
			        var centendata = _this.centendata,
			          d;
			        for (let i = 0; i < imglist.length; i++) {
						wx.uploadFile({
						          url: this.baseUrl+"/wx/interpret/consult/session/save",
						          filePath: imglist[i],
						          name: 'file',
						          formData: {
									consultId:this.id,
									type:1,
									creatorId:this.user.id,
									text:"",
									role:this.ptype,
						          },
						          header: {
						            'content-type': 'multipart/form-data',
									'tkbgjd-token': uni.getStorageSync("token"),
						          },
						          success: (rq)=>{
									  this.init();
									  if(this.ptype==2&&this.doctorFirstSend) this.tellhadsend();
						   //          d = [{
						   //            is_show_right: 1, //0左边 1右边 2中间
						   //            type: 1, //2文字，1图片
						   //            head_owner: this.user.portrait,
						   //            piture: imglist[i],
						   //            content: ""
						   //          }];
						   //          centendata = centendata.concat(d);
									// _this.centendata = centendata;
									// _this.bottom();
						          },
						        })
			        }
			      }
			    })
			 },
			 askfinish(){
				 this.$refs.popup.open();
			 },
			 surecloseask(){
				 app.loading("保存中");
				 app.endchat({id:this.id}).then(res=>{
					this.init(1);
					app.tip(res.msg);
				 	this.$refs.popup.close();
				 }).catch(res=>app.loaded())
			 },
			// 滑动到底部
			bottom: function() {
				setTimeout(()=>{
			     uni.createSelectorQuery().select('#scroll').fields({
			       dataset: true,
			       size: true,
			       scrollOffset: true,
			       properties: ['scrollX', 'scrollY'],
			       computedStyle: ['margin', 'backgroundColor']
			     }, function(res) {
						 uni.pageScrollTo({
						   scrollTop: res.height
						 })
			     }).exec()
				 },200)
			},
			previewImage(e){
				uni.previewImage({
				    urls: [e.currentTarget.dataset.src]
				})
			},
			tootherpage(e){
				uni.navigateTo({
					url:e.currentTarget.dataset.href,
				})
			},
			tellhadsend(){
				app.tellhadsend({id:this.id}).then(res=>{
					this.doctorFirstSend = false;
				}).catch(res=>{
					setTimeout(()=>{this.tellhadsend();},1000);
				})
			},
			
		}
	}
	function formatSeconds(value) {
	    var theTime = parseInt(value);// 秒
	    var middle= 0;// 分
	    var hour= 0;// 小时
	
	    if(theTime > 60) {
	        middle= parseInt(theTime/60);
	        theTime = parseInt(theTime%60);
	        if(middle> 60) {
	            hour= parseInt(middle/60);
	            middle= parseInt(middle%60);
	        }
	    }
	    var result = ""+parseInt(theTime)+"秒";
	    if(middle > 0) {
	        result = ""+parseInt(middle)+"分"+result;
	    }
	    if(hour> 0) {
	        result = ""+parseInt(hour)+"小时"+result;
	    }
	    return result;
	}
</script>

<style >
	.closebt {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
	}
	.chatbox{padding-bottom:140rpx;}
	.surecloseask{line-height:1;padding:24rpx 0;width:320rpx;margin:50rpx auto 0;color:#fff;background:#007AFF;border-radius:10rpx;}
	.boxtitle{font-size:38rpx;line-height:120rpx;}
	.endthisask{background:#fff;text-align:center;padding:0 0 50rpx;border-radius: 20rpx 20rpx 0 0;}
	.endthisask view:nth-child(2){color:#666;}
	.askfinish{color:rgba(9, 143, 242, 100);}
	.doctortime{position: sticky;top:0;left:0;right:0;background:#fff;padding:24rpx 30rpx 24rpx 26rpx;display: flex;margin:0 0rpx;align-items:center;font-size: 30rpx;z-index:9;border-top:1rpx solid #eee;}
	.serviceend{position:absolute;top:0;left:0;right:0;bottom:0;z-index:100;justify-content:center;display:flex;align-items:center;background: rgba(255,255,255,0.6);color: #666;}
	.time {
	  font-size: 28rpx;color:#666;line-height:1;
	}
	.tipscss{line-height:1.4;text-align:left;background: rgba(39, 147, 236, 0.08);border-radius:10rpx;padding:22rpx;font-size: 28rpx;color: #666666;}
	.tipscss .jumpcolor{color:#2793EC;}
	.new_questiontxt {
	  max-width:480rpx;line-height:1.3;
	  border-radius: 10rpx;
	  background-color: #fff;
	  padding: 20rpx 20rpx;font-size:32rpx;text-align:left;
	}
	.new_imgtent{
	  width:250rpx;
	  padding:9rpx;height:250rpx;
	  border-radius:8rpx;
	  background:#fff;display:block;
	}
	.new_txt {
	  max-width:400rpx;line-height:1.3;
	  border-radius: 10rpx;
	  background-color: #2793EC;color:#fff;
	  padding: 20rpx 26rpx 20rpx 26rpx;font-size:32rpx;text-align:left;
	}
	.sanjiao {
	  top: 28rpx;
	  position: relative;
	  width: 0px;
	  height: 0px;
	  border-width: 16rpx;
	  border-style: solid;
	}
	 
	.my {
	  border-color: transparent transparent transparent #2793EC;
	  margin-right:-5rpx;
	}
	 
	.you {
	  border-color: transparent #fff transparent transparent;
	  margin-left:-5rpx;
	}
	.you_left {
	  float: left;
	  position: relative;
	  left: 5rpx;
	}
	 
	.new_img {
	  width: 90rpx;
	  height: 90rpx;
	  border-radius: 10rpx;
	}
	.my_right {
	  float: right;
	  position: relative;
	  right: 0rpx;
	}
	.history {
	  height: 100%;
	  margin: 30rpx 24rpx 30rpx;
	  font-size: 30rpx;
	  line-height: 40px;
	  word-break: break-all;
	}
	.historycon {
	  height: 90%;
	  width: 100%;
	  flex-direction: column;
	  display: flex;
	  /* margin-top: 10rpx; */
	  border-top: 0px;
	}
	.news {
	  /* margin-top: 16rpx; */
	  text-align: center;
	  margin-bottom: 150rpx;
	}
	.footershare{position: fixed;bottom:0;left: 0;right: 0;z-index: 9;background:#E6E9EB;padding:20rpx 26rpx 20rpx 18rpx;display: flex;margin:0 0rpx;align-items:center;}
	.footershare textarea{flex:1;background:#fff;min-height:60rpx;line-height:60rpx;border-radius:10rpx;padding:12rpx 10rpx;}
	.footershare .sendinput{font-size:28rpx;color:#fff;background:#2793EC;margin-left:16rpx;border-radius:10rpx;padding:18rpx 18rpx;line-height:1;}
	.footershare .sendpic{width:60rpx;height:54rpx;margin-left: 16rpx;}
	.fl{float: left;}
	.fr{float: right;}
	.clear{clear: both;}
	page{background:#F8F8F8;}
</style>
