function submitRegistration() {
    console.log('Hello World')
    fetchRoute('/register', 'POST')
        .then(res => {
            
        })
        .catch(err => {

        })
}
