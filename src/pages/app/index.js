import React from "react"
import { Router } from "@reach/router" // comes with gatsby v2
import IndexPageTemplate from "../../templates/index-page"
import PrivateRoute from "./component/PrivateRoute"
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { I18n } from 'aws-amplify';
// Get the aws resources configuration parameters
import aws_exports from '../../aws-exports'; // if you are using Amplify CLI
import { navigate } from 'gatsby';

Amplify.configure(aws_exports);

const authScreenLabels = {
    en: {
        'Sign Up': 'Create new account',
        'Sign Up Account': 'Create a new account on Sho.Co',
        'Sign in to your account': 'Sign in to your Sho.co account',
        'Create a new account': 'Create a new Sho.Co account'
    }
};

I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);

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

const MyTheme = {
  
}

export default withAuthenticator(App, true, [], null, MyTheme);;