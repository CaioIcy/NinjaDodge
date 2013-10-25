/* *************************
 * Several useful functions
 * *************************/

function randomize(limit){
	return Math.floor(Math.random()*limit)+1;
}

function circleCollision(circle1, circle2){

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

function renderEntity(entity) {
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
