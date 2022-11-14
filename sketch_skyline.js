var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = 200;
var ctx = canvas.getContext("2d");
var canvasW = window.innerWidth;
document.addEventListener("resize", function(){
	window.canvasW = window.innerWidth;
});
var Frame = window.requestAnimationFrame 
			|| window.msRequestAnimationFrame 
			|| window.mozRequestAnimationFrame 
			|| window.webkitRequestAnimationFrame;
var Layer = function(){
	this.speed = 0.5 - World.layers.length*0.2;
	this.height = [];
	this.length = [];
	this.x = [];
	this.N = -1; //because 0 in N would point at the 0 cell in every array
	this.distance = [];
	this.perspective = 0;
};
var World = {
	layers : [],
	layersColors : ['#2C292E', '#6C85C6', '#8C9FD8','#D3D5ED','#AAB6E2'],
	nLayers : 3,
	refresh: function(){
		for(j=0; j<this.nLayers; j++){
			for( var i = 0; i<=this.layers[j].N; i++){
				this.layers[j].x[i]-= this.layers[j].speed;
			};
			while((this.layers[j].x[0]+this.layers[j].length[0]-this.layers[j].distance[0])<=0){ this.deleteFirst(this.layers[j]);};
			while((this.layers[j].x[this.layers[j].N]+this.layers[j].length[this.layers[j].N])<=canvasW){ this.createNew(this.layers[j]);};
		};
		this.render();
	},
	createNew: function(layer){
		if (layer.N >=0){
			layer.x.push(layer.x[layer.N]+layer.length[layer.N]-layer.distance[layer.N]);
			var type = Math.random();
			if (type<=.5*(layer.perspective+1)){ type = 1;}
				else if (type <=.6*(layer.perspective+1)) {type= 2;}
				else {type = 3;};

			switch (type){
				case 1: layer.length.push(15+ Math.floor( Math.random()*20));
						layer.height.push(Math.floor(15*(layer.perspective-1)+Math.random()*150));
						layer.distance.push(0); 
						break;
				case 2: layer.length.push(5+ Math.floor( Math.random()*10));
						layer.height.push(0);
						layer.distance.push(0);
						break;
				case 3:	layer.length.push(15+ Math.floor( Math.random()*10));
						layer.distance.push(Math.floor(Math.random()*(layer.length[layer.N+1]-15)));
						layer.height.push(15*(layer.perspective-1)+Math.floor(Math.random()*150));
						break;
			};
		}
		else{
			layer.x.push(0);
			var type = Math.random();
			if (type<=.8){ type = 1;}else {type = 2};
			switch (type){
				case 1: layer.length.push(15+ Math.floor( Math.random()*10));
						layer.height.push(15*(layer.perspective-1)+Math.floor(Math.random()*150));
						layer.distance.push(0); 
						break;
				case 2: layer.length.push(5+ Math.floor( Math.random()*8));
						layer.height.push(0);
						layer.distance.push(0);
						break;
			};
		};
		layer.N++;
	},
	deleteFirst: function( layer){
		layer.height.splice(0,1);
		layer.x.splice(0,1);
		layer.length.splice(0,1);
		layer.distance.splice(0,1);
		--layer.N;
	},
	init: function(){
		Godzilla.image.src = "images/KingKong.gif";
		for(var i = 0; i<this.nLayers; i++){
			this.layers.push(new Layer());
			this.layers[i].perspective = i;
			this.createNew(this.layers[i]); 
			while(this.layers[i].x[this.layers[i].N]+this.layers[i].length[this.layers[i].N]<=canvasW){this.createNew(this.layers[i])};
		};
	},
	render : function(){
		ctx.clearRect(0,0,canvasW,200);
		var grd=ctx.createLinearGradient(0,0,canvasW,200);
		grd.addColorStop(0,"#20397E");
		grd.addColorStop(.33,"#A2776F");
		grd.addColorStop(.67,"#C88A64");
		grd.addColorStop(1,"#445EA2");

		ctx.fillStyle=grd;
		ctx.fillRect(0,0,canvasW,200);
		//below are buildings
		for(var j=this.nLayers-1; j>=0;j--){
			ctx.strokeStyle = this.layersColors[j];
			ctx.shadowBlur=0;
			ctx.fillStyle = this.layersColors[j];
			ctx.beginPath();
			ctx.moveTo(0, 201  );
			for( var i=0; i<=this.layers[j].N; i++){
				ctx.lineTo(this.layers[j].x[i],200-this.layers[j].height[i]);
				ctx.lineTo(this.layers[j].x[i]+this.layers[j].length[i]-this.layers[j].distance[i], 200-this.layers[j].height[i]);
			};
			ctx.lineTo(canvasW,201);
			ctx.stroke();
			ctx.fill();
			ctx.closePath();
			//if (j==this.nLayers-2){Godzilla.render(20,200-86,75,86);};
		};
		
	},

}

var Godzilla = {
	//size = 86/75
	image : new Image(),
	frame : 0,
	nframes : 11,
	currentframe: 0,
	render : function(dx,dy,dw,dh){
		ctx.drawImage(this.image,15+(this.frame)*88, 126, 88, 54, dx, dy, dw, dh);
		this.currentframe++;
		if (this.currentframe == 15)
			{	this.currentframe = 0;
				this.frame++;
				this.frame = this.frame % this.nframes;
			}
}
	
}

World.init();

function animate(){
	World.refresh();
	
	Frame(animate);
}

Frame(animate);