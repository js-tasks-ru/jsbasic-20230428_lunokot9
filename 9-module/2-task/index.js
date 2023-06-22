import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

    stepSlider = null;
    productGrid = null;
    ribbonMenu = null;
    cartIcon = null;
    cart = null;

    constructor() {

    }

    async render() {
        const carousel = new Carousel(slides);
        const carouselPlace = document.querySelector('[data-carousel-holder]');
        carouselPlace.append(carousel.elem);

        this.ribbonMenu = new RibbonMenu(categories);
        const ribbonMenuPlace = document.querySelector('[data-ribbon-holder]');
        ribbonMenuPlace.append(this.ribbonMenu.elem);

        this.stepSlider = new StepSlider({steps: 5, value: 3});
        const stepSliderPlace = document.querySelector('[data-slider-holder]');
        stepSliderPlace.append(this.stepSlider.elem);

        this.cartIcon = new CartIcon();
        const cartIconPlace = document.querySelector('[data-cart-icon-holder]');
        cartIconPlace.append(this.cartIcon.elem);

        this.cart = new Cart(this.cartIcon);

        await fetch('./products.json').then(response => {
            response.json().then(json => {
                this.productGrid = new ProductsGrid(json);
                const productGridPlace = document.querySelector('[data-products-grid-holder]');
                productGridPlace.innerHTML = '';
                productGridPlace.append(this.productGrid.elem);

                this.productGrid.updateFilter({
                    noNuts: document.getElementById('nuts-checkbox').checked,
                    vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
                    maxSpiciness: this.stepSlider.value,
                    category: this.ribbonMenu.value
                });

                document.body.addEventListener('product-add', (event) => {
                    let productToAdd = json.find(item => item.id == event.detail);
                    this.cart.addProduct(productToAdd);
                });

                document.body.addEventListener('slider-change', (event) => {
                    this.productGrid.updateFilter({
                        maxSpiciness: event.detail
                    });
                });

                document.body.addEventListener('ribbon-select', (event) => {
                    this.productGrid.updateFilter({
                        category: event.detail
                    });
                });

                const noNutsCheckbox = document.getElementById('nuts-checkbox');
                noNutsCheckbox.addEventListener('change', (event) => {
                    this.productGrid.updateFilter({
                        noNuts: event.currentTarget.checked
                    });
                });

                const veggieCheckbox = document.getElementById('vegeterian-checkbox');
                veggieCheckbox.addEventListener('change', (event) => {
                    this.productGrid.updateFilter({
                        vegeterianOnly: event.currentTarget.checked
                    });
                });
            });
        })
    }
}
