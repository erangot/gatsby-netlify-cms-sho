import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  return (
   
    <section className="section section--gradient about-page" 
      style={{
      color: "#fff",
      background: "url(https://sho.co/assets/images/eng_bg.png) #2d3743 no-repeat bottom right",
      backgroundSize: "50%",
      padding: "55px 0",
      position: "relative",
    }}>
    
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light" style={{color: "White", textAlign: "center"}}>
                {title}
              </h2>
              <PageContent className="content" content={content}/>
              </div>
            </div>
          </div>
        </div>
        
    </section>
   
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
  <div>
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
    </div>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
