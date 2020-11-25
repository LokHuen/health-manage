<template>
	
	<view class="edit">
		<view class="health-title-content">
			<view class="health-title">请根据自身健康情况如实填写以下数据，我们将根据您的数据分析出您的营养情况</view>
		</view>
		<view style="background-color: #F6F6F6;height: 20rpx;"></view>
		<view class="health-content">
			<!--
			<view  v-for="(item,index) in listDatas" >
				<view class="health-item">
					<view class="health-item-title">{{item.title}}</view>
					<input class="health-item-input" placeholder-style="color:#999999;font-size:30rpx" :placeholder="112" />
				</view>
			</view>
			<view class="health-item">
				<view class="health-item-title">5、最近2周内我的体重</view>
				<view class="i-checked-item">
					<text class="i-checked-label">下降</text>
					<checkbox></checkbox>
				</view>
				<view class="i-checked-item">
					<text class="i-checked-label">下降</text>
					<checkbox></checkbox>
				</view>
				<view class="i-checked-item">
					<text class="i-checked-label">下降</text>
					<checkbox></checkbox>
				</view>
			</view>
			
			<view class="health-update">
				<button class="health-update-button">确定</button>
			</view>
			  -->
			<view>
			    <view v-for="(item,index) in questionList" class="detailed_item" :key="index" :id="'questionid'+index">
			        <view>
			            <view class="qustion">
			                <text v-if="item.isMust" style="color:red;">*</text>
			                {{index+seq}}. {{item.title}}
			                <text v-if="item.description">（{{item.description}}）</text>
			            </view>
			            <view v-if="item.type===1">
			                <block v-if="item.specialType===0">
			                    <input v-model="item.answer" :placeholder="item.tips?item.tips:''" @blur="blur(item)" />
			                    <view v-if="item.warn" class="mustinput">{{item.warn}}</view>
			                </block>
			                <block v-else-if="item.specialType===1">
			                    <input v-model="item.answer" :placeholder="item.tips?item.tips:''" @blur="checkMobile(item)" />
			                    <view v-if="item.warn" class="mustinput">{{item.warn}}</view>
			                </block>
			                <block v-else-if="item.specialType===2">
			                    <input v-model="item.answer" :placeholder="item.tips?item.tips:''" @blur="checkIDCard(item)" />
			                    <view v-if="item.warn" class="mustinput">{{item.warn}}</view>
			                </block>
			                <block v-else-if="item.specialType===3">
			                    <input v-model="item.answer" :placeholder="item.tips?item.tips:''" @blur="checkEmail(item)" />
			                    <view v-if="item.warn" class="mustinput">{{item.warn}}</view>
			                </block>
			                <block v-else-if="item.specialType===4">
								<picker mode="date" :value="item.answer" @change="bindDateChange($event,item)">
								    {{item.answer?item.answer:(item.tips?item.tips:"选择日期")}}
								</picker>
			                    <view v-if="item.warn" class="mustinput">{{item.warn}}</view>
			                </block>
			                   <block v-else-if="item.specialType===5">
			                       <input  v-model="item.answer" :placeholder="item.tips?item.tips:''" @blur="blur(item)" />
			                       <view v-if="item.warn" class="mustinput">{{item.warn}}</view>
			                   </block>
			                <block v-else>
			                    <input  v-model="item.answer" :placeholder="item.tips?item.tips:''" @blur="blur(item)" />
			                    <view v-if="item.warn" class="mustinput">{{item.warn}}</view>
			                </block>
			            </view>
			            <view v-else-if="item.type===2">
			                    <textarea v-model="item.answer"
			                              maxlength="500"
			                              :placeholder="item.tips?item.tips:''"
			                              @blur="blur(item)"
			                    />
			                <view v-if="item.warn" class="mustinput">{{item.warn}}</view>
			            </view>
			            <view v-else-if="item.type===3">
			                <radio-group v-model="item.optionId" @change="radiochoose($event,item)">
			                    <view v-for="(question,index1) in item.optionList">
			
			                        <view>    <radio :value="index1+''" :key="index1" >{{question.serialNumber}}.{{question.title}}</radio>
			                        </view>
			                        <view v-if="(question.isInput==1&&question.show) || question.replyContent">
			                            <input v-model="question.replyContent" :placeholder="question.isMust?('若选'+question.serialNumber+'此项必填'):'请填写'" @blur="getReply(question,item)"/>
			                            <view v-if="question.warn" class="mustinput other">{{question.warn}}</view>
			                        </view>
			                    </view>
			                </radio-group>
			            </view>
			            <view v-else-if="item.type===4">
			                <!-- <select v-model="item.optionId" :placeholder="item.tips?item.tips:''">
			                    <option v-for="(question,index) in item.optionList" :key="index" :label="question.title" :value="question.id"></option>
			                </select> -->
							<picker @change="bindPickerChange($event,item)" :value="item.value||0" :range-key="title" :range="item.optionList">
							    {{item.answer?item.answer:(item.tips?item.tips:"请选择")}}
							</picker>
			            </view>
			            <view v-else>
			                <checkbox-group v-model="checkedOptions" @change="handleChange($event,item)">
			                    <view v-for="(question,index1) in item.optionList" :key="index1">
			
			                        <view>    <checkbox :value="index1+''"  :key="question.id" >{{question.serialNumber}}.{{question.title}}</checkbox>
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
		
		
	</view>
	
