export default (to, from, next) => {
  if (localStorage.getItem('user') != null && localStorage.getItem('user').length > 0) {
    // verify with firebase or jwt
    console.log('logado')
    next()
  } else {
    console.log('nao logado')
    localStorage.removeItem('user')
    next('/auth/login')
  }
}