import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

const getCurrencies = () => {
	const request = axios.get(`${baseUrl}/currencies`)
	console.log("getAll promise fulfilled request: ", request)
	return request.then(response => {
		console.log("getAll promise fulfilled: ", response.data)
		return response.data
	})
}

export default { getCurrencies }