module.exports = {
  siteMetadata: {
    title: "Mathias Schilling - Just another paper cut survivor and software engineer",
    author: "Mathias Schilling",
    siteUrl: `https://www.matchilling.com`,
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    // The following sets up the Jekyll pattern of having a
    // "pages" directory for Markdown files and a "data" directory
    // for `.json`, `.yaml`, `.csv`.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
              // Remove the default behavior of adding a link to each
              // image.
              linkImagesToOriginal: false,
              // Analyze images' pixel density to make decisions about
              // target image size. This is what GitHub is doing when
              // embedding images in tickets. This is a useful setting
              // for documentation pages with a lot of screenshots.
              // It can have unintended side effects on high pixel
              // density artworks.
              //
              // Example: A screenshot made on a retina screen with a
              // resolution of 144 (e.g. Macbook) and a width of 100px,
              // will be rendered at 50px.
              //
              // Defaults to false.
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
            }
          },
          "gatsby-remark-copy-linked-files",
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally
              active : true,
              // Add a custom css class
              class  : 'emoji-icon',
              size   : 16,
              // Add custom styles
              styles : {
                display : 'inline',
                margin  : '0',
                position : 'relative',
                top      : '5px',
                width    : '25px'
              }
            }
          },
          'gatsby-remark-smartypants',
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-75319994-1`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8
      }
    }
  ],
}
