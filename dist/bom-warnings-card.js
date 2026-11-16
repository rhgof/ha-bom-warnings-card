var M=globalThis,L=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),nt=new WeakMap,S=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(L&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=nt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&nt.set(t,e))}return e}toString(){return this.cssText}},rt=n=>new S(typeof n=="string"?n:n+"",void 0,W),C=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new S(t,n,W)},ot=(n,e)=>{if(L)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=M.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,n.appendChild(s)}},I=L?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return rt(t)})(n):n;var{is:Tt,defineProperty:Ht,getOwnPropertyDescriptor:Pt,getOwnPropertyNames:Rt,getOwnPropertySymbols:Ot,getPrototypeOf:Ut}=Object,D=globalThis,at=D.trustedTypes,Nt=at?at.emptyScript:"",Mt=D.reactiveElementPolyfillSupport,x=(n,e)=>n,B={toAttribute(n,e){switch(e){case Boolean:n=n?Nt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ht=(n,e)=>!Tt(n,e),lt={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:ht};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var m=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=lt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Ht(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:r}=Pt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){let h=i?.call(this);r?.call(this,o),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??lt}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;let e=Ut(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){let t=this.properties,s=[...Rt(t),...Ot(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(I(i))}else e!==void 0&&t.push(I(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ot(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:B).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:B;this._$Em=i;let h=o.fromAttribute(t,r.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(e!==void 0){let o=this.constructor;if(i===!1&&(r=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??ht)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,h=this[i];o!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,r,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[x("elementProperties")]=new Map,m[x("finalized")]=new Map,Mt?.({ReactiveElement:m}),(D.reactiveElementVersions??=[]).push("2.1.2");var Z=globalThis,ct=n=>n,z=Z.trustedTypes,dt=z?z.createPolicy("lit-html",{createHTML:n=>n}):void 0,_t="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,yt="?"+$,Lt=`<${yt}>`,w=document,T=()=>w.createComment(""),H=n=>n===null||typeof n!="object"&&typeof n!="function",Y=Array.isArray,Dt=n=>Y(n)||typeof n?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,pt=/>/g,v=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,ft=/"/g,$t=/^(?:script|style|textarea|title)$/i,Q=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),d=Q(1),se=Q(2),ie=Q(3),_=Symbol.for("lit-noChange"),a=Symbol.for("lit-nothing"),mt=new WeakMap,b=w.createTreeWalker(w,129);function vt(n,e){if(!Y(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(e):e}var zt=(n,e)=>{let t=n.length-1,s=[],i,r=e===2?"<svg>":e===3?"<math>":"",o=k;for(let h=0;h<t;h++){let l=n[h],u,p,c=-1,f=0;for(;f<l.length&&(o.lastIndex=f,p=o.exec(l),p!==null);)f=o.lastIndex,o===k?p[1]==="!--"?o=ut:p[1]!==void 0?o=pt:p[2]!==void 0?($t.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=v):p[3]!==void 0&&(o=v):o===v?p[0]===">"?(o=i??k,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,u=p[1],o=p[3]===void 0?v:p[3]==='"'?ft:gt):o===ft||o===gt?o=v:o===ut||o===pt?o=k:(o=v,i=void 0);let y=o===v&&n[h+1].startsWith("/>")?" ":"";r+=o===k?l+Lt:c>=0?(s.push(u),l.slice(0,c)+_t+l.slice(c)+$+y):l+$+(c===-2?h:y)}return[vt(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},P=class n{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0,h=e.length-1,l=this.parts,[u,p]=zt(e,t);if(this.el=n.createElement(u,s),b.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=b.nextNode())!==null&&l.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(_t)){let f=p[o++],y=i.getAttribute(c).split($),N=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:N[2],strings:y,ctor:N[1]==="."?F:N[1]==="?"?K:N[1]==="@"?G:E}),i.removeAttribute(c)}else c.startsWith($)&&(l.push({type:6,index:r}),i.removeAttribute(c));if($t.test(i.tagName)){let c=i.textContent.split($),f=c.length-1;if(f>0){i.textContent=z?z.emptyScript:"";for(let y=0;y<f;y++)i.append(c[y],T()),b.nextNode(),l.push({type:2,index:++r});i.append(c[f],T())}}}else if(i.nodeType===8)if(i.data===yt)l.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf($,c+1))!==-1;)l.push({type:7,index:r}),c+=$.length-1}r++}}static createElement(e,t){let s=w.createElement("template");return s.innerHTML=e,s}};function A(n,e,t=n,s){if(e===_)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,r=H(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=A(n,i._$AS(n,e.values),i,s)),e}var q=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??w).importNode(t,!0);b.currentNode=i;let r=b.nextNode(),o=0,h=0,l=s[0];for(;l!==void 0;){if(o===l.index){let u;l.type===2?u=new R(r,r.nextSibling,this,e):l.type===1?u=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(u=new J(r,this,e)),this._$AV.push(u),l=s[++h]}o!==l?.index&&(r=b.nextNode(),o++)}return b.currentNode=w,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},R=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=a,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),H(e)?e===a||e==null||e===""?(this._$AH!==a&&this._$AR(),this._$AH=a):e!==this._$AH&&e!==_&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Dt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==a&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=P.createElement(vt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let r=new q(i,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=mt.get(e.strings);return t===void 0&&mt.set(e.strings,t=new P(e)),t}k(e){Y(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let r of e)i===t.length?t.push(s=new n(this.O(T()),this.O(T()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=ct(e).nextSibling;ct(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=a,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=a}_$AI(e,t=this,s,i){let r=this.strings,o=!1;if(r===void 0)e=A(this,e,t,0),o=!H(e)||e!==this._$AH&&e!==_,o&&(this._$AH=e);else{let h=e,l,u;for(e=r[0],l=0;l<r.length-1;l++)u=A(this,h[s+l],t,l),u===_&&(u=this._$AH[l]),o||=!H(u)||u!==this._$AH[l],u===a?e=a:e!==a&&(e+=(u??"")+r[l+1]),this._$AH[l]=u}o&&!i&&this.j(e)}j(e){e===a?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},F=class extends E{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===a?void 0:e}},K=class extends E{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==a)}},G=class extends E{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??a)===_)return;let s=this._$AH,i=e===a&&s!==a||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==a&&(s===a||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},J=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}};var jt=Z.litHtmlPolyfillSupport;jt?.(P,R),(Z.litHtmlVersions??=[]).push("3.3.3");var bt=(n,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let r=t?.renderBefore??null;s._$litPart$=i=new R(e.insertBefore(T(),r),r,void 0,t??{})}return i._$AI(n),i};var X=globalThis,g=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=bt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};g._$litElement$=!0,g.finalized=!0,X.litElementHydrateSupport?.({LitElement:g});var Wt=X.litElementPolyfillSupport;Wt?.({LitElement:g});(X.litElementVersions??=[]).push("4.2.2");var wt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},At=n=>(...e)=>({_$litDirective$:n,values:e}),j=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var Et="important",It=" !"+Et,O=At(class extends j{constructor(n){if(super(n),n.type!==wt.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((e,t)=>{let s=n[t];return s==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(n,[e]){let{style:t}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let s of this.ft)e[s]==null&&(this.ft.delete(s),s.includes("-")?t.removeProperty(s):t[s]=null);for(let s in e){let i=e[s];if(i!=null){this.ft.add(s);let r=typeof i=="string"&&i.endsWith(It);s.includes("-")||r?t.setProperty(s,r?i.slice(0,-11):i,r?Et:""):t[s]=i}}return _}});var Bt={entity:"Warning count sensor",title:"Title",show_headline:"Show each warning's headline",show_area:"Show the areas each warning covers",show_summary:"Show each warning's summary to start with",show_level:"Show each warning's level and phase"},Vt={entity:"The sensor named ... warning count from the BoM Warnings integration.",title:"Leave empty for the default, Warnings.",show_summary:"Tapping the card shows or hides the summaries."},tt=["show_headline","show_area","show_summary","show_level"],et=class extends g{constructor(){super(...arguments);this._computeLabel=t=>Bt[t.name]??t.name;this._computeHelper=t=>Vt[t.name]??""}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}setConfig(t){this._config=t}_schema(){return[{name:"entity",required:!0,selector:{entity:{include_entities:Object.keys(this.hass?.states??{}).filter(s=>s.endsWith("_warning_count"))}}},{name:"title",selector:{text:{}}},...tt.map(s=>({name:s,selector:{boolean:{}}}))]}_changed(t){let s=t.detail.value,i={...this._config};for(let o of["entity","title",...tt])delete i[o];let r={...i,type:this._config?.type??"custom:bom-warnings-card",...s.entity?{entity:s.entity}:{},...s.title?{title:s.title}:{}};for(let o of tt)s[o]===!1&&(r[o]=!1);this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0}))}render(){if(!this._config)return a;let t={show_headline:!0,show_area:!0,show_summary:!0,show_level:!0,...this._config};return d`<ha-form
      .hass=${this.hass}
      .data=${t}
      .schema=${this._schema()}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._changed}
    ></ha-form>`}};customElements.define("bom-warnings-card-editor",et);var st=class extends g{constructor(){super(...arguments);this._summaries=!0;this._toggle=()=>{this._summaries=!this._summaries};this._key=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this._toggle())}}static{this.properties={hass:{attribute:!1},_config:{state:!0},_summaries:{state:!0}}}static getConfigElement(){return document.createElement("bom-warnings-card-editor")}static getStubConfig(t){let s=Object.keys(t?.states??{}).filter(o=>o.endsWith("_warning_count")),i=o=>Number(t?.states[o]?.state)||0;return{entity:s.reduce((o,h)=>i(h)>(o?i(o):0)?h:o,void 0)??s[0]??""}}setConfig(t){if(!t.entity)throw new Error("Set an entity, such as sensor.home_warning_count");this._config=t,this._summaries=t.show_summary!==!1}getCardSize(){return 3}_warnings(){let t=this._config&&this.hass?.states[this._config.entity];return!t||t.state==="unavailable"||t.state==="unknown"?[]:t.attributes.warnings??[]}_shell(t,s,i){return d`<ha-card
      header=${t}
      class=${i?"toggles":""}
      role=${i?"button":a}
      tabindex=${i?"0":a}
      aria-expanded=${i?String(this._summaries):a}
      @click=${i?this._toggle:a}
      @keydown=${i?this._key:a}
      >${s}</ha-card
    >`}render(){let t=this._config;if(!t)return a;let s=t.title??"Warnings",i=this.hass?.states[t.entity];if(!i)return this._shell(s,d`<div class="note">Entity not found: ${t.entity}</div>`,!1);if(i.state==="unavailable"||i.state==="unknown")return this._shell(s,d`<div class="note">${i.state}</div>`,!1);let r=this._warnings();return this._shell(s,r.length===0?d`<div class="note">No warnings for this location.</div>`:d`<div class="list">${r.map(o=>this._row(o,t))}</div>`,r.some(o=>o.summary))}_row(t,s){let i=t.ended===!0,r=[t.level,i?t.phase:void 0].filter(Boolean).join(", ");return d`<div class="warning ${i?"ended":""}">
      <ha-icon
        icon=${t.icon??"mdi:alert"}
        style=${O({color:t.color??"var(--secondary-text-color)"})}
      ></ha-icon>
      <div class="detail">
        <div class="title">
          <span class="event">${t.event}</span>
          ${t.badges?.length?d`<span class="badges"
                >${t.badges.map(o=>d`<span class="badge">${o}</span>`)}</span
              >`:a}
          ${s.show_level!==!1&&r?d`<span class="level">(${r})</span>`:a}
        </div>
        ${s.show_headline!==!1?d`<div class="headline">${t.headline}</div>`:a}
        ${s.show_area!==!1&&t.area?d`<div class="area">${t.area}</div>`:a}
        ${this._summaries&&t.summary?d`<div class="summary">${t.summary}</div>`:a}
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
  `}};customElements.define("bom-warnings-card",st);window.customCards=window.customCards||[];window.customCards.push({type:"bom-warnings-card",name:"BoM Warnings",description:"Current Bureau of Meteorology warnings for a location, most severe first."});var St={wind:"Damaging winds",hail:"Large hail",rain:"Heavy rain",flood:"Flash flooding"},qt="mdi:alert-circle";function U(n){return typeof n=="string"&&n?n:void 0}function Ft(n){if(!Array.isArray(n))return;let e=n.flatMap(t=>Object.hasOwn(St,String(t))?[St[String(t)]]:[]);return e.length?e.join(" \xB7 "):void 0}function Kt(n,e){let t=new Date(n);if(!Number.isNaN(t.getTime()))return new Intl.DateTimeFormat(e.locale?.language,{hour:"numeric",minute:"2-digit",timeZone:e.config?.time_zone}).format(t)}function Gt(n,e){let t=[],s=U(n.next_issue),i=s?Kt(s,e):void 0;i&&t.push(`Update due by ${i}`);let r=(Number(n.current)||0)-1;return r>0&&t.push(`+${r} more ${r===1?"warning":"warnings"}`),t.length?t.join(" \xB7 "):void 0}function Ct(n,e){let t=n?.attributes,s=U(t?.title);if(!(!t||t.layout!=="detail"||!s))return{title:s,icon:U(t.icon)??qt,color:U(t.color),badges:Array.isArray(t.badges)?t.badges.filter(i=>typeof i=="string"):[],hazards:Ft(t.hazards),summary:U(t.summary),footer:Gt(t,e)}}var xt={type:"entity"},kt=["state","headline"];function Jt(n){if(n===void 0)return!0;let e=n;return typeof n=="object"&&n!==null&&!Array.isArray(n)&&e.type==="entity"&&Object.keys(e).length===1}function Zt(n){return Array.isArray(n?.attributes.warnings)&&n?.attributes.level!==void 0}var Yt={columns:6,rows:1},it=class extends g{constructor(){super(...arguments);this._last="";this._open=()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this._config?.entity},bubbles:!0,composed:!0}))};this._key=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this._open())}}static{this.properties={hass:{attribute:!1},_config:{state:!0},_tile:{state:!0}}}static async getConfigElement(){let t=await window.loadCardHelpers?.();if(!t)throw new Error("Home Assistant's card helpers are not available");return t.createCardElement({type:"tile",entity:"sensor.x"}),await customElements.whenDefined("hui-tile-card"),customElements.get("hui-tile-card").getConfigElement()}static getStubConfig(t){let s=Object.entries(t?.states??{}).filter(([o,h])=>o.startsWith("sensor.")&&o.endsWith("_warning")&&h?.attributes.level!==void 0&&Array.isArray(h.attributes.warnings)),i=o=>typeof o?.attributes.rank=="number"?o.attributes.rank:-1,[r]=[...s].sort(([,o],[,h])=>i(h)-i(o));return r?{entity:r[0],name:xt,state_content:kt}:{entity:""}}setConfig(t){if(!t.entity)throw new Error("Set an entity, such as sensor.home_thunderstorm_warning");this._config=t}_detail(){let t=this._config?.entity;return t&&this.hass?Ct(this.hass.states[t],this.hass):void 0}getCardSize(){if(this._detail())return 3;let t=this._tile?.getCardSize?.();return typeof t=="number"?t:1}getGridOptions(){return this._detail()?{columns:6,min_columns:4,rows:"auto"}:this._tile?.getGridOptions?.()??Yt}_detailTile(t){let s=t.color??"var(--secondary-text-color)";return d`<ha-card
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
          <ha-icon icon=${t.icon} style=${O({color:s})}></ha-icon>
        </span>
        <div class="detail">
          <div class="heading">
            <span class="title">${t.title}</span>
            ${t.badges.length?d`<span class="badges"
                  >${t.badges.map(i=>d`<span class="badge">${i}</span>`)}</span
                >`:a}
          </div>
          ${t.hazards?d`<div class="hazards">${t.hazards}</div>`:a}
          ${t.summary?d`<div class="summary">${t.summary}</div>`:a}
          ${t.footer?d`<div class="footer">${t.footer}</div>`:a}
        </div>
      </div>
    </ha-card>`}updated(){this._sync()}async getUpdateComplete(){let t=await super.getUpdateComplete();return this._making?(await this._making,super.getUpdateComplete()):t}_title(t,s){let i=s.states[t.entity]?.attributes.title;return typeof i=="string"&&i?i:void 0}_tileConfig(t,s){let i=s.states[t.entity],r=i?.attributes.color,o=Jt(t.name)?this._title(t,s):void 0;return{name:xt,...Zt(i)?{state_content:kt}:{},...t,type:"tile",...typeof r=="string"&&r?{color:r}:{},...o?{name:o}:{}}}async _sync(){let t=this._config,s=this.hass;if(!t||!s)return;this._tile||(this._making??=this._make(this._tileConfig(t,s)),await this._making,this._making=void 0);let i=this._tile;if(!i)return;let r=this._tileConfig(t,s),o=JSON.stringify(r);o!==this._last&&(this._last=o,i.setConfig(r)),i.hass=s}async _make(t){let s;try{s=await window.loadCardHelpers?.()}catch{return}s&&(this._last=JSON.stringify(t),this._tile=s.createCardElement(t))}render(){let t=this._detail();return t?this._detailTile(t):this._tile??a}static{this.styles=C`
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
  `}};customElements.define("bom-warning-tile",it);window.customCards=window.customCards||[];window.customCards.push({type:"bom-warning-tile",name:"BoM Warning Tile",description:"One warning type as a tile, with its icon in the colour of the current severity."});
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
