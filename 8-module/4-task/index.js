import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(item => 
      item.product.id === product.id
    );

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
    return cartItem;
  }
ф
  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => 
      item.product.id === productId
    );

    if (!cartItem) {
      return;
    }

    cartItem.count += amount;

    if (cartItem.count <= 0) {
      let index = this.cartItems.findIndex(item => 
        item.product.id === productId
      );
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    }

    this.onProductUpdate(cartItem);
    return cartItem;
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => 
      total + item.count, 0
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => 
      total + (item.product.price * item.count), 0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    
    const modalBody = document.createElement('div');
    
    this.cartItems.forEach(item => {
      const productElement = this.renderProduct(item.product, item.count);
      modalBody.append(productElement);
    });
    
    const orderForm = this.renderOrderForm();
    modalBody.append(orderForm);
    
    this.modal.setBody(modalBody);
    
    this.addModalEventListeners(modalBody);
    
    this.modal.open();
  }
  
  addModalEventListeners(modalBody) {
    modalBody.addEventListener('click', (event) => {
      const button = event.target.closest('.cart-counter__button');
      if (!button) return;
      
      const productElement = button.closest('[data-product-id]');
      const productId = productElement.dataset.productId;
      
      if (button.classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(productId, -1);
      } else if (button.classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(productId, 1);
      }
    });
    
    const form = modalBody.querySelector('.cart-form');
    form.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
        if (this.modal && document.body.classList.contains('is-modal-open')) {
      const modalBody = this.modal.elem.querySelector('.modal__body');
      
      if (this.isEmpty()) {
        this.modal.close();
        return;
      }
      
      const productElement = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"]`);
      
      if (!cartItem.count && productElement) {
        productElement.remove();
      }
      
      const totalPriceElement = modalBody.querySelector('.cart-buttons__info-price');
      if (totalPriceElement) {
        totalPriceElement.textContent = `€${this.getTotalPrice().toFixed(2)}`;
      }
      
      if (productElement && cartItem.count > 0) {
        const productCount = productElement.querySelector('.cart-counter__count');
        const productPrice = productElement.querySelector('.cart-product__price');
        
        if (productCount) {
          productCount.textContent = cartItem.count;
        }
        
        if (productPrice) {
          const itemTotalPrice = cartItem.product.price * cartItem.count;
          productPrice.textContent = `€${itemTotalPrice.toFixed(2)}`;
        }
      }
    }

    this.cartIcon.update(this);

    this.cartIcon.update(this);
  }

  onSubmit(event) {
     event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  
  submitButton.classList.add('is-loading');
  
  const formData = new FormData(form);
  
  fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        throw new Error('Ошибка при отправке заказа');
      }
    })
    .then(() => {
      this.modal.setTitle('Success!');
      
      this.cartItems = [];
      this.cartIcon.update(this);
      
      const successContent = createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We'll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `);
      
      this.modal.setBody(successContent);
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке заказа. Попробуйте еще раз.');
    })
    .finally(() => {
      submitButton.classList.remove('is-loading');
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

