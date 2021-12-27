import axios from 'axios'

const instance = axios.create({
	headers: {
		'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
	},
	baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
})
// instance.defaults.headers.common["x-api-key"] = process.env.NEXT_API_KEY
// instance.interceptors.request.use(function (config) {
// 	config.headers.common["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY
// 	return config
// })

export default instance
