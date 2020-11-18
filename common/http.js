import {
	rq
} from "common/request";

var http = {
	get: (url, data) => {
		return rq(url, data, "GET");
	},
	post: (url, data) => {
		return rq(url, data, "POST");
	},
	
}
export default http;
