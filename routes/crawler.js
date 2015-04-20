var http = require('http');
var exec = require('child_process').exec;
var htmlparser = require('htmlparser2');

var fs = require('fs');
var util = require('util');

// var hasUnicode = require("has-unicode");

// if(hasUnicode()) {
//     console.log("has Unicode");
// }

var isTagOpen = false;
var articleTitle = '';
var parser = new htmlparser.Parser({

    onopentag: function(name, attributes) {
	// each site has different type of title -_-
	// if(name === "h1" && attributes.class === "entry_title") {
	if(name === 'title') {
	    isTagOpen = true;
	    // console.log('attributes.id : ' + attributes.id);
	}
    },

    ontext: function(text) {
	if(isTagOpen === true) {
	    articleTitle = text;
	    var modifiedArticleTitle = articleTitle.replace(/\s\W/gi, '');
	    
	    console.log('article Title : ' + articleTitle);
	    console.log('modified title : ' + modifiedArticleTitle);
	    

	    // var child = exec('mkdir ./downloads', function(error, stdout, stderr) {
    	    // 	console.log('stdout : ' + stdout);
    	    // 	console.log('stderr : ' + stderr);
    	    // 	if(error != null) {
    	    // 	    console.log('exec error : ' + error);
    	    // 	};
	    // });


	    var child = exec('mkdir -p ./downloads/' + modifiedArticleTitle, function(error, stdout, stderr) {
    	    	    console.log('stdout : ' + stdout);
    	    	    console.log('stderr : ' + stderr);
    	    	    if(error != null) {
    	    		console.log('exec error : ' + error);
    	    	    };
	    	});
	    
	    isTagOpen = false;
	}

    }
});

// parser.write("qqqq<title>asdasd</title>ttttt");
// parser.end();


// TODO: url may become text + url (from mt2)
// TODO: use htmlparser for extract article title from html for folder name
var crawling = function(url) {
	// console.log('url in crawling');
	// console.log(url);    

    // TODO: update regex for other site.
    var regex = /http[^\s]*jpg/gi;
    

    console.log('url : ' + url);

    // http://livedoor.blogimg.jp/otanews/imgs/2/2/22a5077d.jpg

    http.get(url, function(res) {
//    http.get('http://livedoor.blogimg.jp/otanews/imgs/2/2/22a5077d.jpg', function(res) {	
    // http.get('http://otanews.livedoor.biz/archives/52018592.html', function(res) {

    	var body = '';
	
    	// console.log('got response: ' + res.statusCode);

    	res.on('data', function(chunk) {
	    // console.log(chunk);
    	    body += chunk;
    	});
    	res.on('end', function() {
    	    // console.log(body);

	    // comment: write broken hiragana to file. body is ok.
	    // var log_file = fs.createWriteStream(__dirname + '/body.html', {flags : 'w'});
	    // var log_stdout = process.stdout;
	    // log_file.write(util.format(body) + '\n');
	    // log_stdout.write(util.format(body) + '\n');

	    // var body = "aaqqqq<title>asdasd</title>ttttt";
	    parser.write(body);
	    parser.end();

	    var matches_array = body.match(regex);
	    // console.log(matches_array);

	    // TODO: cannot use foreach?
	    //for(var extractedUrl in matches_array) {
	    
	    // write picture files using wget
	    for(var i = 0; i < matches_array.length; i ++) {
		// console.log(matches_array[i]);
		
		//		console.log(extractedUrl);

		// var child = exec('wget -P downloads ' + matches_array[i], function(error, stdout, stderr) {
    		//     // console.log('stdout : ' + stdout);
    		//     // console.log('stderr : ' + stderr);
    		//     if(error != null) {
    		// 	console.log('exec error : ' + error);
    		//     };
		// });

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
