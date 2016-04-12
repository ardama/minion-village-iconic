var version = '0.0.6';

// Minion types
var MELEE = 'melee';
var CASTER = 'caster';
var SIEGE = 'siege';
var ALL = 'all';

var MINION_TYPES = [MELEE, CASTER, SIEGE];

// Minion stats
var DAMAGE = 'damage';
var DURABILITY = 'durability';
var STRENGTH = 'strength';
var SKILL = 'skill';

// Mission gear
var MACHETES = 'machetes';
var TALISMANS = 'talismans';
var BLADES = 'blades';
var RINGS = 'rings';
var SHIELDS = 'shields';


// Game constants
var START_GOLD = 100;
var SUPER_MINION_BONUS = 2;

var GameApp = angular.module('GameApp', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "",
      abstract: true,
      templateUrl: "templates/home.html"
    })
    .state('home.buildings', {
      url: "/buildings",
      views: {
        'buildings-tab': {
          templateUrl: "templates/buildings.html",
        }
      }
    })
    .state('home.minions', {
      url: "/minions",
      views: {
        'minions-tab': {
          templateUrl: "templates/minions.html",
        }
      }
    })
    .state('home.missions', {
      url: "/missions",
      views: {
        'missions-tab': {
          templateUrl: "templates/missions.html",
        }
      }
    })

   $urlRouterProvider.otherwise("/minions");

}).controller('GameController', ['$scope', '$sce', '$ionicSideMenuDelegate', '$ionicTabsDelegate', function ($scope, $sce, $ionicSideMenuDelegate, $ionicTabsDelegate) {
  $scope.version = version;
  window.$scope = $scope;
  $scope.g = new Game($scope);

  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
  $scope.selectTabWithIndex = function(index) {
    $ionicTabsDelegate.select(index);
  };
}]);


window.onload = function() {
  $scope.g.start();
};
