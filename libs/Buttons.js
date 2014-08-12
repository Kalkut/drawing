sand.define('drawing/Buttons', function () {
	
  		return Seed.extend({

		        	'+init' : function (nbButtons,buttonsNames,classPrefix) {
		        		this.el = document.createElement('div');
		        		
		        		this.table = [];
		        		for (var i = 0 ; i< nbButtons; i++){
		        			var button = document.createElement('button');
		        			button.innerHTML = buttonsNames[i];
		        			button.id = buttonsNames[i];
		        			button.className = classPrefix + "-buttons";
		        			this.table.push(button);
		        			this.el.appendChild(button);
		        		}
		        	}
		        })
  })