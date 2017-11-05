import Link from 'gatsby-link'
import React from 'react'

import projects from './../../../data/projects.json'
import { rhythm } from './../../utils/typography'

export default class ProjectList extends React.Component {
  render() {
    return (
      <div style={{ marginBottom: rhythm(2.5) }}>
        {projects.map(project => {
          const link = project.url ? (
            <a style={{ boxShadow: 'none' }} target="_blank" href={project.url}>
              [link]
            </a>
          ) : null

          return (
            <div key={project.name}>
              <h3 style={{ marginBottom: rhythm(0.5) }}>
                {project.name} {link}
              </h3>
              <p>{project.description}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
