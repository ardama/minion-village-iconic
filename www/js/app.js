var version = '0.0.20';

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

var IGNORE_PLURALS = [];
var SPECIAL_PLURALS = [];

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
  }, function(newValue, oldValue) {
    if (window.minionTimer)
      window.minionTimer.draw($scope.g.timers.minion / $scope.g.minionTime);
  });

  $scope.minionGrid;
  $scope.$watch(function() {
    if (!$scope.minionGrid || $scope.minionGrid.length == 0)
      $scope.minionGrid = $('#minion-grid');
    return $scope.minionGrid.width();
  }, function(newValue, oldValue) {
    for (var i = 0; i < BUILDINGS.length; i++) {
      var buildingName = BUILDINGS[i];
      var icon = BUILDING_ICONS[buildingName];
      var header;
      if (newValue < 600) {
        header = '<i class="fa ' + icon + '"></i>';
        $scope.rowHeaderCapacityShown = false;
      } else {
        $scope.rowHeaderCapacityShown = true;
        if (newValue < 768) {
          header = buildingName;
        } else {
          header = buildingName + ' <i class="fa ' + icon + '"></i> ';
        }
      }
      $scope.rowHeaderText[buildingName] = header;
    }
  });

  $scope.rowHeaderCells;
  $scope.maxHeaderWidth = 0;
  // TODO: use extra row header space for population bars

  $scope.prettyInt = function(num, fixed) {
    return prettyIntBig(num, fixed);
  };
  $scope.prettyIntCompact = function(num, fixed) {
    return prettyIntBigCompact(num, fixed);
  };

  $scope.getPlural = function(name, num) {
    getPlural(name, num);
  };

  $scope.minionIncrement = 1;
  $scope.setMinionIncrement = function(increment) {
    $scope.minionIncrement = increment;
  }

  $scope.gridSelectedBuilding = '';
  $scope.showMinionRow = function(buildingName) {
    if (MINION_BUILDINGS.indexOf(buildingName) > -1)
      $scope.gridSelectedBuilding = $scope.g.buildings[buildingName];
  };

  $scope.buildingPopoverShown = false;
  $scope.buildingPopoverTarget = null;
  $scope.showBuildingPopover = function(target) {
    if (!target) {
      $scope.buildingPopoverShown = false;
      $scope.buildingPopoverTarget = null;
      return;
    }
    var parent = $(target).parents('.minion-grid-row');
    var first = parent.find('.first');
    if (!first.hasClass('active') || $scope.buildingPopoverShown && first.is($scope.buildingPopoverTarget)) {
      $scope.buildingPopoverShown = false;
      $scope.buildingPopoverTarget = null;
      return;
    }

    $scope.buildingPopoverShown = true;
    $scope.buildingPopoverTarget = first;
    var top = parent.position().top - 1;
    var left = first.position().left + first.width() + 5;
    var rowHeight = first.height();
    var popoverHeight = $('#grid-building-popover').height();
    var bottom = top + popoverHeight
    var bottomBound = $('#minion-grid').height();
    var topShift = bottom - bottomBound;
    if (bottom > bottomBound) {
      $('#grid-building-popover').css({top: top + rowHeight - popoverHeight, left: left});
    } else {
      $('#grid-building-popover').css({top: top, left: left});
    }
  };


  $scope.rowHeaderText = {'idle': 'Idle', 'workable': 'Workable', 'missions': 'Missions'};
  $scope.rowHeaderCapacityShown = false;
  $scope.MONSTERS = MONSTERS;
  $scope.BUILDINGS = BUILDINGS;
  $scope.BUILDING_TYPES = BUILDING_TYPES;
  $scope.BUILDING_GROUPS = BUILDING_GROUPS;
  $scope.MINION_TYPES = MINION_TYPES;
  $scope.MINION_BUILDINGS = MINION_BUILDINGS;

}).filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]).filter('zeroToDash', function(){
  return function(val) {
    return val === 0 ? '-' : val;
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
      if (current >= 1) {
        minionTimer.ctx.strokeStyle = '#29BF65';
      } else {
        minionTimer.ctx.strokeStyle = '#e8e8e8';
      }

      this.ctx.putImageData(this.imd, 0, 0);
      this.ctx.beginPath();
      this.ctx.arc(120, 120, 120 - this.width / 2, -(this.quart), ((this.circ) * current) - this.quart, false);
      this.ctx.stroke();
  }
  $('#minion-timer-image').css('border-width', '10px');

  // $('.minion-grid-cell').hover(
  //   function(event) {
  //     var building = $(this).parents('.minion-grid-row').data('building');
  //     if (MINION_BUILDINGS.indexOf(building) == -1) {
  //       return;
  //     }
  //     if (!$(this).hasClass('first') && building == 'hut') {
  //       return;
  //     }
  //     $(this).addClass('highlight');
  //   }, function(event) {
  //     $(this).removeClass('highlight');
  // });

  $('.minion-grid-row-primary').click(function(event) {
    // grab row element and associated building name
    var $row = $(this).parents('.minion-grid-row');
    var building = $row.data('building');
    if (building == 'hut') {
      return;
    }

    // save active state before clearing
    var active = $row.hasClass('active');

    // clear all active states
    $('.minion-grid-row').removeClass('active');

    // add active state to associated row
    if (!active) {
      $row.addClass('active');
    }
  });

  $('.cell-buttons').click(function(event) {
    event.stopPropagation();
  });

  $('.cell-button, .minion-increment-button').click(function(event){
    if ($(this).hasClass('disabled')) {
      return;
    }
  	//create .ink element if it doesn't exist
  	if($(this).find(".ripple").length == 0)
  		$(this).prepend("<span class='ripple'></span>");

  	var $ripple = $(this).find(".ripple");
  	//incase of quick double clicks stop the previous animation
  	$ripple.removeClass("animate");

	  var diameter = Math.max($(this).outerWidth(), $(this).outerHeight());
  	$ripple.css({height: diameter, width: diameter});

  	//get click coordinates
  	//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
    var x = event.pageX - $(this).offset().left - diameter/2;
  	var y = event.pageY - $(this).offset().top - diameter/2;

  	//set the position and add class .animate
  	$ripple.css({top: y+'px', left: x+'px'}).addClass("animate");
  });

});

$(window).resize(function() {
  $scope.buildingPopoverShown = false;
  $scope.buildingPopoverTarget = null;
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

var getPlural = function(name, num) {
  if (num == 1 || IGNORE_PLURALS.indexOf(name) >= 0) {
    return name;
  } else if (SPECIAL_PLURALS.indexOf(name) >= 0) {
    return name.slice(0, -1) + 'ies';
  } else {
    return name + 's'
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
