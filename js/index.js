// Enable checkbox checking
[...document.getElementsByClassName('checkbox')].forEach((checkbox) => {
  checkbox.addEventListener('click', (event) => {
    if (event.target.innerHTML == 'check_box') {
      // Uncheck the box
      event.target.innerHTML = 'check_box_outline_blank'
    } else {
      // Check the box
      event.target.innerHTML = 'check_box'
    }
  })
})
