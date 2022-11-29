not_logged_in_container = document.getElementById('not-logged-in')
logged_in_container = document.getElementById('logged-in')

token = localStorage.getItem('access_token')

if (token) {
    not_logged_in_container.style.display = 'none'
    logged_in_container.style.display = 'flex'
} else {
    not_logged_in_container.style.display = 'flex'
    logged_in_container.style.display = 'none'
}

fetchRoute('/', 'GET')
    .then(res => {
        console.log(res)
    })

function logout() {
    fetchRoute('/logout', 'POST', data={
        refresh_token: localStorage.getItem('refresh_token')
    })
        .then(_ => {
            localStorage.setItem('access_token', '')
            localStorage.setItem('refresh_token', '')
            
            displaySuccess('Vous êtes bien déconnectés')
            
            setTimeout(() => {
                window.location.href = '/'
            }, 500)
        })
        .catch(err => console.error(err))
}
