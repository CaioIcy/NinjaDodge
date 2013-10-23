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
var STARTING_PLAYER_VELOCITY = 0.0095;
var BLOCK_RADIUS = 5;
var BLOCK_DELAY = 1000; // in milliseconds
var PLAYER_SPRITE_WIDTH = 30;
var TELEPORT = 100;

// Enemy
var ENEMY_VELOCITY = 0.7;
var MAX_ENEMY_VELOCITY = 3;
var ENEMY_SPRITE_WIDTH = 30;
var SPAWN_LINE_ENEMY_DELAY = 1000.0; //in microseconds
var SPAWN_FOLLOW_ENEMY_DELAY = 1500.0; //in microseconds

// Jamming from file: 0.1_Sprites.js
/* *************************
 * Game Images
 * *************************/

var playerSprite = new Image();
playerSprite.src = "res/Player.png";

var enemyFollowSprite = new Image();
enemyFollowSprite.src = "res/FollowEnemy.png";

var enemyLineSprite = new Image();
enemyLineSprite.src = "res/LineEnemy.png";

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

	var collided = false;
	
	var dx = (circle2.x + circle2.radius) - (circle1.x + circle1.radius);
	var dy = (circle2.y + circle2.radius) - (circle1.y + circle1.radius);
	var distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

	if (Math.abs(distance) <= Math.abs(circle1.radius + circle2.radius)){
		collided = true;
	}

	return collided;	
}

// Jamming from file: 1.0_Player.js
/* *************************
 * CLASS: Player
 * *************************/

function Player(x, y){
	this.x = x;
	this.y = y;
	
	this.vx = 0;
	this.vy = 0;
	this.speed = STARTING_PLAYER_VELOCITY;
	this.sprite = playerSprite;
	this.isBlocking = false;
	this.blockRadius = (PLAYER_SPRITE_WIDTH/2) + BLOCK_RADIUS;
	this.radius = PLAYER_SPRITE_WIDTH/2;
	
	this.teleportRange = 100;
	
	//Check Canvas Boundaries
	this.checkCanvasBoundaries = function(){
		if(this.x >= canvas.width) this.x = canvas.width - playerSprite.width;
		if(this.x <= 0) this.x = 0;
		if(this.y >= canvas.height) this.y = canvas.height - playerSprite.height;
		if(this.y <= 0) this.y = 0;
	}
	
	//Update
	this.update = function(){
		this.vx *= PLAYER_FRICTION;
		this.x += this.vx;
		
		this.vy *= PLAYER_FRICTION;
		this.y += this.vy;
		
		this.checkCanvasBoundaries();
		
	};
	
	//Render
	this.render = function(){
		d.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
	};
	
	//Block
	this.block = function(){
	
		this.isBlocking = true;
		
		checkEnemiesCollision(this);	
				
		var blockX = this.x + (this.sprite.width/2);
		var blockY = this.y + (this.sprite.height/2);
	
		daux.beginPath();
		daux.arc(blockX, blockY, this.blockRadius, 0, Math.PI*2, true); 
		daux.stroke();
		
		setTimeout(function(){
			daux.clearRect(0, 0, auxcanvas.width, auxcanvas.height);
		}, 50);
		blockEnable(this);
	};
	
}

function blockEnable(player){
		setTimeout(function(){
			player.isBlocking = false;
		}, BLOCK_DELAY);
}

function checkEnemiesCollision(player){
	for(var i = 0; i<lineEnemies.length; i++){
		if( circleCollision(player, lineEnemies[i]) ){
			lineEnemies[i].destroy();
			//alert("collided line: " + i);
		}
	}
		
		
	for(var i = 0; i<followEnemies.length; i++){
		if( circleCollision(player, followEnemies[i]) ){
			followEnemies[i].destroy();
			//alert("collided follow: " + i);
		}
	}	
}

var PLAYER_START_X = (canvas.width/2) - (playerSprite.width/2);
var PLAYER_START_Y = (canvas.height/2) - (playerSprite.height/2);
player = new Player(PLAYER_START_X, PLAYER_START_Y);

// Jamming from file: 1.1_FollowEnemy.js
/* *************************
 * CLASS: FollowEnemy
 * *************************/

