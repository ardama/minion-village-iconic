var RIFT_SCUTTLER = 'Rift Scuttler';
var RAZORBEAK = 'Razorbeak';
var MURK_WOLF = 'Murk Wolf';
var KRUG = 'Krug';
var GROMP = 'Gromp';
var BLUE_SENTINEL = 'Blue Sentinel';
var RED_BRAMBLEBACK = 'Red Brambleback';
var RIFT_HERALD = 'Rift Herald';
var DRAGON = 'Dragon';
var VILEMAW = 'Vilemaw';
var BARON_NASHOR = 'Baron Nashor';

var MONSTERS = [
  RIFT_SCUTTLER,
  RAZORBEAK,
  MURK_WOLF,
  KRUG,
  GROMP,
  BLUE_SENTINEL,
  RED_BRAMBLEBACK,
  RIFT_HERALD,
  DRAGON,
  VILEMAW,
  BARON_NASHOR
];

var Monster = function(game, name, level, stats) {
  this.Init(game, name, level, stats);
};

Monster.prototype.Init = function(game, name, level, stats) {
  this.game = game;
  this.name = name;
  this.level = level;
  this.stats = stats;
};

Monster.initializeMonsters = function(game) {
  var monsters = {};
  monsters[RIFT_SCUTTLER] = new Monster(
    game, RIFT_SCUTTLER, 10,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[RAZORBEAK] = new Monster(
    game, RAZORBEAK, 25,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[MURK_WOLF] = new Monster(
    game, MURK_WOLF, 50,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[KRUG] = new Monster(
    game, KRUG, 75,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[GROMP] = new Monster(
    game, GROMP, 100,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[BLUE_SENTINEL] = new Monster(
    game, BLUE_SENTINEL, 125,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[RED_SENTINEL] = new Monster(
    game, RED_SENTINEL, 150,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[RIFT_HERALD] = new Monster(
    game, RIFT_HERALD, 175,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[DRAGON] = new Monster(
    game, DRAGON, 200,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[VILEMAW] = new Monster(
    game, VILEMAW, 225,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
  monsters[BARON_NASHOR] = new Monster(
    game, BARON_NASHOR, 250,
    {damage: 1, durability: 1, strength: 1, skill: 1}
  );
};
