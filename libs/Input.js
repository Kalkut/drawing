sand.define('drawing/Input',function () {
	return Seed.extend({

               '+init' : function (nbInput,inputNames,classPrefix,type) {
                      this.el = document.createElement('div');
                      this.table = [];
                      for (var i = 0; i < nbInput; i++){
                            var input = document.createElement('input');
                            var div = document.createElement('div');
                            input.className = classPrefix + "-input";
                            div.innerHTML = inputNames[i];
                            if(type) input.type = type;
                            input.id = inputNames[i];
                            this.table.push(input)
                            div.appendChild(input);
                            this.el.appendChild(div);
                    }

            }
    })
});