function submitRegistration(event) {
    event.preventDefault()

    first_name = document.getElementById('first_name_input').value
    last_name = document.getElementById('last_name_input').value
    email = document.getElementById('email_input').value
    passwd = document.getElementById('passwd_input').value
    passwd_repeat = document.getElementById('passwd_repeat_input').value

    if (passwd != passwd_repeat) {
        displayError("Les mots de passe ne correspondent pas")
        return
    }

    if (first_name == '' || last_name == '' || email == '' || passwd == '') {
        displayError("Veuillez remplir tout les champs")
        return
    }

    fetchRoute('/register', 'POST', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        passwd: passwd,
    })
        .then(res => {
            localStorage.setItem("access_token", res['access_token'])
            localStorage.setItem("refresh_token", res['refresh_token'])
            localStorage.setItem("expiration_date", Date.now() + 550000)

            displaySuccess("Vous avez bien été enregistré")

            setTimeout(() => {
                window.location.href = '/'
            }, 500)
        })
        .catch(err => {
            console.error(err)
            displayError("Une erreure est survenue")
        })
}
