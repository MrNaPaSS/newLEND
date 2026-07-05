$(document).ready(() => {
  $(".cases__box").slick({
    infinite: true,
    slidesToShow: 2,
    arrows: true,
    // fade: true,
    prevArrow: ".btn-prev",
    nextArrow: ".btn-next",
    dots: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          fade: true,
        },
      },
    ],
  });
});
