import React, { Component } from "react"
import {navigate} from 'gatsby'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports'; // if you are using Amplify CLI
import RenderNavbar from './navbar/RenderNavbar'
import "./styles/header.scss"
     


  class Header extends Component {
     
 
    constructor(props) {
        super(props);
        this.state = {
          authState: 'loading',
          user: ""
        };
        this.signOut = this.signOut.bind(this);
      }

    componentWillMount() {
        Amplify.configure(aws_exports);
        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            console.log(user);
            this.setState({authState: 'signedIn'});
            this.setState({user: user.username});
        })
        .catch(err => {
            console.log(err);
            this.setState({authState: 'signIn'});  
        });
    }

    signOut() {
        this.setState({authState: 'signIn'});  
        Auth.signOut().then(() => {
        }).catch(e => {
          console.log(e);
          navigate("/");
        });
      }

 

    render() {
        
       
        return(<RenderNavbar data ={this.state} signOut={this.signOut}/> )
    }
}

export default Header;
