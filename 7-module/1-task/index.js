import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.className = 'ribbon';
    this.render();
    this.addEventListeners();
    this.updateButtons();
  }
  render() {
    let ribbonInner = document.createElement('div');
    ribbonInner.className = 'ribbon__inner';
    
    for (let category of this.categories) {
      let link = document.createElement('a');
      link.href = '#';
      link.className = 'ribbon__item';
      link.dataset.id = category.id;
      link.textContent = category.name;
      
      if (category.id === '') {
        link.classList.add('ribbon__item_active');
      }
      
      ribbonInner.append(link);
    }
    
    let arrowLeft = document.createElement('button');
    arrowLeft.className = 'ribbon__arrow ribbon__arrow_left';
    arrowLeft.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    
    let arrowRight = document.createElement('button');
    arrowRight.className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
    arrowRight.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    
    this.elem.append(arrowLeft);
    this.elem.append(ribbonInner);
    this.elem.append(arrowRight);
    
    this.ribbonInner = ribbonInner;
    this.arrowLeft = arrowLeft;
    this.arrowRight = arrowRight;
  }

  addEventListeners() {
    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });
    
    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });
    
    this.ribbonInner.addEventListener('scroll', () => {
      this.updateButtons();
    });
    
    this.ribbonInner.addEventListener('click', (event) => {
      let link = event.target.closest('.ribbon__item');
      
      if (!link) {
        return;
      }
      
      event.preventDefault();
      
      let categoryId = link.dataset.id;
      
      let allLinks = this.ribbonInner.querySelectorAll('.ribbon__item');
      for (let item of allLinks) {
        item.classList.remove('ribbon__item_active');
      }
      
      link.classList.add('ribbon__item_active');
      
      let customEvent = new CustomEvent('ribbon-select', {
        detail: categoryId,
        bubbles: true
      });
      
      this.elem.dispatchEvent(customEvent);
    });
  }

  updateButtons() {
    let scrollLeft = this.ribbonInner.scrollLeft;
    let scrollWidth = this.ribbonInner.scrollWidth;
    let clientWidth = this.ribbonInner.clientWidth;
    
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    
    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }
    
    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}
