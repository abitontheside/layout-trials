(function () {
    function getIcon() {
        const svgNS = 'http://www.w3.org/2000/svg';
        let svg = document.createElementNS(svgNS, 'svg');
        let polygon = document.createElementNS(svgNS, 'polygon');
        let text = document.createElementNS(svgNS, 'text');
        let textNode = document.createTextNode('Next');

        svg.setAttributeNS(null, 'width', '48');
        svg.setAttributeNS(null, 'height', '48');
        svg.setAttributeNS(null, 'viewBox', '0 0 24 24');
        svg.setAttributeNS(null, 'fill', 'currentColor');
        polygon.setAttributeNS(null, 'points', '5 3 19 12 5 21 5 3');
        text.appendChild(textNode);
        svg.appendChild(text);
        svg.appendChild(polygon);

        return svg;
    }
    
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

            anchor.appendChild(getIcon());
            anchor.className = 'slideset-button';
            slideset.appendChild(anchor);

            anchor.addEventListener('click', moveSlider);
        };
    }

    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
})();
