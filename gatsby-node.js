const path = require(`path`)// gatsby-node.js
const crypto = require(`crypto`)

const digest = data => {
  return crypto
    .createHash(`md5`)
    .update(JSON.stringify(data))
    .digest(`hex`)
}

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for article nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

exports.onCreateNode = ({ node, actions }) => {
  const { createNode } = actions
  if (node.internal.type === 'StrapiArticle') {
    console.log('CREATING MARKDOWN NODE')
    createNode({
      ...node,
      id: node.id + '-markdown',
      parent: node.id,
      children: [],
      internal: {
        type: 'Article',
        mediaType: 'text/markdown',
        content: node.content,
        contentDigest: digest(node)
      }
    })
  }
}
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getArticles = makeRequest(
    graphql,
    `
    {
      allArticle {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each article.
    result.data.allArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/articles/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id
        }
      })
    })
  })

  const getAuthors = makeRequest(
    graphql,
    `
    {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/user.js`),
        context: {
          id: node.id
        }
      })
    })
  })

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([getArticles, getAuthors])
}
