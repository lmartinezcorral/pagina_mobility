(function ($) {
// USE STRICT
// "use strict";

// BEGIN: Preloader
var preLoader = function() { 
  if($('.preloader').length){
    $('.preloader').delay(200).fadeOut(600);
  }
};
// END: Preloader


// BEGIN: 15 Mega Menu
    var megaMenu = function() {
        var menuType = 'desktop';
        $(window).on('load resize', function() {
            var activemenuType = 'desktop';
            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )  activemenuType = 'mobile';
            var header = $('.logo-nav');
            if ( activemenuType === 'mobile' ) {
                var mobileMenu = $('#main-menu');
                mobileMenu.attr('id', 'mobile-menu').hide();
                var hasChildMenu = $('#mobile-menu').find('ul.menu').children('li');
                header.after(mobileMenu);
                hasChildMenu.children('div.submenu').hide();
                $(".mega-menu").hide();
                $('#mobile-menu ul li').find('ul').parent().parent().children('a').after( '<span class="btn-submenu"></span>');
                $('.menu-opener').removeClass('active');
                $('.submenu-child').hide();
                $('.submenu').find('li.dropdown-menu-item-child').children('a').after('<span class="btn-submenu-child"></span>');
            }
            else {
                var desktopMenu = $('#mobile-menu');
                desktopMenu.attr('id', 'main-menu').removeAttr('style');
                $('div.submenu').show();
                desktopMenu.find('.mega-menu').removeAttr('style');
                header.find('.menu-bar').append(desktopMenu);
                $('.btn-submenu').remove();
                $('.submenu-child').show();
            }
        });
        // menu opener
        $('.menu-opener').on('click', function() {
            $('#mobile-menu').slideToggle(300);
            $(this).toggleClass('active');
            return false;
        });
    };
   
    $(document).on('click', '#mobile-menu li .btn-submenu', function(e) {
        var originalElement = $(this)[0];
        $('#mobile-menu li .btn-submenu.active').each(function(){
            if(originalElement !=  $(this)[0]){
                $(this).parent().find('.submenu .btn-submenu-child.active').removeClass('active').next('ul.submenu-child').hide( 'slow' );
                $(this).removeClass('active').next('.submenu').hide( 'slow' );
                $(this).next('.mega-menu').hide('slow');
            }
        });
        $(this).toggleClass('active').next('.submenu').slideToggle(300);
        $(this).next('.mega-menu').slideToggle(300);
        e.stopImmediatePropagation();
        return false;
    });
    $(document).on('click', '#mobile-menu li .submenu .btn-submenu-child', function(e) {
        var originalElement = $(this)[0];
        $('#mobile-menu li .submenu .btn-submenu-child.active').each(function(){
            if(originalElement !=  $(this)[0]){
                $(this).removeClass('active').next('ul.submenu-child').hide( 'slow' );
            }
        });
        $(this).toggleClass('active').next('ul.submenu-child').slideToggle('slow' );
        e.stopImmediatePropagation();
        return false;
    });
    // END: Mega Menu 

// BEGIN: Back To top
 var backTotop = function(){
    var backtotop = $('.back-top');
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 500) {
            backtotop.addClass('btn-show');
        } else {
            backtotop.removeClass('btn-show');
        }
    });
    backtotop.on('click', function() {
        $('html, body').animate({ scrollTop: 0}, 900, 'easeInOutCirc');
        return false;
    });
}; 
// END: Back To top

// BEGIN: Document Ready
$(document).ready(function () {
  megaMenu();
  backTotop();
});


$(window).on('load', function() {
    preLoader();
  });

})(jQuery);