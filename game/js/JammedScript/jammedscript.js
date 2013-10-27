// Jamming from file: 0.0_Global.js
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
var STARTING_PLAYER_SPEED = 5;
var BLOCK_RADIUS = 5;
var BLOCK_DELAY = 1000; // in milliseconds
var PLAYER_SPRITE_WIDTH = 30;
var TELEPORT = 50000;
var PLAYER_HANDLE = 1;

// Enemy
var ENEMY_VELOCITY = 2;
var MAX_ENEMY_VELOCITY = 10;
var ENEMY_SPRITE_WIDTH = 30;
var SPAWN_LINE_ENEMY_DELAY = 1000.0; //in milliseconds
var SPAWN_FOLLOW_ENEMY_DELAY = 1500.0; //in milliseconds

var seconds = 0;
var allowTeleport = true;
var allowFire = true;

var gameTime = 0;

var showHUD = true;

// Jamming from file: 0.1_Sprites.js
/* *************************
 * Game Images
 * *************************/

resources.load([
    'res/Player.png',
    'res/FollowEnemy.png',
	'res/LineEnemy.png',
	'res/spritesheet.png'
]);
resources.onReady(initialize);

var SPRITE_ENEMY_SIZE = [32,32];

// Jamming from file: 0.2_VkValues.js
/* *************************
 * Virtual Keyboard Values
 * *************************/
 
//numbers (keyboard)
var VK_0 = 48;
var VK_1 = 49;
var VK_2 = 50;
var VK_3 = 51;
var VK_4 = 52;
var VK_5 = 53;
var VK_6 = 54;
var VK_7 = 55;
var VK_8 = 56;
var VK_9 = 57;

//numpad
var VK_NUM0 = 96;
var VK_NUM1 = 97;
var VK_NUM2 = 98;
var VK_NUM3 = 99;
var VK_NUM4 = 100;
var VK_NUM5 = 101;
var VK_NUM6 = 102;
var VK_NUM7 = 103;
var VK_NUM8 = 104;
var VK_NUM9 = 105;
var VK_NUMMULTIPLY = 106;
var VK_NUMADD = 107;
var VK_NUMSUBTRACT = 109;
var VK_NUMDECIMAL = 110;
var VK_NUMDIVIDE = 111;

//function keys
var VK_F1 = 112;
var VK_F2 = 113;
var VK_F3 = 114;
var VK_F4 = 115;
var VK_F5 = 116;
var VK_F6 = 117;
var VK_F7 = 118;
var VK_F8 = 119;
var VK_F9 = 120;
var VK_F11 = 122;
var VK_F12 = 123;

//letters
var VK_A = 65;
var VK_B = 66;
var VK_C = 67;
var VK_D = 68;
var VK_E = 69;
var VK_F = 70;
var VK_G = 71;
var VK_H = 72;
var VK_I = 73;
var VK_J = 74;
var VK_K = 75;
var VK_L = 76;
var VK_M = 77;
var VK_N = 78;
var VK_O = 79;
var VK_P = 80;
var VK_Q = 81;
var VK_R = 82;
var VK_S = 83;
var VK_T = 84;
var VK_U = 85;
var VK_V = 86;
var VK_W = 87;
var VK_X = 88;
var VK_Y = 89;
var VK_Z = 90;

//others
var VK_BACKSPACE = 8;
var VK_TAB = 9;
var VK_ENTER = 13;
var VK_SHIFT = 16;
var VK_CTRL = 17;
var VK_PAUSE = 19;
var VK_CAPSLOCK = 20;
var VK_ESC = 27;
var VK_SPACEBAR = 32;
var VK_PAGEUP = 33;
var VK_PAGEDOWN = 34;
var VK_END = 35;
var VK_HOME = 36;
var VK_LEFT = 37;
var VK_UP = 38;
var VK_RIGHT = 39;
var VK_DOWN = 40;
var VK_INSERT = 45;
var VK_DELETE = 46;
var VK_NUMLOCK = 144;
var VK_SCRLOCK = 145;
var VK_SEMICOLON_COLON = 186;
var VK_EQUALS_PLUS = 187;
var VK_COMMA = 188;
var VK_MINUS_UNDERSCORE = 189;
var VK_PERIOD = 190;
var VK_FORWARDSLASH_QUESTIONMARK = 191;
var VK_TILDE = 192;
var VK_OPENBRACKETS = 219;
var VK_BACKSLASH_PIPE = 220;
var VK_CLOSEBRACKETS = 221;
var VK_QUOTES = 222;

