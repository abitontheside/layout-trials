(function () {
    function moveSlider(event) {
        console.log(event);
        const slideset = event.target.parentNode;

        if (!slideset.classList.contains('slides-container')) {
            return;
        }

        const slidesContainer = slideset.querySelector('.slides');

        slidesContainer.classList.add('slideset-slide');
    }

    function setup() {
        const slidesets = document.querySelectorAll('.slides-container');

        for(const slideset of slidesets) {
            let button = document.createElement('button');
            button.type = 'button';
            button.textContent = 'nxt';
            button.className = 'slideset-button';
            slideset.appendChild(button);

            button.addEventListener('click', moveSlider);

            // transition listener
            slideset.querySelector('.slide').addEventListener('transitionend', function(event) {
                console.log(event);
                console.log('getComputedStyle', getComputedStyle(event.target)['order']);
                let timeout = setTimeout(function() {
                    slideset.parentNode.classList.remove('slideset-slide');
                    event.target.style.order = parseInt(getComputedStyle(event.target)['order'], 10) + 1;
                    clearTimeout(timeout);
                }, 10);
            });
        };
    }

    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
})();
