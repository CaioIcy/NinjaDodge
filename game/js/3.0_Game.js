/* *************************
 * Main
 * *************************/

var lineStart = window.performance.now();
var followStart = window.performance.now();
var timeTeleportStart = window.performance.now();
var fireDelayStart = window.performance.now();


function update(dt){
	keyboard.updateKeyInput(dt);
	player.update(dt);
	mouse.update();
	updateAll(enemies, dt);
	updateAll(explosions, dt);
	updateAll(playerBullets, dt);
		
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
	
	//Update teleport time
	var fireDelayEnd = window.performance.now();
	if(( fireDelayEnd - fireDelayStart ) > 3*1000){
		allowFire = true;
		fireDelayStart = fireDelayEnd;
	}
	
	setHtmlValues();
	
 }

function render(){
	d.clearRect(0, 0, canvas.width, canvas.height);
	
	if(showHUD)renderHUD();
	
	player.render();
	renderAll(enemies);
	renderAll(explosions);
	renderAll(playerBullets);
}

function initialize(){
	lastTime = window.performance.now();
	setHtmlValues();
    main();
}

// The main game loop
var lastTime;
function main() {
    var now = window.performance.now();
    var dt = (now - lastTime) / 1000.0;
    update(dt);
    render();

	gameTime += dt;
    lastTime = now;
    requestAnimFrame(main);
}
