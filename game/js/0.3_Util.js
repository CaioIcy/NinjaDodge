/* *************************
 * Several useful functions
 * *************************/

function randomize(limit){
	return Math.floor(Math.random()*limit)+1;
}

function circleCollision(circle1, circle2){

	this.seeCircles = function(yes){
		if(yes){
			var xx = circle1.x + (circle1.sprite.width/2);
			var yy = circle1.y + (circle1.sprite.height/2);
			var xxx = circle2.x + (circle2.sprite.width/2);
			var yyy = circle2.y + (circle2.sprite.height/2);
			daux.beginPath();
			daux.arc(xx, yy, 5+(circle1.sprite.width/2), 0, Math.PI*2, true); 
			daux.stroke();
			daux.beginPath();
			daux.arc(xxx, yyy, 5+(circle2.sprite.width/2), 0, Math.PI*2, true); 
			daux.stroke();
		}
	};

	seeCircles(false);

	var collided = false;
	
	var dx = (circle2.x + circle2.radius) - (circle1.x + circle1.radius);
	var dy = (circle2.y + circle2.radius) - (circle1.y + circle1.radius);
	var distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

	if (Math.abs(distance) <= Math.abs(circle1.radius + circle2.radius)){
		collided = true;
	}

	return collided;	
}

// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function renderAll(listOfEntities) {
    for(i = 0; i< listOfEntities.length; i++){
		var entity = listOfEntities[i];
		entity.render();
	}
}

function updateAll(listOfEntities, dt) {
    for(i = 0; i< listOfEntities.length; i++){
		var entity = listOfEntities[i];
		if(dt==null || dt == undefined){
			entity.update();
		}
		else{
			entity.update(dt);
		}
	}
}

function renderHUD(){
	//Try one clearRect only here
	mouse.render();
	renderNumberOfEnemiesOnScreen();
	
	//Game Time
	daux.clearRect(4,auxcanvas.height-30, 40,15);
	daux.fillText(gameTime.toFixed(2), 5, auxcanvas.height-15);
	
	//Number of PlayerBullets
	daux.clearRect(49,auxcanvas.height-30, 40,15);
	daux.fillText(playerBullets.length, 50, auxcanvas.height-15);
	
}

function renderNumberOfEnemiesOnScreen(){
	var nl = 0;
	var nf = 0;
	for(i=0; i<enemies.length; i++){
		var enemy = enemies[i];
		if(enemy.type == 'LINE'){
			nl++;
		}
		else if(enemy.type == 'FOLLOW'){
			nf++;
		}
		else{
			alert("Error: on renderNumberOfEnemiesOnScreen");
		}
	}
	daux.clearRect(4,255,30,30);
	daux.fillText("L: " + nl, 5, 265);
	daux.fillText("F: " + nf, 5, 280);
}

window.onmousedown = disableclick;
function disableclick(event)
{
  if(event.button==2)
   {
     return false;    
   }
}

function aumenta(signal, camp){
	
	var te = document.getElementById("teleport");
	var sp = document.getElementById("speed");
	var st = document.getElementById("strength");
	
		if(signal == "-"){
			if(camp == "te"){
				if(te.value > 0){
					te.value--;
					player.teleportRange-=10;
				}
			}
			else if(camp == "sp"){
				if(sp.value > 0){
					sp.value--;
				}
				//to implement
			}
			else if(camp == "st"){
				if(st.value > 0){
					st.value--;
				}
				//to implement
			}
		}
		else if(signal == "+"){
			if(camp == "te"){
				te.value++;
				player.teleportRange+=10;
			}
			else if(camp == "sp"){
				sp.value++;
				//to implement
			}
			else if(camp == "st"){
				st.value++;
				//to implement
			}
		}
}

function refreshPage(){
	location.reload(true);
}
