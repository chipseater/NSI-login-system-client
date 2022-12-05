function displaySuccess(message) {
    const message_box = document.getElementById('message-box')
    message_box.innerHTML = message
    message_box.classList.toggle('green')
    message_box.classList.remove('red')
}

function displayError(message) {
    const message_box = document.getElementById('message-box')
    message_box.innerHTML = message
    message_box.classList.toggle('red')
    message_box.classList.remove('green')
}

function togglePopupVisibility(popup, overlay, popup_container) {
    popup.classList.toggle('display-none')
    popup_container.classList.toggle('display-none')
    overlay.classList.toggle('display-none')
}

function displayPopup(title) {
    const popup = document.getElementById('popup')
    const popup_container = document.getElementById('popup-container')
    const overlay = document.getElementById('overlay')
    const close_btn = document.getElementById('close-btn')
    const popup_title = document.getElementById('popup-title')
    const popup_content = document.getElementById('popup-content')

    togglePopupVisibility(popup, overlay, popup_container)

    popup_title.innerText = title

    close_btn.onclick = () => togglePopupVisibility(popup, overlay, popup_container)
    overlay.onclick = () => togglePopupVisibility(popup, overlay, popup_container)
}

function fomatDate(date_string) {
    date = new Date(date_string)
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('fr-FR', options)
}
