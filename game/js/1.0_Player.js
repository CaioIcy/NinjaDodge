function Player(x, y){
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.speed = STARTING_PLAYER_VELOCITY;
	this.sprite = playerSprite;
	this.isBlocking = false;
	//alert("PLAYER_SPRITE_WIDTH (" + PLAYER_SPRITE_WIDTH + ") + BLOCK_RADIUS (" + BLOCK_RADIUS + ") = " + (this.sprite.width+BLOCK_RADIUS));
	this.blockRadius = PLAYER_SPRITE_WIDTH + BLOCK_RADIUS;
	
	//Update
	this.update = function(){
		this.vx *= PLAYER_FRICTION;
		this.x += this.vx;
		
		this.vy *= PLAYER_FRICTION;
		this.y += this.vy;
	};
	
	//Render
	this.render = function(){
		d.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
	};
	
	//Block
	this.block = function(){
	
		this.isBlocking = true;
		
		var blockX = this.x + (this.sprite.width/2);
		var blockY = this.y + (this.sprite.height/2);
	
		daux.beginPath();
		daux.arc(blockX, blockY, this.blockRadius, 0, Math.PI*2, true); 
		daux.stroke();
		
		setTimeout(function(){
			daux.clearRect(0, 0, auxcanvas.width, auxcanvas.height);
		}, 200);
		
		setTimeout(function(){
			player.isBlocking = false;
		}, BLOCK_DELAY);
		
	};
	
}

var PLAYER_START_X = (canvas.width/2) - (playerSprite.width/2);
var PLAYER_START_Y = (canvas.height/2) - (playerSprite.height/2);
player = new Player(PLAYER_START_X, PLAYER_START_Y);
