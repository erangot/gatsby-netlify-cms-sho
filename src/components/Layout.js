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
export default connect(null, {signIn})(TemplateWrapper);