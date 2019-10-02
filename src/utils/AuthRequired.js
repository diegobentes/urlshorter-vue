export default (to, from, next) => {
  if (  localStorage.getItem('current_user') != 'undefined' 
        && localStorage.getItem('current_user') != null 
        && localStorage.getItem('current_user').length > 0  ) {
      next()  
  } else {
    localStorage.removeItem('current_user')
    localStorage.removeItem('token')
    next('/auth/login')
  }
}