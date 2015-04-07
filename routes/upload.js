var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();



var fs = require('fs');
var crawler = require('./crawler'); // or var crawler = require('./crawler.js');



//var app = express();

// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({extended: false});

// app.post('/:fileName', multipartyMiddleware, function(req, res) {
//     if(!req.body) {
// 	return res.sendStatus(400);
//     } else {

// // 	console.log(res);
// //	console.log(req);

// 	console.log('/////////////////////////////////');
// 	console.log('fileName : ' + req.params.fileName);
// 	//var file = req.files.file;

// 	var file = req.files.file;
// 	console.log('------------------');
// 	console.log(file);
// 	console.log('fileName : ' + file.name);
// 	console.log('fileType : ' + file.type);
// //	console.log(req.body);

// 	// var file = req.params.file, path = __dirname + '/files/' + file;

// 	var body = '';
// 	var filePath = __dirname + '/public/' + req.params.fileName;
// 	req.on('data', function(data) {
// 	    body += data;
// 	});

// 	req.on('end', function() {
// 	    fs.appendFile(filePath, body, function() {
// 		res.end();
// 	    });
// 	});
// 	// res.download(path);
// 	res.send(req.body);
	
//     }
// });
// module.exports = app;


// router.post('/:fileName', multipartyMiddleware, function(req, res, next) {

//     if(!req.body) {
// 	res.sendStatus(400);
//     } else {
// 	console.log('fileName : ' + req.params.fileName);
// 	console.log(req.files);
// 	// console.log(res);
// 	console.log('/////////////////////////////////');
// 	// fs.writeFile(req.params.fileName, req.files.file, function(err) {
// 	//     if(err) {
// 	// 	console.log(err);
// 	//     } else {
// 	// 	console.log('saved');
// 	//     }
// 	// });
// 	console.log(req.body);
// 	console.log(req._body);
// 	res.sendStatus(200);
// 	// res.sendFile(req._body);
// 	//  res.send('respond with a resource');
//     }

// });

// module.exports = router;

router.get('/', function(req, res, next) {
    console.log('get to /angular');
    //res.render('angular_index');
//    res.sendfile('./public/angular.html');
    res.sendFile('angular.html', {'root':'./public'});
});


router.post('/:fileName', multipartyMiddleware, function(req, res, next) {


    console.log('/:fileName');
    console.log(req.body);
    console.log(req._body);
    res.sendStatus(200);


});

router.post('/', multipartyMiddleware, function(req, res, next) {

    //if multipartyMiddleware is not exist then req.body becomes empty value({})
    console.log('for url');
    console.log(req.url);
    console.log(req.body);

    //crawling(req.body.data);
    crawler.crawling(req.body.data);
    
});


module.exports = router;
