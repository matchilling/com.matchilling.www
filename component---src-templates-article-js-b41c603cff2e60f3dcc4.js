webpackJsonp([0x77c411a55ba3],{40:function(t,e){t.exports={name:"Mathias Schilling",contact:{email:"m@matchilling.com",github:"https://github.com/matchilling",instagram:"https://www.instagram.com/matchilling/",lastfm:"https://www.last.fm/user/msatlastfm",linkedin:"https://www.linkedin.com/in/matchilling",twitter:"https://twitter.com/MatChilling"}}},46:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var i=n(2),u=r(i),c=n(40),f=r(c),s=n(62),h=r(s),p=n(14),m=function(t){function e(){return a(this,e),o(this,t.apply(this,arguments))}return l(e,t),e.prototype.render=function(){return u.default.createElement("div",{style:{display:"flex"}},u.default.createElement("img",{alt:f.default.name,src:h.default,style:{height:(0,p.rhythm)(3),marginBottom:0,marginRight:(0,p.rhythm)(.5),width:(0,p.rhythm)(3)}}),u.default.createElement("p",null,"99% of the time my brain is thinking blah, meh, why, huh, WTF, food and programming. The other 1% I’m usually asleep. You can find me"," ",u.default.createElement("a",{href:f.default.contact.twitter,target:"_blank"},"here"),","," ",u.default.createElement("a",{href:f.default.contact.linkedin,target:"_blank"},"here"),","," ",u.default.createElement("a",{href:f.default.contact.github,target:"_blank"},"here")," ","and"," ",u.default.createElement("a",{href:f.default.contact.lastfm,target:"_blank"},"there"),"."))},e}(u.default.Component);e.default=m,t.exports=e.default},62:function(t,e,n){t.exports=n.p+"static/profile.b2a1f82f.jpg"},243:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0,e.pageQuery=void 0;var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=n(2),c=r(u),f=n(60),s=r(f),h=n(46),p=r(h),m=n(14),d=function(t){function e(){return a(this,e),o(this,t.apply(this,arguments))}return l(e,t),e.prototype.render=function(){var t=this.props.data.markdownRemark,e=this.props.data.site.siteMetadata.title;return c.default.createElement("article",null,c.default.createElement(s.default,{title:t.frontmatter.title+" | "+e}),c.default.createElement("h1",null,t.frontmatter.title),c.default.createElement("p",{style:i({},(0,m.scale)(-.2),{display:"block",marginBottom:(0,m.rhythm)(1),marginTop:(0,m.rhythm)(-1)})},t.frontmatter.date),c.default.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}),c.default.createElement("hr",{style:{marginBottom:(0,m.rhythm)(1)}}),c.default.createElement(p.default,null))},e}(c.default.Component);e.default=d;e.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-templates-article-js-b41c603cff2e60f3dcc4.js.map