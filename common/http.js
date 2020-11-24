import {
	rq
} from "common/request";

var http = {
	urls: {
		user_base_info: '/wx/patient/basicInfo'
	},
	get: (url, data) => {
		return rq(url, data, "GET");
	},
	post: (url, data) => {
		return rq(url, data, "POST");
	},
}
export default http;
