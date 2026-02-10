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
    this.stepsElements = sliderSteps.querySelectorAll('span');
  }

  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      this.onSliderClick(event);
    });
    this.thumb.ondragstart = () => false;
    this.thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');
      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.onPointerUp);
    });
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  onSliderClick(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * this.segments;
    let newValue = Math.round(approximateValue);
    let valuePercents = newValue / this.segments * 100;
    this.updateSliderWithValue(newValue, valuePercents);
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  onPointerMove(event) {
    event.preventDefault();
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;
    let leftPercents = leftRelative * 100;
    let approximateValue = leftRelative * this.segments;
    let currentValue = Math.round(approximateValue);
    this.updateSliderDuringDrag(currentValue, leftPercents);
  }

  onPointerUp(event) {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;
    let approximateValue = leftRelative * this.segments;
    let newValue = Math.round(approximateValue);
    let valuePercents = newValue / this.segments * 100;
    this.updateSliderWithValue(newValue, valuePercents);
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  updateSlider() {
    let valuePercents = this.value / this.segments * 100;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    this.sliderValue.textContent = this.value;
    this.stepsElements.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
  }

  updateSliderDuringDrag(value, leftPercents) {
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
    this.sliderValue.textContent = value;
    this.stepsElements.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === value);
    });
  }

  updateSliderWithValue(newValue, valuePercents) {
    this.value = newValue;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    this.sliderValue.textContent = this.value;
    this.stepsElements.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
  }
}
