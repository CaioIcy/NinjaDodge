/* *************************
 * CLASS: Mouse
 * *************************/
 
function Mouse() {

	//this.isIE = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
	this.mx = 0;
	this.my = 0;
	
	this.setXY = function(x,y){
		this.mx = x;
		this.my = y;
	}
	
	this.mouseClick = function(){
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
	}
	
	this.render = function(){
		daux.clearRect(canvas.width-60, 10, 40, 40);
		daux.fillText("mX: " + this.mx, canvas.width-60, 20);
		daux.fillText("mY: " + this.my, canvas.width-60, 40);
	}

}

mouse = new Mouse();

function mouseXY(e) {
		e = e||event;
		var mouseX = e.clientX - canvas.offsetLeft;
		var mouseY = e.clientY - canvas.offsetTop;
		
		mouseX = (mouseX<=0) ? 0 : mouseX;
		mouseX = (mouseX>=canvas.width) ? canvas.width : mouseX;
		
		mouseY = (mouseY<=0) ? 0 : mouseY;
		mouseY = (mouseY>=canvas.height) ? canvas.height : mouseY;
		
		mouse.setXY(mouseX, mouseY);
}

function doMouseClick(e){
	mouse.mouseClick();
}

window.addEventListener('mousemove', mouseXY, false);
window.addEventListener('mousedown', doMouseClick, false);
