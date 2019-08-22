$(document).ready(function(){
	
	var ua = navigator.userAgent.toLowerCase();
	
	// iPhone
	var isiPhone = (ua.indexOf('iphone') > -1);
	// iPad
	var isiPad = (ua.indexOf('ipad') > -1);
	// iPod
	var isiPod = (ua.indexOf('ipod') > -1);
	
	if (isiPhone || isiPad || isiPod) {
		$('.accordion').hide();
	}

	$('.accordion').css('cursor' , 'pointer');
	$('.accordion + div').hide().css('margin-bottom','10em');
	
	var _touch = ('ontouchstart' in document) ? 'touchstart' : 'click';
	
	$('.accordion').on(_touch , function(){
		$(this).next('div').slideToggle('slow').css('display' , 'block');
	}).toggle(function() {
		$('span' , this).text("※クリックすると上に閉じます。 ▲");
		$(this).next('div').css('display','block').width($(this).parent().width());
	}, function() {
		$('span' , this).text("※クリックすると下に開きます。 ▼");
	});
	
	$("a[rel=game1],a[rel=game2],a[rel=game3],a[rel=game4],a[rel=game5]").fancybox({
		'padding'		: 0,
		'margin'		: 20,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic',
		'titlePosition'	: 'over',
		'titleFormat'	: function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
		}
	});
	
	$('.fancy dt + dd').css('margin',0);
	$('.fancy > dt:first-child').css({'border':'none','margin-top': 0,'padding-top': '1em'});	
	
	$('.half > section > ul').photobox('a', {thumbs:true});
	$('.half > section > ul li').height($('.half > section > ul li').width());
	
	$('#global').hover(function() {
		$('.accordion').addClass('over');
	} , function() {
		$('.accordion').removeClass('over');
	});
	
	$('.menu-trigger').click(function() {
		$('.accordion').toggleClass('over');
	});
	
}); 
