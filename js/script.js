/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/heroSlider.js":
/*!***********************************!*\
  !*** ./src/modules/heroSlider.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (heroSlider);

/***/ }),

/***/ "./src/modules/mobileAccordion.js":
/*!****************************************!*\
  !*** ./src/modules/mobileAccordion.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// mobile accordion
function mobileAccordion() {
    const accordionButtons = document.querySelectorAll('.mobile__button');

    function setPaddingBottomAccordionWrapper() {
        const accordionTexts = document.querySelectorAll('.mobile__text');
        const maxHeightOfText =
            Math.max(...Array.from(accordionTexts)
                .map(accordionText => accordionText.scrollHeight));

        const accordionWrapper = document.querySelector('.mobile__advantages');
        accordionWrapper.style.paddingBottom = maxHeightOfText + 5 + 'px';
    }

    setPaddingBottomAccordionWrapper();

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
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mobileAccordion);

/***/ }),

/***/ "./src/modules/postsSlider.js":
/*!************************************!*\
  !*** ./src/modules/postsSlider.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postsSlider);

/***/ }),

/***/ "./src/modules/projectsFilter.js":
/*!***************************************!*\
  !*** ./src/modules/projectsFilter.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// projects cards filter
function projectsFilter() {
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
    });

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
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectsFilter);

/***/ }),

/***/ "./src/modules/projectsFocus.js":
/*!**************************************!*\
  !*** ./src/modules/projectsFocus.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// projects cards focus
function projectsFocus() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectsFocus);

/***/ }),

/***/ "./src/modules/videoplayer.js":
/*!************************************!*\
  !*** ./src/modules/videoplayer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// videoplayer
function videoplayer() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (videoplayer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_heroSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/heroSlider */ "./src/modules/heroSlider.js");
/* harmony import */ var _modules_projectsFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/projectsFilter */ "./src/modules/projectsFilter.js");
/* harmony import */ var _modules_projectsFocus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/projectsFocus */ "./src/modules/projectsFocus.js");
/* harmony import */ var _modules_postsSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/postsSlider */ "./src/modules/postsSlider.js");
/* harmony import */ var _modules_videoplayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/videoplayer */ "./src/modules/videoplayer.js");
/* harmony import */ var _modules_mobileAccordion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/mobileAccordion */ "./src/modules/mobileAccordion.js");







(0,_modules_heroSlider__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_projectsFilter__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_modules_projectsFocus__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_modules_postsSlider__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_modules_videoplayer__WEBPACK_IMPORTED_MODULE_4__["default"])();
(0,_modules_mobileAccordion__WEBPACK_IMPORTED_MODULE_5__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=script.js.map