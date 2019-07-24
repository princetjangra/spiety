/*========Loader js===========*/
$(window).on('load', function () {
	$(".loader").slideUp("slow");
	$("body").addClass("animate");
	$("html").addClass("animate");
	$("header").addClass("animate");
	$(".holder").addClass("animate");
	$(".bglines").addClass("animate");
});

/*========Menu js============*/
$(".menu-trigger").on('click', function () {
	$(".menu-trigger").toggleClass("mt-hide");
	$(".header").css("z-index", "999999");
	$(".pre-header").toggleClass("ph-hide");
});
$(".menu-btn").on('click', function () {
	$(this).toggleClass("close");
});
console.clear();

var app = function () {
	var body = void 0;
	var menu = void 0;
	var menuItems = void 0;

	var init = function init() {
		body = document.querySelector('body');
		menu = document.querySelector('.menu-icon');
		menuItems = document.querySelectorAll('.nav__list-item>a');

		applyListeners();
	};

	var applyListeners = function applyListeners() {
		menu.addEventListener('click', function () {
			return toggleClass(body, 'nav-active');
		});
	};

	if ($(window).width() < 992) {
		$('.nav__list-item>a').click(function () {
			$('body').removeClass('nav-active');
			$('.menu-trigger').removeClass('mt-hide');
			$('.menu-btn').removeClass('close');
		});

	}
	var toggleClass = function toggleClass(element, stringClass) {
		if (element.classList.contains(stringClass))
			element.classList.remove(stringClass);
		else

			element.classList.add(stringClass);
	};

	init();
}();

/*========Smooth Scroll========*/
function deco_line(){
    'use strict';
    var $window = $(window); //Window object
	decolines();
}

 jQuery(document).ready(function($) {
     'use strict'; 
      deco_line();
});
/*===========Decore Lines========*/
function decolines() {
	'use strict'; 
	var $markers = $('.js-decoline-marker');
	var $window = $(window);
	$window.scroll(function () {
		var scrollTop = $window.scrollTop();

		$markers.each(function () {
			if (!$(this).data('start-y'))
				$(this).data('start-y', $(this).position().top);

			$(this).css('top', $(this).data('start-y') + ((scrollTop / 100) * $(this).data('ratio')));
		});
	}).scroll();
}
/*===========project title scroll js========*/

$(document)
	.ready(function () {
		'use strict'; 
		//initialize paroller.js
		$('[data-paroller-factor]').paroller();
		//initialize paroller.js and set options for elements with .paroller class
		$('.paroller-example').paroller({

			factorMd: -0.4,
			factorLg: -0.5,
			factorXl: -0.6,
			factor: -0.4,
			type: 'foreground',
			direction: 'horizontal'
		});
	});
/*===========team js==========*/
$('.button').click(function () {
	'use strict'; 
	$(this).parents('.team-box').toggleClass('open').siblings().removeClass('open');
	
});
/*===========project slider js========*/
$(window).on('load', function () {
	'use strict'; 
	if ($.fn.owlCarousel) {
		if ($('.js-home-slider').length) {
			var $homeSlider = $('.js-home-slider');

			$homeSlider.on('initialized.owl.carousel', function (event) {
				initSliderCounters(1000);
			});

			$homeSlider.owlCarousel({
				items: 1,
				margin: 5,
				loop: true,
				nav: false,
				dots: true,
				dotsClass: 'owl-dots owl-dots--white',
				animateOut: 'fadeOut',
				mouseDrag: false,
				touchDrag: false,
				autoplay: false,
				autoplaySpeed: 800,
				navSpeed: 800,
				dotsSpeed: 800,
				dragEndSpeed: 800,
				autoplayTimeout: 7000,
				autoplayHoverPause: false,
				stagePadding: 0,
				navText: ['', ''],
				responsiveClass: true,
				responsive: {
					0: {
						items: 1
					},
					600: {
						items: 1
					},
					1000: {
						items: 1
					}
				}
			});

			$homeSlider.on('change.owl.carousel', function (event) {
				setTimeout(function () {
					if (event.namespace && event.property.name === 'position') {
						var target = event.relatedTarget.relative(event.property.value, true);
						$homeTabletSlider.owlCarousel('to', target, 300, true);
					}
				}, 450);

				setTimeout(function () {
					if (event.namespace && event.property.name === 'position') {
						var target = event.relatedTarget.relative(event.property.value, true);
						$homeMobileSlider.owlCarousel('to', target, 300, true);
					}
				}, 650);
			});

			$homeSlider.on('translated.owl.carousel', function (event) {
				initSliderCounters();
			});

			$homeSlider.on('translate.owl.carousel', function (event) {
				resetSliderCounters();
			});

			function initSliderCounters(delay) {

				var delay = (typeof delay !== 'undefined') ? delay : 100,
					$currentSlide = $homeSlider.find('.owl-item.active'),
					$currentSlideCounters = $('.js-counter-slider', $currentSlide);

				setTimeout(function () {
					counters($currentSlideCounters);
				}, delay);
			}

			function resetSliderCounters() {

				var $otherSlides = $homeSlider.find('.owl-item:not(.active)'),
					$otherSlidesCounters = $('.js-counter-slider', $otherSlides);

				setTimeout(function () {
					$otherSlidesCounters.each(function () {
						$(this).removeClass('counting').removeClass('finished').find('[data-value]').text('0');
					});
				}, 0);
			}
		}
	}


});

