/* *************************
 * "CLASS": Keyboard
 * *************************/

var paused = false;
 
function Keyboard(){

	this.spacebarPressed = false;
	this.H_pressed = false;

	this.updateKeyInput = function(dt){
	
		//Move Up (UP or W)
		if(pressedKeys[VK_UP] || pressedKeys[VK_W]){
			if(player.vy > 0){
				player.vy /= PLAYER_HANDLE
			}
			player.vy -= player.speed * dt;
		}
		else{
		}

		//Move Left (LEFT or A)
		if(pressedKeys[VK_LEFT] || pressedKeys[VK_A]){
			if(player.vx > 0){
				player.vx /= PLAYER_HANDLE
			}
			player.vx -= player.speed * dt;
		}
		else if(!(pressedKeys[VK_LEFT] || pressedKeys[VK_A])){
		}
		
		//Move Down (DOWN or S)
		if(pressedKeys[VK_DOWN] || pressedKeys[VK_S]){
			if(player.vy < 0){
				player.vy /= PLAYER_HANDLE
			}
			player.vy += player.speed * dt;
		}
		else{
		}
		
		//Move Right (RIGHT or D)
		if(pressedKeys[VK_RIGHT] || pressedKeys[VK_D]){
			if(player.vx < 0){
				player.vx /= PLAYER_HANDLE
			}
			player.vx += player.speed * dt;
		}
		else{
		}
		
		/*Block (SPACEBAR)
		if(pressedKeys[VK_SPACEBAR] && !this.spacebarPressed){
			this.spacebarPressed = true;
			if(!player.isBlocking){
				player.block();
			}
		}
		else if(!(pressedKeys[VK_SPACEBAR] && !this.spacebarPressed)){
			this.spacebarPressed = false;
		}*/
		
		//Toggle HUD (on/off)
		if(pressedKeys[VK_H] && !this.H_pressed){
			this.H_pressed = true;
			if(!showHUD) showHUD = true;
			else showHUD = false;
		}
		else if(!pressedKeys[VK_H]){
			this.H_pressed = false;
			daux.clearRect(0,0,auxcanvas.width,auxcanvas.width);
		}
		
	};
	
}

function keyPressed(e) {
	if(!e) var e = window.onkeydown;
	e=e||event;
	pressedKeys[e.keyCode] = true;
		if(e.keyCode==13){
			if(paused)
				paused = false;
			else
			paused = true;
		}
};

function keyReleased(e){
	if(!e) var e = window.onkeyup;
	e=e||event;
	pressedKeys[e.keyCode] = false;
};

window.addEventListener('keydown', keyPressed, false);
window.addEventListener('keyup', keyReleased, false);

var keyboard = new Keyboard();
