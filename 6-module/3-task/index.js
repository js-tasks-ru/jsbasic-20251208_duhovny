import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.currentSlide = 0;
    this.elem = this.#createCarousel();
    this.#initCarousel();
  }

  #createCarousel() {
    const carouselHTML = `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => this.#createSlideHTML(slide)).join('')}
        </div>
      </div>
    `;
    
    return createElement(carouselHTML);
  }

  #createSlideHTML(slide) {
    const formattedPrice = `€${slide.price.toFixed(2)}`;
    const imagePath = `/assets/images/carousel/${slide.image}`;
    
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="${imagePath}" class="carousel__img" alt="${slide.name}">
        <div class="carousel__caption">
          <span class="carousel__price">${formattedPrice}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  #initCarousel() {
    this.#initControls();
    this.#addEventListeners();
    this.#updateControls();
  }

  #initControls() {
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.totalSlides = this.slides.length;
  }

  #addEventListeners() {
    this.arrowRight.addEventListener('click', () => {
      this.#nextSlide();
    });

    this.arrowLeft.addEventListener('click', () => {
      this.#prevSlide();
    });

    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__button')) {
        this.#onAddButtonClick(event);
      }
    });
  }

  #nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.#updateCarousel();
    }
  }

  #prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.#updateCarousel();
    }
  }

  #updateCarousel() {
    const slideWidth = this.carouselInner.offsetWidth;
    const offset = -this.currentSlide * slideWidth;
    this.carouselInner.style.transform = `translateX(${offset}px)`;
    this.#updateControls();
  }

  #updateControls() {
    this.arrowLeft.style.display = this.currentSlide === 0 ? 'none' : '';
    
    this.arrowRight.style.display = this.currentSlide === this.totalSlides - 1 ? 'none' : '';
  }

  #onAddButtonClick(event) {
    const slideElement = event.target.closest('.carousel__slide');
    const productId = slideElement.dataset.id;
    
    const customEvent = new CustomEvent('product-add', {
      detail: productId,
      bubbles: true
    });
    
    this.elem.dispatchEvent(customEvent);
  }
}