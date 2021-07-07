<template>

	<view class="edit">
		<view class="health-title-content">
			<view class="health-title">请根据自身健康情况如实填写以下数据，我们将根据您的数据分析出您的营养情况</view>
		</view>
		<view style="background-color: #F6F6F6;height: 20rpx;"></view>
		<view class="health-content">

			<view>
				<view v-for="(item,index) in questionList" class="detailed_item" :key="index" :id="'questionid'+index">
					<view>
						<view class="qustion">
							<text v-if="item.isMust" style="color:red;">*</text>
							<view style="flex:1;">{{params.surveyId>3?nowindex:(index+seq)}}. {{item.title}}
							<!-- <text v-if="item.description">（{{item.description}}）</text> -->
							<!-- <image v-if="item.description&&item.description!=emptytext" src="../../static/icon/wenhaoIcon.png" class="questionimg ptitle" mode="widthFix" @click="openinfoframe(item.description)"></image> -->
							
							</view>
						</view>
						<view v-if="item.description&&item.description!=emptytext" v-html="item.description" class="richtextarea" style="padding-bottom:16rpx;margin-top:-10rpx;"></view>
						<view v-if="item.type===1">
							<block v-if="item.specialType===0">
								<input v-model="item.answer" :placeholder="item.tips?item.tips:'请填写'" @blur="blur(item)" />
								<view v-if="item.warn" class="mustinput">{{item.warn}}</view>
							</block>
							<block v-else-if="item.specialType===1">
								<input v-model="item.answer" :placeholder="item.tips?item.tips:'请填写'" @blur="checkMobile(item)" />
								<view v-if="item.warn" class="mustinput">{{item.warn}}</view>
							</block>
							<block v-else-if="item.specialType===2">
								<input v-model="item.answer" :placeholder="item.tips?item.tips:'请填写'" @blur="checkIDCard(item)" />
								<view v-if="item.warn" class="mustinput">{{item.warn}}</view>
							</block>
							<block v-else-if="item.specialType===3">
								<input v-model="item.answer" :placeholder="item.tips?item.tips:'请填写'" @blur="checkEmail(item)" />
								<view v-if="item.warn" class="mustinput">{{item.warn}}</view>
							</block>
							<block v-else-if="item.specialType===4">
								<picker mode="date" :value="item.answer" @change="bindDateChange($event,item)">
									{{item.answer?item.answer:(item.tips?item.tips:"选择日期")}}
								</picker>
								<view v-if="item.warn" class="mustinput">{{item.warn}}</view>
							</block>
							<block v-else-if="item.specialType===5">
								<picker @click="openareachoose(item)" disabled="true">
									{{item.answer?item.answer:(item.tips?item.tips:"请选择")}}
								</picker>
								<view v-if="item.warn" class="mustinput">{{item.warn}}</view>
							</block>
							<block v-else>
								<input v-model="item.answer" :placeholder="item.tips?item.tips:'请填写'" @blur="blur(item)" />
								<view v-if="item.warn" class="mustinput">{{item.warn}}</view>
							</block>
						</view>
						<view v-else-if="item.type===2">
							<textarea v-model="item.answer" maxlength="500" :placeholder="item.tips?item.tips:''" @blur="blur(item)" />
							<view v-if="item.warn" class="mustinput">{{item.warn}}</view>
			            </view>
			            <view v-else-if="item.type===3">
			                <radio-group v-model="item.optionId" @change="radiochoose($event,item)">
			                    <view v-for="(question,index1) in item.optionList">
									<view class="prelative">  
										<!-- <image v-if="question.description&&question.description!=emptytext" src="../../static/icon/wenhaoIcon.png" class="questionimg other" mode="widthFix" @click="openinfoframe(question.description)"></image> -->
										<radio :value="index1+''" :checked="item.optionId==question.id" :key="index1" >
											<view >{{question.serialNumber}}.{{question.title}}</view>
											<view v-if="question.description&&question.description!=emptytext" v-html="question.description" class="richtextarea" style="padding-top:8rpx;"></view>
										</radio>
										
			                        </view>
			                        <view v-if="(question.isInput==1&&question.show) || question.replyContent">
			                            <input v-model="question.replyContent" :placeholder="question.isMust?('若选'+question.serialNumber+'此项必填'):'请填写'" @blur="getReply(question,item)"/>
			                            <view v-if="question.warn" class="mustinput other">{{question.warn}}</view>
			                        </view>
			                    </view>
			                </radio-group>
			            </view>
			            <view v-else-if="item.type===4">
							<picker @change="bindPickerChange($event,item)" :value="item.value||0" :range="item.alltitle">
							    {{item.answer?item.answer:(item.tips?item.tips:"请选择")}}
							</picker>
			            </view>
			            <view v-else>
			                <checkbox-group v-model="checkedOptions" @change="handleChange($event,item)">
			                    <view v-for="(question,index1) in item.optionList" :key="index1">
			
			                        <view class="prelative">
			                        	<!-- <image v-if="question.description&&question.description!=emptytext" src="../../static/icon/wenhaoIcon.png" class="questionimg other" mode="widthFix" @click="openinfoframe(question.description)"></image> -->
											<checkbox :value="index1+''" :data-index="index1" :key="question.id" :checked="question.checked" >{{question.serialNumber}}.{{question.title}}
											<view v-if="question.description&&question.description!=emptytext" v-html="question.description" class="richtextarea" style="padding-top:8rpx;"></view>
											</checkbox>
											
			                        </view>
			                        <view v-if="(question.isInput == 1&&question.show) || question.replyContent">
			                            <input v-model="question.replyContent" :placeholder="question.isMust?('若选'+question.serialNumber+'此项必填'):'请填写'" @blur="getReply(question,item)"/>
			                            <view v-if="question.warn" class="mustinput other">{{question.warn}}</view>
			                        </view>
			                    </view>
			                </checkbox-group>
			            </view>
			        </view>
			
			
			    </view>
			</view>
			<view class="btbox flex ct">
			    <view class="submitbt pre" @click="goBack()" v-if="!(params.section==1 && params.field==1 && params.grade==1)">上一页</view>
			    <view :class="!(params.section==1 && params.field==1 && params.grade==1)?'submitbt other':'submitbt'" @click="submitNext()">确定</view>
			</view>
		</view>
		
		<n-address ref="addr" @up-data="upData" ></n-address>
		<uni-popup ref="popup" type="bottom">
			<scroll-view class="commonframebox" scroll-y="true">
				<view v-html="infodetail" class="richtextarea"></view>
			</scroll-view>
		</uni-popup>
	</view>
	
