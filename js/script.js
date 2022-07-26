// projects cards filter






// projects cards focus
const links = document.querySelectorAll('.projects__link');
const cards = document.querySelectorAll('.projects__card');

links.forEach(link => {
    link.addEventListener('focus', () => {
        link.closest('.projects__card').classList.add('projects__card--focus');
    })
    link.addEventListener('blur', () => {
        link.closest('.projects__card').classList.remove('projects__card--focus');
    })
});

cards.forEach(card => card.addEventListener('focus', () => {
    cards.forEach(card => card.classList.remove('projects__card--focus'));
}));

// swiper slider posts
const slidesAmount = 3;

const postsSwiper = new Swiper('.posts__container', {
    simulateTouch: false,
    slidesPerView: slidesAmount,
    spaceBetween: 30,
    navigation: {
        nextEl: '.posts__btn--right',
        prevEl: '.posts__btn--left',
    },
});

const postsAmount = document.querySelectorAll('.posts__card').length;
const btnLeft = document.querySelector('.posts__btn--left');
const btnRight = document.querySelector('.posts__btn--right');

btnRight.classList.add('posts__btn--active');

postsSwiper.on('slideChange', function () {
    btnLeft.classList.add('posts__btn--active');
    btnRight.classList.add('posts__btn--active');
    if (this.activeIndex == 0) btnLeft.classList.remove('posts__btn--active');
    if (this.activeIndex == postsAmount - slidesAmount) btnRight.classList.remove('posts__btn--active');
});

// videoplayer
const video = document.querySelector('.videoplayer__video');
const presentationContainer = document.querySelector('.presentation__container');
const bigPlayBtn = document.querySelector('.presentation__play');
const videoplayerControls = document.querySelector('.videoplayer__controls');
const playBtn = document.querySelector('.videoplayer__play');
const stopBtn = document.querySelector('.videoplayer__stop');
const progress = document.querySelector('.progress');
const time = document.querySelector('.videoplayer__time');

    // play & pause video

bigPlayBtn.addEventListener('click', function () {
    video.play();
    presentationContainer.classList.add('presentation__container--hidden');
    videoplayerControls.classList.remove('videoplayer__controls--hidden');
});

playBtn.addEventListener('click', function () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

    // stop video

function stopVideo() {
    presentationContainer.classList.remove('presentation__container--hidden');
    videoplayerControls.classList.add('videoplayer__controls--hidden');
    video.load();
}

stopBtn.addEventListener('click', stopVideo);
video.addEventListener('ended', stopVideo);

    // timer

video.addEventListener('timeupdate', function () {
    progress.value = (video.currentTime / video.duration) * 100;
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime % 60);
    time.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
});

    // set progress

progress.addEventListener('change', function () {
    video.currentTime = (progress.value * video.duration) / 100;
});