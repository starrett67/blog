import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    <Img alt='' fluid={article.image.childImageSharp.fluid} />
    <h3 className={styles.title}>
      <Link to={`/articles/${article.id}`}>{article.title}</Link>
    </h3>
    <small>{article.posted}</small>
    <p>{article.summary}</p>
    {/* {data.tags.map(tag => (
      <p className={styles.tag} key={tag}>
        {tag}
      </p>
    ))} */}
  </div>
)
