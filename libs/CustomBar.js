sand.define('drawing/CustomBar', ['drawing/Square'],function (r) {
	var Square = r.Square;
	return Seed.extend({

		'+init' : function (barSize,classPrefix,customColors){
			this.bar = document.createElement('div');
			this.bar.className = classPrefix + "-custombar";
			this.classPrefix = classPrefix;
			this.barSize = barSize;
			this.table = []
			if(customColors) this.colorsTable = customColors;
			else this.colorsTable = [];

			this.selectionIndex;
			this.openedSubtlePicker;
			this.barIndex = 0;


			var that = this;

			for (var i = 0,n = Math.max(this.barSize,this.colorsTable.length); i < n ; i++){
		        		var customSquare = new Square(classPrefix);//this.squareSize,
		        		if(this.colorsTable && this.colorsTable[i]) customSquare.setSquareColor(this.colorsTable[i]);
		        		else this.colorsTable.push('');
		        		this.table.push(customSquare);
		        		customSquare.div.id = i;
		        		customSquare.div.addEventListener('click', function (i) { 
		        			//console.log('selectioncustom' + i); 
		        			that.fire('selectioncustom',i);
		        			//console.log('open'+i); 
		        			that.fire('open',i);
		        		}.curry(i))
		        		this.bar.appendChild(customSquare.div);	
		        	}
		        },

		        isItFull : function () {
		        	var i = 0;
		        	var n = this.table.length;
		        	color = true;
		        	while(i < n && color) {
		        		this.table[i].squareColor ? color = true : color = false;
		        		i++;
		        	}

		        	return [color,i-1];
		        },

		        expand : function() {

		        	for (var i = this.table.length, n = this.table.length + this.barSize; i < n; i++){
		        		var that = this
		        		var customSquare = new Square(this.classPrefix);
		        		customSquare.div.id = i;
		        		this.table.push(customSquare);
		        		this.colorsTable.push('');
		        		customSquare.div.addEventListener('click', function (i) { 
		        			that.fire('selectioncustom',i);
		        			console.log('open'+i); 
		        			that.fire('open',i);
		        		}.curry(i))
		        		this.bar.appendChild(customSquare.div)
		        	}

		        	this.barIndex++;
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
		        	this.table[i].el.className = this.classPrefix + '-square-idle';
		        }
		        
		        
		      })
})