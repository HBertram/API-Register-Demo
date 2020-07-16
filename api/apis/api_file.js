export default {
	addFile: {
		url: "file",
		method: "put"
	},
	saveFile: {
		url: "file",
		method: "post"
	},
	getFile: {
		urlFunc: ({ id }) => {
			return `file/${ id }`
		},
		method: "get"
	},
	getFiles: {
		urlFunc: ({ page, size }) => {
			return `files/${page}/${size}`
		},
		method: "get"
	},
	deleteFile: {
		urlFunc: ({ id }) => {
			return `file/${ id }`
		},
		method: "delete"
	}
}