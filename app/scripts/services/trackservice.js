'use strict';

/**
 * @ngdoc function
 * @name localmusicApp.service:LongLatService
 * @description
 * # LongLatService
 * Service for getting a long lat by city name
 */
angular.module('localmusicApp')
  .service('TrackService', function ($http, $q) {

    // Return public API.
    return({
        getTrack: getTrack
    });

    function getTrack( name ) {

        // replace spaces with commas for the api
        name = name.split(/[ ,]+/).join(',');

        var request = $http({
            method: "get",
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+name+"&type=video&videoDuration=short&videoSyndicated=true&videoEmbeddable=true&regionCode=NL&key=AIzaSyDRVNuIdEbqbu4kgGyvrgh7JONGvJ2FaTM",
            params: {
                action: "get"
            }
        });

        return( request.then( handleSuccess, handleError ) );

    }


    // ---
    // PRIVATE METHODS.
    // ---


    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError( response ) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {

            return( $q.reject( "An unknown error occurred." ) );

        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );

    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {

        return( response.data.items[0].id.videoId );

    }


  });
