webpackJsonp([0xc19374f83753],{37:function(t,e){t.exports={name:"Mathias Schilling",contact:{email:"m@matchilling.com",github:"https://github.com/matchilling",instagram:"https://www.instagram.com/matchilling/",lastfm:"https://www.last.fm/user/msatlastfm",linkedin:"https://www.linkedin.com/in/matchilling",reddit:"https://www.reddit.com/user/matchilling",twitter:"https://twitter.com/MatChilling"}}},44:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var i=n(2),u=a(i),f=n(37),c=a(f),m=n(58),s=a(m),d=n(13),h=function(t){function e(){return r(this,e),l(this,t.apply(this,arguments))}return o(e,t),e.prototype.render=function(){return u.default.createElement("div",{style:{display:"flex"}},u.default.createElement("img",{alt:c.default.name,src:s.default,style:{height:(0,d.rhythm)(3),marginBottom:0,marginRight:(0,d.rhythm)(.5),width:(0,d.rhythm)(3)}}),u.default.createElement("p",null,"99% of the time my brain is thinking blah, meh, why, huh, WTF, food and programming. The other 1% I’m usually asleep. You can find me"," "," on",u.default.createElement("a",{href:c.default.contact.twitter,target:"_blank"},"Twitter"),","," ",u.default.createElement("a",{href:c.default.contact.linkedin,target:"_blank"},"LinkedIn"),","," ",u.default.createElement("a",{href:c.default.contact.github,target:"_blank"},"GitHub")," ",u.default.createElement("a",{href:c.default.contact.reddit,target:"_blank"},"Reddit"),","," ","and"," ",u.default.createElement("a",{href:c.default.contact.lastfm,target:"_blank"},"Last.fm"),"."))},e}(u.default.Component);e.default=h,t.exports=e.default},58:function(t,e,n){t.exports=n.p+"static/profile.b2a1f82f.jpg"},201:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0,e.pageQuery=void 0;var i=n(56),u=a(i),f=n(20),c=a(f),m=n(2),s=a(m),d=n(44),h=a(d),p=n(13),y=function(t){function e(){return r(this,e),l(this,t.apply(this,arguments))}return o(e,t),e.prototype.render=function(){var t=this.props.data.allMarkdownRemark.edges;return s.default.createElement("div",null,s.default.createElement(u.default,{title:"Blog"}),s.default.createElement("h1",null,"What’s new?"),t.map(function(t){if("/404/"!==t.node.frontmatter.path)return s.default.createElement("div",{key:t.node.frontmatter.path},s.default.createElement("h3",{style:{marginBottom:(0,p.rhythm)(.25),marginTop:(0,p.rhythm)(2)}},s.default.createElement(c.default,{style:{boxShadow:"none"},to:t.node.frontmatter.path},t.node.frontmatter.title)),s.default.createElement("small",null,t.node.frontmatter.date),s.default.createElement("p",{dangerouslySetInnerHTML:{__html:t.node.excerpt}}))}),s.default.createElement("hr",{style:{marginBottom:(0,p.rhythm)(1)}}),s.default.createElement("div",{style:{marginBottom:(0,p.rhythm)(2.5)}},s.default.createElement(h.default,null)))},e}(s.default.Component);e.default=y;e.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-pages-blog-js-fc8146e0db65d7770fc8.js.map