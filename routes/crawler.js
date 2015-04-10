var http = require('http');
var exec = require('child_process').exec;


//TODO: page refreshed periodically. why?
var crawling = function(url) {
	// console.log('url in crawling');
	// console.log(url);    

    var regex = /http[^\s]*jpg/gi;
    

    console.log('url : ' + url);

    // http://livedoor.blogimg.jp/otanews/imgs/2/2/22a5077d.jpg

    http.get(url, function(res) {
//    http.get('http://livedoor.blogimg.jp/otanews/imgs/2/2/22a5077d.jpg', function(res) {	
    // http.get('http://otanews.livedoor.biz/archives/52018592.html', function(res) {

    	var body = '';
	
    	console.log('got response: ' + res.statusCode);

    	// console.log(res);

    	res.on('data', function(chunk) {
    	    body += chunk;
    	});
    	res.on('end', function() {
    	    // console.log(body);

	    var matches_array = body.match(regex);
	    console.log(matches_array);

	    // TODO: cannot use foreach?
	    //for(var extractedUrl in matches_array) {
	    for(var i = 0; i < matches_array.length; i ++) {
		console.log(matches_array[i]);
		
		//		console.log(extractedUrl);

		//TODO: save file path setting
		var child = exec('wget ' + matches_array[i], function(error, stdout, stderr) {
    		    console.log('stdout : ' + stdout);
    		    console.log('stderr : ' + stderr);
    		    if(error != null) {
    			console.log('exec error : ' + error);
    		    };
		});

	    }

    	});
	
    }).on('error', function(e) {
    	console.log('got error: ' + e.message);
    });



    // OK
    // var url = 'http://livedoor.blogimg.jp/otanews/imgs/2/2/22a5077d.jpg';

    

    
};


// is it right?
module.exports.crawling = crawling;
//module.exports = crawling;

//module.exports = crawler;
