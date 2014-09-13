'use strict';

/**
 * @ngdoc function
 * @name localmusicApp.service:HttpService
 * @description
 * # HttpService
 * Service for HTTP requests
 */
angular.module('localmusicApp')
  .service('HttpService', function ($http, $q) {

  	// Return public API.
    return({
        getMusic: getMusic
    });

    function getMusic( lg, lt ) {

        var request = $http({
            method: "get",
            url: "http://api.mixrad.io/1.x/us/?domain=music&location="+lg+","+lt+"&max_distance=5&itemsperpage=100&client_id=e9e04166dbdb93ac34206ebbf3206ff1",
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

        return( response.data );

    }
  });
