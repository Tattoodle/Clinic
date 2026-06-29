//
// Author EasyPeasy.ie
//

///////// Loading Nano Bar  /////////
jQuery(document).ready(function($){

var nanobar = new Nanobar();
			nanobar.go(100);});


/////Animtate Fade to hide and make div appear - Add Style  .hideme{ opacity:0;} to css ////

$(document).ready(function() {

		/* Every time the window is scrolled ... */
		$(window).scroll( function(){

		/* Check the location of each desired element */
		$('.hideme').each( function(i){

			var bottom_of_object = $(this).offset().top + $(this).outerHeight();
			var bottom_of_window = $(window).scrollTop() + $(window).height();

			/* If the object is completely visible in the window, fade it it */
			if( bottom_of_window > bottom_of_object ){

						$(this).animate({'opacity':'1'},500);

			}

		});

	});

 });


 ///////// lazy Load For Divs Add class to div  /////////
 $('.loadit').each(function(i) {
   $(this).fadeOut(0).delay(1000*i).fadeIn(1850);
 });
