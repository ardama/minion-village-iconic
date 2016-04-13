var version = '0.0.9';

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
var MACHETE = 'machete';
var TALISMAN = 'talisman';
var BLADE = 'blade';
var RING = 'ring';
var SHIELD = 'shield';


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

}).controller('GameController', function ($scope, $sce, $ionicSideMenuDelegate,
                                          $ionicTabsDelegate, $timeout, $ionicScrollDelegate,
                                          $ionicPopover) {
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
  $scope.getImageUrl = function(name, folder) {
    getImageUrl(name, folder)
  };
  $scope.$watch(function() {
    return $scope.g.timers.minion;
  }, function(oldValue, newValue) {
    if (window.minionTimer)
      window.minionTimer.draw($scope.g.timers.minion / $scope.g.minionTime);
  });

  $scope.prettyInt = function (num, fixed) {
    return prettyIntBig(num, fixed);
  };
  $scope.prettyIntCompact = function (num, fixed) {
    return prettyIntBigCompact(num, fixed);
  };




});

$(document).ready(function() {
  $scope.g.start();
});

$(window).load(function() {
  minionTimer = {
    bg: null,
    ctx: null,
    imd: null,
    circ: Math.PI * 2,
    quart: Math.PI / 2,
    draw: null,
    width: 10
  };

  minionTimer.bg = document.getElementById('minion-timer-canvas');
  minionTimer.ctx = minionTimer.bg.getContext('2d');

  minionTimer.ctx.beginPath();
  minionTimer.ctx.strokeStyle = '#e8e8e8';
  minionTimer.ctx.lineCap = 'square';
  minionTimer.ctx.closePath();
  minionTimer.ctx.fill();
  minionTimer.ctx.lineWidth = minionTimer.width;

  minionTimer.imd = minionTimer.ctx.getImageData(0, 0, 240, 240);

  minionTimer.draw = function(current) {
      this.ctx.putImageData(this.imd, 0, 0);
      this.ctx.beginPath();
      this.ctx.arc(120, 120, 120 - this.width / 2, -(this.quart), ((this.circ) * current) - this.quart, false);
      this.ctx.stroke();
  }
});



var getImageUrl = function(name, folder) {
  if (folder)
    folder += '/';
  else
    folder = '';
  return 'img/' + folder + name.split(' ').join('_').split('\'').join('').split('.').join('') + '.png';
};

var LONG_NUMBER_NAMES = [
  'million',
  'billion',
  'trillion',
  'quadrillion',
  'quintillion',
  'sextillion',
  'septillion',
  'octillion',
  'nonillion',
  'decillion',
  'undecillion',
  'duodecillion',
  'tredecillion'
];
var SHORT_NUMBER_NAMES = [
  'm',
  'b',
  't',
  'qd',
  'qt',
  'sx',
  'sp',
  'o',
  'n',
  'd',
  'ud',
  'dd',
  'td'
];
var prettyIntBig = function(num, fixed) {
  fixed = fixed || 2;
  var n = Math.pow(10, fixed);
  var a = num;
  var b = -2;
  while (a >= 1000) {
    a /= 1000;
    b++;
  }
  if (b >= 0 && b < LONG_NUMBER_NAMES.length) {
    return (Math.floor(a * n) / n).toFixed(fixed) + ' ' + LONG_NUMBER_NAMES[b];
  }
  return prettyInt(num);
}
var prettyIntBigCompact = function(num, fixed) {
  fixed = fixed || 2;
  var n = Math.pow(10, fixed);
  var a = num;
  var b = -2;
  while (a >= 1000) {
    a /= 1000;
    b++;
  }
  if (b >= 0 && b < SHORT_NUMBER_NAMES.length) {
    return (Math.floor(a * n) / n).toFixed(fixed) + SHORT_NUMBER_NAMES[b];
  }
  return prettyInt(num);
}
var prettyInt = function(num) {
  var s = num >= 1000 ? Math.floor(num) : Math.round(num * 10) / 10;
  return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
