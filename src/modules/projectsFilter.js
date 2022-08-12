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

export default projectsFilter;