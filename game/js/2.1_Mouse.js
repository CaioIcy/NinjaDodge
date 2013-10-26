/* *************************
 * "CLASS": Mouse
 * *************************/
 
function Mouse() {

	//this.isIE = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
	this.mx = 0;
	this.my = 0;
	
	this.setXY = function(x,y){
		this.mx = x;
		this.my = y;
	};
	
	this.teleportToMouse = function(){
		var mmx = this.mx;
		var mmy = this.my;
		var range = player.teleportRange;
		var dx = mmx - player.x;
		var dy = mmy - player.y;
		var h = Math.sqrt((dx*dx) + (dy*dy));
		
		dx/=h;
		dy/=h;

		player.x += dx*range;
		player.y += dy*range;		
	};
	
	this.render = function(){
		daux.clearRect(auxcanvas.width-60, 10, 40, 40);
		daux.fillText("mX: " + this.mx, auxcanvas.width-60, 20);
		daux.fillText("mY: " + this.my, auxcanvas.width-60, 40);
	};
	
	this.update = function(){
		if(pressedKeys[VK_F] && allowTeleport){
			this.teleportToMouse();
			allowTeleport = false;
		}
	};

}

var mouse = new Mouse();

function mouseXY(e) {
		e = e||event;
		var mouseX = e.clientX - canvas.offsetLeft;
		var mouseY = e.clientY - canvas.offsetTop;
		
		//Check mouseX boundaries
		if(mouseX <= 0){
			mouseX = 0;
		}
		else if(mouseX >= canvas.width){
			mouseX = canvas.width;
		}
		else{
			//maintain current mouseX
		}
		
		//Check mouseY boundaries
		if(mouseY <= 0){
			mouseY = 0;
		}
		else if(mouseY >= canvas.height){
			mouseY = canvas.height;
		}
		else{
			//maintain current mouseY
		}
		
		mouse.setXY(mouseX, mouseY);
}

function doMouseClick(){
	mouse.mouseClick();
}

window.addEventListener('mousemove', mouseXY, false);

