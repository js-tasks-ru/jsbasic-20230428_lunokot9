import createElement from '../../assets/lib/create-element.js';

export default class Modal {

    #title = '';
    #body = '';

    elem = null;

    constructor() {
        this.elem = this.#render();
    }

    #render = () => {
        const element = createElement(this.#template());

        element.querySelector('.modal__close').addEventListener('click', this.close);
        document.addEventListener('keydown', this.pressEsc);

        return element;
    }

    #template = () => {
        return `
        <div class="modal">
            <div class="modal__overlay"></div>
            <div class="modal__inner">
                <div class="modal__header">
                    <button type="button" class="modal__close">
                        <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                    </button>
                    <h3 class="modal__title"></h3>
                </div>
                <div class="modal__body"></div>
            </div>
        </div>
        `;
    }

    open = () => {
        document.body.append(this.elem);
        document.body.classList.add('is-modal-open');
    }

    setTitle = (title) => {
        this.#title = title;

        this.elem.querySelector('.modal__title').textContent = this.#title;
    }

    setBody = (bodyElem) => {
        this.#body = bodyElem;

        this.elem.querySelector('.modal__body').innerHTML = '';
        this.elem.querySelector('.modal__body').append(this.#body);
    }

    pressEsc = (event) => {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    close = () => {
        this.elem.remove();
        document.body.classList.remove('is-modal-open');

        document.removeEventListener('keydown', this.pressEsc);
    }

}
