(function($) {
		
	Schedule = function() {
		var num = $('section').length-1;
		
		$('#schedule dd').eq(num).addClass('current');
		
		for(var i = 0 ; i <= num; ++i) {
			$('#schedule dd').eq(i).addClass('day');
		}
		
		$('article').css('margin-left' , $('section').outerWidth() * -num);
		
		$('#schedule dd').on('click' , function() {
			var cur = $('#schedule dd').index(this);
			
			if (num >= cur) {
				$('#schedule dd').removeClass('current');
				$('article').animate({marginLeft: $('section').outerWidth() * -cur} , 'slow');
				$(this).addClass('current');
			}
			
			return false;
		});
	},
	
	Nav = function() {
		
		var op = 0;
		
		$('.menu-trigger:not(.on)').hover(function() {
			if ($(window).width() > 1200) {
				$('#global > dl > dd:not(#live)').stop().animate({left: 0 , top: 0} , 500);
				$('#global > dl').outerHeight($(window).height() - $('#top').height()).css('overflow' , 'auto');
				$('#global').css('z-index' , 21);
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
				if ($(window).width() > 1200) {
					setTimeout(function(){
						$('#global > dl').css('overflow' , 'hidden');
					} , 500);
					$('#global > dl > dd:not(#live)').stop().animate({left: '-100vw' , top: 0} , 500);
					$('#global').css('z-index' , 2);
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
						$('#global > dl').css('overflow' , 'hidden');
					} , 500);
					$('#global > dl > dd:not(#live)').stop().animate({left: '-100vw' , top: 0} , 500);
					$('#global').css('z-index' , 2);		
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
					$('#global > dl').outerHeight($(window).height()).css('overflow' , 'auto');
					$('#global').css('z-index' , 21);
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
			
			if(href.match('japan') && href.match(loc)) {
				$(this).addClass('active');
			}
		});
 
		//JSONファイルを取得
		$.getJSON('/symbol/hp/baseball/games/2019/japan/js/update.json').done(function(json, status, request) {
			
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
				
				Push.create('日本選手権 2019', {
				　　body 	: '1回戦の試合結果、ギャラリー、ヒーローインタビューを公開しました。',
				　　icon 		: 'icon.gif',
				　　timeout	: 8000, // 通知が消えるタイミング
					vibrate  : [100, 100, 100], // モバイル端末でのバイブレーション秒数
				　　onClick	: function() {
				　　　　this.close();
				　　}
				});
			}
		});
	},
	
	Timer = function() {
		
		$('#timer').yycountdown({
			endDateTime	: '2019/11/02 09:00:00',  //カウントダウン終了日時
			unit		: {d: '日 ', h: '時間 ', m: '分 ', s: '秒'},  //カウントダウン単位
			complete	: function(_this){  //カウントダウン完了時のコールバック
				_this.find('.yycountdown-box').show();
			}
		});
	},
	
	Random = function() {
		
		var rBox = [],
			 i 	 = 0;
		
		$('li.content').each(function() {
			rBox.push($(this).html());
		});
		
		rBox.sort(function() {
			return Math.random() - Math.random();
		});
		
		$('li.content').empty();
		
		$('li.content').each(function() {
			$(this).append(rBox[i]);
			i++;
		});
		
		var sliderLeft 	= $('#thumbScroller .container').position().left,
			padding 	= $('#outer_container').css('paddingRight').replace("px", ""),
			sliderWidth	= $('main header').innerWidth() - 10,
			totalContent= 0;
		
		
		$('#thumbScroller .container').stop().animate({left: sliderLeft}, 400,'easeOutCirc'); //with easing		
		$('#thumbScroller').css('width',sliderWidth);
		
		$('#thumbScroller .content').each(function () {
			totalContent+=$(this).innerWidth();
			$('#thumbScroller .container').css('width',totalContent);
		});
		
		$('#thumbScroller').mousemove(function(e){
			if($('#thumbScroller .container').width() > sliderWidth) {
				
				var mouseCoords	 = (e.pageX - $(this).offset().left),
					mousePercentX= mouseCoords/sliderWidth,
					destX		 = -(((totalContent-(sliderWidth))-sliderWidth)*(mousePercentX)),
					thePosA		 = mouseCoords-destX+1,
					thePosB		 = destX-mouseCoords+2,
					animSpeed	 = 600, //ease amount
					easeType	 = 'easeOutCirc';
				
				if(mouseCoords == destX) {
					$('#thumbScroller .container').stop();
				}
				else if(mouseCoords > destX) {
					//$('#thumbScroller .container').css('left',-thePosA); //without easing
					$('#thumbScroller .container').stop().animate({left: -thePosA}, animSpeed,easeType); //with easing
				}
				else if(mouseCoords < destX) {
					//$('#thumbScroller .container').css('left',thePosB); //without easing
					$('#thumbScroller .container').stop().animate({left: thePosB}, animSpeed,easeType); //with easing
				}
			}
		});
		
		$('#thumbScroller .thumb').each(function () {
			$(this).fadeTo(fadeSpeed, 0.6);
		});
		
		var fadeSpeed = 200;
		
		$('#thumbScroller .thumb').hover(
			function(){ //mouse over
				$(this).fadeTo(fadeSpeed, 1);
			},
			function(){ //mouse out
				$(this).fadeTo(fadeSpeed, 0.6);
			}
		);
		
		var current			= -1;
		//cache some elements
		var $btn_thumbs 	= $('#fp_thumbtoggle');
		var $loader			= $('#fp_loading');
		var $btn_next		= $('#fp_next');
		var $btn_prev		= $('#fp_prev');
		var $thumbScroller	= $('#thumbScroller');
		//total number of thumbs
		var nmb_thumbs		= $thumbScroller.find('.content').length;
		//preload thumbs
		var cnt_thumbs 		= 0;
		
		for(var i = 0 ; i < nmb_thumbs; ++i) {
			var $thumb = $thumbScroller.find('.content:nth-child('+parseInt(i+1)+')');
			$('<img/>').load(function(){
				++cnt_thumbs;
				if (cnt_thumbs == nmb_thumbs)
		//display the thumbs on the bottom of the page
		showThumbs(2000);
			}).attr('src' , $thumb.find('img').attr('src'));
		}
		//make the document scrollable
		//when the the mouse is moved up/down
		//the user will be able to see the full image
		makeScrollable();

		//clicking on a thumb...
		$thumbScroller.find('.content').on('click',function(e){
			var $content= $(this);
			var $elem 	= $content.find('img');
			//keep track of the current clicked thumb
			//it will be used for the navigation arrows
			current 	= $content.index()+1;
			//get the positions of the clicked thumb
			var pos_left = $elem.offset().left;
			var pos_top  = $elem.offset().top;
			//clone the thumb and place
			//the clone on the top of it
			var $clone 	= $elem.clone().addClass('clone').css({
				'position' 	:'absolute',
				'left' 		: pos_left + 'px',
				'top' 		: pos_top + 'px',
				'z-index' 	: 11
			}).appendTo($('main header'));

			var windowW = $('main header').width();
			var windowH = $('main header').height();

			//animate the clone to the center of the page
			$clone.stop().animate({
				'left' 		 : windowW/2 + 'px',
				'top' 		 : windowH/2 + 'px',
				'margin-left': -$clone.width()/2 + 'px',
				'margin-top' : -$clone.height()/2 + 'px'
			}, 500, function() {
				var $theClone= $(this);
				var ratio	 = $clone.width()/120;
				var final_w	 = 400*ratio;

				$loader.show();

				//expand the clone when large image is loaded
				$('<img class="fp_preview"/>').load(function(){
					var $newimg 	= $(this);
					var $currImage 	= $('#fp_preview').children('img:first');
					$newimg.insertBefore($currImage);
					$loader.hide();
					//expand clone
					$theClone.animate({
						'opacity'		: 0,
						'top'			: windowH/2 + 'px',
						'left'			: windowW/2 + 'px',
						'margin-top'	: '-200px',
						'margin-left'	: -final_w/2 + 'px',
						'width'			: final_w + 'px',
						'height'		: '400px'
					},1000,function(){$(this).remove();});
					//now we have two large images on the page
					//fadeOut the old one so that the new one gets shown
					$currImage.fadeOut(2000,function(){
						$(this).remove();
					});
					//show the navigation arrows
					showNav();
				}).attr('src',$elem.attr('alt'));
			});
			//hide the thumbs container
			hideThumbs();
			e.preventDefault();
		});

		//clicking on the "show thumbs"
		//displays the thumbs container and hides
		//the navigation arrows
		$btn_thumbs.on('click',function(){
			showThumbs(500);
			hideNav();
		});

		function hideThumbs(){
			$('#outer_container').stop().animate({'bottom':'-160px'},500);
			showThumbsBtn();
		}

		function showThumbs(speed){
			$('#outer_container').stop().animate({'bottom':'0px'},speed);
			hideThumbsBtn();
		}

		function hideThumbsBtn(){
			$btn_thumbs.stop().animate({'bottom':'-50px'},500);
		}

		function showThumbsBtn(){
			$btn_thumbs.stop().animate({'bottom':'0px'},500);
		}

		function hideNav(){
			$btn_next.stop().animate({'right':'-50px'},500);
			$btn_prev.stop().animate({'left':'-50px'},500);
		}

		function showNav(){
			$btn_next.stop().animate({'right':'0px'},500);
			$btn_prev.stop().animate({'left':'0px'},500);
		}

		//events for navigating through the set of images
		$btn_next.on('click',showNext);
		$btn_prev.on('click',showPrev);

		//the aim is to load the new image,
		//place it before the old one and fadeOut the old one
		//we use the current variable to keep track which
		//image comes next / before
		function showNext(){
			++current;
			var $e_next	= $thumbScroller.find('.content:nth-child('+current+')');
			
			if($e_next.length == 0){
				current = 1;
				$e_next	= $thumbScroller.find('.content:nth-child('+current+')');
			}
			
			$loader.show();
			
			$('<img class="fp_preview"/>').load(function(){
				var $newimg		= $(this);
				var $currImage	= $('#fp_preview').children('img:first');
				$newimg.insertBefore($currImage);
				$loader.hide();
				$currImage.fadeOut(2000,function(){$(this).remove();});
			}).attr('src',$e_next.find('img').attr('alt'));
		}

		function showPrev(){
			--current;
			var $e_next	= $thumbScroller.find('.content:nth-child('+current+')');
			if($e_next.length == 0) {
				current = nmb_thumbs;
				$e_next	= $thumbScroller.find('.content:nth-child('+current+')');
			}
			
			$loader.show();
			
			$('<img class="fp_preview"/>').load(function(){
				var $newimg	 	= $(this);
				var $currImage	= $('#fp_preview').children('img:first');
				$newimg.insertBefore($currImage);
				$loader.hide();
				$currImage.fadeOut(2000,function(){$(this).remove();});
			}).attr('src',$e_next.find('img').attr('alt'));
		}

		function makeScrollable() {
			$('#fp_preview').on('mousemove',function(e){
				var top = ($('main header').height() - e.pageY - $('#top').height());
				$('#fp_preview').scrollTop(top);
				$('.fp_overlay').height($('.fp_preview').height());
			});
		}
	},
	
	Size = function() {
		if (940 < $(window).width()) {
			$('body , html').height($(window).height());
			$('main > header , main > div').height($(window).height() - $('#top').outerHeight() - 56);
			$('#live img').attr('src' , 'img/common/live2.gif');
			$('main dl').removeClass().addClass('fix3');
			
			if ($(window).width() > 1200) {
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
		Random();
		Timer();
		Schedule();
	});
	
	$(window).resize(function() {
		Size();
	});
	
})($);