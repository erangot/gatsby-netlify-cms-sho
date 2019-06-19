import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './all.scss'
import {connect} from 'react-redux'
import {signIn} from '../actions/userAction'

class TemplateWrapper extends React.Component{
    
     constructor(props)
     {
       super();
       this.state = 
       {
         username:"",
         status:false
         
       }
     }

     componentWillMount(){
      this.props.signIn()
     } 
  
    render()
    {     
      const {children} = this.props
    
      return(
          <StaticQuery
            query={graphql`
              query HeadingQuery {
                site {
                  siteMetadata {
                    title
                    description
                  }
                }
              }
            `}
            render={data => (
              <div>
                
                <Helmet html={[{lang:"en"}]}/>
                <Navbar/>
                <div>{children}</div>
                <Footer />
              </div>
            )}
          />
        )
    }
  
}

//setting up the props to access to this component and calling the signIn action
const mapStateToProps = (state) => 
{ 
  console.log(state)
  console.log(state)
  return {
    user:state.userReducer
  }
}



export default connect(mapStateToProps, {signIn})(TemplateWrapper);