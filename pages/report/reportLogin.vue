<template>
	<view id="reportLogin">
		<view class="from">
			<view class="item">
				<input v-model="name" placeholder=" 请输入姓名"/>
			</view>
			<view class="item">
				<input v-if="!model" v-model="idCard" placeholder=" 请输入身份证号"/>
				<input v-if="model" v-model="mobile"  placeholder=" 请输入手机号码"/>
			</view>
			<view class="item" v-if="model" style="display:flex">
				<input v-model="verifyCode" placeholder="请输入验证码" style="display: inline-block;"/>
				<button style="float: right;width: 300upx;padding: 0;" type="primary" id='code' @click="getVerifyCode">获取验证码</button>
			</view>
			<button class="checkBtn" type="primary" @click="reportLogin" >查询</button>
			<view class="item" style="border: none;">
				<view class="descTip" v-if="!model" @click="changeModel">通过手机号码查询</view>
				<view class="descTip" v-if="model" @click="changeModel">通过身份证号码查询</view>
			</view>
		</view>
	</view>
</template>  

<script>
    import ReportApi from '@/common/reportApi'
    import inpurField from './components/inpurField'
    import { trim } from '@/common/common'
	export default {
		components: {
			inpurField
		},
		data() {
			return {
				isLogin:false,
				model: false, //true为通过身份号查询  false为通过手机号查询
				visibility: false,
				name: '',
				idCard: '',
				mobile: '',
                isSend: false,                  // 是否发送验证码
                codeTimer: null,                // 定时器
				infos: null,
                verifyCode: ''             // 验证码
			};
		},
		methods: {
			/* 切换身份证或者手机号 */
			changeModel(){
				this.model=!this.model;
				if(this.model){
					this.idCard=""
				}else{
					this.mobile=""
				}
			},
			/* 提示 */
			indicator() {
				this.$indicator.open('正在查询...');
				var timer = setInterval(() => {
					if (this.isLogin) {
						this.$indicator.close();
						window.clearTimeout(timer);
					}
				}, 100)
			},
            getVerifyCode() {
                 console.log('mobile------'+this.mobile)
                const { mobile } = this.mobile;
                if (this.isSend) return false;
                if (!this.mobile) {
                    console.log("----"+this.mobile);
                    wx.showToast({ 
						title: '请填写手机号', 
						icon: 'error',
						duration: 2000
						});
                    return;
                }else if(!/^1[0-9]{10}$/.test(this.mobile)) {
					wx.showToast({
						title: '请填写正确手机号码', 
						icon: 'error',
						duration: 2000
						});
                    return;
                }
                this.isSend = true;

                ReportApi.getSms({ mobile:this.mobile }).then(res => {
					wx.showToast({
						title: '获取验证码成功', 
						icon: 'success',
						duration: 3000
						});
                    setTimeout(() => {
                        this.isSend = true
                        let ss = 180
                        this.codeTimer = setInterval(() => { // 倒计时
                            if (ss <= 1) {
                                // console.log('code',this.$refs.code)
                                document.getElementById('code').innerHTML = '重新获取'
                                this.isSend = false;
                                clearInterval(this.codeTimer)
                                return false
                            } else {
                                ss--
                                document.getElementById('code').innerHTML = ss + 's 后重新获取'
                            }
                        }, 1800)
                    }, 1800)
                }).catch(err => {
                    this.isSend = false;
                    // console.log(err)
					wx.showToast({
						title: '获取失败', 
						icon: 'error',
						duration: 3000
						});
                })
            },

			reportLogin() {
				if(this.verification() == false) {
					return;
				}
				if(this.model){
					var req = {
						name: this.name,
						mobile: this.mobile,
                        verifyCode: this.verifyCode,
					    idCard: ''
					}
				}else{
					var req = {
						name: this.name,
						idCard: this.idCard,
						mobile: ''
					}
				}
				//type为0则告诉接口通过身份证查询				
                clearInterval(this.codeTimer)
                ReportApi.getReportList(req).then((res) => {
					console.log(res.data);
					console.log(req);
					if(res.status > 0){
					    if(res.msg != ''){
                            this.message(res.msg);
                        }else{
                            if(res.data.list.length > 0 ) {

                                this.$router.push({
                                    path: '/pages/report/reportList',
                                    query:req
                                })
                            }
                            else{
                                this.message("未查询到报告信息，请确认输入信息是否正确！");
                            }
                            this.isLogin=true;
                        }

					}
				})
			},
			/* 当只存在一份报告直接跳转到进度页面 */
			toProgressPage(){

			},
			verification() {
				if(trim(this.name) == '') {
					return this.message('姓名不能为空');
				}
				if(!this.model) {
					if(trim(this.idCard) == '') {
						return this.message('身份证号码不能为空');
					}
				} else {
					if(trim(this.mobile) == '') {
						return this.message('手机号码不能为空');
					}else if(!/^1[0-9]{10}$/.test(this.mobile)) {
                        return this.message('请填写正确手机号码');
                    }
                    if(trim(this.verifyCode) == ''){
                        return this.message('请填写短信验证码');
					}
				}

			},
			//弹出提示框
			message(message) {
				wx.showToast({
					title: message,
					icon: 'error',
					duration: 1000
					});
				return false;
			},
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#reportLogin {
		box-sizing: border-box;
		width: 100vw;
		padding: 0 30upx;
		// background: #10AEFF;
		float: left;
		// position: relative;
		.from {
			margin: 0 auto;
			// position: absolute;
			width: 100%;
			height: auto;
			// background: red;
			.checkBtn {
				width: 100%;
				margin-top: 1rem;
				font-size: 60upx;
				height:100upx;
				line-height: 100upx;
			}
			.item {
				box-sizing: border-box;
				border: #bbb solid 1upx;
				border-radius: 10rpx;
				// padding: 20rpx;
				padding-left: 20upx;
				margin-top: 1rem;
				width: 100%;
				height: 100upx;
				line-height: 1.7rem;
				// background: yellow;
				.btn {
					width: 100%;
					line-height: 1.5rem;
					background: #2A3EEE;
					font-size: 1rem;
					border-radius: 5px;
					color: #FFFFFF;
					text-align: center;
				}
				#code {
					width:300upx;
				}
				.descTip {
					font-size: 1.5rem;
					line-height: 2rem;
					text-align: center;
					color: #2A3EEE;
					transition: all 1s ease;
				}
				input {
					height:100%;
					font-size: 60upx;
				}
				.input-placeholder{
					font-size: 60upx;
					line-height: 60upx;
				}
			}
		}
	}
</style>