import Typography from 'typography'
import theme from 'typography-theme-wordpress-2016'

theme.overrideThemeStyles = () => ({
  html: {
    font: `105%/2 'Merriweather', 'Georgia', serif`,
  },
  body: {
    fontWeight: 300,
  },
  'article .gatsby-resp-image-wrapper': {
    margin: '0 auto',
  },
  'article .gatsby-resp-image-wrapper + em': {
    fontFamily:
      '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif',
    fontSize: '75%',
    textAlign: 'center',
    display: 'block',
    color: 'rgba(0, 0, 0, 0.35)',
    margin: '5px 0 10px 0',
  },
  'article .gatsby-resp-image-wrapper + em a': {
    color: 'rgba(0, 0, 0, 0.35)',
  },
  a: {
    color: '#d1066e',
  },
  'article p a, article li a': {
    boxShadow: 'none',
    color: 'hsla(0, 0%, 0%, 0.9)',
    backgroundImage:
      'linear-gradient(180deg, transparent 70%, rgb(202,10,99, .2) 0)',
    textDecoration: 'none',
  },
  'article p a:hover, article li a:hover': {
    boxShadow: 'none',
    color: 'hsla(0, 0%, 0%, 0.9)',
    backgroundImage:
      'linear-gradient(180deg, transparent 70%, rgb(202,10,99, .8) 0)',
    textDecoration: 'none',
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  'article h2': {
    fontWeight: '600',
    marginTop: '2.1rem !important',
  },
  li: {
    marginBottom: 'calc(1rem / 2)',
  },
  p: {
    marginBottom: '1.15rem',
  },
  '.gatsby-highlight': {
    margin: '.8em -2em',
  },
  '.footnotes ol p': {
    display: 'inline',
  },
  '.footnotes ol .footnote-backref': {
    display: 'inline',
  },
  'pre[class*="language-"]': {
    margin: '2.1em 0',
  },
  'code[class*="language-"], pre[class*="language-"]': {
    fontSize: '90% !important',
  },
  ':not(pre) > code[class*="language-"]': {
    color: 'hsla(0,0%,0%,0.9) !important',
    backgroundColor: 'transparent !important',
  },
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
