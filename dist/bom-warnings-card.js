var U=globalThis,L=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),it=new WeakMap,S=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=it.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&it.set(e,t))}return t}toString(){return this.cssText}},nt=n=>new S(typeof n=="string"?n:n+"",void 0,W),C=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new S(e,n,W)},rt=(n,t)=>{if(L)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=U.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},B=L?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return nt(e)})(n):n;var{is:kt,defineProperty:Tt,getOwnPropertyDescriptor:Ht,getOwnPropertyNames:Pt,getOwnPropertySymbols:Rt,getPrototypeOf:Ot}=Object,D=globalThis,ot=D.trustedTypes,Nt=ot?ot.emptyScript:"",Mt=D.reactiveElementPolyfillSupport,x=(n,t)=>n,I={toAttribute(n,t){switch(t){case Boolean:n=n?Nt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},lt=(n,t)=>!kt(n,t),at={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:lt};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var m=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=at){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Tt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=Ht(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let h=i?.call(this);r?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??at}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;let t=Ot(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){let e=this.properties,s=[...Pt(e),...Rt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(B(i))}else t!==void 0&&e.push(B(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:I).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:I;this._$Em=i;let h=o.fromAttribute(e,r.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??lt)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,h=this[i];o!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,r,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[x("elementProperties")]=new Map,m[x("finalized")]=new Map,Mt?.({ReactiveElement:m}),(D.reactiveElementVersions??=[]).push("2.1.2");var Z=globalThis,ht=n=>n,z=Z.trustedTypes,ct=z?z.createPolicy("lit-html",{createHTML:n=>n}):void 0,mt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,_t="?"+$,Ut=`<${_t}>`,w=document,T=()=>w.createComment(""),H=n=>n===null||typeof n!="object"&&typeof n!="function",Y=Array.isArray,Lt=n=>Y(n)||typeof n?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ut=/>/g,v=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pt=/'/g,gt=/"/g,yt=/^(?:script|style|textarea|title)$/i,Q=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),d=Q(1),se=Q(2),ie=Q(3),_=Symbol.for("lit-noChange"),a=Symbol.for("lit-nothing"),ft=new WeakMap,b=w.createTreeWalker(w,129);function $t(n,t){if(!Y(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}var Dt=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=k;for(let h=0;h<e;h++){let l=n[h],u,p,c=-1,f=0;for(;f<l.length&&(o.lastIndex=f,p=o.exec(l),p!==null);)f=o.lastIndex,o===k?p[1]==="!--"?o=dt:p[1]!==void 0?o=ut:p[2]!==void 0?(yt.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=v):p[3]!==void 0&&(o=v):o===v?p[0]===">"?(o=i??k,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,u=p[1],o=p[3]===void 0?v:p[3]==='"'?gt:pt):o===gt||o===pt?o=v:o===dt||o===ut?o=k:(o=v,i=void 0);let y=o===v&&n[h+1].startsWith("/>")?" ":"";r+=o===k?l+Ut:c>=0?(s.push(u),l.slice(0,c)+mt+l.slice(c)+$+y):l+$+(c===-2?h:y)}return[$t(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},P=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,h=t.length-1,l=this.parts,[u,p]=Dt(t,e);if(this.el=n.createElement(u,s),b.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=b.nextNode())!==null&&l.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(mt)){let f=p[o++],y=i.getAttribute(c).split($),M=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:M[2],strings:y,ctor:M[1]==="."?F:M[1]==="?"?K:M[1]==="@"?G:E}),i.removeAttribute(c)}else c.startsWith($)&&(l.push({type:6,index:r}),i.removeAttribute(c));if(yt.test(i.tagName)){let c=i.textContent.split($),f=c.length-1;if(f>0){i.textContent=z?z.emptyScript:"";for(let y=0;y<f;y++)i.append(c[y],T()),b.nextNode(),l.push({type:2,index:++r});i.append(c[f],T())}}}else if(i.nodeType===8)if(i.data===_t)l.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf($,c+1))!==-1;)l.push({type:7,index:r}),c+=$.length-1}r++}}static createElement(t,e){let s=w.createElement("template");return s.innerHTML=t,s}};function A(n,t,e=n,s){if(t===_)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=H(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=A(n,i._$AS(n,t.values),i,s)),t}var q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??w).importNode(e,!0);b.currentNode=i;let r=b.nextNode(),o=0,h=0,l=s[0];for(;l!==void 0;){if(o===l.index){let u;l.type===2?u=new R(r,r.nextSibling,this,t):l.type===1?u=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(u=new J(r,this,t)),this._$AV.push(u),l=s[++h]}o!==l?.index&&(r=b.nextNode(),o++)}return b.currentNode=w,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},R=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=a,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=A(this,t,e),H(t)?t===a||t==null||t===""?(this._$AH!==a&&this._$AR(),this._$AH=a):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Lt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==a&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=P.createElement($t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new q(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new P(t)),e}k(t){Y(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.O(T()),this.O(T()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ht(t).nextSibling;ht(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=a,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=a}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=A(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==_,o&&(this._$AH=t);else{let h=t,l,u;for(t=r[0],l=0;l<r.length-1;l++)u=A(this,h[s+l],e,l),u===_&&(u=this._$AH[l]),o||=!H(u)||u!==this._$AH[l],u===a?t=a:t!==a&&(t+=(u??"")+r[l+1]),this._$AH[l]=u}o&&!i&&this.j(t)}j(t){t===a?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},F=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===a?void 0:t}},K=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==a)}},G=class extends E{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=A(this,t,e,0)??a)===_)return;let s=this._$AH,i=t===a&&s!==a||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==a&&(s===a||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},J=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){A(this,t)}};var zt=Z.litHtmlPolyfillSupport;zt?.(P,R),(Z.litHtmlVersions??=[]).push("3.3.3");var vt=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new R(t.insertBefore(T(),r),r,void 0,e??{})}return i._$AI(n),i};var X=globalThis,g=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};g._$litElement$=!0,g.finalized=!0,X.litElementHydrateSupport?.({LitElement:g});var jt=X.litElementPolyfillSupport;jt?.({LitElement:g});(X.litElementVersions??=[]).push("4.2.2");var bt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},wt=n=>(...t)=>({_$litDirective$:n,values:t}),j=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var At="important",Wt=" !"+At,O=wt(class extends j{constructor(n){if(super(n),n.type!==bt.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{let s=n[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(n,[t]){let{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let i=t[s];if(i!=null){this.ft.add(s);let r=typeof i=="string"&&i.endsWith(Wt);s.includes("-")||r?e.setProperty(s,r?i.slice(0,-11):i,r?At:""):e[s]=i}}return _}});var Bt={entity:"Warning count sensor",title:"Title",show_headline:"Show each warning's headline",show_area:"Show the areas each warning covers",show_summary:"Show each warning's summary to start with",show_level:"Show each warning's level and phase"},It={entity:"The sensor named ... warning count from the BoM Warnings integration.",title:"Leave empty for the default, Warnings.",show_summary:"Tapping the card shows or hides the summaries."},Et=["show_headline","show_area","show_summary","show_level"],tt=class extends g{constructor(){super(...arguments);this._computeLabel=e=>Bt[e.name]??e.name;this._computeHelper=e=>It[e.name]??""}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}setConfig(e){this._config=e}_schema(){return[{name:"entity",required:!0,selector:{entity:{include_entities:Object.keys(this.hass?.states??{}).filter(s=>s.endsWith("_warning_count"))}}},{name:"title",selector:{text:{}}},...Et.map(s=>({name:s,selector:{boolean:{}}}))]}_changed(e){let s=e.detail.value,i={type:this._config?.type??"custom:bom-warnings-card",...s.entity?{entity:s.entity}:{},...s.title?{title:s.title}:{}};for(let r of Et)s[r]===!1&&(i[r]=!1);this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}render(){if(!this._config)return a;let e={show_headline:!0,show_area:!0,show_summary:!0,show_level:!0,...this._config};return d`<ha-form
      .hass=${this.hass}
      .data=${e}
      .schema=${this._schema()}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._changed}
    ></ha-form>`}};customElements.define("bom-warnings-card-editor",tt);var et=class extends g{constructor(){super(...arguments);this._summaries=!0;this._toggle=()=>{this._summaries=!this._summaries};this._key=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._toggle())}}static{this.properties={hass:{attribute:!1},_config:{state:!0},_summaries:{state:!0}}}static getConfigElement(){return document.createElement("bom-warnings-card-editor")}static getStubConfig(e){let s=Object.keys(e?.states??{}).filter(o=>o.endsWith("_warning_count")),i=o=>Number(e?.states[o]?.state)||0;return{entity:s.reduce((o,h)=>i(h)>(o?i(o):0)?h:o,void 0)??s[0]??""}}setConfig(e){if(!e.entity)throw new Error("Set an entity, such as sensor.home_warning_count");this._config=e,this._summaries=e.show_summary!==!1}getCardSize(){return 3}_warnings(){let e=this._config&&this.hass?.states[this._config.entity];return!e||e.state==="unavailable"||e.state==="unknown"?[]:e.attributes.warnings??[]}_shell(e,s,i){return d`<ha-card
      header=${e}
      class=${i?"toggles":""}
      role=${i?"button":a}
      tabindex=${i?"0":a}
      aria-expanded=${i?String(this._summaries):a}
      @click=${i?this._toggle:a}
      @keydown=${i?this._key:a}
      >${s}</ha-card
    >`}render(){let e=this._config;if(!e)return a;let s=e.title??"Warnings",i=this.hass?.states[e.entity];if(!i)return this._shell(s,d`<div class="note">Entity not found: ${e.entity}</div>`,!1);if(i.state==="unavailable"||i.state==="unknown")return this._shell(s,d`<div class="note">${i.state}</div>`,!1);let r=this._warnings();return this._shell(s,r.length===0?d`<div class="note">No warnings for this location.</div>`:d`<div class="list">${r.map(o=>this._row(o,e))}</div>`,r.some(o=>o.summary))}_row(e,s){let i=e.ended===!0,r=[e.level,i?e.phase:void 0].filter(Boolean).join(", ");return d`<div class="warning ${i?"ended":""}">
      <ha-icon
        icon=${e.icon??"mdi:alert"}
        style=${O({color:e.color??"var(--secondary-text-color)"})}
      ></ha-icon>
      <div class="detail">
        <div class="title">
          <span class="event">${e.event}</span>
          ${e.badges?.length?d`<span class="badges"
                >${e.badges.map(o=>d`<span class="badge">${o}</span>`)}</span
              >`:a}
          ${s.show_level!==!1&&r?d`<span class="level">(${r})</span>`:a}
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
  `}};customElements.define("bom-warnings-card",et);window.customCards=window.customCards||[];window.customCards.push({type:"bom-warnings-card",name:"BoM Warnings",description:"Current Bureau of Meteorology warnings for a location, most severe first."});var Vt={wind:"Damaging winds",hail:"Large hail",rain:"Heavy rain",flood:"Flash flooding"},qt="mdi:alert-circle";function N(n){return typeof n=="string"&&n?n:void 0}function Ft(n){if(!Array.isArray(n))return;let t=n.map(e=>Vt[String(e)]).filter(Boolean);return t.length?t.join(" \xB7 "):void 0}function Kt(n,t){let e=new Date(n);if(!Number.isNaN(e.getTime()))return new Intl.DateTimeFormat(t.locale?.language,{hour:"numeric",minute:"2-digit",timeZone:t.config?.time_zone}).format(e)}function Gt(n,t){let e=[],s=N(n.next_issue),i=s?Kt(s,t):void 0;i&&e.push(`Update due by ${i}`);let r=(Number(n.current)||0)-1;return r>0&&e.push(`+${r} more ${r===1?"warning":"warnings"}`),e.length?e.join(" \xB7 "):void 0}function St(n,t){let e=n?.attributes,s=N(e?.title);if(!(!e||e.layout!=="detail"||!s))return{title:s,icon:N(e.icon)??qt,color:N(e.color),badges:Array.isArray(e.badges)?e.badges.filter(i=>typeof i=="string"):[],hazards:Ft(e.hazards),summary:N(e.summary),footer:Gt(e,t)}}var Ct={type:"entity"},xt=["state","headline"];function Jt(n){if(n===void 0)return!0;let t=n;return typeof n=="object"&&n!==null&&!Array.isArray(n)&&t.type==="entity"&&Object.keys(t).length===1}function Zt(n){return Array.isArray(n?.attributes.warnings)&&n?.attributes.level!==void 0}var Yt={columns:6,rows:1},st=class extends g{constructor(){super(...arguments);this._last="";this._open=()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this._config?.entity},bubbles:!0,composed:!0}))};this._key=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._open())}}static{this.properties={hass:{attribute:!1},_config:{state:!0},_tile:{state:!0}}}static async getConfigElement(){return(await window.loadCardHelpers?.())?.createCardElement({type:"tile",entity:"sensor.x"}),await customElements.whenDefined("hui-tile-card"),customElements.get("hui-tile-card").getConfigElement()}static getStubConfig(e){let s=Object.entries(e?.states??{}).filter(([o,h])=>o.startsWith("sensor.")&&o.endsWith("_warning")&&!o.endsWith("_most_severe_warning")&&h?.attributes.level!==void 0&&Array.isArray(h.attributes.warnings)),i=o=>typeof o?.attributes.rank=="number"?o.attributes.rank:-1,[r]=[...s].sort(([,o],[,h])=>i(h)-i(o));return r?{entity:r[0],name:Ct,state_content:xt}:{entity:""}}setConfig(e){if(!e.entity)throw new Error("Set an entity, such as sensor.home_thunderstorm_warning");this._config=e}_detail(){let e=this._config?.entity;return e&&this.hass?St(this.hass.states[e],this.hass):void 0}getCardSize(){if(this._detail())return 3;let e=this._tile?.getCardSize?.();return typeof e=="number"?e:1}getGridOptions(){return this._detail()?{columns:6,min_columns:4,rows:"auto"}:this._tile?.getGridOptions?.()??Yt}_detailTile(e){let s=e.color??"var(--secondary-text-color)";return d`<ha-card
      class="detail-tile"
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
                  >${e.badges.map(i=>d`<span class="badge">${i}</span>`)}</span
                >`:a}
          </div>
          ${e.hazards?d`<div class="hazards">${e.hazards}</div>`:a}
          ${e.summary?d`<div class="summary">${e.summary}</div>`:a}
          ${e.footer?d`<div class="footer">${e.footer}</div>`:a}
        </div>
      </div>
    </ha-card>`}updated(){this._sync()}_title(e,s){let i=s.states[e.entity]?.attributes.title;return typeof i=="string"&&i?i:void 0}_tileConfig(e,s){let i=s.states[e.entity],r=i?.attributes.color,o=Jt(e.name)?this._title(e,s):void 0;return{name:Ct,...Zt(i)?{state_content:xt}:{},...e,type:"tile",...typeof r=="string"&&r?{color:r}:{},...o?{name:o}:{}}}async _sync(){let e=this._config,s=this.hass;if(!e||!s)return;this._tile||(this._making??=this._make(this._tileConfig(e,s)),await this._making);let i=this._tile;if(!i)return;let r=this._tileConfig(e,s),o=JSON.stringify(r);o!==this._last&&(this._last=o,i.setConfig(r)),i.hass=s}async _make(e){let s=await window.loadCardHelpers?.();s&&(this._last=JSON.stringify(e),this._tile=s.createCardElement(e))}render(){let e=this._detail();return e?this._detailTile(e):this._tile??a}static{this.styles=C`
    :host {
      display: block;
    }
    ha-card.detail-tile {
      cursor: pointer;
      height: 100%;
    }
    ha-card.detail-tile:focus-visible {
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
