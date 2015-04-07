angular.module('myApp', ['angularFileUpload'])
    .controller('fileUploadCtrl', ['$scope', '$upload', function($scope, $upload) {
	$scope.$watch('files', function() {
	    $scope.upload($scope.files);
	});

	$scope.upload = function(files) {
	    if(files && files.length) {
		for(var i = 0; i < files.length; i ++) {
		    var file = files[i];
		    console.log(file);
		    $upload.upload({
			url: '/upload/' + file.name,
			method: 'POST',
			// url: '/upload',
			file: file
		    }).progress(function(evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		    }).success(function(data, status, heads, config){
			console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
			console.log('data : ' + data);
		    });
		}
	    }
	};
    }])
    .controller('urlCtrl', ['$scope', '$upload', '$http', function($scope, $upload, $http) {
	// $scope.$watch('url', function() {
	//     console.log('url : ' + $scope.url);
	// });
	$scope.sendUrl = function(siteUrl) {
	    console.log(siteUrl);

	    // $http({
	    // 	method: 'jsonp',
	    // 	// url : siteUrl + '?callback=angular.callbacks._temp',
	    // 	url : 'http://s2org.com/?url=' + siteUrl,
	    // 	responseType: 'text'
	    // }).success(function(data, status, headers, config) {
	    // 	console.log('success');
	    // 	console.log(data);
	    // 	console.log(status);

	    // }).error(function(data, status, headers, config) {
	    // 	console.log('error');
	    // 	console.log(status);
	    // 	console.log(data);
	    // });

	    $upload.upload({
		url: '/upload',
		method: 'POST',
		// url: '/upload',
		data: siteUrl // data is defined attribute
	    }).progress(function(evt) {
	    }).success(function(data, status, heads, config){
		console.log('send success');
	    });


	};
    }]);
