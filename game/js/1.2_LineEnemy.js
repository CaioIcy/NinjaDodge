/* *************************
 * "CLASS": LineEnemy
 * *************************/

function LineEnemy(x, y){
	
		Enemy.call(this, x, y, "LINE");
	
	this.sprite = enemyLineSprite;
	this.speed = ENEMY_VELOCITY * 1.5;
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
	
	return this;
}

LineEnemy.prototype = new Enemy();
