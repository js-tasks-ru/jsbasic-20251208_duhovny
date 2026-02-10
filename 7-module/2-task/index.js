import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement('div');
    this.elem.className = 'modal';
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem.innerHTML = `
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
    `;
    
    this.modalTitle = this.elem.querySelector('.modal__title');
    this.modalBody = this.elem.querySelector('.modal__body');
    this.modalClose = this.elem.querySelector('.modal__close');
  }

  addEventListeners() {
    this.modalClose.addEventListener('click', () => {
      this.close();
    });
    
    this.elem.querySelector('.modal__overlay').addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    document.body.append(this.elem);
    
    document.body.classList.add('is-modal-open');
    
    this.onKeyDown = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
    
    document.addEventListener('keydown', this.onKeyDown);
  }

  setTitle(title) {
    this.modalTitle.textContent = title;
  }

  setBody(node) {
    this.modalBody.innerHTML = '';
    
    this.modalBody.append(node);
  }

  close() {
    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }
    
    document.body.classList.remove('is-modal-open');
    
    if (this.elem.parentNode) {
      this.elem.remove();
    }
    
    if (this.onKeyDown) {
      document.removeEventListener('keydown', this.onKeyDown);
      this.onKeyDown = null;
    }
  }
}
