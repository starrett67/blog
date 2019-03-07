import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'

class Template extends React.Component {
  render () {
    const { location, children } = this.props
    let header

    let rootPath = `/`

    return (
      <Container>
        <Navigation />
        {children}
      </Container>
    )
  }
}

export default Template
