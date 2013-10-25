/* *************************
 * Main
 * *************************/

var lineStart = window.performance.now();
var followStart = window.performance.now();
var timeTeleportStart = window.performance.now();
var passedSeconds = 0;
var secondsStart = window.performance.now();

function update(dt){
	keyboard.updateKeyInput(dt);
	player.update(dt);
	mouse.update();
	updateAll(enemies, dt);
	updateAll(explosions, dt);
	
	var secondsEnd = window.performance.now();

	passedSeconds += secondsEnd - secondsStart;	
	secondsStart = secondsEnd;
	daux.clearRect(198,255,150,30);
	daux.fillText((passedSeconds/1000).toFixed(2), 200, 265);
	
	checkEnemiesCollision(player);
	
	//Spawn new line enemy
	var lineEnd = window.performance.now();
	if( (lineEnd - lineStart) > SPAWN_LINE_ENEMY_DELAY){
		spawnEnemy('LINE');
		lineStart = lineEnd;
	}
	
	//Spawn new follow enemy
	var followEnd = window.performance.now();
	if( (followEnd - followStart) > SPAWN_FOLLOW_ENEMY_DELAY){
		spawnEnemy('FOLLOW');
		followStart = followEnd;
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
	
	renderHUD();
	
	player.render();
	renderAll(enemies);
	renderAll(explosions);
}

function initialize(){
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
