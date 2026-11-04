var U=globalThis,k=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),et=new WeakMap,C=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(k&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=et.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&et.set(e,t))}return t}toString(){return this.cssText}},st=n=>new C(typeof n=="string"?n:n+"",void 0,W),S=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new C(e,n,W)},it=(n,t)=>{if(k)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=U.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},j=k?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return st(e)})(n):n;var{is:wt,defineProperty:bt,getOwnPropertyDescriptor:Ct,getOwnPropertyNames:St,getOwnPropertySymbols:xt,getPrototypeOf:Pt}=Object,N=globalThis,nt=N.trustedTypes,Ht=nt?nt.emptyScript:"",Tt=N.reactiveElementPolyfillSupport,x=(n,t)=>n,z={toAttribute(n,t){switch(t){case Boolean:n=n?Ht:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ot=(n,t)=>!wt(n,t),rt={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:ot};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=rt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&bt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=Ct(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let c=i?.call(this);r?.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??rt}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;let t=Pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){let e=this.properties,s=[...St(e),...xt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(j(i))}else t!==void 0&&e.push(j(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return it(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:z).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:z;this._$Em=i;let c=o.fromAttribute(e,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??ot)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[x("elementProperties")]=new Map,f[x("finalized")]=new Map,Tt?.({ReactiveElement:f}),(N.reactiveElementVersions??=[]).push("2.1.2");var J=globalThis,at=n=>n,L=J.trustedTypes,ht=L?L.createPolicy("lit-html",{createHTML:n=>n}):void 0,mt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+y,Rt=`<${gt}>`,E=document,H=()=>E.createComment(""),T=n=>n===null||typeof n!="object"&&typeof n!="function",F=Array.isArray,Ot=n=>F(n)||typeof n?.[Symbol.iterator]=="function",B=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ct=/-->/g,lt=/>/g,v=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dt=/'/g,ut=/"/g,ft=/^(?:script|style|textarea|title)$/i,Z=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),p=Z(1),Kt=Z(2),Gt=Z(3),_=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),pt=new WeakMap,A=E.createTreeWalker(E,129);function _t(n,t){if(!F(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}var Mt=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=P;for(let c=0;c<e;c++){let a=n[c],d,u,l=-1,g=0;for(;g<a.length&&(o.lastIndex=g,u=o.exec(a),u!==null);)g=o.lastIndex,o===P?u[1]==="!--"?o=ct:u[1]!==void 0?o=lt:u[2]!==void 0?(ft.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=v):u[3]!==void 0&&(o=v):o===v?u[0]===">"?(o=i??P,l=-1):u[1]===void 0?l=-2:(l=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?v:u[3]==='"'?ut:dt):o===ut||o===dt?o=v:o===ct||o===lt?o=P:(o=v,i=void 0);let $=o===v&&n[c+1].startsWith("/>")?" ":"";r+=o===P?a+Rt:l>=0?(s.push(d),a.slice(0,l)+mt+a.slice(l)+y+$):a+y+(l===-2?c:$)}return[_t(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},R=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,c=t.length-1,a=this.parts,[d,u]=Mt(t,e);if(this.el=n.createElement(d,s),A.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=A.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let l of i.getAttributeNames())if(l.endsWith(mt)){let g=u[o++],$=i.getAttribute(l).split(y),M=/([.?@])?(.*)/.exec(g);a.push({type:1,index:r,name:M[2],strings:$,ctor:M[1]==="."?V:M[1]==="?"?q:M[1]==="@"?K:b}),i.removeAttribute(l)}else l.startsWith(y)&&(a.push({type:6,index:r}),i.removeAttribute(l));if(ft.test(i.tagName)){let l=i.textContent.split(y),g=l.length-1;if(g>0){i.textContent=L?L.emptyScript:"";for(let $=0;$<g;$++)i.append(l[$],H()),A.nextNode(),a.push({type:2,index:++r});i.append(l[g],H())}}}else if(i.nodeType===8)if(i.data===gt)a.push({type:2,index:r});else{let l=-1;for(;(l=i.data.indexOf(y,l+1))!==-1;)a.push({type:7,index:r}),l+=y.length-1}r++}}static createElement(t,e){let s=E.createElement("template");return s.innerHTML=t,s}};function w(n,t,e=n,s){if(t===_)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=T(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=w(n,i._$AS(n,t.values),i,s)),t}var I=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??E).importNode(e,!0);A.currentNode=i;let r=A.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new O(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new G(r,this,t)),this._$AV.push(d),a=s[++c]}o!==a?.index&&(r=A.nextNode(),o++)}return A.currentNode=E,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},O=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),T(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ot(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=R.createElement(_t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new I(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=pt.get(t.strings);return e===void 0&&pt.set(t.strings,e=new R(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.O(H()),this.O(H()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=at(t).nextSibling;at(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},b=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=w(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==_,o&&(this._$AH=t);else{let c=t,a,d;for(t=r[0],a=0;a<r.length-1;a++)d=w(this,c[s+a],e,a),d===_&&(d=this._$AH[a]),o||=!T(d)||d!==this._$AH[a],d===h?t=h:t!==h&&(t+=(d??"")+r[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},V=class extends b{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},q=class extends b{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},K=class extends b{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??h)===_)return;let s=this._$AH,i=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},G=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}};var Ut=J.litHtmlPolyfillSupport;Ut?.(R,O),(J.litHtmlVersions??=[]).push("3.3.3");var $t=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new O(t.insertBefore(H(),r),r,void 0,e??{})}return i._$AI(n),i};var Y=globalThis,m=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};m._$litElement$=!0,m.finalized=!0,Y.litElementHydrateSupport?.({LitElement:m});var kt=Y.litElementPolyfillSupport;kt?.({LitElement:m});(Y.litElementVersions??=[]).push("4.2.2");var yt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vt=n=>(...t)=>({_$litDirective$:n,values:t}),D=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var At="important",Nt=" !"+At,Et=vt(class extends D{constructor(n){if(super(n),n.type!==yt.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{let s=n[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(n,[t]){let{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let i=t[s];if(i!=null){this.ft.add(s);let r=typeof i=="string"&&i.endsWith(Nt);s.includes("-")||r?e.setProperty(s,r?i.slice(0,-11):i,r?At:""):e[s]=i}}return _}});var Lt={entity:"Warning count sensor",title:"Title",show_summary:"Show each warning's summary"},Dt={entity:"The sensor named ... warning count from the BoM Warnings integration.",title:"Leave empty for the default, Warnings."},Q=class extends m{constructor(){super(...arguments);this._computeLabel=e=>Lt[e.name]??e.name;this._computeHelper=e=>Dt[e.name]??""}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}setConfig(e){this._config=e}_schema(){return[{name:"entity",required:!0,selector:{entity:{include_entities:Object.keys(this.hass?.states??{}).filter(s=>s.endsWith("_warning_count"))}}},{name:"title",selector:{text:{}}},{name:"show_summary",selector:{boolean:{}}}]}_changed(e){let{entity:s,title:i,show_summary:r}=e.detail.value,o={type:this._config?.type??"custom:bom-warnings-card",...s?{entity:s}:{},...i?{title:i}:{},...r===!1?{show_summary:!1}:{}};this._config=o,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0}))}render(){if(!this._config)return h;let e={show_summary:!0,...this._config};return p`<ha-form
      .hass=${this.hass}
      .data=${e}
      .schema=${this._schema()}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._changed}
    ></ha-form>`}};customElements.define("bom-warnings-card-editor",Q);var Wt=["final","cancelled"],X=class extends m{static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("bom-warnings-card-editor")}static getStubConfig(t){let e=Object.keys(t?.states??{}).filter(r=>r.endsWith("_warning_count")),s=r=>Number(t?.states[r]?.state)||0;return{entity:e.reduce((r,o)=>s(o)>(r?s(r):0)?o:r,void 0)??e[0]??""}}setConfig(t){if(!t.entity)throw new Error("Set an entity, such as sensor.home_warning_count");this._config=t}getCardSize(){return 3}render(){let t=this._config;if(!t)return h;let e=t.title??"Warnings",s=this.hass?.states[t.entity];if(!s)return p`<ha-card header=${e}
        ><div class="note">Entity not found: ${t.entity}</div></ha-card
      >`;if(s.state==="unavailable"||s.state==="unknown")return p`<ha-card header=${e}><div class="note">${s.state}</div></ha-card>`;let i=s.attributes.warnings??[];return p`<ha-card header=${e}>
      ${i.length===0?p`<div class="note">No warnings for this location.</div>`:p`<div class="list">
            ${i.map(r=>this._row(r,t.show_summary!==!1))}
          </div>`}
    </ha-card>`}_row(t,e){let s=Wt.includes(t.phase??""),i=[t.level,s?t.phase:void 0].filter(Boolean).join(", ");return p`<div class="warning ${s?"ended":""}">
      <ha-icon
        icon=${t.icon??"mdi:alert"}
        style=${Et({color:t.color??"var(--secondary-text-color)"})}
      ></ha-icon>
      <div class="detail">
        <div class="title">
          <span class="event">${t.event}</span>
          ${i?p`<span class="level">(${i})</span>`:h}
        </div>
        <div class="headline">${t.headline}</div>
        ${t.area?p`<div class="area">${t.area}</div>`:h}
        ${e&&t.summary?p`<div class="summary">${t.summary}</div>`:h}
      </div>
    </div>`}static{this.styles=S`
    .list {
      padding: 0 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
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
  `}};customElements.define("bom-warnings-card",X);window.customCards=window.customCards||[];window.customCards.push({type:"bom-warnings-card",name:"BoM Warnings",description:"Current Bureau of Meteorology warnings for a location, most severe first."});var jt={extreme:4,severe:3,moderate:2,unrated:2,minor:1},zt={columns:6,rows:1},tt=class extends m{constructor(){super(...arguments);this._last=""}static{this.properties={hass:{attribute:!1},_config:{state:!0},_tile:{state:!0}}}static async getConfigElement(){return(await window.loadCardHelpers?.())?.createCardElement({type:"tile",entity:"sensor.x"}),await customElements.whenDefined("hui-tile-card"),customElements.get("hui-tile-card").getConfigElement()}static getStubConfig(e){let s=Object.entries(e?.states??{}).filter(([o,c])=>o.startsWith("sensor.")&&o.endsWith("_warning")&&!o.endsWith("_most_severe_warning")&&c?.attributes.level!==void 0&&Array.isArray(c.attributes.warnings)),i=o=>jt[o?.state??""]??0,[r]=[...s].sort(([,o],[,c])=>i(c)-i(o));return{entity:r?.[0]??""}}setConfig(e){if(!e.entity)throw new Error("Set an entity, such as sensor.home_thunderstorm_warning");this._config=e}getCardSize(){let e=this._tile?.getCardSize?.();return typeof e=="number"?e:1}getGridOptions(){return this._tile?.getGridOptions?.()??zt}updated(){this._sync()}_tileConfig(e,s){let i=s.states[e.entity]?.attributes.color;return{...e,type:"tile",...typeof i=="string"&&i?{color:i}:{}}}async _sync(){let e=this._config,s=this.hass;if(!e||!s)return;this._tile||(this._making??=this._make(this._tileConfig(e,s)),await this._making);let i=this._tile;if(!i)return;let r=this._tileConfig(e,s),o=JSON.stringify(r);o!==this._last&&(this._last=o,i.setConfig(r)),i.hass=s}async _make(e){let s=await window.loadCardHelpers?.();s&&(this._last=JSON.stringify(e),this._tile=s.createCardElement(e))}render(){return this._tile??h}static{this.styles=S`
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
