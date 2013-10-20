// Jamming from file: 0_Global.js
const canvas = document.getElementById("canvas");
const d = canvas.getContext("2d");

var PLAYER_VELOCITY = 0.0095;
var PLAYER_FRICTION = 0.987;
var pressedKeys = [];



//////////////////////////////
/*
  VK VALUES
*/
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

// Jamming from file: 1_Sprites.js
const sprite_Player = new Image();
sprite_Player.src = "res/Player.png";

// Jamming from file: 2_Player.js
function Player(x, y){
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.sprite = sprite_Player;
	
	//Update
	this.update = function(){
		this.vx *= PLAYER_FRICTION;
		this.x += this.vx;
		
		this.vy *= PLAYER_FRICTION;
		this.y += this.vy;
	}
	
	//Render
	this.render = function(){
		d.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
	}
	
}

player = new Player(0,0);

// Jamming from file: 3_Keyboard.js
function Keyboard(){

	this.updateKeyInput = function(){
		var isPressing = false;

		//Move Up (UP or W)
		if(pressedKeys[VK_UP] || pressedKeys[VK_W]){
			player.vy -= PLAYER_VELOCITY;
		}
		else{
		}

		//Move Left (LEFT or A)
		if(pressedKeys[VK_LEFT] || pressedKeys[VK_A]){
			player.vx -= PLAYER_VELOCITY;
		}
		else{
		}
		
		//Move Down (DOWN or S)
		if(pressedKeys[VK_DOWN] || pressedKeys[VK_S]){
			player.vy += PLAYER_VELOCITY;
		}
		else{
		}
		
		//Move Right (RIGHT or D)
		if(pressedKeys[VK_RIGHT] || pressedKeys[VK_D]){
			player.vx += PLAYER_VELOCITY;
		}
		else{
		}
		
	};
	
}

window.onkeydown = function(e){
	e=e||event;
	pressedKeys[e.keyCode] = true;
};

window.onkeyup = function(e){
	e=e||event;
	pressedKeys[e.keyCode] = false;
};

keyboard = new Keyboard();

// Jamming from file: 4_Game.js
function update(){
	keyboard.updateKeyInput();
	player.update();
}

function render(){
	d.clearRect(0, 0, canvas.width, canvas.height);
	player.render();
}


window.setInterval("update()",60/1000);
window.setInterval("render()",1);

