import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
    products = null;
    filters = {};

    constructor(products) {
        for (let product of products) {
            product.passFilter = true;
        }

        this.products = products;
        this.filters = {};

        this.elem = this.#render();
    }

    #render = () => {
        const element = createElement(`<div class="products-grid"></div>`);
        element.append(this.#template(this.products));
        return element;
    }

    #template = (filteredProducts) => {
        const gridWrapper = createElement(`
            <div class="products-grid__inner"></div>
        `);
        filteredProducts.map(product => gridWrapper.append(new ProductCard(product).elem));
        return gridWrapper;
    }

    updateFilter = (filters) => {
        for (let key in filters) {
            this.filters[key] = filters[key];
        }

        for (let product of this.products) {
            let passFilters = true;

            if (this.filters.noNuts) {
                if (product.nuts) passFilters = false;
            }

            if (this.filters.vegeterianOnly) {
                if (!product.vegeterian) passFilters = false;
            }

            if (this.filters.maxSpiciness !== undefined) {
                if (product.spiciness > this.filters.maxSpiciness) passFilters = false;
            }

            if (this.filters.category) {
                if (product.category != this.filters.category) passFilters = false;
            }

            product.passFilter = passFilters;
        }

        // console.log(this.products.filter(product => product.passFilter === true));

        this.elem.innerHTML = '';
        this.elem.append(this.#template(this.products.filter(product => product.passFilter === true)));
    }
}
