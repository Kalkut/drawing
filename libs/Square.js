sand.define('drawing/Square', ['drawing/colorfunc'],function () {
	String.prototype.splice = function( idx, rem, s ) {
		return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	};

	return Seed.extend({ 

		'+init' : function (classPrefix) {
			this.squareColor;
			this.el = document.createElement('div');
			this.el.className = classPrefix + "-square-idle";
			this.el.style.border = '1px solid #000000';
			this.el.style.cssFloat = "left";
			this.div = this.el;
			this.classPrefix = classPrefix;
			this.el.onclick = function(){
				if(this.squareColor){
					this.getSquareColor();
				}
			}.bind(this);

		},

		setSquareColor : function (color,shade) {
			this.el.style.backgroundColor = color;

			if (shade) this.squareColor = req.colorfunc.cssToRgbShades(color,shade);
			else this.squareColor = color;

			this.el.style.backgroundColor = this.squareColor;

		},

		clearSquare : function () {
			this.el.getContext('2d').clearRect(0,0,this.el.width,this.el.height)
			this.squareColor = null;
		},

		getSquareColor : function () {
			return this.squareColor;
		},

		selectSquare : function () {
			this.el.className = this.classPrefix + "-square-selected";
		        		//console.log("selected",this.el.className );
		        	},

		        	unselectSquare : function () {
		        		this.el.className = this.classPrefix + "-square-idle";
		        		//console.log("idle",this.el.className )
		        	}
		        });
});