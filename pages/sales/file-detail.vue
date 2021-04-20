<template>
	<view class="container">
		<turnback @back="back" v-if="isMiniProgram" style="position: sticky;top: 0;"> </turnback>
		<!-- <iframe v-if="url" :src="url" frameborder="0" style="width:100vw;height:100vh;border:0;"></iframe> -->
      <!-- <pdf v-if="pdfSrc" :src="pdfSrc"/> -->
	    <!-- v-for="i in numPages" :key="i" :page="i" -->
	
    </view>
</template>


<script>
	const app = getApp();
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	//import pdf from '../../plugins/vue-pdf'
	export default {
		components: {
			// pdf
			turnback
		},
		data() {
			return {
				// pdfSrc:"",
				// numPages:"",
				url:"",
				isMiniProgram:false
			}
		},
		onLoad(options) {
			this.url = options.url;
			app.docfileget({id:this.url}).then(res =>{
				location.href = (app.globalData.baseUrl + res.data.fileUrl);
			});
			this.getMiniProgramStatic();
			//this.fileSrc = encodeURIComponent(options.links);
	         
			// let text = this.$route.query.text;
			// this.pdfSrc = "/file/"+text+".pdf";
			// this.url = pdf.createLoadingTask(this.pdfSrc);
			
			// this.url.promise.then(pdf => { 
			// 	this.numPages = pdf.numPages;
			// 	if(this.numPages>9){
			// 		setTimeout(()=>{
			// 			this.$toast.clear();
			// 		},8000)
			// 	}else if(this.numPages>5&&this.numPages<10){
			// 		setTimeout(()=>{
			// 			this.$toast.clear();
			// 		},3000)
			// 	}else{
			// 		this.$toast.clear();
			// 	}
			// });
			
		},
		onShow() {
			
		},
		methods: {
			getMiniProgramStatic(){
				wx.miniProgram.getEnv((res)=>{
				   this.isMiniProgram = res.miniprogram?true:false;
				})
			},
			back(){
			  uni.navigateBack({
			  	
			  })
			},
			open(){
				
				window.open('http://view.officeapps.live.com/op/view.aspx?src='+this.fileSrc,"_blank")
				
				//window.open(this.fileSrc,"_blank");
			}
          
         
		},

	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}

	.container {
	
		
	}
</style>