// Jamming from file: 0.3_Util.js
/* *************************
 * Several useful functions
 * *************************/

function randomize(limit){
	return Math.floor(Math.random()*limit)+1;
}

function circleCollision(circle1, circle2){

	this.seeCircles = function(yes){
		if(yes){
			var xx = circle1.x + (circle1.sprite.width/2);
			var yy = circle1.y + (circle1.sprite.height/2);
			var xxx = circle2.x + (circle2.sprite.width/2);
			var yyy = circle2.y + (circle2.sprite.height/2);
			daux.beginPath();
			daux.arc(xx, yy, 5+(circle1.sprite.width/2), 0, Math.PI*2, true); 
			daux.stroke();
			daux.beginPath();
			daux.arc(xxx, yyy, 5+(circle2.sprite.width/2), 0, Math.PI*2, true); 
			daux.stroke();
		}
	};

	seeCircles(false);

	var collided = false;
	
	var dx = (circle2.x + circle2.radius) - (circle1.x + circle1.radius);
	var dy = (circle2.y + circle2.radius) - (circle1.y + circle1.radius);
	var distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

	if (Math.abs(distance) <= Math.abs(circle1.radius + circle2.radius)){
		collided = true;
	}

	return collided;	
}

// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function renderEntity(entity){
	d.save();
	d.translate(entity.x, entity.y);
	entity.sprite.render(d);
	d.restore();
}

function renderAll(listOfEntities) {
    for(i = 0; i< listOfEntities.length; i++){
		var entity = listOfEntities[i];
		entity.render();
	}
}

function updateAll(listOfEntities, dt) {
    for(i = 0; i< listOfEntities.length; i++){
		var entity = listOfEntities[i];
		if(dt==null || dt == undefined){
			entity.update();
		}
		else{
			entity.update(dt);
		}
	}
}

function renderHUD(){
	//Try one clearRect only here
	mouse.render();
	renderNumberOfEnemiesOnScreen();
	
	//Game Time
	daux.clearRect(4,auxcanvas.height-30, 40,15);
	daux.fillText(gameTime.toFixed(2), 5, auxcanvas.height-15);
	
	//Number of PlayerBullets
	daux.clearRect(49,auxcanvas.height-30, 40,15);
	daux.fillText(playerBullets.length, 50, auxcanvas.height-15);
	
}

function renderNumberOfEnemiesOnScreen(){
	var nl = 0;
	var nf = 0;
	for(i=0; i<enemies.length; i++){
		var enemy = enemies[i];
		if(enemy.type == 'LINE'){
			nl++;
		}
		else if(enemy.type == 'FOLLOW'){
			nf++;
		}
		else{
			alert("Error: on renderNumberOfEnemiesOnScreen");
		}
	}
	daux.clearRect(4,255,30,30);
	daux.fillText("L: " + nl, 5, 265);
	daux.fillText("F: " + nf, 5, 280);
}

window.onmousedown = disableclick;
function disableclick(event)
{
  if(event.button==2)
   {
     return false;    
   }
}

function drawBar(posx, posy, size, width, state, maxState, horizontal, colorInside){
	if(state<0) state = 0;
	if(maxState<1) maxState = 1;	
	if(state>maxState) alert("drawBar -> state shouldn't be bigger than maxState");
	
	var fill = (state*size)/maxState;

	d.fillStyle="black";
	if(horizontal){
		d.fillRect(posx, posy-1, size+2, width);
		d.fillStyle = colorInside;
		d.fillRect(posx+1, posy, fill, width-2);
	}
	else if(!horizontal){
		d.fillRect(posx, posy-1, width, size+2);
		d.fillStyle = colorInside;
		d.fillRect(posx+1, posy+(size-fill), width-2, fill);
	}
	d.fillStyle="black";
}

