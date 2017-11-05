import Typography from 'typography'
import theme from 'typography-theme-wordpress-2016'

theme.overrideThemeStyles = () => ({
  a: {
    color: '#d1066e',
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
