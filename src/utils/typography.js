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
  '.footnotes ol p': {
    display: 'inline',
  },
  '.footnotes ol .footnote-backref': {
    display: 'inline',
  },
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
