(function($) {
		
	Schedule = function() {
		var num = $('section').length-1;
		
		$('#schedule dd').eq(num).addClass('current');
		
		$('article').css('margin-left' , $('section').outerWidth() * -num);
		
		$('#schedule dd').on('click' , function() {
			var cur = $('#schedule dd').index(this);
			
			if (num >= cur) {
				
				$('#schedule dd').removeClass('current');
				$('article').animate({marginLeft: $('section').outerWidth() * -cur} , 'slow');
				$(this).addClass('current');
			}
		});
	},
	
	Nav = function() {
		
		var op = 0;
		
		$('.menu-trigger:not(.on)').hover(function() {
			if ($(window).width() > 1200) {
				$('#global > dl > dd:not(#live)').stop().animate({left: 0 , top: 0} , 500);
				$('#global > dl').height($(window).height() - $('#top').height()).css('overflow' , 'auto');
			} else {
				$('#global , #global > dl').css('overflow' , 'visible');
				$('#global > dl > dd:not(#live)').stop().animate({top: '4em' , left: 0} , 800);
				$('#global > dl').outerHeight($('#global > dl > dd:not(#live)').outerHeight());
				$('#live img').fadeOut();
					
				if ($(window).width() < 600) {
					$('#global > dl').outerHeight($(window).height()).css('overflow' , 'auto');
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
				if ($(window).width() > 1200) {					
					setTimeout(function(){
						$('#global , #global > dl').css('overflow' , 'hidden');
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
				
				if ($(window).width() > 1200) {
					setTimeout(function(){
						$('#global > dl , #global > dl').css('overflow' , 'hidden');
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
				
				if ($(window).width() > 1200) {
					$('#global > dl > dd:not(#live)').stop().animate({left: 0 , top: 0} , 500);
					$('#global > dl').height($(window).height() - $('#top').outerHeight()).css('overflow' , 'auto');
				} else {
					$('#global , #global > dl').css('overflow' , 'visible');
					$('#global > dl > dd:not(#live)').stop().animate({top: '4em' , left: 0} , 800);
					$('#global > dl').outerHeight($('#global > dl > dd:not(#live)').outerHeight());
					$('#live img').fadeOut();
					
					if ($(window).width() < 600) {
						$('#global > dl').outerHeight($(window).height()).css('overflow' , 'auto');
					}
				}
				
				op = 1;
		   }
		   return false;
		});
	},
	
	Menu = function() {
		
		$('#topnavi li a,footer li a').prepend('≫ ');
		
		var bg	= Math.floor(11*Math.random()) + 1;		
		$('main > header').addClass('bg' + bg);
		
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
			var links	= $(this),
				 href	= links.attr('href');
			
			if(href.match('city') && href.match(loc)) {
				$(this).addClass('active');
			}
		});
 
		//JSONファイルを取得
		$.getJSON('/symbol/hp/baseball/games/2019/city/js/update.json').done(function(json, status, request) {
			
			var cnt = 0;
			
			$(json).each(function(i, data) {
				
				var	elem			= '.' + data.class, // class
					date			= new Date( data.date ), // date
					ago				= date.setDate(date.getDate() + 5),
					ago2			= date.setDate(date.getDate() + 1), // 更新日 + 1日
					ua				= navigator.userAgent.toLowerCase(),
					isiPhone		= (ua.indexOf('iphone') > -1),
					isiPad			= (ua.indexOf('ipad') > -1),
					isiPod			= (ua.indexOf('ipod') > -1),
					isAndroid		= (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1),
					isAndroidTablet = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1);
		
				if (today < ago) { // 今日(today)がago(更新日 + 5日)より前なら
					if ($.cookie('visit' + elem + '.html') == null || $.cookie('visit' + elem + '.html') < data.date) {
						$('#global').find(elem).not('.index').append('<span class="new">N</span>'); // クラス「new」を付ける
					}
				} else {
					$.cookie('visit' + elem + '.html' , null);						
				}
				
				cnt = $('#global dd').find('.new').length;
			});
		
			if (cnt > 0) {
				$('.menu-trigger').append('<span class="new">' + cnt + '</span>');
			}
									
			if (loc == 'index.html' && elem == index && today < ago2 && !isiPhone && !isiPad && !isiPod) {
						
				Push.Permission.request();
				
				Push.create('都市対抗 2019', {
				　　body	: '都市対抗 2019 特設サイトを公開しました。',
				　　icon	: 'icon.gif',
				　　timeout	: 8000, // 通知が消えるタイミング
					vibrate: [100, 100, 100], // モバイル端末でのバイブレーション秒数
				　　onClick	: function() {
				　　　　window.open('http://www.ntt-west.co.jp/symbol/hp/baseball/games/2019/city/index.html');
				　　}
				});
			}
		});
	},
	
	Timer = function() {
		
		$('#timer').yycountdown({
			endDateTime	: '2019/07/23 14:00:00',  //カウントダウン終了日時
			unit		: {d: '日 ', h: '時間 ', m: '分 ', s: '秒'},  //カウントダウン単位
			complete	: function(_this){  //カウントダウン完了時のコールバック
				_this.find('.yycountdown-box').show();
			}
		});
	},
	
	Random = function() {
		
		$('main header ul').clone().appendTo('main header');
		
		if ($(window).width() < 940) {
			$('main header ul:first').hide();
		}
		
		var cnt = 0,
			liw = 0;
		
		$('main header ul').each(function() {
		
			var rBox = [];
			
			cnt  = 0;
			liw  = 0;
			
			$('main header ul li').each(function() {
				rBox.push($(this).html());
			});
		
			$(this).empty();
			
			for(var i=0; i < rBox.length; i++) {
				$(this).append('<li>' + rBox[i] + '</li>');
				cnt = i;
			}
			
			$(this).children().clone().appendTo(this);
			
			if ($(window).width() > 600) {
				$('img' , this).width($('main header').width()*0.18);
			} else {
				$('img' , this).width($('main header').width()*0.3);
			}
			
			liw = ($('li' , this).width() * cnt) / 2;
		});
			 
		function loopleft(){

			var ulL	= $('main header ul:first');

			ulL.animate({left: -liw}, 1000*cnt ,'linear',function(){
				ulL.css({left:'0'});
				loopleft();
			});
		};
		
		loopleft();
			
		function loopright(){

			var ulR	= $('main header ul:last');

			ulR.animate({right: -liw}, 1000*cnt ,'linear',function(){
				ulR.css({right: 0});
				loopright();
			});
		};
		
		loopright();
	},
	
	Size = function() {
		
		if (940 < $(window).width()) {
			$('body , html').height($(window).height());
			$('h2').width($(window).width() / 2);
			$('main > header , main > div').height($(window).height() - $('#top').outerHeight() - 56);
			$('#live img').attr('src' , 'img/common/live2.gif');
			$('main dl').removeClass().addClass('fix3');
			
			if ($(window).width() > 1200) {
				$('h2').width($(window).width() * 0.432);
				$('#global , main > header , main > div').height($(window).height() - $('#top').outerHeight());
				$('#live img').attr('src' , 'img/common/live.gif');
				$('main dl').removeClass().addClass('fix2');
			}
			
		} else {
			$('#live img').attr('src' , 'img/common/live2.gif');
			$('main > header').outerHeight($(window).height() - $('#top').outerHeight() - $('#global').height());
			
			//スクロールした時の処理
			$(window).scroll(function(){
		
				var	scrollPosition	= $(window).scrollTop(),
					set				= $('header#top').height() + 1,
					set2			= $('header#top').height() + $('main header').height();
									
				if (set < scrollPosition) {
					$('#global').removeClass().addClass('fix');
				} else {
					$('#global').removeClass('fix');
				}
													
				if (set2 < scrollPosition) {
					$('main dl').removeClass().addClass('fix');
				} else {
					$('main dl').removeClass('fix');
				}
			});
		}
	}
	
	$(document).ready(function() {
		Nav();
		Menu();
		Size();
		Schedule();
		Timer();
		Random();
	});
	
	$(window).resize(function() {
		Size();
		Schedule();
	});
	
})($);