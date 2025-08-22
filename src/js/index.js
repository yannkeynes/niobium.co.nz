
window.addEventListener('scroll', function () {
  const button = document.getElementById('float_buy_button');
  if (window.scrollY > 400) {
    button.style.display = 'block'; // show && window.scrollY < 3800
  } else {
    button.style.display = 'none';  // hidden
  }
});


$(document).ready(function () {

  var $main = $("#main-carousel");
  var $thumbs = $("#thumbs .item");

  $main.owlCarousel({
    items: 1,
    nav: false,
    dots: false,
    loop: false,
    smartSpeed: 500,
    mouseDrag: true,
    touchDrag: true
  });

  $thumbs.click(function () {
    var index = $(this).index();
    $main.trigger("to.owl.carousel", [index, 300, true]);
  });

  $main.on("changed.owl.carousel", function (e) {
    var index = e.item.index;

    $thumbs.removeClass("active").eq(index).addClass("active");

    var thumbContainer = $("#thumbs");
    var activeThumb = $thumbs.eq(index)[0];
    activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });

  $thumbs.eq(0).addClass("active");



  $("#close_top_gift").click(function () {
    $("#top_gift").hide();
  });


  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
});





function updateCountdown() {
  const now = new Date();

  const end = new Date();
  end.setHours(24, 0, 0, 0);

  const diff = end - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "倒计时结束";
    clearInterval(timer);
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);


  document.getElementById("top_gift_main_r_item_h").innerText =
    `${padZero(hours)}`;

  document.getElementById("top_gift_main_r_item_m").innerText =
    `${padZero(minutes)}`;

  document.getElementById("top_gift_main_r_item_s").innerText =
    `${padZero(seconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}


$(function () {
  var $btn = $('#top_menu_button');
  var $btnClose = $('#top_menu_button_close');
  var $drawer = $('#top_menu_drawer');
  var $overlay = $('#top_menu_overlay');
  var $wrap = $('#top_menu_drawerWrap');
  var lastFocus = null;

  function openDrawer() {
    lastFocus = document.activeElement;
    $('body').addClass('top_menu_no-scroll');
    $wrap.addClass('top_menu_is-open');
    $btn.attr('aria-expanded', 'true');
    // focus into drawer
    requestAnimationFrame(function () {
      $drawer.focus();
    });
  }

  function closeDrawer() {
    $wrap.removeClass('top_menu_is-open');
    $btn.attr('aria-expanded', 'false');
    $('body').removeClass('top_menu_no-scroll');
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  // toggle open/close
  $btn.on('click', function () {
    if ($wrap.hasClass('top_menu_is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  $btnClose.on('click', function () {
    if ($wrap.hasClass('top_menu_is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // click overlay to close
  $overlay.on('click', closeDrawer);

  // ESC key close
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $wrap.hasClass('top_menu_is-open')) {
      closeDrawer();
    }
  });

  // focus trap inside drawer
  $drawer.on('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var $focusables = $drawer.find('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!$focusables.length) return;

    var first = $focusables[0];
    var last = $focusables[$focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
});