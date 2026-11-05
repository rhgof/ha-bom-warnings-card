var M=globalThis,U=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),et=new WeakMap,C=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(U&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=et.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&et.set(e,t))}return t}toString(){return this.cssText}},st=n=>new C(typeof n=="string"?n:n+"",void 0,j),S=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new C(e,n,j)},it=(n,t)=>{if(U)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=M.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},W=U?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return st(e)})(n):n;var{is:St,defineProperty:Tt,getOwnPropertyDescriptor:xt,getOwnPropertyNames:Pt,getOwnPropertySymbols:Ht,getPrototypeOf:Ot}=Object,N=globalThis,nt=N.trustedTypes,kt=nt?nt.emptyScript:"",Rt=N.reactiveElementPolyfillSupport,T=(n,t)=>n,B={toAttribute(n,t){switch(t){case Boolean:n=n?kt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},rt=(n,t)=>!St(n,t),ot={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:rt};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;var m=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ot){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Tt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=xt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let h=i?.call(this);o?.call(this,r),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ot}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Ot(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,s=[...Pt(e),...Ht(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(W(i))}else t!==void 0&&e.push(W(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return it(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:B).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:B;this._$Em=i;let h=r.fromAttribute(e,o.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let r=this.constructor;if(i===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??rt)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:r}=o,h=this[i];r!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,o,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[T("elementProperties")]=new Map,m[T("finalized")]=new Map,Rt?.({ReactiveElement:m}),(N.reactiveElementVersions??=[]).push("2.1.2");var J=globalThis,at=n=>n,L=J.trustedTypes,lt=L?L.createPolicy("lit-html",{createHTML:n=>n}):void 0,_t="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,ft="?"+y,Mt=`<${ft}>`,w=document,P=()=>w.createComment(""),H=n=>n===null||typeof n!="object"&&typeof n!="function",F=Array.isArray,Ut=n=>F(n)||typeof n?.[Symbol.iterator]=="function",z=`[ 	
\f\r]`,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,ct=/>/g,v=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dt=/'/g,pt=/"/g,mt=/^(?:script|style|textarea|title)$/i,Z=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),u=Z(1),Yt=Z(2),Qt=Z(3),g=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ut=new WeakMap,A=w.createTreeWalker(w,129);function gt(n,t){if(!F(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return lt!==void 0?lt.createHTML(t):t}var Nt=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",r=x;for(let h=0;h<e;h++){let a=n[h],d,p,c=-1,f=0;for(;f<a.length&&(r.lastIndex=f,p=r.exec(a),p!==null);)f=r.lastIndex,r===x?p[1]==="!--"?r=ht:p[1]!==void 0?r=ct:p[2]!==void 0?(mt.test(p[2])&&(i=RegExp("</"+p[2],"g")),r=v):p[3]!==void 0&&(r=v):r===v?p[0]===">"?(r=i??x,c=-1):p[1]===void 0?c=-2:(c=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?v:p[3]==='"'?pt:dt):r===pt||r===dt?r=v:r===ht||r===ct?r=x:(r=v,i=void 0);let $=r===v&&n[h+1].startsWith("/>")?" ":"";o+=r===x?a+Mt:c>=0?(s.push(d),a.slice(0,c)+_t+a.slice(c)+y+$):a+y+(c===-2?h:$)}return[gt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},O=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0,h=t.length-1,a=this.parts,[d,p]=Nt(t,e);if(this.el=n.createElement(d,s),A.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=A.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(_t)){let f=p[r++],$=i.getAttribute(c).split(y),R=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:R[2],strings:$,ctor:R[1]==="."?V:R[1]==="?"?q:R[1]==="@"?G:E}),i.removeAttribute(c)}else c.startsWith(y)&&(a.push({type:6,index:o}),i.removeAttribute(c));if(mt.test(i.tagName)){let c=i.textContent.split(y),f=c.length-1;if(f>0){i.textContent=L?L.emptyScript:"";for(let $=0;$<f;$++)i.append(c[$],P()),A.nextNode(),a.push({type:2,index:++o});i.append(c[f],P())}}}else if(i.nodeType===8)if(i.data===ft)a.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:o}),c+=y.length-1}o++}}static createElement(t,e){let s=w.createElement("template");return s.innerHTML=t,s}};function b(n,t,e=n,s){if(t===g)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=H(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=b(n,i._$AS(n,t.values),i,s)),t}var I=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??w).importNode(e,!0);A.currentNode=i;let o=A.nextNode(),r=0,h=0,a=s[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new k(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new K(o,this,t)),this._$AV.push(d),a=s[++h]}r!==a?.index&&(o=A.nextNode(),r++)}return A.currentNode=w,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},k=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=b(this,t,e),H(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==g&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ut(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=O.createElement(gt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new I(i,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new O(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=at(t).nextSibling;at(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,i){let o=this.strings,r=!1;if(o===void 0)t=b(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==g,r&&(this._$AH=t);else{let h=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=b(this,h[s+a],e,a),d===g&&(d=this._$AH[a]),r||=!H(d)||d!==this._$AH[a],d===l?t=l:t!==l&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}r&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},V=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},q=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},G=class extends E{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=b(this,t,e,0)??l)===g)return;let s=this._$AH,i=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},K=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){b(this,t)}};var Lt=J.litHtmlPolyfillSupport;Lt?.(O,k),(J.litHtmlVersions??=[]).push("3.3.3");var $t=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new k(t.insertBefore(P(),o),o,void 0,e??{})}return i._$AI(n),i};var Y=globalThis,_=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return g}};_._$litElement$=!0,_.finalized=!0,Y.litElementHydrateSupport?.({LitElement:_});var Dt=Y.litElementPolyfillSupport;Dt?.({LitElement:_});(Y.litElementVersions??=[]).push("4.2.2");var yt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vt=n=>(...t)=>({_$litDirective$:n,values:t}),D=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var At="important",jt=" !"+At,wt=vt(class extends D{constructor(n){if(super(n),n.type!==yt.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{let s=n[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(n,[t]){let{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let i=t[s];if(i!=null){this.ft.add(s);let o=typeof i=="string"&&i.endsWith(jt);s.includes("-")||o?e.setProperty(s,o?i.slice(0,-11):i,o?At:""):e[s]=i}}return g}});var Wt={entity:"Warning count sensor",title:"Title",show_headline:"Show each warning's headline",show_area:"Show the areas each warning covers",show_summary:"Show each warning's summary",show_level:"Show each warning's level and phase",tap_action:"Tap action",hold_action:"Hold action",double_tap_action:"Double tap action"},Bt={entity:"The sensor named ... warning count from the BoM Warnings integration.",title:"Leave empty for the default, Warnings."},bt=["show_headline","show_area","show_summary","show_level"],Et={tap_action:"more-info",hold_action:"none",double_tap_action:"none"},Q=class extends _{constructor(){super(...arguments);this._computeLabel=e=>Wt[e.name]??e.name;this._computeHelper=e=>Bt[e.name]??""}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}setConfig(e){this._config=e}_schema(){return[{name:"entity",required:!0,selector:{entity:{include_entities:Object.keys(this.hass?.states??{}).filter(s=>s.endsWith("_warning_count"))}}},{name:"title",selector:{text:{}}},...bt.map(s=>({name:s,selector:{boolean:{}}})),...Object.entries(Et).map(([s,i])=>({name:s,selector:{ui_action:{default_action:i}}}))]}_changed(e){let s=e.detail.value,i={type:this._config?.type??"custom:bom-warnings-card",...s.entity?{entity:s.entity}:{},...s.title?{title:s.title}:{}};for(let o of bt)s[o]===!1&&(i[o]=!1);for(let[o,r]of Object.entries(Et)){let h=s[o],a=h?.action===r&&Object.keys(h).length===1;h&&!a&&(i[o]=h)}this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}render(){if(!this._config)return l;let e={show_headline:!0,show_area:!0,show_summary:!0,show_level:!0,tap_action:{action:"more-info"},hold_action:{action:"none"},double_tap_action:{action:"none"},...this._config};return u`<ha-form
      .hass=${this.hass}
      .data=${e}
      .schema=${this._schema()}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._changed}
    ></ha-form>`}};customElements.define("bom-warnings-card-editor",Q);var zt=["final","cancelled"],Ct={action:"none"},It=500,Vt=250,X=class extends _{constructor(){super(...arguments);this._held=!1;this._down=()=>{this._held=!1,clearTimeout(this._holdTimer),this._isOn("hold")&&(this._holdTimer=setTimeout(()=>{this._held=!0,this._fire("hold")},It))};this._release=()=>{clearTimeout(this._holdTimer)};this._click=()=>{if(this._held){this._held=!1;return}if(!this._isOn("double_tap")){this._fire("tap");return}if(this._tapTimer!==void 0){clearTimeout(this._tapTimer),this._tapTimer=void 0,this._fire("double_tap");return}this._tapTimer=setTimeout(()=>{this._tapTimer=void 0,this._fire("tap")},Vt)};this._key=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._fire("tap"))}}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("bom-warnings-card-editor")}static getStubConfig(e){let s=Object.keys(e?.states??{}).filter(r=>r.endsWith("_warning_count")),i=r=>Number(e?.states[r]?.state)||0;return{entity:s.reduce((r,h)=>i(h)>(r?i(r):0)?h:r,void 0)??s[0]??""}}setConfig(e){if(!e.entity)throw new Error("Set an entity, such as sensor.home_warning_count");this._config=e}getCardSize(){return 3}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._holdTimer),clearTimeout(this._tapTimer),this._tapTimer=void 0}_actions(){let e=this._config;return{entity:e.entity,tap_action:e.tap_action??{action:"more-info"},hold_action:e.hold_action??Ct,double_tap_action:e.double_tap_action??Ct}}_isOn(e){return this._actions()[`${e}_action`].action!=="none"}_fire(e){this._isOn(e)&&this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:this._actions(),action:e},bubbles:!0,composed:!0}))}_shell(e,s,i){let o=i&&this._isOn("tap");return u`<ha-card
      header=${e}
      class=${o?"tappable":""}
      role=${o?"button":l}
      tabindex=${o?"0":l}
      @click=${i?this._click:l}
      @pointerdown=${i?this._down:l}
      @pointerup=${i?this._release:l}
      @pointercancel=${i?this._release:l}
      @pointerleave=${i?this._release:l}
      @keydown=${o?this._key:l}
      >${s}</ha-card
    >`}render(){let e=this._config;if(!e)return l;let s=e.title??"Warnings",i=this.hass?.states[e.entity];if(!i)return this._shell(s,u`<div class="note">Entity not found: ${e.entity}</div>`,!1);if(i.state==="unavailable"||i.state==="unknown")return this._shell(s,u`<div class="note">${i.state}</div>`,!0);let o=i.attributes.warnings??[];return this._shell(s,o.length===0?u`<div class="note">No warnings for this location.</div>`:u`<div class="list">${o.map(r=>this._row(r,e))}</div>`,!0)}_row(e,s){let i=zt.includes(e.phase??""),o=[e.level,i?e.phase:void 0].filter(Boolean).join(", ");return u`<div class="warning ${i?"ended":""}">
      <ha-icon
        icon=${e.icon??"mdi:alert"}
        style=${wt({color:e.color??"var(--secondary-text-color)"})}
      ></ha-icon>
      <div class="detail">
        <div class="title">
          <span class="event">${e.event}</span>
          ${s.show_level!==!1&&o?u`<span class="level">(${o})</span>`:l}
        </div>
        ${s.show_headline!==!1?u`<div class="headline">${e.headline}</div>`:l}
        ${s.show_area!==!1&&e.area?u`<div class="area">${e.area}</div>`:l}
        ${s.show_summary!==!1&&e.summary?u`<div class="summary">${e.summary}</div>`:l}
      </div>
    </div>`}static{this.styles=S`
    .list {
      padding: 0 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ha-card.tappable {
      cursor: pointer;
    }
    ha-card.tappable:focus-visible {
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
  `}};customElements.define("bom-warnings-card",X);window.customCards=window.customCards||[];window.customCards.push({type:"bom-warnings-card",name:"BoM Warnings",description:"Current Bureau of Meteorology warnings for a location, most severe first."});var qt={extreme:4,severe:3,moderate:2,unrated:2,minor:1},Gt={columns:6,rows:1},tt=class extends _{constructor(){super(...arguments);this._last=""}static{this.properties={hass:{attribute:!1},_config:{state:!0},_tile:{state:!0}}}static async getConfigElement(){return(await window.loadCardHelpers?.())?.createCardElement({type:"tile",entity:"sensor.x"}),await customElements.whenDefined("hui-tile-card"),customElements.get("hui-tile-card").getConfigElement()}static getStubConfig(e){let s=Object.entries(e?.states??{}).filter(([r,h])=>r.startsWith("sensor.")&&r.endsWith("_warning")&&!r.endsWith("_most_severe_warning")&&h?.attributes.level!==void 0&&Array.isArray(h.attributes.warnings)),i=r=>qt[r?.state??""]??0,[o]=[...s].sort(([,r],[,h])=>i(h)-i(r));return{entity:o?.[0]??""}}setConfig(e){if(!e.entity)throw new Error("Set an entity, such as sensor.home_thunderstorm_warning");this._config=e}getCardSize(){let e=this._tile?.getCardSize?.();return typeof e=="number"?e:1}getGridOptions(){return this._tile?.getGridOptions?.()??Gt}updated(){this._sync()}_tileConfig(e,s){let i=s.states[e.entity]?.attributes.color;return{...e,type:"tile",...typeof i=="string"&&i?{color:i}:{}}}async _sync(){let e=this._config,s=this.hass;if(!e||!s)return;this._tile||(this._making??=this._make(this._tileConfig(e,s)),await this._making);let i=this._tile;if(!i)return;let o=this._tileConfig(e,s),r=JSON.stringify(o);r!==this._last&&(this._last=r,i.setConfig(o)),i.hass=s}async _make(e){let s=await window.loadCardHelpers?.();s&&(this._last=JSON.stringify(e),this._tile=s.createCardElement(e))}render(){return this._tile??l}static{this.styles=S`
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
