(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var s=n(0),c=n.n(s),r=n(5),a=n.n(r),i=(n(16),n(6)),l=n(7),o=n(10),u=n(9),d=n(8),h=(n(18),n(1)),j=function(){return Object(h.jsx)("div",{className:"spinner-overlay",children:Object(h.jsx)("div",{className:"spinner-container"})})},f=(n(20),function(e){try{var t=new Date(e);return t.getDate()+"."+(t.getMonth()+1)+"."+t.getFullYear()}catch(n){return console.error("Could not parse date: ",n),e}}),b=function(e){return Object(h.jsxs)("a",{className:"card-container",target:"_blank",rel:"noopener noreferrer",href:e.message.link,children:[Object(h.jsx)("div",{className:"feed-name",children:e.message.feed_name}),Object(h.jsx)("h2",{children:e.message.title}),Object(h.jsxs)("div",{className:"card-meta",children:[Object(h.jsx)("span",{children:e.message.author}),Object(h.jsx)("span",{children:f(e.message.published)})]}),Object(h.jsx)("p",{dangerouslySetInnerHTML:{__html:e.message.summary}})]})},m=(n(21),function(e){return Object(h.jsx)("div",{className:"card-list",children:e.news.map((function(e){return Object(h.jsx)(b,{message:e},e.link)}))})}),O=(n(22),function(e){return Object(h.jsx)("div",{children:Object(h.jsx)("input",{className:"search",type:"search",placeholder:e.placeholder,onChange:e.handleSearch})})}),p=(n(23),function(){return Object(h.jsx)("div",{className:"footer",children:Object(h.jsxs)("span",{children:["Icons erstellt von"," ",Object(h.jsx)("a",{href:"https://www.flaticon.com/de/autoren/freepik",title:"Freepik",children:"Freepik"})," ","from"," ",Object(h.jsxs)("a",{href:"https://www.flaticon.com/de/",title:"Flaticon",children:[" ","www.flaticon.com"]})]})})}),w=n(4),x=n(11),S=(n(24),["children"]),v=function(e){var t=e.children,n=Object(x.a)(e,S);return Object(h.jsx)("button",Object(w.a)(Object(w.a)({className:"custom-button"},n),{},{children:t}))},g=(n(25),function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(i.a)(this,n),(s=t.call(this,e)).loadData=function(){console.info("click"),s.setState({isLoading:!0}),fetch("".concat("https://news-me-backend.herokuapp.com","/api/feeds")).then((function(e){return e.json()})).then((function(e){return s.setState({isLoading:!1,news:e.entries,allSources:e.sources.map((function(e){return{label:e,value:e.toLowerCase()}}))})})).catch((function(e){s.setState({isLoading:!1}),console.error(e)}))},s.handleSearch=function(e){s.setState({searchField:e.target.value})},s.handleSelect=function(e){s.setState({selectedSources:e})},s.getFilteredResults=function(){var e=s.state,t=e.news,n=e.searchField,c=e.selectedSources;if(!n&&0===c.length)return t;var r=c.map((function(e){return e.value}));return n?0===c.length?t.filter((function(e){return e.title.toLowerCase().includes(n.toLowerCase())||e.feed_name.toLowerCase().includes(n.toLowerCase())})):t.filter((function(e){return(e.title.toLowerCase().includes(n.toLowerCase())||e.feed_name.toLowerCase().includes(n.toLowerCase()))&&r.includes(e.feed_name.toLowerCase())})):t.filter((function(e){return r.includes(e.feed_name.toLowerCase())}))},s.state={isLoading:!0,news:[],filtered:[],searchField:"",allSources:[],selectedSources:[]},s}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"render",value:function(){var e=this,t=this.getFilteredResults();return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)("h1",{children:"News Me"}),Object(h.jsxs)("div",{className:"filters",children:[Object(h.jsx)(O,{placeholder:"Search news..",handleSearch:this.handleSearch}),Object(h.jsx)(d.a,{options:this.state.allSources,value:this.state.selectedSources,onChange:this.handleSelect,labelledBy:"Select",overrideStrings:{selectSomeItems:"Select feeds ...",allItemsAreSelected:"All feeds are selected.",selectAll:"Select All",search:"Search"}})]}),Object(h.jsx)(v,{onClick:function(){return e.loadData()},children:Object(h.jsx)("div",{className:"icon-reload"})}),this.state.isLoading?Object(h.jsx)(j,{}):Object(h.jsx)(m,{news:t}),Object(h.jsx)(p,{})]})}}]),n}(s.Component));a.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(g,{})}),document.getElementById("root"))}],[[26,1,2]]]);
//# sourceMappingURL=main.3cb6e918.chunk.js.map