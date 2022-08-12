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

module.exports = projectsFocus;