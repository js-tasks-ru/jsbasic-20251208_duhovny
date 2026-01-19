import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this._elem = null;
    this.render();
  }

  render() {
    const formattedPrice = `€${this.product.price.toFixed(2)}`;
    const imagePath = `/assets/images/products/${this.product.image}`;
    
    const cardHTML = `
      <div class="card">
        <div class="card__top">
          <img src="${imagePath}" class="card__image" alt="${this.product.name}">
          <span class="card__price">${formattedPrice}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="add">
          </button>
        </div>
      </div>
    `;
    
    this._elem = createElement(cardHTML);
    
    const button = this._elem.querySelector('.card__button');
    button.addEventListener('click', () => {
      this._elem.dispatchEvent(new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true
      }));
    });
  }

  get elem() {
    return this._elem;
  }
}