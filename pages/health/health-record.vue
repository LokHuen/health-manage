<template>
	<view class="page">
			<!--滑动区-->
			<scroll-view scroll-y :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
					<view class="scroll-bg">
						<view class="box-container">
							<text v-for="(item, index) in titleList" class="quiz-title" v-if="titleIndex == index">{{ item }}</text>
							<view class="status-item" v-for="(item, index) in infoList">
								<text class="main-title" v-if="item.id == 105">- 血压 -</text>
								<!-- <view class="title" v-show="item.title">{{ item.title }}</view> -->
								<view class="title-box">
									<text class="input-title":id="'question'+item.id"  :class="{'question-title':item.isMust == 1}" >{{index + 1 + '.' + item.title}}</text>
									<text class="input-title" v-if="item.type==3" style="color: #BDBDBD;font-weight: 400;">[单选]</text>
									<text class="input-title" v-if="item.type==5" style="color: #BDBDBD;font-weight: 400;">[可多选]</text>
								</view>
								<input class="input-items" type="text" v-model="item.answer" :placeholder="'请填写患者' + item.title" placeholder-style="color:#BDBDBD;" v-if="item.type==1"/>
								<view class="check-box" v-if="item.type==3">
									<radio-group style="width: 100%;" v-model="item.optionId" @change="radioChoose($event, item)" v-if="item.type==3">
										<view class="item-box" >
											<label class="option-item" v-for="(qitem, i) in item.optionList">
												<radio class="check-point" :value="''+i"/><text class="check-text">{{ qitem.title }}</text>
											</label>
										</view>
									</radio-group>
								</view>
								<view class="check-box" v-if="item.type==5">
									<checkbox-group style="width: 100%;" v-model="checkedOptions" @change="checkChoose($event, item)">
										<view class="item-box">
											<label class="option-item" v-for="(qitem, i) in item.optionList" :key="i">
												<checkbox class="check-point" :value="i+''" :data-index="i" :key="qitem.id" :checked="qitem.checked"/><text class="check-text">{{qitem.serialNumber}}.{{qitem.title}}</text>
												<!--其他选项输入框-->
											</label>
											
										</view>
									</checkbox-group>
									<input v-show="1" :placeholder="item.optionList[index]" type="text" value="" style="border-bottom: 1px solid #BDBDBD;" />
								</view>
							</view>
						</view>
						<view class="btn-box">
							<button class="submitbt" type="primary" @click="back" v-if="this.params.section>1">{{ btnText1 }}</button>
							<button class="submitbt" type="primary" @click="getNextPage" >{{ btnText2 }}</button>
						</view>
					</view>
			</scroll-view>
	</view>
</template>

