import Helmet from 'react-helmet'
import React from 'react'

import profilePicture from '../components/biography/profile.jpg'

export default class Index extends React.Component {
  render() {
    const title = `Mathias Schilling - Just another paper cut survivor and software engineer`
    const description = `I create business impact through code and help organisations become more effective in delivering solutions to their customer's problems.`

    const meta = [
      { name: 'description', content: description },
      { name: 'og:image', content: profilePicture },
      { name: 'og:title', content: title },
      { name: 'og:description', description },
      { name: 'twitter:site', content: '@matchilling' },
      { name: 'twitter:creator', content: '@matchilling' },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: profilePicture },
    ]

    return (
      <Helmet title={title} meta={meta} />
    )
  }
}
