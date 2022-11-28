function submitLogin(event) {
    event.preventDefault()

    email = document.getElementById('email_input').value
    passwd = document.getElementById('passwd_input').value

    if (email == '' || passwd == '') {
        displayError("Veuillez remplir tout les champs")
        return
    }

    fetchRoute('/login', 'POST', {
        email: email,
        passwd: passwd,
    })
        .then(res => {
            localStorage.setItem("access_token", res['access_token'])
            localStorage.setItem("refresh_token", res['refresh_token'])
            localStorage.setItem("expiration_date", Date.now() + 550000)

            displaySuccess("Vous vous êtes bien connectés")

            setTimeout(() => {
                window.location.href = '/'
            }, 2000)
        })
        .catch(err => {
            console.error(err)
            displayError("Une erreure est survenue")
        })
}
