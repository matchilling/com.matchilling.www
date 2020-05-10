webpackJsonp([0xc19374f83753],{36:function(e,t){e.exports={name:"Mathias Schilling",contact:{email:"m@matchilling.com",github:"https://github.com/matchilling",instagram:"https://www.instagram.com/matchilling/",lastfm:"https://www.last.fm/user/msatlastfm",linkedin:"https://www.linkedin.com/in/matchilling",reddit:"https://www.reddit.com/user/matchilling",twitter:"https://twitter.com/MatChilling"}}},43:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var i=n(2),c=a(i),m=n(36),u=a(m),d=n(56),f=a(d),s=n(13),h=function(e){function t(){return r(this,t),l(this,e.apply(this,arguments))}return o(t,e),t.prototype.render=function(){return c.default.createElement("div",{style:{display:"flex"}},c.default.createElement("img",{alt:u.default.name,src:f.default,style:{height:(0,s.rhythm)(3),marginBottom:0,marginRight:(0,s.rhythm)(.5),width:(0,s.rhythm)(3)}}),c.default.createElement("p",null,"I create"," ",c.default.createElement("a",{href:"https://jugendstil.io/"},"business impact through code")," and help organisations become more effective in delivering solutions to their customer's problems. You can find me on"," ",c.default.createElement("a",{href:u.default.contact.twitter,target:"_blank"},"Twitter"),","," ",c.default.createElement("a",{href:u.default.contact.linkedin,target:"_blank"},"LinkedIn"),","," ",c.default.createElement("a",{href:u.default.contact.github,target:"_blank"},"GitHub"),","," ",c.default.createElement("a",{href:u.default.contact.reddit,target:"_blank"},"Reddit"),", and"," ",c.default.createElement("a",{href:u.default.contact.lastfm,target:"_blank"},"Last.fm"),"."))},t}(c.default.Component);t.default=h,e.exports=t.default},201:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0;var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},c=n(54),m=a(c),u=n(60),d=(a(u),n(2)),f=a(d),s=n(43),h=a(s),p=n(13),g=n(56),y=a(g),w=function(e){return f.default.createElement("a",{className:"article-preview standard",key:e.node.frontmatter.path,href:e.node.frontmatter.path},f.default.createElement("h2",{style:{fontSize:"1.4427rem",lineHeight:"1.1",marginBottom:(0,p.rhythm)(.25),marginTop:(0,p.rhythm)(2)}},e.node.frontmatter.title),f.default.createElement("small",{style:{color:"rgba(0, 0, 0, 0.35)"}},e.node.frontmatter.date),f.default.createElement("p",{dangerouslySetInnerHTML:{__html:e.node.excerpt}}))},b=function(e,t){var n=/\"(\/static.*?)\"/g,a=e.node.html.match(n),r=a?"https://www.matchilling.com"+a[0].replace(/['"]+/g,""):void 0,l=null!=e.node.frontmatter.tags?e.node.frontmatter.tags.split(","):[],o=function(e,t){var n=i({wordsPerMinute:225},t),a=e/n.wordsPerMinute;return Math.ceil(a.toFixed(2))+" min read"},c=function(e){return f.default.createElement("div",null,f.default.createElement("div",{style:{backgroundImage:"url("+e+")",height:"354px",width:"354px",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}))},m=function(e){return f.default.createElement("div",{style:{display:"flex",padding:"0 1rem 0 3rem",border:"1px solid rgba(208, 208, 208, 0.24)"}},f.default.createElement("div",{style:{margin:"auto 3rem"}},f.default.createElement("h2",{style:{fontSize:"1.2427rem",lineHeight:"1.9rem",marginBottom:(0,p.rhythm)(.25),marginTop:0}},e.node.frontmatter.title),f.default.createElement("small",{style:{color:"rgba(0, 0, 0, 0.35)"}},e.node.frontmatter.date," • ",o(e.node.wordCount.words),l.length>0?" • "+l.join(", "):null),f.default.createElement("p",{style:{fontSize:"90%",padding:0,margin:0},dangerouslySetInnerHTML:{__html:e.node.excerpt}})))};return f.default.createElement("a",{className:"article-preview",key:e.node.frontmatter.path,href:e.node.frontmatter.path,style:{boxShadow:"none",color:"hsla(0, 0%, 0%, 0.9) !important",display:"block",margin:"0px -10rem 3rem"}},f.default.createElement("div",{style:{display:"flex"}},t&&c(r),t&&m(e),!t&&m(e),!t&&c(r)))},E=function(e){function t(){return r(this,t),l(this,e.apply(this,arguments))}return o(t,e),t.prototype.render=function(){var e=this.props.data.allMarkdownRemark.edges,t="Blog",n="Blog about computer science and agile software engineering.",a=[{name:"description",content:n},{name:"og:image",content:y.default},{name:"og:title",content:"Blog"},{name:"og:description",description:n},{name:"twitter:site",content:"@matchilling"},{name:"twitter:creator",content:"@matchilling"},{name:"twitter:description",content:n},{name:"twitter:image",content:y.default}];return f.default.createElement("div",null,f.default.createElement(m.default,{title:t,meta:a}),f.default.createElement("h1",{style:{marginBottom:"3rem"}},"What’s new?"),e.map(function(e,t){if("/404/"!==e.node.frontmatter.path){var n=/\"(\/static.*?)\"/g,a=e.node.html.match(n);a?"https://www.matchilling.com"+a[0].replace(/['"]+/g,""):void 0;return t<3?f.default.createElement("div",{key:e.node.frontmatter.path},f.default.createElement("span",{className:"hidden-xs hidden-sm visible-md visible-lg"},b(e,t%2===0)),f.default.createElement("span",{className:"visible-xs visible-sm hidden-md hidden-lg"},w(e))):w(e)}}),f.default.createElement("hr",{style:{marginBottom:(0,p.rhythm)(1)}}),f.default.createElement("div",{style:{marginBottom:(0,p.rhythm)(2.5)}},f.default.createElement(h.default,null)))},t}(f.default.Component);t.default=E;t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-pages-blog-js-4d296d280c43303ce3cd.js.map