function FollowEnemy(x, y){
	this.x = x;
	this.y = y;

	this.sprite = enemyFollowSprite;
	this.speed = ENEMY_VELOCITY;
	
	this.radius = ENEMY_SPRITE_WIDTH/2;
	
	//Destroy
	this.destroy = function(){
		followEnemies.splice(followEnemies.indexOf(this), 1);
	};
	
	//Update
	this.update = function(){
		var xToFollow = player.x - this.x;
		var yToFollow = player.y - this.y;
		
		var hypotenuse = Math.sqrt( (xToFollow*xToFollow)+(yToFollow*yToFollow) );
		hypotenuse = (hypotenuse==0) ? 1 : hypotenuse;
		
		xToFollow /= hypotenuse;
		yToFollow /= hypotenuse;
		
		this.x += xToFollow*this.speed;
		this.y += yToFollow*this.speed;
		
		if(this.x > canvas.width+50 || this.x < -50 || this.y > canvas.height+50 || this.y < -50){
			this.destroy();
		}
		
	};
	
	//Render
	this.render = function(){
		d.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
		
		var blockX = this.x + (this.sprite.width/2);
		var blockY = this.y + (this.sprite.height/2);
	
		d.beginPath();
		d.arc(blockX, blockY, 5+(ENEMY_SPRITE_WIDTH/2), 0, Math.PI*2, true); 
		d.stroke();
	};
	
}


var followEnemies = [];

function createFollowEnemy(){

	var xpos = 0;
	var ypos = 0;
	
	var random = randomize(4); //1,2,3,4
	if(random == 1){ //Up
		xpos = randomize(canvas.width);
		ypos = 0 - enemyFollowSprite.height;
	}
	else if(random == 2){ //Left
		xpos = 0 - enemyFollowSprite.width;
		ypos = randomize(canvas.height);
	}
	else if(random == 3){ //Right
		xpos = canvas.width;
		ypos = randomize(canvas.height);
	}
	else if(random == 4){ // Down
		xpos = randomize(canvas.width);
		ypos = canvas.height;
	}
	else{
		alert("Error: FollowEnemy -> createFollowEnemy");
	}
	
	followEnemies[followEnemies.length] = new FollowEnemy(xpos,ypos);
}

// Jamming from file: 1.2_LineEnemy.js
/* *************************
 * CLASS: LineEnemy
 * *************************/

function LineEnemy(x, y){
	this.x = x;
	this.y = y;
	this.sprite = enemyLineSprite;
	this.speed = ENEMY_VELOCITY;
	this.radius = ENEMY_SPRITE_WIDTH/2;
	
	this.xToFollow = player.x - this.x;
	this.yToFollow = player.y - this.y;
	this.hypotenuse = Math.sqrt( (this.xToFollow*this.xToFollow)+(this.yToFollow*this.yToFollow) );
	this.hypotenuse = (this.hypotenuse==0) ? 1 : this.hypotenuse;
	this.xToFollow /= this.hypotenuse;
	this.yToFollow /= this.hypotenuse;
	
	//Destroy
	this.destroy = function(){
		lineEnemies.splice(lineEnemies.indexOf(this), 1);
	};
	
	//Update
	this.update = function(){
		this.x += this.xToFollow*this.speed;
		this.y += this.yToFollow*this.speed;
		
		if(this.x > canvas.width+50 || this.x < -50 || this.y > canvas.height+50 || this.y < -50){
			this.destroy();
		}
	};
	
	//Render
	this.render = function(){
		d.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
	
		var blockX = this.x + (this.sprite.width/2);
		var blockY = this.y + (this.sprite.height/2);
	
		d.beginPath();
		d.arc(blockX, blockY, 5+(ENEMY_SPRITE_WIDTH/2), 0, Math.PI*2, true); 
		d.stroke();
	};
	
}

var lineEnemies = [];

