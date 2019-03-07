import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allArticle.edges')
    const author = get(this, 'props.data.strapiUser')
    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={author} />
          <div className='wrapper'>
            <h2 className='section-headline'>Recent articles</h2>
            <ul className='article-list'>
              {posts.map(({ node }) => {
                return (
                  <li key={node.id}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allArticle {
      edges {
        node {
          id
          title
          summary
          image {
            childImageSharp {
              fluid(maxWidth: 350, maxHeight: 196) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          posted(formatString: "MMMM Do, YYYY")
        }
      }
    }
    strapiUser(username: {eq: "jstarrett"}) {
      name
      bio
      title
      image {
        childImageSharp {
          fluid(maxWidth: 1180, maxHeight: 480) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }

`
