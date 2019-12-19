import axios from 'axios'
const baseUrl = '/api'

const getCurrencies = () => {
	const request = axios.get(`${baseUrl}/currencies`)
	return request.then(response => response.data)
}

const getLatest = () => {
	const request = axios.get(`${baseUrl}/latest`)
	return request.then(response => response.data)
}

const convert = (newTransfer) => {
	const request = axios.post(`${baseUrl}/convert`, newTransfer)
	return request.then(response => response.data)
}

const getStatistics = () => {
	const request = axios.get(`${baseUrl}/statistics`)
	return request.then(response => response.data)
}

export default { getCurrencies, getLatest, convert, getStatistics }