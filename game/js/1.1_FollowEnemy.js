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
