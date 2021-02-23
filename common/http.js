import {
	rq
} from "common/request";

var http = {
	urls: {
		user_base_info: '/wx/patient/basicInfo',
		get_all_province: '/wx/patient/findProvinces',
		get_citys:'/wx/patient/findCities',
		
		//饮食配餐相关
		get_catering_data: '/wx/food/pairing/pairingDetail', //配餐主页 信息
		get_disease_list: '/wx/food/pairing/diseaselist', //病种列表
		get_catering_detail: '/wx/food/pairing/get', //配餐详情页
		
	},
	get: (url, data) => {
		return rq(url, data, "GET");
	},
	post: (url, data) => {
		return rq(url, data, "POST");
	},
}
export default http;
