var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var radius = 50;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var isShow = false;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var image = new Image();
image.src = 'psb.jpg';
var clippingRegion = {x:-1,y:-1,r:radius}
image.onload = function(e){
	$("#blur-div").css("width",canvasWidth+"px");
	$("#blur-div").css("height",canvasHeight+"px");
	$("blur-image").css("width",canvasWidth+"px");
	$("blur-image").css("height",canvasWidth+"px");
	initCanvas();
}

function initCanvas() {
	clippingRegion = {x:Math.random()*(canvas.width-2*radius)+50,
						y:Math.random()*(canvas.height-2*radius)+50,
						r:radius};
	console.log(isShow)
	console.log(clippingRegion)
	if(isShow){
		clippingRegion.r = 1000;
		var animation = setInterval(
		function(){
			clippingRegion.r = clippingRegion.r - 20;
			if( clippingRegion.r < 50){
				clearInterval(animation);
				clippingRegion.r = 50;
			}
			draw(image,clippingRegion)
		},30)
	}else{
		draw( image,clippingRegion )
	}
}

function draw(image, clippingRegion){
	context.clearRect(0, 0,canvas.width, canvas.height)
	context.save();
	setClippingRegion(clippingRegion);
	context.drawImage(image,0,0,canvas.width,canvas.height)
	context.restore();
}

function setClippingRegion (clippingRegion){
	context.beginPath();
	context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false)
	context.clip();
}

function reset() {
	initCanvas();
	isShow = false;
}

function show() {
	var animation = setInterval(
		function(){
			clippingRegion.r += 20;
			if( clippingRegion.r > 1000){
				clearInterval(animation);
			}
			draw(image,clippingRegion)
		},30
	)
	isShow = true;
}