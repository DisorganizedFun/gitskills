<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<link rel="stylesheet" type="text/css" href="/order/order.css?2"/>
<title id="title">我的订单</title>
<script>
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "https://hm.baidu.com/hm.js?b10615715c9cdabbb02df45088f8edfa";
	  var s = document.getElementsByTagName("script")[0];
	  s.parentNode.insertBefore(hm, s);
	})();
</script>

<div class="main">
	<div class="line-scale-pulse-out">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</div>
<div class="accessWrap">
	<div class="top">
		<img class="closeBtn" src="/order/arrow.png"/>
		<p></p>
	</div>
	<div class="accessContent">
		<div class="server">
			<p class="accessName">服务</p>
			<div class="starWrap">
				<div class="star1Wrap">
					<img class="star1" src="/order/face1.png"/>
					<img class="star1" src="/order/face1.png"/>
					<img class="star1" src="/order/face1.png"/>
					<img class="star1" src="/order/face1.png"/>
					<img class="star1" src="/order/face1.png"/>
				</div>
				<div class="star2Wrap">
					<img class="star2" src="/order/face2.png"/>
					<img class="star2" src="/order/face2.png"/>
					<img class="star2" src="/order/face2.png"/>
					<img class="star2" src="/order/face2.png"/>
					<img class="star2" src="/order/face2.png"/>
				</div>
			</div>
			<p class="accessLevel">一般般，加油</p>
		</div>
		<div class="photo">
			<p class="accessName">照片</p>
			<div class="starWrap">
				<div class="star1Wrap">
					<img class="star1" src="/order/face1.png"/>
					<img class="star1" src="/order/face1.png"/>
					<img class="star1" src="/order/face1.png"/>
					<img class="star1" src="/order/face1.png"/>
					<img class="star1" src="/order/face1.png"/>
				</div>
				<div class="star2Wrap">
					<img class="star2" src="/order/face2.png"/>
					<img class="star2" src="/order/face2.png"/>
					<img class="star2" src="/order/face2.png"/>
					<img class="star2" src="/order/face2.png"/>
					<img class="star2" src="/order/face2.png"/>
				</div>
			</div>
			<p class="accessLevel">非常满意</p>
		</div>
		<textarea class="accessText" placeholder="写点吧"></textarea>
		<div class="submitBtn">提交</div>
	</div>
	<div class="accessBack"></div>
</div>


<script src="//apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script src="http://apps.bdimg.com/libs/fastclick/1.0.0/fastclick.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/rem.js" type="text/javascript" charset="utf-8"></script>
<script src="/order/order.js?692" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
function getlist(page){
	user_id = <?php echo $user_id; ?>;
	$.ajax({
		type: "POST",
		url: "/api/proxy/",
		dataType: 'json',
		data : {
			method:"post",
			url:"user/order/",
			args:'{"page":'+page+'}',
			auth: user_id
		},
		error: function(){},
		success: function(res){
			console.log(res)
			if(res.data.length==0){
				$('.line-scale-pulse-out').hide();
				return;
			}
			results(res);
			scrollBol = true;
			$('.line-scale-pulse-out').hide();
		}
	});
}
$(function(){
	var page = 0,scrollBol=false;
	getlist(page);
	$(window).scroll(function(){
		_this = $(this)[0];
		if(!scrollBol)return false;
		var st = document.body.scrollTop,
			sh = document.body.scrollHeight,
			winH = document.body.clientHeight;
		if(st>=sh-winH){
			var loading = $('.line-scale-pulse-out');
			loading.addClass('line-scale-pulse-out2').show();
			$(document).scrollTop(st+50);
			$('.main').append(loading)
			scrollBol = false;
			page++;
			getlist(page);
		};
	})
});

</script>
