fetchRoute('/get-todos', 'GET', true)
    .then(res => {
        console.log(res)
        res.todos.forEach(({ name, date }) => {
            document.getElementById('main-container').innerHTML += `<div class="card blur-box">
                <span class="material-symbols-outlined checkbox">
                    check_box_outline_blank
                </span>
                <div class="card-content">
                    <div class="card-text">
                        ${name}
                    </div>
                    <div class="card-bottom-container">
                        <div class="bottom-buttons">
                            <div class="material-symbols-outlined red-hover">delete</div>
                            <div class="material-symbols-outlined cyan-hover">edit</div>
                            <div class="material-symbols-outlined green-hover">add</div>
                        </div>
                        <div class="date">${date}</div>
                    </div>
                </div>
            </div>
            `

            // Enable checkbox checking
            ;[... document.getElementsByClassName('checkbox')].forEach((checkbox) => {
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
        })
    })
