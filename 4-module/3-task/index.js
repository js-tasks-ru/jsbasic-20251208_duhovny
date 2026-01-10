function highlight(table) {
    for (let row of table.tBodies[0].rows) {
    let statusCell = row.cells[3];
    if (statusCell.hasAttribute('data-available')) {
    row.classList.add(statusCell.dataset.available === 'true' ? 'available' : 'unavailable');
    } else {
      row.hidden = true;
    }
    let genderCell = row.cells[2];
    let gender = genderCell.textContent.trim();
        if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }
    let ageCell = row.cells[1];
    let age = parseInt(ageCell.textContent, 10);
        if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
