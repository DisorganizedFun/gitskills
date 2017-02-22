window.loadingFun = function(obj){
	if(obj.imgs &&  obj.imgs instanceof Array &&obj.imgs.length>0){
		var _index = 0;
		var _imgArr = [];
		for(var i = 0;i<obj.imgs.length;i++){
			var img = new Image();
			img.src = obj.imgs[i];
			_imgArr.push(img);
			img.onload =function(){
				_index++;
				if(obj.loading && typeof obj.loading =='function'){
					obj.loading(_index);
				}
				if(_index == obj.imgs.length){
					if(obj.allLoaded && typeof obj.allLoaded =='function'){
						obj.allLoaded(_index);
					}
				}else if(_index%20 == 0){
					if(obj.loaded && typeof obj.loaded =='function'){
						obj.loaded(_imgArr);
					}
				}
			}
		}
	}
};
window.loadingFun2 = function(obj){
	if(obj.imgs &&  obj.imgs instanceof Array &&obj.imgs.length>0){
		var _index = 0;
		var _imgArr = [];
		for(var i = 0;i<obj.imgs.length;i++){
			var img = new Image();
			img.src = obj.imgs[i];
			_imgArr.push(img);
			img.onload =function(){
				_index++;
				if(obj.loading && typeof obj.loading =='function'){
					obj.loading(_index);
				}
			}
		}
	}
};
document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);  
}, false); 
var albumWrap = $('.albumWrap'),
	albumMore = $('.albumMore'),
	winH = document.body.clientHeight,
	albumWrapH = allImgWrapH =0,
	// smallImgSuffix = '?imageView2/1/w/200/h/200/interlace/1/q/100',
	smallImgSuffix = '?imageView2/5/w/200/h/200/interlace/1/q/85',
	// bigImgSuffix = '?imageView2/2/w/1200/h/1200/interlace/1/q/100';
	bigImgSuffix = '';
	
albumWrap.css('height',winH);
albumMore.css('height',winH);

