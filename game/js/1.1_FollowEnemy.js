function FollowEnemy(x, y){
	this.x = x;
	this.y = y;

	this.sprite = enemyFollowSprite;
	this.speed = ENEMY_VELOCITY;
	
	//Update
	this.update = function(){
		var xToFollow = player.x - this.x;
		var yToFollow = player.y - this.y;
		
		var hypotenuse = Math.sqrt( (xToFollow*xToFollow)+(yToFollow*yToFollow) );
		hypotenuse = (hypotenuse==0) ? 1 : hypotenuse;
		
		xToFollow /= hypotenuse;
		yToFollow /= hypotenuse;
		
		this.x += xToFollow*this.speed;
		this.y += yToFollow*this.speed;
	};
	
	//Render
	this.render = function(){
		d.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
	};
	
}

var followEnemyIndex = 0;
var followEnemies = [];

function createFollowEnemy(){

	var xpos = 0;
	var ypos = 0;
	
	var random = randomize(4); //1,2,3,4
	if(random == 1){ //Up
		xpos = randomize(canvas.width);
		ypos = 0 - enemyFollowSprite.height;
	}
	else if(random == 2){ //Left
		xpos = 0 - enemyFollowSprite.width;
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
		alert("Error: FollowEnemy -> createFollowEnemy");
	}
	
	followEnemies[followEnemyIndex] = new FollowEnemy(xpos,ypos);
	followEnemyIndex++;
}
