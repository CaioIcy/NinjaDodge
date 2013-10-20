function Keyboard(){

	this.updateKeyInput = function(){
		var isPressing = false;

		//Move Up (UP or W)
		if(pressedKeys[VK_UP] || pressedKeys[VK_W]){
			player.vy -= PLAYER_VELOCITY;
		}
		else{
		}

		//Move Left (LEFT or A)
		if(pressedKeys[VK_LEFT] || pressedKeys[VK_A]){
			player.vx -= PLAYER_VELOCITY;
		}
		else{
		}
		
		//Move Down (DOWN or S)
		if(pressedKeys[VK_DOWN] || pressedKeys[VK_S]){
			player.vy += PLAYER_VELOCITY;
		}
		else{
		}
		
		//Move Right (RIGHT or D)
		if(pressedKeys[VK_RIGHT] || pressedKeys[VK_D]){
			player.vx += PLAYER_VELOCITY;
		}
		else{
		}
		
	};
	
}

window.onkeydown = function(e){
	e=e||event;
	pressedKeys[e.keyCode] = true;
};

window.onkeyup = function(e){
	e=e||event;
	pressedKeys[e.keyCode] = false;
};

keyboard = new Keyboard();
