function LineEnemy(x, y){
	this.x = x;
	this.y = y;
	this.sprite = enemyLineSprite;
	this.speed = ENEMY_VELOCITY;
	
	this.xToFollow = player.x - this.x;
	this.yToFollow = player.y - this.y;
	this.hypotenuse = Math.sqrt( (this.xToFollow*this.xToFollow)+(this.yToFollow*this.yToFollow) );
	this.hypotenuse = (this.hypotenuse==0) ? 1 : this.hypotenuse;
	this.xToFollow /= this.hypotenuse;
	this.yToFollow /= this.hypotenuse;
	
	//Update
	this.update = function(){
		this.x += this.xToFollow*this.speed;
		this.y += this.yToFollow*this.speed;
	};
	
	//Render
	this.render = function(){
		d.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
	};
	
}

var lineEnemyIndex = 0;
var lineEnemies = [];

function createLineEnemy(){

	var xpos = 0;
	var ypos = 0;
	
	var random = randomize(4); //1,2,3,4
	if(random == 1){ //Up
		xpos = randomize(canvas.width);
		ypos = 0 - enemyLineSprite.height;
	}
	else if(random == 2){ //Left
		xpos = 0 - enemyLineSprite.width;
		ypos = randomize(canvas.height);
	}
	else if(random == 3){ //Right
		xpos = canvas.width;
		ypos = randomize(canvas.height);
	}
	else if(random == 4){ // Down
		xpos = randomize(canvas.width);
		ypos = canvas.height;
	}
	else{
		alert("Error: LineEnemy -> createLineEnemy");
	}
	
	lineEnemies[lineEnemyIndex] = new LineEnemy(xpos,ypos);
	lineEnemyIndex++;
}

