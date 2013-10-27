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

function renderEntity(entity){
	d.save();
	d.translate(entity.x, entity.y);
	entity.sprite.render(d);
	d.restore();
}

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

function drawBar(posx, posy, size, width, state, maxState, horizontal, colorInside){
	if(state<0) state = 0;
	if(maxState<1) maxState = 1;	
	if(state>maxState) alert("drawBar -> state shouldn't be bigger than maxState");
	
	var fill = (state*size)/maxState;

	d.fillStyle="black";
	if(horizontal){
		d.fillRect(posx, posy-1, size+2, width);
		d.fillStyle = colorInside;
		d.fillRect(posx+1, posy, fill, width-2);
	}
	else if(!horizontal){
		d.fillRect(posx, posy-1, width, size+2);
		d.fillStyle = colorInside;
		d.fillRect(posx+1, posy+(size-fill), width-2, fill);
	}
	d.fillStyle="black";
}

function checkEnemiesCollision(object){
	for(var i = 0; i<enemies.length; i++){
		var enemy = enemies[i];
		if( circleCollision(object, enemy) ){
			enemy.destroy();
			createExplosion(enemy.x, enemy.y);
		}
	}
}
function changeValues(signal, camp){
	
	var teleportCamp = document.getElementById("teleportRange");
	var speedCamp = document.getElementById("speed");
	var healthCamp = document.getElementById("health");
	var maxHealthCamp = document.getElementById("maxhealth");
	
		if(signal == '-'){
			if(camp == 'teleportRange'){
				if(player.teleportRange > 10){
					player.teleportRange -= 10;
				}
			}
			else if(camp == 'speed'){
				if(player.speed > 5){
					player.speed -= 5;
				}
			}
			else if(camp == 'health'){
				if(player.health > 1){
					player.health--;
				}
			}
			else if(camp == 'maxHealth'){
				if(player.currentMaxHealth > player.health){
					player.currentMaxHealth--;
				}
			}
		}
		else if(signal == '+'){
			if(camp == 'teleportRange'){
				player.teleportRange += 10;
			}
			else if(camp == 'speed'){
				player.speed += 5;
			}
			else if(camp == 'health'){
				if(player.health < player.currentMaxHealth){
					player.health++;
				}
			}
			else if(camp == 'maxHealth'){
				player.currentMaxHealth++;
			}
		}
		else{
			alert("changeValues() -> wrong signal [" + signal + "]");
		}
		
}

function refreshPage(){
	location.reload(true);
}

function setHtmlValues(){
	var speed = document.getElementById("speed");
	var teleport = document.getElementById("teleportRange");
	var health = document.getElementById("health");
	var maxHealth = document.getElementById("maxhealth");
	speed.value = player.speed;
	teleport.value = player.teleportRange;
	health.value = player.health;
	maxHealth.value = player.currentMaxHealth;
}
