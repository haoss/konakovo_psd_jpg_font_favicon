'use strict';

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery__item',
      type: 'image',
      gallery:{
        enabled: true,
        tCounter: '%curr% из %total%'
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  headerBtn();
  phoneMask();

  $('.main-slider__wrapper').slick({
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="ion-chevron-right"></i></button>',
    autoplay: true,
    autoplaySpeed: 2000
  });

  $('.services__list').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    prevArrow: '.services__btn-prev',
    nextArrow: '.services__btn-next',
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          centerMode: false
        }
      },
    ]
  });

  $('.about__club-carousel').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000
  });

  $('.gallery__carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    arrows: false,
    variableWidth: true
  });

  $('.one-service__carousel').slick({
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="ion-chevron-right"></i></button>',
  });

  $('.one-cottage__carousel').slick({
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="ion-chevron-right"></i></button>',
  });

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.feedback-form', function(){
    phoneMask();
  });
});

$(window).on('load', function() {
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() { });

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function headerBtn(){
  var btn = $('.header__btn');
  var mobile = $('.header__mobile');

  btn.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var _this = $(this);

    if (_this.hasClass('is-active')) {
      _this.removeClass('is-active');
      mobile.removeClass('is-active');
    } else {
      _this.addClass('is-active');
      mobile.addClass('is-active');
    }
  });

  mobile.on('click', function(e){
    e.stopPropagation();
  });

  $(document).on('click', function(){
    btn.removeClass('is-active');
    mobile.removeClass('is-active');
  });
}

function phoneMask() {
  var phone = $('.phone-mask');
  phone.each(function () {
    $(this).mask("+7 (999) 999-99-99");
  })
}