import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import React from 'react'

import ProjectList from '../components/project-list/'

export default class Project extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={`Projects`} />
        <h1>Projects</h1>
        <ProjectList />
      </div>
    )
  }
}
