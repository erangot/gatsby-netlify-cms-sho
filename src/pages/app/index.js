import { Router } from "@reach/router" // comes with gatsby v2
import IndexPageTemplate from "../../templates/index-page"
import PrivateRoute from "./component/PrivateRoute"
import MyVideosPage from './component/MyVideosPage'
import DynamicRoute from './component/DynamicRoute'

import React from "react"
import { Authenticator } from 'aws-amplify-react';
import Amplify, { I18n } from 'aws-amplify';
import aws_exports from '../../aws-exports';

import Header from '../../components/Navbar';
import Footer from '../../components/Footer';

import './custom-aws-login/login.scss';
import { AuthPiece, Greetings } from "aws-amplify-react/dist/Auth";

Amplify.configure(aws_exports);

const authScreenLabels = {
  en: {
    'Sign Up': 'Create new account',
    'Sign Up Account': 'Create a new account on Sho.Co',
    'Sign in to your account': `Please sign in to your Sho.co account to continue`,
    'Create a new account': ' '
  }
};

I18n.putVocabularies(authScreenLabels);
I18n.setLanguage('en');

const MyTheme = {
  button: { 'backgroundColor': '#6e81ad', 'minWidth': '100%' },
  a: { 'color': '#6e81ad' },
  input: { 'borderRadius': 0 },
  formSection: { 'borderRadius': 0, 'boxShadow': 'none', 'clipPath': 'polygon(0 2%, 100% 0, 100% 100%, 0 98%)' },
  sectionHeader: { 'fontSize': '15px' },
  sectionFooter: { 'display': 'block' },
  formContainer: { 'marginTop': '20px' }
}

class App extends AuthPiece {

  state = {
    titles: {
      'signIn': 'Sign in to your Sho.co account',
      'signUp': 'Create a new Sho.co account',
      'forgotPassword': 'Reset Password'
    },
    message: '',
    authState: ''
  }

  render() {
    return (
      <>
        {this.state.authState !== 'signedIn' &&
          <>
            <Header />
            <div className='login-container'>
              <h1>{this.state.message}</h1>

              <Authenticator
                theme={MyTheme}
                hide={[Greetings]}
                onStateChange={
                  state => {
                    this.setState({ message: this.state.titles[state], authState: state })
                  }}
              />
            </div>
            <Footer />
          </>
        }
        {this.state.authState === 'signedIn' &&
          <Router>
            <PrivateRoute path="/app/myvideos" component={MyVideosPage} />
            <PrivateRoute path="/app/myvideos/:deleted" component={MyVideosPage} />
            <PrivateRoute path="/app/" component={IndexPageTemplate} />
            <DynamicRoute path="/app/:shortId" />
          </Router>
        }
      </>
    )
  }
}

export default App