import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

const getCurrencies = () => {
	const request = axios.get(`${baseUrl}/currencies`)
	return request.then(response => {
		console.log('getAll promise fulfilled: ', response.data)
		return response.data
	})
}

const getLatest = () => {
	const request = axios.get(`${baseUrl}/latest`)
	return request.then(response => {
		console.log('getLatest promise fulfilled: ', response.data)
		return response.data
	})
}

const convert = (newTransfer) => {
	const request = axios.post(`${baseUrl}/convert`, newTransfer)
	return request.then(response => {
		console.log('convert promise fulfilled: ', response.data)
		return response.data
	})
}

const getStatistics = () => {
	const request = axios.get(`${baseUrl}/statistics`)
	return request.then(response => {
		console.log('getStatistics promise fulfilled')
		return response.data
	})
}

export default { getCurrencies, getLatest, convert, getStatistics }