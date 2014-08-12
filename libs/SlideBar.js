sand.define('drawing/SlideBar',function () {
  		return Seed.extend({

		        	'+init' : function(classPrefix) { 
		        		this.classPrefix = classPrefix;
		        		//document.body.addEventListener("mouseup", function(){ this.tpl.children[0].clicking = false}.bind(this))
		        		this.tpl.children[0].className = this.classPrefix + "-slidebar";

		        	},
		        	

		        	tpl : toDOM({


		        		children : [
		        		{
			        		tag : 'canvas.',

			        		attr : {
			        			height : 255,
			        			width : 22,
			        			clicking : false
			        		},

			        		style : {
			        			border : '1px solid #000000'
			        		},

			        		events : {
			        			
			        			mousedown : function (e) {
			        				e.preventDefault();
			        				event.stopPropagation();
			        				this.clicking = true;
			        				this.nextSibling.style.top = e.pageY - this.parentNode.parentNode.offsetTop;

			        			},

			        			mousemove : function (e) {
			        				if(this.clicking) {
			        						if(e.pageY - this.parentNode.parentNode.offsetTop - 6 > 553) this.nextSibling.style.top = 553;
			        						else if (e.pageY - this.parentNode.parentNode.offsetTop - 6 < 298 ) this.nextSibling.style.top = 298;
			        						else this.nextSibling.style.top = e.pageY - this.parentNode.parentNode.offsetTop - 6;
			        						//console.log('canvas',e.pageY - this.parentNode.parentNode.offsetTop,this.nextSibling.style.top);
			        				}
			        				
			        			},

			        			mouseup : function () {
			        				this.clicking = false;
			        			}
      			
			        		}
		        		},




			        	{
			        		tag : 'img',

			        		attr : {
			        			src : 'http://localhost:8000/arrows.gif'
			        		},

			        		style : {
			        			position : "absolute",
			        			top : 298,
			        			left : -8
			        		},

			        		events : {
			        			
			        			mousedown : function (e) {
			        				e.preventDefault();
			        				this.previousSibling.clicking = true;
			        			},

			        			mousemove : function (e) {
			        				e.preventDefault();
			        				if(this.previousSibling.clicking) {
			        					if(e.pageY - this.previousSibling.parentNode.parentNode.offsetTop - 6 > 553) this.style.top = 553;
			        					else if (e.pageY - this.previousSibling.parentNode.parentNode.offsetTop - 6 < 298) this.style.top = 298;
			        					else this.style.top = e.pageY - this.previousSibling.parentNode.parentNode.offsetTop - 6;
			        					//console.log('img', e.pageY - this.previousSibling.parentNode.parentNode.offsetTop,this.style.top )
			        				}
			        			},

			        			mouseup : function () {
			        				this.previousSibling.clicking = false;
			        			}			        			
			        		}			        		
			        	}
		        		]
		        	}),

		        	setSlideBarColor : function(color) {
		        		var ctx = this.tpl.children[0].getContext('2d');
		        		var grd=ctx.createLinearGradient(0,0,0,255);
						ctx.clearRect(0,0,30,255);
						grd.addColorStop(0,"rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + "1)");
						grd.addColorStop(1,"rgba(" + color[0] + "," + color[1] + "," + color[2] +  "," +  "0)");

						ctx.fillStyle=grd;
						ctx.fillRect(0,0,30,255);


		        	},

		        	})
})