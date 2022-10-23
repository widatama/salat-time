(function(t){function e(e){for(var n,c,s=e[0],i=e[1],l=e[2],d=0,b=[];d<s.length;d++)c=s[d],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&b.push(o[c][0]),o[c]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);u&&u(e);while(b.length)b.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,s=1;s<a.length;s++){var i=a[s];0!==o[i]&&(n=!1)}n&&(r.splice(e--,1),t=c(c.s=a[0]))}return t}var n={},o={app:0},r=[];function c(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=t,c.c=n,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(a,n,function(e){return t[e]}.bind(null,n));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=i;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},cd49:function(t,e,a){"use strict";a.r(e);var n=a("7a23");const o={class:"app-header"},r=Object(n["f"])("h1",{class:"app__title"},[Object(n["f"])("strong",null,"Salat"),Object(n["e"])("Time")],-1),c={class:"app-content"};function s(t,e,a,s,i,l){const u=Object(n["u"])("current-time"),d=Object(n["u"])("router-view");return Object(n["p"])(),Object(n["d"])(n["a"],null,[Object(n["f"])("header",o,[r,Object(n["f"])(u)]),Object(n["f"])("section",c,[Object(n["f"])(d)])],64)}const i={class:"current-time"},l={class:"clock"},u=Object(n["f"])("span",{class:"clock__ticker"}," : ",-1);function d(t,e,a,o,r,c){return Object(n["p"])(),Object(n["d"])("div",i,[Object(n["f"])("span",l,[Object(n["e"])(Object(n["w"])(t.hour),1),u,Object(n["e"])(Object(n["w"])(t.minute),1)])])}var b=a("b166");const p=1e3;var O=Object(n["g"])({name:"current-time",setup(){const t=Object(n["s"])(new Date);return Object(n["n"])(()=>{setInterval(()=>{t.value=new Date},p)}),{dateObj:t,hour:Object(n["b"])(()=>Object(b["a"])(t.value,"HH")),minute:Object(n["b"])(()=>Object(b["a"])(t.value,"mm"))}}});O.render=d;var j=O,f={components:{"current-time":j}};f.render=s;var m=f,g=a("9483");Object(g["a"])("service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}});var y=a("6c02");const v={class:"salat-next"},h={class:"salat-schedule"},S={class:"salat-schedule__heading"},w={class:"salat-schedule__switcher"},P=Object(n["e"])(" ");function A(t,e,a,o,r,c){const s=Object(n["u"])("loading-cue"),i=Object(n["u"])("notification"),l=Object(n["u"])("salat"),u=Object(n["u"])("current-location"),d=Object(n["u"])("DayDisplay"),b=Object(n["u"])("salat-list");return t.isLoading?(Object(n["p"])(),Object(n["d"])(s,{key:0,"loading-text":t.appPhase},null,8,["loading-text"])):(Object(n["p"])(),Object(n["d"])(n["a"],{key:1},[t.isError?(Object(n["p"])(),Object(n["d"])(i,{key:0,"notification-message":t.appError},null,8,["notification-message"])):(Object(n["p"])(),Object(n["d"])(n["a"],{key:1},[Object(n["f"])("div",v,[Object(n["f"])(l,{salat:t.nextSalat,"disp-type":"next"},null,8,["salat"]),Object(n["f"])(u,{location:t.location},null,8,["location"])]),Object(n["f"])("div",h,[Object(n["f"])("div",S,[Object(n["f"])(d,{dateObj:t.dateToDisplay},null,8,["dateObj"]),Object(n["f"])("div",w,[Object(n["f"])("span",{class:["salat-schedule__switch",{"salat-schedule__switch--inactive":"today"===t.selectedDay}],onClick:e[1]||(e[1]=e=>t.selectDay("today"))},"←",2),P,Object(n["f"])("span",{class:["salat-schedule__switch",{"salat-schedule__switch--inactive":"today"!==t.selectedDay}],onClick:e[2]||(e[2]=e=>t.selectDay("tomorrow"))},"→",2)])]),Object(n["f"])(b,{"salat-list":"today"===t.selectedDay?t.todaySalat:t.tomorrowSalat},null,8,["salat-list"])])],64))],64))}var _=a("2230"),D=a("5502");const T={class:"current-day"};function E(t,e,a,o,r,c){return Object(n["p"])(),Object(n["d"])("div",T,Object(n["w"])(t.day)+" "+Object(n["w"])(t.date)+" "+Object(n["w"])(t.month)+" "+Object(n["w"])(t.year),1)}var x=Object(n["g"])({name:"DayDisplay",props:{dateObj:{type:Date,required:!0}},setup(t){const{dateObj:e}=Object(n["x"])(t);return{date:Object(n["b"])(()=>Object(b["a"])(e.value,"dd")),day:Object(n["b"])(()=>Object(b["a"])(e.value,"EEEE")),month:Object(n["b"])(()=>Object(b["a"])(e.value,"MMMM")),year:Object(n["b"])(()=>Object(b["a"])(e.value,"yyyy"))}}});x.render=E;var k=x;const L={class:"loading-cue"};function R(t,e,a,o,r,c){return Object(n["p"])(),Object(n["d"])("div",L,Object(n["w"])(t.loadingText),1)}var U=Object(n["g"])({props:["loadingText"]});U.render=R;var M=U;const N={class:"location"};function z(t,e,a,o,r,c){return Object(n["p"])(),Object(n["d"])("div",N,[Object(n["f"])("div",null,Object(n["w"])(t.area),1),Object(n["f"])("div",null,Object(n["w"])(t.country),1)])}var H=Object(n["g"])({props:{location:{type:Object,required:!0}},setup(t){const e=Object(n["b"])(()=>{const e=[];return t.location.city?e.push(t.location.city):t.location.village&&e.push(t.location.village),t.location.state&&e.push(t.location.state),e.join(", ")});return{area:e,country:Object(n["b"])(()=>t.location.country)}}});H.render=z;var q=H;const F={class:"notification"};function I(t,e,a,o,r,c){return Object(n["p"])(),Object(n["d"])("div",F,Object(n["w"])(t.notificationMessage),1)}var C=Object(n["g"])({props:["notificationMessage"]});C.render=I;var G=C;function W(t,e,a,o,r,c){const s=Object(n["u"])("time-display");return Object(n["p"])(),Object(n["d"])("div",{class:["salat",t.className("salat--")]},[Object(n["f"])("div",{class:["salat__name",t.className("salat__name--")]},Object(n["w"])(t.salat.name),3),Object(n["f"])("div",{class:["salat__time",t.className("salat__time--")]},[Object(n["f"])(s,{time:t.salat.time},null,8,["time"])],2)],2)}const X={class:"time-display"};function Y(t,e,a,o,r,c){return Object(n["p"])(),Object(n["d"])("div",X,Object(n["w"])(t.time),1)}var J=Object(n["g"])({props:["time"]});J.render=Y;var $=J,B=Object(n["g"])({components:{"time-display":$},props:{salat:{type:Object},dispType:{type:String}},setup(t){return{salat:t.salat,className(e){return t.dispType?e+t.dispType:""}}}});B.render=W;var K=B;const Q={class:"salat-items"};function V(t,e,a,o,r,c){const s=Object(n["u"])("salat");return Object(n["p"])(),Object(n["d"])("ul",Q,[(Object(n["p"])(!0),Object(n["d"])(n["a"],null,Object(n["t"])(t.salatList,t=>(Object(n["p"])(),Object(n["d"])("li",{class:"salat-item",key:t.name+t.date},[Object(n["f"])(s,{salat:t},null,8,["salat"])]))),128))])}var Z=Object(n["g"])({components:{salat:K},props:["salatList"]});Z.render=V;var tt=Z;const et=6e5;var at=Object(n["g"])({name:"day",components:{DayDisplay:k,"current-location":q,"loading-cue":M,notification:G,salat:K,"salat-list":tt},setup(){const t=Object(D["b"])(),e=Object(n["s"])("today"),a=Object(n["b"])(()=>new Date),o=Object(n["b"])(()=>Object(_["a"])(new Date,{days:1})),r=Object(n["b"])(()=>"today"===e.value?a.value:o.value);function c(t){e.value=t}return Object(n["n"])(()=>{t.dispatch("initializeState"),setInterval(()=>{t.dispatch("loadSalat")},et)}),{selectedDay:e,dateToDisplay:r,appError:Object(n["b"])(()=>t.getters.appError),appPhase:Object(n["b"])(()=>t.getters.appPhase),isError:Object(n["b"])(()=>t.getters.isError),isLoading:Object(n["b"])(()=>t.getters.isLoading),location:Object(n["b"])(()=>t.getters.location),nextSalat:Object(n["b"])(()=>t.getters.nextSalat),todaySalat:Object(n["b"])(()=>t.getters.todaySalat),tomorrowSalat:Object(n["b"])(()=>t.getters.tomorrowSalat),selectDay:c}}});at.render=A;var nt=at;const ot=[{alias:"/salat-time",path:"/",name:"Day",component:nt}],rt=Object(y["a"])({history:Object(y["b"])(""),routes:ot});var ct=rt,st=a("c458"),it=a.n(st),lt=a("1816"),ut=a.n(lt);function dt(){return new Promise((t,e)=>{"geolocation"in navigator?navigator.geolocation.getCurrentPosition(t,e,{enableHighAccuracy:!0}):e(Error("Geolocation not available"))})}const bt={locate:dt};var pt=bt;function Ot(t){if(t.status>=200&&t.status<300||t.ok)return t;const e=new Error(t.statusText);throw e}function jt(t,e){return fetch(t,e).then(Ot).then(t=>t.json()).catch(t=>{throw t})}const ft={get:jt};var mt=ft;function gt(t){const e={};return e.country=t.country_name,e.city=t.city,e.village=t.district,e.state=t.region,e.timezone=t.timezone_name,e.latitude=parseFloat(t.latitude),e.longitude=parseFloat(t.longitude),e}function yt(t){const e={};return e.country=t.address.country,t.address.state_district?e.city=t.address.state_district:e.city=t.address.city,e.village=t.address.village,e.state=t.address.state,e.latitude=parseFloat(t.lat),e.longitude=parseFloat(t.lon),e}const vt={transformIPLocationResponse:gt,transformReverseGeolocationResponse:yt};var ht=vt;const St={};function wt(){return"https://json.geoiplookup.io/"}function Pt(t){const e="https://nominatim.openstreetmap.org/reverse?format=json&zoom=15&addressdetails=1",a=new ut.a(e,!0),{query:n}=a;return n.lat=t.latitude,n.lon=t.longitude,a.set("query",n),a.href}St.get=()=>pt.locate().then(t=>{const e=Pt(t.coords);return mt.get(e).then(t=>{const e=ht.transformReverseGeolocationResponse(t),a=it.a.determine();return e.timezone=a.name(),e})},()=>{const t=wt();return mt.get(t).then(t=>ht.transformIPLocationResponse(t))});var At=St,_t=a("f7f1"),Dt=a("2cf3"),Tt=a("1212");const Et={};function xt(t,e){const a=Object.keys(t).map(a=>{const n=t[a].split(":").join(" : ");return{name:a,date:e,time:n}});return a}function kt(t){const e=Object(Dt["a"])(`${t.date} ${t.time}`,"d MMM yyyy HH : mm",new Date);return!!Object(Tt["a"])(e,new Date)}function Lt(t){const e={};return Object.assign(e,t),delete e.Sunrise,delete e.Sunset,delete e.Imsak,delete e.Midnight,e}Et.transformSalatData=t=>{const e=Lt(t.timings);return xt(e,t.date.readable)},Et.getNextSalat=(t,e)=>{const a=Et.transformSalatData(t),n=Et.transformSalatData(e);return a.concat(n).find(kt)};var Rt=Et;const Ut={};function Mt(t,e){const a="https://api.aladhan.com/v1/timings/",n=new ut.a(a,!0),{query:o}=n;return n.pathname=[n.pathname,e].join(""),o.latitude=t.latitude.toString(),o.longitude=t.longitude.toString(),o.timezonestring=t.timezone,o.method="3",n.set("query",o),n.href}Ut.get=t=>{const e=Mt(t,Object(b["a"])(new Date,"t")),a=Mt(t,Object(b["a"])(Object(_t["a"])(new Date,1),"t"));return Promise.all([mt.get(e),mt.get(a)]).then(t=>{const e=Rt.transformSalatData(t[0].data),a=Rt.transformSalatData(t[1].data),n=Rt.getNextSalat(t[0].data,t[1].data);return{todaySalat:e,tomorrowSalat:a,nextSalat:n}})};var Nt=Ut;function zt({commit:t}){At.get().then(e=>(t("UPDATE_APPPHASE","locating"),t("UPDATE_LOCATION",e),e)).then(e=>(t("UPDATE_APPPHASE","loading salat"),Nt.get({latitude:e.latitude,longitude:e.longitude,timezone:e.timezone}))).then(e=>{t("UPDATE_TODAYSALAT",e.todaySalat),t("UPDATE_TOMORROWSALAT",e.tomorrowSalat),t("UPDATE_NEXTSALAT",e.nextSalat),t("UPDATE_APPPHASE","standby")}).catch(e=>{if("Failed to fetch"===e.message){const e=new Error("Network error, please check your connection and disable adblock");t("UPDATE_APPPHASE","network error"),t("UPDATE_APPERROR",e)}console.error(e)})}function Ht({commit:t,state:e}){Nt.get(e.location).then(e=>{t("UPDATE_TODAYSALAT",e.todaySalat),t("UPDATE_TOMORROWSALAT",e.tomorrowSalat),t("UPDATE_NEXTSALAT",e.nextSalat)})}const qt={initializeState:zt,loadSalat:Ht};var Ft=qt;const It=t=>{const{appPhase:e}=t;return"loading salat"===e||"locating"===e},Ct=t=>{const{appPhase:e}=t;return e.indexOf("error")>-1},Gt=t=>t.appPhase,Wt=t=>t.appError,Xt=t=>t.location,Yt=t=>t.todaySalat,Jt=t=>t.tomorrowSalat,$t=t=>t.nextSalat,Bt={isLoading:It,isError:Ct,appPhase:Gt,appError:Wt,location:Xt,todaySalat:Yt,tomorrowSalat:Jt,nextSalat:$t};var Kt=Bt;const Qt="UPDATE_LOCATION",Vt="UPDATE_APPPHASE",Zt="UPDATE_APPERROR",te="UPDATE_TODAYSALAT",ee="UPDATE_TOMORROWSALAT",ae="UPDATE_NEXTSALAT",ne={[Vt](t,e){t.appPhase=e},[Zt](t,e){t.appError=e},[Qt](t,e){t.location=e},[te](t,e){t.todaySalat=e},[ee](t,e){t.tomorrowSalat=e},[ae](t,e){t.nextSalat=e}};var oe=ne,re=Object(D["a"])({actions:Ft,getters:Kt,mutations:oe,state:{appPhase:"locating",appError:{},location:{country:"",city:"",time_zone:"",latitude:0,longitude:0},todaySalat:[{name:"",date:"",time:""}],tomorrowSalat:[{name:"",date:"",time:""}],nextSalat:{name:"",date:"",time:""}}});a("ce87");Object(n["c"])(m).use(re).use(ct).mount("#app")},ce87:function(t,e,a){}});
//# sourceMappingURL=app.b70d0bb4.js.map