function fetchTodos() {
    fetchRoute("/get-todos", "GET", true).then((res) => {
        document.getElementById(
            "main-container"
        ).innerHTML = ''
        res.todos.forEach(({ id, name, date, done, important }) => {
            document.getElementById(
                "main-container"
            ).innerHTML += `
                <div class="card blur-box ${important ? "important" : ""}">
                    <span class="material-symbols-outlined checkbox" onclick="check(event, ${id}, '${name}', ${important}, ${done})">
                        ${done ? "check_box" : "check_box_outline_blank"}
                    </span>
                    <div class="card-content">
                        <div id="${'card-name-' + id}" class="card-text">
                            ${name}
                        </div>
                        <div class="card-bottom-container">
                            <div class="bottom-buttons">
                                <div class="material-symbols-outlined ${
                                    important ? "yellow-hover" : "red-hover"
                                }" onclick="toggle_important(event, ${id}, '${name}', ${important}, ${done})">
                                    priority_high
                                </div>
                                <div class="material-symbols-outlined cyan-hover" onclick="toggle_edit_name('${'card-name-' + id}', ${id}, ${important}, ${done})">edit</div>
                            </div>
                            <div class="date">${fomatDate(date)}</div>
                        </div>
                    </div>
                </div>
            `
        })
        
        document.getElementById("main-container").innerHTML += `
        <div class="card blur-box plus-card" onclick="displayPopup('Ajouter une todo')">
        <div class="card-content">
        <div class="material-symbols-outlined">add</div>
        </div>
        </div>
        `
    })
}

function submitCreate(event) {
    event.preventDefault()
    const name = document.getElementById("name-input").value

    fetchRoute("/add-todo", "POST", true, {
        name: name,
        important: 0,
        done: 0
    })
        .then((response) => {
            const popup = document.getElementById('popup')
            const popup_container = document.getElementById('popup-container')
            const overlay = document.getElementById('overlay')

            togglePopupVisibility(popup, overlay, popup_container)
            if (!response.error) {
                return fetchTodos()
            }
            console.error(response.error)
        })
        .catch((err) => {
            console.error(err)
        })
}

function check(event, id, name, important, done) {
    if (event.target.innerHTML == "check_box") {
        // Uncheck the box
        event.target.innerHTML = "check_box_outline_blank"
    } else {
        // Check the box
        event.target.innerHTML = "check_box"
        fetchRoute("/update-todo", "PATCH", true, {
            id: id,
            done: 1,
            name: name,
            important: important,
        })
        fetchTodos()
    }
}

function toggle_important(event, id, name, important, done) {
    fetchRoute("/update-todo", "PATCH", true, {
        id: id,
        done: done,
        name: name,
        important: !important,
    })
    fetchTodos()

}

function edit_name(id, name, important, done) {
    fetchRoute("/update-todo", "PATCH", true, {
        id: id,
        done: done,
        name: name,
        important: important,
    })
    fetchTodos()

}

function toggle_edit_name(container_id, id, important, done) {
    const name_container = document.getElementById(container_id)

    name_container.innerHTML = `
        <form class="name-editor-container" onsubmit="">
            <input class="name-editor" id="name-editor-${id}" value="${name_container.innerText}" />
            <input class="name-submit-btn" id="name-editor-${id}-submit" value="Modifier" type="submit" />
        </form>
    `

    document.getElementById(`name-editor-${id}-submit`).onclick = (event) => {
        event.preventDefault()
        const input_field = document.getElementById(`name-editor-${id}`)
        const name = input_field.value
        edit_name(id, name, important, done)
        fetchTodos()
    }
}

fetchTodos()