</template>

 
<script>
	import nAddress from "../../components/n-address/n-address.vue"
	let app = getApp();
	export default {
		components:{nAddress},
		data() {
			return {
				emptytext:'<p><br data-mce-bogus="1"></p>',
				current:0,
				params: {
				    surveyId:1,
				    category:2,
				    section:1,
				    field:1,
				    grade:1,
				    recordId: 0,
				},
				nomore: 0,
				fromPath: '',
				questionList:[],
				isSubmit:false,
				maxDate:new Date(),
				currentDate: new Date(),
				showPicker: false,
				citys:[],
				chownCity:'',
				checkedOptions: [],
				seq:1,  //每页的题目起始数
				num:0,   //页码
				beginArray: [],   //题目起始数组
				openareadata:undefined,
				infodetail:"", //问题描述
				nowindex:1,
			}
		},
		onLoad(options){
			let id = options.id||1;
			this.params.surveyId = id;
			this.getQuestions();
		},
		methods:{
			onClickItem(e) {
				this.current = e.currentIndex;
			},
			getseletresult(listdata){
				app.questionscreenSave(listdata).then(rs=>{
					app.loaded();
				    if(rs.status==1){
				        const{section,field,grade,nomore,recordId,toThird}=rs.data;
				        this.nomore=nomore;
				        if(nomore==0){
							this.nowindex++;
				            // this.params.section=section;
				            // this.params.field=field;
				            // this.params.grade=grade;
							this.params.section=1; this.params.field=2; this.params.grade=1;
							this.params.recordId=recordId;
				            this.getQuestions(rs.data.nextQid||"");  //取下一页的题
							
				        }else{
							if(this.params.surveyId>3){
								uni.navigateTo({
									url: "/pages/doctor/select/result?id="+this.params.surveyId
								})
							}else{
								localStorage.removeItem("reloadpage");
								this.$router.push({
									path:'/pages/patient/evaluation-results?id='+this.params.surveyId
								})
							}
							
				        }
				    }else{
				        app.tip(rs.msg)
				    }
				})
			},
			
			getseletlist(id="",recordId=""){
				app.screenNextPage({surveyId:this.params.surveyId,id,recordId:recordId}).then((res) => {
					let nowdata = res.data;
					res.data = [nowdata];
					if(!this.questionList[0]){
						this.params.section=1; this.params.field=1; this.params.grade=1;
					}
					// else{
					// 	this.params.section=1; this.params.field=2; this.params.grade=1;
					// }
					app.loaded();
					this.questionList = [];
					setTimeout(rq=>{
						this.questionList=res.data;
						for (var i = 0; i < this.questionList.length; i++) {
							let type4 = [];
							if(this.questionList[i].type==4){
								for (var j = 0; j < this.questionList[i].optionList.length; j++) {
									type4.push(this.questionList[i].optionList[j].title);
								}
								this.$set(this.questionList[i],"alltitle",type4);
							}
							if(this.questionList[i].optionId&&this.questionList[i].type==5){
								
								this.questionList[i].optionId = String(this.questionList[i].optionId);
								let optionId = this.questionList[i].optionId.split(",");
								console.log(optionId)
								for (var j = 0; j < this.questionList[i].optionList.length; j++) {
									if(optionId.indexOf(String(this.questionList[i].optionList[j].id))!=-1) this.$set(this.questionList[i].optionList[j],"checked",true);
								}
							}
						}
						// this.params.recordId=0;  //获取问题后重置回答记录id
						this.checkedOptions = [];
						document.body.scrollIntoView();
						// if(next){
						// 	this.num++;
						// 	console.log("num is:" + this.num + "  seq is:---"+this.seq);
						// }
					},100);
				})
			},
			getQuestions(next){
			    app.loading('加载中');
				if(this.params.surveyId>3){
					this.getseletlist(next);
				}else
			    app.getQuestionSecondList({...this.params}).then((res) => {
					app.loaded();
					if(next){
						this.beginArray[this.num] = this.seq;
						this.seq=this.seq+this.questionList.length;
					}
					this.questionList = [];
					setTimeout(rq=>{
						this.questionList=res.data;
						for (var i = 0; i < this.questionList.length; i++) {
							let type4 = [];
							if(this.questionList[i].type==4){
								for (var j = 0; j < this.questionList[i].optionList.length; j++) {
									type4.push(this.questionList[i].optionList[j].title);
								}
								this.$set(this.questionList[i],"alltitle",type4);
							}
							if(this.questionList[i].optionId&&this.questionList[i].type==5){
								
								this.questionList[i].optionId = String(this.questionList[i].optionId);
								let optionId = this.questionList[i].optionId.split(",");
								console.log(optionId)
								for (var j = 0; j < this.questionList[i].optionList.length; j++) {
									if(optionId.indexOf(String(this.questionList[i].optionList[j].id))!=-1) this.$set(this.questionList[i].optionList[j],"checked",true);
								}
							}
						}
						this.params.recordId=0;  //获取问题后重置回答记录id
						this.checkedOptions = [];
						document.body.scrollIntoView();
						if(next){
							this.num++;
							console.log("num is:" + this.num + "  seq is:---"+this.seq);
						}
					},100);
			        
			    })
			},
			blur(item){
			    if(item.isMust){
			        if(item.answer.length==0){
			            this.$set(item,"warn","此项必填！");
			            this.isSubmit=false;
			            return;
			        }else{item.warn="";}
			    }
			},
			checkMobile(item){
			    this.blur(item);
			    let value=item.answer;
			    if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
			        this.$set(item,"warn","手机号格式不正确");
			    }
			},
			checkEmail(item){
			    this.blur(item);
			    let value=item.answer;
			    let temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
			    let tempOne = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
			    if (value && (!(temp).test(value))) {
			        this.$set(item,"warn","邮箱格式不正确");
			    }
			},
			checkIDCard(item) {
			    this.blur(item);
			    let value=item.answer;
			    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
			        this.$set(item,"warn","身份证号码不符合规范");
			    }
			},
			bindDateChange(e,item) {
				item.answer = e.detail.value;
			},
			bindPickerChange(e,item) {
				this.$set(item,"value",e.detail.value);
				item.answer = item.optionList[e.detail.value].title;
				item.optionId = item.optionList[e.detail.value].id;
			},
			handleChange(e,item){
			    let optionIds="";
			    let arr=e.detail.value;
				let optionList = item.optionList;
				let diff = getArrDifference(this.checkedOptions,e.detail.value);
				// console.log(diff,this.checkedOptions,e.detail.value)
				let question = optionList[diff[0]];
			    for(var i=0;i<arr.length;i++){
			        optionIds=optionIds+optionList[arr[i]].id+",";
			    }
			    item.optionId=optionIds;
				this.checkedOptions = [...e.detail.value];
			    if(question.isInput&&!question.show) {this.$set(question,"show",1);return;}
			    if(question.isInput&&question.show) this.$set(question,"show",0);
				
			},
			submitNext(){
			    let list = this.questionList;
			    for(let i=0,l=list.length;i<l;i++){
			        if(list[i].isMust==1){
			            if(list[i].type==1||list[i].type==2){
			                if(!list[i].answer) {app.tip(`请完成该页的第${i+1}题`);this.tooneposition(i);return;}
			                continue;
			            }
			            if(list[i].type==3||list[i].type==4||list[i].type==5){
			                if(!list[i].optionId) {app.tip(`请完成此页的第${i+1}题`);this.tooneposition(i);return;}
			                let ql = list[i].optionList;
			                if(list[i].type==3)
			                    for(let j=0,k=ql.length;j<k;j++){
			                        if(ql[j].isMust&&list[i].optionId==ql[j].id&&!ql[j].replyContent){
			                            {app.tip(`请完成此页的第${i+1}题`);this.tooneposition(i);return;}
			                        }
			                    }
			                if(list[i].type==5)
			                    for(let j=0,k=ql.length;j<k;j++){
			                        if(ql[j].isMust&&(list[i].optionId.indexOf(ql[j].id)>-1)&&!ql[j].replyContent){
			                            {app.tip(`请完成此页的第${i+1}题`);this.tooneposition(i);return;}
			                        }
			                    }
			            }
			        }
					
			    }
				let listdata = JSON.parse(JSON.stringify(list));
				for(let i=0,l=listdata.length;i<l;i++){
					if(listdata[i].description) listdata[i].description="";
					for (let j = 0; j < listdata[i].optionList.length; j++) {
						if(listdata[i].optionList[j].description) listdata[i].optionList[j].description="";
						if(listdata[i].optionList[j].title) listdata[i].optionList[j].title=encodeURI(listdata[i].optionList[j].title);
					}
				}
			    console.log(listdata);
				app.loading("加载中");
				if(this.params.surveyId>3){
					this.getseletresult(listdata);
				}else
			    app.replySecond(listdata).then(rs=>{
					app.loaded();
			        if(rs.status==1){
			            const{section,field,grade,nomore,toThird}=rs.data;
			            this.nomore=nomore;
			            if(nomore==0){
			                this.params.section=section;
			                this.params.field=field;
			                this.params.grade=grade;
			                this.getQuestions("next");  //取下一页的题
			
			            }else{
							if(this.params.surveyId>3){
								uni.navigateTo({
									url: "/pages/doctor/select/result?id="+this.params.surveyId
								})
							}else{
								localStorage.removeItem("reloadpage");
								this.$router.push({
									path:'/pages/patient/evaluation-results?id='+this.params.surveyId
								})
							}
							
			            }
			        }else{
			            app.tip(rs.msg)
			        }
			    })
			},
			getReply(option,item){
			
			    if(option.isMust){
			        if(option.replyContent.length==0){
			            this.$set(option,"warn","此项必填！");
			            this.isSubmit=false;
			            return;
			        }else{this.$set(option,"warn","");}
			    }
			
			},
			goBack(){
			    console.log("回退开始")
			    this.num--;
			    this.seq=this.beginArray[this.num];
				if(this.params.surveyId>3){
					app.screenPrevPage({surveyId:this.params.surveyId,id:this.questionList[0].id,recordId:this.params.recordId}).then((res) => {
						if(this.nowindex>1) this.nowindex--;
						if(this.nowindex==1){this.params.section=1; this.params.field=1; this.params.grade=1;}
						this.getseletlist(res.data.id,this.params.recordId);
					})
				}else
			    app.getPreQuestionPage({...this.params}).then((res) => {
			        if(res.status==1){
			
			            const{section,field,grade,recordId}=res.data;
			            console.log("pre----"+res.data);
			            this.params.section=section;
			            this.params.field=field;
			            this.params.grade=grade;
			            this.params.recordId=recordId;
			            this.getQuestions();  //取上一页的题
			
			        }else{
			            app.tip({message: res.msg, duration: 2000})
			        }
			    })
			    console.log("back num"+this.num+"  back seq :---"+this.seq);
			},
			tooneposition(index){
			    let btn = document.getElementById('questionid'+index);
			    document.body.scrollTop = btn.offsetTop-50;
			    document.documentElement.scrollTop = btn.offsetTop-50;
			    window.pageYOffset = btn.offsetTop-50;
			},
			radiochoose(e,item){
				let question = item.optionList[e.detail.value];
				item.optionId = question.id;
			    if(question.isInput) this.$set(question,"show",1);
			    let list = item.optionList;
			    for(let i=0,l=list.length;i<l;i++){
			        if(list[i].isInput&&list[i].show&&list[i].id!=question.id) list[i].show = 0;
			    }
			},
			//省市区
			openareachoose(item){
				this.openareadata = item;
				this.$refs['addr'].popUp();
			},
			upData (e) {
			    console.log(e)
				this.openareadata.answer = e.regionArr.join(" ");
			},
			openinfoframe(item){
				this.infodetail = item;
				this.$refs.popup.open();
			},
		}
	}
	function getArrDifference(arr1, arr2) {
	   return arr1.concat(arr2).filter(function(v, i, arr) {
	      return arr.indexOf(v) === arr.lastIndexOf(v);
	   });
	}