</template>

 
<script>
	let app = getApp();
	export default {
		data() {
			return {
				listDatas:[{
						title:"1、我现在的体重是（单位：公斤）",
						detail:"",
						placeholder:"请填写公斤数"
					}, {
						title:"2、我的身高是（单位：米）",
						detail:"",
						placeholder:"请填写"
					}, {
						title:"3、1月前我的体重是（单位：公斤）",
						detail:"",
						placeholder:"请填写公斤数"
					}, {
						title:"4、6月前我的体重是（单位：公斤）",
						detail:"",
						placeholder:"请填写公斤数"
					}
				],
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
			getQuestions(){
			    app.loading('加载中');
			    app.getQuestionSecondList({...this.params}).then((res) => {
			        this.questionList=res.data;
			        this.params.recordId=0;  //获取问题后重置回答记录id
			        app.loaded();
			        document.body.scrollIntoView();
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
			handleChange(e,optionList,item,question){
			    console.log(item.optionId)
			    let optionIds="";
			    let arr=this.checkedOptions;
				let optionList = item.
			    for(let item of optionList){
			        for(var i=0;i<arr.length;i++){
			            if(item.id==arr[i]){
			                optionIds=optionIds+arr[i]+",";
			            }
			        }
			    }
			    item.optionId=optionIds;
			    if(question.isInput&&!question.show) {this.$set(question,"show",1);return;}
			    if(question.isInput&&question.show) this.$set(question,"show",0);
			},
			submitNext(){
			    console.log(this.questionList);
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
			    this.beginArray[this.num] = this.seq;
			    this.seq=this.seq+this.questionList.length;
			    this.num++;
			    console.log("num is:" + this.num + "  seq is:---"+this.seq);
			    app.replySecond(this.questionList).then(rs=>{
			        if(rs.status==1){
			            const{section,field,grade,nomore,toThird}=rs.data;
			            this.nomore=nomore;
			            if(nomore==0){
			                this.params.section=section;
			                this.params.field=field;
			                this.params.grade=grade;
			                this.getQuestions();  //取下一页的题
			
			            }else{
			                if(toThird==1){
			                    this.$router.push({
			                        path:'/question_list_3?id='+this.params.surveyId+"&isapp="+this.isapp
			                    })
			
			                }else{
			                    this.$router.push({
			                        path:'/question_result?id='+this.params.surveyId+"&isapp="+this.isapp
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
				console.log(e)
				let question = item.optionList[e.detail.value];
				item.optionId = question.id;
			    if(question.isInput) this.$set(question,"show",1);
			    let list = item.optionList;
			    for(let i=0,l=list.length;i<l;i++){
			        if(list[i].isInput&&list[i].show&&list[i].id!=question.id) list[i].show = 0;
			    }
			},
		}
	}
	
</script>

<style lang="scss">
	.edit{
		padding-bottom:50rpx;
		uni-checkbox .uni-checkbox-input {
		    border: 1px solid #26c39c;
		    background-color: #21803c;
		}
		uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		    color: #007aff!important;
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
	.qustion{font-size: 30rpx;padding-bottom:16rpx;}
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
	.submitbt.pre{background: #fff;color:#000000;width:45%;margin-right:10%;}
	.submitbt.other{width:45%;}
	uni-input{border: 1rpx solid #ddd;padding:15rpx 18rpx;border-radius:8rpx;font-size:30rpx;color: #272727;}
	.health-content uni-radio-group{
	    display: block;
		uni-radio{
			display:block;line-height: 76rpx;background: #FFFFFF;border-radius: 8rpx;border: 1rpx solid #ddd;margin-bottom:26rpx;text-align: left;color: #272727;
			
		}
	    uni-input{margin-bottom:0.3rem;}
	}
	uni-checkbox-group{
	    display: block;
		uni-checkbox{display:block;line-height: 76rpx;background: #FFFFFF;border-radius: 8rpx;border: 1rpx solid #ddd;margin-bottom:26rpx;text-align: left;color: #272727;}
	    uni-input{margin-bottom:0.3rem;}
	}
	
</style>
