import React, { Component } from "react"

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

    

    signOut(e) {
        e.preventDefault()
        this.props.signOut()
      }

 

    render() {
        return(<RenderNavbar data ={this.state} signOut={this.signOut}/> )
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
