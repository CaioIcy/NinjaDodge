/* *************************
 * "CLASS": Entity
 * *************************/

function Entity(x, y){

	this.x = x;
	this.y = y;
	
	this.sprite;
	this.speed;
	this.radius;
	
	this.update = function(dt){
	}
	
	this.render = function(){
		d.save();
		d.translate(this.x, this.y);
		this.sprite.render(d);
		d.restore();
	}

	return this;
}
 