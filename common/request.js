// var baseUrl = "http://weixinapi-test.cvddr.com";

function rq(url, data = {}, type, ctype) {
	return new Promise((resolve, reject) => {
		uni.request({
		    url: "/api" + url,
		    data: data,
			method:type||"GET",
		    header: {
				'content-type': 'application/x-www-form-urlencoded',
				 //'uid':7,
				 'salesToken':localStorage.getItem("salesToken"),
		         'uid': localStorage.getItem("uid"),
				// 'tkbgjdtoken':"ef56ZpDKDJ3qy/ttr+d4r16cTZd0ju+7Pz0eT/MtwDaIqSiojYJsYdyjGFLYy4/pJR4BSUmab7tIypyLTZtBYN/3obpPO4rLM6FyqNJEhp1LxjTgveFK/ls2Xr0/"
				// 'tkbgjd-token':"634fw+Rth9zpdjXbKK9wEJcqlZZrzjvtudIxfIL6apurN02RT6Xn2mvhKBRqiD9cx0R2yWFv8njvE8w7FkGru5/LmmtHT0Vq+uWt"
			},
			success: (res) => {
				if (res.data.status === -100) {
					reject('未登录')
				}
				if (res.data.status == -103){
					resolve(res.data)
				}
				if (res.data.status !== 1) {
					if(res.data.msg)
					uni.showToast({
						title: res.data.msg,
						duration: 1500,
						icon: "none",
					});
					reject(res.data)
				}
				resolve(res.data)
			},
			fail: (res) => {
				reject(res.data)
			}
		});
	})
}
export {
	rq
};
