import React from 'react'
import Layout from '../components/Layout'
import 'isomorphic-fetch';

export const IndexPageTemplate = () => (
    <div>

    </div>
)

const IndexPage = () => {
  fetch("/.netlify/functions/api/?path=/api/globalstats")
  .then(response => response.json())
  .then(console.log)

  fetch("/.netlify/functions/api/?path=/api/bestinsho")
  .then(response => response.json())
  .then(console.log)

  return (
    <Layout>
      <IndexPageTemplate/>
    </Layout>
  )
}

export default IndexPage
