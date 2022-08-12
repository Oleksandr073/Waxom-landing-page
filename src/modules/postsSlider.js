// swiper slider posts
function postsSlider() {
    const postsSwiper = new Swiper('.posts__container', {
        simulateTouch: false,
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
            nextEl: '.posts__btn--right',
            prevEl: '.posts__btn--left',
        },
    });
}

export default postsSlider;