function counters($counters) {

	var $counters = (typeof $counters !== 'undefined') ? $counters : $('.js-counter');


	$counters.each(function () {
		var $counter = $(this);

		if (!$counter.hasClass('counting') && !$counter.hasClass('finished')) {
			var parentsOffset = 0;
			$counter.parents().each(function () {
				if ($(this).css('position') == 'relative' || $(this).css('position') == 'absolute') {
					var parentOffset = $(this).position().top;

					if (parentOffset > 0)
						parentsOffset += parentOffset;
					else
						return false;
				}
			});

			var $counterPlaceholder = $counter.find('[data-value]'),
				countTo = $counterPlaceholder.attr('data-value');

			$counter.addClass('counting');

			$({
				countNum: $counterPlaceholder.text()
			}).animate({
				countNum: countTo
			}, {
				duration: 2000,
				easing: 'swing',
				step: function () {
					$counterPlaceholder.text(Math.floor(this.countNum));
				},
				complete: function () {
					$counterPlaceholder.text(this.countNum);
					$counter.addClass('finished');
					$counter.removeClass('counting');
				}
			});

		}
	});
}
/*======= Review Slider ======*/
$(function () {
	'use strict'; 
	$('#reviews').slick({
		asNavFor: '#reviewers',
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		speed: 700,
		infinite: true,
		autoplay: false,
		autoplaySpeed: 3000,
		responsive: [{
				breakpoint: breakpoints.mobileWidth - 1,
				settings: {
					verticalSwiping: false,
					arrows: false,
				}
			},
			{
				breakpoint: breakpoints.tabletWidth - 1,
				settings: {
					verticalSwiping: false,
					arrows: false,
				}
			},
			{
				breakpoint: breakpoints.smallDesktopWidth - 1,
			},
			{
				breakpoint: breakpoints.mediumDesktopWidth - 1,
			},
			{
				breakpoint: breakpoints.largeDesktopWidth - 1,
			},
		]
	});

	$('#reviewers').slick({
		asNavFor: '#reviews',
		slidesToScroll: 1,
		slidesToShow: 6,
		swipe: true,
		arrows: false,
		centerMode: true,
		centerPadding: '0',
		focusOnSelect: true,
		speed: 700,
		infinite: true,
		responsive: [{
				breakpoint: breakpoints.mobileWidth - 1,
				settings: {
					slidesToShow: 3,
					centerMode: true,
				},
			},
			{
				breakpoint: breakpoints.tabletWidth - 1,
				settings: {
					slidesToShow: 3,
					centerMode: true,
				},
			},
		]
	});
});


window.breakpoints = {
	mobileWidth: 480,
	tabletWidth: 768,
	smallDesktopWidth: 1024,
	mediumDesktopWidth: 1366,
	largeDesktopWidth: 1600
};

/*===contact form js====*/
$(".contact-form-input input").focusout(function () {
	'use strict'; 
	if ($(this).val() != "") {
		$(this).parents(".contact-form-input").find("label").addClass("active");
	} else {
		$(this).parents(".contact-form-input").find("label").removeClass("active");
	}
});
$(".contact-form-input textarea").focusout(function () {
	'use strict'; 
	if ($(this).val() != "") {
		$(this).parents(".contact-form-input").find("label").addClass("active");
	} else {
		$(this).parents(".contact-form-input").find("label").removeClass("active");
	}
});

/*=======custom select======*/
$("select").each(function () {
	'use strict'; 
	var $this = $(this),
		numberOfOptions = $(this).children("option").length;

	$this.addClass("select-hidden");
	$this.wrap('<div class="select"></div>');
	$this.after('<div class="select-styled"></div>');

	var $styledSelect = $this.next("div.select-styled");
	$styledSelect.text(
		$this
		.children("option")
		.eq(0)
		.text()
	);

	var $list = $("<ul />", {
		class: "select-options"
	}).insertAfter($styledSelect);

	for (var i = 0; i < numberOfOptions; i++) {
		$("<li />", {
			text: $this
				.children("option")
				.eq(i)
				.text(),
			rel: $this
				.children("option")
				.eq(i)
				.val()
		}).appendTo($list);
	}

	var $listItems = $list.children("li");

	$styledSelect.click(function (e) {
		e.stopPropagation();
		$("div.select-styled.active")
			.not(this)
			.each(function () {
				$(this)
					.removeClass("active")
					.next("ul.select-options")
					.hide();
			});
		$(this)
			.toggleClass("active")
			.next("ul.select-options")
			.toggle();
	});

	$listItems.click(function (e) {
		e.stopPropagation();
		$styledSelect.text($(this).text()).removeClass("active");
		$this.val($(this).attr("rel"));
		$list.hide();
		//console.log($this.val());
	});

	$(document).click(function () {
		$styledSelect.removeClass("active");
		$list.hide();
	});
});

/*======= smooth scroll to section ScrollSpy==========*/
$('body').scrollspy({
	target: '#nav-main',
	offset: 72
});

$('.page-scroll').bind('click', function (event) {
	'use strict'; 
	var $anchor = $(this);
	if ($(window).width() > 768) {
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - 65
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	} else {
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - 50
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	}
	if ($(window).width() < 992) {
		$(".nav__list li a").click();
	}
});
/* ============= Portfolio Gallery =========*/
$(document).ready(function () {
	'use strict'; 
	$('.gal').isotope(function () {
		itemSelector: '.filter'
	});

	$('.portfolio-tab button').click(function () {
		$('.portfolio-tab button').removeClass('active');
		$(this).addClass('active');


		var selector = $(this).attr('data-filter');
		$('.gal').isotope({
			filter: selector
		})
		return false;
	});
});