/**
 * Created by ITUA on 28.07.2017.
 */
const multer = require('multer');
const upload = multer();
const bodyParser = require('body-parser');

exports.getRoute = function(express, requestHandlers) {
	const router = express.Router();


	//router.get('/', requestHandlers.indexPage);

	router.post('/pages', requestHandlers.getPages);
	router.post('/add-page', bodyParser.json(), requestHandlers.addPage);


	router.post('/write-config', requestHandlers.writeConfig);
	router.post('/config', requestHandlers.getConfig);

	return router;
};
