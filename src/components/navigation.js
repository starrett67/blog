import React from 'react'
import Img from 'gatsby-image'
import { Link, StaticQuery, graphql } from 'gatsby'
import styles from './navigation.module.css'

const nav = (data) => (
  <nav role='navigation'>
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <a href='https://github.com/starrett67'><Img alt='Github' fixed={data.github.childImageSharp.fixed} /></a>
      </li>
      <li className={styles.navigationItem}>
        <Link to='/'>Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <a href='https://www.linkedin.com/in/joshua-starrett/'><Img alt='LinkedIn' fixed={data.linkedIn.childImageSharp.fixed} /></a>
      </li>
    </ul>
  </nav>
)

export default () => (
  <StaticQuery query={query} render={nav} />
)

const query = graphql`
query {
  github: file(relativePath: { eq: "GitHub-Mark-120px-plus.png" }) {
    childImageSharp {
      fixed(width: 30, height: 30) {
        ...GatsbyImageSharpFixed
      }
    }
  }
  linkedIn: file(relativePath: { eq: "linkedin-button.png" }) {
    childImageSharp {
      fixed(width: 30, height: 30) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}
`