function checkEnemiesCollision(object){
	for(var i = 0; i<enemies.length; i++){
		var enemy = enemies[i];
		if( circleCollision(object, enemy) ){
			enemy.destroy();
			createExplosion(enemy.x, enemy.y);
		}
	}
}
function changeValues(signal, camp){
	
	var teleportCamp = document.getElementById("teleportRange");
	var speedCamp = document.getElementById("speed");
	var healthCamp = document.getElementById("health");
	var maxHealthCamp = document.getElementById("maxhealth");
	
		if(signal == '-'){
			if(camp == 'teleportRange'){
				if(player.teleportRange > 10){
					player.teleportRange -= 10;
				}
			}
			else if(camp == 'speed'){
				if(player.speed > 5){
					player.speed -= 5;
				}
			}
			else if(camp == 'health'){
				if(player.health > 1){
					player.health--;
				}
			}
			else if(camp == 'maxHealth'){
				if(player.currentMaxHealth > player.health){
					player.currentMaxHealth--;
				}
			}
		}
		else if(signal == '+'){
			if(camp == 'teleportRange'){
				player.teleportRange += 10;
			}
			else if(camp == 'speed'){
				player.speed += 5;
			}
			else if(camp == 'health'){
				if(player.health < player.currentMaxHealth){
					player.health++;
				}
			}
			else if(camp == 'maxHealth'){
				player.currentMaxHealth++;
			}
		}
		else{
			alert("changeValues() -> wrong signal [" + signal + "]");
		}
		
}

function refreshPage(){
	location.reload(true);
}

function setHtmlValues(){
	var speed = document.getElementById("speed");
	var teleport = document.getElementById("teleportRange");
	var health = document.getElementById("health");
	var maxHealth = document.getElementById("maxhealth");
	speed.value = player.speed;
	teleport.value = player.teleportRange;
	health.value = player.health;
	maxHealth.value = player.currentMaxHealth;
}

// Jamming from file: 1.0.0.0_Entity.js
/* *************************
 * "CLASS": Entity
 * *************************/

function Entity(x, y){

	this.x = x;
	this.y = y;
	
	this.sprite;
	this.speed;
	this.radius;
	
	this.update = function(dt){
	}
	
	this.render = function(){
		renderEntity(this);
	}

	return this;
}
 
// Jamming from file: 1.0.0.1_Projectile.js
/* *************************
 * "CLASS": Projectile
 * *************************/

function Projectile(x, y, sprite){

	Entity.call(this,x,y);
	this.sprite = sprite;
	this.radius = ((this.sprite.width + this.sprite.height)/2)/2;
	this.range;

	return this;
}
 
// Jamming from file: 1.0.0_Player.js
/* *************************
 * "CLASS": Player
 * *************************/