</script>

<style lang="scss">
	.edit{
		padding-bottom:50rpx;color: #272727;
		uni-checkbox .uni-checkbox-input {
		    border: 1px solid #26c39c;
		    background-color: #21803c;
		}
		uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		    color: #007aff!important;
		}
		uni-picker{
			border: 1rpx solid #ddd;padding:15rpx 18rpx;border-radius:8rpx;font-size:30rpx;line-height: 1.5;
		}
		uni-textarea{
			border: 1rpx solid #ddd;padding:15rpx 18rpx;border-radius:8rpx;font-size:30rpx;width:100%;line-height:40rpx;height:150rpx;box-sizing:border-box;
		}
	}
/* 	.navigationBar{
		position: absolute;
		height: 50px;
		width: 100%;
		background-color: #f2f2f2;
		margin: auto;
	}
 */
	.health-title {
		padding: 35rpx 38rpx 35rpx;
		line-height: 50rpx;
		font-size: 30rpx;
		color: #333333;
	}
	
	.health-content {
		background-color: white;padding: 35rpx 38rpx 0rpx;font-size: 30rpx;
		.health-item {
			
			.health-item-title {
				color: #333333;
				font-size: 30rpx;
			}
			.health-item-input {
				margin-top: 30rpx;
				padding-left: 40rpx;
				height: 76rpx;
				border: 1rpx #E5E5E5 solid;
				border-radius: 4rpx;
			}
			.i-checked-item {
				height: 76rpx;
				margin-top: 22rpx;
				padding: 0 40rpx;
				color: #666666;
				justify-content: space-between;
				font-size: 30rpx;
				border: 1rpx #E5E5E5 solid;
				border-radius: 4rpx;
				display: flex;
				align-items: center;
				.uni-checkbox-input{
					border: 1rpx solid #999999;
				}
			}
			
		}
		
		.health-update {
			  text-align: center;
			  margin-top: 70rpx;
			  margin-bottom: 50rpx;
			  width: 100%;
			  .health-update-button {
			  	 margin-left: 60rpx;
				 margin-right: 60rpx;
			  	 height: 90rpx;
			  	 font-size: 34rpx;
			  	 color: white;
			  	 background-color: #52A29E;
			  	 border-radius: 45rpx;
			  }
		}
	}
	
	//
	.mustinput{font-size: 26rpx;color: #e75656;padding-left:10rpx;}
	.mustinput.other{margin:-0.2rem 0 0.2rem;}
	.detailed_item{padding-bottom:0.67rem;}
	.qustion{font-size: 30rpx;padding-bottom:16rpx;display: flex;align-items: flex-start;flex-wrap: wrap;}
	.btbox{margin-top:1.0rem;}
	.submitbt{
	    line-height: 88rpx;
	    background: #52A29E;
	    border-radius: 45rpx;
	    font-size: 34rpx;border: 1rpx solid #2FAF36;
	    width:100%;
	    color: #FFFFFF;
	    text-align: center;
	}
	.submitbt.pre{background: #fff;color:#000000;width:40%;margin-right:10%;line-height: 76rpx;}
	.submitbt.other{width:40%;line-height: 76rpx;}
	uni-input{border: 1rpx solid #ddd;padding:15rpx 18rpx;border-radius:8rpx;font-size:30rpx;color: #272727;}
	.health-content uni-radio-group{
	    display: block;
		uni-radio{
			display:block;line-height: 1.3;background: #FFFFFF;border-radius: 8rpx;border: 1rpx solid #ddd;margin-bottom:26rpx;text-align: left;color: #272727;padding:25rpx 0;
			
		}
	    uni-input{margin-bottom:20rpx;}
	}
	uni-checkbox-group{
	    display: block;
		uni-checkbox{display:block;line-height: 1.3;background: #FFFFFF;border-radius: 8rpx;border: 1rpx solid #ddd;margin-bottom:26rpx;text-align: left;color: #272727;padding:25rpx 0;}
	    uni-input{margin-bottom:20rpx;}
	}
	.questionimg{width:30rpx;
		&.ptitle{margin-left:10rpx;top: 6rpx;}
		&.other{position:absolute;z-index:3;left: 10rpx;top: 28rpx;}
	}

</style>
