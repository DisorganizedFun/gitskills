var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
if(isiOS){
	$('.top').hide();
}
var accessData,
	lastAccessData = {
		'order_id':0,
		'col':0,
		'comment_star_service':0,
		'comment_star_pic':0,
		'comment_remark_user':"",
		'comment_version':1
	},user_id,order_id=0,col=0,submitBol=false,currentAccess,
	serverText = ['感觉不太好','有待改进','一般般，加油','很好','很棒'],
	photoText = ['很失望','失望','一般','满意','非常满意'];

document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);

window.addEventListener("popstate", function(e) {
    $('.accessWrap').css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
	changeTitle('我的订单');
}, false);
$('.closeBtn').on('click',function(){
	$('.accessWrap').css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
	changeTitle('我的订单');
	window.history.go(-1);
})

//window.onresize = function (e) {
////  var message = '121221？';
////  e = e || window.event;
////
////  if (e) {
////      e.returnValue = message;
////  }=
////	var offsetBottom = $(document).height()-$(this).offset().top-$(this).height()*3;
//  var marginBottom = $(window).height()/2;
//  var holder =$('<div></div>');
//  holder.width('100%').height(marginBottom);
//  $('.accessWrap').append(holder);
////  $(document).scrollTop(marginBottom-offsetBottom);
//};
////window.onunload = function(){
//////	$('.accessWrap').css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
//////	changeTitle('我的订单');
////	return 'onunload'
////}
$('.main').on('click','.accessBtn',function(){
	currentAccess = $(this);
	pushHistory();
	accessData = JSON.parse($(this).parent().attr('accessData'));
	var _order_id = accessData.order_id,
		_col = accessData.col;
	if(_order_id != lastAccessData.order_id || _col != lastAccessData.col){
		clearAccess();
	}
	lastAccessData = accessData;
	$('.accessWrap').css({'transform':'translateX(0)','-webkit-transform':'translateX(0)'});
	changeTitle('评价');
})
$('.accessWrap').on('click',function(e){
	$('.accessBack').hide();
	e.preventDefault();
})
$('.starWrap img').on('click',function(){
	var starWrap = $(this).parents('.starWrap'),
		starNum = $(this).index()+1;
	starWrap.find('.star2:gt('+(starNum-1)+')').show();
	starWrap.find('.star2:lt('+starNum+')').hide();
	starWrap.find('.star1:gt('+(starNum-1)+')').hide();
	starWrap.find('.star1:lt('+starNum+')').show();
	var accessIndex = starWrap.parent().index()
	if(accessIndex==0){
		starWrap.next().html(serverText[starNum-1]);
		accessData.comment_star_service = starNum;
	}else if(accessIndex==1){
		starWrap.next().html(photoText[starNum-1]);
		accessData.comment_star_pic = starNum;
	}
	canSubmit();
})
$('.accessText').on('keyup',function(){
	accessData.comment_remark_user = $(this).val();
	canSubmit();
})
$('.submitBtn').click(function(){
	if(submitBol){
		submitBol = false;
		$('.submitBtn').css({'backgroundImage':'url(/order/buttom_bukedianji@2.png)','color': '#727d7f'});
		$.ajax({
			type: "POST",
			url: "/api/proxy/",
			dataType: 'json',
			data : {
				method:"post",
				url:"/user/order_comment/",
				args: JSON.stringify(accessData),
				auth: user_id
			},
			error: function(){},
			success: function(res){
				console.log(res);
				if(res.status==0){
					currentAccess.removeClass('accessBtn').addClass('grayText').html('已评价');
				}
				$('.accessBack').html(res.msg).show();
			}
		});
	}
})
function results(res){
	for(var i=0;i<res.data.length;i++){
		with(res.data[i]){
			var orderDOM = '\
				<div class="order">\
					<img class="waveLine" src="/order/shangbufen@2x.png"/>\
					<div class="orderDetails">\
						<div class="dateWrap"><span class="point">·</span><span class="date">'+date+'</span><span class="point">·</span></div>\
						<p class="dateText">下单日期</p>\
						<img class="dotted" src="/order/dingdanye_fengexian@2x.png"/>\
						<div class="content">\
							<div>\
								<p class="blackText">订单状态</p>\
								<p class="orderState">进行中</p>\
							</div>\
							<div>\
								<p class="blackText">'+product_name+'</p>\
								<p class="grayText">￥'+price+'</p>\
							</div>\
							<div>\
								<p class="blackText">订单号</p>\
								<p class="grayText">'+order_id+'</p>\
							</div>\
							<div>\
								<p class="blackText">预约拍摄地点</p>\
								<p class="grayText">'+address+'</p>\
							</div>\
						</div>\
						<img class="dotted" src="/order/dingdanye_fengexian@2x.png"/>\
					</div>\
					<img class="waveLine waveLineBottom" src="/order/xiabufen.png"/>\
				</div>';
				orderDOM = $(orderDOM);
				var orderState = orderDOM.find('.orderState');
				if(state==0){
					orderState.css('color','#67af13').html('进行中');
				}else if(state==1){
					orderState.css('color','#474d50').html('已结束');
				}
				if(dispatch.length>0){
					var content = orderDOM.find('.content'),
						_dispatch = $('<div class="dispatch"></div>');
					for(var j=0;j<dispatch.length;j++){
						with(dispatch[j]){
							if(comment_action==1){
								var _tip = '\
									<div>\
										<p class="grayText">'+tip+'</p>\
									</div>';
							}else if(comment_action==0){
								var _tip = '\
									<div>\
										<p class="grayText">'+tip+'</p>\
										<p class="accessState accessBtn">立即评价</p>\
									</div>';
							}else if(comment_action==2){
								var _tip = '\
									<div>\
										<p class="grayText">'+tip+'</p>\
										<p class="accessState grayText">已评论</p>\
									</div>';
							}
							accessData = {
								'order_id':order_id,
								'col':col,
								'comment_star_service':0,
								'comment_star_pic':0,
								'comment_remark_user':"",
								'comment_version':1
							};
							_tip = $(_tip);
							_tip.attr('accessData',JSON.stringify(accessData))
							_dispatch.append(_tip);
						}
					}
					content.after(_dispatch).after('<img class="dotted" src="/order/dingdanye_fengexian@2x.png"/>');
				}
			$('.main').append(orderDOM);
		}
	}
}
function changeTitle(text){
	document.title = text;
	var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
		setTimeout(function() {
			$iframe.off('load').remove()
		}, 0)
	}).appendTo($('body'))
}
function clearAccess(){
	$('.star1').hide();
	$('.star2').show();
	$('.accessText').val("");
	accessData.comment_star_service = 0;
	accessData.comment_star_pic = 0;
	accessData.comment_remark_user = "";
	canSubmit();
}
function canSubmit(){
	with(accessData){
		if(comment_star_service>0 && comment_star_pic>0 && comment_remark_user!=""){
			submitBol = true;
			$('.submitBtn').css({'backgroundImage':'url(/order/buttom_kedianji@2x.png)','color': '#ed6800'})
		}else{
			$('.submitBtn').css({'backgroundImage':'url(/order/buttom_bukedianji@2.png)','color': '#727d7f'})
		}
	}
}
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, "title", "#");
}
