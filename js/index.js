fetchRoute("/get-todos", "GET", true).then((res) => {
    res.todos.forEach(({ id, name, date, done, important }) => {
        document.getElementById(
            "main-container"
        ).innerHTML += `<div class="card blur-box ${
            important ? "important" : ""
        }">
                <span class="material-symbols-outlined checkbox" onclick="check(event, ${id}, '${name}', ${important}, ${done})">
                    ${done ? "check_box" : "check_box_outline_blank"}
                </span>
                <div class="card-content">
                    <div class="card-text">
                        ${name}
                    </div>
                    <div class="card-bottom-container">
                        <div class="bottom-buttons">
                            <div class="material-symbols-outlined ${
                                important ? "yellow-hover" : "red-hover"
                            }" onclick="toggle_important(event, ${id}, '${name}', ${important}, ${done})">
                                priority_high
                            </div>
                            <div class="material-symbols-outlined cyan-hover">edit</div>
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

function submitCreate(event) {
    event.preventDefault()
    const name = document.getElementById("name-input").value

    fetchRoute("/add-todo", "POST", true, {
        name: name,
        important: 0,
    })
        .then((response) => {
            if (!response.error) {
                window.location.href = "/"
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

const check = (event, id, name, important, done) => {
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
    }
}

const toggle_important = (event, id, name, important, done) => {
    if (event.target.innerHTML == "check_box") {
        fetchRoute("/update-todo", "PATCH", true, {
            id: id,
            done: done,
            name: name,
            important: 0,
        })
    } else {
        fetchRoute("/update-todo", "PATCH", true, {
            id: id,
            done: done,
            name: name,
            important: 1,
        })
    }
}
