sand.define('drawing/ColorGrid', ['drawing/Square'], function (req) {
	
	var Square = req.Square;
	return Seed.extend({
		
		'+init' : function (baseColor,classPrefix,nbshades) {
			this.baseColor = baseColor;
			this.grid = document.createElement('div');
			this.grid.className = classPrefix + "-colorgrid";
			this.table = []
			this.classPrefix = classPrefix;
			this.selectionIndex;
			var divColorShades = [];
			var that = this;

			for (var i = 0, n = this.baseColor.length; i<n; i++){
				divColorShades.push(document.createElement('div'));
				if (nbshades){
					for(var j = 0; j<nbshades; j++){
		        				var gridSquare = new Square(classPrefix);//size,
		        				gridSquare.setSquareColor(this.baseColor[i],1-(0.3 + j*0.7/nbshades));	
		        				this.table.push(gridSquare);
		        				var x = i*nbshades+j
		        				gridSquare.el.addEventListener('click', function (x) {  
		        					that.fire('selectiongrid',x)
		        					that.selectionIndex = x;
		        				}.curry(x))
		        				divColorShades[i].appendChild(gridSquare.el);
		        			}
		        		}else {
		        			var gridSquare = new Square(classPrefix);//size,
		        			gridSquare.setSquareColor(this.baseColor[i]);	
		        			this.table.push(gridSquare);
		        			gridSquare.el.addEventListener('click', function (i) {  
		        				that.fire('selectiongrid',i)
		        				that.selectionIndex = i;
		        			}.curry(i))
		        			divColorShades[i].appendChild(gridSquare.el);
		        		}

		        		this.grid.appendChild(divColorShades[i]);
		        	}
		        },

		        isASquareOn : function() {
		        	var n = this.table.length;
		        	var i = 0;

		        	while(i < n && this.table[i].el.className === this.classPrefix + '-square-idle'){
		        		i++
		        	}

		        	if(i === n) return n-1;
		        	else return i;
		        },

		        disableSquare : function(i) {
		        	this.table[i].el.className = this.classPrefix + "-square-idle"
		        }


		      })
});