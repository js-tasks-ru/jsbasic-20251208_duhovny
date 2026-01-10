function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let textElement = document.getElementById('text');
  button.addEventListener('click', function() {
    textElement.hidden = !textElement.hidden;
  });
}
