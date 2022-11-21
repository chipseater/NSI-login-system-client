function fetchRoute(route, verb) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000${route}`, {
      method: verb,
      headers: {
        'Content-Type': 'application/json',
      },
      'Access-Control-Allow-Origin': '*',
      mode: 'cors',
      cache: 'default',
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
