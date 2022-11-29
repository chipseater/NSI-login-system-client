

function getToken() {
  return new Promise((resolve, reject) => {
    let token = ''
    const exp = Number(localStorage.getItem('expiration_date'))

    if (!exp) resolve(token)
    if (Date.now() < exp) {
      resolve(localStorage.getItem('access_token'))
    } else {
      fetchRoute('/get-token', useToken = false)
        .then((res) => {
          res
            .json()
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
          .then(res => resolve(res['access_token']))
          .catch(err => reject(err))
    }
  })

}

function fetchRoute(route, verb, data={}, useToken=true) {
  return new Promise((resolve, reject) => {
  })
}

function fetchWithToken(route, verb, data={}, useToken=true, token) {
  return new Promise((resolve, reject), () => {
      getToken()
      .then(token => {
        fetch(`
        https://5000-chipseater-nsiloginsyst-6ut2kpwvena.ws-eu77.gitpod.io${route}`, {
          method: verb,
          headers: {
            'Content-Type': 'application/json',
          },
          'Access-Control-Allow-Origin': '*',
          mode: 'cors',
          cache: 'default',
          'x-access-tokens': token,
          body: JSON.stringify(data)
        })
        .then((res) => {
          res
          .json()
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
    })
    .catch(err => console.error(err))
  })
}