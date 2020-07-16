export default {
	addUser: {
		url: "user",
		method: "put"
	},
	saveUser: {
		url: "user",
		method: "post"
	},
	getUser: {
		urlFunc: ({ id }) => {
			return `user/${ id }`
		},
		method: "get"
	},
	getUsers: {
		urlFunc: ({ page, size }) => {
			return `users/${page}/${size}`
		},
		method: "get"
	},
	deleteUser: {
		urlFunc: ({ id }) => {
			return `user/${ id }`
		},
		method: "delete"
	}
}