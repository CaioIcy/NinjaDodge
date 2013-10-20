function update(){
	keyboard.updateKeyInput();
	player.update();
}

function render(){
	d.clearRect(0, 0, canvas.width, canvas.height);
	player.render();
}

window.setInterval("update()",60/1000);
window.setInterval("render()",1);
