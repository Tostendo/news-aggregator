(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{32:function(e,t,n){},33:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),s=n(23),r=n.n(s),i=n(9),o=(n(32),n(12)),l=n(14),d=n(15),u=n(18),h=n(17),j=(n(33),n(1)),f=function(){return Object(j.jsx)("div",{className:"footer",children:Object(j.jsxs)("span",{children:["Icons erstellt von"," ",Object(j.jsx)("a",{href:"https://www.flaticon.com/de/autoren/freepik",title:"Freepik",children:"Freepik"})," ","from"," ",Object(j.jsxs)("a",{href:"https://www.flaticon.com/de/",title:"Flaticon",children:[" ","www.flaticon.com"]})]})})},p=n(2),b=(n(35),n(36),function(){var e=Object(p.f)(),t=function(){return e&&e.pathname&&e.pathname.split("/").length>1&&e.pathname.split("/")[2]?e.pathname.split("/")[2]:null};return Object(j.jsx)("nav",{className:"navbar",children:Object(j.jsxs)("ul",{children:[t()&&Object(j.jsx)("li",{children:Object(j.jsx)(i.b,{to:"/feed/".concat(t(),"/edit"),children:"Edit Feed"})}),Object(j.jsx)("li",{children:Object(j.jsx)(i.b,{to:"/create",children:"Create Feed"})})]})})}),m=n(26),O=(n(43),function(){return Object(j.jsx)("div",{className:"spinner-overlay",children:Object(j.jsx)("div",{className:"spinner-container"})})}),x=(n(44),function(e){try{var t=new Date(e);return t.getDate()+"."+(t.getMonth()+1)+"."+t.getFullYear()}catch(n){return console.error("Could not parse date: ",n),e}}),v=function(e){return Object(j.jsxs)("a",{className:"card-container",target:"_blank",rel:"noopener noreferrer",href:e.message.link,children:[Object(j.jsx)("div",{className:"feed-name",children:e.message.feed_name}),Object(j.jsx)("h2",{children:e.message.title}),Object(j.jsxs)("div",{className:"card-meta",children:[Object(j.jsx)("span",{children:e.message.author}),Object(j.jsx)("span",{children:x(e.message.published)})]}),Object(j.jsx)("p",{dangerouslySetInnerHTML:{__html:e.message.summary}})]})},g=(n(45),function(e){return Object(j.jsx)("div",{className:"card-list",children:e.news.map((function(e){return Object(j.jsx)(v,{message:e},e.link)}))})}),w=(n(46),function(e){return Object(j.jsx)("div",{children:Object(j.jsx)("input",{className:"search",type:"search",placeholder:e.placeholder,onChange:e.handleSearch})})}),S=n(27),C=(n(47),["children"]),k=function(e){var t=e.children,n=Object(S.a)(e,C);return Object(j.jsx)("button",Object(o.a)(Object(o.a)({className:"custom-button"},n),{},{children:t}))},N=(n(48),function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var c;return Object(l.a)(this,n),(c=t.call(this,e)).loadData=function(){c.setState({isLoading:!0});var e=null;c.props.match&&c.props.match.params&&c.props.match.params.feedId&&""!==c.props.match.params.feedId&&"example"!==c.props.match.params.feedId?e="".concat("https://news-me-backend.herokuapp.com","/api/feeds/").concat(c.props.match.params.feedId):(e="".concat("https://news-me-backend.herokuapp.com","/api/feeds"),console.error("No feedId, use default")),fetch(e).then((function(e){return e.json()})).then((function(e){return c.setState({isLoading:!1,news:e.entries,allSources:e.sources.map((function(e){return{label:e,value:e.toLowerCase()}})),description:e.description,title:e.title})})).catch((function(e){c.setState({isLoading:!1}),console.error(e)}))},c.handleSearch=function(e){c.setState({searchField:e.target.value})},c.handleSelect=function(e){c.setState({selectedSources:e})},c.getFilteredResults=function(){var e=c.state,t=e.news,n=e.searchField,a=e.selectedSources;if(!n&&0===a.length)return t;var s=a.map((function(e){return e.value}));return n?0===a.length?t.filter((function(e){return e.title.toLowerCase().includes(n.toLowerCase())||e.feed_name.toLowerCase().includes(n.toLowerCase())})):t.filter((function(e){return(e.title.toLowerCase().includes(n.toLowerCase())||e.feed_name.toLowerCase().includes(n.toLowerCase()))&&s.includes(e.feed_name.toLowerCase())})):t.filter((function(e){return s.includes(e.feed_name.toLowerCase())}))},c.state={isLoading:!0,news:[],filtered:[],searchField:"",allSources:[],selectedSources:[],title:null,description:null},c}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"render",value:function(){var e=this;if(this.state.isLoading)return Object(j.jsx)(O,{});var t=this.getFilteredResults();return Object(j.jsxs)("div",{className:"feed",children:[Object(j.jsx)("h1",{className:"feed-title",children:this.state.title||"News Me"}),this.state.description&&Object(j.jsx)("p",{className:"feed-description",children:this.state.description}),Object(j.jsxs)("div",{className:"filters",children:[Object(j.jsx)(w,{placeholder:"Search news..",handleSearch:this.handleSearch}),Object(j.jsx)(m.a,{options:this.state.allSources,value:this.state.selectedSources,onChange:this.handleSelect,labelledBy:"Select",overrideStrings:{selectSomeItems:"Select feeds ...",allItemsAreSelected:"All feeds are selected.",selectAll:"Select All",search:"Search"}})]}),Object(j.jsx)(k,{onClick:function(){return e.loadData()},children:Object(j.jsx)("div",{className:"icon-reload cursor"})}),Object(j.jsx)(g,{news:t})]})}}]),n}(c.Component)),I=n(4),L=(n(49),Object(p.g)((function(e){var t=Object(c.useState)(""),n=Object(I.a)(t,2),a=n[0],s=n[1],r=Object(c.useState)(""),i=Object(I.a)(r,2),o=i[0],l=i[1],d=Object(c.useState)(""),u=Object(I.a)(d,2),h=u[0],f=u[1];Object(c.useEffect)((function(){e.match.params.feedId?p(e.match.params.feedId):(s(""),f(""))}),[e.match.params.feedId]);var p=function(e){fetch("".concat("https://news-me-backend.herokuapp.com","/api/feeds/sources/").concat(e),{method:"GET"}).then((function(e){return e.json()})).then((function(e){s(e.feeds.join(",")),f(e.description||""),l(e.title||"")})).catch((function(e){console.error(e)}))};return Object(j.jsxs)("div",{className:"upsert-feed",children:[Object(j.jsx)("h1",{children:e.match.params.feedId?"Update Feed":"Create Feed"}),Object(j.jsx)("label",{className:"note",children:"Feed title (optional)"}),Object(j.jsx)("input",{onChange:function(e){l(e.target.value)},value:o}),Object(j.jsx)("label",{className:"note",children:"Feed description (optional)"}),Object(j.jsx)("textarea",{onChange:function(e){f(e.target.value)},rows:4,value:h}),Object(j.jsx)("p",{className:"note",children:"Comma separated list of rss feeds. Save the resulting link to get back your feed any time."}),Object(j.jsx)("textarea",{onChange:function(e){s(e.target.value)},rows:10,value:a}),Object(j.jsx)(k,{onClick:function(){return function(){var t="".concat("https://news-me-backend.herokuapp.com","/api/feeds/sources");e.match.params.feedId&&(t+="/".concat(e.match.params.feedId)),fetch(t,{method:"POST",body:JSON.stringify({feeds:a,description:h,title:o})}).then((function(e){return e.json()})).then((function(t){return e.history.push("/feed/".concat(t.feed_id))})).catch((function(e){console.error(e)}))}()},children:"Save"})]})}))),y=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(b,{}),Object(j.jsxs)(p.c,{children:[Object(j.jsx)(p.a,{path:"/create",children:Object(j.jsx)(L,{})}),Object(j.jsx)(p.a,{path:"/feed/:feedId/edit",render:function(e){var t=e.match;return Object(j.jsx)(L,Object(o.a)({},t))}}),Object(j.jsx)(p.a,{path:"/feed/:feedId",render:function(e){var t=e.match;return Object(j.jsx)(N,{match:t})}}),Object(j.jsx)(p.a,{path:"/",render:function(){return Object(j.jsx)(N,{match:null})}})]}),Object(j.jsx)(f,{})]})}}]),n}(c.Component),F=y;r.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(i.a,{basename:"/",children:Object(j.jsx)(F,{})})}),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.8137a6a1.chunk.js.map