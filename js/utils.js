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

function togglePopupVisibility(popup, overlay) {
    popup.classList.toggle('display-none')
    overlay.classList.toggle('display-none')
}

function displayPopup(title, message) {
    const popup = document.getElementById('popup')
    const overlay = document.getElementById('overlay')
    const close_btn = document.getElementById('close-btn')
    const popup_text = document.getElementById('popup-text')
    const popup_title = document.getElementById('popup-title')

    togglePopupVisibility(popup, overlay)

    popup_text.innerText = message
    popup_text.innerText = title

    close_btn.onclick = () => togglePopupVisibility(popup, overlay)
    overlay.onclick = () => togglePopupVisibility(popup, overlay)
}

function fomatDate(date_string) {
    date = new Date(date_string)
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('fr-FR', options)
}
