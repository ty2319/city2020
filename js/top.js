(function ($) {

  Schedule = function () {
      var num = $('section').length - 1;

      $('#schedule dd').eq(num).addClass('current');

      for (var i = 0; i <= num; ++i) {
        $('#schedule dd').eq(i).addClass('day');
      }

      $('article').css('margin-left', $('section').outerWidth() * -num);

      $('#schedule dd').on('click', function () {
        var cur = $('#schedule dd').index(this);

        if (num >= cur) {
          $('#schedule dd').removeClass('current');
          $('article').animate({
            marginLeft: $('section').outerWidth() * -cur
          }, 'slow');
          $(this).addClass('current');
        }

        return false;
      });
    },

    Nav = function () {

      var op = 0;

      $('.menu-trigger:not(.on)').hover(function () {
        if ($(window).width() > 1200) {
          $('#global > dl > dd:not(#live)').stop().animate({
            left: 0,
            top: 0
          }, 500);
          $('#global > dl').outerHeight($(window).height() - $('#top').height()).css('overflow', 'auto');
          $('#global').css('z-index', 21);
        } else {
          $('#global , #global > dl').css('overflow', 'visible');
          $('#global > dl > dd:not(#live)').stop().animate({
            top: '4em',
            left: 0
          }, 800);
		  $('main header').show();
          $('#global > dl').outerHeight($('#global > dl > dd:not(#live)').outerHeight());
          $('#live img').fadeOut();

          if ($(window).width() < 600) {
            $('#global > dl').outerHeight($(window).outerHeight()).css('overflow', 'auto');
          }
        }

        $(this).addClass('on');
        $('i', this).text('close');
        $('.menu-trigger .new').hide();
        $('#global').nextAll().addClass('menu_open');
		$('main header').fadeOut();
        op = 1;

      }, function () {

        $('#global > dl').hover(function () {
          if ($('.menu-trigger').hasClass('on')) {
            $('.menu-trigger i').text('close');
          } else {
            $('.menu-trigger i').text('menu');
          }			
        }, function () {
          if ($(window).width() > 1200) {
            setTimeout(function () {
              $('#global > dl').css('overflow', 'hidden');
            }, 500);
            $('#global > dl > dd:not(#live)').stop().animate({
              left: '-100vw',
              top: 0
            }, 500);
            $('#global').css('z-index', 2);
          } else {
            setTimeout(function () {
              $('#global , #global > dl').css('overflow', 'hidden');
            }, 500);
            $('#global > dl > dd:not(#live)').stop().animate({
              top: '-205vw',
              left: 0
            }, 800);
            $('#live img').fadeIn();
          }
			
		  $('main header').fadeIn();
          $('.menu-trigger.on').removeClass('on');
          $('#global').nextAll().removeClass('menu_open');
          $('.menu-trigger i').text('menu');
          $('.menu-trigger .new').show();

          op = 0;
        });
      });

      $('.menu-trigger').on('click', function () {

        if (op == 1) {
          $('#global').nextAll().removeClass('menu_open');
          $(this).removeClass('on');
          $('.menu-trigger i').text('menu');
          $('.menu-trigger .new').show();
		  $('main header').fadeIn();

          if ($(window).width() > 1200) {
            setTimeout(function () {
              $('#global > dl').css('overflow', 'hidden');
            }, 500);
            $('#global > dl > dd:not(#live)').stop().animate({
              left: '-100vw',
              top: 0
            }, 500);
            $('#global').css('z-index', 2);
          } else {
            setTimeout(function () {
              $('#global , #global > dl').css('overflow', 'hidden');
            }, 500);
            $('#global > dl > dd:not(#live)').stop().animate({
              top: '-205vw',
              left: 0
            }, 800);
            $('#live img').fadeIn();
          }

          op = 0;

        } else {
          $('#global').nextAll().addClass('menu_open');
          $(this).addClass('on');
          $('.menu-trigger i').text('close');
          $('.menu-trigger .new').hide();	
		  $('main header').fadeOut();

          if ($(window).width() > 1200) {
            $('#global > dl > dd:not(#live)').stop().animate({
              left: 0,
              top: 0
            }, 500);
            $('#global > dl').outerHeight($(window).height()).css('overflow', 'auto');
            $('#global').css('z-index', 21);
          } else {
            $('#global , #global > dl').css('overflow', 'visible');
            $('#global > dl > dd:not(#live)').stop().animate({
              top: '4em',
              left: 0
            }, 800);
            $('#global > dl').outerHeight($('#global > dl > dd:not(#live)').outerHeight());

            $('#live img').fadeOut();

            if ($(window).width() < 600) {
              $('#global > dl').outerHeight($(window).outerHeight()).css('overflow', 'auto');
            }
          }

          op = 1;
        }
        return false;
      });
    },

    Menu = function () {

      $('#topnavi li a,footer li a').prepend('≫ ');

      var bg = Math.floor(11 * Math.random()) + 1;
      $('main > header').addClass('bg' + bg);

      var path = location.href.split('/'),
        loc = path[path.length - 1],
        today = new Date($.now()),
        year = today.getFullYear(),
        month = (today.getMonth() + 1),
        day = today.getDate(),
        mm = ('0' + month).slice(-2),
        dd = ('0' + day).slice(-2),
        visited = year + "-" + mm + "-" + dd;

      if (loc == '') {
        loc = 'index.html';
      }

      $.cookie('visit.' + loc, visited, {
        path: '/'
      });

      $('nav#global a').each(function (e, v) {
        var links = $(this),
          href = links.attr('href');

        if (href.match('japan') && href.match(loc)) {
          $(this).addClass('active');
        }
      });

      //JSONファイルを取得
      $.getJSON('/symbol/hp/baseball/games/2020/city/js/update.json').done(function (json, status, request) {

        var cnt = 0;

        $(json).each(function (i, data) {

          var elem = '.' + data.class, // class
            date = new Date(data.date), // date
            ago = date.setDate(date.getDate() + 5),
            ago2 = date.setDate(date.getDate() + 1), // 更新日 + 1日
            ua = navigator.userAgent.toLowerCase(),
            isiPhone = (ua.indexOf('iphone') > -1),
            isiPad = (ua.indexOf('ipad') > -1),
            isiPod = (ua.indexOf('ipod') > -1),
            isAndroid = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1),
            isAndroidTablet = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1);

          if (today < ago) { // 今日(today)がago(更新日 + 5日)より前なら
            if ($.cookie('visit' + elem + '.html') == null || $.cookie('visit' + elem + '.html') < data.date) {
              $('#global').find(elem).not('.index').append('<span class="new">N</span>'); // クラス「new」を付ける
            }
          } else {
            $.cookie('visit' + elem + '.html', null);
          }

          cnt = $('#global dd').find('.new').length;
        });

        if (cnt > 0) {
          $('.menu-trigger').append('<span class="new">' + cnt + '</span>');
        }

        if (loc == 'index.html' && elem == index && today < ago2 && !isiPhone && !isiPad && !isiPod) {

          Push.Permission.request();

          Push.create('日本選手権 2019', {
            body: '1回戦の試合結果、ギャラリー、ヒーローインタビューを公開しました。',
            icon: 'icon.gif',
            timeout: 8000, // 通知が消えるタイミング
            vibrate: [100, 100, 100], // モバイル端末でのバイブレーション秒数
            onClick: function () {
              this.close();
            }
          });
        }
      });
    },

    Timer = function () {

      $('#timer').yycountdown({
        endDateTime: '2019/11/02 09:00:00', //カウントダウン終了日時
        unit: {
          d: '日 ',
          h: '時間 ',
          m: '分 ',
          s: '秒'
        }, //カウントダウン単位
        complete: function (_this) { //カウントダウン完了時のコールバック
          _this.find('.yycountdown-box').show();
        }
      });
    },

    Random = function () {
	  
	  var hh = $('main > header').outerHeight(),
		  th = $('.pe-thumbs').outerHeight(),
		  rBox = [],
		  i = 0;
	  
	  if (th < hh) {
	  
		  for (var h = 2; h < 100; h++) {
			  $('.pe-thumbs li').each(function () {
				  $(this).clone().appendTo('.pe-thumbs');
			  });
			  
			  th = th * h;	  
			  if (th > hh) {
				 break;
			  }
		  }
	  }

      $('.pe-thumbs li').each(function () {
        rBox.push($(this).html());
      });

      rBox.sort(function () {
        return Math.random() - Math.random();
      });

      $('.pe-thumbs li').empty();

      $('.pe-thumbs li').each(function () {
        $(this).append(rBox[i]);
        i++;
      });
	  
    },

    Tile = function () {

      var Photo	= (function() {
					
			// list of thumbs
		var $list		= $('#pe-thumbs'),
			// list's width and offset left.
			// this will be used to know the position of the description container
			listW		= $list.width(),
			listL		= $list.offset().left,
			// the images
			$elems		= $list.find('img'),
			// the description containers
			$descrp		= $list.find('div.pe-description'),
			// maxScale : maximum scale value the image will have
			// minOpacity / maxOpacity : minimum (set in the CSS) and maximum values for the image's opacity
			settings	= {
				maxScale	: 1.3,
				maxOpacity	: 1,
				minOpacity	: Number( $elems.css('opacity') )
			},
			init		= function() {

				// minScale will be set in the CSS
				settings.minScale = _getScaleVal() || 1;
				// preload the images (thumbs)
				_loadImages( function() {

					_calcDescrp();
					_initEvents();

				});

			},
			// Get Value of CSS Scale through JavaScript:
			// http://css-tricks.com/get-value-of-css-rotation-through-javascript/
			_getScaleVal= function() {

				var st = window.getComputedStyle($elems.get(0), null),
					tr = st.getPropertyValue("-webkit-transform") ||
						 st.getPropertyValue("-moz-transform") ||
						 st.getPropertyValue("-ms-transform") ||
						 st.getPropertyValue("-o-transform") ||
						 st.getPropertyValue("transform") ||
						 "fail...";

				if( tr !== 'none' ) {	 

					var values = tr.split('(')[1].split(')')[0].split(','),
						a = values[0],
						b = values[1],
						c = values[2],
						d = values[3];

					return Math.sqrt( a * a + b * b );

				}

			},
			// calculates the style values for the description containers,
			// based on the settings variable
			_calcDescrp	= function() {

				$descrp.each( function(i) {

					var $el		= $(this),
						$img	= $el.prev(),
						img_w	= $img.width(),
						img_h	= $img.height(),
						img_n_w	= settings.maxScale * img_w,
						img_n_h	= settings.maxScale * img_h,
						space_t = ( img_n_h - img_h ) / 2,
						space_l = ( img_n_w - img_w ) / 2;

					$el.data( 'space_l', space_l ).css({
						height	: img_n_h,
						top		: -space_t,
						left	: img_n_w - space_l
					});

				});

			},
			_initEvents	= function() {

				$elems.on('proximity.Photo', { max: 80, throttle: 10, fireOutOfBounds : true }, function(event, proximity, distance) {

					var $el			= $(this),
						$li			= $el.closest('li'),
						$desc		= $el.next(),
						scaleVal	= proximity * ( settings.maxScale - settings.minScale ) + settings.minScale,
						scaleExp	= 'scale(' + scaleVal + ')';

					// change the z-index of the element once it reaches the maximum scale value
					// also, show the description container
					if( scaleVal === settings.maxScale ) {
									
						$li.css( 'z-index', 20 );

						if( $desc.offset().left + $desc.width() > listL + listW*1.041 ) {

							$desc.css( 'left', -$desc.width() - $desc.data( 'space_l' ) );

						}

						$desc.fadeIn( 800 );

					}	
					else {
									
						$li.css( 'z-index', 1 );
						$desc.stop(true,true).hide();

					}	

					$el.css({
						'-webkit-transform'	: scaleExp,
						'-moz-transform'	: scaleExp,
						'-o-transform'		: scaleExp,
						'-ms-transform'		: scaleExp,
						'transform'			: scaleExp,
						'opacity'			: ( proximity * ( settings.maxOpacity - settings.minOpacity ) + settings.minOpacity )
					});

				});

			},
			_loadImages	= function( callback ) {

				var loaded 	= 0,
					total	= $elems.length;

				$elems.each( function(i) {

					var $el = $(this);

					$('<img/>').load( function() {

						++loaded;
						if( loaded === total )
							callback.call();

					}).attr( 'src', $el.attr('src') );

				});

			};

		return {
			init	: init
		};

	})();

	Photo.init();
    },

    Size = function () {
      if (940 < $(window).width()) {
        $('body , html').height($(window).height());
        $('main > header , main > div').height($(window).height() - $('#top').outerHeight() - 56);
        $('#live img').attr('src', 'img/common/live2.gif');
        $('main > div > dl').removeClass().addClass('fix3');

        if ($(window).width() > 1200) {
          $('#global , main > header , main > div').height($(window).height() - $('#top').outerHeight());
          $('#live img').attr('src', 'img/common/live.gif');
          $('main > div > dl').removeClass().addClass('fix2');
        }

      } else {
        $('#live img').attr('src', 'img/common/live2.gif');
        $('main > header').outerHeight($(window).height() - $('#top').outerHeight() - $('#global').height());

        //スクロールした時の処理
        $(window).scroll(function () {

          var scrollPosition = $(window).scrollTop(),
            set = $('header#top').height() + 1,
            set2 = $('header#top').height() + $('main header').height();

          if (set < scrollPosition) {
            $('#global').removeClass().addClass('fix');
          } else {
            $('#global').removeClass('fix');
          }

          if (set2 < scrollPosition) {
            $('main > div > dl').removeClass().addClass('fix');
          } else {
            $('main > div > dl').removeClass('fix');
          }
        });
      }
    }

  $(document).ready(function () {
    Nav();
    Menu();
    Size();
    Random();
    Tile();
    Timer();
    Schedule();
  });

  $(window).resize(function () {
    Size();
    Random();
    Tile();
  });

})($);
