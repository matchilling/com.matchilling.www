import Helmet from 'react-helmet'
import React from 'react'

export default class Index extends React.Component {
  render() {
    return (
      <Helmet
        title={`Mathias Schilling - Just another paper cut survivor and software engineer`}
      />
    )
  }
}
