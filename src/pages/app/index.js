import React from "react"
import { Router } from "@reach/router" // comes with gatsby v2
import IndexPageTemplate from "../../templates/index-page"
import PrivateRoute from "./component/PrivateRoute"

// remember everything in /app/* is dynamic now!
const App = () => {
  return (
      <Router>
        <PrivateRoute path="/app/about" component={AboutPage} />
        <PublicRoute path="/app">
          <PrivateRoute path="/" component={IndexPageTemplate} />
        </PublicRoute>
      </Router>
  )
}

function AboutPage() {
    return <div><h3>AboutPage</h3></div>
}

function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App