export default {
	addCustomer: {
		url: "customer",
		method: "put"
	},
	saveCustomer: {
		url: "customer",
		method: "post"
	},
	getCustomer: {
		urlFunc: ({ id }) => {
			return `customer/${ id }`
		},
		method: "get"
	},
	getCustomers: {
		urlFunc: ({ page, size }) => {
			return `customers/${page}/${size}`
		},
		method: "get"
	},
	deleteCustomer: {
		urlFunc: ({ id }) => {
			return `customer/${ id }`
		},
		method: "delete"
	}
}