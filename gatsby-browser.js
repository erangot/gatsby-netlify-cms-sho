// gatsby-browser.js
/*exports.onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname)
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)

  window.previousPath  = prevLocation ? prevLocation.pathname : null;
}*/

import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider