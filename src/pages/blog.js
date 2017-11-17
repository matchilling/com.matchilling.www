import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import React from 'react'

import Bio from './../components/biography/'
import { rhythm } from './../utils/typography'

export default class Blog extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <div>
        <Helmet title="Blog" />
        <h1>What’s new?</h1>
        {posts.map(post => {
          if (post.node.frontmatter.path !== '/404/') {
            return (
              <div key={post.node.frontmatter.path}>
                <h3
                  style={{ marginBottom: rhythm(1 / 4), marginTop: rhythm(2) }}
                >
                  <Link
                    style={{ boxShadow: 'none' }}
                    to={post.node.frontmatter.path}
                  >
                    {post.node.frontmatter.title}
                  </Link>
                </h3>
                <small>{post.node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </div>
            )
          }
        })}
        <hr style={{ marginBottom: rhythm(1) }} />
        <div style={{ marginBottom: rhythm(2.5) }}>
          <Bio />
        </div>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query BlogQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            path
            tags
            title
          }
        }
      }
    }
  }
`
