// gatsby-browser.js
import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider

/*exports.onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname)
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)

  window.previousPath  = prevLocation ? prevLocation.pathname : null;
}*/