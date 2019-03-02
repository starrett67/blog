import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const ArticleTemplate = ({ data }) => (
  <Layout>
    <h1>{data.article.title}</h1>
    <Img fixed={data.article.image.childImageSharp.fixed} />
    <p>
      by{' '}
      <Link to={`/authors/User_${data.article.author.id}`}>
        {data.article.author.username}
      </Link>
    </p>
    <p dangerouslySetInnerHTML={{ __html: data.article.childMarkdownRemark.html }} />
  </Layout>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    article(id: { eq: $id }) {
      title
      childMarkdownRemark {
        html
      }
      image {
        childImageSharp {
          fixed(width: 800, height: 425) {
            ...GatsbyImageSharpFixed
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
