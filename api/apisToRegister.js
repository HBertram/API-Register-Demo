import fileApi from "./apis/api_file.js"
import customerApi from "./apis/api_customer.js"
import companyApi from "./apis/api_company.js"
import userApi from "./apis/api_user.js"
export default {
	...fileApi,
	...customerApi,
	...companyApi,
	...userApi
}