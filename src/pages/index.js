import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = ({ data }) => (
  <Layout>
    {data.allArticle.edges.map(document => (
      <div key={document.node.id}>
        <h2>
          <Link to={`/articles/${document.node.id}`}>{document.node.title}</Link>
        </h2>
        <p>{document.node.summary}</p>
      </div>
    ))}
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allArticle {
      edges {
        node {
          id
          title
          summary
        }
      }
    }
  }
`
