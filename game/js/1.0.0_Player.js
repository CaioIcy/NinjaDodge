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
