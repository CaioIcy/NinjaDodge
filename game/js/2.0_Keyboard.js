/* *************************
 * CLASS: Keyboard
 * *************************/

function Keyboard(){

	this.updateKeyInput = function(){
	
		//Move Up (UP or W)
		if(pressedKeys[VK_UP] || pressedKeys[VK_W]){
			player.vy -= player.speed;
		}
		else{
		}

		//Move Left (LEFT or A)
		if(pressedKeys[VK_LEFT] || pressedKeys[VK_A]){
			player.vx -= player.speed;
		}
		else if(!(pressedKeys[VK_LEFT] || pressedKeys[VK_A])){
		}
		
		//Move Down (DOWN or S)
		if(pressedKeys[VK_DOWN] || pressedKeys[VK_S]){
			player.vy += player.speed;
		}
		else{
		}
		
		//Move Right (RIGHT or D)
		if(pressedKeys[VK_RIGHT] || pressedKeys[VK_D]){
			player.vx += player.speed;
		}
		else{
		}
		
		//Block (SPACEBAR)
		if(pressedKeys[VK_SPACEBAR] && !isPressing){
			isPressing = true;
			if(!player.isBlocking){
				player.block();
			}
		}
		else if(!(pressedKeys[VK_SPACEBAR] && !isPressing)){
			isPressing = false;
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

keyboard = new Keyboard();
