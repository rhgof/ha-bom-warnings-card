var M=globalThis,U=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),et=new WeakMap,S=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(U&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=et.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&et.set(e,t))}return t}toString(){return this.cssText}},st=n=>new S(typeof n=="string"?n:n+"",void 0,W),C=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new S(e,n,W)},it=(n,t)=>{if(U)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=M.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},j=U?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return st(e)})(n):n;var{is:bt,defineProperty:St,getOwnPropertyDescriptor:Ct,getOwnPropertyNames:xt,getOwnPropertySymbols:Pt,getPrototypeOf:Ht}=Object,L=globalThis,nt=L.trustedTypes,Tt=nt?nt.emptyScript:"",Rt=L.reactiveElementPolyfillSupport,x=(n,t)=>n,z={toAttribute(n,t){switch(t){case Boolean:n=n?Tt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ot=(n,t)=>!bt(n,t),rt={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:ot};Symbol.metadata??=Symbol("metadata"),L.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=rt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&St(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=Ct(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);r?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??rt}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;let t=Ht(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){let e=this.properties,s=[...xt(e),...Pt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(j(i))}else t!==void 0&&e.push(j(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return it(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:z).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:z;this._$Em=i;let l=o.fromAttribute(e,r.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??ot)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,r,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[x("elementProperties")]=new Map,g[x("finalized")]=new Map,Rt?.({ReactiveElement:g}),(L.reactiveElementVersions??=[]).push("2.1.2");var J=globalThis,at=n=>n,N=J.trustedTypes,ht=N?N.createPolicy("lit-html",{createHTML:n=>n}):void 0,mt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,ft="?"+y,Ot=`<${ft}>`,A=document,H=()=>A.createComment(""),T=n=>n===null||typeof n!="object"&&typeof n!="function",F=Array.isArray,kt=n=>F(n)||typeof n?.[Symbol.iterator]=="function",B=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,ct=/>/g,v=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dt=/'/g,ut=/"/g,gt=/^(?:script|style|textarea|title)$/i,Z=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),p=Z(1),Jt=Z(2),Ft=Z(3),_=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),pt=new WeakMap,w=A.createTreeWalker(A,129);function _t(n,t){if(!F(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}var Mt=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=P;for(let l=0;l<e;l++){let a=n[l],d,u,c=-1,f=0;for(;f<a.length&&(o.lastIndex=f,u=o.exec(a),u!==null);)f=o.lastIndex,o===P?u[1]==="!--"?o=lt:u[1]!==void 0?o=ct:u[2]!==void 0?(gt.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=v):u[3]!==void 0&&(o=v):o===v?u[0]===">"?(o=i??P,c=-1):u[1]===void 0?c=-2:(c=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?v:u[3]==='"'?ut:dt):o===ut||o===dt?o=v:o===lt||o===ct?o=P:(o=v,i=void 0);let $=o===v&&n[l+1].startsWith("/>")?" ":"";r+=o===P?a+Ot:c>=0?(s.push(d),a.slice(0,c)+mt+a.slice(c)+y+$):a+y+(c===-2?l:$)}return[_t(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},R=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,l=t.length-1,a=this.parts,[d,u]=Mt(t,e);if(this.el=n.createElement(d,s),w.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=w.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(mt)){let f=u[o++],$=i.getAttribute(c).split(y),k=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:k[2],strings:$,ctor:k[1]==="."?V:k[1]==="?"?q:k[1]==="@"?K:b}),i.removeAttribute(c)}else c.startsWith(y)&&(a.push({type:6,index:r}),i.removeAttribute(c));if(gt.test(i.tagName)){let c=i.textContent.split(y),f=c.length-1;if(f>0){i.textContent=N?N.emptyScript:"";for(let $=0;$<f;$++)i.append(c[$],H()),w.nextNode(),a.push({type:2,index:++r});i.append(c[f],H())}}}else if(i.nodeType===8)if(i.data===ft)a.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:r}),c+=y.length-1}r++}}static createElement(t,e){let s=A.createElement("template");return s.innerHTML=t,s}};function E(n,t,e=n,s){if(t===_)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=T(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=E(n,i._$AS(n,t.values),i,s)),t}var I=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??A).importNode(e,!0);w.currentNode=i;let r=w.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new O(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new G(r,this,t)),this._$AV.push(d),a=s[++l]}o!==a?.index&&(r=w.nextNode(),o++)}return w.currentNode=A,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},O=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),T(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):kt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=R.createElement(_t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new I(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=pt.get(t.strings);return e===void 0&&pt.set(t.strings,e=new R(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.O(H()),this.O(H()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=at(t).nextSibling;at(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},b=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=E(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==_,o&&(this._$AH=t);else{let l=t,a,d;for(t=r[0],a=0;a<r.length-1;a++)d=E(this,l[s+a],e,a),d===_&&(d=this._$AH[a]),o||=!T(d)||d!==this._$AH[a],d===h?t=h:t!==h&&(t+=(d??"")+r[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},V=class extends b{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},q=class extends b{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},K=class extends b{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??h)===_)return;let s=this._$AH,i=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},G=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Ut=J.litHtmlPolyfillSupport;Ut?.(R,O),(J.litHtmlVersions??=[]).push("3.3.3");var $t=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new O(t.insertBefore(H(),r),r,void 0,e??{})}return i._$AI(n),i};var Y=globalThis,m=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};m._$litElement$=!0,m.finalized=!0,Y.litElementHydrateSupport?.({LitElement:m});var Lt=Y.litElementPolyfillSupport;Lt?.({LitElement:m});(Y.litElementVersions??=[]).push("4.2.2");var yt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vt=n=>(...t)=>({_$litDirective$:n,values:t}),D=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var wt="important",Nt=" !"+wt,At=vt(class extends D{constructor(n){if(super(n),n.type!==yt.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{let s=n[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(n,[t]){let{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let i=t[s];if(i!=null){this.ft.add(s);let r=typeof i=="string"&&i.endsWith(Nt);s.includes("-")||r?e.setProperty(s,r?i.slice(0,-11):i,r?wt:""):e[s]=i}}return _}});var Dt={entity:"Warning count sensor",title:"Title",show_headline:"Show each warning's headline",show_area:"Show the areas each warning covers",show_summary:"Show each warning's summary to start with",show_level:"Show each warning's level and phase"},Wt={entity:"The sensor named ... warning count from the BoM Warnings integration.",title:"Leave empty for the default, Warnings.",show_summary:"Tapping the card shows or hides the summaries."},Et=["show_headline","show_area","show_summary","show_level"],Q=class extends m{constructor(){super(...arguments);this._computeLabel=e=>Dt[e.name]??e.name;this._computeHelper=e=>Wt[e.name]??""}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}setConfig(e){this._config=e}_schema(){return[{name:"entity",required:!0,selector:{entity:{include_entities:Object.keys(this.hass?.states??{}).filter(s=>s.endsWith("_warning_count"))}}},{name:"title",selector:{text:{}}},...Et.map(s=>({name:s,selector:{boolean:{}}}))]}_changed(e){let s=e.detail.value,i={type:this._config?.type??"custom:bom-warnings-card",...s.entity?{entity:s.entity}:{},...s.title?{title:s.title}:{}};for(let r of Et)s[r]===!1&&(i[r]=!1);this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}render(){if(!this._config)return h;let e={show_headline:!0,show_area:!0,show_summary:!0,show_level:!0,...this._config};return p`<ha-form
      .hass=${this.hass}
      .data=${e}
      .schema=${this._schema()}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._changed}
    ></ha-form>`}};customElements.define("bom-warnings-card-editor",Q);var jt=["final","cancelled"],X=class extends m{constructor(){super(...arguments);this._summaries=!0;this._toggle=()=>{this._summaries=!this._summaries};this._key=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._toggle())}}static{this.properties={hass:{attribute:!1},_config:{state:!0},_summaries:{state:!0}}}static getConfigElement(){return document.createElement("bom-warnings-card-editor")}static getStubConfig(e){let s=Object.keys(e?.states??{}).filter(o=>o.endsWith("_warning_count")),i=o=>Number(e?.states[o]?.state)||0;return{entity:s.reduce((o,l)=>i(l)>(o?i(o):0)?l:o,void 0)??s[0]??""}}setConfig(e){if(!e.entity)throw new Error("Set an entity, such as sensor.home_warning_count");this._config=e,this._summaries=e.show_summary!==!1}getCardSize(){return 3}_warnings(){let e=this._config&&this.hass?.states[this._config.entity];return!e||e.state==="unavailable"||e.state==="unknown"?[]:e.attributes.warnings??[]}_shell(e,s,i){return p`<ha-card
      header=${e}
      class=${i?"toggles":""}
      role=${i?"button":h}
      tabindex=${i?"0":h}
      aria-expanded=${i?String(this._summaries):h}
      @click=${i?this._toggle:h}
      @keydown=${i?this._key:h}
      >${s}</ha-card
    >`}render(){let e=this._config;if(!e)return h;let s=e.title??"Warnings",i=this.hass?.states[e.entity];if(!i)return this._shell(s,p`<div class="note">Entity not found: ${e.entity}</div>`,!1);if(i.state==="unavailable"||i.state==="unknown")return this._shell(s,p`<div class="note">${i.state}</div>`,!1);let r=this._warnings();return this._shell(s,r.length===0?p`<div class="note">No warnings for this location.</div>`:p`<div class="list">${r.map(o=>this._row(o,e))}</div>`,r.some(o=>o.summary))}_row(e,s){let i=jt.includes(e.phase??""),r=[e.level,i?e.phase:void 0].filter(Boolean).join(", ");return p`<div class="warning ${i?"ended":""}">
      <ha-icon
        icon=${e.icon??"mdi:alert"}
        style=${At({color:e.color??"var(--secondary-text-color)"})}
      ></ha-icon>
      <div class="detail">
        <div class="title">
          <span class="event">${e.event}</span>
          ${s.show_level!==!1&&r?p`<span class="level">(${r})</span>`:h}
        </div>
        ${s.show_headline!==!1?p`<div class="headline">${e.headline}</div>`:h}
        ${s.show_area!==!1&&e.area?p`<div class="area">${e.area}</div>`:h}
        ${this._summaries&&e.summary?p`<div class="summary">${e.summary}</div>`:h}
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
    .level,
    .area,
    .summary {
      color: var(--secondary-text-color);
    }
    .area,
    .summary {
      font-size: 0.9em;
    }
  `}};customElements.define("bom-warnings-card",X);window.customCards=window.customCards||[];window.customCards.push({type:"bom-warnings-card",name:"BoM Warnings",description:"Current Bureau of Meteorology warnings for a location, most severe first."});var zt={extreme:4,severe:3,moderate:2,unrated:2,minor:1},Bt={minor:"Minor",moderate:"Moderate",unrated:"Unrated",severe:"Severe",extreme:"Extreme"},It={columns:6,rows:1},tt=class extends m{constructor(){super(...arguments);this._last=""}static{this.properties={hass:{attribute:!1},_config:{state:!0},_tile:{state:!0}}}static async getConfigElement(){return(await window.loadCardHelpers?.())?.createCardElement({type:"tile",entity:"sensor.x"}),await customElements.whenDefined("hui-tile-card"),customElements.get("hui-tile-card").getConfigElement()}static getStubConfig(e){let s=Object.entries(e?.states??{}).filter(([o,l])=>o.startsWith("sensor.")&&o.endsWith("_warning")&&!o.endsWith("_most_severe_warning")&&l?.attributes.level!==void 0&&Array.isArray(l.attributes.warnings)),i=o=>zt[o?.state??""]??0,[r]=[...s].sort(([,o],[,l])=>i(l)-i(o));return{entity:r?.[0]??""}}setConfig(e){if(!e.entity)throw new Error("Set an entity, such as sensor.home_thunderstorm_warning");this._config=e}getCardSize(){let e=this._tile?.getCardSize?.();return typeof e=="number"?e:1}getGridOptions(){return this._tile?.getGridOptions?.()??It}updated(){this._sync()}_title(e,s){let i=s.states[e.entity],r=Bt[i?.state??""],o=i?.attributes.friendly_name,l=s.entities?.[e.entity]?.name||(typeof o=="string"?o:"");return r&&l?`${r} ${l}`:void 0}_tileConfig(e,s){let i=s.states[e.entity]?.attributes.color,r=e.name===void 0?this._title(e,s):void 0;return{...e,type:"tile",...typeof i=="string"&&i?{color:i}:{},...r?{name:r}:{}}}async _sync(){let e=this._config,s=this.hass;if(!e||!s)return;this._tile||(this._making??=this._make(this._tileConfig(e,s)),await this._making);let i=this._tile;if(!i)return;let r=this._tileConfig(e,s),o=JSON.stringify(r);o!==this._last&&(this._last=o,i.setConfig(r)),i.hass=s}async _make(e){let s=await window.loadCardHelpers?.();s&&(this._last=JSON.stringify(e),this._tile=s.createCardElement(e))}render(){return this._tile??h}static{this.styles=C`
    :host {
      display: block;
    }
  `}};customElements.define("bom-warning-tile",tt);window.customCards=window.customCards||[];window.customCards.push({type:"bom-warning-tile",name:"BoM Warning Tile",description:"One warning type as a tile, with its icon in the colour of the current severity."});
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
