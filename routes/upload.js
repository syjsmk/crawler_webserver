var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');

// It is possible but it can save file under this directory
// var multipartyMiddleware = multiparty({
//     uploadDir: __dirname
// });

var multipartyMiddleware = multiparty();


var fs = require('fs');
var crawler = require('./crawler'); // or var crawler = require('./crawler.js');


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

    res.sendStatus(200);
    
});


module.exports = router;
