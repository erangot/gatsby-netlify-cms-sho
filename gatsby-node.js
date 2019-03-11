const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const axios = require('axios');
const dev_host = 'http://localhost:6970';
const prod_host = 'https://sho2.test.sparkol-dev.co.uk';

const get = () => axios.get(prod_host+'/api/allPublic', {
  headers: {
    Authorization: "Basic Y29saW46cGFzc3dvcmQ="
  }
});


exports.createPages = async ({ actions: { createPage }, graphql }) => {
  
  const { data: allVideos } = await get();

  allVideos.videos.forEach(video => {
    createPage({
      path: `/${video.shortId}`,
      component: path.resolve(
              `src/templates/video-page.js`
            ),
      context: { video }
    });
  });

  // Iterate through each video, putting all found Sparkol application created video  into `app`

  // Iterate through each video, putting all found user video into `user`

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const {data: allVideos} = async() => { get(); };

    console.log(allVideos);

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        // tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    });

    // Tag pages:
    // let tags = []
    // Iterate through each post, putting all found tags into `tags`
    // posts.forEach(edge => {
    //   if (_.get(edge, `node.frontmatter.tags`)) {
    //     tags = tags.concat(edge.node.frontmatter.tags)
    //   }
    // })
    // Eliminate duplicate tags
    // tags = _.uniq(tags)

    // Make tag pages
    // tags.forEach(tag => {
    //   const tagPath = `/tags/${_.kebabCase(tag)}/`

    //   createPage({
    //     path: tagPath,
    //     component: path.resolve(`src/templates/tags.js`),
    //     context: {
    //       tag,
    //     },
    //   })
    // })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
