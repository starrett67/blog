import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

const ArticleTemplate = ({ data }) => (

  <Layout>
    <div style={{ background: '#fff' }}>
      <Helmet title={`${data.article.title} | ${data.site.siteMetadata.siteTitle}`} />
      <div className={heroStyles.hero}>
        <Img className={heroStyles.heroImage} alt={data.article.title} fluid={data.article.image.childImageSharp.fluid} />
      </div>
      <div className='wrapper'>
        <h1 className='section-headline'>{data.article.title}</h1>
        <p className='section-date' >
          {data.article.posted}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: data.article.childMarkdownRemark.html
          }}
        />
      </div>
    </div>
  </Layout>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    article(id: { eq: $id }) {
      title
      posted(formatString: "MMMM Do, YYYY")
      childMarkdownRemark {
        html
      }
      image {
        childImageSharp {
          fluid(maxWidth: 1180) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      author {
        id
        username
      }
    }
  }
`
