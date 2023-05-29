function initCarousel() {
    const carouselButtonPrev = document.querySelector('.carousel__arrow_left'),
        carouselButtonNext = document.querySelector('.carousel__arrow_right'),
        carouselInner = document.querySelector('.carousel__inner'),
        carouselSlideWidth = document.querySelector('.carousel__slide').offsetWidth,
        carouselSlidesCount = document.querySelectorAll('.carousel__slide').length;

    let slideNumber = 0;

    carouselButtonPrev.style.display = 'none';

    carouselButtonNext.addEventListener('click', function() {
        slideNumber++;
        carouselInner.style.transform = `translateX(-${slideNumber*carouselSlideWidth}px)`;

        if (slideNumber == (carouselSlidesCount - 1)) {
            this.style.display = 'none';
        }
        carouselButtonPrev.style.display = '';
    });
    
    carouselButtonPrev.addEventListener('click', function() {
        slideNumber--;
        carouselInner.style.transform = `translateX(-${slideNumber*carouselSlideWidth}px)`;

        if (slideNumber == 0) {
            this.style.display = 'none';
        }
        carouselButtonNext.style.display = '';
    });
}
