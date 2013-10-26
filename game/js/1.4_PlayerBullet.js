/* *************************
 * "CLASS": PlayerBullet
 * *************************/
var playerBullets = [];
function PlayerBullet(x, y, mx, my){

	x += player.sprite.width/2;
	y += player.sprite.height/2;

	var sprite = new Sprite('res/spritesheet.png', [128,64], [6,6] , 16, [0,1,2,3], 'horizontal', false);
	Projectile.call(this, x, y, sprite);
	
	this.range = player.bulletRange;
	this.speed = 10;
	
	this.ox = x;
	this.oy = y;
	
	this.xToFollow = mx - this.x;
	this.yToFollow = my - this.y;
	this.hypotenuse = Math.sqrt( (this.xToFollow*this.xToFollow)+(this.yToFollow*this.yToFollow) );
	this.hypotenuse = (this.hypotenuse==0) ? 1 : this.hypotenuse;
	this.xToFollow /= this.hypotenuse;
	this.yToFollow /= this.hypotenuse;
	
	this.update = function(dt){
		this.sprite.update(dt);
		
		this.x += this.xToFollow*this.speed;
		this.y += this.yToFollow*this.speed;
		
		this.checkRange();
		this.checkBoundaries();
		this.checkCollision();
		
	};
	
	this.destroy = function(){
		playerBullets.splice(playerBullets.indexOf(this), 1);
	};
	
	this.checkRange = function(){
		if(Math.abs(this.x) - Math.abs(this.ox) > this.range || Math.abs(this.ox) - Math.abs(this.x) > this.range){
			this.destroy();
		}
		else if(Math.abs(this.y) - Math.abs(this.oy)> this.range || Math.abs(this.oy) - Math.abs(this.y)> this.range){
			this.destroy();
		}
		else{
			//do nothing
		}
	};
	
	this.checkBoundaries = function(){
		if(this.x > canvas.width+50 || this.x < -50 || this.y > canvas.height+50 || this.y < -50){
			this.destroy();
		}
	};
	
	this.checkCollision = function(){
		for(var i = 0; i<enemies.length; i++){
			var enemy = enemies[i];
			if( circleCollision(this, enemy) ){
				enemy.destroy();
				createExplosion(enemy.x, enemy.y);
			}
		}
	};
	
	return this;
}

function createPlayerBullet(mx,my){
	playerBullets[playerBullets.length] = new PlayerBullet(player.x, player.y, mx, my);
}
