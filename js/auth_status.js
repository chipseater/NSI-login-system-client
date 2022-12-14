not_logged_in_container = document.getElementById('not-logged-in')
logged_in_container = document.getElementById('logged-in')

token = localStorage.getItem('access_token')

if (token && token != 'undefined') {
  not_logged_in_container.style.display = 'none'
  logged_in_container.style.display = 'flex'
} else {
  not_logged_in_container.style.display = 'flex'
  logged_in_container.style.display = 'none'
}

function logout() {
  localStorage.setItem('access_token', '')
  localStorage.setItem('refresh_token', '')

  fetchRoute(
    '/logout',
    'POST',
    false,
    (data = {
      refresh_token: localStorage.getItem('refresh_token'),
    })
  )
    .then((_) => {
      displaySuccess('Vous êtes bien déconnectés')
    })
    .catch((err) => console.error(err))

  setTimeout(() => {
    window.location.href = '/'
  }, 500)
}
