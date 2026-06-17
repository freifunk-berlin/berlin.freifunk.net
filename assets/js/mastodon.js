import Swiper from 'swiper/swiper-bundle.min.mjs'

new Swiper('.swiper', { // eslint-disable-line no-new
  loop: false,
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + '</span>'
    }
  },
  breakpoints: {
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
})
