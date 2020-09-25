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

    tile = function () {

      var elems = $([]),
        doc = $(document);

      $.event.special.proximity = {

        defaults: {
          max: 100,
          min: 0,
          throttle: 0,
          fireOutOfBounds: 1
        },

        setup: function (data) {

          if (!elems[0])
            doc.mousemove(handle);

          elems = elems.add(this);

        },

        add: function (o) {

          var handler = o.handler,
            data = $.extend({}, $.event.special.proximity.defaults, o.data),
            lastCall = 0,
            nFiredOutOfBounds = 0,
            hoc = $(this);

          o.handler = function (e, pageX, pageY) {

            var max = data.max,
              min = data.min,
              throttle = data.throttle,
              date = +new Date,
              distance,
              proximity,
              inBounds,
              fireOutOfBounds = data.fireOutOfBounds;

            if (throttle && lastCall + throttle > date) {
              return;
            }

            lastCall = date;

            distance = calcDistance(hoc, pageX, pageY);
            inBounds = distance < max && distance > min;

            if (fireOutOfBounds || inBounds) {

              if (inBounds) {
                nFiredOutOfBounds = 0;
              } else {

                // If fireOutOfBounds is a number then keep incrementing a
                // counter to determine how many times the handler's been
                // called out of bounds. Note: the counter is reset whenever
                // the cursor goes back inBounds...

                if (typeof fireOutOfBounds === 'number' && nFiredOutOfBounds > fireOutOfBounds) {
                  return;
                }
                ++nFiredOutOfBounds;
              }

              proximity = e.proximity = 1 - (
                distance < max ? distance < min ? 0 : distance / max : 1
              );

              e.distance = distance;
              e.pageX = pageX;
              e.pageY = pageY;
              e.data = data;

              return handler.call(this, e, proximity, distance);

            }

          };

        },

        teardown: function () {

          elems = elems.not(this);

          if (!elems[0])
            doc.unbind('mousemove', handle);

        }

      };

      function calcDistance(el, x, y) {

        // Calculate the distance from the closest edge of the element
        // to the cursor's current position

        var left, right, top, bottom, offset,
          cX, cY, dX, dY,
          distance = 0;

        offset = el.offset();
        left = offset.left;
        top = offset.top;
        right = left + el.outerWidth();
        bottom = top + el.outerHeight();

        cX = x > right ? right : x > left ? x : left;
        cY = y > bottom ? bottom : y > top ? y : top;

        dX = Math.abs(cX - x);
        dY = Math.abs(cY - y);

        return Math.sqrt(dX * dX + dY * dY);

      }

      function handle(e) {

        var x = e.pageX,
          y = e.pageY,
          i = -1,
          fly = $([]);

        while (fly[0] = elems[++i]) {
          fly.triggerHandler('proximity', [x, y]);
        }

      }
    },

    Size = function () {
      if (940 < $(window).width()) {
        $('body , html').height($(window).height());
        $('main > header , main > div').height($(window).height() - $('#top').outerHeight() - 56);
        $('#live img').attr('src', 'img/common/live2.gif');
        $('main dl').removeClass().addClass('fix3');

        if ($(window).width() > 1200) {
          $('#global , main > header , main > div').height($(window).height() - $('#top').outerHeight());
          $('#live img').attr('src', 'img/common/live.gif');
          $('main dl').removeClass().addClass('fix2');
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
            $('main dl').removeClass().addClass('fix');
          } else {
            $('main dl').removeClass('fix');
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
    Tile();
  });

})($);
