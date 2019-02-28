// [WIP]  - Change to auth service connecting to server
// import netlifyIdentity from "netlify-identity-widget"

export const isBrowser = () => typeof window !== "undefined"
export const initAuth = () => {
  if (isBrowser()) {
    // window.netlifyIdentity = netlifyIdentity
    // // You must run this once before trying to interact with the widget
    // netlifyIdentity.init()
  }
}
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("shocoUser")
    ? JSON.parse(window.localStorage.getItem("shocoUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("shocoUser", JSON.stringify(user))

export const handleLogin = callback => {
  if (isLoggedIn()) {
    callback(getUser())
  } else {
    // Redirect to core with /app/ as the url to get back into 
  }
}

export const isLoggedIn = () => {
  if (!isBrowser()) return false
    // Check on server if there is a signed in user with this http only cookies from sho.co - sho.co signature
    // Curret User Endpoint on server
    const user = {};
    return !!user
}

export const logout = callback => {
//   netlifyIdentity.logout()
//   netlifyIdentity.on("logout", () => {
    setUser({})
//     callback()
//   })
}