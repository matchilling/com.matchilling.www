import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'

import Fullscreen from './../components/fullscreen/'
import { rhythm, scale } from './../utils/typography'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import './prism.css'

export default class Template extends React.Component {
  render() {
    const { location, children } = this.props,
      rootPath =
        typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__
          ? __PATH_PREFIX__ + `/`
          : `/`

    return (
      <div>
        {location.pathname === rootPath && (
          <div>
            <Fullscreen />
            {children()}
          </div>
        )}
        {location.pathname !== rootPath && (
          <div>
            <div
              style={{
                borderWidth: `${rhythm(0.3)}`,
                borderTopStyle: `solid`,
              }}
            />
            <Container
              style={{
                maxWidth: rhythm(22),
                padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
              }}
            >
              <h3
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  marginTop: 0,
                  marginBottom: rhythm(-1),
                }}
              >
                <Link
                  style={{
                    boxShadow: 'none',
                    color: 'inherit',
                    marginRight: rhythm(0.2),
                    textDecoration: 'none',
                  }}
                  to={'/'}
                >
                  Home
                </Link>
                {'/contact/' === location.pathname && (
                  <span>
                    <span
                      style={{
                        boxShadow: 'none',
                        color: 'hsla(0,0%,0%,0.5)',
                        marginRight: rhythm(0.2),
                        textDecoration: 'none',
                      }}
                    >
                      /
                    </span>
                    Contact
                  </span>
                )}
                {'/project/' === location.pathname && (
                  <span>
                    <span
                      style={{
                        boxShadow: 'none',
                        color: 'hsla(0,0%,0%,0.5)',
                        marginRight: rhythm(0.2),
                        textDecoration: 'none',
                      }}
                    >
                      /
                    </span>
                    Project
                  </span>
                )}
                {-1 ===
                  ['/contact/', '/project/', rootPath].indexOf(
                    location.pathname,
                  ) && (
                  <span>
                    <span
                      style={{
                        boxShadow: 'none',
                        color: 'hsla(0,0%,0%,0.5)',
                        marginRight: rhythm(0.2),
                        textDecoration: 'none',
                      }}
                    >
                      /
                    </span>
                    <Link
                      style={{
                        boxShadow: 'none',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                      to={'/blog/'}
                    >
                      Blog
                    </Link>
                  </span>
                )}
              </h3>
              {children()}
            </Container>
          </div>
        )}
      </div>
    )
  }
}