albumWrap.on('click','.less',function(){
	var _imgList = $(this).parent().attr('imgList').split(',').map(function(val){
		return val+bigImgSuffix;
	})
	WeixinJSBridge.invoke('imagePreview', {  
        'current': $(this).attr('imgSrc')+'',  
        'urls': _imgList
    },function(){
    		console.log('callback')
    });
})
albumWrap.on('click','.more,.mask',function(){
// albumWrap.on('touchstart','.more,.mask',function(){
	pushHistory();
	$('.line-scale-pulse-out2').show();
	var cameraMore = $('.cameraMore'),
		albumWrap = $('.albumWrap'),
		currentAlbum = $(this).parent().next(),
		imgList =  $(this).parent().attr('imgList').split(','),
		longDate = $(this).parent().siblings('.date').attr('longDate').split('-'),
		allImg="";
	longDate = longDate[0]+'年'+longDate[1]+'月'+longDate[2]+'日';
	cameraMore.find('.name').html(currentAlbum.find('.name').html()).end().find('.time').html(currentAlbum.find('.time').html());
	$('.top>p').html(longDate);
	var smallImgList = imgList.map(function(val){
		return val+smallImgSuffix;
	})
//	for(var i=0;i<imgList.length;i++){
//		allImg += '<div imgSrc="'+imgList[i]+'" style="background-image:url('+smallImgList[i]+');"/></div>';
//	}
	var bigImgList = imgList.map(function(val){
		return val+bigImgSuffix;
	})
	var obj2 = {
		imgs: smallImgList,
		loading:function(index){
			console.log(index+'small');
			allImg += '<div imgSrc="'+imgList[index-1]+'" style="background-image:url('+smallImgList[index-1]+');"/></div>';
		},
		loaded: function(){
			$('.allImgWrap').attr('imgList',bigImgList).append(allImg);
			allImg = "";
		},
		allLoaded:function(){
			$('.allImgWrap').attr('imgList',bigImgList).append(allImg);
			$('.line-scale-pulse-out2').hide();
			allImg = "";
		}
	};
	var obj3 = {
		imgs: bigImgList,
		loading:function(index){
			console.log(index+'big');
		}
	};
	// loadingFun2(obj3);
	loadingFun(obj2);
	
	$('.allImgWrap').empty();
	$('.moveWrap').css({
		'transform':'translateX(-7.5rem)',
		'-webkit-transform':'translateX(-7.5rem)'
	})
	albumWrap.css('opacity',0);
	$('.albumMore').css('opacity',1);
})
$('.allImgWrap').on('click','div',function(){
	WeixinJSBridge.invoke('imagePreview', {  
        'current': $(this).attr('imgSrc')+bigImgSuffix,  
        'urls': $(this).parent().attr('imgList').split(',')
    });  
});
//$('.top>img').click(function(){
//	$('.moveWrap').css({
//		'transform':'translateX(0)',
//		'-webkit-transform':'translateX(0)'
//	})
//	albumWrap.css('opacity',1);
//	albumMore.css('opacity',0);
//})
window.addEventListener("popstate", function(e) { 
    $('.moveWrap').css({
		'transform':'translateX(0)',
		'-webkit-transform':'translateX(0)'
	})
	albumWrap.css('opacity',1);
	albumMore.css('opacity',0);
}, false);
function result(res){
	var albums="";
	for(var i=0;i<res.data.length;i++){
		with(res.data[i]){
			albums='\
				<div class="albums">\
					<div class="date" longDate="'+date+'">\
						<p class="yearMonth"><span>'+year+'</span>.<span>'+month+'</span></p>\
						<p class="day">'+day+'</p>\
					</div>\
				</div>';
			var imgWrap=cameraInfo="";
			for(var j=0;j<list.length;j++){
				with(list[j]){
					imgWraps='<div class="imgWrap"></div>';
					cameraInfo=	'\
							<div class="camera">\
									<img src="/album/smile.png"/>\
									<p>摄影师</p>\
									<div class="point"></div>\
									<p class="name">'+grapher_name+'</p>\
									<p class="time">'+hours+'<p>\
							 </div>';
					var img="",imgNum = list[j].imgs.length,imgsArr=[];
					if(imgNum>6){
						for(var y=0;y<6;y++){
							var imgsUrl = list[j].imgs[y].url;
							if(y==5){
								img += '<div class="photo more" style="background-image:url('+imgsUrl+smallImgSuffix+');position: relative;">\
											<div class="mask">\
												<p class="imgCount">'+img_count+'</p><p class="textZhang">张</p>\
											</div>\
										</div>';
							}else{
								img += '<div class="photo more" style="background-image:url('+imgsUrl+smallImgSuffix+');"></div>';
							}
						}
						for(var y=0;y<imgNum;y++){
							var imgsUrl = list[j].imgs[y].url;
							imgsArr.push(imgsUrl);
						}
					}else{
						for(var y=0;y<list[j].imgs.length;y++){
							var imgsUrl = list[j].imgs[y].url;
							imgsArr.push(imgsUrl);
							img += '<div class="photo less" imgSrc="'+imgsUrl+'" style="background-image:url('+imgsUrl+smallImgSuffix+');"></div>';
						}
					}
					imgWraps = $(imgWraps);
					imgWraps.attr('imgList',imgsArr);
					imgWraps.append(img);
				}
				albums = $(albums);
				albums.append(imgWraps).append(cameraInfo);
			}
		}
		$('.photoWrap').append(albums);
	}
	$('.moveWrap').css({
		'transition': 'all 0.6s ease-in-out',
		'-webkit-transition':' all 0.6s ease-in-out'
	})
	$('.albumWrap,.albumMore').css({
		'transition': 'all 0.5s ease-in-out',
		'-webkit-transition':' all 0.5s ease-in-out'
	})
}
function pushHistory() {
    var state = { 
        title: "title", 
        url: "#"
    };
    window.history.pushState(state, "title", "#"); 
} 