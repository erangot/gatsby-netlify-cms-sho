import React from "react"
import { Router } from "@reach/router" // comes with gatsby v2
import IndexPageTemplate from "../../templates/index-page"
import PrivateRoute from "./component/PrivateRoute"
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { I18n } from 'aws-amplify';
// Get the aws resources configuration parameters
import aws_exports from '../../aws-exports'; // if you are using Amplify CLI
import MyVideosPage from './component/MyVideosPage'
import DynamicRoute from './component/DynamicRoute'

Amplify.configure(aws_exports);

const authScreenLabels = {
    en: {
        'Sign Up': 'Create new account',
        'Sign Up Account': 'Create a new account on Sho.Co',
        'Sign in to your account': 'Sign in to your Sho.co account',
        'Create a new account': 'Create a new Sho.Co account'
    }
};

I18n.putVocabularies(authScreenLabels);
I18n.setLanguage('en');

// remember everything in /app/* is dynamic now!
const App = () => {
  // Move for home page
  // navigate('/');
  return (
      <Router>
        <PrivateRoute path="/app/myvideos" component={MyVideosPage} />
        <PublicRoute path="/app">
          <PrivateRoute path="/" component={IndexPageTemplate} />
        </PublicRoute>
        <DynamicRoute path="/app/:shortId"/>
      </Router>
  )
}

function PublicRoute(props) {
  return <div>{props.children}</div>
}

const MyTheme = {
  
}

export default withAuthenticator(App, false, [], null, MyTheme);;