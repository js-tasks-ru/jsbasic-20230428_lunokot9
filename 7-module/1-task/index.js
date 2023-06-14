import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
    categories = null;

    elementButtonPrev = null;
    elementButtonNext = null;

    elementInnerRibbon = null;

    constructor(categories) {
        this.categories = categories;

        this.elem = this.#render();
    }

    #render = () => {
        const element = createElement(this.#template());

        this.elementInnerRibbon = element.querySelector('.ribbon__inner');

        this.elementInnerRibbon.addEventListener('scroll', this.#scrollInner);

        this.elementButtonPrev = element.querySelector('.ribbon__arrow_left');
        this.elementButtonNext = element.querySelector('.ribbon__arrow_right');

        this.elementButtonNext.classList.add('ribbon__arrow_visible');
        
        this.elementButtonPrev.addEventListener('click', this.#scrollPrev);
        this.elementButtonNext.addEventListener('click', this.#scrollNext);

        const ribbonItems = element.querySelectorAll('.ribbon__item');
        for (let item of Array.from(ribbonItems)) {
            item.addEventListener('click', this.#itemClick);
        }

        return element;
    }

    #template = () => {
        return `
        <div class="ribbon">
            <button class="ribbon__arrow ribbon__arrow_left">
                <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>

            <nav class="ribbon__inner">
                ${this.categories.map((category, index) => `
                    <a href="#" class="ribbon__item ${(index == 0)?'ribbon__item_active':''}" data-id="${category.id}">${category.name}</a>
                `).join('\n')}
            </nav>

            <button class="ribbon__arrow ribbon__arrow_right">
                <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>
        </div>
        `;
    }

    #scrollPrev = () => {
        this.elementInnerRibbon.scrollBy(-350, 0);
    }

    #scrollNext = () => {
        this.elementInnerRibbon.scrollBy(350, 0);
    }

    #scrollInner = () => {
        let scrollLeft = this.elementInnerRibbon.scrollLeft,
            scrollRight = this.elementInnerRibbon.scrollWidth - scrollLeft - this.elementInnerRibbon.clientWidth;

        (scrollLeft < 1) ? this.elementButtonPrev.classList.remove('ribbon__arrow_visible') : this.elementButtonPrev.classList.add('ribbon__arrow_visible');

        (scrollRight < 1) ? this.elementButtonNext.classList.remove('ribbon__arrow_visible') : this.elementButtonNext.classList.add('ribbon__arrow_visible');
    }

    #itemClick = (event) => {
        event.preventDefault();

        this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        event.target.classList.add('ribbon__item_active');

        this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
            detail: event.target.dataset.id,
            bubbles: true
        }));
    }
}
