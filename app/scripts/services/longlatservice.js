'use strict';

/**
 * @ngdoc function
 * @name localmusicApp.service:LongLatService
 * @description
 * # LongLatService
 * Service for getting a long lat by city name
 */
angular.module('localmusicApp')
  .service('LongLatService', function ($http, $q) {

    // Return public API.
    return({
        getLongLat: getLongLat
    });

    function getLongLat( city ) {

        var request = $http({
            method: "get",
            url: "http://maps.googleapis.com/maps/api/geocode/json?address="+city+"&sensor=true",
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

        return( response.data.results[0].geometry.location );

    }


  });
