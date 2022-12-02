function getToken() {
  return new Promise((resolve, reject) => {
    const exp = Number(localStorage.getItem('expiration_date'))
    refresh_token = localStorage.getItem('refresh_token')

    if (!exp) resolve('')
    if (refresh_token && refresh_token == 'undefined') resolve(null)
    if (Date.now() > exp) {
      data = {
        refresh_token: localStorage.getItem('refresh_token')
      }
      fetchRoute('/get-token', 'POST', false, data)
        .then((res) => {
          if (res.error) reject(res.error)
          localStorage.setItem('access_token', res['access_token'])
          localStorage.setItem('refresh_token', res['refresh_token'])
          localStorage.setItem('expiration_date', Date.now() + 550000)
          resolve(res['access_token'])
        })
        .catch((err) => reject(err))
      return
    }
    resolve(localStorage.getItem('access_token'))
  })
}

function fetchRoute(route, verb, useToken, data = {}) {
  console.log(useToken)
  return new Promise((resolve, reject) => {
    if (useToken && localStorage.getItem('refresh_token')) {
      getToken()
        .then((token) => {
          fetchWithToken(route, verb, data, token)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
        .catch((err) => console.error(err))
    } else {
      fetchWithToken(route, verb, (data = data))
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    }
  })
}

function fetchWithToken(route, verb, data = {}, token = null) {
  const fetchParams = {
    method: verb,
    headers: {
      'Content-Type': 'application/json',
    },
    'Access-Control-Allow-Origin': '*',
    mode: 'cors',
    cache: 'default',
  }

  if (token) {
    fetchParams['headers']['x-access-tokens'] = token
  }

  if (verb != 'HEAD' && verb != 'GET') {
    fetchParams['body'] = JSON.stringify(data)
  }

  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000${route}`, fetchParams)
      .then((res) => {
        res
          .json()
          .then((res) => resolve(res))
          .catch((err) => reject(err))
      })
      .catch((err) => reject(err))
  })
}
