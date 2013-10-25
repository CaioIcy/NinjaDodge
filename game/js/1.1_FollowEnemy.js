/* *************************
 * "CLASS": FollowEnemy
 * *************************/

function FollowEnemy(x, y){
	
	Enemy.call(this, x, y, 'FOLLOW');

	this.sprite = new Sprite('res/spritesheet.png', [0, 64], SPRITE_ENEMY_SIZE, 4, [0,1]);
	this.speed = ENEMY_VELOCITY;
	this.radius = ENEMY_SPRITE_WIDTH/2;
	
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
		this.updateMovement();
		this.checkBoundaries();
	};
	
	return this;
}
