function displaySuccess(message) {
    message_box = document.getElementById('message-box')
    message_box.innerHTML = message
    message_box.classList.toggle('green')
    message_box.classList.remove('red')
}

function displayError(message) {
    message_box = document.getElementById('message-box')
    message_box.innerHTML = message
    message_box.classList.toggle('red')
    message_box.classList.remove('green')
}
