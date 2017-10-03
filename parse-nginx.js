let NginxParser = require('nginxparser');
const ACCESS_LOGS_PATH = "./logs/nginx/access.log";
const ACCESS_FORMAT = '$remote_addr - $remote_user [$time_local] ' + '"$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"'
let _ = require('lodash')


let urls = [];

const getUrls = ({path, onComplete, format} ) => {
	let URL = path || ACCESS_LOGS_PATH;
	let FORMAT = format || ACCESS_FORMAT;
	let parser = new NginxParser(FORMAT);

	console.log(URL)

	parser.read(URL, function(row) {

		let request = row.request;
		if (!!request) {
			let splitted = request.split(" ");
			urls.push(splitted[1])
		}
	}, function(err) {
		if (err) throw err;

		urls = _.uniq(urls);
		urls = urls.filter(u => u.indexOf("api") !== -1)

		onComplete(urls)
	});
}

module.exports = getUrls