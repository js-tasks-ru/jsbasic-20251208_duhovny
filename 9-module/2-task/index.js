import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let productsResponse = await fetch('products.json');
    let products = await productsResponse.json();

    let carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);

    let ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);

    let stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector('[data-slider-holder]').append(stepSlider.elem);

    let cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    let productsGrid = new ProductsGrid(products);
    document.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.querySelector('[data-products-grid-holder]').append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: '' // Начинаем с пустой категории (пока не выбрана)
    });

    document.body.addEventListener('product-add', (event) => {
      let productId = event.detail;
      let product = products.find(p => p.id === productId);
      
      if (product) {
        cart.addProduct(product);
      }
    });

    document.body.addEventListener('slider-change', (event) => {
      let value = event.detail;
      
      productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    document.body.addEventListener('ribbon-select', (event) => {
      let categoryId = event.detail;
      
      productsGrid.updateFilter({
        category: categoryId
      });
    });

    let nutsCheckbox = document.getElementById('nuts-checkbox');
    nutsCheckbox.addEventListener('change', () => {
      productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked
      });
    });

    let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
    vegeterianCheckbox.addEventListener('change', () => {
      productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked
      });
    });

    return Promise.resolve();
  }
}
