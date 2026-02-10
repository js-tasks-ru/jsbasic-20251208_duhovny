import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement('div');
    this.elem.className = 'products-grid';
    this.inner = document.createElement('div');
    this.inner.className = 'products-grid__inner';
    this.elem.append(this.inner);
    this.renderProducts(products);
  }

  renderProducts(productsToShow) {
    this.inner.innerHTML = '';
    productsToShow.forEach(product => {
      const productCard = new ProductCard(product);
      this.inner.append(productCard.elem);
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const filteredProducts = this.products.filter(product => {
      return this.checkProductAgainstFilters(product);
    });
    
    this.renderProducts(filteredProducts);
  }

  checkProductAgainstFilters(product) {
    if (this.filters.noNuts === true) {
      if (product.nuts === true) {
        return false;
      }
    }
    
    if (this.filters.vegeterianOnly === true) {
      if (product.vegeterian !== true) {
        return false;
      }
    }
    
    if (this.filters.maxSpiciness !== undefined) {
      const productSpiciness = product.spiciness || 0;
      if (productSpiciness > this.filters.maxSpiciness) {
        return false;
      }
    }
    
    if (this.filters.category && this.filters.category !== '') {
      if (product.category !== this.filters.category) {
        return false;
      }
    }
    
    return true;
  }
}
