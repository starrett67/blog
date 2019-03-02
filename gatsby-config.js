module.exports = {
  siteMetadata: {
    title: 'Joshua Starrett',
    description: 'My person blog',
    author: 'Joshua Starrett'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: []
      }
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: 'http://devops.joshstarrett.com:1337',
        contentTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          'article',
          'user'
        ],
        loginData: {
          identifier: `${process.env.STRAPI_USER}`,
          password: `${process.env.STRAPI_PASSWORD}`
        }
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline'
  ]
}