function Player(x, y){

	/* ###	ATTRIBUTES	### */
	Entity.call(this, x, y);

	this.vx = 0;
	this.vy = 0;
	this.currentMaxHealth = 2;
	this.health = 2;
	this.sprite = new Sprite('res/spritesheet.png', [0, 0], [32,32] , 12, [0,1,2,3,4,5,6,7]);
	this.speed = STARTING_PLAYER_SPEED;
	this.isBlocking = false;
	this.blockRadius = (PLAYER_SPRITE_WIDTH/2) + BLOCK_RADIUS;
	this.radius = PLAYER_SPRITE_WIDTH/2;
	this.handle = PLAYER_HANDLE; // the ability to turn better
	this.teleportRange = 100;
	this.bulletRange = 180;
	this.fireDelay = 3*1000000; // in microseconds
	
	/*	METHODS	*/
	
	this.checkBoundaries = function(){
		if(this.x + this.sprite.width >= canvas.width){
			this.x = canvas.width - this.sprite.width;
			this.vx /= 2;
		}
		else if(this.x <= 0){
			this.x = 0;
			this.vx /= 2;
		}
		if(this.y + this.sprite.height >= canvas.height){
			this.y = canvas.height - this.sprite.height;
			this.vy /= 2;
		}
		else if(this.y <= 0){
			this.y = 0;
			this.vy /= 2;
		}
	}
	
	this.update = function(dt){
		this.sprite.update(dt);
		this.checkEnemiesCollision();
	
		this.vx *= PLAYER_FRICTION;
		this.vy *= PLAYER_FRICTION;
		
		this.x += this.vx;
		this.y += this.vy;
		
		this.checkBoundaries();
		
	};
	
	this.render = function(){
		renderEntity(this);
		drawBar(this.x, this.y-12, this.sprite.width, 6, this.health, this.currentMaxHealth, true, "green");
			//posx, posy, size, width, state, maxState, horizontal, colorInside
	};
	
	this.checkEnemiesCollision = function(){
		for(var i = 0; i<enemies.length; i++){
			var enemy = enemies[i];
			if(circleCollision(this, enemy) ){
				enemy.destroy();
				createExplosion(enemy.x, enemy.y);
				this.health--;
				this.checkHealth();
			}
		}
	};
	
	this.checkHealth = function(){
		if(this.health <= 0){
			//todo upgrade menu, so game over instead
			alert("Game over! You survived for " + gameTime.toFixed(2) + " seconds!");
			location.reload(true);
		}
	}
	
	/*this.block = function(){
	
		this.isBlocking = true;				
		var blockX = this.x + (this.sprite.width/2);
		var blockY = this.y + (this.sprite.height/2);
		daux.beginPath();
		daux.arc(blockX, blockY, this.blockRadius, 0, Math.PI*2, true); 
		daux.stroke();
		
		setTimeout(function(){
			daux.clearRect(0, 0, auxcanvas.width, auxcanvas.height);
		}, 50);
		setTimeout(function(){
			player.isBlocking = false;
		}, BLOCK_DELAY);
	};*/

	
	return this;
}


var PLAYER_START_X = (canvas.width/2) - 32/2;
var PLAYER_START_Y = (canvas.height/2) - 32/2;
var player = new Player(PLAYER_START_X, PLAYER_START_Y);

// Jamming from file: 1.0.1_Enemy.js
/* *************************
 * "CLASS": Enemy
 * *************************/
 
var enemyTypes = [
	'LINE',
	'FOLLOW'
];

var enemies = [];

function Enemy(x, y, type){
	
	Entity.call(this, x, y);
	
	try{
		var validType = false;
		for(i = 0; i < enemyTypes.length; i++){
			if(type == enemyTypes[i]){
				validType = true;
				break;
			}
		}
		if(validType){
			this.type = type;
		}
		else{
			throw "this type of enemy is undefined [" + type + "].";
		}
	} catch(e){
		alert("Error: " + e);
		return null;
	}
	
	this.destroy = function(){
		enemies.splice(enemies.indexOf(this), 1);
	};
	
	this.checkBoundaries = function(){
		if(this.x > canvas.width+50 || this.x < -50 || this.y > canvas.height+50 || this.y < -50){
			this.destroy();
		}
	};
	
	return this;
}

function spawnEnemy(type){
	var pos = [0, 0];
	pos = randomizeSpawnPosition();
		
	if(type == enemyTypes[0]){
		enemies[enemies.length] = new LineEnemy(pos[0], pos[1]);
	}
	else if(type == enemyTypes[1]){
		enemies[enemies.length] = new FollowEnemy(pos[0], pos[1]);
	}
	else{
		alert("TYPE UNDEFINED (spawnEnemy)");
	}
}

// So far only works for the same enemy size (SPRITE_ENEMY_SIZE)
function randomizeSpawnPosition(){
	var pos = [0, 0];
	
	try{
		var random = randomize(4); //1,2,3,4
		if(random == 1){ //Up
			pos[0] = randomize(canvas.width);
			pos[1] = 0 - SPRITE_ENEMY_SIZE[1];
		}
		else if(random == 2){ //Left
			pos[0] = 0 - SPRITE_ENEMY_SIZE[0];
			pos[1] = randomize(canvas.height);
		}
		else if(random == 3){ //Right
			pos[0] = canvas.width;
			pos[1] = randomize(canvas.height);
		}
		else if(random == 4){ // Down
			pos[0] = randomize(canvas.width);
			pos[1] = canvas.height;
		}
		else{
			throw "random value ["+ random +"] not equal to established limit";
			return null;
		}
	} catch(e){
		alert("Error: " + e);
		return null;
	}
	
	return pos;
}

