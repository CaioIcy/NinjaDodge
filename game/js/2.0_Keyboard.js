/* *************************
 * "CLASS": Keyboard
 * *************************/

function Keyboard(){

	this.spacebarPressed = false;

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
		
		//Block (SPACEBAR)
		if(pressedKeys[VK_SPACEBAR] && !this.spacebarPressed){
			this.spacebarPressed = true;
			if(!player.isBlocking){
				player.block();
			}
		}
		else if(!(pressedKeys[VK_SPACEBAR] && !this.spacebarPressed)){
			this.spacebarPressed = false;
		}
		

		
	};
	
}

window.onkeydown = function(e){
	if(!e) var e = window.onkeydown;
	e=e||event;
	pressedKeys[e.keyCode] = true;
};

window.onkeyup = function(e){
	if(!e) var e = window.onkeyup;
	e=e||event;
	pressedKeys[e.keyCode] = false;
};

var keyboard = new Keyboard();
