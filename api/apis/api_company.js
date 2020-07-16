export default {
	addCompany: {
		url: "company",
		method: "put"
	},
	saveCompany: {
		url: "company",
		method: "post"
	},
	getCompany: {
		urlFunc: ({ id }) => {
			return `company/${ id }`
		},
		method: "get"
	},
	getCompanys: {
		urlFunc: ({ page, size }) => {
			return `companys/${page}/${size}`
		},
		method: "get"
	},
	deleteCompany: {
		urlFunc: ({ id }) => {
			return `company/${ id }`
		},
		method: "delete"
	}
}