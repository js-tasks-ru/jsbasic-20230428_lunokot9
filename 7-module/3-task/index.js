import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
    steps = 5;
    value = 0;

    elem = null;

    constructor({ steps, value = 0 }) {
        this.steps = steps;
        this.value = value;

        this.elem = this.#render();
    }

    #render = () => {
        const element = createElement(this.#template());
        element.addEventListener('click', this.#setValue);

        return element;
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
        let left = event.clientX - this.elem.getBoundingClientRect().left,
            value = left / this.elem.getBoundingClientRect().width,
            valueStep = Math.round(value * (this.steps - 1)),
            valuePercent = valueStep * 100 / (this.steps - 1);

        this.value = valueStep;

        this.elem.querySelector('.slider__thumb').style.left = `${valuePercent}%`;
        this.elem.querySelector('.slider__progress').style.width = `${valuePercent}%`;
        this.elem.querySelector('.slider__value').textContent = valueStep;

        this.elem.querySelector('.slider__steps span.slider__step-active').classList.remove('slider__step-active');
        this.elem.querySelectorAll('.slider__steps span')[valueStep].classList.add('slider__step-active');

        this.elem.dispatchEvent(new CustomEvent("slider-change", {
            detail: this.value,
            bubbles: true
        }));
    }
}
