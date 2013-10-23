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
