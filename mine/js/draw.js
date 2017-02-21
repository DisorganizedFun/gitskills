//画布
var canvas ;
var context ;
//蒙版
var canvas_bak;
var context_bak;

var canvasWidth = 500;
var canvasHeight = 400;

var canvasTop;
var canvasLeft;

//画笔大小
var size = 1;
var color  = '#0000';
var pz="";
var type;

var startX;
var startY;
var graphType
var canDraw = false;	
//画图形
var draw_graph = function(type,obj){	
	//把蒙版放于画板上面
	graphType=type;
	$("#canvas_bak").css("z-index",1);
	//先画在蒙版上 再复制到画布上		
	chooseImg(obj);		
	context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	canDraw = false;	
	}
	

	//鼠标按下获取 开始xy开始画图
	var mousedown = function(e){
		context.strokeStyle= color;
		context_bak.strokeStyle= color;
		context_bak.lineWidth = size;
		startX = e.touches[0].clientX - canvasLeft;
		startY = e.touches[0].clientY - canvasTop;
		
		canDraw = true;			
		
		if(graphType == 'pencil'){
//			context_bak.beginPath();
//			context_bak.moveTo(startX ,startY );
			context.beginPath();
			context.moveTo(startX ,startY );
		}else if(graphType == 'rubber'){							
			context.clearRect(startX - size * 10 ,  startY - size * 10 , size * 20 , size * 20);				
		}	
	
	};	

	//鼠标离开 把蒙版canvas的图片生成到canvas中
	var mouseup = function(e){
//		canDraw = false;
//		var image = new Image();
//		if(graphType!='rubber'){	
//			
//			image.src = canvas_bak.toDataURL();
//			image.onload = function(){
//				context.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvasWidth , canvasHeight);
//				clearContext();
//				saveImageToAry();
//			}
//			var x = e.touches[0].clientX   - canvasLeft;
//			var y = e.touches[0].clientY  - canvasTop;	
//			context.beginPath();
//			context.moveTo(x ,y );
//			context.lineTo(x +2 ,y+2);
//			context.stroke();	
//		}
	};

	

	// 鼠标移动
	var  mousemove = function(e){
	
	
		var x = e.touches[0].clientX   - canvasLeft;
		var y = e.touches[0].clientY  - canvasTop;	
	   if(graphType == 'pencil'){
			
		   context.lineTo(e.touches[0].clientX   - canvasLeft ,e.touches[0].clientY  - canvasTop);

		   context.stroke();
		
		//圆 未画得时候 出现一个小圆
		}else if(graphType == 'rubber'){	
			context_bak.lineWidth = 1;
			clearContext();
			context_bak.beginPath();			
			context_bak.strokeStyle =  '#000000';						
			context_bak.moveTo(x - size * 10 ,  y - size * 10 );						
			context_bak.lineTo(x + size * 10  , y - size * 10 );
			context_bak.lineTo(x + size * 10  , y + size * 10 );
			context_bak.lineTo(x - size * 10  , y + size * 10 );
			context_bak.lineTo(x - size * 10  , y - size * 10 );	
			context_bak.stroke();		
			if(canDraw){							
				context.clearRect(x - size * 10 ,  y - size * 10 , size * 20 , size * 20);
										
			}			
		}
		e.preventDefault();
}

//清空层
var clearContext = function(type){
	if(!type){
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}else{
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}
}

