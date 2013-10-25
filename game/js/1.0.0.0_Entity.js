/* *************************
 * "CLASS": Entity
 * *************************/

function Entity(x, y){

	this.x = x;
	this.y = y;
	this.sprite;
	
	this.update = function(dt){
	}
	
	this.render = function(){
		renderEntity(this);
	}

	return this;
}
 