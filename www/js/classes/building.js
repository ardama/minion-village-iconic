var HUT = 'hut';
var FARM = 'farm';
var WORKSHOP = 'workshop';
var LIBRARY = 'library';
var SHRINE = 'shrine';
var TOWER = 'tower';

var BARRACKS = 'barracks';
var ARMORY = 'armory';
var CAPITOL = 'capitol';
var LAB = 'laboratory';

var SIEGE = "siege";
var SIEGE_RALLY = "siege rally";
var JUNGLE = "jungle";
var JUNGLE_RALLY = "jungle rally";

SPECIAL_PLURALS.push(LIBRARY);
SPECIAL_PLURALS.push(ARMORY);
SPECIAL_PLURALS.push(SIEGE_RALLY);
SPECIAL_PLURALS.push(JUNGLE_RALLY);

var BUILDINGS = [
  HUT,
  FARM,
  WORKSHOP,
  LIBRARY,
  SHRINE,
  TOWER,
  BARRACKS,
  ARMORY,
  CAPITOL,
  LAB,
  SIEGE,
  SIEGE_RALLY,
  JUNGLE,
  JUNGLE_RALLY
];

var MINION_BUILDINGS = [
  HUT,
  FARM,
  WORKSHOP,
  LIBRARY,
  SHRINE,
  TOWER,
  SIEGE,
  JUNGLE
];

var BUILDING_TYPES = [
  'housing',
  'workable',
  'missions',
  'research'
];

var BUILDING_GROUPS = {
  'housing': [HUT, BARRACKS],
  'workable': [FARM, WORKSHOP, LIBRARY, SHRINE, TOWER],
  'missions': [SIEGE, JUNGLE],
  'research': [CAPITOL, ARMORY, LAB]
};

var BUILDING_ICONS = {};
BUILDING_ICONS[HUT] = 'fa-home';
BUILDING_ICONS[FARM] = 'fa-database';
BUILDING_ICONS[WORKSHOP] = 'ion-hammer';
BUILDING_ICONS[LIBRARY] = 'fa-book';
BUILDING_ICONS[SHRINE] = 'fa-bolt';
BUILDING_ICONS[TOWER] = 'fa-shield';
BUILDING_ICONS[BARRACKS] = 'fa-fort-awesome';
BUILDING_ICONS[ARMORY] = 'fa-industry';
BUILDING_ICONS[CAPITOL] = 'fa-bank';
BUILDING_ICONS[LAB] = 'fa-flask';
BUILDING_ICONS[SIEGE] = 'fa-bomb';
BUILDING_ICONS[SIEGE_RALLY] = '';
BUILDING_ICONS[JUNGLE] = 'fa-tree';
BUILDING_ICONS[JUNGLE_RALLY] = '';

var Building = function(game, name, slots, cost, data) {
  this.Init(game, name, slots, cost, data);
};

Building.prototype.Init = function(game, name, slots, cost, data) {
  this.game = game;
  this.name = name;
  this.slots = slots;
  this.cost = cost;
  this.data = data;

  this.startCost = cost;
  this.capacity = 0;
  this.count = 0;
  this.display = getPlural(name, this.count).capitalize();
  this.hasSpace = false;
  this.isEmpty = true;
};

Building.prototype.updateSpaceVariables = function() {
  var minions = this.game.minions[this.name].all;
  this.hasSpace = this.capacity > minions;
  this.isEmpty = minions <= 0;
};

Building.initializeBuildings = function(game) {
  var buildings = {};
  buildings[HUT] = new Building(
    game, HUT, 2,
    {gold: 100, knowledge: 0, favor: 0},
    {}
  );
  buildings[TOWER] = new Building(
    game, TOWER, 4,
    {gold: 100, knowledge: 0, favor: 0},
    {}
  );

  buildings[FARM] = new Building(
    game, FARM, 2,
    {gold: 100, knowledge: 0, favor: 0},
    {rate: 1}
  );
  buildings[WORKSHOP] = new Building(
    game, WORKSHOP, 2,
    {gold: 100, knowledge: 0, favor: 0},
    {rate: 1, type: MACHETE}
  );
  buildings[LIBRARY] = new Building(
    game, LIBRARY, 2,
    {gold: 100, knowledge: 0, favor: 0},
    {rate: 1}
  );
  buildings[SHRINE] = new Building(
    game, SHRINE, 2,
    {gold: 100, knowledge: 0, favor: 0},
    {rate: 1}
  );

  buildings[BARRACKS] = new Building(
    game, BARRACKS, 0,
    {gold: 100, knowledge: 0, favor: 0},
    {unique: true}
  );
  buildings[ARMORY] = new Building(
    game, ARMORY, 0,
    {gold: 100, knowledge: 0, favor: 0},
    {unique: true}
  );
  buildings[CAPITOL] = new Building(
    game, CAPITOL, 0,
    {gold: 100, knowledge: 0, favor: 0},
    {unique: true}
  );
  buildings[LAB] = new Building(
    game, LAB, 0,
    {gold: 100, knowledge: 0, favor: 0},
    {unique: true}
  );

  buildings[SIEGE] = new Building(
    game, SIEGE, 0,
    {gold: 0, knowledge: 0, favor: 0},
    {unique: true}
  );
  buildings[JUNGLE] = new Building(
    game, JUNGLE, 0,
    {gold: 0, knowledge: 0, favor: 0},
    {unique: true}
  );
  buildings[SIEGE_RALLY] = new Building(
    game, SIEGE_RALLY, 0,
    {gold: 0, knowledge: 0, favor: 0},
    {unique: true}
  );
  buildings[JUNGLE_RALLY] = new Building(
    game, JUNGLE_RALLY, 0,
    {gold: 0, knowledge: 0, favor: 0},
    {unique: true}
  );

  return buildings;
}
