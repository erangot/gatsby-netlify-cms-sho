import PropTypes from "prop-types"
import React, { Component } from "react"
import shocologo from "../images/shoco_logo.png"
import SlantedEndge from '../components/slantedEdge'
import { Link, navigate } from 'gatsby'
import { Auth } from 'aws-amplify';



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
        navigate("/");
        this.setState({authState: 'signIn'});  
        Auth.signOut().then(() => {
        }).catch(e => {
          console.log(e);
        });
      }

    render() {
        if(this.state.authState == 'signedIn') 
            return (
            <header id="header" className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/">
                                <div className="logo navbar-btn pull-left" title="sho.co" rel="home">
                                    <img src={shocologo} alt="sho.co logo"/>
                                </div>
                            </Link>
            
                            <button type="button" className="navbar-toggle">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
            
                        <div className="navbar-collapse collapse">
                            <nav role="navigation">
                                <ul id="menu-main-menu" className="menu nav navbar-nav navbar-right pull-right">
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/">My videos</Link></li>
                                    <li className="last">   
                                        Yo, {this.state.user} |                     
                                        <span onClick={this.signOut}>Logout</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <SlantedEndge/>
                </header>
            );
        else 
            return (
                <header id="header" className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/">
                                <div className="logo navbar-btn pull-left" title="sho.co" rel="home">
                                    <img src={shocologo} alt="sho.co logo"/>
                                </div>
                            </Link>
            
                            <button type="button" className="navbar-toggle">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
            
                        <div className="navbar-collapse collapse">
                            <nav role="navigation">
                                <ul id="menu-main-menu" className="menu nav navbar-nav navbar-right pull-right">
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/">My videos</Link></li>
                                    <li className="last">   
                                        Who's there? |                     
                                        <Link to="/app">Login</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <SlantedEndge/>
                </header>
            );
        
    }
}

export default Header;
