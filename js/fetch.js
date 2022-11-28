function fetchRoute(route, verb, data={}) {
  return new Promise((resolve, reject) => {
    fetch(`https://5000-chipseater-nsiloginsyst-qsj521wbgao.ws-eu77.gitpod.io${route}`, {
      method: verb,
      headers: {
        'Content-Type': 'application/json',
      },
      'Access-Control-Allow-Origin': '*',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(data)
    })
      .then((res) => {
        res
          .json()
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
      .catch(err => {
        reject(err)
      })
  })
}