// Jamming from file: 1.1_FollowEnemy.js
/* *************************
 * "CLASS": FollowEnemy
 * *************************/

function FollowEnemy(x, y){

	this.secondsToLive = 15;
	this.creationTime = window.performance.now();
	this.lifeSpan = this.creationTime + (this.secondsToLive*1000);
	
	Enemy.call(this, x, y, 'FOLLOW');

	this.sprite = new Sprite('res/spritesheet.png', [0, 64], SPRITE_ENEMY_SIZE, 4, [0,1]);
	this.speed = ENEMY_VELOCITY;
	this.radius = ((this.sprite.width + this.sprite.height)/2)/2;
	
	this.updateMovement = function(){
		var xToFollow = player.x - this.x;
		var yToFollow = player.y - this.y;
		var hypotenuse = Math.sqrt( (xToFollow*xToFollow)+(yToFollow*yToFollow) );
		
		hypotenuse = (hypotenuse==0) ? 1 : hypotenuse;
		xToFollow /= hypotenuse;
		yToFollow /= hypotenuse;
		
		this.x += xToFollow * this.speed;
		this.y += yToFollow * this.speed;
	};
	
	//Update
	this.update = function(dt){
		this.sprite.update(dt);
		this.checkLifeSpan();
		this.updateMovement();
		this.checkBoundaries();
	};
	
	this.checkLifeSpan = function(){
		var currentTime = window.performance.now();
		if(currentTime > this.lifeSpan){
			this.destroy();
			createExplosion(this.x, this.y);
		}
		else{
			//do nothing
		}
	};
	
	return this;
}

// Jamming from file: 1.2_LineEnemy.js
/* *************************
 * "CLASS": LineEnemy
 * *************************/

function LineEnemy(x, y){
	
	Enemy.call(this, x, y, "LINE");
	
	this.sprite = new Sprite('res/spritesheet.png', [0, 32], SPRITE_ENEMY_SIZE, 4, [0,1]);
	this.speed = ENEMY_VELOCITY * 1.8;
	this.radius = ((this.sprite.width + this.sprite.height)/2)/2;
	
	this.xToFollow = player.x - this.x;
	this.yToFollow = player.y - this.y;
	this.hypotenuse = Math.sqrt( (this.xToFollow*this.xToFollow)+(this.yToFollow*this.yToFollow) );
	this.hypotenuse = (this.hypotenuse==0) ? 1 : this.hypotenuse;
	this.xToFollow /= this.hypotenuse;
	this.yToFollow /= this.hypotenuse;
	
	//Update
	this.update = function(dt){
		this.sprite.update(dt);
	
		this.x += this.xToFollow*this.speed;
		this.y += this.yToFollow*this.speed;
		
		this.checkBoundaries();
	};
	
	return this;
}

// Jamming from file: 1.3_Explosions.js
/* *************************
 * "CLASS": Explosion
 * *************************/
var explosions = [];
function Explosion(x, y){
	Entity.call(this, x, y);
	this.sprite = new Sprite('res/spritesheet.png', [0,128], [32,32] , 12, [0,1,2,3,4,5], 'horizontal', true);
	
	this.update = function(dt){
		this.sprite.update(dt);
		if(this.sprite.done){
			this.destroy();
		}
	};
	
	this.destroy = function(){
		explosions.splice(explosions.indexOf(this), 1);
	};
	
	return this;
}

function createExplosion(x,y){
	explosions[explosions.length] = new Explosion(x,y);
}

// Jamming from file: 1.4_PlayerBullet.js
/* *************************
 * "CLASS": PlayerBullet
 * *************************/
