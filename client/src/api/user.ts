export const createUser = (user: object) => {
  window.axios.post('http://localhost/user', user).then((response: object) => {
    console.log('success', response.data)
  }).catch((error: any) => {
    console.log('error', error)
  })
}
