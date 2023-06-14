import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
    steps = 5;
    value = 0;

    elem = null;
    thumb = null;

    constructor({ steps, value = 0 }) {
        this.steps = steps;
        this.value = value;

        this.elem = this.#render();
    }

    #render = () => {
        const element = createElement(this.#template());
        element.addEventListener('click', this.#setValue);

        this.thumb = element.querySelector('.slider__thumb');
        this.thumb.addEventListener('dragstart', (event) => {
            event.preventDefault();
        });
        this.thumb.addEventListener('pointerdown', this.#onPointerDown);

        return element;
    }

    #onPointerDown = () => {
        this.elem.classList.add('slider_dragging');
        document.addEventListener('pointermove', this.#onPointerMove);
        document.addEventListener('pointerup', this.#onPointerUp, {once: true});
    }

    #onPointerMove = (event) => {
        let left = event.pageX - this.elem.getBoundingClientRect().left;

        if (left > this.elem.getBoundingClientRect().width) left = this.elem.getBoundingClientRect().width;
        if (left < 0) left = 0;

        let leftPercent = left * 100 / this.elem.getBoundingClientRect().width,
            leftStep = Math.round(left * (this.steps - 1) / this.elem.getBoundingClientRect().width);

        this.#setView(leftPercent, leftStep);
    }

    #onPointerUp = (event) => {
        document.removeEventListener('pointermove', this.#onPointerMove);
        this.#setValue(event);
        this.elem.classList.remove('slider_dragging');
    }

    #template = () => {
        let sliderSteps = '';
        for (let i = 0; i < this.steps; i++) {
            if (i == this.value) {
                sliderSteps += '<span class="slider__step-active"></span>';
            } else {
                sliderSteps += '<span></span>';
            }
        }
        let percent = this.value * 100 / (this.steps - 1);

        return `
        <div class="slider">
            <div class="slider__thumb" style="left: ${percent}%;">
                <span class="slider__value">${this.value}</span>
            </div>
            <div class="slider__progress" style="width: ${percent}%;"></div>
            <div class="slider__steps">
                ${sliderSteps}
            </div>
        </div>
        `;
    }

    #setValue = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;

        if (left > this.elem.getBoundingClientRect().width) left = this.elem.getBoundingClientRect().width;
        if (left < 0) left = 0;

        let value = left / this.elem.getBoundingClientRect().width,
            valueStep = Math.round(value * (this.steps - 1)),
            valuePercent = valueStep * 100 / (this.steps - 1);

        this.value = valueStep;

        this.elem.dispatchEvent(new CustomEvent("slider-change", {
            detail: this.value,
            bubbles: true
        }));

        this.#setView(valuePercent, valueStep);
    }

    #setView = (percent, number) => {
        this.elem.querySelector('.slider__thumb').style.left = `${percent}%`;
        this.elem.querySelector('.slider__progress').style.width = `${percent}%`;
        this.elem.querySelector('.slider__value').textContent = number;

        let spanNow = this.elem.querySelector('.slider__steps span.slider__step-active'),
            spanNew = this.elem.querySelectorAll('.slider__steps span')[number];

        if (spanNow) spanNow.classList.remove('slider__step-active');
        if (spanNew) spanNew.classList.add('slider__step-active');
    }
}