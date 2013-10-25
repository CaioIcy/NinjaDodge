/* *************************
 * "CLASS": Enemy
 * *************************/
 
var enemyTypes = [
	"LINE",
	"FOLLOW"
];

function Enemy(x, y, type){

	Entity.call(this, x, y);
	
	try{
		var validType = false;
		for(i = 0; i < enemyTypes.length; i++){
			/*
				VALIDATE THAT THE TYPE RECIEVED IS EQUAL TO SOME TYPE IN THE enemyTypes
			*/
		}
	} catch(e){
		alert(e);
		return null;
	}

}