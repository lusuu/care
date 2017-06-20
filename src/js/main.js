jQuery(function() {
  initGallery();
  initPostGallery();
  detectMobile();
  initFloatLabel();
  initFixedHeader();
  initAddClass();
  initUploadFiles();
});

function initGallery() {
  $('.gallery').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
}

function initPostGallery() {
  $slick_slider = $('.single-post-gallery');
  settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  $slick_slider.slick(settings);

  function removeGalleryOnDesktop() {
    if ($(window).width() > 767) {
      if ($slick_slider.hasClass('slick-initialized')) {
        $slick_slider.slick('unslick');
      }
      return
    }

    if (!$slick_slider.hasClass('slick-initialized')) {
      return $slick_slider.slick(settings);
    }
  }

  removeGalleryOnDesktop();

  $(window).on('resize', function() {
    removeGalleryOnDesktop();
  });
}

function detectMobile () { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    $('body').addClass('mobile');
  }
}

function initFloatLabel() {
  $('.form-control').on('focus blur', function (e) {
    $(this).parents('.input-field').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
  }).trigger('blur');
}

function initFixedHeader() {
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var navbar = $(".navbar");

    if ($('body').hasClass('template-home')) {
      if (scroll >= 200) {
        navbar.addClass("navbar-fixed-top");
      } else {
          navbar.removeClass("navbar-fixed-top");
      }
    }
  });
}

function initAddClass() {
  var menu = $('.navbar-collapse')
  $('.navbar-toggle').click(function() {
    if ($("html").hasClass("navbar-opened")) {
      setTimeout(function() {
        $("html").removeClass("navbar-opened");
      }, 400);
    } else {
      $("html").addClass("navbar-opened");
    }
  });
}

$.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
  var fileIdCounter = 0;

  this.closest(".input-file-holder").change(function (evt) {
    var output = [];

    for (var i = 0; i < evt.target.files.length; i++) {
      fileIdCounter++;
      var file = evt.target.files[i];
      var fileId = sectionIdentifier + fileIdCounter;

      filesToUpload.push({
        id: fileId,
        file: file
      });
      var removeLink = "<span class=\"remove\"><i class=\"fa fa-times-circle\" aria-hidden=\"true\"></i></span>";
      output.push("<div class=\"file\">", escape(file.name), removeLink, "</div> ");
    };
    $(this).append(output.join(""));
    evt.target.value = null;
  });

  $(this).on("click", ".remove", function (e) {
    e.preventDefault();

    var fileId = $(this).parent().children("a").data("fileid");
    for (var i = 0; i < filesToUpload.length; ++i) {
      if (filesToUpload[i].id === fileId)
        filesToUpload.splice(i, 1);
    }

    $(this).parent().remove();
  });

  return this;
};

function initUploadFiles() {
  var filesToUpload = [];
  var files1Uploader = $(".input-file-holder").fileUploader(filesToUpload, "upload-file");
}


// Grayscale Images fix for IE10-IE11
var GrayScaleFix = (function() {
  var needToFix = /(MSIE 10)|(Trident.*rv:11\.0)/.test(navigator.userAgent);

  function replaceImage(image) {
    var tmpImage = new Image();
    tmpImage.onload = function() {
      var imgWrapper = document.createElement('span'),
        svgTemplate = 
        '<svg xmlns="http://www.w3.org/2000/svg" id="svgroot" viewBox="0 0 '+tmpImage.width+' '+tmpImage.height+'" width="100%" height="100%">' +
          '<defs>' +
          '<filter id="gray">' +
            '<feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />' +
          '</filter>' +
          '</defs>' +
          '<image filter="url(&quot;#gray&quot;)" x="0" y="0" width="'+tmpImage.width+'" height="'+tmpImage.height+'" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+tmpImage.src+'" />' +
        '</svg>';
      
      imgWrapper.innerHTML = svgTemplate;
      imgWrapper.className = 'grayscale-fix';
      image.parentNode.insertBefore(imgWrapper, image);

      image.style.cssText += 'visibility:hidden;display:block';
      imgWrapper.querySelector('svg').style.position = 'absolute';
      imgWrapper.style.cssText = 'display:inline-block;position:relative;';
      imgWrapper.appendChild(image);
    };
    tmpImage.src = image.src;
  }

  function replaceAll() {
    var images = document.querySelectorAll('img.grayscale');
    for(var i = 0; i < images.length; i++) {
      replaceImage(images[i]);
    }
  }

  if(needToFix) {
    document.addEventListener('DOMContentLoaded', replaceAll);
  }

  return {
    replace: replaceImage,
    refresh: replaceAll
  };
}());