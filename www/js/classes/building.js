var HUT = 'hut';
var FARM = 'farm';
var WORKSHOP = 'workshop';
var LIBRARY = 'library';
var SHRINE = 'shrine';
var TOWER = 'tower';

var STABLE = 'stable';
var ARMORY = 'armory';
var CAPITOL = 'capitol';
var LAB = 'laboratory';

var RAID = "raid";
var RAID_RALLY = "raid rally";
var EXPEDITION = "expedition";
var EXPEDITION_RALLY = "expedition rally";

var BUILDINGS = [
  HUT,
  FARM,
  WORKSHOP,
  LIBRARY,
  SHRINE,
  TOWER,
  STABLE,
  ARMORY,
  CAPITOL,
  LAB
];

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
    {rate: 1, type: MACHETES}
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

  buildings[STABLE] = new Building(
    game, STABLE, 0,
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

  buildings[RAID] = new Building(
    game, RAID, 0,
    {gold: 0, knowledge: 0, favor: 0},
    {unique: true}
  );
  buildings[EXPEDITION] = new Building(
    game, EXPEDITION, 0,
    {gold: 0, knowledge: 0, favor: 0},
    {unique: true}
  );
  buildings[RAID_RALLY] = new Building(
    game, RAID_RALLY, 0,
    {gold: 0, knowledge: 0, favor: 0},
    {unique: true}
  );
  buildings[EXPEDITION_RALLY] = new Building(
    game, EXPEDITION_RALLY, 0,
    {gold: 0, knowledge: 0, favor: 0},
    {unique: true}
  );

  return buildings;
}
