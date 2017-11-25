import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import Bio from '../components/biography/'
import { rhythm, scale } from '../utils/typography'

export default class ArticleTemplate extends React.Component {

  render() {
    const post = this.props.data.markdownRemark
    const readTime = (words, options) => {
      const defaults = Object.assign({
              wordsPerMinute : 225
            }, options),
            minutes = words / defaults.wordsPerMinute;

      return `${Math.ceil(minutes.toFixed(2))} min read`;
    }
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <article>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1>
          <Link
            style={{ color: 'hsla(0,0%,0%,0.9)', boxShadow: 'none' }}
            to={post.frontmatter.path}
          >
            {post.frontmatter.title}
          </Link>
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-0.5),
          }}
        >
          {post.frontmatter.date}, {readTime(post.wordCount.words)}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr style={{ marginBottom: rhythm(1) }} />
        <Bio />
      </article>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        path
        tags
        title
      }
      wordCount {
        words
      }
    }
  }
`
