import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  #cartTopOffset = null;

  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetWidth) return;

    if (!this.#cartTopOffset) this.#cartTopOffset = this.elem.getBoundingClientRect().top + window.scrollY;
    let isMobile = document.documentElement.clientWidth <= 767;

    if (window.scrollY > this.#cartTopOffset && !isMobile) {
        // let cartLeftEdge = document.documentElement.clientWidth - document.querySelector('.container').getBoundingClientRect().right - 20 - this.elem.getBoundingClientRect().width,
            // cartRightEdge = 10;
        // this.elem.style.cssText = `position: fixed; top: 50px; right: ${Math.max(cartLeftEdge, cartRightEdge)}px; z-index: 500;`;

        let leftIndent = Math.min(document.querySelector('.container').getBoundingClientRect().right + 20, document.documentElement.clientWidth - this.elem.offsetWidth - 10);
        this.elem.style.cssText = `position: fixed; top: 50px; right: 10px; left: ${leftIndent}px; z-index: 500;`;
    } else {
        this.elem.style.cssText = '';
    }
    
  }
}
