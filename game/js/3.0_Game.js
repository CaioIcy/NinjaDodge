/* *************************
 * Main
 * *************************/

var lineStart = window.performance.now();
var followStart = window.performance.now();
var timeTeleportStart = window.performance.now();

function update(dt){
	keyboard.updateKeyInput(dt);
	player.update(dt);
	mouse.update();
	
	//Spawn new line enemy
	var lineEnd = window.performance.now();
	if( (lineEnd - lineStart) > SPAWN_LINE_ENEMY_DELAY){
		createLineEnemy();
		lineStart = lineEnd;
	}
	
	//Spawn new follow enemy
	var followEnd = window.performance.now();
	if( (followEnd - followStart) > SPAWN_FOLLOW_ENEMY_DELAY){
		createFollowEnemy();
		followStart = followEnd;
	}
	
	//Update line enemies
	for(var i = 0; i<lineEnemies.length; i++){
		lineEnemies[i].update(dt);
	}
	
	//Update follow enemies
	for(var i = 0; i<followEnemies.length; i++){
		followEnemies[i].update(dt);
	}
 	
	//Update teleport time
	var timeTeleportEnd = window.performance.now();
	if(( timeTeleportEnd - timeTeleportStart ) > TELEPORT){
		allowTeleport = true;
		timeTeleportStart = timeTeleportEnd;
	}
	
 }

function render(){
	d.clearRect(0, 0, canvas.width, canvas.height);
	
	mouse.render();
	renderEntity(player);
		
	for(var i = 0; i<lineEnemies.length; i++){
		lineEnemies[i].render();
	}
	for(var i = 0; i<followEnemies.length; i++){
		followEnemies[i].render();
	}
	
}

function initialize(){

	var e = new Entity(1,1);
	e.render();
	var p = new Player(2,2);
	p.render();

	lastTime = Date.now();
    main();
}

// The main game loop
var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
}
