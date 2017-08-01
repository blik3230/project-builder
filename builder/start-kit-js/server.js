const opn = require('opn');

function start(express, router, requestHandler) {
	const app = express();
	const route = router.getRoute(express, requestHandler);

	app.use('/', route);
	app.use(express.static('dist'));

	app.listen('3131');
	//opn('http://localhost:3131');
	console.log('Сервер start-kit-js запущен по адресу http://localhost:3131');
}

exports.start = start;