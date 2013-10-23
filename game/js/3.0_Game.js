/* *************************
 * Main
 * *************************/

var lineStart = window.performance.now();
var followStart = window.performance.now();
var timeTeleportStart = window.performance.now();

function update(){
	keyboard.updateKeyInput();
	player.update();
	mouse.update();
	
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
 	
	timeTeleportEnd = window.performance.now();
	if(( timeTeleportEnd - timeTeleportStart ) > TELEPORT){
		allowTeleport = true;
		timeTeleportStart = timeTeleportEnd;
	}
	
 }

function render(){
	d.clearRect(0, 0, canvas.width, canvas.height);
	
	mouse.render();
	player.render();
		
	for(var i = 0; i<lineEnemies.length; i++){
		lineEnemies[i].render();
	}
	for(var i = 0; i<followEnemies.length; i++){
		followEnemies[i].render();
	}
	
}

function initialize(){
	
}
window.addEventListener('load', initialize, false);

window.setInterval("update()",60/1000);
window.setInterval("render()",1);



