(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],[,,,,,,,function(e,t,n){e.exports=n(19)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(2),l=n.n(c),s=(n(12),n(3)),o=n(4),i=n(5),u=n(6),m=(n(13),function(){return r.a.createElement("div",{className:"spinner-overlay"},r.a.createElement("div",{className:"spinner-container"}))}),h=(n(14),function(e){return r.a.createElement("a",{className:"card-container",target:"_blank",rel:"noopener noreferrer",href:e.message.link},r.a.createElement("div",{className:"feed-name"},e.message.feed_name),r.a.createElement("h2",null,e.message.title),r.a.createElement("div",{className:"card-meta"},r.a.createElement("span",null,e.message.author),r.a.createElement("span",null,function(e){console.info("datestring: ",e);try{var t=new Date(e);return t.getDate()+"."+(t.getMonth()+1)+"."+t.getFullYear()}catch(n){return console.error("Could not parse date: ",n),e}}(e.message.published))),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.message.summary}}))}),d=(n(15),function(e){return r.a.createElement("div",{className:"card-list"},e.news.map((function(e){return r.a.createElement(h,{key:e.link,message:e})})))}),f=(n(16),function(e){return r.a.createElement("div",null,r.a.createElement("input",{className:"search",type:"search",placeholder:e.placeholder,onChange:e.handleSearch}))}),p=(n(17),function(){return r.a.createElement("div",{className:"footer"},r.a.createElement("span",null,"Icons erstellt von"," ",r.a.createElement("a",{href:"https://www.flaticon.com/de/autoren/freepik",title:"Freepik"},"Freepik")," ","from"," ",r.a.createElement("a",{href:"https://www.flaticon.com/de/",title:"Flaticon"}," ","www.flaticon.com")))}),E=(n(18),function(e){Object(u.a)(n,e);var t=Object(i.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).handleSearch=function(e){a.setState({searchField:e.target.value})},a.state={isLoading:!0,news:[],searchField:""},a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat("https://news-me-backend.herokuapp.com","/api/feeds")).then((function(e){return e.json()})).then((function(t){return e.setState({isLoading:!1,news:t.entries})})).catch((function(t){e.setState({isLoading:!1}),console.error(t)}))}},{key:"render",value:function(){var e=this.state,t=e.news,n=e.searchField,a=t.filter((function(e){return e.title.toLowerCase().includes(n.toLowerCase())}));return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"News Me"),r.a.createElement(f,{placeholder:"Search news..",handleSearch:this.handleSearch}),this.state.isLoading?r.a.createElement(m,null):r.a.createElement(d,{news:a}),r.a.createElement(p,null))}}]),n}(a.Component));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}],[[7,1,2]]]);
//# sourceMappingURL=main.69a40eef.chunk.js.map