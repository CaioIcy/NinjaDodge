/* *************************
 * "CLASS": Player
 * *************************/

function Player(x, y){
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	
	this.sprite = new Sprite('res/spritesheet.png', [0, 0], [32,32] , 16, [0,1,2,3,4,5,6,7]);
							//url,                   pos,    size,  speed, frames,           dir, once

	this.speed = STARTING_PLAYER_SPEED;
	this.isBlocking = false;
	this.blockRadius = (PLAYER_SPRITE_WIDTH/2) + BLOCK_RADIUS;
	this.radius = PLAYER_SPRITE_WIDTH/2;
	this.handle = PLAYER_HANDLE; // the ability to turn better
	this.teleportRange = 100;
	
	//Check Canvas Boundaries
	this.checkCanvasBoundaries = function(){
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
	
	//Update
	this.update = function(dt){
		this.sprite.update(dt);
	
		this.vx *= PLAYER_FRICTION;
		this.vy *= PLAYER_FRICTION;
		
		this.x += this.vx;
		this.y += this.vy;
		
		this.checkCanvasBoundaries();
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

var PLAYER_START_X = (canvas.width/2) - 32/2;
var PLAYER_START_Y = (canvas.height/2) - 32/2;
var player = new Player(PLAYER_START_X, PLAYER_START_Y);