<script>
const app = getApp();
	export default {
		data() {
			return {
				checkedOptions: [],
				selectType: ['单选', '多选'],
				btnText1: '上一页',
				btnText2: '下一页',
				titleIndex: 0,
				titleList: [ '第一部分 基础信息& 健康情况', '第二部分 饮食情况', '第三部分 运动情况', '第四部分 睡眠情况', '第五部分 情绪情况', '第六部分 吸烟与饮酒情况'],
				scrollTop: 0,
				    old: {
				        scrollTop: 0
				    },
				infoList:'',
				params: {
				    surveyId: 7,
				    category: 2,
				    section: 0,
				    field: '',
				    grade:'',
				    recordId: '',
				},
			}
		},
		watch:{
			scrollTop:(newVal,oldVal)=>{
				console.log('newVal:'+ newVal, 'oldVal:'+ oldVal)
			}
		},
		mounted() { 
			this.getInfoList()
		},
		filters: {

		  },
		methods: {
			getReply(option,item){
			
			    if(option.isMust){
			        if(option.replyContent.length==0){
			            this.$set(option,"warn","此项必填！");
			            this.isSubmit=false;
			            return;
			        }else{this.$set(option,"warn","");}
			    }
			
			},
			getArrDifference(arr1, arr2) {
				// v:当前元素的值
				// i:当前元素的索引值
				// arr:当前元素属于的数组对象
			   return arr1.concat(arr2).filter((v, i, arr)=>{
				   return arr.indexOf(v)===arr.lastIndexOf(v);
			   });
			  },
			checkChoose(e,item){
				uni.showToast({
					title: '选择了',
					icon: 'success',
					duration: 1000
				});
				// console.log(item.checkedOptions);
				let questionList = item.optionList;
				let diff = this.getArrDifference(this.checkedOptions, e.detail.value);//筛选不同的选项
				this.checkedOptions = e.detail.value;
				let question = questionList[diff[0]];//不同的选项
				let values = e.detail.value;
				if(question.isInput&&!question.show) {this.$set(question,"show",1);return;}
				if(question.isInput&&question.show) this.$set(question,"show",0);
				for (var i = 0, lenI = questionList.length; i < lenI; ++i) {
					if(values.includes(questionList[i].value)){
						this.$set(questionList[i],'checked',true)
					}else{
						this.$set(questionList[i],'checked',false)
					}
				}
				//赋值给已选择列表
				item.optionId = this.checkedOptions;
			},
			radioChoose(e, item) {
				console.log(e, item);
				console.log(item.optionId);
				let question = item.optionList[e.detail.value];
				console.log(item.optionId);
				item.optionId = question.id;
				if(question.isInput) this.$set(question,"show",1);
				let list = item.optionList;
				for(let i=0,l=list.length;i<l;i++){
				    if(list[i].isInput&&list[i].show&&list[i].id!=question.id) list[i].show = 0;
				}
			},
			upper: function(e) {
					// console.log(e)
			},
			lower: function(e) {
				// console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop;
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			goToQuestion(i) {
				this.scrollTop = this.old.scrollTop;
				uni.createSelectorQuery().select("#question"+i).boundingClientRect(data=>{//目标节点、也可以是最外层的父级节点
					uni.createSelectorQuery().select(".box-container").boundingClientRect(res=>{//目标节点、也可以是最外层的父级节点
						this.$nextTick(()=>{
							this.scrollTop = data.top-res.top;
						});
					　}).exec()
				}).exec()
			},
			getInfoList() {
				this.goTop();
				if(this.params.section == 6) {
					this.btnText2 = '提交';
					return
				}else{
					this.params.section++
				}
				this.titleIndex = this.params.section-1;//获取标题index值
				 app.getQuestionSecondList({...this.params}).then((res) => {
					 this.infoList = res.data;
					 //格式化选项序号 A-Z
					 for(let i=0; i<this.infoList.length; i++){
						 for(let j=0; j<this.infoList[i].optionList.length; j++){
							 this.infoList[i].optionList[j].serialNumber = String.fromCharCode(j+65);
							 //String.fromCharCode() 接受一个指定的 Unicode 值，然后返回一个字符串。
							 // console.log(this.infoList[i].optionList[j].serialNumber);
						 }
					 }
					 console.log(this.infoList);
				 })
			},
			getNextPage() {
				let list = this.infoList;
				for(let i=0; i<list.length; i++){
					//检测是否必填
					if(list[i].isMust){
						//检测题目类型是否填空题
						if(list[i].type==1||list[i].type==2){
							//检测题目答案是否为空
							if(!list[i].answer){
								uni.showToast({
									title: "请完成第"+ (i+1) +"题",
									icon: "error",
									duration: 2000
								});
								//跳转到未完成题目位置
								this.goToQuestion(list[i].id);
								return;
							}
							continue;
						}
						
						// 检测是否选择题
						if(list[i].type==3||list[i].type==4||list[i].type==5){
							if(!list[i].optionId){
								uni.showToast({
									title: "请完成第"+ (i+1) +"题",
									icon: "error",
									duration: 2000
								});
								this.goToQuestion(list[i].id);
								return;
							}
							let opt = list[i].optionList;
							if(list[i].type==3)
							    for(let j=0; j<opt.length; j++){
							        if(opt[j].isMust&&list[i].optionId==opt[j].id&&!opt[j].replyContent){
							            {app.tip(`请完成此页的第${i+1}题`);this.goToQuestion(i);return;}
							        }
							    }
							if(list[i].type==5)
							    for(let j=0; j<opt.length; j++){
							        if(opt[j].isMust&&(list[i].optionId.indexOf(opt[j].id)>-1)&&!opt[j].replyContent){
							            {app.tip(`请完成此页的第${i+1}题`);this.goToQuestion(i);return;}
							        }
							    }
						}
					}
				}
				this.getInfoList();
			},
			back() {
				this.goTop();
				if(this.params.section==1){
					return
				}else{
					this.params.section--
				}
				this.titleIndex = this.params.section-1;//更新标题index值
				app.getQuestionSecondList({...this.params}).then((res) => {
					this.infoList = res.data;
					console.log(this.infoList);
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	
	.page {
	  height: 100vh;
	  width: 100vw;
	  display: flex;
	  flex-direction: column;
	  background: #fff;
	  .scroll-Y {
		  height: 100%;
	  }
	  .btn-box {
	  	display: flex;
	  	.submitbt {
	  		border-radius: 45rpx;
	  		background: #57C1BB;
	  		margin:0 30rpx;
	  		flex: 1;
	  	}
	  }
	}
	.box-container{
	  box-sizing: border-box;
	  padding: 40rpx 30rpx 50rpx 40rpx;
	  background: #fff;
	  border-radius: 30rpx;
	  width: 100%;
	  padding-bottom: 88rpx;
		  .quiz-title {
			  display: block;
			  // justify-content: center;
			  // margin: 0 auto;
			  // width: 100%;
			  text-align: center;
		  }
		  .status-item {
			  width: 100%;
			  margin: 0;
			  display: flex;
			  flex-direction: column;
			  box-sizing: border-box;
			  font-size: 28rpx;
			  flex-wrap: wrap;
			  
			  .main-title {
				  font-size: 32rpx;
				  font-weight: 700;
				  padding-top: 30rpx;
			  }
			  .check-box {
				  display: flex;
				  flex-direction: row;
				  width: 100%;
				  flex-wrap: wrap;
				  
				  .item-box {
					  width: 100%;
					  display: flex;
					  flex-wrap: wrap;
				  }
			  }
			  .option-item {
				  min-width: 50%;//短的一行两个
				  max-width: 100%;//长的一行一个
				  display: flex;
				  position: relative;
				  // width: 50%;
				  // flex: 0 0 50%;
				  // justify-content: space-around;
				  margin-bottom: 20rpx;
				  
				  .check-text {
					  color: #333;
					  word-spacing: 0;
					  // white-space: nowrap;//不允许换行
				  }
				  .check-point {
					  margin-right: 15rpx;
				  }
			  }
			  .title-box{
				  display: flex;
				 .input-title {
					  font-size: 28rpx;
					  font-weight: 700;
				 	  color: #333;
					  padding: 30rpx 0;
				 } 
			  }
			  
			  .question-title::after {
				  content: '* ';
				  color: red;
				  font-size: 28rpx;
				  font-weight: 700;
				  padding: 30rpx 0;
			  }
			  .input-items {
			  	  color: #333;
			  	  font-size: 28rpx;
				  border-bottom: 1rpx solid #EBECF2;
				  padding-bottom: 20rpx;
			  }
		  }

	}
	.scroll-bg{
	  width: 100vw;
	  padding-bottom: 50rpx;
	  background: #FFF;
	 /* background-image: url(https://636c-cloud1-5gfii8jlc56b5045-1306536140.tcb.qcloud.la/wxfile/background.png?sign=6a62c2c13c024f0091a1f8034f4d6155&t=1627552695);
	  background-repeat: no-repeat; */
	  // background: -webkit-linear-gradient(#4fbeb7, #FFF);
	  //         /*  Safari 5.1 到 6.0 */
	  // background: -o-linear-gradient(#4fbeb7, #FFF);
	  //         /*  Opera 11.6 到 12.0 */
	  // background: -moz-linear-gradient(#4fbeb7, #FFF);
	  //         /*  Fx 3.6 到 15 */
	  // background: linear-gradient(#4fbeb7, #FFF);
	  // background-size: contain;
	  /* background-position: 0 -10vh; */
	}/*背景*/
	.box {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		box-shadow: 2rpx 0rpx 24rpx rgba(0,0,0,0.1);
		box-sizing: border-box;
	}	
	.btn-box {
		display: flex;
		.submitbt {
			border-radius: 45rpx;
			background: #57C1BB;
			margin:0 30rpx;
			flex: 1;
		}
	}
</style>
