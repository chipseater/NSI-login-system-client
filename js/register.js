// To refactor
function submitRegistration(event) {
    event.preventDefault()

    message_box = document.getElementById('message-box')

    first_name = document.getElementById('first_name_input').value
    last_name = document.getElementById('last_name_input').value
    email = document.getElementById('email_input').value
    passwd = document.getElementById('passwd_input').value
    passwd_repeat = document.getElementById('passwd_repeat_input').value

    if (passwd != passwd_repeat) {
        console.error('Passwords do not match')
        message_box.innerHTML = "Les mots de passe ne correspondent pas"
        message_box.classList.toggle('red')
        message_box.classList.remove('green')
        return
    }

    if (first_name == '' || last_name == '' || email == '' || passwd == ''){
        console.error('Some fields are not fullfilled')
        message_box.innerHTML = "Veuillez remplir tout les champs"
        message_box.classList.toggle('red')
        message_box.classList.remove('green')
        return
    }

    fetchRoute('/register', 'POST', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        passwd: passwd,
    })
        .then(res => {
            console.log(res)

            localStorage.setItem("access_token", JSON.stringify(res['access_token']))
            localStorage.setItem("access_token", JSON.stringify(res['refresh_token']))

            message_box.innerHTML = "Vous avez bien été enregistré"
            message_box.classList.toggle('green')
            message_box.classList.remove('red')

            setTimeout(() => {
                window.location.href = '/'
            }, 3000)
        })
        .catch(err => {
            console.error(err)
            message_box.innerHTML = "Une erreure est survenue"
            message_box.classList.toggle('red')
            message_box.classList.remove('green')
        })
}
