import Typography from 'typography'
import theme from 'typography-theme-wordpress-2016'

theme.overrideThemeStyles = () => ({
  a: {
    color: '#d1066e',
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  li: {
    marginBottom: 'calc(1rem / 2)',
  },
  p: {
    marginBottom: '1.15rem',
  },
  '.gatsby-highlight': {
    margin: '.8em -1em',
  },
  '.gatsby-resp-image-wrapper': {
    margin: '1.6rem -1rem 2.6rem -1rem',
    '-webkit-filter': 'grayscale(1)',
    '-webkit-filter': 'grayscale(100%)',
    filter: 'gray',
    filter: 'grayscale(100%)',
    filter: 'url(/desaturate.svg#greyscale)',
  },
  '.gatsby-resp-image-wrapper:hover': {
    '-webkit-filter': 'none',
    filter: 'none',
  },
  '.footnotes ol p': {
    display: 'inline'
  },
  '.footnotes ol .footnote-backref': {
    display: 'inline'
  }
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
