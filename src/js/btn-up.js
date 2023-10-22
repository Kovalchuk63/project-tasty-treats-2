const btnUp = document.querySelector('.btn-up');

var offset = 200;
$(window).on('load scroll', function () {
  if ($(window).scrollTop() > offset) {
    $('body').addClass('show');
    btnUp.style.cursor = 'pointer';
  } else {
    $('body').removeClass('show');
    btnUp.style.cursor = 'default';
  }
});
