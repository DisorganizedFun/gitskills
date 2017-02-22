<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<script src="/js/rem750.js" type="text/javascript" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="/album/album.css"/>
<title>照片库</title>
<div class="content">
	<div class="line-scale-pulse-out">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
	<div class="noPhoto">
		<img src="/album/icon-waiting.png"/>
		<p>等待摄影师上传宝宝照片...</p>
	</div>
	<div class="moveWrap">
		<div class="albumWrap">
			<div class="photoWrap">
				<h1></h1>
			</div>
			<p class="footText">时光匆匆，让爱停留</p>
		</div>
		<div class="albumMore">
			<div class="top">
				<img src="/album/arrow.png" alt="" />
				<p></p>
			</div>
			<div class="camera cameraMore" style="padding-left:0;">
				<img src="/album/smile.png"/>
				<p>摄影师</p>
				<div class="point"></div>
				<p class="name"></p>
				<p class="time"><p>
		    </div>
		    <div class="allImgWrap"></div>
		    <div class="line-scale-pulse-out2">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
</div>

<script src="//apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script src="//apps.bdimg.com/libs/fastclick/1.0.0/fastclick.min.js" type="text/javascript" charset="utf-8"></script>

<script src="/album/album.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
$(function(){
	var page = 0;
	getlist(page);
	$('.albumWrap').scroll(function(){
		_this = $(this)[0];
		if(!scrollBol)return false;
		var st = _this.scrollTop,
			sh = _this.scrollHeight;
		if(st>=sh-winH){
			scrollBol = false;
			page++;
			getlist(page);
		};
	})
	function getlist(page){
		var user_id = <?php echo $user_id; ?>;
		if(page>0){
			$('.line-scale-pulse-out').insertBefore($('.footText')).css({
				'position':'relative','top':0,'margin-bottom':'0.14rem'
			}).show();
		}
		$.ajax({
			type: "POST",
			url: "/api/proxy/",
			dataType: 'json',
			data : {
				method:"post",
				url:"album/getlist/",
				args:'{"type":"private","page":'+page+'}',
				auth: user_id
			},
			error: function(){},
			success: function(res){
			 	console.log(res);
			 	if(page==0 && (res.status == -1 || res.data.length==0 ) ){
			 		$('.noPhoto').show();
			 		$('.line-scale-pulse-out').hide();
			 		return;
			 	}else if(res.data.length==0){
			 		$('.line-scale-pulse-out').hide();
			 		return;
			 	}
				var imgArr = [];
				for(var i=0;i<res.data.length;i++){
					for(var j=0;j<res.data[i].list.length;j++){
						for(var y=0;y<Math.min(6,res.data[i].list[j].imgs.length);y++){
							imgArr.push(res.data[i].list[j].imgs[y].url);
						}
					}
				}
				imgArr = imgArr.map(function(val){
					return val+smallImgSuffix;
				})
				var obj = {
					imgs: imgArr,
					allLoaded: function(imgArr){
						result(res);
						$('.line-scale-pulse-out').hide();
						$('.footText').show();
						scrollBol = true;
					}
				};
				loadingFun(obj);
			}
		});
	}
});

</script>
