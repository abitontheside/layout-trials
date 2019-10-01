(function () {
    function moveSlider(event) {
    //     console.log(event);
    //     const slideset = event.target.parentNode;

    //     if (!slideset.classList.contains('slides-container')) {
    //         return;
    //     }

    //     const slidesContainer = slideset.querySelector('.slides');

    //     slidesContainer.classList.add('slideset-slide');

        let hashval = event.target.getAttribute('href')
        let target = document.querySelector(hashval)
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        history.pushState(null, null, hashval)
        event.preventDefault()
    }

    function setup() {
        const slidesets = document.querySelectorAll('.slides-container');

        for(const slideset of slidesets) {
            const slides = slideset.querySelectorAll('.slide');
            const slideIdPrefix = slideset.getAttribute('id') ? slideset.getAttribute('id') : 'slideset_' + Date.now();

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

    //         let button = document.createElement('button');
    //         button.type = 'button';
    //         button.textContent = 'nxt';
    //         button.className = 'slideset-button';
    //         slideset.appendChild(button);

    //         button.addEventListener('click', moveSlider);

    //         // transition listener
    //         slideset.querySelector('.slide').addEventListener('transitionend', function(event) {
    //             console.log(event);
    //             console.log('getComputedStyle', getComputedStyle(event.target)['order']);
    //             let timeout = setTimeout(function() {
    //                 slideset.parentNode.classList.remove('slideset-slide');
    //                 event.target.style.order = parseInt(getComputedStyle(event.target)['order'], 10) + 1;
    //                 clearTimeout(timeout);
    //             }, 10);
    //         });
        };
    }

    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
})();
