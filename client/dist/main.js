(()=>{"use strict";var n={72:(n,e,t)=>{t.d(e,{Z:()=>s});var o=t(81),r=t.n(o),a=t(645),i=t.n(a)()(r());i.push([n.id,".auth {\n  margin: 0 auto;\n}\n\n.auth-title {\n  color: var(--primary-color);\n  margin-bottom: 20px;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  width: 400px;\n  margin: 0 auto;\n  padding: 50px 30px;\n  margin-top: 40px;\n  background-color: var(--background-secondory);\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n}\n\nform label {\n  font-weight: 700;\n  font-size: 12px;\n  color: var(--text-color);\n  margin-left: 5px;\n}\n\nform input {\n  padding-bottom: 10px;\n  margin: 5px 0;\n  padding: 10px;\n  border-radius: 5px;\n  border: 1px solid var(--border-color);\n  background-color: var(--background-color);\n  color: var(--text-color);\n}\n\nform button {\n  padding: 10px;\n  margin-top: 20px;\n  transition: 0.5s ease-in-out;\n  border: 1px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--primary-color);\n  cursor: pointer;\n\n}\n\nform button:hover {\n  background-color: var(--primary-color);\n  border: 1px solid var(--border-color);\n}\n\nform p {\n  padding: 1px 5px;\n  margin: 20px auto;\n  color: var(--text-color);\n}\n\nform .errorMsg p {\n  padding: 5px 10px;\n  color: lightcoral;\n  margin: 0 auto;\n  text-align: center;\n}\n\n\n.fullName {\n  display: flex;\n}\n\n.fullName div{\n  width: 50%;\n}\n\n.fullName div:first-child {\n  margin-right: 10px;\n}\n\n.fullName div input{\n  width: 100%;\n}\n\n\n\n\n\n#gender{\n  width: 100%;\n  margin: 5px auto;\n  background: var(--background-color);\n  padding: 10px;\n  border: 1px solid var(--border-color);\n  border-radius: 5px;\n  color: var(--text-color);\n}\n\n",""]);const s=i},145:(n,e,t)=>{t.d(e,{Z:()=>s});var o=t(81),r=t.n(o),a=t(645),i=t.n(a)()(r());i.push([n.id,".navbar {\n  display: flex;\n  background-color: var(--background-secondory);\n  width: 100%;\n  align-items: center;\n  justify-content: space-between;\n  height: 65px;\n  padding-left: 50px;\n  padding-right: 100px;\n  border-bottom: 1px solid var(--border-color);\n  position: fixed;\n  z-index: 100;\n}\n\n.logo {\n  font-size: 40px;\n  color: white;\n  display: inline-block;\n}\n\n.nav-start {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.search_input {\n  border: transparent;\n  background-color: var(--primary-color);\n  width: 370px;\n  height: 35px;\n  border-radius: 50px;\n  padding: 8px;\n  font-size: 16px;\n  color: rgba(255, 255, 255, 0.8);\n  padding-left: 40px;\n}\n\n.search_input::placeholder {\n  color: rgba(0, 0, 0, 0.2);\n}\n\n.input-block {\n  position: relative;\n}\n\n.search-icon {\n  position: absolute;\n  left: 10px;\n  top: 5px;\n  color: var(--background-color);\n}\n\n.search_input:focus {\n  outline: none;\n}\n\n.input-select-block {\n  display: flex;\n  min-width: 38rem;\n  justify-content: space-between;\n  margin-left: 200px;\n}\n\n.select-block {\n  width: 200px;\n  padding: 5px;\n  display: flex;\n  align-items: center;\n  background-color: var(--primary-color);\n  border-radius: 50px;\n}\n\n.create-post-button {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background-color: var(--primary-color);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-left: 20px;\n}\n\n.user-block {\n  display: flex;\n  align-items: center;\n}\n\n.message-button {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n\n.user-profile {\n  display: flex;\n  border: 1px solid var(--border-color);\n  padding: 5px;\n  margin-left: 20px;\n  border-radius: 10px;\n}\n\n.user-profile-selector {\n  display: flex;\n  font-size: 14px;\n  color: white;\n}\n.user-profile-selector p {\n  text-wrap: nowrap;\n  color: rgba(255, 255, 255, 0.772);\n  margin-left: 10px;\n  font-weight: 700;\n}\n\n.user-profile-selector img {\n  margin: 0 10px;\n}\n\n.navbar-auth {\n  display: flex;\n}\n\n.navbar-auth a {\n  display: flex;\n  text-decoration: none;\n  color: var(--text-color);\n  margin: auto;\n}\n\n.navbar-button {\n  width: 100px;\n  height: 38px;\n  border-radius: 5px;\n  text-align: center;\n  border: 1px solid var(--border-color);\n  cursor: pointer;\n  margin-right:20px;\n  /* margin-right: 20px; */\n  display: flex;\n}\n\n.navbar-button p {\n  text-align: center;\n  margin: auto;\n}\n\n.categories {\n  color: #000000;\n  background-color: #638c47;\n  width: 100%;\n  font-size: 18px;\n  border: transparent;\n}\n\n.categories:focus {\n  outline: none;\n}\n\n\n.user-avatar {\n  width: 25px;\n  height: 25px;\n}",""]);const s=i},661:(n,e,t)=>{t.d(e,{Z:()=>s});var o=t(81),r=t.n(o),a=t(645),i=t.n(a)()(r());i.push([n.id,"/* .post-feed {\n} */\n\n.post {\n  width: 600px;\n  border-radius: 10px;\n  background-color: var(--background-secondory);\n  padding: 20px;\n  color: rgba(255, 255, 255, 0.745);\n  margin-bottom: 20px;\n  border: 1px solid var(--border-color);\n}\n\n.post-body-img {\n  width: 100%;\n  margin: 10px 0;\n  /* temp */\n  border-radius: 10px;\n}\n.post-header {\n  color: white;\n}\n\n.post-header-category {\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 12px;\n  padding: 2px;\n  margin-left: 5px;\n  margin-bottom: 10px;\n}\n\n.post-header-title {\n  font-weight: 700;\n  margin-bottom: 10px;\n  font-size: 20px;\n  width: 500px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: var(--primary-color);\n}\n\n.post-body {\n  padding: 5px;\n}\n\n.post-body-text {\n  font-size: 14px;\n  font-weight: 600;\n}\n",""]);const s=i},890:(n,e,t)=>{t.d(e,{Z:()=>s});var o=t(81),r=t.n(o),a=t(645),i=t.n(a)()(r());i.push([n.id,'* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n:root {\n  --background-color: rgb(24, 24, 24);\n  --primary-color: #638c47;\n  --background-secondory: #242424;\n  --border-color: rgba(79, 79, 79, 0.72);\n  --text-color: rgba(255, 255, 255, 0.72);\n}\n\nbody {\n  background-color: var(--background-color);\n  font-family: "Roboto", sans-serif;\n  position: relative;\n}\n\n.container {\n  position: relative;\n  display: flex;\n  width: 1120px;\n  margin: 0 auto;\n  padding: 20px;\n  top: 65px;\n  height: 100vh;\n  overflow-y: scroll;\n}\n\n.container::-webkit-scrollbar {\n  display: none;\n}\n',""]);const s=i},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,r,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(i[l]=!0)}for(var c=0;c<n.length;c++){var d=[].concat(n[c]);o&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),e.push(d))}},e}},81:n=>{n.exports=function(n){return n[1]}},379:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var a={},i=[],s=0;s<n.length;s++){var l=n[s],c=o.base?l[0]+o.base:l[0],d=a[c]||0,p="".concat(c," ").concat(d);a[c]=d+1;var u=t(p),m={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)e[u].references++,e[u].updater(m);else{var g=r(m,o);o.byIndex=s,e.splice(s,0,{identifier:p,updater:g,references:1})}i.push(p)}return i}function r(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var a=o(n=n||[],r=r||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var s=t(a[i]);e[s].references--}for(var l=o(n,r),c=0;c<a.length;c++){var d=t(a[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}a=l}}},569:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={id:o,exports:{}};return n[o](a,a.exports,t),a.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var o=e.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&!n;)n=o[r--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),t.nc=void 0,(()=>{const n=async()=>{try{const n=await fetch("http://localhost:8080/api/v1/auth/checkCookie",{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"});if(!n.ok)throw new Error(`Request failed with status: ${n.status}`);const e=await n.json();return console.log("Server response:",e),e.cookiePresent}catch(n){throw console.error("Fetch error:",n),n}};var e=t(379),o=t.n(e),r=t(795),a=t.n(r),i=t(569),s=t.n(i),l=t(565),c=t.n(l),d=t(216),p=t.n(d),u=t(589),m=t.n(u),g=t(145),h={};h.styleTagTransform=m(),h.setAttributes=c(),h.insert=s().bind(null,"head"),h.domAPI=a(),h.insertStyleElement=p(),o()(g.Z,h),g.Z&&g.Z.locals&&g.Z.locals;const f=t.p+"assets/search.svg",v=t.p+"assets/plus.svg",b=t.p+"assets/avatar.svg.png",x=t.p+"assets/arrow.svg",y=t.p+"assets/message.svg";var w=t(890),E={};E.styleTagTransform=m(),E.setAttributes=c(),E.insert=s().bind(null,"head"),E.domAPI=a(),E.insertStyleElement=p(),o()(w.Z,E),w.Z&&w.Z.locals&&w.Z.locals;var k=t(661),S={};function T(n){const{category:e,title:t,text:o,imageURL:r,commentCounter:a}=n,i=document.createElement("div");i.classList.add("post");const s=document.createElement("div");s.classList.add("post-header");const l=document.createElement("p");l.classList.add("post-header-category"),l.textContent=e;const c=document.createElement("div");c.classList.add("post-header-title"),c.textContent=t,s.appendChild(l),s.appendChild(c);const d=document.createElement("div");d.classList.add("post-body");const p=document.createElement("div");p.classList.add("post-body-text"),p.textContent=o;const u=document.createElement("img");u.src=r,u.alt="post-img",u.classList.add("post-body-img"),d.appendChild(p),d.appendChild(u);const m=document.createElement("div");m.classList.add("post-footer");const g=document.createElement("div");return g.classList.add("post-footer-commentsAmount"),g.innerHTML=`${a} <span>comments</span>`,m.appendChild(g),i.appendChild(s),i.appendChild(d),i.appendChild(m),i}S.styleTagTransform=m(),S.setAttributes=c(),S.insert=s().bind(null,"head"),S.domAPI=a(),S.insertStyleElement=p(),o()(k.Z,S),k.Z&&k.Z.locals&&k.Z.locals;const L={category:"/adventure",title:"What is Lorem Ipsum?",text:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content he...",imageURL:"https://platinumlist.net/guide/wp-content/uploads/2023/03/8359_img_worlds_of_adventure-big1613913137.jpg-1024x683.webp",commentCounter:0};function C(){const n=document.querySelector(".root");n.innerHTML="",document.querySelector(".root").innerHTML=`\n  <nav class="navbar">\n  <div class="nav-start">\n    <a href="#/home"><h1 class="logo">VOYAGE</h1></a>\n    <div class="input-select-block">\n      <div class="input-block">\n        <input type="text" class="search_input" placeholder="Search" maxlength="15" />\n        <img src=${f} alt="" class="search-icon" />\n      </div>\n      <div class="select-block">\n\n        <select name="categories" class="categories">\n          <option value="categories">categories</option>\n          <option value="Sport">Sport</option>\n          <option value="Politics">Politics</option>\n          <option value="Fun">Fun</option>\n          <option value="Technologies">Technologies</option>\n        </select>\n\n      </div>\n\n    </div>\n  </div>\n  <div class="user-block">\n    <div class="message-button">\n      <img src="${y}" alt="message-button">\n    </div>\n    <div class="create-post-button">\n      <img src="${v}" alt="create-post-button"></img>\n    </div>\n    <div class="user-profile">\n      <img class="user-avatar" src=${b} alt="profile">\n\n      <div class="user-profile-selector">\n        <p>Filthy Frank</p>\n        <img   src="${x}" alt="arrow">\n      </div>\n    </div>\n  </div>\n</nav>`;const e=document.createElement("div"),t=document.createElement("div");t.classList.add("post-feed"),e.classList.add("container"),n.append(e);const o=T(L),r=T(L);t.appendChild(o),t.appendChild(r),e.appendChild(t)}function P(){document.querySelector(".root").innerHTML='\n    <nav class="navbar">\n\n    <a href="#/home"> <h1 class="logo">VOYAGE</h1></a>\n    </div>\n    <div class="navbar-auth">\n\n        <a href="#/login"><div class="navbar-button"><p>Sign in</p></div></a>\n\n        <a href="#/register">\n        <div class="navbar-button"><p>Sign up</p></div>\n      </a>\n      </div>\n  </nav>'}var A=t(72),M={};async function R(){try{const e=await n();if(console.log(e),e)window.location.href="#/home",N();else{const t=document.querySelector(".root");P();const o=document.createElement("main");o.className="main",o.innerHTML='\n        <div class="container">\n            <div class="auth">\n                <form type="submit" action="/login" class="form" method="POST">\n                    <h1 class="auth-title">SIGN-IN</h1>\n\n                    <label>Email/Nickname</label>\n                    <input type="text" placeholder="Email,Login" name="email" />\n\n                    <label>PASSWORD</label>\n                    <input type="password" name="password" placeholder="********" />\n\n                    <button type="submit">SIGN-IN</button>\n\n                    <p>\n                        Don\'t have an account?\n                        <a href="#/register">register</a>\n                    </p>\n\n                    <div class="errorMsg"></div>\n                </form>\n            </div>\n        </div>\n    ',t.appendChild(o);const r=document.querySelector(".form");function a(n){n.preventDefault();const e=new FormData(r),t={};e.forEach(((n,e)=>{"confirm_password"!==e&&(t[e]=n)})),console.log("Form data:",t),fetch("http://localhost:8080/api/v1/users/login",{method:"POST",headers:{"Content-Type":"application/json","Access-Control-Request-Method":"POST"},credentials:"include",body:JSON.stringify(t)}).then((n=>{if(!n.ok)throw new Error("Network response was not ok");return n.json()})).then((n=>{console.log("Server response:",n),window.location.href="#/home",N()})).catch((n=>{console.log("Fetch error:",n)}))}r.addEventListener("submit",a)}}catch(i){console.error("Error checking user login:",i)}}M.styleTagTransform=m(),M.setAttributes=c(),M.insert=s().bind(null,"head"),M.domAPI=a(),M.insertStyleElement=p(),o()(A.Z,M),A.Z&&A.Z.locals&&A.Z.locals;const N=async()=>{const e=window.location.hash.slice(1);if(console.log("Current Path:",e),e.startsWith("/post/")){const n=e.split("/")[2];console.log("Rendering Post Page for Post ID:",n),RenderPostPage(n)}else try{const t=await n();switch(e){case"/home":if(!t)return console.log("User not logged in, redirecting to Login Page"),void R();console.log("Rendering Home Page"),C();break;case"/login":console.log("Rendering Login Page"),R();break;case"/register":console.log("Rendering Register Page"),async function(){try{const e=await n();if(console.log(e),e)window.location.href="#/home",N();else{const t=document.querySelector(".root");t.innerHTML="",P();const o=document.createElement("main");o.className="main",o.innerHTML='\n<div class="container">\n  <div class="auth">\n    <form type="submit" action="/register" class="form" method="POST">\n      <h1 class="auth-title">REGISTER</h1>\n      <label>EMAIL</label>\n      <input type="email" placeholder="Email address" name="email" required />\n      <label>USERNAME</label>\n      <input type="text" placeholder="Username" name="username" minlength="3" required />\n\n      <div class="fullName">\n\n        <div>\n          <label>FIRST NAME</label>\n          <input type="text" placeholder="First name" name="first_name" minlength="3" required />\n\n        </div>\n\n        <div>\n          <label>LAST NAME</label>\n          <input type="text" placeholder="Last name" name="last_name" minlength="3" required />\n\n        </div>\n\n      </div>\n\n      <label>GENDER</label>\n      <div>\n        <select id="gender" name="gender">\n          <option value="male" selected>MALE</option>\n          <option value="female">FEMALE</option>\n          <option value="diverse">DIVERSE</option>\n        </select>\n      </div>\n\n      <label>DATE OF BIRTH</label>\n      <input type="date" name="date_of_birth" required />\n\n      <label>PASSWORD</label>\n      <input type="password" name="password" placeholder="********" minlength="8" maxlength="32" required />\n\n      <label>CONFIRM PASSWORD</label>\n      <input type="password" name="confirm_password" placeholder="********" minlength="8" maxlength="32" required />\n\n      <button type="submit">REGISTER</button>\n      <p>\n        Already have an account? <a href="/./src/templates/login.html">sign-in</a>\n      </p>\n      <div class="errorMsg"></div>\n    </form>\n  </div>\n</div>\n',t.appendChild(o);const r=document.querySelector(".form");function a(n){if(n.preventDefault(),document.querySelector('input[name="password"]').value!==document.querySelector('input[name="confirm_password"]').value)return void alert("Passwords do not match");const e=new FormData(r),t={};e.forEach(((n,e)=>{"confirm_password"!==e&&(t[e]=n)})),console.log("Form data:",t),fetch("http://localhost:8080/api/v1/users/create",{method:"POST",headers:{"Content-Type":"application/json","Access-Control-Request-Method":"POST"},body:JSON.stringify(t)}).then((n=>{if(!n.ok)throw new Error("Network response was not ok");return n.json()})).then((n=>{console.log("Server response:",n)})).catch((n=>{console.log("Fetch error:",n)}))}r.addEventListener("submit",a)}}catch(i){console.error("Error checking user login:",i)}}();break;default:if(!t)return console.log("User not logged in, redirecting to Login Page"),void R();console.log("Unknown Path, Rendering Home Page"),C()}}catch(n){console.error("Error checking user login:",n)}};document.querySelector(".root"),window.addEventListener("DOMContentLoaded",(()=>{console.log("DOMContentLoaded"),N()})),window.addEventListener("hashchange",(()=>{console.log("hashchange"),N()})),document.addEventListener("click",(n=>{const e=n.target;if("A"===e.tagName&&e.origin===window.location.origin){n.preventDefault();const t=e.getAttribute("href");window.location.hash=t,console.log("Hash updated to:",t),N()}}))})()})();