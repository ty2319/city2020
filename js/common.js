(function($) {

	//ie css
	set = function() {
		
		$('#topnavi li a,footer li a,#issues a').prepend('≫ ');
		$('#side li a').append(' ●');
		$('.box dt').not('#issues dt').append('：');
		$('.dot dd').prepend('・');
		$('.box2 dt').prepend('―　').append('　―');
		$('article > section , article > div , main > div').addClass('contents');		
		$('.contents:odd').css('background-color','#e9f2ff');
		$('.contents:even').css('background-color','#FFFFFF');
		
		$('.contents').each(function() {
			var A = Math.floor(7*Math.random()) + 1;
            $(this).addClass('bg'+A);
        });
		
		var bg	= Math.floor(11*Math.random()) + 1;
		
		$('main > header').addClass('bg'+bg);
	
		$('.border').each(function(){
			$(this).find('tbody tr:nth-child(even)').addClass('back_gray');
			$(this).find('tbody tr:nth-child(odd)').addClass('back_white');
			$(this).find('tbody th:last-child,tbody td:last-child').css('border','none');
		});
	},
	
	
	//top button
	goTop = function() {
		
		var flag = false;
		var pagetop = $('#pagetop');
		
		$(window).scroll(function () {
			
			if ($(this).scrollTop() > 300) {
				if (flag == false) {
					flag = true;
					
					if ($(window).width() > 600) {
						pagetop.stop().animate({
							'bottom': '50px'
						}, 200);
					} else {
						pagetop.stop().animate({
							'bottom': '10px'
						}, 200);
					}
				}
			} else {
				if (flag) {
					flag = false;
					pagetop.stop().animate({
						'bottom': '-50px'
					}, 200);
				}
			}			
		});
		
		pagetop.click(function () {
			$('body, html').animate({ scrollTop: 0}, 500);
			return false;
		});
	},
	
	nav = function() {
		
		var op = 0;
		
		$('.menu-trigger:not(.on)').hover(function() {
			if ($(window).width() > 1500) {
				$('#global > dl > dd:not(#live)').stop().animate({left: 0 , top: 0} , 500);
				$('#global > dl').outerHeight($(window).height() - $('#top').height()).css('overflow' , 'auto');
			} else {
				$('#global , #global > dl').css('overflow' , 'visible');
				$('#global > dl > dd:not(#live)').stop().animate({top: '4em' , left: 0} , 800);
				$('#global > dl').outerHeight($('#global > dl > dd:not(#live)').outerHeight());
				$('#live img').fadeOut();
					
				if ($(window).width() < 600) {
					$('#global > dl').outerHeight($(window).outerHeight()).css('overflow' , 'auto');
				}
			}
			
			$(this).addClass('on');
			$('i' , this).text('close');
			$('.menu-trigger .new').hide();
			$('#global').nextAll().addClass('menu_open');
			
			op = 1;
			
		} , function() {
		
			$('#global > dl').hover(function() {
				if ($('.menu-trigger').hasClass('on')) {
					$('.menu-trigger i').text('close');
				} else {
					$('.menu-trigger i').text('menu');
				}
			} , function() {
				if ($(window).width() > 1500) {
					setTimeout(function(){
						$('#global > dl').css('overflow' , 'hidden');
					} , 500);
					$('#global > dl > dd:not(#live)').stop().animate({left: '-100vw' , top: 0} , 500);
				} else {
					setTimeout(function(){
						$('#global , #global > dl').css('overflow' , 'hidden');
					} , 500);
					$('#global > dl > dd:not(#live)').stop().animate({top: '-205vw' , left: 0} , 800);
					$('#live img').fadeIn();
				}
				
				$('.menu-trigger.on').removeClass('on');
				$('#global').nextAll().removeClass('menu_open');
				$('.menu-trigger i').text('menu');
				$('.menu-trigger .new').show();
			
				op = 0;
			});
		});
		
		$('.menu-trigger').on('click' , function() {
			
			if (op == 1){
				$('#global').nextAll().removeClass('menu_open');
				$(this).removeClass('on');
				$('.menu-trigger i').text('menu');
				$('.menu-trigger .new').show();
				
				if ($(window).width() > 1500) {	
					setTimeout(function(){
						$('#global > dl').css('overflow' , 'hidden');
					} , 500);
					$('#global > dl > dd:not(#live)').stop().animate({left: '-100vw' , top: 0} , 500);			
				} else {				
					setTimeout(function(){
						$('#global , #global > dl').css('overflow' , 'hidden');
					} , 500);
					$('#global > dl > dd:not(#live)').stop().animate({top: '-205vw' , left: 0} , 800);
					$('#live img').fadeIn();
				}
				
				op = 0;
				
		   } else {
				$('#global').nextAll().addClass('menu_open');
				$(this).addClass('on');
				$('.menu-trigger i').text('close');
				$('.menu-trigger .new').hide();
				
				if ($(window).width() > 1500) {
					$('#global > dl > dd:not(#live)').stop().animate({left: 0 , top: 0} , 500);
					$('#global > dl').outerHeight($(window).height()).css('overflow' , 'auto');
				} else {
					$('#global , #global > dl').css('overflow' , 'visible');
					$('#global > dl > dd:not(#live)').stop().animate({top: '4em' , left: 0} , 800);
					$('#global > dl').outerHeight($('#global > dl > dd:not(#live)').outerHeight());
					
					$('#live img').fadeOut();
					
					if ($(window).width() < 600) {
						$('#global > dl').outerHeight($(window).outerHeight()).css('overflow' , 'auto');
					}
				}
				
				op = 1;
		   }
		   return false;
		});
	},
	
	menu = function() {
		
		var	path	= location.href.split('/'),
			loc		= path[path.length-1],
			today	= new Date( $.now() ),
			year	= today.getFullYear(),
			month	= (today.getMonth() + 1),
			day		= today.getDate(),
			mm		= ('0' + month).slice(-2),
			dd		= ('0' + day).slice(-2),
			visited =  year + "-" + mm + "-" + dd;
			
		if(loc == '') {
			loc = 'index.html';
		}
			
		$.cookie('visit.' + loc , visited , {path:'/'});
		
		$('nav#global a').each(function(e,v){
			var links	= $(this);
			var href	= links.attr('href');
			
			if(href.match('city') && href.match(loc)) {
				$(this).addClass('active');
			}
		});
 
		//JSONファイルを取得
		$.getJSON('/symbol/hp/baseball/games/2019/city/js/update.json').done(function(json, status, request) {
			
			var cnt = 0;
			
			$(json).each(function(i, data) {
				
				var	elem	= '.' + data.class, // class
					date	= new Date( data.date ), // date
					ago		= date.setDate(date.getDate() + 5);
					
				if(loc == 'index') {
					elem = '.index';
				}
		
				if (today < ago) { // 今日(today)がago(更新日 + 5日)より前なら
					if ($.cookie('visit' + elem + '.html') == null || $.cookie('visit' + elem + '.html') < data.date) {
						$('#global').find(elem).append('<span class="new">N</span>'); // クラス「new」を付ける
					}
				} else {
					$.cookie('visit' + elem + '.html' , null);						
				}
				
				cnt = $('#global dd').find('.new').length;
			});
		
			if (cnt > 0) {
				$('.menu-trigger').append('<span class="new">' + cnt + '</span>');
			}
		});
	},
	
	//title
	title = function() {
		
		if ($(window).width() < 1500) {
			$('#live img').attr('src' , 'img/common/live2.gif');
			$('main > header').height($(window).height());
			
			if ($(window).width() < 1200) {
				$('main > header').css('height' , 'auto');
			}
		} else {
			$('#live img').attr('src' , 'img/common/live.gif');
			$('main > header').height($(window).height());
		}
			
		var ct	= $('.contents:first').offset().top + 7;
		
		$('header#title #scroll').on('click' , function() {
			$("html, body").stop(true).animate({scrollTop: ct}, 500, "swing");
		});

	},
	
	// SmoothScroll
	smoothScroll = function() {
		
		$('article #side li a[href^="#"]').click(function(){
			var speed = 500;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			var body = 'body';
			$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
		});
		
		var set =  $('header#top').height() + 1;//ウインドウ上部からどれぐらいの位置で変化させるか
		var boxTop			= new Array;
		var current			= -1;
		var startPosition	= 0;
		
		//各要素の位置
		$(window).on("load resize", function(){
			$('.contents').each(function(i) {
				boxTop[i] = $(this).offset().top -1;
			});
		});
		//最初の要素にclass="on"をつける
		changeBox(-1);
		//スクロールした時の処理
		$(window).scroll(function(){
			
			var scrollPosition	= $(window).scrollTop();	
			var navtop			= $('header#top').offset().top;	
				
			for (var i = boxTop.length - 1 ; i >= 0; i--) {
				if (scrollPosition >= boxTop[i]) {
					
					if (1200 > $(window).width()) {
						$('#pan').slideDown('slow');
					}
								
					changeBox(i);
					break;
				} else if (scrollPosition < boxTop[0]) {
					changeBox(-1);
					$('#pan').slideUp('slow');
				}
			};
			
			if (set < scrollPosition) {
				$('#global').addClass('fix');
				
				if (1200 < $(window).width()) {
					$('main > header').addClass('fix');
				}
				
			} else {
				$('main > header').removeClass('fix');
				$('#global').removeClass('fix');
			}
			
			if (scrollPosition >= $(document).height() - $(window).height() - $('footer ul').height()) {
				$('#pan').css('position' , 'absolute');
			} else {
				$('#pan').css('position' , 'fixed');
			}
			
			startPosition = scrollPosition;
		});
		
		//ナビの処理
		function changeBox(secNum) {
			if (secNum != current) {
				
				current = secNum;
				secNum2 = secNum + 1;//HTML順序用
				$('article #side li').removeClass('on');
				$('article #side li:nth-child(' + secNum2 +')').addClass('on');
			}
		};
	},
	
	//sidemenu
	side = function() {
		$('#side').hover(function() {
			$('article').append('<div id="modal"></div>');
			$('span' , this).fadeIn('slow').css('display' , 'inline');
		},function() {
			$('div#modal').remove();
			$('span' , this).fadeOut('slow');
		});
		
		$('#side').on('touchstart', function(){
			$('body').append('<div id="modal"></div>');
			$('span',this).fadeIn('slow');
    	}).on('touchend', function(){
        	$('div#modal').remove();
			$('span',this).fadeOut('slow');
    	});
	}
	
	$(document).ready(function() {
		set();
		goTop();
		nav();
		menu();
		title();
		smoothScroll();
		side();
	});	
	
	$(window).resize(function() {
		title();
	});
	
})($);

// JavaScript Document