let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})
var proxy = require("http-proxy-middleware")

module.exports = {
  developMiddleware: app => {    
  },
  siteMetadata: {
    title: 'sho.co for Sparkol',
    description: `Share your Sparkol videos`,
    author: `@ussi`,
  },
  plugins: [
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: 'db4free.net',
          user: 'shocogatsbymnl',
          password: 'rykku8-raqGib-wugtah',
          database: 'shocogatsbymnl'
        },
        query: 'SELECT * FROM shocogatsbymnl.shortUrls a, shocogatsbymnl.media b WHERE a.id = b.shortUrlId;',
        idFieldName: 'id',
        typePrefix: 'ShortUrls'
      }
    },
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: 'db4free.net',
          user: 'shocogatsbymnl',
          password: 'rykku8-raqGib-wugtah',
          database: 'shocogatsbymnl'
        },
        query: 'SELECT * FROM shocogatsbymnl.media;',
        idFieldName: 'id',
        typePrefix: 'Media'
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve:'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true,            // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}