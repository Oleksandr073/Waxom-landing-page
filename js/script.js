// projects cards filter
const filterButtons = document.querySelectorAll('.projects__radio');
const projectsCards = document.querySelectorAll('.projects__card');
const loadButton = document.querySelector('.projects__button');
let visibleCardsAmount = 6;

function hideCards(cards) { // hides all cards after the 6th card
    for (let i = visibleCardsAmount; i < cards.length; i++) {
        cards[i].classList.add('projects__card--hide');
    }
    if (cards.length <= visibleCardsAmount) {
        loadButton.classList.add('projects__button--hide');
        document.querySelector('.projects__cards').style.marginBottom = '0';
    } else {
        loadButton.classList.remove('projects__button--hide');
        document.querySelector('.projects__cards').style.marginBottom = '40px';
    }
}

hideCards(projectsCards);

function showCards(cards) { // shows all cards
    cards.forEach(card => card.classList.remove('projects__card--hide'));
}

function filteredCards(allCards, activeFilter) { // returns the cards according to the selected filter
    let filteredCards = allCards;
    if (activeFilter != 'All') {
        filteredCards = Array.from(allCards)
            .filter(card => card.dataset.category == activeFilter);
    }
    return filteredCards;
}

loadButton.addEventListener('click', function () { // load button shows all cards or hides all cards after the 6th according to the selected filter
    const activeFilter = document.querySelector('.projects__radio:checked').dataset.filter;
    const cards = filteredCards(projectsCards, activeFilter);

    if (this.innerHTML == 'Load More') {
        showCards(cards);
        this.innerHTML = 'Show Less';
    } else {
        hideCards(cards);
        this.innerHTML = 'Load More';
    }
})

filterButtons.forEach(filterButton => { // filter buttons that show up to 6 cards according to the selected filter
    filterButton.addEventListener('change', function () {
        if (this.checked) {
            projectsCards.forEach(card => card.classList.add('projects__card--hide'));

            const activeFilter = this.dataset.filter;
            const cards = filteredCards(projectsCards, activeFilter);

            showCards(cards);
            hideCards(cards);
        }
    })
})

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
let slidesAmount = 3;

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

postsSwiper.on('slideChange', function() {
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

bigPlayBtn.addEventListener('click', () => {
    video.play();
    presentationContainer.classList.add('presentation__container--hidden');
    videoplayerControls.classList.remove('videoplayer__controls--hidden');
});

playBtn.addEventListener('click', () => {
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

video.addEventListener('timeupdate', () => {
    progress.value = (video.currentTime / video.duration) * 100;
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime % 60);
    time.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
});

    // set progress

progress.addEventListener('change', () => {
    video.currentTime = (progress.value * video.duration) / 100;
});

// mobile accordion
const accordionButtons = document.querySelectorAll('.mobile__button');

function hideContent(button) {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('title', 'Show content');
    button.nextElementSibling.setAttribute('aria-hidden', 'true');
}

function showContent(button) {
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('title', 'Hide content');
    button.nextElementSibling.setAttribute('aria-hidden', 'false');
}

function moveButtons(index) {
    for (let i = 0; i <= index; i++) {
        accordionButtons[i].style.transform = 'translateY(0)';
        accordionButtons[i].nextElementSibling.style.transform = 'translateY(0)';
    }
    let activeTextHeight = accordionButtons[index].nextElementSibling.getBoundingClientRect().height;
    for (let i = index + 1; i < accordionButtons.length; i++) {
        accordionButtons[i].style.transform = `translateY(${activeTextHeight}px)`;
        accordionButtons[i].nextElementSibling.style.transform = `translateY(${activeTextHeight}px)`;
    }
}

accordionButtons.forEach((accordionButton, index) => {
    accordionButton.addEventListener('click', function () {
        moveButtons(accordionButtons.length - 1);

        if (this.getAttribute('aria-expanded') == 'true') {
            hideContent(this);
            return;
        }

        accordionButtons.forEach(accordionButton => {
            hideContent(accordionButton);
        })

        showContent(this);
        moveButtons(index);
    })
})