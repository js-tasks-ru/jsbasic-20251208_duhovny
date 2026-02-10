export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segments = steps - 1;
    
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
    
    this.render();
    this.addEventListeners();
    this.updateSlider();
  }

  render() {
    let thumb = document.createElement('div');
    thumb.className = 'slider__thumb';
    let sliderValue = document.createElement('span');
    sliderValue.className = 'slider__value';
    sliderValue.textContent = this.value;
    thumb.append(sliderValue);
    let progress = document.createElement('div');
    progress.className = 'slider__progress';
    let sliderSteps = document.createElement('div');
    sliderSteps.className = 'slider__steps';
    
    for (let i = 0; i < this.steps; i++) {
      let step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      sliderSteps.append(step);
    }
    
    this.elem.append(thumb);
    this.elem.append(progress);
    this.elem.append(sliderSteps);
    this.sliderValue = sliderValue;
    this.thumb = thumb;
    this.progress = progress;
    this.sliderSteps = sliderSteps;
  }

  addEventListeners() {
     this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let approximateValue = leftRelative * this.segments;
      let newValue = Math.round(approximateValue);
      if (newValue !== this.value) {
        this.value = newValue;
        this.updateSlider();
        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        }));
      }
    });
  }

  updateSlider() {
    this.sliderValue.textContent = this.value;
    let valuePercents = this.value / this.segments * 100;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    
    let steps = this.sliderSteps.querySelectorAll('span');
    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
  }
}