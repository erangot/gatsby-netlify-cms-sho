import React, { Component } from "react"
import {connect} from 'react-redux'
import "./styles/header.scss"
import {signOut} from '../actions/userAction'
import RenderNavbar from './navbar/RenderNavbar'
     


  class Header extends Component {
     
 
    constructor(props) {
        super(props);

        this.signOut = this.signOut.bind(this);
      }


      
    signOut(e) {
        e.preventDefault()
        this.props.signOut()
      }

 

    render() {
        return(<RenderNavbar status ={this.props.user.status} username={this.props.user.username} signOut={this.signOut}/> )
    }
}

//setting up the props to access to this component and calling the signOut action
const mapStateToProps = (state) => 
{ 
  return {
    user:state.userReducer
  }
}

export default connect(mapStateToProps,{signOut})(Header);