var playerBullets = [];
function PlayerBullet(x, y, mx, my){

	x += player.sprite.width/2;
	y += player.sprite.height/2;

	var sprite = new Sprite('res/spritesheet.png', [128,64], [6,6] , 16, [0,1,2,3], 'horizontal', false);
	Projectile.call(this, x, y, sprite);
	
	this.range = player.bulletRange;
	this.speed = 10;
	
	this.ox = x;
	this.oy = y;
	
	this.xToFollow = mx - this.x;
	this.yToFollow = my - this.y;
	this.hypotenuse = Math.sqrt( (this.xToFollow*this.xToFollow)+(this.yToFollow*this.yToFollow) );
	this.hypotenuse = (this.hypotenuse==0) ? 1 : this.hypotenuse;
	this.xToFollow /= this.hypotenuse;
	this.yToFollow /= this.hypotenuse;
	
	this.update = function(dt){
		this.sprite.update(dt);
		
		this.x += this.xToFollow*this.speed;
		this.y += this.yToFollow*this.speed;
		
		this.checkRange();
		this.checkBoundaries();
		checkEnemiesCollision(this);
		
	};
	
	this.destroy = function(){
		playerBullets.splice(playerBullets.indexOf(this), 1);
	};
	
	this.checkRange = function(){
		if(Math.abs(this.x) - Math.abs(this.ox) > this.range || Math.abs(this.ox) - Math.abs(this.x) > this.range){
			this.destroy();
		}
		else if(Math.abs(this.y) - Math.abs(this.oy)> this.range || Math.abs(this.oy) - Math.abs(this.y)> this.range){
			this.destroy();
		}
		else{
			//do nothing
		}
	};
	
	this.checkBoundaries = function(){
		if(this.x > canvas.width+50 || this.x < -50 || this.y > canvas.height+50 || this.y < -50){
			this.destroy();
		}
	};
	
	return this;
}

function createPlayerBullet(mx,my){
	playerBullets[playerBullets.length] = new PlayerBullet(player.x, player.y, mx, my);
}

// Jamming from file: 2.0_Keyboard.js
/* *************************
 * "CLASS": Keyboard
 * *************************/

function Keyboard(){

	this.spacebarPressed = false;
	this.H_pressed = false;

	this.updateKeyInput = function(dt){
	
		//Move Up (UP or W)
		if(pressedKeys[VK_UP] || pressedKeys[VK_W]){
			if(player.vy > 0){
				player.vy /= PLAYER_HANDLE
			}
			player.vy -= player.speed * dt;
		}
		else{
		}

		//Move Left (LEFT or A)
		if(pressedKeys[VK_LEFT] || pressedKeys[VK_A]){
			if(player.vx > 0){
				player.vx /= PLAYER_HANDLE
			}
			player.vx -= player.speed * dt;
		}
		else if(!(pressedKeys[VK_LEFT] || pressedKeys[VK_A])){
		}
		
		//Move Down (DOWN or S)
		if(pressedKeys[VK_DOWN] || pressedKeys[VK_S]){
			if(player.vy < 0){
				player.vy /= PLAYER_HANDLE
			}
			player.vy += player.speed * dt;
		}
		else{
		}
		
		//Move Right (RIGHT or D)
		if(pressedKeys[VK_RIGHT] || pressedKeys[VK_D]){
			if(player.vx < 0){
				player.vx /= PLAYER_HANDLE
			}
			player.vx += player.speed * dt;
		}
		else{
		}
		
		/*Block (SPACEBAR)
		if(pressedKeys[VK_SPACEBAR] && !this.spacebarPressed){
			this.spacebarPressed = true;
			if(!player.isBlocking){
				player.block();
			}
		}
		else if(!(pressedKeys[VK_SPACEBAR] && !this.spacebarPressed)){
			this.spacebarPressed = false;
		}*/
		
		//Toggle HUD (on/off)
		if(pressedKeys[VK_H] && !this.H_pressed){
			this.H_pressed = true;
			if(!showHUD) showHUD = true;
			else showHUD = false;
		}
		else if(!pressedKeys[VK_H]){
			this.H_pressed = false;
			daux.clearRect(0,0,auxcanvas.width,auxcanvas.width);
		}
		
	};
	
}

window.onkeydown = function(e){
	if(!e) var e = window.onkeydown;
	e=e||event;
	pressedKeys[e.keyCode] = true;
};

window.onkeyup = function(e){
	if(!e) var e = window.onkeyup;
	e=e||event;
	pressedKeys[e.keyCode] = false;
};

var keyboard = new Keyboard();

// Jamming from file: 2.1_Mouse.js
/* *************************
 * "CLASS": Mouse
 * *************************/
 
