// mobile accordion
function mobileAccordion() {
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
    });
}

export default mobileAccordion;