const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const axios = require('axios');


exports.createPages = async ({ actions: { createPage }, graphql }) => {

  graphql(`
  {
    allShortUrlsResults {
      edges {
        node {
          shortUrlsId
          username
          engaged
          timeInSeconds
          videoTitle
          videoDescription
          applicationId
          shortId
          blocked
          visibility
          deleted
          views
          engaged
          createdOn
          createdBy
          shortUrlId
          path
          bucketPath
          formatId
        }
      }
    }
  }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const shortUrls = result.data.allShortUrlsResults.edges;

    var application_array = [{name: 'videoscribe', displayName: 'VideoScribe', videos: []},
                            {name: 'tawe', displayName: 'Tawe', videos: []},
                            {name: 'storypix', displayName: 'StoryPix', videos: []},
                            {name: 'videoscribe-cloud', displayName: 'FunScribe', videos: []},];

    
    // loop to every object with duplicated short id different media type
    for (let index = 0; index < shortUrls.length; ) {
    
      var video = shortUrls[index].node;
      var temp_shortUrlId = video.shortUrlId;
      var increment = 0;

      do {
        increment++;
        if((increment+index) >= shortUrls.length)
          break;

        var format_id = shortUrls[index+increment].node.formatId;
        switch (true) {
          case 19:
          case 23:
            video.thumbnail = `${shortUrls[index+increment].node.path}/5_640x360.png`;
            break
          case (format_id > 0 && format_id < 19):
            video.videopath = shortUrls[index+increment].node.path;
            break;
          case (format_id > 19 && format_id < 23):
            video.videopath = shortUrls[index+increment].node.path;
            break;
          //19 & 23
          default:
            video.thumbnail = `${shortUrls[index+increment].node.path}/5_640x360.png`;
            break;
        }
 
      } while (temp_shortUrlId == shortUrls[index+increment].node.shortUrlId);


      // use first row on the media /shortUrl query
      var application_id = shortUrls[index].node.applicationId;

      switch (application_id) {
        case 1:
          video.applicationName = 'videoscribe';
          video.applicationDisplayName = 'VideoScribe';
          break;
        case 2:
          video.applicationName = 'tawe';
          video.applicationDisplayName = 'Tawe';
        break;
        case 3:
          video.applicationName = 'storypix';
          video.applicationDisplayName = 'StoryPix';
        break;
        case 4:
          video.applicationName = 'videoscribe-cloud';
          video.applicationDisplayName = 'FunScribe';
        break;
      
        default:
          break;
      }
      
      // push specific video per application category
      application_array[(application_id-1)].videos.push(video);

      index = increment+index;
      
      createPage({
        path: video.shortId,
        // tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/video-page.js`
        ),
        // additional data can be passed via context
        context: {
          video,
        },
      })
    } //end of for loop for every object on graphql

    // Iterate through each video, - above ^
    // putting all found Sparkol application created video  into `application_array`

    application_array.forEach(application => {
        const applicationPath = `/application/${application.name}/`
  
        createPage({
          path: applicationPath,
          component: path.resolve(`src/templates/application-page.js`),
          context: {
            application,
          },
        })
      })
  })

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
  `).then(results => {
    if (results.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

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
