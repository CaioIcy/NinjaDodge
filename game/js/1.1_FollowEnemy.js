/* *************************
 * "CLASS": FollowEnemy
 * *************************/

function FollowEnemy(x, y){
	
	Enemy.call(this, x, y, 'FOLLOW');

	this.sprite = enemyFollowSprite;
	this.speed = ENEMY_VELOCITY;
	this.radius = ENEMY_SPRITE_WIDTH/2;
	
	//Destroy
	this.destroy = function(){
		followEnemies.splice(followEnemies.indexOf(this), 1);
	};
	
	this.checkBoundaries = function(){
		if(this.x > canvas.width+50 || this.x < -50 || this.y > canvas.height+50 || this.y < -50){
			this.destroy();
		}
	};
	
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
		this.updateMovement();
		this.checkBoundaries();
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
	
	
	return this;
}

FollowEnemy.prototype = new Enemy();
