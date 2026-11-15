var N=globalThis,M=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),nt=new WeakMap,S=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(M&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&nt.set(e,t))}return t}toString(){return this.cssText}},it=i=>new S(typeof i=="string"?i:i+"",void 0,W),C=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,n,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new S(e,i,W)},rt=(i,t)=>{if(M)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=N.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},j=M?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return it(e)})(i):i;var{is:Tt,defineProperty:kt,getOwnPropertyDescriptor:Ht,getOwnPropertyNames:Pt,getOwnPropertySymbols:Rt,getPrototypeOf:Ot}=Object,U=globalThis,ot=U.trustedTypes,Lt=ot?ot.emptyScript:"",Nt=U.reactiveElementPolyfillSupport,x=(i,t)=>i,B={toAttribute(i,t){switch(t){case Boolean:i=i?Lt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},lt=(i,t)=>!Tt(i,t),at={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:lt};Symbol.metadata??=Symbol("metadata"),U.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=at){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&kt(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:r}=Ht(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let h=n?.call(this);r?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??at}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;let t=Ot(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){let e=this.properties,s=[...Pt(e),...Rt(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(j(n))}else t!==void 0&&e.push(j(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:B).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let r=s.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:B;this._$Em=n;let h=o.fromAttribute(e,r.type);this[n]=h??this._$Ej?.get(n)??h,this._$Em=null}}requestUpdate(t,e,s,n=!1,r){if(t!==void 0){let o=this.constructor;if(n===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??lt)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,r]of s){let{wrapped:o}=r,h=this[n];o!==!0||this._$AL.has(n)||h===void 0||this.C(n,void 0,r,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[x("elementProperties")]=new Map,f[x("finalized")]=new Map,Nt?.({ReactiveElement:f}),(U.reactiveElementVersions??=[]).push("2.1.2");var J=globalThis,ht=i=>i,D=J.trustedTypes,ct=D?D.createPolicy("lit-html",{createHTML:i=>i}):void 0,ft="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,_t="?"+$,Mt=`<${_t}>`,b=document,k=()=>b.createComment(""),H=i=>i===null||typeof i!="object"&&typeof i!="function",Z=Array.isArray,Ut=i=>Z(i)||typeof i?.[Symbol.iterator]=="function",I=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ut=/>/g,v=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pt=/'/g,mt=/"/g,yt=/^(?:script|style|textarea|title)$/i,Y=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),d=Y(1),oe=Y(2),ae=Y(3),_=Symbol.for("lit-noChange"),a=Symbol.for("lit-nothing"),gt=new WeakMap,w=b.createTreeWalker(b,129);function $t(i,t){if(!Z(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}var Dt=(i,t)=>{let e=i.length-1,s=[],n,r=t===2?"<svg>":t===3?"<math>":"",o=T;for(let h=0;h<e;h++){let l=i[h],u,p,c=-1,g=0;for(;g<l.length&&(o.lastIndex=g,p=o.exec(l),p!==null);)g=o.lastIndex,o===T?p[1]==="!--"?o=dt:p[1]!==void 0?o=ut:p[2]!==void 0?(yt.test(p[2])&&(n=RegExp("</"+p[2],"g")),o=v):p[3]!==void 0&&(o=v):o===v?p[0]===">"?(o=n??T,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,u=p[1],o=p[3]===void 0?v:p[3]==='"'?mt:pt):o===mt||o===pt?o=v:o===dt||o===ut?o=T:(o=v,n=void 0);let y=o===v&&i[h+1].startsWith("/>")?" ":"";r+=o===T?l+Mt:c>=0?(s.push(u),l.slice(0,c)+ft+l.slice(c)+$+y):l+$+(c===-2?h:y)}return[$t(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},P=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,o=0,h=t.length-1,l=this.parts,[u,p]=Dt(t,e);if(this.el=i.createElement(u,s),w.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(n=w.nextNode())!==null&&l.length<h;){if(n.nodeType===1){if(n.hasAttributes())for(let c of n.getAttributeNames())if(c.endsWith(ft)){let g=p[o++],y=n.getAttribute(c).split($),L=/([.?@])?(.*)/.exec(g);l.push({type:1,index:r,name:L[2],strings:y,ctor:L[1]==="."?q:L[1]==="?"?K:L[1]==="@"?F:E}),n.removeAttribute(c)}else c.startsWith($)&&(l.push({type:6,index:r}),n.removeAttribute(c));if(yt.test(n.tagName)){let c=n.textContent.split($),g=c.length-1;if(g>0){n.textContent=D?D.emptyScript:"";for(let y=0;y<g;y++)n.append(c[y],k()),w.nextNode(),l.push({type:2,index:++r});n.append(c[g],k())}}}else if(n.nodeType===8)if(n.data===_t)l.push({type:2,index:r});else{let c=-1;for(;(c=n.data.indexOf($,c+1))!==-1;)l.push({type:7,index:r}),c+=$.length-1}r++}}static createElement(t,e){let s=b.createElement("template");return s.innerHTML=t,s}};function A(i,t,e=i,s){if(t===_)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,r=H(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=A(i,n._$AS(i,t.values),n,s)),t}var V=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??b).importNode(e,!0);w.currentNode=n;let r=w.nextNode(),o=0,h=0,l=s[0];for(;l!==void 0;){if(o===l.index){let u;l.type===2?u=new R(r,r.nextSibling,this,t):l.type===1?u=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(u=new G(r,this,t)),this._$AV.push(u),l=s[++h]}o!==l?.index&&(r=w.nextNode(),o++)}return w.currentNode=b,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},R=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=a,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=A(this,t,e),H(t)?t===a||t==null||t===""?(this._$AH!==a&&this._$AR(),this._$AH=a):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ut(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==a&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=P.createElement($t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let r=new V(n,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=gt.get(t.strings);return e===void 0&&gt.set(t.strings,e=new P(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let r of t)n===e.length?e.push(s=new i(this.O(k()),this.O(k()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ht(t).nextSibling;ht(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,r){this.type=1,this._$AH=a,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=a}_$AI(t,e=this,s,n){let r=this.strings,o=!1;if(r===void 0)t=A(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==_,o&&(this._$AH=t);else{let h=t,l,u;for(t=r[0],l=0;l<r.length-1;l++)u=A(this,h[s+l],e,l),u===_&&(u=this._$AH[l]),o||=!H(u)||u!==this._$AH[l],u===a?t=a:t!==a&&(t+=(u??"")+r[l+1]),this._$AH[l]=u}o&&!n&&this.j(t)}j(t){t===a?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},q=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===a?void 0:t}},K=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==a)}},F=class extends E{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){if((t=A(this,t,e,0)??a)===_)return;let s=this._$AH,n=t===a&&s!==a||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==a&&(s===a||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},G=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){A(this,t)}};var zt=J.litHtmlPolyfillSupport;zt?.(P,R),(J.litHtmlVersions??=[]).push("3.3.3");var vt=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let r=e?.renderBefore??null;s._$litPart$=n=new R(t.insertBefore(k(),r),r,void 0,e??{})}return n._$AI(i),n};var Q=globalThis,m=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};m._$litElement$=!0,m.finalized=!0,Q.litElementHydrateSupport?.({LitElement:m});var Wt=Q.litElementPolyfillSupport;Wt?.({LitElement:m});(Q.litElementVersions??=[]).push("4.2.2");var wt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bt=i=>(...t)=>({_$litDirective$:i,values:t}),z=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var At="important",jt=" !"+At,O=bt(class extends z{constructor(i){if(super(i),i.type!==wt.ATTRIBUTE||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let n=t[s];if(n!=null){this.ft.add(s);let r=typeof n=="string"&&n.endsWith(jt);s.includes("-")||r?e.setProperty(s,r?n.slice(0,-11):n,r?At:""):e[s]=n}}return _}});var Bt={entity:"Warning count sensor",title:"Title",show_headline:"Show each warning's headline",show_area:"Show the areas each warning covers",show_summary:"Show each warning's summary to start with",show_level:"Show each warning's level and phase"},It={entity:"The sensor named ... warning count from the BoM Warnings integration.",title:"Leave empty for the default, Warnings.",show_summary:"Tapping the card shows or hides the summaries."},Et=["show_headline","show_area","show_summary","show_level"],X=class extends m{constructor(){super(...arguments);this._computeLabel=e=>Bt[e.name]??e.name;this._computeHelper=e=>It[e.name]??""}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}setConfig(e){this._config=e}_schema(){return[{name:"entity",required:!0,selector:{entity:{include_entities:Object.keys(this.hass?.states??{}).filter(s=>s.endsWith("_warning_count"))}}},{name:"title",selector:{text:{}}},...Et.map(s=>({name:s,selector:{boolean:{}}}))]}_changed(e){let s=e.detail.value,n={type:this._config?.type??"custom:bom-warnings-card",...s.entity?{entity:s.entity}:{},...s.title?{title:s.title}:{}};for(let r of Et)s[r]===!1&&(n[r]=!1);this._config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}render(){if(!this._config)return a;let e={show_headline:!0,show_area:!0,show_summary:!0,show_level:!0,...this._config};return d`<ha-form
      .hass=${this.hass}
      .data=${e}
      .schema=${this._schema()}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._changed}
    ></ha-form>`}};customElements.define("bom-warnings-card-editor",X);var Vt=["final","cancelled"],qt=["unknown","unrated"],tt=class extends m{constructor(){super(...arguments);this._summaries=!0;this._toggle=()=>{this._summaries=!this._summaries};this._key=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._toggle())}}static{this.properties={hass:{attribute:!1},_config:{state:!0},_summaries:{state:!0}}}static getConfigElement(){return document.createElement("bom-warnings-card-editor")}static getStubConfig(e){let s=Object.keys(e?.states??{}).filter(o=>o.endsWith("_warning_count")),n=o=>Number(e?.states[o]?.state)||0;return{entity:s.reduce((o,h)=>n(h)>(o?n(o):0)?h:o,void 0)??s[0]??""}}setConfig(e){if(!e.entity)throw new Error("Set an entity, such as sensor.home_warning_count");this._config=e,this._summaries=e.show_summary!==!1}getCardSize(){return 3}_warnings(){let e=this._config&&this.hass?.states[this._config.entity];return!e||e.state==="unavailable"||e.state==="unknown"?[]:e.attributes.warnings??[]}_shell(e,s,n){return d`<ha-card
      header=${e}
      class=${n?"toggles":""}
      role=${n?"button":a}
      tabindex=${n?"0":a}
      aria-expanded=${n?String(this._summaries):a}
      @click=${n?this._toggle:a}
      @keydown=${n?this._key:a}
      >${s}</ha-card
    >`}render(){let e=this._config;if(!e)return a;let s=e.title??"Warnings",n=this.hass?.states[e.entity];if(!n)return this._shell(s,d`<div class="note">Entity not found: ${e.entity}</div>`,!1);if(n.state==="unavailable"||n.state==="unknown")return this._shell(s,d`<div class="note">${n.state}</div>`,!1);let r=this._warnings();return this._shell(s,r.length===0?d`<div class="note">No warnings for this location.</div>`:d`<div class="list">${r.map(o=>this._row(o,e))}</div>`,r.some(o=>o.summary))}_row(e,s){let n=Vt.includes(e.phase??""),o=[qt.includes(e.level??"")?void 0:e.level,n?e.phase:void 0].filter(Boolean).join(", ");return d`<div class="warning ${n?"ended":""}">
      <ha-icon
        icon=${e.icon??"mdi:alert"}
        style=${O({color:e.color??"var(--secondary-text-color)"})}
      ></ha-icon>
      <div class="detail">
        <div class="title">
          <span class="event">${e.event}</span>
          ${e.very_dangerous||e.detailed?d`<span class="badges"
                >${[e.very_dangerous&&"Very dangerous",e.detailed&&"Detailed"].filter(Boolean).map(h=>d`<span class="badge">${h}</span>`)}</span
              >`:a}
          ${s.show_level!==!1&&o?d`<span class="level">(${o})</span>`:a}
        </div>
        ${s.show_headline!==!1?d`<div class="headline">${e.headline}</div>`:a}
        ${s.show_area!==!1&&e.area?d`<div class="area">${e.area}</div>`:a}
        ${this._summaries&&e.summary?d`<div class="summary">${e.summary}</div>`:a}
      </div>
    </div>`}static{this.styles=C`
    .list {
      padding: 0 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ha-card.toggles {
      cursor: pointer;
    }
    ha-card.toggles:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .note {
      padding: 0 16px 16px;
      color: var(--secondary-text-color);
    }
    .warning {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    .warning.ended {
      opacity: 0.6;
    }
    ha-icon {
      flex: none;
      --mdc-icon-size: 28px;
    }
    .event {
      font-weight: 500;
    }
    .badges {
      display: inline-flex;
      gap: 4px;
      margin: 0 4px;
    }
    .badge {
      font-size: 0.75em;
      font-weight: 500;
      padding: 1px 8px;
      border-radius: 10px;
      background: var(--secondary-background-color);
    }
    .level,
    .area,
    .summary {
      color: var(--secondary-text-color);
    }
    .area,
    .summary {
      font-size: 0.9em;
    }
  `}};customElements.define("bom-warnings-card",tt);window.customCards=window.customCards||[];window.customCards.push({type:"bom-warnings-card",name:"BoM Warnings",description:"Current Bureau of Meteorology warnings for a location, most severe first."});var Kt={wind:"Damaging winds",hail:"Large hail",rain:"Heavy rain",flood:"Flash flooding"},Ft="mdi:weather-lightning-rainy";function et(i){return typeof i=="string"&&i?i:void 0}function Gt(i){if(!Array.isArray(i))return;let t=i.map(e=>Kt[String(e)]).filter(Boolean);return t.length?t.join(" \xB7 "):void 0}function Jt(i,t){let e=new Date(i);if(!Number.isNaN(e.getTime()))return new Intl.DateTimeFormat(t.locale?.language,{hour:"numeric",minute:"2-digit",timeZone:t.config?.time_zone}).format(e)}function Zt(i,t){let e=[],s=et(i.next_issue),n=s?Jt(s,t):void 0;n&&e.push(`Update due by ${n}`);let r=(Number(i.current)||0)-1;return r>0&&e.push(`+${r} more ${r===1?"warning":"warnings"}`),e.length?e.join(" \xB7 "):void 0}function St(i,t){let e=i?.attributes;if(!(!e||e.event!=="Thunderstorm"||i.state==="none"||i.state!==e.level))return{title:"Severe thunderstorm",icon:Ft,color:et(e.color),badges:[...e.very_dangerous===!0?["Very dangerous"]:[],...e.detailed===!0?["Detailed"]:[]],hazards:Gt(e.hazards),summary:et(e.summary),footer:Zt(e,t)}}var Yt={extreme:4,severe:3,moderate:2,unrated:2,minor:1},Qt={minor:"Minor",moderate:"Moderate",unrated:"Unrated",severe:"Severe",extreme:"Extreme"},Ct={type:"entity"},xt=["state","headline"];function Xt(i){if(i===void 0)return!0;let t=i;return typeof i=="object"&&i!==null&&!Array.isArray(i)&&t.type==="entity"&&Object.keys(t).length===1}function te(i){return Array.isArray(i?.attributes.warnings)&&i?.attributes.level!==void 0}var ee={columns:6,rows:1},st=class extends m{constructor(){super(...arguments);this._last="";this._open=()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this._config?.entity},bubbles:!0,composed:!0}))};this._key=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._open())}}static{this.properties={hass:{attribute:!1},_config:{state:!0},_tile:{state:!0}}}static async getConfigElement(){return(await window.loadCardHelpers?.())?.createCardElement({type:"tile",entity:"sensor.x"}),await customElements.whenDefined("hui-tile-card"),customElements.get("hui-tile-card").getConfigElement()}static getStubConfig(e){let s=Object.entries(e?.states??{}).filter(([o,h])=>o.startsWith("sensor.")&&o.endsWith("_warning")&&!o.endsWith("_most_severe_warning")&&h?.attributes.level!==void 0&&Array.isArray(h.attributes.warnings)),n=o=>Yt[o?.state??""]??0,[r]=[...s].sort(([,o],[,h])=>n(h)-n(o));return r?{entity:r[0],name:Ct,state_content:xt}:{entity:""}}setConfig(e){if(!e.entity)throw new Error("Set an entity, such as sensor.home_thunderstorm_warning");this._config=e}_thunderstorm(){let e=this._config?.entity;return e&&this.hass?St(this.hass.states[e],this.hass):void 0}getCardSize(){if(this._thunderstorm())return 3;let e=this._tile?.getCardSize?.();return typeof e=="number"?e:1}getGridOptions(){return this._thunderstorm()?{columns:6,min_columns:4,rows:"auto"}:this._tile?.getGridOptions?.()??ee}_thunderstormTile(e){let s=e.color??"var(--secondary-text-color)";return d`<ha-card
      class="thunderstorm"
      role="button"
      tabindex="0"
      @click=${this._open}
      @keydown=${this._key}
    >
      <div class="body">
        <span
          class="icon"
          style=${O({background:`color-mix(in srgb, ${s} 20%, transparent)`})}
        >
          <ha-icon icon=${e.icon} style=${O({color:s})}></ha-icon>
        </span>
        <div class="detail">
          <div class="heading">
            <span class="title">${e.title}</span>
            ${e.badges.length?d`<span class="badges"
                  >${e.badges.map(n=>d`<span class="badge">${n}</span>`)}</span
                >`:a}
          </div>
          ${e.hazards?d`<div class="hazards">${e.hazards}</div>`:a}
          ${e.summary?d`<div class="summary">${e.summary}</div>`:a}
          ${e.footer?d`<div class="footer">${e.footer}</div>`:a}
        </div>
      </div>
    </ha-card>`}updated(){this._sync()}_title(e,s){let n=s.states[e.entity],r=Array.isArray(n?.attributes.warnings)?Qt[n?.state??""]:void 0,o=n?.attributes.friendly_name,h=s.entities?.[e.entity]?.name||(typeof o=="string"?o:"");if(!(r&&h.toLowerCase().startsWith(r.toLowerCase())))return r&&h?`${r} ${h}`:void 0}_tileConfig(e,s){let n=s.states[e.entity],r=n?.attributes.color,o=Xt(e.name)?this._title(e,s):void 0;return{name:Ct,...te(n)?{state_content:xt}:{},...e,type:"tile",...typeof r=="string"&&r?{color:r}:{},...o?{name:o}:{}}}async _sync(){let e=this._config,s=this.hass;if(!e||!s)return;this._tile||(this._making??=this._make(this._tileConfig(e,s)),await this._making);let n=this._tile;if(!n)return;let r=this._tileConfig(e,s),o=JSON.stringify(r);o!==this._last&&(this._last=o,n.setConfig(r)),n.hass=s}async _make(e){let s=await window.loadCardHelpers?.();s&&(this._last=JSON.stringify(e),this._tile=s.createCardElement(e))}render(){let e=this._thunderstorm();return e?this._thunderstormTile(e):this._tile??a}static{this.styles=C`
    :host {
      display: block;
    }
    ha-card.thunderstorm {
      cursor: pointer;
      height: 100%;
    }
    ha-card.thunderstorm:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .body {
      display: flex;
      gap: 12px;
      padding: 12px;
      align-items: flex-start;
    }
    .icon {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .heading {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px 8px;
    }
    .title {
      font-weight: 500;
    }
    .badges {
      display: inline-flex;
      gap: 4px;
    }
    .badge {
      font-size: 0.75em;
      font-weight: 500;
      padding: 1px 8px;
      border-radius: 10px;
      background: var(--secondary-background-color);
    }
    .hazards {
      font-weight: 500;
    }
    .summary,
    .footer {
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .footer {
      margin-top: 4px;
    }
  `}};customElements.define("bom-warning-tile",st);window.customCards=window.customCards||[];window.customCards.push({type:"bom-warning-tile",name:"BoM Warning Tile",description:"One warning type as a tile, with its icon in the colour of the current severity."});
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
