/* *************************
 * "CLASS": Projectile
 * *************************/

function Projectile(x, y, sprite){

	Entity.call(this,x,y);
	this.sprite = sprite;
	this.radius = ((this.sprite.width + this.sprite.height)/2)/2;
	this.range;

	return this;
}
 