var NanairoAccessibility=(function(f){"use strict";const Q=globalThis,ae=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ne=Symbol(),fe=new WeakMap;let Ae=class{constructor(e,a,n){if(this._$cssResult$=!0,n!==ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(ae&&e===void 0){const n=a!==void 0&&a.length===1;n&&(e=fe.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&fe.set(a,e))}return e}toString(){return this.cssText}};const be=t=>new Ae(typeof t=="string"?t:t+"",void 0,ne),_e=(t,...e)=>{const a=t.length===1?t[0]:e.reduce((n,i,u)=>n+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[u+1],t[0]);return new Ae(a,t,ne)},et=(t,e)=>{if(ae)t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const n=document.createElement("style"),i=Q.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=a.cssText,t.appendChild(n)}},ye=ae?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(const n of e.cssRules)a+=n.cssText;return be(a)})(t):t;const{is:tt,defineProperty:at,getOwnPropertyDescriptor:nt,getOwnPropertyNames:it,getOwnPropertySymbols:ut,getPrototypeOf:rt}=Object,Y=globalThis,Ee=Y.trustedTypes,ot=Ee?Ee.emptyScript:"",st=Y.reactiveElementPolyfillSupport,I=(t,e)=>t,V={toAttribute(t,e){switch(e){case Boolean:t=t?ot:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},ie=(t,e)=>!tt(t,e),ve={attribute:!0,type:String,converter:V,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=ve){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,a);i!==void 0&&at(this.prototype,e,i)}}static getPropertyDescriptor(e,a,n){const{get:i,set:u}=nt(this.prototype,e)??{get(){return this[a]},set(r){this[a]=r}};return{get:i,set(r){const o=i?.call(this);u?.call(this,r),this.requestUpdate(e,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ve}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;const e=rt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){const a=this.properties,n=[...it(a),...ut(a)];for(const i of n)this.createProperty(i,a[i])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[n,i]of a)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[a,n]of this.elementProperties){const i=this._$Eu(a,n);i!==void 0&&this._$Eh.set(i,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)a.unshift(ye(i))}else e!==void 0&&a.push(ye(e));return a}static _$Eu(e,a){const n=a.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const n of a.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return et(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,a,n){this._$AK(e,n)}_$ET(e,a){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const u=(n.converter?.toAttribute!==void 0?n.converter:V).toAttribute(a,n.type);this._$Em=e,u==null?this.removeAttribute(i):this.setAttribute(i,u),this._$Em=null}}_$AK(e,a){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const u=n.getPropertyOptions(i),r=typeof u.converter=="function"?{fromAttribute:u.converter}:u.converter?.fromAttribute!==void 0?u.converter:V;this._$Em=i;const o=r.fromAttribute(a,u.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,a,n,i=!1,u){if(e!==void 0){const r=this.constructor;if(i===!1&&(u=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??ie)(u,a)||n.useDefault&&n.reflect&&u===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,a,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:n,reflect:i,wrapped:u},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??a??this[e]),u!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(a=void 0),this._$AL.set(e,a)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,u]of this._$Ep)this[i]=u;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,u]of n){const{wrapped:r}=u,o=this[i];r!==!0||this._$AL.has(i)||o===void 0||this.C(i,void 0,u,o)}}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(a)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(a)}willUpdate(e){}_$AE(e){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[I("elementProperties")]=new Map,k[I("finalized")]=new Map,st?.({ReactiveElement:k}),(Y.reactiveElementVersions??=[]).push("2.1.2");const ue=globalThis,Ce=t=>t,X=ue.trustedTypes,xe=X?X.createPolicy("lit-html",{createHTML:t=>t}):void 0,we="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Fe="?"+C,lt=`<${Fe}>`,w=document,R=()=>w.createComment(""),P=t=>t===null||typeof t!="object"&&typeof t!="function",re=Array.isArray,ct=t=>re(t)||typeof t?.[Symbol.iterator]=="function",oe=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Be=/-->/g,De=/>/g,F=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ke=/'/g,Se=/"/g,Me=/^(?:script|style|textarea|title)$/i,Ue=t=>(e,...a)=>({_$litType$:t,strings:e,values:a}),y=Ue(1),p=Ue(2),S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),He=new WeakMap,B=w.createTreeWalker(w,129);function ze(t,e){if(!re(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return xe!==void 0?xe.createHTML(e):e}const dt=(t,e)=>{const a=t.length-1,n=[];let i,u=e===2?"<svg>":e===3?"<math>":"",r=O;for(let o=0;o<a;o++){const s=t[o];let d,h,l=-1,A=0;for(;A<s.length&&(r.lastIndex=A,h=r.exec(s),h!==null);)A=r.lastIndex,r===O?h[1]==="!--"?r=Be:h[1]!==void 0?r=De:h[2]!==void 0?(Me.test(h[2])&&(i=RegExp("</"+h[2],"g")),r=F):h[3]!==void 0&&(r=F):r===F?h[0]===">"?(r=i??O,l=-1):h[1]===void 0?l=-2:(l=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?F:h[3]==='"'?Se:ke):r===Se||r===ke?r=F:r===Be||r===De?r=O:(r=F,i=void 0);const b=r===F&&t[o+1].startsWith("/>")?" ":"";u+=r===O?s+lt:l>=0?(n.push(d),s.slice(0,l)+we+s.slice(l)+C+b):s+C+(l===-2?o:b)}return[ze(t,u+(t[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class T{constructor({strings:e,_$litType$:a},n){let i;this.parts=[];let u=0,r=0;const o=e.length-1,s=this.parts,[d,h]=dt(e,a);if(this.el=T.createElement(d,n),B.currentNode=this.el.content,a===2||a===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=B.nextNode())!==null&&s.length<o;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(we)){const A=h[r++],b=i.getAttribute(l).split(C),D=/([.?@])?(.*)/.exec(A);s.push({type:1,index:u,name:D[2],strings:b,ctor:D[1]==="."?pt:D[1]==="?"?gt:D[1]==="@"?mt:$}),i.removeAttribute(l)}else l.startsWith(C)&&(s.push({type:6,index:u}),i.removeAttribute(l));if(Me.test(i.tagName)){const l=i.textContent.split(C),A=l.length-1;if(A>0){i.textContent=X?X.emptyScript:"";for(let b=0;b<A;b++)i.append(l[b],R()),B.nextNode(),s.push({type:2,index:++u});i.append(l[A],R())}}}else if(i.nodeType===8)if(i.data===Fe)s.push({type:2,index:u});else{let l=-1;for(;(l=i.data.indexOf(C,l+1))!==-1;)s.push({type:7,index:u}),l+=C.length-1}u++}}static createElement(e,a){const n=w.createElement("template");return n.innerHTML=e,n}}function M(t,e,a=t,n){if(e===S)return e;let i=n!==void 0?a._$Co?.[n]:a._$Cl;const u=P(e)?void 0:e._$litDirective$;return i?.constructor!==u&&(i?._$AO?.(!1),u===void 0?i=void 0:(i=new u(t),i._$AT(t,a,n)),n!==void 0?(a._$Co??=[])[n]=i:a._$Cl=i),i!==void 0&&(e=M(t,i._$AS(t,e.values),i,n)),e}class ht{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:a},parts:n}=this._$AD,i=(e?.creationScope??w).importNode(a,!0);B.currentNode=i;let u=B.nextNode(),r=0,o=0,s=n[0];for(;s!==void 0;){if(r===s.index){let d;s.type===2?d=new L(u,u.nextSibling,this,e):s.type===1?d=new s.ctor(u,s.name,s.strings,this,e):s.type===6&&(d=new ft(u,this,e)),this._$AV.push(d),s=n[++o]}r!==s?.index&&(u=B.nextNode(),r++)}return B.currentNode=w,i}p(e){let a=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,a),a+=n.strings.length-2):n._$AI(e[a])),a++}}class L{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,a,n,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&e?.nodeType===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=M(this,e,a),P(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ct(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){const{values:a,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=T.createElement(ze(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(a);else{const u=new ht(i,this),r=u.u(this.options);u.p(a),this.T(r),this._$AH=u}}_$AC(e){let a=He.get(e.strings);return a===void 0&&He.set(e.strings,a=new T(e)),a}k(e){re(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let n,i=0;for(const u of e)i===a.length?a.push(n=new L(this.O(R()),this.O(R()),this,this.options)):n=a[i],n._$AI(u),i++;i<a.length&&(this._$AR(n&&n._$AB.nextSibling,i),a.length=i)}_$AR(e=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);e!==this._$AB;){const n=Ce(e).nextSibling;Ce(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class ${get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,n,i,u){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=a,this._$AM=i,this.options=u,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=c}_$AI(e,a=this,n,i){const u=this.strings;let r=!1;if(u===void 0)e=M(this,e,a,0),r=!P(e)||e!==this._$AH&&e!==S,r&&(this._$AH=e);else{const o=e;let s,d;for(e=u[0],s=0;s<u.length-1;s++)d=M(this,o[n+s],a,s),d===S&&(d=this._$AH[s]),r||=!P(d)||d!==this._$AH[s],d===c?e=c:e!==c&&(e+=(d??"")+u[s+1]),this._$AH[s]=d}r&&!i&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class pt extends ${constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class gt extends ${constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class mt extends ${constructor(e,a,n,i,u){super(e,a,n,i,u),this.type=5}_$AI(e,a=this){if((e=M(this,e,a,0)??c)===S)return;const n=this._$AH,i=e===c&&n!==c||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,u=e!==c&&(n===c||i);i&&this.element.removeEventListener(this.name,this,n),u&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ft{constructor(e,a,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}}const At=ue.litHtmlPolyfillSupport;At?.(T,L),(ue.litHtmlVersions??=[]).push("3.3.3");const bt=(t,e,a)=>{const n=a?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const u=a?.renderBefore??null;n._$litPart$=i=new L(e.insertBefore(R(),u),u,void 0,a??{})}return i._$AI(t),i};const se=globalThis;class j extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=bt(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}}j._$litElement$=!0,j.finalized=!0,se.litElementHydrateSupport?.({LitElement:j});const yt=se.litElementPolyfillSupport;yt?.({LitElement:j}),(se.litElementVersions??=[]).push("4.2.2");const Et=t=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const vt={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:ie},Ct=(t=vt,e,a)=>{const{kind:n,metadata:i}=a;let u=globalThis.litPropertyMetadata.get(i);if(u===void 0&&globalThis.litPropertyMetadata.set(i,u=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),u.set(a.name,t),n==="accessor"){const{name:r}=a;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(r,s,t,!0,o)},init(o){return o!==void 0&&this.C(r,void 0,t,o),o}}}if(n==="setter"){const{name:r}=a;return function(o){const s=this[r];e.call(this,o),this.requestUpdate(r,s,t,!0,o)}}throw Error("Unsupported decorator location: "+n)};function _(t){return(e,a)=>typeof a=="object"?Ct(t,e,a):((n,i,u)=>{const r=i.hasOwnProperty(u);return i.constructor.createProperty(u,n),r?Object.getOwnPropertyDescriptor(i,u):void 0})(t,e,a)}function J(t){return _({...t,state:!0,attribute:!1})}const xt={ja:{open:"\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3\u8A2D\u5B9A\u3092\u958B\u304F",close:"\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3\u8A2D\u5B9A\u3092\u9589\u3058\u308B",title:"\u8868\u793A\u30B5\u30DD\u30FC\u30C8",launcherLine1:"\u8868\u793A",launcherLine2:"\u30B5\u30DD\u30FC\u30C8",subtitle:"\u898B\u3084\u3059\u3055\u3092\u3001\u3042\u306A\u305F\u597D\u307F\u306B\u3002",language:"\u8868\u793A\u8A00\u8A9E",appearance:"\u6587\u5B57\u3068\u8868\u793A",colorModes:"\u30AB\u30E9\u30FC\u30E2\u30FC\u30C9",colorModeHint:"\u898B\u3084\u3059\u3044\u914D\u8272\u30921\u3064\u9078\u3079\u307E\u3059",colorDefault:"\u6A19\u6E96",colorDark:"\u30C0\u30FC\u30AF",colorLight:"\u30E9\u30A4\u30C8",colorHighContrast:"\u9AD8\u30B3\u30F3\u30C8\u30E9\u30B9\u30C8",colorMonochrome:"\u30E2\u30CE\u30AF\u30ED",colorSaturated:"\u9BAE\u3084\u304B",focus:"\u96C6\u4E2D\u30B5\u30DD\u30FC\u30C8",textSize:"\u6587\u5B57\u30B5\u30A4\u30BA",textSizeHint:"\u30DA\u30FC\u30B8\u306E\u6587\u5B57\u3092\u62E1\u5927\u3057\u307E\u3059",decrease:"\u6587\u5B57\u3092\u5C0F\u3055\u304F\u3059\u308B",increase:"\u6587\u5B57\u3092\u5927\u304D\u304F\u3059\u308B",spacing:"\u3086\u3063\u305F\u308A\u8868\u793A",spacingHint:"\u884C\u9593\u3068\u6587\u5B57\u9593\u3092\u5E83\u3052\u307E\u3059",highlightLinks:"\u30EA\u30F3\u30AF\u3092\u5F37\u8ABF",highlightLinksHint:"\u30EA\u30F3\u30AF\u306B\u4E0B\u7DDA\u3068\u80CC\u666F\u8272\u3092\u52A0\u3048\u307E\u3059",highContrast:"\u9AD8\u30B3\u30F3\u30C8\u30E9\u30B9\u30C8",highContrastHint:"\u767D\u3068\u9ED2\u3092\u57FA\u8ABF\u306B\u60C5\u5831\u3092\u304F\u3063\u304D\u308A\u8868\u793A\u3057\u307E\u3059",readableFont:"\u8AAD\u307F\u3084\u3059\u3044\u30D5\u30A9\u30F3\u30C8",readableFontHint:"\u6587\u5B57\u306E\u5F62\u3092\u5224\u5225\u3057\u3084\u3059\u3044\u66F8\u4F53\u306B\u5207\u308A\u66FF\u3048\u307E\u3059",reduceMotion:"\u52D5\u304D\u3092\u6E1B\u3089\u3059",reduceMotionHint:"\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3068\u753B\u9762\u52B9\u679C\u3092\u6291\u3048\u307E\u3059",readingGuide:"\u30EA\u30FC\u30C7\u30A3\u30F3\u30B0\u30AC\u30A4\u30C9",readingGuideHint:"\u30DD\u30A4\u30F3\u30BF\u30FC\u4F4D\u7F6E\u306B\u8AAD\u307F\u53D6\u308A\u7DDA\u3092\u8868\u793A\u3057\u307E\u3059",readingMask:"\u30EA\u30FC\u30C7\u30A3\u30F3\u30B0\u30DE\u30B9\u30AF",readingMaskHint:"\u8AAD\u3093\u3067\u3044\u308B\u884C\u4EE5\u5916\u3092\u6697\u304F\u3057\u307E\u3059",audioMedia:"\u97F3\u58F0\u3068\u30E1\u30C7\u30A3\u30A2",speech:"\u97F3\u58F0\u8AAD\u307F\u4E0A\u3052",speechHint:"\u30DA\u30FC\u30B8\u672C\u6587\u3092\u5148\u982D\u304B\u3089\u8AAD\u307F\u4E0A\u3052\u307E\u3059",speechStopHint:"\u8AAD\u307F\u4E0A\u3052\u3092\u505C\u6B62\u3057\u307E\u3059",speechStarted:"\u97F3\u58F0\u8AAD\u307F\u4E0A\u3052\u3092\u958B\u59CB\u3057\u307E\u3057\u305F",speechStopped:"\u97F3\u58F0\u8AAD\u307F\u4E0A\u3052\u3092\u505C\u6B62\u3057\u307E\u3057\u305F",speechUnavailable:"\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u306F\u97F3\u58F0\u8AAD\u307F\u4E0A\u3052\u306B\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093",mediaPaused:"\u30E1\u30C7\u30A3\u30A2\u3092\u505C\u6B62\u30FB\u30DF\u30E5\u30FC\u30C8",mediaPausedHint:"\u30DA\u30FC\u30B8\u5185\u306E\u52D5\u753B\u3068\u97F3\u58F0\u3092\u307E\u3068\u3081\u3066\u505C\u6B62\u3057\u307E\u3059",auditSection:"\u30DA\u30FC\u30B8\u306E\u78BA\u8A8D",auditTitle:"\u7C21\u6613\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3\u30C1\u30A7\u30C3\u30AF",auditHint:"\u30AC\u30A4\u30C9\u30D6\u30C3\u30AF\u306E\u91CD\u5927\u30FB\u5FC5\u9808\u9805\u76EE\u304B\u3089\u554F\u984C\u5019\u88DC\u3092\u3053\u306E\u30DA\u30FC\u30B8\u3067\u63A2\u3057\u307E\u3059",auditSevere:"\u91CD\u5927\uFF08\u9054\u6210\u3057\u306A\u3044\u3068\u91CD\u5927\u306A\u60AA\u5F71\u97FF\uFF09",auditRequired:"\u5FC5\u9808\uFF08\u5FC5\u305A\u9054\u6210\u3057\u306A\u3051\u308C\u3070\u306A\u3089\u306A\u3044\uFF09",auditRun:"\u3053\u306E\u30DA\u30FC\u30B8\u3092\u30C1\u30A7\u30C3\u30AF",auditDone:"\u30C1\u30A7\u30C3\u30AF\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F",auditWarnings:"\u9805\u76EE\u306B\u554F\u984C\u5019\u88DC",auditManuals:"\u9805\u76EE\u306F\u76EE\u8996\u78BA\u8A8D",auditDisclaimer:"\u81EA\u52D5\u30C1\u30A7\u30C3\u30AF\u3060\u3051\u3067\u306F\u9069\u5408\u6027\u3092\u5224\u65AD\u3067\u304D\u307E\u305B\u3093\u3002\u7D50\u679C\u304C0\u4EF6\u3067\u3082\u3001\u30AD\u30FC\u30DC\u30FC\u30C9\u3068\u30B9\u30AF\u30EA\u30FC\u30F3\u30EA\u30FC\u30C0\u30FC\u306B\u3088\u308B\u78BA\u8A8D\u304C\u5FC5\u8981\u3067\u3059\u3002",reset:"\u3059\u3079\u3066\u30EA\u30BB\u30C3\u30C8",resetDone:"\u8A2D\u5B9A\u3092\u30EA\u30BB\u30C3\u30C8\u3057\u307E\u3057\u305F",enabled:"\u30AA\u30F3",disabled:"\u30AA\u30D5",level:"\u30EC\u30D9\u30EB",note:"\u3053\u306E\u30C4\u30FC\u30EB\u306F\u8868\u793A\u3092\u8ABF\u6574\u3059\u308B\u3082\u306E\u3067\u3001\u30B5\u30A4\u30C8\u81EA\u4F53\u306E\u9069\u5408\u6027\u3092\u4FDD\u8A3C\u3059\u308B\u3082\u306E\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002"},en:{open:"Open accessibility preferences",close:"Close accessibility preferences",title:"Display support",launcherLine1:"Display",launcherLine2:"support",subtitle:"Make this page comfortable for you.",language:"Language",appearance:"Text & display",colorModes:"Color mode",colorModeHint:"Choose one color presentation",colorDefault:"Default",colorDark:"Dark",colorLight:"Light",colorHighContrast:"High contrast",colorMonochrome:"Monochrome",colorSaturated:"Vivid",focus:"Focus support",textSize:"Text size",textSizeHint:"Increase the size of page text",decrease:"Decrease text size",increase:"Increase text size",spacing:"Comfortable spacing",spacingHint:"Increase line and letter spacing",highlightLinks:"Highlight links",highlightLinksHint:"Add underlines and a background to links",highContrast:"High contrast",highContrastHint:"Use a crisp black-and-white presentation",readableFont:"Readable font",readableFontHint:"Use letterforms designed for easier recognition",reduceMotion:"Reduce motion",reduceMotionHint:"Limit animations and motion effects",readingGuide:"Reading guide",readingGuideHint:"Show a guide at the pointer position",readingMask:"Reading mask",readingMaskHint:"Dim the page outside the current line",audioMedia:"Audio & media",speech:"Read page aloud",speechHint:"Read the main page content from the beginning",speechStopHint:"Stop reading the page aloud",speechStarted:"Reading started",speechStopped:"Reading stopped",speechUnavailable:"Text-to-speech is not supported by this browser",mediaPaused:"Stop & mute media",mediaPausedHint:"Pause and mute all audio and video on this page",auditSection:"Page review",auditTitle:"Quick accessibility check",auditHint:"Scan this page for candidates against the guidebook checks",auditSevere:"Critical (severe impact if unmet)",auditRequired:"Required (must be met)",auditRun:"Check this page",auditDone:"Check complete",auditWarnings:"checks with candidates",auditManuals:"checks need manual review",auditDisclaimer:"Automated checks cannot determine conformance. Keyboard and screen-reader testing are still required even when no candidates are found.",reset:"Reset all",resetDone:"Preferences reset",enabled:"On",disabled:"Off",level:"Level",note:"This tool adjusts presentation. It does not guarantee that the website itself conforms to accessibility standards."}},wt=t=>t==="ja"||t==="en",ee=(t,e="ja")=>wt(t)?t:e,Ft=(t,e)=>xt[ee(t)][e],Ne="nanairo-a11y-page-styles",q="nanairo-a11y-reading-guide",W="nanairo-a11y-reading-mask",Bt=`
html[data-nanairo-spacing="comfortable"] body :where(p, li, dd, dt, blockquote, figcaption, label, input, textarea, button) {
  line-height: 1.8 !important;
  letter-spacing: 0.055em !important;
  word-spacing: 0.12em !important;
}

html[data-nanairo-links="highlight"] body a:not([data-nanairo-ignore]) {
  color: #064e96 !important;
  background: color-mix(in srgb, #7ac8ff 24%, transparent) !important;
  text-decoration: underline 0.16em !important;
  text-underline-offset: 0.2em !important;
  outline-offset: 3px !important;
  border-radius: 0.18em;
}

html[data-nanairo-color="dark"] body {
  color: #f7fbf9 !important;
  background: #181b1a !important;
  color-scheme: dark;
}

/*
 * Every element gets readable text on a dark surface. Listing element names
 * instead left anything unlisted (summary, caption, legend, time, em, code...)
 * with the site's own dark text on the new dark background. Kept at :where()
 * specificity so the targeted rules below still win on source order.
 */
html[data-nanairo-color="dark"] body :not(:where(nanairo-accessibility, nanairo-accessibility *)) {
  color: #f7fbf9 !important;
  background-color: transparent !important;
  text-shadow: none !important;
}

html[data-nanairo-color="dark"] body :where(main, section, article, aside, header, footer, nav, div, ul, ol, li, table, thead, tbody, tr, td, th, form) {
  background-color: #181b1a !important;
  background-image: none !important;
  border-color: #59645f !important;
  box-shadow: none !important;
}

html[data-nanairo-color="dark"] body :where(input, select, textarea, button) {
  color: #fff !important;
  background-color: #252a28 !important;
  border-color: #76827d !important;
}

html[data-nanairo-color="dark"] body :where(mark) {
  color: #181b1a !important;
  background-color: #f2cf6b !important;
}

html[data-nanairo-color="dark"] body a:not([data-nanairo-ignore]) {
  color: #a2e6cc !important;
  background-color: #252a28 !important;
  border-color: #76827d !important;
  text-decoration-color: currentColor !important;
}

html[data-nanairo-color="light"] body {
  color: #27272d !important;
  background-color: #fff !important;
  color-scheme: light;
}

html[data-nanairo-color="light"] body :not(:where(nanairo-accessibility, nanairo-accessibility *)) {
  color: #27272d !important;
  background-color: transparent !important;
  text-shadow: none !important;
}

html[data-nanairo-color="light"] body :where(main, section, article, aside, header, footer, nav, div, ul, ol, li, table, thead, tbody, tr, td, th, form) {
  background-color: #fff !important;
  background-image: none !important;
  border-color: #b7bfbc !important;
  box-shadow: none !important;
}

html[data-nanairo-color="light"] body :where(mark) {
  color: #27272d !important;
  background-color: #ffe9a3 !important;
}

html[data-nanairo-color="monochrome"] body > :not(nanairo-accessibility) {
  filter: grayscale(100%) !important;
}

html[data-nanairo-color="saturated"] body > :not(nanairo-accessibility) {
  filter: saturate(180%) contrast(105%) !important;
}

html[data-nanairo-contrast="high"] body {
  color: #000 !important;
  background-color: #fff !important;
}

/* Same reasoning as the dark mode sweep above: cover every element, not a list. */
html[data-nanairo-contrast="high"] body :not(:where(nanairo-accessibility, nanairo-accessibility *)) {
  color: #000 !important;
  background-color: transparent !important;
  text-shadow: none !important;
}

html[data-nanairo-contrast="high"] body :where(main, section, article, aside, header, footer, nav, div, ul, ol, li, table, thead, tbody, tr, td, th, form) {
  background-color: #fff !important;
  background-image: none !important;
  box-shadow: none !important;
}

html[data-nanairo-contrast="high"] body *::before,
html[data-nanairo-contrast="high"] body *::after {
  background-image: none !important;
  box-shadow: none !important;
}

html[data-nanairo-contrast="high"] body :where(a, button, input, select, textarea, [role="button"]) {
  color: #000 !important;
  background: #fff !important;
  border-color: #000 !important;
  box-shadow: none !important;
}

html[data-nanairo-contrast="high"] body :where(mark) {
  color: #000 !important;
  background-color: #ffe9a3 !important;
}

html[data-nanairo-contrast="high"] body a:not([data-nanairo-ignore]) {
  color: #000 !important;
  text-decoration: underline 0.16em !important;
  text-underline-offset: 0.2em !important;
}

html[data-nanairo-contrast="high"] body :focus-visible {
  outline: 3px solid #000 !important;
  outline-offset: 4px !important;
}

html[data-nanairo-font="readable"] body {
  font-family: "BIZ UDPGothic", "Yu Gothic", "Hiragino Kaku Gothic ProN", Arial, sans-serif !important;
  font-variant-ligatures: none !important;
}

html[data-nanairo-font="readable"] body :where(button, input, select, textarea) {
  font-family: inherit !important;
}

html[data-nanairo-motion="reduce"] *,
html[data-nanairo-motion="reduce"] *::before,
html[data-nanairo-motion="reduce"] *::after {
  scroll-behavior: auto !important;
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
}

#${q} {
  position: fixed;
  z-index: 2147483645;
  inset-inline: 0;
  top: var(--nanairo-guide-y, 50%);
  height: 3px;
  pointer-events: none;
  background: #1677ff;
  box-shadow: 0 0 0 1px rgba(255,255,255,.88), 0 3px 18px rgba(0,83,196,.42);
  transform: translateY(-50%);
}

#${W} {
  position: fixed;
  z-index: 2147483644;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(7, 13, 24, .58) 0,
    rgba(7, 13, 24, .58) calc(var(--nanairo-mask-y, 50%) - 42px),
    transparent calc(var(--nanairo-mask-y, 50%) - 42px),
    transparent calc(var(--nanairo-mask-y, 50%) + 42px),
    rgba(7, 13, 24, .58) calc(var(--nanairo-mask-y, 50%) + 42px),
    rgba(7, 13, 24, .58) 100%
  );
}
`;let U=!1,K;const G=new Map,Dt=[1,1.125,1.25,1.5,1.75,2],kt="h1, h2, h3, h4, h5, h6, p, li, dt, dd, figcaption, label, a, button, input, select, textarea, summary, blockquote, th, td, legend, output, span, strong, small, code, pre",Z=new Map;function St(t){return t.closest("nanairo-accessibility")||t.id===q||t.id===W?!1:t.matches("input, select, textarea")?!0:Array.from(t.childNodes).some(e=>e.nodeType===Node.TEXT_NODE&&!!e.textContent?.trim())}function le(){Z.forEach(({inlineValue:t,inlinePriority:e},a)=>{t?a.style.setProperty("font-size",t,e):a.style.removeProperty("font-size")}),Z.clear()}function Ie(t){const e=Dt[Math.max(0,Math.min(5,t))]??1;if(e===1){le();return}Array.from(document.querySelectorAll(kt)).filter(St).forEach(n=>{Z.has(n)||Z.set(n,{baseSize:Number.parseFloat(getComputedStyle(n).fontSize),inlineValue:n.style.getPropertyValue("font-size"),inlinePriority:n.style.getPropertyPriority("font-size")})}),Z.forEach(({baseSize:n},i)=>{i.isConnected&&i.style.setProperty("font-size",`${n*e}px`,"important")})}function Mt(){if(!document.head||document.getElementById(Ne))return;const t=document.createElement("style");t.id=Ne,t.textContent=Bt,document.head.append(t)}function Re(t){let e=document.getElementById(t);return e||(e=document.createElement("div"),e.id=t,e.setAttribute("aria-hidden","true"),document.body.append(e)),e}function ce(t){const e=`${t.clientY}px`;document.documentElement.style.setProperty("--nanairo-guide-y",e),document.documentElement.style.setProperty("--nanairo-mask-y",e)}function Pe(t){G.has(t)||G.set(t,{muted:t.muted,paused:t.paused}),t.pause(),t.muted=!0}function Oe(t,e){t instanceof HTMLMediaElement&&e(t),t instanceof Element&&t.querySelectorAll("audio, video").forEach(e)}function Ut(t){Oe(t,Pe)}function Ht(t){Oe(t,e=>{e.isConnected||G.delete(e)})}function Te(t){if(t){document.querySelectorAll("audio, video").forEach(Pe),!K&&document.body&&(K=new MutationObserver(e=>{e.forEach(a=>{a.addedNodes.forEach(Ut),a.removedNodes.forEach(Ht)})}),K.observe(document.body,{childList:!0,subtree:!0}));return}K?.disconnect(),K=void 0,G.forEach((e,a)=>{a.isConnected&&(a.muted=e.muted,e.paused||a.play().catch(()=>{}))}),G.clear()}const zt=["nanairoTextScale","nanairoSpacing","nanairoLinks","nanairoColor","nanairoContrast","nanairoFont","nanairoMotion"];function Nt(t){const e=document.documentElement,a=zt.map(i=>[i,e.dataset[i]]),n=Number.parseInt(e.dataset.nanairoTextScale??"",10);for(const[i]of a)delete e.dataset[i];le();try{return t()}finally{for(const[i,u]of a)u===void 0?delete e.dataset[i]:e.dataset[i]=u;Number.isInteger(n)&&n>0&&Ie(n)}}function Le(t){if(!document.body)return;Mt();const e=document.documentElement;e.dataset.nanairoTextScale=String(t.textScale),Ie(t.textScale),e.dataset.nanairoSpacing=t.comfortableSpacing?"comfortable":"default",e.dataset.nanairoLinks=t.highlightLinks?"highlight":"default";const a=t.colorMode==="default"&&t.highContrast?"high-contrast":t.colorMode;e.dataset.nanairoColor=a,e.dataset.nanairoContrast=a==="high-contrast"?"high":"default",e.dataset.nanairoFont=t.readableFont?"readable":"default",e.dataset.nanairoMotion=t.reduceMotion?"reduce":"default",Te(t.mediaPaused);const n=t.readingGuide?Re(q):document.getElementById(q),i=t.readingMask?Re(W):document.getElementById(W);n&&(n.hidden=!t.readingGuide),i&&(i.hidden=!t.readingMask);const u=t.readingGuide||t.readingMask;u&&!U?(document.addEventListener("pointermove",ce,{passive:!0}),U=!0):!u&&U&&(document.removeEventListener("pointermove",ce),U=!1)}function It(){const t=document.documentElement;le(),delete t.dataset.nanairoTextScale,delete t.dataset.nanairoSpacing,delete t.dataset.nanairoLinks,delete t.dataset.nanairoColor,delete t.dataset.nanairoContrast,delete t.dataset.nanairoFont,delete t.dataset.nanairoMotion,Te(!1),t.style.removeProperty("--nanairo-guide-y"),t.style.removeProperty("--nanairo-mask-y"),document.getElementById(q)?.remove(),document.getElementById(W)?.remove(),U&&(document.removeEventListener("pointermove",ce),U=!1)}const Rt={autoplay:{ja:{label:"\u81EA\u52D5\u518D\u751F\u3055\u305B\u306A\u3044",pass:"\u81EA\u52D5\u518D\u751F\u306E\u6307\u5B9A\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u30DF\u30E5\u30FC\u30C8\u3055\u308C\u3066\u3044\u306A\u3044\u81EA\u52D5\u518D\u751F\u30E1\u30C7\u30A3\u30A2",manual:"\u52D5\u753B\u5185\u306E\u97F3\u58F0\u30683\u79D2\u4EE5\u5185\u304B\u306E\u5224\u5B9A\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"No autoplay",pass:"No autoplay attributes found",warning:"Unmuted autoplaying media",manual:"In-video audio and the 3-second limit need manual review"}},keyboardTrap:{ja:{label:"\u30AD\u30FC\u30DC\u30FC\u30C9\u306E\u888B\u5C0F\u8DEF\u3092\u4F5C\u3089\u306A\u3044",pass:"\u81EA\u52D5\u5224\u5B9A\u5BFE\u8C61\u5916",warning:"\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u629C\u3051\u3089\u308C\u306A\u3044\u53EF\u80FD\u6027\u306E\u3042\u308B\u8981\u7D20",manual:"\u30E2\u30FC\u30C0\u30EB\u3084\u30D7\u30EC\u30A4\u30E4\u30FC\u304B\u3089\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u629C\u3051\u308B\u304B\u306F\u5B9F\u969B\u306E\u64CD\u4F5C\u3067\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"No keyboard trap",pass:"Not automatically testable",warning:"Elements that may trap focus",manual:"Escaping modals and players must be tested by hand"}},flashing:{ja:{label:"\u5149\u306E\u70B9\u6EC5\u306F\u5371\u967A",pass:"\u9AD8\u901F\u3067\u7E70\u308A\u8FD4\u3059\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"1\u79D2\u306B3\u56DE\u3092\u8D85\u3048\u308B\u70B9\u6EC5\u306E\u5019\u88DC",manual:"\u52D5\u753B\u30FBCanvas\u30FBGIF\u306E\u70B9\u6EC5\u306F\u81EA\u52D5\u5224\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"No rapid flashing",pass:"No rapidly repeating animation found",warning:"Candidates flashing more than three times per second",manual:"Flashing in video, canvas or GIF needs manual review"}},autoAdvance:{ja:{label:"\u81EA\u52D5\u3067\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u5207\u308A\u66FF\u3048\u306A\u3044",pass:"\u81EA\u52D5\u3067\u52D5\u304D\u7D9A\u3051\u308B\u8981\u7D20\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u4E00\u6642\u505C\u6B62\u624B\u6BB5\u304C\u5FC5\u8981\u306A\u81EA\u52D5\u5207\u308A\u66FF\u3048\u306E\u5019\u88DC",manual:"\u4E00\u6642\u505C\u6B62\u30FB\u505C\u6B62\u30FB\u975E\u8868\u793A\u306E\u64CD\u4F5C\u304C\u5099\u308F\u3063\u3066\u3044\u308B\u304B\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"No automatic content changes",pass:"No continuously moving content found",warning:"Auto-advancing content that needs a pause control",manual:"Pause, stop and hide controls need manual review"}},altText:{ja:{label:"\u753B\u50CF\u306E\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8",pass:"alt\u5C5E\u6027\u306E\u6B20\u843D\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"alt\u5C5E\u6027\u304C\u306A\u3044\u753B\u50CF",manual:"alt\u5C5E\u6027\u304C\u3042\u3063\u3066\u3082\u5185\u5BB9\u304C\u9069\u5207\u304B\u306F\u81EA\u52D5\u5224\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Image alternative text",pass:"No missing alt attributes found",warning:"Images without an alt attribute",manual:"A present alt says nothing about its quality; review it by hand"}},keyboard:{ja:{label:"\u30AD\u30FC\u30DC\u30FC\u30C9\u64CD\u4F5C",pass:"\u81EA\u52D5\u691C\u51FA\u7BC4\u56F2\u3067\u306F\u554F\u984C\u306A\u3057",warning:"\u30AD\u30FC\u30DC\u30FC\u30C9\u64CD\u4F5C\u3067\u304D\u306A\u3044\u53EF\u80FD\u6027\u306E\u3042\u308B\u8981\u7D20",manual:"\u3059\u3079\u3066\u306E\u6A5F\u80FD\u304C\u64CD\u4F5C\u3067\u304D\u3001\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u898B\u3048\u308B\u304B\u306F\u5B9F\u969B\u306E\u64CD\u4F5C\u3067\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Keyboard access",pass:"No automatic issues found",warning:"Potentially inaccessible interactive elements",manual:"Full operability and a visible focus indicator must be tested by hand"}},timeLimits:{ja:{label:"\u5236\u9650\u6642\u9593\u3078\u306E\u5BFE\u5FDC",pass:"\u81EA\u52D5\u66F4\u65B0\u30FB\u30AB\u30A6\u30F3\u30C8\u30C0\u30A6\u30F3\u5019\u88DC\u306A\u3057",warning:"\u5236\u9650\u6642\u9593\u307E\u305F\u306F\u81EA\u52D5\u66F4\u65B0\u306E\u5019\u88DC",manual:"\u30BB\u30C3\u30B7\u30E7\u30F3\u3084\u30B9\u30AF\u30EA\u30D7\u30C8\u5185\u306E\u5236\u9650\u6642\u9593\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Time limits",pass:"No refresh or countdown candidates found",warning:"Possible time limit or automatic refresh",manual:"Session and script-based limits need manual review"}},colorOnly:{ja:{label:"\u8272\u30FB\u5F62\u3060\u3051\u306B\u4F9D\u5B58\u3057\u305F\u60C5\u5831",pass:"\u81EA\u52D5\u5224\u5B9A\u5BFE\u8C61\u5916",warning:"\u8272\u3060\u3051\u3067\u793A\u3057\u3066\u3044\u308B\u53EF\u80FD\u6027\u306E\u3042\u308B\u8981\u7D20",manual:"\u8272\u30FB\u592A\u5B57\u30FB\u4F4D\u7F6E\u30FB\u5F62\u3060\u3051\u3067\u610F\u5473\u3092\u4F1D\u3048\u3066\u3044\u306A\u3044\u304B\u306F\u81EA\u52D5\u5224\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Information conveyed by color or shape",pass:"Not automatically testable",warning:"Elements may rely on color alone",manual:"Whether meaning rests on color, weight, position or shape alone needs manual review"}},readingOrder:{ja:{label:"\u8AAD\u307F\u4E0A\u3052\u30FB\u30D5\u30A9\u30FC\u30AB\u30B9\u9806\u5E8F",pass:"\u6B63\u306Etabindex\u3084CSS order\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u9806\u5E8F\u3092\u5909\u3048\u3066\u3044\u308B\u53EF\u80FD\u6027\u306E\u3042\u308B\u8981\u7D20",manual:"\u8AAD\u307F\u4E0A\u3052\u9806\u5E8F\u3067\u610F\u5473\u304C\u901A\u3058\u308B\u304B\u306F\u30B9\u30AF\u30EA\u30FC\u30F3\u30EA\u30FC\u30C0\u30FC\u3067\u306E\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Reading and focus order",pass:"No positive tabindex or CSS order found",warning:"Elements may override the expected order",manual:"Whether the spoken order makes sense needs a screen-reader check"}},headings:{ja:{label:"\u898B\u51FA\u3057\u69CB\u9020",pass:"\u898B\u51FA\u3057\u968E\u5C64\u306E\u81EA\u52D5\u691C\u51FA\u7BC4\u56F2\u3067\u306F\u554F\u984C\u306A\u3057",warning:"\u7A7A\u898B\u51FA\u3057\u3001H1\u4E0D\u8DB3\u30FB\u91CD\u8907\u3001\u968E\u5C64\u98DB\u3073",manual:"\u898B\u51FA\u3057\u6587\u304C\u5185\u5BB9\u3092\u8868\u3057\u3066\u3044\u308B\u304B\u306F\u81EA\u52D5\u5224\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Heading structure",pass:"No automatic heading-structure issues found",warning:"Empty headings, H1 issues, or skipped levels",manual:"Whether the wording describes the section needs manual review"}},contrast:{ja:{label:"\u30B3\u30F3\u30C8\u30E9\u30B9\u30C8",pass:"\u6E2C\u5B9A\u53EF\u80FD\u306A\u6587\u5B57\u306F\u57FA\u6E96\u5024\u4EE5\u4E0A",warning:"\u57FA\u6E96\u5024\u672A\u6E80\u306E\u53EF\u80FD\u6027\u304C\u3042\u308B\u6587\u5B57",manual:"\u753B\u50CF\u30FB\u30B0\u30E9\u30C7\u30FC\u30B7\u30E7\u30F3\u4E0A\u306E\u6587\u5B57\u306F\u6E2C\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Contrast",pass:"Measurable text meets the threshold",warning:"Text may be below the contrast threshold",manual:"Text over images or gradients cannot be measured; review it by hand"}},textResize:{ja:{label:"200%\u62E1\u5927",pass:"\u30BA\u30FC\u30E0\u3092\u5236\u9650\u3059\u308B\u6307\u5B9A\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u30BA\u30FC\u30E0\u3092\u5236\u9650\u3059\u308Bviewport\u8A2D\u5B9A",manual:"200%\u3067\u6587\u5B57\u304C\u91CD\u306A\u3063\u305F\u308A\u898B\u5207\u308C\u306A\u3044\u304B\u306F\u5B9F\u30DA\u30FC\u30B8\u3067\u306E\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"200% text resize",pass:"No zoom-restricting settings found",warning:"Viewport settings restrict zoom",manual:"Overlap and clipping at 200% need checking on the real page"}},charsetFont:{ja:{label:"\u6587\u5B57\u30B3\u30FC\u30C9\u3068\u30D5\u30A9\u30F3\u30C8",pass:"UTF-8\u3067\u3001\u6975\u7AEF\u306B\u5C0F\u3055\u3044\u6587\u5B57\u3082\u3042\u308A\u307E\u305B\u3093",warning:"UTF-8\u4EE5\u5916\u306E\u6587\u5B57\u30B3\u30FC\u30C9\u3001\u307E\u305F\u306F\u6975\u7AEF\u306B\u5C0F\u3055\u3044\u6587\u5B57",manual:"\u30A2\u30A4\u30B3\u30F3\u30D5\u30A9\u30F3\u30C8\u3001\u8AA4\u3063\u305F\u6587\u5B57\u3001\u8A18\u53F7\u306E\u8AAD\u307F\u4E0A\u3052\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Character encoding and fonts",pass:"UTF-8, and no extremely small text",warning:"Encoding other than UTF-8, or extremely small text",manual:"Icon fonts, look-alike characters and symbol pronunciation need manual review"}},pageTitle:{ja:{label:"\u30DA\u30FC\u30B8\u30BF\u30A4\u30C8\u30EB",pass:"\u30DA\u30FC\u30B8\u30BF\u30A4\u30C8\u30EB\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u3059",warning:"\u30DA\u30FC\u30B8\u30BF\u30A4\u30C8\u30EB\u304C\u672A\u8A2D\u5B9A\u307E\u305F\u306F\u66D6\u6627",manual:"H1\u3068\u306E\u6574\u5408\u6027\u3068\u30DA\u30FC\u30B8\u9593\u306E\u91CD\u8907\u306F\u30B5\u30A4\u30C8\u5168\u4F53\u3067\u306E\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Page title",pass:"A page title is present",warning:"Missing or ambiguous page title",manual:"H1 alignment and cross-page duplication need a site-wide review"}},links:{ja:{label:"\u30EA\u30F3\u30AF\u306E\u5F37\u8ABF\u30FB\u8868\u73FE",pass:"\u30EA\u30F3\u30AF\u540D\u306E\u81EA\u52D5\u691C\u51FA\u7BC4\u56F2\u3067\u306F\u554F\u984C\u306A\u3057",warning:"\u540D\u524D\u304C\u306A\u3044\u3001\u307E\u305F\u306F\u76EE\u7684\u304C\u66D6\u6627\u306A\u30EA\u30F3\u30AF",manual:"\u30EA\u30F3\u30AF\u5148\u5F62\u5F0F\uFF08PDF\u7B49\uFF09\u3068\u5225\u753B\u9762\u8868\u793A\u306E\u4E88\u544A\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Link visibility and purpose",pass:"No automatic link-name issues found",warning:"Unnamed or ambiguous links",manual:"File types and new-window warnings need manual review"}},consistency:{ja:{label:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u30FB\u30E9\u30D9\u30EB\u306E\u4E00\u8CAB\u6027",pass:"\u540D\u524D\u306E\u306A\u3044\u64CD\u4F5C\u8981\u7D20\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u540D\u524D\u306E\u306A\u3044\u30DC\u30BF\u30F3\u30FB\u30D5\u30A9\u30FC\u30E0\u30FB\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",manual:"\u30DA\u30FC\u30B8\u9593\u306E\u9806\u5E8F\u30FB\u8868\u8A18\u30FB\u30A2\u30A4\u30B3\u30F3\u306E\u4E00\u8CAB\u6027\u306F\u8907\u6570\u30DA\u30FC\u30B8\u306E\u6BD4\u8F03\u304C\u5FC5\u8981"},en:{label:"Consistent navigation and labels",pass:"No unnamed controls found",warning:"Unnamed buttons, fields, or navigation",manual:"Cross-page order, wording and icons need comparing across pages"}}},je=t=>!!t.closest('nanairo-accessibility, [aria-hidden="true"], [hidden]');function de(t){if(je(t))return null;const e=getComputedStyle(t);return e.display==="none"||e.visibility==="hidden"||Number(e.opacity)===0?null:e}const H=t=>de(t)!==null;function he(t){const e=t.getAttribute("aria-labelledby");if(e){const i=e.split(/\s+/).map(u=>document.getElementById(u)?.textContent??"").join(" ").trim();if(i)return i}const a=t.getAttribute("aria-label")?.trim();if(a)return a;if(t instanceof HTMLInputElement||t instanceof HTMLSelectElement||t instanceof HTMLTextAreaElement){const i=Array.from(t.labels??[]).map(u=>u.textContent?.trim()??"").filter(Boolean).join(" ");if(i)return i;if(t instanceof HTMLInputElement){if(t.type==="image")return t.alt.trim();if(t.type==="submit"||t.type==="button")return t.value.trim()}}const n=t.querySelector("img[alt]")?.getAttribute("alt")?.trim();return t.textContent?.replace(/\s+/g," ").trim()||n||t.getAttribute("title")?.trim()||""}function Je(t){const e=t.match(/rgba?\((\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)(?:[, /]+(\d+(?:\.\d+)?))?\)/);return e?[Number(e[1]),Number(e[2]),Number(e[3]),e[4]===void 0?1:Number(e[4])]:null}function te([t,e,a]){const n=i=>{const u=i/255;return u<=.03928?u/12.92:((u+.055)/1.055)**2.4};return .2126*n(t)+.7152*n(e)+.0722*n(a)}function Pt(t,e){const a=Math.max(te(t),te(e)),n=Math.min(te(t),te(e));return(a+.05)/(n+.05)}function Ot(t){let e=t;for(;e;){const a=getComputedStyle(e);if(a.backgroundImage!=="none")return null;const n=Je(a.backgroundColor);if(!n)return null;if(n[3]>=.95)return[n[0],n[1],n[2]];e=e.parentElement}return[255,255,255]}const Tt=["\u3053\u3061\u3089","\u3053\u3053","\u8A73\u3057\u304F\u306F\u3053\u3061\u3089","\u8A73\u7D30","more","click here","read more"],Lt=["home","\u30DB\u30FC\u30E0","untitled","\u7121\u984C","new page"],jt="h1, h2, h3, h4, h5, h6, p, li, dt, dd, figcaption, label, a, button, td, th, small, strong";function Jt(){let t=0,e=0;return document.querySelectorAll(jt).forEach(a=>{const n=de(a);if(!n||!a.textContent?.trim())return;const i=Je(n.color),u=Ot(a);if(!i||i[3]<.95||!u){e+=1;return}const r=Number.parseFloat(n.fontSize),o=Number.parseInt(n.fontWeight,10)||(n.fontWeight==="bold"?700:400),s=r>=24||o>=700&&r>=18.66;Pt([i[0],i[1],i[2]],u)<(s?3:4.5)&&(t+=1)}),{failures:t,unmeasurable:e}}function qt(){const t=Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter(H);let e=t.filter(i=>!i.textContent?.trim()).length;const a=t.filter(i=>i.tagName==="H1").length;a!==1&&(e+=Math.abs(1-a));let n=0;return t.forEach(i=>{const u=Number(i.tagName.slice(1));n&&u>n+1&&(e+=1),n=u}),e}function Wt(){const t={cssOrder:0,verySmallText:0,rapidFlash:0,endlessMotion:0};return document.querySelectorAll("body *").forEach(e=>{const a=de(e);if(!a)return;Number(a.order)!==0&&(t.cssOrder+=1),e.children.length===0&&e.textContent?.trim()&&Number.parseFloat(a.fontSize)<10&&(t.verySmallText+=1);const n=a.animationIterationCount.split(",").map(u=>u.trim()),i=a.animationDuration.split(",").map(u=>Number.parseFloat(u));n.forEach((u,r)=>{if(u!=="infinite")return;t.endlessMotion+=1;const o=i[r]??i[0]??0;o>0&&o<.3333333333333333&&(t.rapidFlash+=1)})}),t}function m(t,e,a,n,i="auto"){const u=Rt[t][a],r=i==="alwaysManual"?"manual":n>0?"warning":i==="manualWhenClean"?"manual":"pass";return{id:t,severity:e,status:r,count:n,label:u.label,detail:r==="warning"?u.warning:r==="manual"?u.manual:u.pass,note:r==="manual"?void 0:u.manual}}function Kt(t){const e=Wt(),n=Array.from(document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex], [onclick]')).filter(H),i=n.filter(g=>g.hasAttribute("onclick")&&!g.matches('a[href], button, input, select, textarea, [role="button"], [role="link"]')&&!g.hasAttribute("tabindex")).length,u=n.filter(g=>Number(g.getAttribute("tabindex"))>0).length,r=Array.from(document.querySelectorAll("a[href]")).filter(H),o=new RegExp(`^(${Tt.join("|")})$`,"i"),s=r.filter(g=>{const $e=he(g);return!$e||o.test($e)}).length,d=Array.from(document.querySelectorAll("img")).filter(g=>H(g)&&!g.hasAttribute("alt")).length+document.querySelectorAll('input[type="image"]:not([alt]), area:not([alt])').length,h=document.querySelectorAll('meta[http-equiv="refresh" i], [data-timeout], [data-countdown], [class*="countdown" i], [id*="countdown" i], [class*="timer" i], [id*="timer" i]').length,l=Array.from(document.querySelectorAll("video[autoplay], audio[autoplay]")).filter(g=>!g.muted&&!je(g)).length,A=document.querySelectorAll("marquee, blink").length,b=document.querySelector('meta[name="viewport"]')?.content.toLowerCase()??"",D=/maximum-scale\s*=\s*([\d.]+)/.exec(b),ha=/user-scalable\s*=\s*(no|0)/.test(b)||D!==null&&Number(D[1])<2,Ye=document.title.replace(/\s+/g," ").trim(),pa=new RegExp(`^(${Lt.join("|")})$`,"i"),ga=!Ye||pa.test(Ye)?1:0,ma=document.characterSet.toUpperCase()==="UTF-8"?0:1,fa=Array.from(document.querySelectorAll('button, input:not([type="hidden"]), select, textarea, [role="button"]')).filter(H).filter(g=>!he(g)).length,Ve=Array.from(document.querySelectorAll('nav, [role="navigation"]')).filter(H),Aa=Ve.length>1?Ve.filter(g=>!he(g)).length:0,Xe=Jt();return[m("autoplay","severe",t,l,"manualWhenClean"),m("keyboardTrap","severe",t,0,"alwaysManual"),m("flashing","severe",t,e.rapidFlash+A,"manualWhenClean"),m("autoAdvance","severe",t,e.endlessMotion+A,"manualWhenClean"),m("altText","required",t,d),m("keyboard","required",t,i+u,"manualWhenClean"),m("timeLimits","required",t,h,"manualWhenClean"),m("colorOnly","required",t,0,"alwaysManual"),m("readingOrder","required",t,u+e.cssOrder,"manualWhenClean"),m("headings","required",t,qt()),m("contrast","required",t,Xe.failures,Xe.unmeasurable>0?"manualWhenClean":"auto"),m("textResize","required",t,ha?1:0,"manualWhenClean"),m("charsetFont","required",t,ma+e.verySmallText),m("pageTitle","required",t,ga),m("links","required",t,s),m("consistency","required",t,fa+Aa,"manualWhenClean")]}function Gt(t="ja"){const e=Nt(()=>Kt(t));return{checkedAt:Date.now(),items:e,warningCount:e.filter(a=>a.status==="warning").length,manualCount:e.filter(a=>a.status==="manual").length}}const qe="h1, h2, h3, h4, h5, h6, p, li, dt, dd, blockquote, figcaption, caption, th, td, summary",Zt=220,Qt="\u3002\uFF0E\uFF01\uFF1F!?.",Yt=/[\s"')\]]/;function Vt(t){const e=[];let a=0;for(let n=0;n<t.length;n+=1){const i=t[n],u=i==="\u3002"||i==="\uFF0E"||i==="\uFF01"||i==="\uFF1F",r=(i==="!"||i==="?"||i===".")&&(n+1>=t.length||Yt.test(t[n+1]));if(!u&&!r)continue;let o=n+1;for(;o<t.length&&Qt.includes(t[o]);)o+=1;t[o]===" "&&(o+=1),e.push(t.slice(a,o)),a=o,n=o-1}return a<t.length&&e.push(t.slice(a)),e}function Xt(t,e=Zt){const a=t.replace(/\s+/g," ").trim();if(!a)return[];if(a.length<=e)return[a];const n=[];let i="";const u=()=>{const r=i.trim();r&&n.push(r),i=""};for(const r of Vt(a)){if(r.length>e){u();let o=r;for(;o.length>e;){const s=o.slice(0,e).lastIndexOf(" "),d=s>e*.6?s:e,h=o.slice(0,d).trim();h&&n.push(h),o=o.slice(d)}i=o;continue}(i+r).length>e&&u(),i+=r}return u(),n}function $t(t){return t.hidden||t.closest('[aria-hidden="true"], nanairo-accessibility')||typeof t.checkVisibility=="function"&&!t.checkVisibility()?!1:t.querySelector(qe)===null}function _t(t){const e=[];return t.querySelectorAll(qe).forEach(a=>{$t(a)&&e.push(...Xt(a.textContent??""))}),e}const We="nanairo:a11y:preferences:v1",pe=5,ge=(t="ja")=>({schemaVersion:1,locale:t,textScale:0,comfortableSpacing:!1,highlightLinks:!1,highContrast:!1,colorMode:"default",readableFont:!1,reduceMotion:!1,readingGuide:!1,readingMask:!1,mediaPaused:!1}),ea=t=>t==="default"||t==="dark"||t==="light"||t==="high-contrast"||t==="monochrome"||t==="saturated",x=t=>t===!0,ta=t=>{const e=typeof t=="number"?t:Number(t);return Number.isFinite(e)?Math.min(pe,Math.max(0,Math.round(e))):0};function aa(t){const e=ge(t);let a;try{const i=localStorage.getItem(We);if(!i)return e;const u=JSON.parse(i);if(typeof u!="object"||u===null||Array.isArray(u))return e;a=u}catch{return e}if(a.schemaVersion!==1)return e;const n=ea(a.colorMode)?a.colorMode:x(a.highContrast)?"high-contrast":"default";return{schemaVersion:1,locale:ee(a.locale,t),textScale:ta(a.textScale),comfortableSpacing:x(a.comfortableSpacing),highlightLinks:x(a.highlightLinks),highContrast:n==="high-contrast",colorMode:n,readableFont:x(a.readableFont),reduceMotion:x(a.reduceMotion),readingGuide:x(a.readingGuide),readingMask:x(a.readingMask),mediaPaused:x(a.mediaPaused)}}function na(t){try{localStorage.setItem(We,JSON.stringify(t))}catch{}}const ia="data:image/png;base64,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",ua="data:image/png;base64,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",ra="data:font/woff2;base64,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";var oa=Object.defineProperty,sa=Object.getOwnPropertyDescriptor,v=(t,e,a,n)=>{for(var i=n>1?void 0:n?sa(e,a):e,u=t.length-1,r;u>=0;u--)(r=t[u])&&(i=(n?r(e,a,i):r(i))||i);return n&&i&&oa(e,a,i),i};let la=0;const Ke=[100,112,125,150,175,200],Ge={ja:"\u65E5\u672C\u8A9E",en:"English"},ca=" \xB7 ",da=Ke.map((t,e)=>e);let z;const N=[{value:"default",label:"colorDefault"},{value:"dark",label:"colorDark"},{value:"light",label:"colorLight"},{value:"high-contrast",label:"colorHighContrast"},{value:"monochrome",label:"colorMonochrome"},{value:"saturated",label:"colorSaturated"}],E=t=>{const e={spark:p`<path d="M12 2.75c.62 3.67 2.58 5.63 6.25 6.25-3.67.62-5.63 2.58-6.25 6.25C11.38 11.58 9.42 9.62 5.75 9 9.42 8.38 11.38 6.42 12 2.75Z"></path><path d="M18.4 14.3c.28 1.66 1.17 2.55 2.83 2.83-1.66.28-2.55 1.17-2.83 2.83-.28-1.66-1.17-2.55-2.83-2.83 1.66-.28 2.55-1.17 2.83-2.83Z"></path>`,accessibility:p`<circle cx="12" cy="12" r="9.25"></circle><circle cx="12" cy="7" r="1.35" fill="currentColor" stroke="none"></circle><path d="M6.8 10.2c3.5 1.15 6.9 1.15 10.4 0M12 10.7v4M12 14.7 8.8 19M12 14.7l3.2 4.3"></path>`,close:p`<path d="m7 7 10 10M17 7 7 17"></path>`,minus:p`<path d="M6 12h12"></path>`,plus:p`<path d="M12 6v12M6 12h12"></path>`,type:p`<path d="M5 6h10M10 6v12M7 18h6M16.5 11h3M18 11v7m-2 0h4"></path>`,spacing:p`<path d="M7 4v16M4.5 6.5 7 4l2.5 2.5M4.5 17.5 7 20l2.5-2.5M12 7h8M12 12h8M12 17h8"></path>`,link:p`<path d="m9.5 14.5 5-5M7.8 16.2l-1.2 1.2a3.4 3.4 0 0 1-4.8-4.8l3.1-3.1a3.4 3.4 0 0 1 4.8 0M16.2 7.8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8l-3.1 3.1a3.4 3.4 0 0 1-4.8 0"></path>`,contrast:p`<circle cx="12" cy="12" r="8.5"></circle><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17Z" fill="currentColor" stroke="none"></path>`,font:p`<path d="M4 18 9 5l5 13M6 13h6M14.5 10h5M17 10v8m-2.5 0h5"></path>`,motion:p`<path d="M5 8.5c2.2-4.4 9-5.1 12.3-1.4 3.2 3.5 1.2 9.3-3.3 10.4-3.7.9-7.5-1.6-7.8-5.4M2.8 5.4 5 8.5l3.6-1"></path>`,guide:p`<path d="M3 7h18M3 17h18M6 12h12"></path>`,mask:p`<path d="M4 4h16v16H4zM4 9h16M4 15h16"></path>`,speech:p`<path d="M5 10v4h3l4 3V7L8 10H5ZM15 9.2a4 4 0 0 1 0 5.6M17.5 6.8a7.3 7.3 0 0 1 0 10.4"></path>`,media:p`<rect x="3.5" y="5" width="17" height="14" rx="2.5"></rect><path d="m9 9.2 5 2.8-5 2.8V9.2ZM4 4l16 16"></path>`,audit:p`<path d="M9.5 5H6.8A1.8 1.8 0 0 0 5 6.8v10.4A1.8 1.8 0 0 0 6.8 19h10.4a1.8 1.8 0 0 0 1.8-1.8v-3.1M9 12l2.1 2.1L19 6.2"></path>`,reset:p`<path d="M4.5 8A8 8 0 1 1 4 14M4.5 8V3.5M4.5 8H9"></path>`};return y`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${e[t]}</svg>`};f.NanairoAccessibility=class extends j{constructor(){super(...arguments),this.locale="ja",this.position="right",this.showBranding=!0,this.open=!1,this.preferences=ge(),this.announcement="",this.speaking=!1,this.auditResult=null,this.panelId=`nanairo-a11y-panel-${++la}`,this.initialized=!1,this.speechQueue=[],this.speechSession=0,this.handleDocumentPointerDown=e=>{this.open&&!e.composedPath().includes(this)&&this.closePanel(!1)},this.handlePageHide=()=>{this.stopSpeech(!1)},this.handleKeyDown=e=>{e.key==="Escape"&&this.open&&(e.preventDefault(),this.closePanel(!0))},this.handleColorModeKeyDown=e=>{const a=e.key==="ArrowRight"||e.key==="ArrowDown"?1:e.key==="ArrowLeft"||e.key==="ArrowUp"?-1:void 0;if(a!==void 0){e.preventDefault(),this.moveColorMode(a);return}(e.key==="Home"||e.key==="End")&&(e.preventDefault(),this.moveColorMode(e.key==="Home"?"first":"last"))}}connectedCallback(){if(z&&z!==this&&z.isConnected){console.warn("[nanairo-accessibility] A widget is already active on this page; the duplicate element was removed."),this.remove();return}z=this,super.connectedCallback(),this.initialized||(this.locale=ee(this.getAttribute("locale")),this.preferences=aa(this.locale),this.locale=this.preferences.locale,Le(this.preferences),this.initialized=!0),document.addEventListener("pointerdown",this.handleDocumentPointerDown),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("pagehide",this.handlePageHide)}disconnectedCallback(){z===this&&(z=void 0),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("pagehide",this.handlePageHide),this.stopSpeech(!1),super.disconnectedCallback()}willUpdate(e){if(e.has("locale")){const a=ee(this.locale);a!==this.locale&&(this.locale=a)}e.has("position")&&this.position!=="left"&&this.position!=="right"&&(this.position="right")}t(e){return Ft(this.locale,e)}commit(e){this.preferences=e,this.locale=e.locale,na(e),Le(e),this.dispatchEvent(new CustomEvent("nanairo-change",{detail:e,bubbles:!0,composed:!0}))}async openPanel(){this.open=!0,await this.updateComplete,this.renderRoot.querySelector(".close-button")?.focus()}async showPanel(){await this.openPanel()}async closePanel(e){this.open=!1,await this.updateComplete,e&&this.renderRoot.querySelector(".launcher")?.focus()}selectLocale(e){this.stopSpeech(!1),this.auditResult=null,this.commit({...this.preferences,locale:e})}setScale(e){const a=Math.max(0,Math.min(pe,this.preferences.textScale+e));this.commit({...this.preferences,textScale:a})}async runAudit(){this.auditResult=Gt(this.locale),this.announcement="",await this.updateComplete;const{warningCount:e,manualCount:a}=this.auditResult;this.announcement=`${this.t("auditDone")} ${e}${this.t("auditWarnings")} / ${a}${this.t("auditManuals")}`}renderAuditGroup(e,a){const n=this.auditResult?.items.filter(i=>i.severity===e)??[];return n.length?y`
      <p class="audit-group">${this.t(a)}</p>
      <ul class="audit-results">
        ${n.map(i=>y`
          <li class="status-${i.status}">
            <span class="audit-status" aria-hidden="true">${i.status==="warning"?"!":i.status==="manual"?"?":"\u2713"}</span>
            <span>
              <strong>${i.label}</strong>
              <small>${i.detail}${i.count>0?` (${i.count})`:""}</small>
              ${i.note?y`<small class="audit-note">${i.note}</small>`:c}
            </span>
          </li>
        `)}
      </ul>
    `:c}toggle(e){this.commit({...this.preferences,[e]:!this.preferences[e]})}colorModeButtons(){return Array.from(this.renderRoot.querySelectorAll('.color-mode-grid [role="radio"]'))}async moveColorMode(e){const a=N.findIndex(({value:i})=>i===this.preferences.colorMode),n=e==="first"?0:e==="last"?N.length-1:(Math.max(0,a)+e+N.length)%N.length;this.setColorMode(N[n].value),await this.updateComplete,this.colorModeButtons()[n]?.focus()}setColorMode(e){this.commit({...this.preferences,colorMode:e,highContrast:e==="high-contrast"})}pageSpeechSegments(){const e=document.querySelector("main")??document.body;return e?_t(e):[]}speakNext(e){if(e!==this.speechSession)return;const a=this.speechQueue.shift();if(!a){this.speaking=!1;return}const n=new SpeechSynthesisUtterance(a);n.lang=this.locale==="ja"?"ja-JP":"en-US",n.rate=.92,n.onend=()=>this.speakNext(e),n.onerror=()=>{e===this.speechSession&&(this.speaking=!1)},window.speechSynthesis.speak(n)}toggleSpeech(){if(this.speaking){this.stopSpeech(!0);return}if(!("speechSynthesis"in window)||typeof SpeechSynthesisUtterance>"u"){this.announcement=this.t("speechUnavailable");return}if(this.speechQueue=this.pageSpeechSegments(),!this.speechQueue.length)return;const e=++this.speechSession;this.speaking=!0,this.announcement=this.t("speechStarted"),window.speechSynthesis.cancel(),this.speakNext(e)}stopSpeech(e){!this.speaking&&!this.speechQueue.length||(this.speechSession+=1,this.speechQueue=[],this.speaking=!1,"speechSynthesis"in window&&window.speechSynthesis.cancel(),e&&(this.announcement=this.t("speechStopped")))}reset(){this.stopSpeech(!1),this.auditResult=null,this.commit(ge(this.locale)),this.announcement=this.t("resetDone"),window.setTimeout(()=>{this.announcement=""},1800)}resetPreferences(){this.reset()}destroy(){It(),this.remove()}renderToggle(e,a,n,i){const u=this.preferences[e];return y`
      <button
        class="preference-row ${u?"active":""}"
        type="button"
        aria-pressed=${u}
        @click=${()=>this.toggle(e)}
      >
        <span class="feature-icon">${E(a)}</span>
        <span class="preference-copy">
          <span class="preference-title">${this.t(n)}</span>
          <span class="preference-hint">${this.t(i)}</span>
        </span>
        <span class="switch" aria-hidden="true"><span></span></span>
      </button>
    `}render(){const e=Ke[this.preferences.textScale];return y`
      <button
        class="launcher"
        type="button"
        aria-label=${this.open?this.t("close"):this.t("open")}
        title=${this.open?this.t("close"):this.t("open")}
        aria-expanded=${this.open}
        aria-controls=${this.panelId}
        @click=${()=>this.open?this.closePanel(!1):this.openPanel()}
      >
        <span class="launcher-mark" aria-hidden="true">${E("accessibility")}</span>
        <span class="launcher-label" aria-hidden="true"><span>${this.t("launcherLine1")}</span><span>${this.t("launcherLine2")}</span></span>
        <span class="launcher-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 12h14M14 7l5 5-5 5"></path></svg>
        </span>
      </button>

      <section
        id=${this.panelId}
        class=${this.open?"panel is-open":"panel"}
        role="dialog"
        aria-modal="false"
        aria-labelledby="nanairo-panel-title"
        aria-hidden=${this.open?"false":"true"}
        ?inert=${!this.open}
      >

          <header class="panel-header">
            <div class="brand">
              <span class="brand-mark" aria-hidden="true"><img src=${ia} alt="" /></span>
              <span>
                <strong id="nanairo-panel-title">${this.t("title")}</strong>
                <small>${this.t("subtitle")}</small>
              </span>
            </div>
            <button class="icon-button close-button" type="button" aria-label=${this.t("close")} @click=${()=>this.closePanel(!0)}>
              ${E("close")}
            </button>
          </header>

          <div class="panel-scroll">
            <div class="section-heading">${this.t("appearance")}</div>

            <div class="scale-card">
              <div class="scale-heading">
                <span class="feature-icon">${E("type")}</span>
                <span class="preference-copy">
                  <span class="preference-title">${this.t("textSize")}</span>
                  <span class="preference-hint">${this.t("textSizeHint")}</span>
                </span>
                <output aria-live="polite">${e}%</output>
              </div>
              <div class="stepper">
                <button type="button" aria-label=${this.t("decrease")} ?disabled=${this.preferences.textScale===0} @click=${()=>this.setScale(-1)}>
                  ${E("minus")}
                </button>
                <div class="steps" aria-hidden="true">
                  ${da.map(a=>y`<span class=${a<=this.preferences.textScale?"filled":""}></span>`)}
                </div>
                <button type="button" aria-label=${this.t("increase")} ?disabled=${this.preferences.textScale===pe} @click=${()=>this.setScale(1)}>
                  ${E("plus")}
                </button>
              </div>
            </div>

            <div class="preference-group">
              ${this.renderToggle("comfortableSpacing","spacing","spacing","spacingHint")}
              ${this.renderToggle("highlightLinks","link","highlightLinks","highlightLinksHint")}
              ${this.renderToggle("readableFont","font","readableFont","readableFontHint")}
              ${this.renderToggle("reduceMotion","motion","reduceMotion","reduceMotionHint")}
            </div>

            <div class="color-heading">
              <span>${this.t("colorModes")}</span>
              <small>${this.t("colorModeHint")}</small>
            </div>
            <div
              class="color-mode-grid"
              role="radiogroup"
              aria-label=${this.t("colorModes")}
              @keydown=${this.handleColorModeKeyDown}
            >
              ${N.map(({value:a,label:n})=>y`
                <button
                  class="color-mode ${this.preferences.colorMode===a?"active":""}"
                  type="button"
                  role="radio"
                  aria-checked=${this.preferences.colorMode===a}
                  tabindex=${this.preferences.colorMode===a?0:-1}
                  @click=${()=>this.setColorMode(a)}
                >
                  <span class="color-swatch swatch-${a}" aria-hidden="true"><span></span></span>
                  <span>${this.t(n)}</span>
                </button>
              `)}
            </div>

            <div class="section-heading">${this.t("focus")}</div>
            <div class="preference-group">
              ${this.renderToggle("readingGuide","guide","readingGuide","readingGuideHint")}
              ${this.renderToggle("readingMask","mask","readingMask","readingMaskHint")}
            </div>

            <div class="section-heading">${this.t("audioMedia")}</div>
            <div class="preference-group">
              <button
                class="preference-row ${this.speaking?"active":""}"
                type="button"
                aria-pressed=${this.speaking}
                @click=${this.toggleSpeech}
              >
                <span class="feature-icon">${E("speech")}</span>
                <span class="preference-copy">
                  <span class="preference-title">${this.t("speech")}</span>
                  <span class="preference-hint">${this.t(this.speaking?"speechStopHint":"speechHint")}</span>
                </span>
                <span class="switch" aria-hidden="true"><span></span></span>
              </button>
              ${this.renderToggle("mediaPaused","media","mediaPaused","mediaPausedHint")}
            </div>

            <div class="section-heading">${this.t("auditSection")}</div>
            <div class="audit-card">
              <div class="audit-heading">
                <span class="feature-icon">${E("audit")}</span>
                <span class="preference-copy">
                  <span class="preference-title">${this.t("auditTitle")}</span>
                  <span class="preference-hint">${this.t("auditHint")}</span>
                </span>
              </div>
              <button class="audit-button" type="button" @click=${this.runAudit}>${E("audit")}<span>${this.t("auditRun")}</span></button>
              ${this.auditResult?y`
                <div class="audit-summary">
                  <strong>${this.t("auditDone")}</strong>
                  <span>${this.auditResult.warningCount}${this.t("auditWarnings")}${ca}${this.auditResult.manualCount}${this.t("auditManuals")}</span>
                </div>
                ${this.renderAuditGroup("severe","auditSevere")}
                ${this.renderAuditGroup("required","auditRequired")}
                <p class="audit-disclaimer">${this.t("auditDisclaimer")}</p>
              `:c}
            </div>

            <p class="note">${this.t("note")}</p>

            <div class="language-field">
              <label for="${this.panelId}-language">${this.t("language")}</label>
              <select
                id="${this.panelId}-language"
                .value=${this.locale}
                @change=${a=>this.selectLocale(a.target.value)}
              >
                <option value="ja">${Ge.ja}</option>
                <option value="en">${Ge.en}</option>
              </select>
            </div>
          </div>

          <footer class="panel-footer">
            <button class="reset-button" type="button" @click=${this.reset}>${E("reset")}<span>${this.t("reset")}</span></button>
            ${this.showBranding?y`
              <span class="footer-brand">
                <span class="powered-by">Powered by</span>
                <img src=${ua} alt="NANAiRO" />
              </span>
            `:c}
          </footer>
          <span class="sr-only" aria-live="polite">${this.announcement||c}</span>
      </section>
    `}},f.NanairoAccessibility.styles=_e`
    @font-face {
      font-family: "Reenie Beanie";
      src: url(${be(ra)}) format("woff2");
      font-style: normal;
      font-weight: 400;
      font-display: swap;
    }

    :host {
      --accent: #397579;
      --accent-hover: #285c60;
      --ink: #222936;
      --muted: #606975;
      --line: #e8ebeb;
      --soft: #f5f7f7;
      --radius: 24px;
      --drawer-width: min(420px, calc(100vw - 46px));
      position: fixed;
      z-index: 2147483646;
      right: 0;
      top: 0;
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Yu Gothic", "Segoe UI", sans-serif;
      font-size: 16px;
      line-height: 1.4;
      letter-spacing: 0;
      color-scheme: light;
      -webkit-font-smoothing: antialiased;
    }

    :host([position="left"]) { right: auto; left: 0; }
    *, *::before, *::after { box-sizing: border-box; }
    button { font: inherit; }
    svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

    .launcher {
      position: fixed;
      z-index: 2;
      right: 0;
      top: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 122px;
      min-height: 58px;
      padding: 9px 12px 9px 10px;
      overflow: hidden;
      cursor: pointer;
      color: white;
      border: 1px solid var(--accent);
      border-right: 0;
      border-radius: 13px 0 0 13px;
      background: var(--accent);
      box-shadow: 0 4px 16px rgba(34,41,54,.12);
      transform: translateY(-50%);
      transition: right .48s cubic-bezier(.22,.8,.2,1), left .48s cubic-bezier(.22,.8,.2,1), width .42s cubic-bezier(.22,.8,.2,1), min-height .42s cubic-bezier(.22,.8,.2,1), padding .42s ease, border-radius .42s ease, box-shadow .42s ease, filter .28s ease;
      animation: launcher-invite 1.8s ease-out 1s 2;
    }

    :host([position="left"]) .launcher { right: auto; left: 0; border-right: 1px solid var(--accent); border-left: 0; border-radius: 0 13px 13px 0; }
    :host([position="left"]) .launcher { animation-name: launcher-invite-left; }
    .launcher:hover { width: 130px; background: var(--accent-hover); }
    .launcher:active { transform: translateY(-50%) scale(.97); }
    .launcher:focus-visible, button:focus-visible, select:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
    .launcher:focus-visible { outline-offset: -4px; outline-color: #fff; }
    .preference-row:focus-visible { outline-offset: -4px; }
    .launcher-mark { position: relative; width: 36px; height: 36px; display: grid; place-items: center; flex: none; color: var(--accent); border-radius: 50%; background: #fff; transition: opacity .18s ease, transform .28s ease; }
    .launcher-mark svg { width: 23px; height: 23px; stroke-width: 1.8; }
    .launcher-label { display: grid; justify-items: start; gap: 1px; font-size: 12px; font-weight: 800; letter-spacing: .05em; line-height: 1.08; text-align: left; writing-mode: horizontal-tb; transition: opacity .18s ease, transform .28s ease; }
    .launcher-arrow { position: absolute; inset: 0; display: grid; place-items: center; opacity: 0; transform: scale(.82); transition: opacity .22s ease .12s, transform .36s cubic-bezier(.22,.8,.2,1) .08s; }
    .launcher-arrow svg { width: 24px; height: 24px; stroke-width: 1.7; }
    .launcher[aria-expanded="true"] { right: var(--drawer-width); width: 46px; min-height: 62px; padding: 0; border-radius: 12px 0 0 12px; animation: none; }
    .launcher[aria-expanded="true"]:hover { width: 46px; }
    .launcher[aria-expanded="true"]:active { transform: translateY(-50%) scale(.97); }
    .launcher[aria-expanded="true"] .launcher-mark,
    .launcher[aria-expanded="true"] .launcher-label { opacity: 0; transform: scale(.84); }
    .launcher[aria-expanded="true"] .launcher-arrow { opacity: 1; transform: scale(1); }
    :host([position="left"]) .launcher[aria-expanded="true"] { right: auto; left: var(--drawer-width); border-radius: 0 14px 14px 0; }
    :host([position="left"]) .launcher[aria-expanded="true"] .launcher-arrow { transform: scaleX(-1); }

    .panel {
      position: fixed;
      right: 0;
      top: 0;
      bottom: 0;
      width: var(--drawer-width);
      height: 100dvh;
      max-height: none;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      overflow: hidden;
      isolation: isolate;
      border: 1px solid var(--line);
      border-radius: var(--radius) 0 0 var(--radius);
      background: #fff;
      box-shadow: -12px 0 40px rgba(34,41,54,.1);
      transform-origin: center right;
      visibility: hidden;
      pointer-events: none;
      opacity: 0;
      transform: translateX(100%);
      transition: transform .48s cubic-bezier(.22,.8,.2,1), opacity .34s ease, visibility 0s linear .48s;
    }

    .panel.is-open { visibility: visible; pointer-events: auto; opacity: 1; transform: translateX(0); transition-delay: 0s; }
    :host([position="left"]) .panel { right: auto; left: 0; border-radius: 0 var(--radius) var(--radius) 0; transform: translateX(-100%); }
    :host([position="left"]) .panel.is-open { transform: translateX(0); }

    .panel-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 20px; border-bottom: 1px solid var(--line); }
    .brand { min-width: 0; display: flex; align-items: center; gap: 12px; }
    .brand > span:last-child { min-width: 0; }
    .brand-mark, .feature-icon { display: grid; place-items: center; flex: none; }
    .brand-mark { width: 44px; height: 44px; padding: 5px; }
    .brand-mark img { display: block; width: 100%; height: 100%; object-fit: contain; }
    .brand strong, .brand small { display: block; }
    .brand strong { font-size: 18px; line-height: 1.25; letter-spacing: -.02em; }
    .brand small { margin-top: 4px; color: var(--muted); font-size: 12px; line-height: 1.5; overflow-wrap: anywhere; }

    .icon-button { display: grid; place-items: center; width: 44px; height: 44px; padding: 0; flex: none; cursor: pointer; color: var(--ink); border: 1px solid var(--line); border-radius: 50%; background: #fff; }
    .icon-button:hover { background: var(--soft); border-color: var(--accent); }
    .icon-button svg { width: 20px; height: 20px; }

    .panel-scroll { min-height: 0; overflow-y: auto; padding: 16px 16px 12px; scrollbar-width: thin; scrollbar-color: rgba(90,107,137,.25) transparent; }
    .language-field { display: grid; grid-template-columns: 1fr minmax(132px, auto); align-items: center; gap: 14px; margin: 20px 0 4px; padding: 14px; border: 1px solid var(--line); border-radius: var(--radius); background: #fff; }
    .language-field label { color: var(--ink); font-size: 12px; font-weight: 700; }
    .language-field select { min-height: 44px; max-width: 100%; padding: 7px 28px 7px 12px; cursor: pointer; color: var(--ink); border: 1px solid var(--line); border-radius: 9999px; background: var(--soft); font: inherit; font-size: 13px; font-weight: 700; }

    .section-heading { margin: 0 4px 10px; color: var(--muted); font-size: 12px; font-weight: 700; letter-spacing: .06em; }
    .scale-card, .preference-group { border: 1px solid var(--line); border-radius: var(--radius); background: #fff; }
    .scale-card { padding: 15px; margin-bottom: 10px; }
    .scale-heading { display: flex; align-items: center; gap: 11px; }
    .feature-icon { width: 38px; height: 38px; color: var(--accent); border-radius: 50%; background: var(--soft); }
    .feature-icon svg { width: 21px; height: 21px; }
    .preference-copy { min-width: 0; display: block; flex: 1; text-align: left; }
    .preference-title, .preference-hint { display: block; }
    .preference-title { color: var(--ink); font-size: 14px; font-weight: 700; letter-spacing: -.01em; }
    .preference-hint { margin-top: 4px; color: var(--muted); font-size: 12px; line-height: 1.6; overflow-wrap: anywhere; }
    output { color: var(--accent); font-size: 13px; font-weight: 750; font-variant-numeric: tabular-nums; }

    .stepper { display: grid; grid-template-columns: 44px 1fr 44px; align-items: center; gap: 12px; margin-top: 14px; }
    .stepper button { display: grid; place-items: center; width: 44px; height: 44px; padding: 0; cursor: pointer; color: var(--accent); border: 1px solid var(--line); border-radius: 50%; background: var(--soft); }
    .stepper button:hover:not(:disabled) { background: white; transform: translateY(-1px); }
    .stepper button:disabled { cursor: not-allowed; opacity: .34; }
    .stepper button svg { width: 18px; height: 18px; }
    .steps { display: flex; align-items: center; gap: 5px; }
    .steps span { height: 6px; flex: 1; border-radius: 99px; background: rgba(92,111,146,.14); transition: background .22s ease, transform .22s ease; }
    .steps span.filled { background: var(--accent); transform: scaleY(1.15); }

    .preference-group { overflow: hidden; margin-bottom: 18px; }
    .preference-row { width: 100%; min-height: 76px; display: flex; align-items: center; gap: 11px; padding: 14px; cursor: pointer; color: inherit; border: 0; border-bottom: 1px solid var(--line); background: transparent; }
    .preference-row:last-child { border-bottom: 0; }
    .preference-row:hover { background: var(--soft); }
    .preference-row.active .feature-icon { color: white; background: var(--accent); }
    .switch { width: 43px; height: 25px; padding: 3px; flex: none; border-radius: 99px; background: rgba(100,113,139,.2); box-shadow: inset 0 1px 2px rgba(43,57,82,.1); transition: background .24s ease; }
    .switch span { display: block; width: 19px; height: 19px; border-radius: 50%; background: white; box-shadow: 0 2px 5px rgba(31,43,69,.22); transition: transform .28s cubic-bezier(.2,.8,.2,1); }
    .preference-row.active .switch { background: var(--accent); }
    .preference-row.active .switch span { transform: translateX(18px); }

    .color-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin: 0 4px 10px; color: var(--muted); font-size: 12px; font-weight: 700; letter-spacing: .06em; }
    .color-heading small { font-size: 11px; font-weight: 550; letter-spacing: 0; }
    .color-mode-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; margin-bottom: 18px; }
    .color-mode { min-width: 0; min-height: 64px; display: grid; grid-template-columns: 22px minmax(0, 1fr); align-items: center; gap: 7px; padding: 8px; cursor: pointer; color: var(--ink); border: 1px solid var(--line); border-radius: 16px; background: #fff; font-size: 11px; font-weight: 700; line-height: 1.5; text-align: left; transition: border-color .2s ease, background .2s ease; }
    .color-mode:hover { border-color: var(--accent); background: var(--soft); }
    .color-mode.active { color: var(--accent-hover); border-color: var(--accent); background: #edf4f3; box-shadow: inset 0 0 0 1px var(--accent); }
    .color-swatch { width: 22px; height: 22px; display: block; padding: 3px; border: 1px solid rgba(38,53,51,.17); border-radius: 50%; background: #fff; box-shadow: 0 2px 5px rgba(31,43,69,.1); }
    .color-swatch span { display: block; width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #9dcc47, #21aaa0); }
    .swatch-dark { background: #181b1a; border-color: #181b1a; }
    .swatch-dark span { background: #a2e6cc; }
    .swatch-light span { background: #fff; border: 1px solid #737a78; }
    .swatch-high-contrast { background: #000; border-color: #000; }
    .swatch-high-contrast span { background: linear-gradient(90deg, #fff 50%, #000 50%); border: 1px solid #fff; }
    .swatch-monochrome span { background: linear-gradient(135deg, #111, #b7b7b7); }
    .swatch-saturated span { background: conic-gradient(#ff365f, #ffd600, #13bd68, #1c91ff, #9f45ff, #ff365f); }

    .note { margin: 2px 6px 6px; color: var(--muted); font-size: 12px; line-height: 1.7; }
    .audit-card { margin-bottom: 18px; padding: 15px; border: 1px solid var(--line); border-radius: var(--radius); background: #fff; }
    .audit-heading { display: flex; align-items: center; gap: 11px; }
    .audit-button { width: 100%; min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; margin-top: 14px; padding: 10px 16px; cursor: pointer; color: #fff; border: 1px solid var(--accent); border-radius: 9999px; background: var(--accent); font-size: 13px; font-weight: 700; }
    .audit-button:hover { background: var(--accent-hover); }
    .audit-button svg { width: 18px; height: 18px; }
    .audit-summary { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 10px; margin-top: 14px; padding: 10px 12px; border-radius: 14px; color: var(--ink); background: var(--soft); font-size: 11px; }
    .audit-summary strong { font-size: 12px; }
    .audit-group { margin: 14px 0 0; color: var(--muted); font-size: 10px; font-weight: 700; letter-spacing: .02em; }
    .audit-results { display: grid; gap: 7px; margin: 7px 0 0; padding: 0; list-style: none; }
    .audit-results li { display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 8px; align-items: start; padding: 9px; border: 1px solid var(--line); border-radius: 12px; }
    .audit-results strong, .audit-results small { display: block; }
    .audit-results strong { color: var(--ink); font-size: 11px; line-height: 1.5; }
    .audit-results small { margin-top: 2px; color: var(--muted); font-size: 10px; line-height: 1.55; }
    .audit-note { font-style: italic; }
    .audit-status { width: 22px; height: 22px; display: grid; place-items: center; border-radius: 50%; color: #fff; background: #568477; font-size: 11px; font-weight: 800; }
    .status-warning .audit-status { background: #9a5b36; }
    .status-manual .audit-status { color: #4f5b58; background: #dce4e1; }
    .audit-disclaimer { margin: 10px 2px 0; color: var(--muted); font-size: 10px; line-height: 1.6; }
    .panel-footer { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; padding: 16px; border-top: 1px solid var(--line); background: #fff; }
    .reset-button { display: inline-flex; align-items: center; gap: 7px; min-height: 44px; padding: 9px 14px; cursor: pointer; color: var(--ink); border: 1px solid var(--line); border-radius: 9999px; background: #fff; font-size: 12px; font-weight: 650; }
    .reset-button:hover { color: var(--accent-hover); border-color: var(--accent); background: var(--soft); }
    .reset-button svg { width: 17px; height: 17px; }
    .footer-brand { display: inline-flex; align-items: center; gap: 7px; color: var(--muted); white-space: nowrap; }
    .powered-by { color: #6b7280; font-family: "Reenie Beanie", cursive; font-size: 18px; font-weight: 400; letter-spacing: normal; line-height: 1; }
    .footer-brand img { width: 72px; height: auto; object-fit: contain; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

    @keyframes launcher-invite {
      0%, 100% { transform: translate(0, -50%); }
      45% { transform: translate(-4px, -50%); }
    }

    @keyframes launcher-invite-left {
      0%, 100% { transform: translate(0, -50%); }
      45% { transform: translate(4px, -50%); }
    }

    @media (max-width: 520px) {
      :host { --drawer-width: 100vw; }
      .launcher { width: 108px; min-height: 51px; gap: 8px; padding: 7px 10px 7px 8px; border-radius: 10px 0 0 10px; }
      :host([position="left"]) .launcher { border-radius: 0 11px 11px 0; }
      .launcher:hover { width: 114px; }
      .launcher-mark { width: 32px; height: 32px; }
      .launcher-mark svg { width: 20px; height: 20px; }
      .launcher-label { font-size: 11px; }
      .launcher[aria-expanded="true"] { display: none; }
      .panel,
      :host([position="left"]) .panel {
        width: 100vw;
        max-width: 100vw;
        border-right: 0;
        border-left: 0;
        border-radius: 0;
      }
      .color-heading { flex-wrap: wrap; gap: 4px 12px; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .001ms !important; transition-duration: .001ms !important; }
    }

    @media (prefers-contrast: more) {
      .panel { border: 2px solid #182233; background: #fff; box-shadow: 0 14px 40px rgba(0,0,0,.25); backdrop-filter: none; }
      .scale-card, .preference-group { border-color: #677386; background: #fff; }
      .preference-hint, .note, .brand small { color: #4b5565; }
    }

    @media (prefers-reduced-transparency: reduce) {
      .panel, .launcher { backdrop-filter: none; -webkit-backdrop-filter: none; }
      .panel { background: #fff; }
    }
  `,v([_({type:String,reflect:!0})],f.NanairoAccessibility.prototype,"locale",2),v([_({type:String,reflect:!0})],f.NanairoAccessibility.prototype,"position",2),v([_({type:Boolean,attribute:"show-branding"})],f.NanairoAccessibility.prototype,"showBranding",2),v([J()],f.NanairoAccessibility.prototype,"open",2),v([J()],f.NanairoAccessibility.prototype,"preferences",2),v([J()],f.NanairoAccessibility.prototype,"announcement",2),v([J()],f.NanairoAccessibility.prototype,"speaking",2),v([J()],f.NanairoAccessibility.prototype,"auditResult",2),f.NanairoAccessibility=v([Et("nanairo-accessibility")],f.NanairoAccessibility);const Ze=t=>({locale:t.locale==="en"?"en":"ja",position:t.position==="left"?"left":"right",showBranding:t.showBranding!==!1&&t.showBranding!=="false"});function me(t={}){const e=document.querySelector("nanairo-accessibility");if(e)return e;const a=document.createElement("nanairo-accessibility");a.setAttribute("locale",t.locale==="en"?"en":"ja"),a.setAttribute("position",t.position==="left"?"left":"right"),a.showBranding=t.showBranding??!0;const n=()=>{document.body.append(a)};return document.body?n():document.addEventListener("DOMContentLoaded",n,{once:!0}),a}const Qe=document.querySelector("script[data-nanairo-auto]");if(Qe)me(Ze(Qe.dataset));else{const t=window.nanairoAccessibilitySettings;t&&typeof t=="object"&&me(Ze(t))}return f.init=me,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}),f})({});
