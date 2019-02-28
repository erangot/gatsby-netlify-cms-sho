import React from 'react'
import Layout from '../components/Layout'

export const IndexPageTemplate = () => (
    <div>

    </div>
)

const IndexPage = () => {
  fetch("/.netlify/functions/userdetails")
  .then(response => response.json())
  .then(console.log)

  return (
    <Layout>
      <IndexPageTemplate/>
    </Layout>
  )
}

export default IndexPage
