import React from "react"
import { Router } from "@reach/router" // comes with gatsby v2
import IndexPageTemplate from "../../templates/index-page"
import PrivateRoute from "./component/PrivateRoute"
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
// Get the aws resources configuration parameters
import aws_exports from '../../aws-exports'; // if you are using Amplify CLI
import { navigate } from 'gatsby';

Amplify.configure(aws_exports);

// remember everything in /app/* is dynamic now!
const App = () => {
  navigate('/');
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

export default withAuthenticator(App);