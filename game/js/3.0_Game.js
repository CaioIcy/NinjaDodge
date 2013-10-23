var lineStart = window.performance.now();
var followStart = window.performance.now();

function update(){
	keyboard.updateKeyInput();
	player.update();

	
	var lineEnd = window.performance.now();
	if( (lineEnd - lineStart) > SPAWN_LINE_ENEMY_DELAY){
		createLineEnemy();
		lineStart = lineEnd;
	}
	
	var followEnd = window.performance.now();
	if( (followEnd - followStart) > SPAWN_FOLLOW_ENEMY_DELAY){
		createFollowEnemy();
		followStart = followEnd;
	}
	
	for(var i = 0; i<lineEnemies.length; i++){
		lineEnemies[i].update();
	}
	for(var i = 0; i<followEnemies.length; i++){
		followEnemies[i].update();
	}
	time();
	
	if(seconds>=20){
		allowTeleport = true;
		seconds = 0;
	}
}

function render(){
	d.clearRect(0, 0, canvas.width, canvas.height);
	player.render();
		
	for(var i = 0; i<lineEnemies.length; i++){
		lineEnemies[i].render();
	}
	for(var i = 0; i<followEnemies.length; i++){
		followEnemies[i].render();
	}
	
}

var count = 0;

function time(){
	count++;

	if(count%120==0){
		seconds++;
	}
	return seconds;
}

window.setInterval("update()",60/1000);
window.setInterval("render()",1);
