import axios from './axios.min.js';  
import apis from "./apisToRegister"

const STATIC_URL = "http://127.0.0.1:8049/static"
const API_URL = "http://127.0.0.1:8049/api"

export { API_URL, STATIC_URL, registerApis }
const http = axios.create({
	  baseURL: API_URL,
	  timeout: 5000
	})
function getDefaultConfig() {
	return Object.assign({}, http.defaults)
}
	
let loading;  
let isloading = true;  


function registerApis(apis) {
	let api = {}
	for (let apiName in apis) {
		let apiConfig = apis[apiName]
		apiConfig.name = apiName
		if (!apiConfig.name || (!apiConfig.url && !apiConfig.urlFunc)) {
			console.error("api/registerApis ERROR: apiConfig must contains property name and property url")
			continue
		}
		api[apiConfig.name] = async function(param) {
			let config = Object.assign(getDefaultConfig(), apiConfig)
			if ( typeof(config.urlFunc) == "function" ) {
				config.url = config.urlFunc(param)
			}
			let fullUrl = ""
			try {
				new URL(config.url)
				fullUrl = config.url
			} catch(e) {
				fullUrl = `${API_URL}/${config.url}`
			}
			if (config.method.toUpperCase() == "POST") {
				config.data = param
			} else {
				config.param = param
				if (!!param && param.constructor == Object) {
					let lstParam = []
					for (let key in param) {
						if (param[key] instanceof Object) continue;
						lstParam.push(`${key}=${param[key]}`)
					}
					if (lstParam.length > 0) {
						if(fullUrl.indexOf("?") == -1) fullUrl = fullUrl + "?" 
						else fullUrl = fullUrl + "&" 
						fullUrl += lstParam.join("&")
					}
				}
			}
			config.url = fullUrl
			if ( config.isloading === true ) {
				isloading = true
				uni.showLoading()
			}
			return new Promise((resolve, reject) => {
				uni.request(config).then((data) => {
					if ( isloading ) {
						uni.hideLoading()
						isloading = false
					}
					let res =  data[1].data
					
					if (res.code == 0) {
						console.log(`${config.method} - ${fullUrl} success`)
						resolve(res.data)
						return 1
					} else {
						console.error(`${config.method} - ${fullUrl} error:
							request:${JSON.stringify(param)}
							response:${JSON.stringify(res)}`)
						if ( !!res.msg ) {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
						}
						reject(data)
					}
				}).catch((e) => {
					console.error(`error - ${fullUrl}`, e)
					uni.showToast({
						icon: 'none',
						title: '访问服务器异常',
					});
					reject(e)
				})
			})
		}
	}
	return api
}


let api = {
	...registerApis(apis),
	async upload(type, file) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				// 需要上传的地址
				url: API_URL + "/upload",
				// filePath  需要上传的文件
				filePath: file,
				name: 'file',
				formData: { type },
				success: (res1) => {
					// 显示上传信息
					resolve(JSON.parse(res1.data))
				},
				fail: (r) => {
					reject(r)
				}
			});
		})
	}
}
api.install = (Vue, options) => {
	Vue.prototype.api = api
}
export default api