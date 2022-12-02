// Enable checkbox checking
[...document.getElementsByClassName('checkbox')].forEach(checkbox => {
    checkbox.addEventListener('click', (event) => {
        if (event.target.innerHTML == 'check_box') {
            event.target.innerHTML = 'check_box_outline_blank'
        } else {
            event.target.innerHTML = 'check_box'
        }
    })
})
