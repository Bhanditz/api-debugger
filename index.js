let requester = require('./requester');
let getUrls = require('./parse-nginx');

let WINDOW = 2000;
let INDEX = 0;
//const TOKEN = '.*..\..\..\..\..\..\..\..\..\..\..\..\..\..\..\..\windows\win.ini'
const TOKEN = '/%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5cwindows%5cwin.ini'

const requestUrls = (urls, amount, token) => {

	let toRequest = urls.slice((INDEX * WINDOW), ((INDEX + 1) * WINDOW));
	
	requester(toRequest, amount, token);

}

const requestAccessLogsUrls = () => {
	getUrls({
		path: './logs/nginx/access.log',
		format: '$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"',
		onComplete: requestUrls
	})
}

const requestErrorLogsUrls = () => {
	getUrls({
		path: './logs/nginx/error.log',
		format: '$time_local request: "$request"',
		onComplete: requestUrls
	})
}

const requestBlockingRoutes = () => {
	let routes = [
		"/api/%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5cwindows%5cwin.ini",
		"/%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5cwindows%5cwin.ini"
	]
	requestUrls(routes)
}

const requestsHighFrequency = () => {
	let routes = [
		"/api/employees",
	]
	requestUrls(routes, 10000, TOKEN)
}

//requestAccessLogsUrls();

requestErrorLogsUrls();

//requestBlockingRoutes()

//requestsHighFrequency()