'use strict';

/**
 * @ngdoc overview
 * @name localmusicApp
 * @description
 * # localmusicApp
 *
 * Main module of the application.
 */
angular
  .module('localmusicApp', [
    'ngCookies',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/music/:city', {
        templateUrl: 'views/music.html',
        controller: 'MusicCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
