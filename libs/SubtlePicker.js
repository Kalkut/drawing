sand.define('drawing/SubtlePicker',['drawing/Buttons','drawing/Input','drawing/SlideBar','drawing/Square','drawing/colorfunc'],function (req) {
	var Buttons = req.Buttons;
	var Input = req.Input;
	var SlideBar = req.SlideBar;
	var Square = req.Square;

	var onimagesload = function (imgs,callback) {
		var l = imgs.length;
		var c = 0;
		for (var i = 0; i < l; i++){
			if(imgs[i].loaded) c++;
			else imgs[i].onload = function () {
				c++;
				if (c === l) callback();
			}
		}

		if (c === l) callback();
	}

	return Seed.extend({

		'+init' : function (classPrefix) {

			this.curColor = [0,0,0];
			this.savedColor = [0,0,0];

			this.canvas;
			this.bgcanvas;
			this.canvas = document.createElement('canvas');
			this.canvas.className = classPrefix + '-canvas'
			this.canvas.width = 300;
			this.canvas.height = 300;
			this.classPrefix = classPrefix;

			this.bgcanvas = document.createElement('canvas');
			this.bgcanvas.className = classPrefix + '-bgcanvas'
			this.bgcanvas.width = 300;
			this.bgcanvas.height = 300;

			this.canvas.style.position = "relative";
			this.bgcanvas.style.position = "absolute";
			this.bgcanvas.style.left = 0;
			this.canvas.style.zIndex = "1";


			this.bgcanvas.style.top = this.bgcanvas.style.left = 0;


			this.clicking = false;

			this.img = new Image();
			this.img.src = 'http://localhost:8000/colors.png';
			this.bgimg = new Image();
			this.bgimg.src = 'http://localhost:8000/grays.png';
			this.imgloaded = 0;

			this.cursor = new Image();
			this.cursor.src = 'http://localhost:8000/cursor.gif';
			this.cursor.border = "0"
			this.cursor.style.left =  100;
			this.cursor.style.top =  100;
			this.cursor.style.position = "absolute";
			this.cursor.style.zIndex = "2";

		},


		getPixelColor : function (x,y){
			var fg = this.canvas.getContext('2d').getImageData(x,y,1,1).data;
			var bg = this.bgcanvas.getContext('2d').getImageData(x,y,1,1).data;
			return [Math.floor(fg[0]*fg[3]/255 + bg[0]*(1-fg[3]/255))+1, Math.floor(fg[1]*fg[3]/255 + bg[1]*(1-fg[3]/255)), Math.floor(fg[2]*fg[3]/255 + bg[2]*(1-fg[3]/255))];
		},

		findColor : function (r,g,b){
			var color = req.colorfunc.rgba(r,g,b);
			var code = [r,g,b]
			console.log(color);
			var m = this.canvas.width;
			var n = this.canvas.height;
			var ctx = this.canvas.getContext('2d');
			ctx.clearRect(0,0,300,300);
			ctx.globalAlpha = color[3];
			ctx.drawImage(this.img,0,0,300,300);
			var test = 1;
			for (var x = 0; x < m ; x++ ){
				for(var y = 0; y < n; y++){
					var data = ctx.getImageData(x,y,1,1).data;
					if ((Math.abs(data[0] - color[0]) < 4) && (Math.abs(data[1] - color[1]) < 4) && (Math.abs(data[2] - color[2]) < 4)) {
						var pos = [x,y,color[3]];
						y = n;
						x = m;

						console.log(pos);
					}
				}

			}


			if(pos) {
				return pos; 
			}
			else console.log('color not found')

		},


	open : function (square, callback){

		var cb = function (){

			this.ctx = this.canvas.getContext('2d')
			this.ctx.drawImage(this.img, 0, 0,300,300);
			this.bgctx = this.bgcanvas.getContext('2d')
			this.bgctx.drawImage(this.bgimg, 0, 0,300,300);

			this.cursor.onmousedown = function (e) {
				e.preventDefault();
				this.clicking = true

			}.bind(this);
			this.cursor.onmouseup = function () {
				this.clicking = false;
			}.bind(this);

			this.canvas.onmouseup = function () {
				this.clicking = false;
			}.bind(this);

			this.canvas.onmousedown = function (e) {
				e.preventDefault();
				this.clicking = true;
				this.cursor.style.top = e.pageY - result.offsetTop - 7;
				this.cursor.style.left= e.pageX - result.offsetLeft - 7;
				this.curColor = this.getPixelColor(e.pageX - result.offsetLeft, e.pageY - result.offsetTop);
				this.slideBar.setSlideBarColor([this.curColor[0],this.curColor[1],this.curColor[2]]);
				preview.fire('preview');
			}.bind(this);

			this.canvas.mouseout = function (e) {
				this.clicking = false;
			}

			var hexIO = new Input (1,['hex'],this.classPrefix);

			var leftRight = function(e) {
				if (e.pageY - result.offsetTop  > 300) this.cursor.style.top = 293;
				else if(e.pageY - result.offsetTop  < 1) this.cursor.style.top = -6;
				else this.cursor.style.top = e.pageY - result.offsetTop -7
			}.bind(this);

		var upDown = function(e) {
			if (e.pageX - result.offsetLeft  > 300) this.cursor.style.left = 292;
			else if(e.pageX - result.offsetLeft < 1) this.cursor.style.left = -7;
			else this.cursor.style.left= e.pageX - result.offsetLeft - 7;
		}.bind(this);


		var moveHandler = function (e) { 
			if(this.clicking){
				if(e.pageX - result.offsetLeft < 1) {
					this.cursor.style.left = -7;
					leftRight(e);
				}
				else if(e.pageY - result.offsetTop  < 1) {
					this.cursor.style.top = -6;
					upDown(e);
				}
				else if (e.pageX - result.offsetLeft  > 300){ 
					this.cursor.style.left = 292;
					leftRight(e);
				}
				else if (e.pageY - result.offsetTop  > 300) {
					this.cursor.style.top = 293;
					upDown(e);
				}
				else {
					this.cursor.style.top = e.pageY - result.offsetTop -7;
					this.cursor.style.left= e.pageX - result.offsetLeft - 7;

				}

				// 7 du au décalage dnécessaire pour avoir la capture sur le cursor au lieu de la souris
				this.curColor = this.getPixelColor(parseInt(that.cursor.style.left.replace("px",""))+7 , parseInt(that.cursor.style.top.replace("px",""))-7 + 13);
				this.slideBar.setSlideBarColor([this.curColor[0],this.curColor[1],this.curColor[2]]);
				preview.fire('preview');
				hexIO.table[0].value = req.colorfunc.rgbToHex(this.curColor[0],this.curColor[1],this.curColor[2])
			}
		}.bind(this);

		this.cursor.onmousemove = this.canvas.onmousemove = moveHandler;

		document.body.addEventListener( "mousemove",moveHandler);
		document.body.addEventListener("mouseup", function () { this.clicking = false}.bind(this))


		var result = document.createElement('div');
		var cadre = document.createElement('div');

		result.style.border = '1px solid #000000';
		result.style.cssFloat =  result.style['float'] = "left";
		result.style.position = "relative";
		var that = this;

		var preview = new Square('preview');

		preview.on('preview',function () {
			preview.setSquareColor("rgb(" + that.curColor[0] + "," + that.curColor[1] + "," + that.curColor[2] + ")");
		});


		result.appendChild(this.cursor);
		result.appendChild(this.canvas);
		result.appendChild(this.bgcanvas);

		var b = new Buttons(2,['Valider','Annuler'],this.classPrefix);

		b.table[0].onclick = function (square) {
			event.stopPropagation();
			if(that.curColor[0]||that.curColor[1]||that.curColor[2]) that.fire('validate');
		}.curry(square);

		b.table[1].onclick = function (square) {
			event.stopPropagation();
			square.el.className = "idle";
			that.fire('cancel');
		}.curry(square);



		this.slideBar = new SlideBar(this.classPrefix);

		var fonc = function (that) {
			that.curColor = that.getPixelColor(parseInt(that.cursor.style.left.replace("px",""))+7, parseInt(that.cursor.style.top.replace("px",""))-7 +13);
			preview.fire('preview');

			that.ctx.clearRect(0,0,300,300);
			that.ctx.globalAlpha = 1-(that.slideBar.tpl.children[1].style.top.replace("px","")-298)/255;
			console.log(that.ctx.globalAlpha,that.slideBar.tpl.children[1].style.top.replace("px",""))        			
			that.ctx.drawImage(that.img, 0, 0,300,300);
		}.curry(that);


		var sub = that.slideBar.on('alpha', fonc);

		this.slideBar.on('find', function() { that.slideBar.setSlideBarColor([that.curColor[0],that.curColor[1],that.curColor[2]])})

		this.slideBar.tpl.children[0].addEventListener('mousemove', function () {
			if(this.slideBar.tpl.children[0].clicking === true) this.slideBar.fire('alpha');
		}.bind(this));

		this.slideBar.tpl.children[1].addEventListener('mousemove', function () {
			if(this.slideBar.tpl.children[0].clicking === true) this.slideBar.fire('alpha');
		}.bind(this));



		hexIO.table[0].onkeyup = function () {
			var rgbCode = req.colorfunc.hexToRgb(hexIO.table[0].value);

			var pos = this.findColor(rgbCode.r,rgbCode.g,rgbCode.b);
			this.cursor.style.left = pos[0] - 7 ;
			this.cursor.style.top = pos[1] - 7;
			this.curColor = this.getPixelColor(pos[0],pos[1]);
			this.slideBar.tpl.children[1].style.top = 1-Math.floor((pos[2]*255));
			this.slideBar.fire('find')
			preview.fire('preview')
		}.bind(this)

		result.appendChild(this.slideBar.tpl);
		result.appendChild(preview.div);
		result.appendChild(hexIO.el);
		result.appendChild(b.el);

		result.onclick = function() {
			event.stopPropagation();
		}

		this.curColor = this.getPixelColor(parseInt(this.cursor.style.left.replace("px",""))+7, parseInt(this.cursor.style.top.replace("px",""))-7 +13)
		this.slideBar.setSlideBarColor([this.curColor[0],this.curColor[1],this.curColor[2]]);
		preview.fire('preview');

		result.style.opacity = 1;
		result.className = this.classPrefix + "-subtlebox";
		this.subtleBox = result;

		callback();


	}.bind(this);

	onimagesload([this.img,this.bgimg,this.cursor],cb);		        	

}

});
});