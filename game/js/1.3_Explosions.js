/* *************************
 * "CLASS": Explosion
 * *************************/
var explosions = [];
function Explosion(x, y){
	Entity.call(this, x, y);
	this.sprite = new Sprite('res/spritesheet.png', [0, 96], [32,32] , 16, [0,1,2,3,4], 'horizontal', true);
	
	this.update = function(dt){
		this.sprite.update(dt);
		if(this.sprite.done){
			this.destroy();
		}
	};
	
	this.destroy = function(){
		explosions.splice(explosions.indexOf(this), 1);
	};
	
	return this;
}

function createExplosion(x,y){
	explosions[explosions.length] = new Explosion(x,y);
}
