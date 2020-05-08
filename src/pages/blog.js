import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import React from 'react'

import Bio from './../components/biography/'
import { rhythm } from './../utils/typography'

import profilePicture from '../components/biography/profile.jpg'

const standard = post => {
  return (
    <a
      className="article-preview standard"
      key={post.node.frontmatter.path}
      href={post.node.frontmatter.path}
    >
      <h2
        style={{
          fontSize: `1.4427rem`,
          lineHeight: `1.1`,
          marginBottom: rhythm(1 / 4),
          marginTop: rhythm(2),
        }}
      >
        {post.node.frontmatter.title}
      </h2>
      <small>{post.node.frontmatter.date}</small>
      <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
    </a>
  )
}

const top = (post, imgAlignLeft) => {
  const re = /\"(\/static.*?)\"/g
  const firstImageUrl = post.node.html.match(re)
  const url = firstImageUrl
    ? `https://www.matchilling.com${firstImageUrl[0].replace(/['"]+/g, '')}`
    : undefined

  const img = url => (
    <div>
      <div
        style={{
          backgroundImage: `url(${url})`,
          height: `354px`,
          width: `354px`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
        }}
      />
    </div>
  )

  const preview = post => (
    <div
      style={{
        display: `flex`,
        padding: `0 1rem 0 3rem`,
        border: `1px solid rgba(208, 208, 208, 0.24)`,
      }}
    >
      <div
        style={{
          margin: `auto 3rem`,
        }}
      >
        <h2
          style={{
            fontSize: `1.2427rem`,
            lineHeight: `1.9rem`,
            marginBottom: rhythm(1 / 4),
            marginTop: 0,
          }}
        >
          {post.node.frontmatter.title}
        </h2>
        <small>{post.node.frontmatter.date}</small>
        <p
          style={{
            fontSize: `90%`,
            padding: 0,
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
        />
      </div>
    </div>
  )

  return (
    <a
      className="article-preview"
      key={post.node.frontmatter.path}
      href={post.node.frontmatter.path}
      style={{
        boxShadow: `none`,
        color: `hsla(0, 0%, 0%, 0.9) !important`,
        display: `block`,
        margin: `0px -10rem 3rem`,
      }}
    >
      <div style={{ display: `flex` }}>
        {imgAlignLeft && img(url)}
        {imgAlignLeft && preview(post)}
        {!imgAlignLeft && preview(post)}
        {!imgAlignLeft && img(url)}
      </div>
    </a>
  )
}

export default class Blog extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    const title = 'Blog'
    const description =
      'Blog about computer science and agile software engineering.'

    const meta = [
      { name: 'description', content: description },
      { name: 'og:image', content: profilePicture },
      { name: 'og:title', content: 'Blog' },
      { name: 'og:description', description },
      { name: 'twitter:site', content: '@matchilling' },
      { name: 'twitter:creator', content: '@matchilling' },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: profilePicture },
    ]

    return (
      <div>
        <Helmet title={title} meta={meta} />
        <h1
          style={{
            marginBottom: `3rem`,
          }}
        >
          What’s new?
        </h1>
        {posts.map((post, index) => {
          if (post.node.frontmatter.path !== '/404/') {
            const re = /\"(\/static.*?)\"/g
            const firstImageUrl = post.node.html.match(re)
            const url = firstImageUrl
              ? `https://www.matchilling.com${firstImageUrl[0].replace(
                  /['"]+/g,
                  '',
                )}`
              : undefined

            if (index < 3) {
              return (
                <div key={post.node.frontmatter.path}>
                  <span className="hidden-xs hidden-sm visible-md visible-lg">
                    {top(post, index % 2 === 0)}
                  </span>
                  <span className="visible-xs visible-sm hidden-md hidden-lg">
                    {standard(post)}
                  </span>
                </div>
              )
            }

            return standard(post)
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
          html
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
