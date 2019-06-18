import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import {navigate } from 'gatsby'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports'; // if you are using Amplify CLI 
import './all.scss'
import {connect} from 'react-redux'

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
      
      Amplify.configure(aws_exports);
      Auth.currentAuthenticatedUser({
          bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {
         console.log("component mounted")
         this.props.signIn(true, user.username)
       
        
      })
      .catch(err => {
          console.log(err);
        
      });

      

     } 
  
    

    render()
    {     
      const {children, name} = this.props
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
                <Helmet>
                  <html lang="en" />
                  <title>{data.site.siteMetadata.title}</title>
                  <meta
                    name="description"
                    content={data.site.siteMetadata.description}
                  />
        
                  <meta name="theme-color" content="#fff" />
                  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" /> 
                  <meta property="og:type" content="business.business" />
                  <meta property="og:title" content={data.site.siteMetadata.title} />
                  <meta property="og:url" content="/" />
                  <meta property="og:image" content="/img/shoco_logo.png" />
                </Helmet>
                <Navbar/>
              
                <div>{children}</div>
               
                <Footer />
              </div>
            )}
          />
        )
    }
  
}

const mapStateToProps = (state) => 
{ 
  console.log(state)
  return {
    user:state.user
  }
}

const mapDispatchProps = (dispatch) => {
  return{
    signIn:(status,username) => {
      dispatch({
        type:"SIGN_IN",
        payload:{status,username}
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchProps)(TemplateWrapper);