function Mouse() {

	//this.isIE = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
	this.mx = 0;
	this.my = 0;
	
	this.setXY = function(x,y){
		this.mx = x;
		this.my = y;
	};
	
	this.teleportToMouse = function(){
		var mmx = this.mx;
		var mmy = this.my;
		var range = player.teleportRange;
		var dx = mmx - player.x;
		var dy = mmy - player.y;
		var h = Math.sqrt((dx*dx) + (dy*dy));
		
		dx/=h;
		dy/=h;

		player.x += dx*range;
		player.y += dy*range;		
	};
	
	this.render = function(){
		daux.clearRect(auxcanvas.width-60, 10, 40, 40);
		daux.fillText("mX: " + this.mx, auxcanvas.width-60, 20);
		daux.fillText("mY: " + this.my, auxcanvas.width-60, 40);
	};
	
	this.update = function(){
		if(pressedKeys[VK_F] && allowTeleport){
			this.teleportToMouse();
			allowTeleport = false;
		}
	};
	
	this.mouseClick = function(){
		if(allowFire){
			allowFire = false;
			createPlayerBullet(this.mx, this.my);
		}
	};

}

var mouse = new Mouse();

function mouseXY(e) {
	e = e||event;
	
	var el = document.querySelector(".wrapper");
	var offsetTop = el.getBoundingClientRect().top;
	var offsetLeft = el.getBoundingClientRect().left;
	
	var mouseX = e.clientX - offsetLeft;
	var mouseY = e.clientY - offsetTop;
		
	//Check mouseX boundaries
	if(mouseX <= 0){
		mouseX = 0;
	}
	else if(mouseX >= canvas.width){
		mouseX = canvas.width;
	}
	else{
		//maintain current mouseX
	}
	
	//Check mouseY boundaries
	if(mouseY <= 0){
		mouseY = 0;
	}
	else if(mouseY >= canvas.height){
		mouseY = canvas.height;
	}
	else{
		//maintain current mouseY
	}
	
	mouse.setXY(mouseX, mouseY);
}

function doMouseClick(){
	mouse.mouseClick();
}

window.addEventListener('mousemove', mouseXY, false);
window.addEventListener('mousedown', doMouseClick, false);


// Jamming from file: 3.0_Game.js
/* *************************
 * Main
 * *************************/

var lineStart = window.performance.now();
var followStart = window.performance.now();
var timeTeleportStart = window.performance.now();
var fireDelayStart = window.performance.now();


function update(dt){
	keyboard.updateKeyInput(dt);
	player.update(dt);
	mouse.update();
	updateAll(enemies, dt);
	updateAll(explosions, dt);
	updateAll(playerBullets, dt);
		
	//Spawn new line enemy
	var lineEnd = window.performance.now();
	if( (lineEnd - lineStart) > SPAWN_LINE_ENEMY_DELAY){
		spawnEnemy('LINE');
		lineStart = lineEnd;
	}
	
	//Spawn new follow enemy
	var followEnd = window.performance.now();
	if( (followEnd - followStart) > SPAWN_FOLLOW_ENEMY_DELAY){
		spawnEnemy('FOLLOW');
		followStart = followEnd;
	}
	
	//Update teleport time
	var timeTeleportEnd = window.performance.now();
	if(( timeTeleportEnd - timeTeleportStart ) > TELEPORT){
		allowTeleport = true;
		timeTeleportStart = timeTeleportEnd;
	}
	
	//Update teleport time
	var fireDelayEnd = window.performance.now();
	if(( fireDelayEnd - fireDelayStart ) > 3*1000){
		allowFire = true;
		fireDelayStart = fireDelayEnd;
	}
	
	setHtmlValues();
	
 }

function render(){
	d.clearRect(0, 0, canvas.width, canvas.height);
	
	if(showHUD)renderHUD();
	
	player.render();
	renderAll(enemies);
	renderAll(explosions);
	renderAll(playerBullets);
}

function initialize(){
	lastTime = window.performance.now();
	setHtmlValues();
    main();
}

// The main game loop
var lastTime;
function main() {
    var now = window.performance.now();
    var dt = (now - lastTime) / 1000.0;
    update(dt);
    render();

	gameTime += dt;
    lastTime = now;
    requestAnimFrame(main);
}

