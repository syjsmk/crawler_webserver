var express = require('express');
var router = express.Router();

/* GET users listing. */
//router.get('/angular', function(req, res, next) {
router.get('/', function(req, res, next) {
    console.log('get to /angular');
    //res.render('angular_index');
//    res.sendfile('./public/angular.html');
    res.sendFile('angular.html', {'root':'./public'});
});

module.exports = router;
