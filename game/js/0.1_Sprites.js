/* *************************
 * Game Images
 * *************************/

resources.load([
    'res/Player.png',
    'res/FollowEnemy.png',
	'res/LineEnemy.png',
	'res/spritesheet.png'
]);
resources.onReady(initialize);

var enemyFollowSprite = new Image();
enemyFollowSprite.src = "res/FollowEnemy.png";

var enemyLineSprite = new Image();
enemyLineSprite.src = "res/LineEnemy.png";
