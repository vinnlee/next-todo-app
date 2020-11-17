import cookies from 'js-cookie'

export const getUserFromCookie = () => {
  const cookie = cookies.get('token')
  if (!cookie) return
  return JSON.parse(cookie)
}

export const setUserCookie = (user) => {
  cookies.set('token', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24
    // secure: true
  })
}

export const removeUserCookie = () => cookies.remove('token')
