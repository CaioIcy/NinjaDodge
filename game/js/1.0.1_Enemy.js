/* *************************
 * "CLASS": Enemy
 * *************************/
 
var enemyTypes = [
	'LINE',
	'FOLLOW'
];

var enemies = [];

function Enemy(x, y, type){
	
	Entity.call(this, x, y);
	
	try{
		var validType = false;
		for(i = 0; i < enemyTypes.length; i++){
			if(type == enemyTypes[i]){
				validType = true;
				break;
			}
		}
		if(validType){
			this.type = type;
		}
		else{
			throw "this type of enemy is undefined [" + type + "].";
		}
	} catch(e){
		alert("Error: " + e);
		return null;
	}
	
	this.destroy = function(){
		enemies.splice(enemies.indexOf(this), 1);
	};
	
	this.checkBoundaries = function(){
	};
	
	return this;
}

function createEverything(type){
	var pos = [0, 0];
	pos = randomizeSpawnPosition();
		
	if(type == enemyTypes[0]){
		enemies[enemies.length] = new LineEnemy(pos[0], pos[1]);
	}
	else if(type == enemyTypes[1]){
		enemies[enemies.length] = new FollowEnemy(pos[0], pos[1]);
	}
	else{
		alert("kyop");
	}
}

function randomizeSpawnPosition(){
	var pos = [0, 0];
	var random = randomize(4); //1,2,3,4
	if(random == 1){ //Up
		pos[0] = randomize(canvas.width);
		pos[1] = 0 - enemyFollowSprite.height;
	}
	else if(random == 2){ //Left
		pos[0] = 0 - enemyFollowSprite.width;
		pos[1] = randomize(canvas.height);
	}
	else if(random == 3){ //Right
		pos[0] = canvas.width;
		pos[1] = randomize(canvas.height);
	}
	else if(random == 4){ // Down
		pos[0] = randomize(canvas.width);
		pos[1] = canvas.height;
	}
	else{
		alert("Error: Enemy -> randomizeSpawnPosition");
		return null;
	}
	
	return pos;
}

Enemy.prototype = new Entity();
