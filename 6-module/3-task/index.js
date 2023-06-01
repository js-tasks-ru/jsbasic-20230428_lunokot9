import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
    elem = null;
    slides = '';

    #currentSlide = 0;
    
    elementButtonPrev = null;
    elementButtonNext = null;

    constructor(slides) {
        this.slides = slides;

        this.elem = this.#render();
    }

    #render() {
        const element = createElement(this.#template());

        this.elementButtonPrev = element.querySelector('.carousel__arrow_left'),
        this.elementButtonNext = element.querySelector('.carousel__arrow_right');

        this.elementButtonPrev.style.display = 'none';
        
        this.elementButtonPrev.addEventListener('click', this.#goPrev);
        this.elementButtonNext.addEventListener('click', this.#goNext);

        const addProductButtons = element.querySelectorAll('.carousel__button');
        for (let button of Array.from(addProductButtons)) {
            button.addEventListener('click', this.#productAdd);
        }

        return element;
    }

    #goPrev = () => {
        this.#currentSlide--;
        this.elem.querySelector('.carousel__inner').style.transform = `translateX(-${this.#currentSlide*this.elem.querySelector('.carousel__slide').offsetWidth}px)`;

        if (this.#currentSlide == 0) {
            this.elementButtonPrev.style.display = 'none';
        }
        this.elementButtonNext.style.display = '';
    }

    #goNext = () => {
        this.#currentSlide++;
        this.elem.querySelector('.carousel__inner').style.transform = `translateX(-${this.#currentSlide*this.elem.querySelector('.carousel__slide').offsetWidth}px)`;

        if (this.#currentSlide == (this.slides.length - 1)) {
            this.elementButtonNext.style.display = 'none';
        }
        this.elementButtonPrev.style.display = '';
    }

    #productAdd = (event) => {
        this.elem.dispatchEvent(new CustomEvent("product-add", {
            detail: event.target.closest('.carousel__slide').dataset.id,
            bubbles: true
        }));
    }

    #template() {
        return `
        <div class="carousel">
            <div class="carousel__arrow carousel__arrow_right">
                <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </div>
            <div class="carousel__arrow carousel__arrow_left">
                <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
            </div>
            <div class="carousel__inner">
                ${this.slides.map(slide => `
                <div class="carousel__slide" data-id="${slide.id}">
                    <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                    <div class="carousel__caption">
                        <span class="carousel__price">€${Number(slide.price).toFixed(2)}</span>
                        <div class="carousel__title">${slide.name}</div>
                        <button type="button" class="carousel__button">
                            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                        </button>
                    </div>
                </div>
                `).join('\n')}
            </div>
        </div>
        `;
    }
}
