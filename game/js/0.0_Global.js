/* *************************
 * Variables / Constants
 * *************************/

// Canvas/Context
var canvas = document.getElementById("canvas");
var d = canvas.getContext("2d");
var auxcanvas = document.getElementById("auxcanvas");
var daux = auxcanvas.getContext("2d");

// Auxiliary global index
var i = 0;

// Keystrokes array
var pressedKeys = [];

// Player
var PLAYER_FRICTION = 0.987;
var STARTING_PLAYER_VELOCITY = 0.0095;
var BLOCK_RADIUS = 5;
var BLOCK_DELAY = 1000; // in milliseconds
var PLAYER_SPRITE_WIDTH = 30;
var TELEPORT = 50000;

// Enemy
var ENEMY_VELOCITY = 0.7;
var MAX_ENEMY_VELOCITY = 3;
var ENEMY_SPRITE_WIDTH = 30;
var SPAWN_LINE_ENEMY_DELAY = 1000.0; //in microseconds
var SPAWN_FOLLOW_ENEMY_DELAY = 1500.0; //in microseconds

var seconds = 0;
var allowTeleport = true;
