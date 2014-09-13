'use strict';

/**
 * @ngdoc function
 * @name localmusicApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the localmusicApp
 */
angular.module('localmusicApp')
  .controller('MusicCtrl', function ($scope, $routeParams, $sce, HttpService, LongLatService, TrackService) {

  	$scope.tracklist = [];

  	LongLatService.getLongLat( $routeParams.city ).then(function( data ){

  		HttpService.getMusic(data.lat, data.lng).then(function( data ){

	  		applyRemoteData( data );

	  	});

  	});
  	
  	

  	function applyRemoteData( music ) {
 
        $scope.music = music;

        for (var i = 0; i < music.items.length; i++) {
        	
        	TrackService.getTrack( music.items[i].name ).then(function( data ){

		  		addTrackToList( data );

		  	});
        }

    }

    function addTrackToList ( track ) {

    	track = 'http://www.youtube.com/embed/'+track+'?html5=1';
    	track = $sce.trustAsResourceUrl(track);

    	console.log($scope.tracklist);

    	$scope.tracklist.push( track );

    }

  });
