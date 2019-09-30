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
        var slidesets = document.querySelectorAll('.slides-container');

        for(const slideset of slidesets) {
            let button = document.createElement('button');
            button.type = 'button';
            button.textContent = 'nxt';
            button.className = 'slideset-button';
            slideset.appendChild(button);

            button.addEventListener('click', moveSlider);
        };
    }

    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
})();
