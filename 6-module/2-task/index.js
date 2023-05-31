import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
    elem = null;

    #name = '';
    #price = '';
    #category = '';
    #image = '';
    #id = '';

    constructor(product) {
        this.#name = product.name;
        this.#price = product.price;
        this.#category = product.category;
        this.#image = product.image;
        this.#id = product.id;

        this.elem = this.#render();
    }

    #render() {
        const element = createElement(this.#template());
        const elementButton = element.querySelector('.card__button');
        elementButton.addEventListener('click', this.#productAdd);
        return element;
    }

    #productAdd = () => {
        this.elem.dispatchEvent(new CustomEvent("product-add", {
            detail: this.#id,
            bubbles: true
        }));
    }

    #template() {
        return `<div class="card">
            <div class="card__top">
                <img src="/assets/images/products/${this.#image}" class="card__image" alt="product">
                <span class="card__price">€${Number(this.#price).toFixed(2)}</span>
            </div>
            <div class="card__body">
                <div class="card__title">${this.#name}</div>
                <button type="button" class="card__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
            </div>
        </div>`;
    }
}