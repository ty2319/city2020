$(window).on('load resize' , function() {
	
	setInterval(function(){
		location.reload();
	}, 60000);
	
	$("html, body").stop().animate({scrollTop: $('article > section').offset().top}, 500, "linear");
	
	$('.contents > section table').addClass('over');
	
	$('article > .head').each(function() {
        $('table.member:eq(0)',this).addClass('blue');
        $('table.member:eq(1)',this).addClass('border');
		$('table.battery tr:eq(0) th:eq(0)' , this).addClass('b_n');
		$('table.battery tr:eq(1) th:eq(0)' , this).addClass('b_e');
    });	
	$('article > .tail').each(function() {
        $('table.member:eq(0)',this).addClass('blue');
        $('table.member:eq(1)',this).addClass('border');
		$('table.battery tr:eq(0) th:eq(0)' , this).addClass('b_e');
		$('table.battery tr:eq(1) th:eq(0)' , this).addClass('b_n');
    });
	
	$('.border').each(function(){
		$(this).find('tbody tr:nth-child(even)').addClass('back_gray');
		$(this).find('tbody tr:nth-child(odd)').addClass('back_white');
		$(this).find('tbody th:last-child,tbody td:last-child').css('border','none');
	});
	$('.blue').each(function(){
		$(this).find('tbody tr:nth-child(even)').addClass('back_blue');
		$(this).find('tbody tr:nth-child(odd)').addClass('back_white');
	});
	$('.head .score').each(function(){
		$(this).find('tbody tr:nth-child(1)').addClass('back_blue');
		$(this).find('tbody tr:nth-child(2)').addClass('back_white');
	});
	$('.tail .score').each(function(){
		$(this).find('tbody tr:nth-child(2)').addClass('back_blue');
		$(this).find('tbody tr:nth-child(1)').addClass('back_white');
	});
	
	$('.head > section > div').each(function(){
		$(this).find('section:nth-child(odd)').addClass('ntt');
		$(this).find('section:nth-child(even)').addClass('enemy');
	});
	$('.tail > section > div').each(function(){
		$(this).find('section:nth-child(even)').addClass('ntt');
		$(this).find('section:nth-child(odd)').addClass('enemy');
	});
	
/*爾鹿scoreborad function爾鹿*/
	
	$('.contents > section').each(function() {
		
		var cnt = $('section' , this).length,
			now = $('section' , this).eq(cnt-1).attr('id'),
			pre = $('section' , this).eq(cnt-2).attr('id');
		
		if ($('section:last td' , this).length < 1) {
			$('section:last' , this).hide();
			cnt = cnt-1;
			now = $('section' , this).eq(cnt-1).attr('id');
			pre = $('section' , this).eq(cnt-2).attr('id');
		}
		
		if(cnt <= 1) {
			$('.prev').hide();
		} else {
			$('.prev').show();
		}
		
		$('.next').hide();
		$('.prev a').attr('href' , '#' + pre);
		
		$('.score a').each(function() {
            if ($(this).attr('href') == '#' + now) {
				$(this).parent().addClass('current');
			}
		});
		
		$('section' , this).width($('.contents > section').width() * 1.06);
		$('section table' , this).width($('.contents > section').width());
		
		$('div' , this).width(cnt * $(this).parent().width()).css('margin-left' , -($('section' , this).outerWidth(true))*(cnt-1));
		
		$('.score a,.prev a,.next a' , this).click(function() {
			
			$(this).parents('section').find('td').removeClass('current');
			
			var lockon = $(this).attr('href');
			var num = $(this).parents('section').find('section').index($(lockon));
			var preid = $(lockon).prev().attr('id');
			var nextid = $(lockon).next().attr('id');
			
			$(this).parents('section').find('.score a').each(function() {
                if ($(this).attr('href') == lockon) {
					$(this).parent().addClass('current');
				}
            });
			
			$(this).parents('section').children('div').stop().animate({'margin-left' : $(lockon).outerWidth(true) * -(num - 1)} , 500 , function() {
				if (num <= 0) {
					$(this).parents('section').find('.prev').fadeOut('fast');
				} else {
					$(this).parents('section').find('.prev').fadeIn('fast');
				}
				
				if (num == cnt) {
					$(this).parents('section').find('.next').fadeOut('fast');
				} else {
					$(this).parents('section').find('.next').fadeIn('fast');
				}
			
				$(this).parents('section').find('.prev a').attr('href' , '#' + preid);
				$(this).parents('section').find('.next a').attr('href' , '#' + nextid);
				
			});
			return false;
		});
	});
	
	$('.ntt h6').css('color','#2c7eff');
	$('.enemy h6').css('color','#666');
	
	$('.ntt table').each(function(){
		var numTh = $('thead th' , this).length;
		var isEven = true;
		// $("table tr").each(function() {
		$('tbody tr' , this).each(function() {
			if (numTh == $(this).children().length || $(this).children().length == 1) {
			  isEven = !isEven;
			}
			$(this).addClass(isEven ? 'back_blue' : 'back_white');
		});
	});
	
	$('.enemy table').each(function(){
		var numTh = $('thead th' , this).length;
		var isEven = true;
		// $("table tr").each(function() {
		$('tbody tr' , this).each(function() {
			if (numTh == $(this).children().length || $(this).children().length == 1) {
			  isEven = !isEven;
			}
			$(this).addClass(isEven ? 'back_gray' : 'back_white');
		});
	});
	
	$('section > div tr').hover(function(){
		$(this).css('color','#F90');},
	function(){
		$(this).css('color','#666');
	});
	
	$('imgsection').css('height','auto');
	
	$('article > section').each(function() {
        $(this).find('section:eq(0) > table:eq(2)').css('margin-right', 0 );
    });
	
});// JavaScript Document