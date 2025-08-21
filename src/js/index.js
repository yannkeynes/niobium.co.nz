
window.addEventListener('scroll', function () {
    const button = document.getElementById('float_buy_button');
    if (window.scrollY > 400) {
        button.style.display = 'block'; // show && window.scrollY < 3800
    } else {
        button.style.display = 'none';  // hidden
    }
});


$(document).ready(function(){
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

  $thumbs.click(function(){
    var index = $(this).index();
    $main.trigger("to.owl.carousel", [index, 300, true]);
  });

  $main.on("changed.owl.carousel", function(e){
    var index = e.item.index;

    $thumbs.removeClass("active").eq(index).addClass("active");

    var thumbContainer = $("#thumbs");
    var activeThumb = $thumbs.eq(index)[0];
    activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });

  $thumbs.eq(0).addClass("active");
});