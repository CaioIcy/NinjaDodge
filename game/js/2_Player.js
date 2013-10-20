function Player(x, y){
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.sprite = sprite_Player;
	
	//Update
	this.update = function(){
		this.vx *= PLAYER_FRICTION;
		this.x += this.vx;
		
		this.vy *= PLAYER_FRICTION;
		this.y += this.vy;
	}
	
	//Render
	this.render = function(){
		d.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
	}
	
}

player = new Player(0,0);
