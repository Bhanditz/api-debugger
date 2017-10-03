//const API_BASE_URL= "http://localhost:3001/api";

const axios = require('axios');
const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Accept': 'application/json'
	}
});

let INT_TEST_TIMESTAMP = new Date().getTime();
let END_TEST_TIMESTAMP;
let ERR_COUNT;

console.log(API_BASE_URL)

const printStats = () => {

	END_TEST_TIMESTAMP = new Date().getTime();
	console.log('---- STATS ---- ');
	console.log('Exec time: ' + (END_TEST_TIMESTAMP - INT_TEST_TIMESTAMP) + 'ms');
	console.log('Errors: ' + ERR_COUNT);

}

const makeRequests = (urls, amount, token) => {

	let promises = [];
	let REQUESTS_AMOUNT = amount || 1;

	console.log(`Url: ${urls.length}, amount: ${REQUESTS_AMOUNT}, token: ${token}`)

	ERR_COUNT = 0;

	for (var j = 0; j < urls.length; j++) {
		let URL = API_BASE_URL + (urls[j] || '/api/employees');

		for (var i = 0; i < REQUESTS_AMOUNT; i++) {

			let config = {};

			if (!!token) {
				config = {
					headers: {
						Authorization: token
					}
				}
			}

			promises.push(axios.get(URL, config)
				.catch(function(error) {

					ERR_COUNT++

					if (!!error && !!error.request && error.response.status) {
						console.log(`#${ERR_COUNT} ${error.request.path} [${error.response.status}]`)
					} else {
						console.log('Impossible to fine error.request')
						console.log(error)
					}
				}));
		}
	}

	INT_TEST_TIMESTAMP = new Date().getTime();

	console.log(`# of requests: ${promises.length}`)

	return axios.all(promises)
		.then(() => {

			axios.get(API_BASE_URL + '/api/logs/emails')
				.then(function(response) {
					console.log('------ OK Health check!');
				})
				.catch(function(error) {
					console.log('------ FAIL Health check')
				})
				.then(printStats)

		})

}

module.exports = makeRequests