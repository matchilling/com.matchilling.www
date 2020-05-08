import React, { Component } from 'react'
import { rhythm } from './../../utils/typography'

import background from './background.jpg'
import logo from './logo.png'
import 'typeface-montserrat'

export default class Fullscreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logoSize: 14,
      nav: [
        { path: '/project/', title: 'Projects' },
        { path: '/blog/', title: 'Blog' },
        { path: '/contact/', title: 'Contact' },
      ],
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'fixed',
          height: '100%',
          width: '100%',
        }}
      >
        <canvas
          style={{
            display: 'inline-block',
            width: '100%',
          }}
        />
        <div
          style={{
            display: 'inline-block',
            position: 'absolute',
            width: '300px',
            textAlign: 'center',
            marginTop: '-150px',
            marginLeft: '-150px',
            top: '50%',
            left: '50%',
          }}
        >
          <img src={logo} style={{ width: rhythm(this.state.logoSize) }} />
          <nav>
            <ul>
              {this.state.nav.map(element => (
                <li
                  style={{
                    display: 'inline-block',
                    marginRight: rhythm(0.5),
                  }}
                  key={element.path}
                >
                  <a
                    style={{
                      color: 'white',
                      boxShadow: 'none',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                      fontSize: rhythm(0.5),
                      textTransform: 'uppercase',
                    }}
                    href={element.path}
                    title={element.title}
                  >
                    {element.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
