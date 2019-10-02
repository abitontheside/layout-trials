(function () {
    function setNextSlide(trigger, currentSlide) {
        let nextSlide = currentSlide.nextElementSibling;

        if (nextSlide) {
            trigger.href = '#' + nextSlide.id;
            return;
        }

        trigger.href = '#' + currentSlide.parentNode.querySelector('.slide').id;
    }

    function moveSlider(event) {
        event.preventDefault();

        let hashval = event.target.getAttribute('href');
        let target = document.querySelector(hashval);
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
        history.pushState(null, null, hashval);

        setNextSlide(event.target, target);
    }

    function checkHash() {
        const hash = location.hash;

        if (!hash || hash === '#') {
            return;
        }

        let slideset = Array.prototype.filter.call(document.querySelectorAll('.slides-container'), function(element) {
            // return element.querySelector(hash).length;
            console.log('hash', hash);
            console.log('element', element);
        });

        console.log('has slideset', slideset);
    }

    function setup() {
        const slidesets = document.querySelectorAll('.slides-container');

        // for(const slideset of slidesets) {
        for (let [i, slideset] of Object.entries(slidesets)) {
            const slides = slideset.querySelectorAll('.slide');
            const slideIdPrefix = slideset.getAttribute('id') ? slideset.getAttribute('id') : 'slideset_' + i;

            if (Object.entries) {
                for (let [i, slide] of Object.entries(slides)) {
                    slide.setAttribute('id', slideIdPrefix + '_' + i);
                }
            }

            let anchor = document.createElement('a');
            anchor.href = '#' + slideIdPrefix + '_1'; // initial is 2nd slide
            anchor.textContent = 'nxt';
            anchor.className = 'slideset-button';
            slideset.appendChild(anchor);

            anchor.addEventListener('click', moveSlider);
        };

        checkHash();
    }

    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
})();
