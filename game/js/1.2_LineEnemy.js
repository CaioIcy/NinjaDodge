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
