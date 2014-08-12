

sand.define('drawing/ColorPicker',['drawing/SubtlePicker','drawing/CustomBar','drawing/ColorGrid'], function (require) { 
  var SubtlePicker = require.SubtlePicker;
  var CustomBar = require.CustomBar;
  var ColorGrid = require.ColorGrid;

  return Seed.extend({
   '+init' : function(options) {
    this.colorGrid = new ColorGrid(options.baseColors,options.classPrefix);

    this.customButton = document.createElement('div');
    this.customButton.innerHTML = "Personnaliser... ";
    this.customButton.className = options.classPrefix + '-custombutton'

    this.customButton.onclick = function (barSize) {
     this.addColor(options.barSize);
   }.bind(this).curry(options.barSize);

   this.classPrefix = options.classPrefix;

    		this.currentColor; // Couleur séléctionnée

    		
    		this.el = document.createElement('div');// Attribut à ajouter au DOM
    		
    		this.el.className = options.classPrefix + "-colorpicker"

    		this.el.appendChild(this.colorGrid.grid);
    		
    		if(options.custom){

          if(options.custom.length) {
           this.customColors = options.custom;
    			this.customBar = new CustomBar(options.barSize,options.classPrefix,this.customColors); // barSize pixels de squareSize chaqu'un dans un tableau accessible dans customBar.table
    		}else this.customBar = new CustomBar(options.barSize,options.classPrefix);
    		this.customGroup = document.createElement('div'); // Groupe formé par le bouton personnaliser et la customBar
    		this.customGroup.className = options.classPrefix + "-customgroup"
    		this.customGroup.appendChild(this.customButton);
    		this.customGroup.appendChild(this.customBar.bar);

    		
    		this.el.appendChild(this.customGroup);

    		this.customBar.on('selectioncustom', function (i) {
          this.colorGrid.disableSquare(this.colorGrid.isASquareOn());
          if(!this.customBar.openedSubtlePicker && this.customBar.openedSubtlePicker != 0){
            if(this.customBar.selectionIndex||this.customBar.selectionIndex === 0) this.customBar.table[this.customBar.selectionIndex].unselectSquare();
            this.customBar.table[i].selectSquare();
            this.currentColor =  this.customBar.table[i].squareColor;
            this.customBar.selectionIndex = i;
            this.fire('getColor',this.currentColor);
          }
        }.bind(this))

       this.customBar.on('open', function(i){ this.atOpen(i)}.bind(this) );

       this.on('saveCustom',function () { this.customColors =  this.customBar.colorsTable}.bind(this) );


     }


     this.colorGrid.on('selectiongrid', function (i) { 
      if(this.customBar) this.customBar.disableSquare(this.customBar.isASquareOn());
      if(this.colorGrid.selectionIndex||this.colorGrid.selectionIndex === 0) this.colorGrid.table[this.colorGrid.selectionIndex].unselectSquare();
      this.colorGrid.table[i].selectSquare();
      this.currentColor =  this.colorGrid.table[i].squareColor;
      this.colorGrid.selectionIndex = i;
      console.log(this.c)
      this.fire('getColor',this.currentColor);
    }.bind(this))	

     this.on('getColor', function() {
       this.customButton.style.backgroundColor = this.currentColor;;
     }.bind(this));


   },

   addColor : function(barSize) {
    var i = 0, n = this.customBar.table.length;
    var full = true;


    var couple = this.customBar.isItFull()

    if (!couple[0]){
     this.customBar.fire('open',couple[1]);
   }
   else{
     this.customBar.expand()
     this.customBar.fire('open',n);
   }
 },

 atOpen : function (i) {
  if(!this.customBar.openedSubtlePicker && this.customBar.openedSubtlePicker != 0 && !this.customBar.table[i].squareColor) {
   var sp = new SubtlePicker(this.classPrefix);

   sp.open(this.customBar.table[i], function(i) {
    this.customBar.table[i].div.appendChild(sp.subtleBox);
    this.customBar.openedSubtlePicker = i;
  }.bind(this).curry(i));

   sp.on('cancel', function(i){
    sp.subtleBox.parentNode.removeChild(sp.subtleBox)
    this.customBar.openedSubtlePicker = null;
  }.bind(this).curry(i));

   sp.on('validate', function (i){
    this.customBar.table[i].setSquareColor("rgb(" + sp.curColor[0] + "," + sp.curColor[1] + "," + sp.curColor[2] + ")");
    this.customBar.colorsTable[i] = "rgb(" + sp.curColor[0] + "," + sp.curColor[1] + "," + sp.curColor[2] + ")";
    this.currentColor = this.customBar.table[i].squareColor;
    sp.subtleBox.parentNode.removeChild(sp.subtleBox);
    this.customBar.openedSubtlePicker = null;
    this.fire('getColor',this.currentColor);
    this.fire('saveCustom');
  }.bind(this).curry(i))

 }
}


});
})