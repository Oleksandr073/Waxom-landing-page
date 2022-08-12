// hero slider
function heroSlider() {
    const heroSwiper = new Swiper('.hero', {
        simulateTouch: false,
        speed: 400,
        loop: true,
        navigation: {
            nextEl: '.hero__slide-button--right',
            prevEl: '.hero__slide-button--left',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });
}

module.exports = heroSlider;