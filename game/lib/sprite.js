/*
Copyright (c) 2012, James Long
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.

    Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in
    the documentation and/or other materials provided with the
    distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

See: http://jlongster.com/Making-Sprite-based-Games-with-Canvas
	 https://github.com/jlongster/canvas-game-bootstrap
*/

(function() {
	function Sprite(url, pos, size, speed, frames, dir, once) {
		this.url = url; // The path to the image for this sprite
		this.pos = pos; // The x,y coordinate in the image for this sprite
		this.size = size; // Size of the sprite (the keyframe)
		this.speed = typeof speed === 'number' ? speed : 0; // Speed in frames per second for animating
		this.frames = frames; // An array of frame indexes for animating
		this.dir = dir || 'horizontal'; // Which direction to move in the sprite map when animating
		this.once = once; // True to run the animation once, defaults to false
		this._index = 0;
		this.width = this.size[0];
		this.height = this.size[1];
	};

	Sprite.prototype = {
		update: function(dt) {
			this._index += this.speed*dt;
		},

		render: function(ctx) {
			var frame;

			if(this.speed > 0) {
				var max = this.frames.length;
				var idx = Math.floor(this._index);
				frame = this.frames[idx % max];

				if(this.once && idx >= max) {
					this.done = true;
					return;
				}
			}
			else {
				frame = 0;
			}


			var x = this.pos[0];
			var y = this.pos[1];

			if(this.dir == 'vertical') {
				y += frame * this.size[1];
			}
			else {
				x += frame * this.size[0];
			}

			ctx.drawImage(resources.get(this.url),
						x, y,
						this.size[0], this.size[1],
						0, 0,
						this.size[0], this.size[1]);
		}
	};

	window.Sprite = Sprite;
})();