function createLineEnemy(){

	var xpos = 0;
	var ypos = 0;
	
	var random = randomize(4); //1,2,3,4
	if(random == 1){ //Up
		xpos = randomize(canvas.width);
		ypos = 0 - enemyLineSprite.height;
	}
	else if(random == 2){ //Left
		xpos = 0 - enemyLineSprite.width;
		ypos = randomize(canvas.height);
	}
	else if(random == 3){ //Right
		xpos = canvas.width;
		ypos = randomize(canvas.height);
	}
	else if(random == 4){ // Down
		xpos = randomize(canvas.width);
		ypos = canvas.height;
	}
	else{
		alert("Error: LineEnemy -> createLineEnemy");
	}
	
	lineEnemies[lineEnemies.length] = new LineEnemy(xpos,ypos);
}


// Jamming from file: 2.0_Keyboard.js
/* *************************
 * CLASS: Keyboard
 * *************************/

function Keyboard(){

	this.updateKeyInput = function(){
	
		//Move Up (UP or W)
		if(pressedKeys[VK_UP] || pressedKeys[VK_W]){
			player.vy -= player.speed;
		}
		else{
		}

		//Move Left (LEFT or A)
		if(pressedKeys[VK_LEFT] || pressedKeys[VK_A]){
			player.vx -= player.speed;
		}
		else if(!(pressedKeys[VK_LEFT] || pressedKeys[VK_A])){
		}
		
		//Move Down (DOWN or S)
		if(pressedKeys[VK_DOWN] || pressedKeys[VK_S]){
			player.vy += player.speed;
		}
		else{
		}
		
		//Move Right (RIGHT or D)
		if(pressedKeys[VK_RIGHT] || pressedKeys[VK_D]){
			player.vx += player.speed;
		}
		else{
		}
		
		//Block (SPACEBAR)
		if(pressedKeys[VK_SPACEBAR] && !isPressing){
			isPressing = true;
			if(!player.isBlocking){
				player.block();
			}
		}
		else if(!(pressedKeys[VK_SPACEBAR] && !isPressing)){
			isPressing = false;
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

keyboard = new Keyboard();

// Jamming from file: 2.1_Mouse.js
/* *************************
 * CLASS: Mouse
 * *************************/
 
function Mouse() {

	//this.isIE = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
	this.mx = 0;
	this.my = 0;
	
	this.setXY = function(x,y){
		this.mx = x;
		this.my = y;
	}
	
	this.mouseClick = function(){
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
	}
	
	this.render = function(){
		daux.clearRect(canvas.width-60, 10, 40, 40);
		daux.fillText("mX: " + this.mx, canvas.width-60, 20);
		daux.fillText("mY: " + this.my, canvas.width-60, 40);
	}

}

mouse = new Mouse();

function mouseXY(e) {
		e = e||event;
		var mouseX = e.clientX - canvas.offsetLeft;
		var mouseY = e.clientY - canvas.offsetTop;
		
		mouseX = (mouseX<=0) ? 0 : mouseX;
		mouseX = (mouseX>=canvas.width) ? canvas.width : mouseX;
		
		mouseY = (mouseY<=0) ? 0 : mouseY;
		mouseY = (mouseY>=canvas.height) ? canvas.height : mouseY;
		
		mouse.setXY(mouseX, mouseY);
}

function doMouseClick(e){
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

function update(){
	keyboard.updateKeyInput();
	player.update();
	
	var lineEnd = window.performance.now();
	if( (lineEnd - lineStart) > SPAWN_LINE_ENEMY_DELAY){
		createLineEnemy();
		lineStart = lineEnd;
	}
	
	var followEnd = window.performance.now();
	if( (followEnd - followStart) > SPAWN_FOLLOW_ENEMY_DELAY){
		createFollowEnemy();
		followStart = followEnd;
	}
	
	for(var i = 0; i<lineEnemies.length; i++){
		lineEnemies[i].update();
	}
	for(var i = 0; i<followEnemies.length; i++){
		followEnemies[i].update();
	}
	
}

function render(){
	d.clearRect(0, 0, canvas.width, canvas.height);
	
	mouse.render();
	player.render();
		
	for(var i = 0; i<lineEnemies.length; i++){
		lineEnemies[i].render();
	}
	for(var i = 0; i<followEnemies.length; i++){
		followEnemies[i].render();
	}
	
}

function initialize(){
	
}
window.addEventListener('load', initialize, false);

window.setInterval("update()",60/1000);
window.setInterval("render()",1);



