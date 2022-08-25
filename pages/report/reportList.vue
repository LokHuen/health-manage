<template>
	<div id="reportList">
		<h3 style="text-align: center; color: #12ca3b;margin-top: 10upx;">点击浏览报告</h3>
		<div class="from">
				<div class="item">
                    <div class="descTip" @click="jumps(item.realFilePath)" v-for="(item,index) in reportList" :data="item" :key="index"><div class="pdf-container">{{item.name}}</div></div>
				</div>
		</div>

	</div>
</template>

<script>
    import ReportApi from '@/common/reportApi'

	export default {
		data() {
			return {
				name: '', //患者姓名
				mobile: null, //患者手机号
				idCard: null, //患者身份证
				tempOrderId: '',
				infos: null, //用来接收查询报告的结果
				isFirst: true, //是否第一次加载数据
				isLoad: false, //订单数据是否加载完毕
				active: 0,
				reportList: [], //未读
				prefix: "http://api.healthme.cn",
				options: {
					pullUpLoad: {
						threshold: 10,
						txt: {
							more: '继续滑动，查看更多',
							noMore: '没有消息了'
						}
					}, // 配置上拉加载，若要关闭可直接 pullUpLoad：false

				},
			};
		},
		created() {
            this.name = this.$route.query.name;
            if (this.$route.query.mobile != null) {
                this.mobile = this.$route.query.mobile;
            }
            if (this.$route.query.idCard != null) {
                this.idCard = this.$route.query.idCard;
            }
            this.reportListPullingUp();
		},
		methods: {
            jumps(fileurl) {
				wx.showToast({
					title:"正在打开",
					type:"success",
					duration: 2000
				});
                console.log(fileurl);
                window.location.href = 'http://api.healthme.cn' + fileurl;
            },
           //获取该患者的所有报告
            reportListPullingUp() {
                let data = {
                    name: this.name,
					mobile: this.mobile,
					idCard: this.idCard
                };

				console.log(""+data.name);
                ReportApi.findAllReport(data).then((res) => {
                    // var data = res.data.list;
					    console.log(res.data.list)
                        this.reportList = res.data.list;

                    })

               },
            mounted() {

            }
        }
	}
</script>


<style scoped lang="stylus">
	#reportList {
		width: 100%;
		// background: #10AEFF;
		height: auto;
		float: left;
		.from {
			width: 93vw;
			height: auto;
			padding-left: 0.5rem;
			padding-right: 0.5rem;
			margin-top: 0.5rem;
			// background: red;
			.item {
				
				width: 100%;
				height: 180upx;
				// background: yellow;
				.descTip {
					padding:5px;
                    margin-top: 1rem;
					font-size: 0.5rem;
					height: 100%;
					text-align: left;
					color: #fff;
					transition: all 1s ease;
					word-wrap:break-word;
					word-break: break-all;
					text-align: center;
					position: relative;
					vertical-align: middle;
					border: 1px solid #ddd;
					border-radius: 20px;
					height: 100%;
					margin-bottom: 20rpx;
					list-style: none;
					font-size: 40upx;
					background-color: #12ca3b;
					display: flex;
					justify-content: center;
					align-items: center; 
					box-shadow: 0px 5px 5px #008100;
					// box-shadow: 0px 5px 5px rgba(50,255,50,0.3);
					
					.pdf-container {
						vertical-align: middle;
						display: inline-block;
						width:90%;
						margin:0 auto;
					}
				}
			}

		}
	}
</style>
