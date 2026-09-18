var NanairoAccessibility=(function(m){"use strict";const q=globalThis,te=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol(),ge=new WeakMap;let fe=class{constructor(e,a,n){if(this._$cssResult$=!0,n!==ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(te&&e===void 0){const n=a!==void 0&&a.length===1;n&&(e=ge.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ge.set(a,e))}return e}toString(){return this.cssText}};const Ye=t=>new fe(typeof t=="string"?t:t+"",void 0,ae),We=(t,...e)=>{const a=t.length===1?t[0]:e.reduce((n,i,u)=>n+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[u+1],t[0]);return new fe(a,t,ae)},Xe=(t,e)=>{if(te)t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const n=document.createElement("style"),i=q.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=a.cssText,t.appendChild(n)}},me=te?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(const n of e.cssRules)a+=n.cssText;return Ye(a)})(t):t;const{is:Ve,defineProperty:Ze,getOwnPropertyDescriptor:et,getOwnPropertyNames:tt,getOwnPropertySymbols:at,getPrototypeOf:nt}=Object,G=globalThis,Ae=G.trustedTypes,it=Ae?Ae.emptyScript:"",ut=G.reactiveElementPolyfillSupport,H=(t,e)=>t,K={toAttribute(t,e){switch(e){case Boolean:t=t?it:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},ne=(t,e)=>!Ve(t,e),be={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:ne};Symbol.metadata??=Symbol("metadata"),G.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=be){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,a);i!==void 0&&Ze(this.prototype,e,i)}}static getPropertyDescriptor(e,a,n){const{get:i,set:u}=et(this.prototype,e)??{get(){return this[a]},set(r){this[a]=r}};return{get:i,set(r){const o=i?.call(this);u?.call(this,r),this.requestUpdate(e,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??be}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;const e=nt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){const a=this.properties,n=[...tt(a),...at(a)];for(const i of n)this.createProperty(i,a[i])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[n,i]of a)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[a,n]of this.elementProperties){const i=this._$Eu(a,n);i!==void 0&&this._$Eh.set(i,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)a.unshift(me(i))}else e!==void 0&&a.push(me(e));return a}static _$Eu(e,a){const n=a.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const n of a.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,a,n){this._$AK(e,n)}_$ET(e,a){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const u=(n.converter?.toAttribute!==void 0?n.converter:K).toAttribute(a,n.type);this._$Em=e,u==null?this.removeAttribute(i):this.setAttribute(i,u),this._$Em=null}}_$AK(e,a){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const u=n.getPropertyOptions(i),r=typeof u.converter=="function"?{fromAttribute:u.converter}:u.converter?.fromAttribute!==void 0?u.converter:K;this._$Em=i;const o=r.fromAttribute(a,u.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,a,n,i=!1,u){if(e!==void 0){const r=this.constructor;if(i===!1&&(u=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??ne)(u,a)||n.useDefault&&n.reflect&&u===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,a,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:n,reflect:i,wrapped:u},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??a??this[e]),u!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(a=void 0),this._$AL.set(e,a)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,u]of this._$Ep)this[i]=u;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,u]of n){const{wrapped:r}=u,o=this[i];r!==!0||this._$AL.has(i)||o===void 0||this.C(i,void 0,u,o)}}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(a)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(a)}willUpdate(e){}_$AE(e){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[H("elementProperties")]=new Map,k[H("finalized")]=new Map,ut?.({ReactiveElement:k}),(G.reactiveElementVersions??=[]).push("2.1.2");const ie=globalThis,ye=t=>t,J=ie.trustedTypes,Ee=J?J.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ce="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,ve="?"+v,rt=`<${ve}>`,w=document,T=()=>w.createComment(""),U=t=>t===null||typeof t!="object"&&typeof t!="function",ue=Array.isArray,ot=t=>ue(t)||typeof t?.[Symbol.iterator]=="function",re=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,we=/>/g,F=RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fe=/'/g,Be=/"/g,De=/^(?:script|style|textarea|title)$/i,ke=t=>(e,...a)=>({_$litType$:t,strings:e,values:a}),y=ke(1),p=ke(2),$=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),$e=new WeakMap,B=w.createTreeWalker(w,129);function Se(t,e){if(!ue(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(e):e}const st=(t,e)=>{const a=t.length-1,n=[];let i,u=e===2?"<svg>":e===3?"<math>":"",r=z;for(let o=0;o<a;o++){const s=t[o];let d,h,l=-1,A=0;for(;A<s.length&&(r.lastIndex=A,h=r.exec(s),h!==null);)A=r.lastIndex,r===z?h[1]==="!--"?r=xe:h[1]!==void 0?r=we:h[2]!==void 0?(De.test(h[2])&&(i=RegExp("</"+h[2],"g")),r=F):h[3]!==void 0&&(r=F):r===F?h[0]===">"?(r=i??z,l=-1):h[1]===void 0?l=-2:(l=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?F:h[3]==='"'?Be:Fe):r===Be||r===Fe?r=F:r===xe||r===we?r=z:(r=F,i=void 0);const b=r===F&&t[o+1].startsWith("/>")?" ":"";u+=r===z?s+rt:l>=0?(n.push(d),s.slice(0,l)+Ce+s.slice(l)+v+b):s+v+(l===-2?o:b)}return[Se(t,u+(t[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class I{constructor({strings:e,_$litType$:a},n){let i;this.parts=[];let u=0,r=0;const o=e.length-1,s=this.parts,[d,h]=st(e,a);if(this.el=I.createElement(d,n),B.currentNode=this.el.content,a===2||a===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=B.nextNode())!==null&&s.length<o;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(Ce)){const A=h[r++],b=i.getAttribute(l).split(v),D=/([.?@])?(.*)/.exec(A);s.push({type:1,index:u,name:D[2],strings:b,ctor:D[1]==="."?ct:D[1]==="?"?dt:D[1]==="@"?ht:Y}),i.removeAttribute(l)}else l.startsWith(v)&&(s.push({type:6,index:u}),i.removeAttribute(l));if(De.test(i.tagName)){const l=i.textContent.split(v),A=l.length-1;if(A>0){i.textContent=J?J.emptyScript:"";for(let b=0;b<A;b++)i.append(l[b],T()),B.nextNode(),s.push({type:2,index:++u});i.append(l[A],T())}}}else if(i.nodeType===8)if(i.data===ve)s.push({type:2,index:u});else{let l=-1;for(;(l=i.data.indexOf(v,l+1))!==-1;)s.push({type:7,index:u}),l+=v.length-1}u++}}static createElement(e,a){const n=w.createElement("template");return n.innerHTML=e,n}}function S(t,e,a=t,n){if(e===$)return e;let i=n!==void 0?a._$Co?.[n]:a._$Cl;const u=U(e)?void 0:e._$litDirective$;return i?.constructor!==u&&(i?._$AO?.(!1),u===void 0?i=void 0:(i=new u(t),i._$AT(t,a,n)),n!==void 0?(a._$Co??=[])[n]=i:a._$Cl=i),i!==void 0&&(e=S(t,i._$AS(t,e.values),i,n)),e}class lt{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:a},parts:n}=this._$AD,i=(e?.creationScope??w).importNode(a,!0);B.currentNode=i;let u=B.nextNode(),r=0,o=0,s=n[0];for(;s!==void 0;){if(r===s.index){let d;s.type===2?d=new R(u,u.nextSibling,this,e):s.type===1?d=new s.ctor(u,s.name,s.strings,this,e):s.type===6&&(d=new pt(u,this,e)),this._$AV.push(d),s=n[++o]}r!==s?.index&&(u=B.nextNode(),r++)}return B.currentNode=w,i}p(e){let a=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,a),a+=n.strings.length-2):n._$AI(e[a])),a++}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,a,n,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&e?.nodeType===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=S(this,e,a),U(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==$&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ot(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){const{values:a,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=I.createElement(Se(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(a);else{const u=new lt(i,this),r=u.u(this.options);u.p(a),this.T(r),this._$AH=u}}_$AC(e){let a=$e.get(e.strings);return a===void 0&&$e.set(e.strings,a=new I(e)),a}k(e){ue(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let n,i=0;for(const u of e)i===a.length?a.push(n=new R(this.O(T()),this.O(T()),this,this.options)):n=a[i],n._$AI(u),i++;i<a.length&&(this._$AR(n&&n._$AB.nextSibling,i),a.length=i)}_$AR(e=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);e!==this._$AB;){const n=ye(e).nextSibling;ye(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,n,i,u){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=a,this._$AM=i,this.options=u,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=c}_$AI(e,a=this,n,i){const u=this.strings;let r=!1;if(u===void 0)e=S(this,e,a,0),r=!U(e)||e!==this._$AH&&e!==$,r&&(this._$AH=e);else{const o=e;let s,d;for(e=u[0],s=0;s<u.length-1;s++)d=S(this,o[n+s],a,s),d===$&&(d=this._$AH[s]),r||=!U(d)||d!==this._$AH[s],d===c?e=c:e!==c&&(e+=(d??"")+u[s+1]),this._$AH[s]=d}r&&!i&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ct extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class dt extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class ht extends Y{constructor(e,a,n,i,u){super(e,a,n,i,u),this.type=5}_$AI(e,a=this){if((e=S(this,e,a,0)??c)===$)return;const n=this._$AH,i=e===c&&n!==c||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,u=e!==c&&(n===c||i);i&&this.element.removeEventListener(this.name,this,n),u&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class pt{constructor(e,a,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const gt=ie.litHtmlPolyfillSupport;gt?.(I,R),(ie.litHtmlVersions??=[]).push("3.3.3");const ft=(t,e,a)=>{const n=a?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const u=a?.renderBefore??null;n._$litPart$=i=new R(e.insertBefore(T(),u),u,void 0,a??{})}return i._$AI(t),i};const oe=globalThis;class L extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ft(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $}}L._$litElement$=!0,L.finalized=!0,oe.litElementHydrateSupport?.({LitElement:L});const mt=oe.litElementPolyfillSupport;mt?.({LitElement:L}),(oe.litElementVersions??=[]).push("4.2.2");const At=t=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const bt={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:ne},yt=(t=bt,e,a)=>{const{kind:n,metadata:i}=a;let u=globalThis.litPropertyMetadata.get(i);if(u===void 0&&globalThis.litPropertyMetadata.set(i,u=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),u.set(a.name,t),n==="accessor"){const{name:r}=a;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(r,s,t,!0,o)},init(o){return o!==void 0&&this.C(r,void 0,t,o),o}}}if(n==="setter"){const{name:r}=a;return function(o){const s=this[r];e.call(this,o),this.requestUpdate(r,s,t,!0,o)}}throw Error("Unsupported decorator location: "+n)};function W(t){return(e,a)=>typeof a=="object"?yt(t,e,a):((n,i,u)=>{const r=i.hasOwnProperty(u);return i.constructor.createProperty(u,n),r?Object.getOwnPropertyDescriptor(i,u):void 0})(t,e,a)}function O(t){return W({...t,state:!0,attribute:!1})}const Et={ja:{open:"\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3\u8A2D\u5B9A\u3092\u958B\u304F",close:"\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3\u8A2D\u5B9A\u3092\u9589\u3058\u308B",title:"\u8868\u793A\u30B5\u30DD\u30FC\u30C8",launcherLine1:"\u8868\u793A",launcherLine2:"\u30B5\u30DD\u30FC\u30C8",subtitle:"\u898B\u3084\u3059\u3055\u3092\u3001\u3042\u306A\u305F\u597D\u307F\u306B\u3002",language:"\u8868\u793A\u8A00\u8A9E",appearance:"\u6587\u5B57\u3068\u8868\u793A",colorModes:"\u30AB\u30E9\u30FC\u30E2\u30FC\u30C9",colorModeHint:"\u898B\u3084\u3059\u3044\u914D\u8272\u30921\u3064\u9078\u3079\u307E\u3059",colorDefault:"\u6A19\u6E96",colorDark:"\u30C0\u30FC\u30AF",colorLight:"\u30E9\u30A4\u30C8",colorHighContrast:"\u9AD8\u30B3\u30F3\u30C8\u30E9\u30B9\u30C8",colorMonochrome:"\u30E2\u30CE\u30AF\u30ED",colorSaturated:"\u9BAE\u3084\u304B",focus:"\u96C6\u4E2D\u30B5\u30DD\u30FC\u30C8",textSize:"\u6587\u5B57\u30B5\u30A4\u30BA",textSizeHint:"\u30DA\u30FC\u30B8\u306E\u6587\u5B57\u3092\u62E1\u5927\u3057\u307E\u3059",decrease:"\u6587\u5B57\u3092\u5C0F\u3055\u304F\u3059\u308B",increase:"\u6587\u5B57\u3092\u5927\u304D\u304F\u3059\u308B",spacing:"\u3086\u3063\u305F\u308A\u8868\u793A",spacingHint:"\u884C\u9593\u3068\u6587\u5B57\u9593\u3092\u5E83\u3052\u307E\u3059",highlightLinks:"\u30EA\u30F3\u30AF\u3092\u5F37\u8ABF",highlightLinksHint:"\u30EA\u30F3\u30AF\u306B\u4E0B\u7DDA\u3068\u80CC\u666F\u8272\u3092\u52A0\u3048\u307E\u3059",highContrast:"\u9AD8\u30B3\u30F3\u30C8\u30E9\u30B9\u30C8",highContrastHint:"\u767D\u3068\u9ED2\u3092\u57FA\u8ABF\u306B\u60C5\u5831\u3092\u304F\u3063\u304D\u308A\u8868\u793A\u3057\u307E\u3059",readableFont:"\u8AAD\u307F\u3084\u3059\u3044\u30D5\u30A9\u30F3\u30C8",readableFontHint:"\u6587\u5B57\u306E\u5F62\u3092\u5224\u5225\u3057\u3084\u3059\u3044\u66F8\u4F53\u306B\u5207\u308A\u66FF\u3048\u307E\u3059",reduceMotion:"\u52D5\u304D\u3092\u6E1B\u3089\u3059",reduceMotionHint:"\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3068\u753B\u9762\u52B9\u679C\u3092\u6291\u3048\u307E\u3059",readingGuide:"\u30EA\u30FC\u30C7\u30A3\u30F3\u30B0\u30AC\u30A4\u30C9",readingGuideHint:"\u30DD\u30A4\u30F3\u30BF\u30FC\u4F4D\u7F6E\u306B\u8AAD\u307F\u53D6\u308A\u7DDA\u3092\u8868\u793A\u3057\u307E\u3059",readingMask:"\u30EA\u30FC\u30C7\u30A3\u30F3\u30B0\u30DE\u30B9\u30AF",readingMaskHint:"\u8AAD\u3093\u3067\u3044\u308B\u884C\u4EE5\u5916\u3092\u6697\u304F\u3057\u307E\u3059",audioMedia:"\u97F3\u58F0\u3068\u30E1\u30C7\u30A3\u30A2",speech:"\u97F3\u58F0\u8AAD\u307F\u4E0A\u3052",speechHint:"\u30DA\u30FC\u30B8\u672C\u6587\u3092\u5148\u982D\u304B\u3089\u8AAD\u307F\u4E0A\u3052\u307E\u3059",speechStopHint:"\u8AAD\u307F\u4E0A\u3052\u3092\u505C\u6B62\u3057\u307E\u3059",speechStarted:"\u97F3\u58F0\u8AAD\u307F\u4E0A\u3052\u3092\u958B\u59CB\u3057\u307E\u3057\u305F",speechStopped:"\u97F3\u58F0\u8AAD\u307F\u4E0A\u3052\u3092\u505C\u6B62\u3057\u307E\u3057\u305F",speechUnavailable:"\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u306F\u97F3\u58F0\u8AAD\u307F\u4E0A\u3052\u306B\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093",mediaPaused:"\u30E1\u30C7\u30A3\u30A2\u3092\u505C\u6B62\u30FB\u30DF\u30E5\u30FC\u30C8",mediaPausedHint:"\u30DA\u30FC\u30B8\u5185\u306E\u52D5\u753B\u3068\u97F3\u58F0\u3092\u307E\u3068\u3081\u3066\u505C\u6B62\u3057\u307E\u3059",auditSection:"\u30DA\u30FC\u30B8\u306E\u78BA\u8A8D",auditTitle:"\u7C21\u6613\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3\u30C1\u30A7\u30C3\u30AF",auditHint:"\u30AC\u30A4\u30C9\u30D6\u30C3\u30AF\u306E\u91CD\u5927\u30FB\u5FC5\u9808\u9805\u76EE\u304B\u3089\u554F\u984C\u5019\u88DC\u3092\u3053\u306E\u30DA\u30FC\u30B8\u3067\u63A2\u3057\u307E\u3059",auditSevere:"\u91CD\u5927\uFF08\u9054\u6210\u3057\u306A\u3044\u3068\u91CD\u5927\u306A\u60AA\u5F71\u97FF\uFF09",auditRequired:"\u5FC5\u9808\uFF08\u5FC5\u305A\u9054\u6210\u3057\u306A\u3051\u308C\u3070\u306A\u3089\u306A\u3044\uFF09",auditRun:"\u3053\u306E\u30DA\u30FC\u30B8\u3092\u30C1\u30A7\u30C3\u30AF",auditDone:"\u30C1\u30A7\u30C3\u30AF\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F",auditWarnings:"\u9805\u76EE\u306B\u554F\u984C\u5019\u88DC",auditManuals:"\u9805\u76EE\u306F\u76EE\u8996\u78BA\u8A8D",auditDisclaimer:"\u81EA\u52D5\u30C1\u30A7\u30C3\u30AF\u3060\u3051\u3067\u306F\u9069\u5408\u6027\u3092\u5224\u65AD\u3067\u304D\u307E\u305B\u3093\u3002\u7D50\u679C\u304C0\u4EF6\u3067\u3082\u3001\u30AD\u30FC\u30DC\u30FC\u30C9\u3068\u30B9\u30AF\u30EA\u30FC\u30F3\u30EA\u30FC\u30C0\u30FC\u306B\u3088\u308B\u78BA\u8A8D\u304C\u5FC5\u8981\u3067\u3059\u3002",reset:"\u3059\u3079\u3066\u30EA\u30BB\u30C3\u30C8",resetDone:"\u8A2D\u5B9A\u3092\u30EA\u30BB\u30C3\u30C8\u3057\u307E\u3057\u305F",enabled:"\u30AA\u30F3",disabled:"\u30AA\u30D5",level:"\u30EC\u30D9\u30EB",note:"\u3053\u306E\u30C4\u30FC\u30EB\u306F\u8868\u793A\u3092\u8ABF\u6574\u3059\u308B\u3082\u306E\u3067\u3001\u30B5\u30A4\u30C8\u81EA\u4F53\u306E\u9069\u5408\u6027\u3092\u4FDD\u8A3C\u3059\u308B\u3082\u306E\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002"},en:{open:"Open accessibility preferences",close:"Close accessibility preferences",title:"Display support",launcherLine1:"Display",launcherLine2:"support",subtitle:"Make this page comfortable for you.",language:"Language",appearance:"Text & display",colorModes:"Color mode",colorModeHint:"Choose one color presentation",colorDefault:"Default",colorDark:"Dark",colorLight:"Light",colorHighContrast:"High contrast",colorMonochrome:"Monochrome",colorSaturated:"Vivid",focus:"Focus support",textSize:"Text size",textSizeHint:"Increase the size of page text",decrease:"Decrease text size",increase:"Increase text size",spacing:"Comfortable spacing",spacingHint:"Increase line and letter spacing",highlightLinks:"Highlight links",highlightLinksHint:"Add underlines and a background to links",highContrast:"High contrast",highContrastHint:"Use a crisp black-and-white presentation",readableFont:"Readable font",readableFontHint:"Use letterforms designed for easier recognition",reduceMotion:"Reduce motion",reduceMotionHint:"Limit animations and motion effects",readingGuide:"Reading guide",readingGuideHint:"Show a guide at the pointer position",readingMask:"Reading mask",readingMaskHint:"Dim the page outside the current line",audioMedia:"Audio & media",speech:"Read page aloud",speechHint:"Read the main page content from the beginning",speechStopHint:"Stop reading the page aloud",speechStarted:"Reading started",speechStopped:"Reading stopped",speechUnavailable:"Text-to-speech is not supported by this browser",mediaPaused:"Stop & mute media",mediaPausedHint:"Pause and mute all audio and video on this page",auditSection:"Page review",auditTitle:"Quick accessibility check",auditHint:"Scan this page for candidates against the guidebook checks",auditSevere:"Critical (severe impact if unmet)",auditRequired:"Required (must be met)",auditRun:"Check this page",auditDone:"Check complete",auditWarnings:"checks with candidates",auditManuals:"checks need manual review",auditDisclaimer:"Automated checks cannot determine conformance. Keyboard and screen-reader testing are still required even when no candidates are found.",reset:"Reset all",resetDone:"Preferences reset",enabled:"On",disabled:"Off",level:"Level",note:"This tool adjusts presentation. It does not guarantee that the website itself conforms to accessibility standards."}},Ct=t=>t==="ja"||t==="en",X=(t,e="ja")=>Ct(t)?t:e,vt=(t,e)=>Et[X(t)][e],Me="nanairo-a11y-page-styles",V="nanairo-a11y-reading-guide",Z="nanairo-a11y-reading-mask",xt=`
html[data-nanairo-text-scale="1"] { font-size: 112.5%; }
html[data-nanairo-text-scale="2"] { font-size: 125%; }
html[data-nanairo-text-scale="3"] { font-size: 150%; }
html[data-nanairo-text-scale="4"] { font-size: 175%; }
html[data-nanairo-text-scale="5"] { font-size: 200%; }

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

#${V} {
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

#${Z} {
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
`;let M=!1,j;const Q=new Map;function wt(){if(!document.head||document.getElementById(Me))return;const t=document.createElement("style");t.id=Me,t.textContent=xt,document.head.append(t)}function Ne(t){let e=document.getElementById(t);return e||(e=document.createElement("div"),e.id=t,e.setAttribute("aria-hidden","true"),document.body.append(e)),e}function se(t){const e=`${t.clientY}px`;document.documentElement.style.setProperty("--nanairo-guide-y",e),document.documentElement.style.setProperty("--nanairo-mask-y",e)}function Pe(t){Q.has(t)||Q.set(t,{muted:t.muted,paused:t.paused}),t.pause(),t.muted=!0}function _e(t,e){t instanceof HTMLMediaElement&&e(t),t instanceof Element&&t.querySelectorAll("audio, video").forEach(e)}function Ft(t){_e(t,Pe)}function Bt(t){_e(t,e=>{e.isConnected||Q.delete(e)})}function He(t){if(t){document.querySelectorAll("audio, video").forEach(Pe),!j&&document.body&&(j=new MutationObserver(e=>{e.forEach(a=>{a.addedNodes.forEach(Ft),a.removedNodes.forEach(Bt)})}),j.observe(document.body,{childList:!0,subtree:!0}));return}j?.disconnect(),j=void 0,Q.forEach((e,a)=>{a.isConnected&&(a.muted=e.muted,e.paused||a.play().catch(()=>{}))}),Q.clear()}const Dt=["nanairoTextScale","nanairoSpacing","nanairoLinks","nanairoColor","nanairoContrast","nanairoFont","nanairoMotion"];function kt(t){const e=document.documentElement,a=Dt.map(n=>[n,e.dataset[n]]);for(const[n]of a)delete e.dataset[n];try{return t()}finally{for(const[n,i]of a)i===void 0?delete e.dataset[n]:e.dataset[n]=i}}function Te(t){if(!document.body)return;wt();const e=document.documentElement;e.dataset.nanairoTextScale=String(t.textScale),e.dataset.nanairoSpacing=t.comfortableSpacing?"comfortable":"default",e.dataset.nanairoLinks=t.highlightLinks?"highlight":"default";const a=t.colorMode==="default"&&t.highContrast?"high-contrast":t.colorMode;e.dataset.nanairoColor=a,e.dataset.nanairoContrast=a==="high-contrast"?"high":"default",e.dataset.nanairoFont=t.readableFont?"readable":"default",e.dataset.nanairoMotion=t.reduceMotion?"reduce":"default",He(t.mediaPaused);const n=t.readingGuide?Ne(V):document.getElementById(V),i=t.readingMask?Ne(Z):document.getElementById(Z);n&&(n.hidden=!t.readingGuide),i&&(i.hidden=!t.readingMask);const u=t.readingGuide||t.readingMask;u&&!M?(document.addEventListener("pointermove",se,{passive:!0}),M=!0):!u&&M&&(document.removeEventListener("pointermove",se),M=!1)}function $t(){const t=document.documentElement;delete t.dataset.nanairoTextScale,delete t.dataset.nanairoSpacing,delete t.dataset.nanairoLinks,delete t.dataset.nanairoColor,delete t.dataset.nanairoContrast,delete t.dataset.nanairoFont,delete t.dataset.nanairoMotion,He(!1),t.style.removeProperty("--nanairo-guide-y"),t.style.removeProperty("--nanairo-mask-y"),document.getElementById(V)?.remove(),document.getElementById(Z)?.remove(),M&&(document.removeEventListener("pointermove",se),M=!1)}const St={autoplay:{ja:{label:"\u81EA\u52D5\u518D\u751F\u3055\u305B\u306A\u3044",pass:"\u81EA\u52D5\u518D\u751F\u306E\u6307\u5B9A\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u30DF\u30E5\u30FC\u30C8\u3055\u308C\u3066\u3044\u306A\u3044\u81EA\u52D5\u518D\u751F\u30E1\u30C7\u30A3\u30A2",manual:"\u52D5\u753B\u5185\u306E\u97F3\u58F0\u30683\u79D2\u4EE5\u5185\u304B\u306E\u5224\u5B9A\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"No autoplay",pass:"No autoplay attributes found",warning:"Unmuted autoplaying media",manual:"In-video audio and the 3-second limit need manual review"}},keyboardTrap:{ja:{label:"\u30AD\u30FC\u30DC\u30FC\u30C9\u306E\u888B\u5C0F\u8DEF\u3092\u4F5C\u3089\u306A\u3044",pass:"\u81EA\u52D5\u5224\u5B9A\u5BFE\u8C61\u5916",warning:"\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u629C\u3051\u3089\u308C\u306A\u3044\u53EF\u80FD\u6027\u306E\u3042\u308B\u8981\u7D20",manual:"\u30E2\u30FC\u30C0\u30EB\u3084\u30D7\u30EC\u30A4\u30E4\u30FC\u304B\u3089\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u629C\u3051\u308B\u304B\u306F\u5B9F\u969B\u306E\u64CD\u4F5C\u3067\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"No keyboard trap",pass:"Not automatically testable",warning:"Elements that may trap focus",manual:"Escaping modals and players must be tested by hand"}},flashing:{ja:{label:"\u5149\u306E\u70B9\u6EC5\u306F\u5371\u967A",pass:"\u9AD8\u901F\u3067\u7E70\u308A\u8FD4\u3059\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"1\u79D2\u306B3\u56DE\u3092\u8D85\u3048\u308B\u70B9\u6EC5\u306E\u5019\u88DC",manual:"\u52D5\u753B\u30FBCanvas\u30FBGIF\u306E\u70B9\u6EC5\u306F\u81EA\u52D5\u5224\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"No rapid flashing",pass:"No rapidly repeating animation found",warning:"Candidates flashing more than three times per second",manual:"Flashing in video, canvas or GIF needs manual review"}},autoAdvance:{ja:{label:"\u81EA\u52D5\u3067\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u5207\u308A\u66FF\u3048\u306A\u3044",pass:"\u81EA\u52D5\u3067\u52D5\u304D\u7D9A\u3051\u308B\u8981\u7D20\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u4E00\u6642\u505C\u6B62\u624B\u6BB5\u304C\u5FC5\u8981\u306A\u81EA\u52D5\u5207\u308A\u66FF\u3048\u306E\u5019\u88DC",manual:"\u4E00\u6642\u505C\u6B62\u30FB\u505C\u6B62\u30FB\u975E\u8868\u793A\u306E\u64CD\u4F5C\u304C\u5099\u308F\u3063\u3066\u3044\u308B\u304B\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"No automatic content changes",pass:"No continuously moving content found",warning:"Auto-advancing content that needs a pause control",manual:"Pause, stop and hide controls need manual review"}},altText:{ja:{label:"\u753B\u50CF\u306E\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8",pass:"alt\u5C5E\u6027\u306E\u6B20\u843D\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"alt\u5C5E\u6027\u304C\u306A\u3044\u753B\u50CF",manual:"alt\u5C5E\u6027\u304C\u3042\u3063\u3066\u3082\u5185\u5BB9\u304C\u9069\u5207\u304B\u306F\u81EA\u52D5\u5224\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Image alternative text",pass:"No missing alt attributes found",warning:"Images without an alt attribute",manual:"A present alt says nothing about its quality; review it by hand"}},keyboard:{ja:{label:"\u30AD\u30FC\u30DC\u30FC\u30C9\u64CD\u4F5C",pass:"\u81EA\u52D5\u691C\u51FA\u7BC4\u56F2\u3067\u306F\u554F\u984C\u306A\u3057",warning:"\u30AD\u30FC\u30DC\u30FC\u30C9\u64CD\u4F5C\u3067\u304D\u306A\u3044\u53EF\u80FD\u6027\u306E\u3042\u308B\u8981\u7D20",manual:"\u3059\u3079\u3066\u306E\u6A5F\u80FD\u304C\u64CD\u4F5C\u3067\u304D\u3001\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u898B\u3048\u308B\u304B\u306F\u5B9F\u969B\u306E\u64CD\u4F5C\u3067\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Keyboard access",pass:"No automatic issues found",warning:"Potentially inaccessible interactive elements",manual:"Full operability and a visible focus indicator must be tested by hand"}},timeLimits:{ja:{label:"\u5236\u9650\u6642\u9593\u3078\u306E\u5BFE\u5FDC",pass:"\u81EA\u52D5\u66F4\u65B0\u30FB\u30AB\u30A6\u30F3\u30C8\u30C0\u30A6\u30F3\u5019\u88DC\u306A\u3057",warning:"\u5236\u9650\u6642\u9593\u307E\u305F\u306F\u81EA\u52D5\u66F4\u65B0\u306E\u5019\u88DC",manual:"\u30BB\u30C3\u30B7\u30E7\u30F3\u3084\u30B9\u30AF\u30EA\u30D7\u30C8\u5185\u306E\u5236\u9650\u6642\u9593\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Time limits",pass:"No refresh or countdown candidates found",warning:"Possible time limit or automatic refresh",manual:"Session and script-based limits need manual review"}},colorOnly:{ja:{label:"\u8272\u30FB\u5F62\u3060\u3051\u306B\u4F9D\u5B58\u3057\u305F\u60C5\u5831",pass:"\u81EA\u52D5\u5224\u5B9A\u5BFE\u8C61\u5916",warning:"\u8272\u3060\u3051\u3067\u793A\u3057\u3066\u3044\u308B\u53EF\u80FD\u6027\u306E\u3042\u308B\u8981\u7D20",manual:"\u8272\u30FB\u592A\u5B57\u30FB\u4F4D\u7F6E\u30FB\u5F62\u3060\u3051\u3067\u610F\u5473\u3092\u4F1D\u3048\u3066\u3044\u306A\u3044\u304B\u306F\u81EA\u52D5\u5224\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Information conveyed by color or shape",pass:"Not automatically testable",warning:"Elements may rely on color alone",manual:"Whether meaning rests on color, weight, position or shape alone needs manual review"}},readingOrder:{ja:{label:"\u8AAD\u307F\u4E0A\u3052\u30FB\u30D5\u30A9\u30FC\u30AB\u30B9\u9806\u5E8F",pass:"\u6B63\u306Etabindex\u3084CSS order\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u9806\u5E8F\u3092\u5909\u3048\u3066\u3044\u308B\u53EF\u80FD\u6027\u306E\u3042\u308B\u8981\u7D20",manual:"\u8AAD\u307F\u4E0A\u3052\u9806\u5E8F\u3067\u610F\u5473\u304C\u901A\u3058\u308B\u304B\u306F\u30B9\u30AF\u30EA\u30FC\u30F3\u30EA\u30FC\u30C0\u30FC\u3067\u306E\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Reading and focus order",pass:"No positive tabindex or CSS order found",warning:"Elements may override the expected order",manual:"Whether the spoken order makes sense needs a screen-reader check"}},headings:{ja:{label:"\u898B\u51FA\u3057\u69CB\u9020",pass:"\u898B\u51FA\u3057\u968E\u5C64\u306E\u81EA\u52D5\u691C\u51FA\u7BC4\u56F2\u3067\u306F\u554F\u984C\u306A\u3057",warning:"\u7A7A\u898B\u51FA\u3057\u3001H1\u4E0D\u8DB3\u30FB\u91CD\u8907\u3001\u968E\u5C64\u98DB\u3073",manual:"\u898B\u51FA\u3057\u6587\u304C\u5185\u5BB9\u3092\u8868\u3057\u3066\u3044\u308B\u304B\u306F\u81EA\u52D5\u5224\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Heading structure",pass:"No automatic heading-structure issues found",warning:"Empty headings, H1 issues, or skipped levels",manual:"Whether the wording describes the section needs manual review"}},contrast:{ja:{label:"\u30B3\u30F3\u30C8\u30E9\u30B9\u30C8",pass:"\u6E2C\u5B9A\u53EF\u80FD\u306A\u6587\u5B57\u306F\u57FA\u6E96\u5024\u4EE5\u4E0A",warning:"\u57FA\u6E96\u5024\u672A\u6E80\u306E\u53EF\u80FD\u6027\u304C\u3042\u308B\u6587\u5B57",manual:"\u753B\u50CF\u30FB\u30B0\u30E9\u30C7\u30FC\u30B7\u30E7\u30F3\u4E0A\u306E\u6587\u5B57\u306F\u6E2C\u5B9A\u3067\u304D\u305A\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Contrast",pass:"Measurable text meets the threshold",warning:"Text may be below the contrast threshold",manual:"Text over images or gradients cannot be measured; review it by hand"}},textResize:{ja:{label:"200%\u62E1\u5927",pass:"\u30BA\u30FC\u30E0\u3092\u5236\u9650\u3059\u308B\u6307\u5B9A\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u30BA\u30FC\u30E0\u3092\u5236\u9650\u3059\u308Bviewport\u8A2D\u5B9A",manual:"200%\u3067\u6587\u5B57\u304C\u91CD\u306A\u3063\u305F\u308A\u898B\u5207\u308C\u306A\u3044\u304B\u306F\u5B9F\u30DA\u30FC\u30B8\u3067\u306E\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"200% text resize",pass:"No zoom-restricting settings found",warning:"Viewport settings restrict zoom",manual:"Overlap and clipping at 200% need checking on the real page"}},charsetFont:{ja:{label:"\u6587\u5B57\u30B3\u30FC\u30C9\u3068\u30D5\u30A9\u30F3\u30C8",pass:"UTF-8\u3067\u3001\u6975\u7AEF\u306B\u5C0F\u3055\u3044\u6587\u5B57\u3082\u3042\u308A\u307E\u305B\u3093",warning:"UTF-8\u4EE5\u5916\u306E\u6587\u5B57\u30B3\u30FC\u30C9\u3001\u307E\u305F\u306F\u6975\u7AEF\u306B\u5C0F\u3055\u3044\u6587\u5B57",manual:"\u30A2\u30A4\u30B3\u30F3\u30D5\u30A9\u30F3\u30C8\u3001\u8AA4\u3063\u305F\u6587\u5B57\u3001\u8A18\u53F7\u306E\u8AAD\u307F\u4E0A\u3052\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Character encoding and fonts",pass:"UTF-8, and no extremely small text",warning:"Encoding other than UTF-8, or extremely small text",manual:"Icon fonts, look-alike characters and symbol pronunciation need manual review"}},pageTitle:{ja:{label:"\u30DA\u30FC\u30B8\u30BF\u30A4\u30C8\u30EB",pass:"\u30DA\u30FC\u30B8\u30BF\u30A4\u30C8\u30EB\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u3059",warning:"\u30DA\u30FC\u30B8\u30BF\u30A4\u30C8\u30EB\u304C\u672A\u8A2D\u5B9A\u307E\u305F\u306F\u66D6\u6627",manual:"H1\u3068\u306E\u6574\u5408\u6027\u3068\u30DA\u30FC\u30B8\u9593\u306E\u91CD\u8907\u306F\u30B5\u30A4\u30C8\u5168\u4F53\u3067\u306E\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Page title",pass:"A page title is present",warning:"Missing or ambiguous page title",manual:"H1 alignment and cross-page duplication need a site-wide review"}},links:{ja:{label:"\u30EA\u30F3\u30AF\u306E\u5F37\u8ABF\u30FB\u8868\u73FE",pass:"\u30EA\u30F3\u30AF\u540D\u306E\u81EA\u52D5\u691C\u51FA\u7BC4\u56F2\u3067\u306F\u554F\u984C\u306A\u3057",warning:"\u540D\u524D\u304C\u306A\u3044\u3001\u307E\u305F\u306F\u76EE\u7684\u304C\u66D6\u6627\u306A\u30EA\u30F3\u30AF",manual:"\u30EA\u30F3\u30AF\u5148\u5F62\u5F0F\uFF08PDF\u7B49\uFF09\u3068\u5225\u753B\u9762\u8868\u793A\u306E\u4E88\u544A\u306F\u76EE\u8996\u78BA\u8A8D\u304C\u5FC5\u8981"},en:{label:"Link visibility and purpose",pass:"No automatic link-name issues found",warning:"Unnamed or ambiguous links",manual:"File types and new-window warnings need manual review"}},consistency:{ja:{label:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u30FB\u30E9\u30D9\u30EB\u306E\u4E00\u8CAB\u6027",pass:"\u540D\u524D\u306E\u306A\u3044\u64CD\u4F5C\u8981\u7D20\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",warning:"\u540D\u524D\u306E\u306A\u3044\u30DC\u30BF\u30F3\u30FB\u30D5\u30A9\u30FC\u30E0\u30FB\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",manual:"\u30DA\u30FC\u30B8\u9593\u306E\u9806\u5E8F\u30FB\u8868\u8A18\u30FB\u30A2\u30A4\u30B3\u30F3\u306E\u4E00\u8CAB\u6027\u306F\u8907\u6570\u30DA\u30FC\u30B8\u306E\u6BD4\u8F03\u304C\u5FC5\u8981"},en:{label:"Consistent navigation and labels",pass:"No unnamed controls found",warning:"Unnamed buttons, fields, or navigation",manual:"Cross-page order, wording and icons need comparing across pages"}}},Ue=t=>!!t.closest('nanairo-accessibility, [aria-hidden="true"], [hidden]');function le(t){if(Ue(t))return null;const e=getComputedStyle(t);return e.display==="none"||e.visibility==="hidden"||Number(e.opacity)===0?null:e}const N=t=>le(t)!==null;function ce(t){const e=t.getAttribute("aria-labelledby");if(e){const i=e.split(/\s+/).map(u=>document.getElementById(u)?.textContent??"").join(" ").trim();if(i)return i}const a=t.getAttribute("aria-label")?.trim();if(a)return a;if(t instanceof HTMLInputElement||t instanceof HTMLSelectElement||t instanceof HTMLTextAreaElement){const i=Array.from(t.labels??[]).map(u=>u.textContent?.trim()??"").filter(Boolean).join(" ");if(i)return i;if(t instanceof HTMLInputElement){if(t.type==="image")return t.alt.trim();if(t.type==="submit"||t.type==="button")return t.value.trim()}}const n=t.querySelector("img[alt]")?.getAttribute("alt")?.trim();return t.textContent?.replace(/\s+/g," ").trim()||n||t.getAttribute("title")?.trim()||""}function ze(t){const e=t.match(/rgba?\((\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)(?:[, /]+(\d+(?:\.\d+)?))?\)/);return e?[Number(e[1]),Number(e[2]),Number(e[3]),e[4]===void 0?1:Number(e[4])]:null}function ee([t,e,a]){const n=i=>{const u=i/255;return u<=.03928?u/12.92:((u+.055)/1.055)**2.4};return .2126*n(t)+.7152*n(e)+.0722*n(a)}function Mt(t,e){const a=Math.max(ee(t),ee(e)),n=Math.min(ee(t),ee(e));return(a+.05)/(n+.05)}function Nt(t){let e=t;for(;e;){const a=getComputedStyle(e);if(a.backgroundImage!=="none")return null;const n=ze(a.backgroundColor);if(!n)return null;if(n[3]>=.95)return[n[0],n[1],n[2]];e=e.parentElement}return[255,255,255]}const Pt=["\u3053\u3061\u3089","\u3053\u3053","\u8A73\u3057\u304F\u306F\u3053\u3061\u3089","\u8A73\u7D30","more","click here","read more"],_t=["home","\u30DB\u30FC\u30E0","untitled","\u7121\u984C","new page"],Ht="h1, h2, h3, h4, h5, h6, p, li, dt, dd, figcaption, label, a, button, td, th, small, strong";function Tt(){let t=0,e=0;return document.querySelectorAll(Ht).forEach(a=>{const n=le(a);if(!n||!a.textContent?.trim())return;const i=ze(n.color),u=Nt(a);if(!i||i[3]<.95||!u){e+=1;return}const r=Number.parseFloat(n.fontSize),o=Number.parseInt(n.fontWeight,10)||(n.fontWeight==="bold"?700:400),s=r>=24||o>=700&&r>=18.66;Mt([i[0],i[1],i[2]],u)<(s?3:4.5)&&(t+=1)}),{failures:t,unmeasurable:e}}function Ut(){const t=Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter(N);let e=t.filter(i=>!i.textContent?.trim()).length;const a=t.filter(i=>i.tagName==="H1").length;a!==1&&(e+=Math.abs(1-a));let n=0;return t.forEach(i=>{const u=Number(i.tagName.slice(1));n&&u>n+1&&(e+=1),n=u}),e}function zt(){const t={cssOrder:0,verySmallText:0,rapidFlash:0,endlessMotion:0};return document.querySelectorAll("body *").forEach(e=>{const a=le(e);if(!a)return;Number(a.order)!==0&&(t.cssOrder+=1),e.children.length===0&&e.textContent?.trim()&&Number.parseFloat(a.fontSize)<10&&(t.verySmallText+=1);const n=a.animationIterationCount.split(",").map(u=>u.trim()),i=a.animationDuration.split(",").map(u=>Number.parseFloat(u));n.forEach((u,r)=>{if(u!=="infinite")return;t.endlessMotion+=1;const o=i[r]??i[0]??0;o>0&&o<.3333333333333333&&(t.rapidFlash+=1)})}),t}function f(t,e,a,n,i="auto"){const u=St[t][a],r=i==="alwaysManual"?"manual":n>0?"warning":i==="manualWhenClean"?"manual":"pass";return{id:t,severity:e,status:r,count:n,label:u.label,detail:r==="warning"?u.warning:r==="manual"?u.manual:u.pass,note:r==="manual"?void 0:u.manual}}function It(t){const e=zt(),n=Array.from(document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex], [onclick]')).filter(N),i=n.filter(g=>g.hasAttribute("onclick")&&!g.matches('a[href], button, input, select, textarea, [role="button"], [role="link"]')&&!g.hasAttribute("tabindex")).length,u=n.filter(g=>Number(g.getAttribute("tabindex"))>0).length,r=Array.from(document.querySelectorAll("a[href]")).filter(N),o=new RegExp(`^(${Pt.join("|")})$`,"i"),s=r.filter(g=>{const Je=ce(g);return!Je||o.test(Je)}).length,d=Array.from(document.querySelectorAll("img")).filter(g=>N(g)&&!g.hasAttribute("alt")).length+document.querySelectorAll('input[type="image"]:not([alt]), area:not([alt])').length,h=document.querySelectorAll('meta[http-equiv="refresh" i], [data-timeout], [data-countdown], [class*="countdown" i], [id*="countdown" i], [class*="timer" i], [id*="timer" i]').length,l=Array.from(document.querySelectorAll("video[autoplay], audio[autoplay]")).filter(g=>!g.muted&&!Ue(g)).length,A=document.querySelectorAll("marquee, blink").length,b=document.querySelector('meta[name="viewport"]')?.content.toLowerCase()??"",D=/maximum-scale\s*=\s*([\d.]+)/.exec(b),ua=/user-scalable\s*=\s*(no|0)/.test(b)||D!==null&&Number(D[1])<2,qe=document.title.replace(/\s+/g," ").trim(),ra=new RegExp(`^(${_t.join("|")})$`,"i"),oa=!qe||ra.test(qe)?1:0,sa=document.characterSet.toUpperCase()==="UTF-8"?0:1,la=Array.from(document.querySelectorAll('button, input:not([type="hidden"]), select, textarea, [role="button"]')).filter(N).filter(g=>!ce(g)).length,Ge=Array.from(document.querySelectorAll('nav, [role="navigation"]')).filter(N),ca=Ge.length>1?Ge.filter(g=>!ce(g)).length:0,Ke=Tt();return[f("autoplay","severe",t,l,"manualWhenClean"),f("keyboardTrap","severe",t,0,"alwaysManual"),f("flashing","severe",t,e.rapidFlash+A,"manualWhenClean"),f("autoAdvance","severe",t,e.endlessMotion+A,"manualWhenClean"),f("altText","required",t,d),f("keyboard","required",t,i+u,"manualWhenClean"),f("timeLimits","required",t,h,"manualWhenClean"),f("colorOnly","required",t,0,"alwaysManual"),f("readingOrder","required",t,u+e.cssOrder,"manualWhenClean"),f("headings","required",t,Ut()),f("contrast","required",t,Ke.failures,Ke.unmeasurable>0?"manualWhenClean":"auto"),f("textResize","required",t,ua?1:0,"manualWhenClean"),f("charsetFont","required",t,sa+e.verySmallText),f("pageTitle","required",t,oa),f("links","required",t,s),f("consistency","required",t,la+ca,"manualWhenClean")]}function Rt(t="ja"){const e=kt(()=>It(t));return{checkedAt:Date.now(),items:e,warningCount:e.filter(a=>a.status==="warning").length,manualCount:e.filter(a=>a.status==="manual").length}}const Ie="h1, h2, h3, h4, h5, h6, p, li, dt, dd, blockquote, figcaption, caption, th, td, summary",Lt=220,Ot="\u3002\uFF0E\uFF01\uFF1F!?.",jt=/[\s"')\]]/;function Qt(t){const e=[];let a=0;for(let n=0;n<t.length;n+=1){const i=t[n],u=i==="\u3002"||i==="\uFF0E"||i==="\uFF01"||i==="\uFF1F",r=(i==="!"||i==="?"||i===".")&&(n+1>=t.length||jt.test(t[n+1]));if(!u&&!r)continue;let o=n+1;for(;o<t.length&&Ot.includes(t[o]);)o+=1;t[o]===" "&&(o+=1),e.push(t.slice(a,o)),a=o,n=o-1}return a<t.length&&e.push(t.slice(a)),e}function qt(t,e=Lt){const a=t.replace(/\s+/g," ").trim();if(!a)return[];if(a.length<=e)return[a];const n=[];let i="";const u=()=>{const r=i.trim();r&&n.push(r),i=""};for(const r of Qt(a)){if(r.length>e){u();let o=r;for(;o.length>e;){const s=o.slice(0,e).lastIndexOf(" "),d=s>e*.6?s:e,h=o.slice(0,d).trim();h&&n.push(h),o=o.slice(d)}i=o;continue}(i+r).length>e&&u(),i+=r}return u(),n}function Gt(t){return t.hidden||t.closest('[aria-hidden="true"], nanairo-accessibility')||typeof t.checkVisibility=="function"&&!t.checkVisibility()?!1:t.querySelector(Ie)===null}function Kt(t){const e=[];return t.querySelectorAll(Ie).forEach(a=>{Gt(a)&&e.push(...qt(a.textContent??""))}),e}const Re="nanairo:a11y:preferences:v1",de=5,he=(t="ja")=>({schemaVersion:1,locale:t,textScale:0,comfortableSpacing:!1,highlightLinks:!1,highContrast:!1,colorMode:"default",readableFont:!1,reduceMotion:!1,readingGuide:!1,readingMask:!1,mediaPaused:!1}),Jt=t=>t==="default"||t==="dark"||t==="light"||t==="high-contrast"||t==="monochrome"||t==="saturated",x=t=>t===!0,Yt=t=>{const e=typeof t=="number"?t:Number(t);return Number.isFinite(e)?Math.min(de,Math.max(0,Math.round(e))):0};function Wt(t){const e=he(t);let a;try{const i=localStorage.getItem(Re);if(!i)return e;const u=JSON.parse(i);if(typeof u!="object"||u===null||Array.isArray(u))return e;a=u}catch{return e}if(a.schemaVersion!==1)return e;const n=Jt(a.colorMode)?a.colorMode:x(a.highContrast)?"high-contrast":"default";return{schemaVersion:1,locale:X(a.locale,t),textScale:Yt(a.textScale),comfortableSpacing:x(a.comfortableSpacing),highlightLinks:x(a.highlightLinks),highContrast:n==="high-contrast",colorMode:n,readableFont:x(a.readableFont),reduceMotion:x(a.reduceMotion),readingGuide:x(a.readingGuide),readingMask:x(a.readingMask),mediaPaused:x(a.mediaPaused)}}function Xt(t){try{localStorage.setItem(Re,JSON.stringify(t))}catch{}}const Vt="data:image/png;base64,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",Zt="data:image/png;base64,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";var ea=Object.defineProperty,ta=Object.getOwnPropertyDescriptor,C=(t,e,a,n)=>{for(var i=n>1?void 0:n?ta(e,a):e,u=t.length-1,r;u>=0;u--)(r=t[u])&&(i=(n?r(e,a,i):r(i))||i);return n&&i&&ea(e,a,i),i};let aa=0;const Le=[100,112,125,150,175,200],Oe={ja:"\u65E5\u672C\u8A9E",en:"English"},na=" \xB7 ",ia=Le.map((t,e)=>e);let P;const _=[{value:"default",label:"colorDefault"},{value:"dark",label:"colorDark"},{value:"light",label:"colorLight"},{value:"high-contrast",label:"colorHighContrast"},{value:"monochrome",label:"colorMonochrome"},{value:"saturated",label:"colorSaturated"}],E=t=>{const e={spark:p`<path d="M12 2.75c.62 3.67 2.58 5.63 6.25 6.25-3.67.62-5.63 2.58-6.25 6.25C11.38 11.58 9.42 9.62 5.75 9 9.42 8.38 11.38 6.42 12 2.75Z"></path><path d="M18.4 14.3c.28 1.66 1.17 2.55 2.83 2.83-1.66.28-2.55 1.17-2.83 2.83-.28-1.66-1.17-2.55-2.83-2.83 1.66-.28 2.55-1.17 2.83-2.83Z"></path>`,accessibility:p`<circle cx="12" cy="12" r="9.25"></circle><circle cx="12" cy="7" r="1.35" fill="currentColor" stroke="none"></circle><path d="M6.8 10.2c3.5 1.15 6.9 1.15 10.4 0M12 10.7v4M12 14.7 8.8 19M12 14.7l3.2 4.3"></path>`,close:p`<path d="m7 7 10 10M17 7 7 17"></path>`,minus:p`<path d="M6 12h12"></path>`,plus:p`<path d="M12 6v12M6 12h12"></path>`,type:p`<path d="M5 6h10M10 6v12M7 18h6M16.5 11h3M18 11v7m-2 0h4"></path>`,spacing:p`<path d="M7 4v16M4.5 6.5 7 4l2.5 2.5M4.5 17.5 7 20l2.5-2.5M12 7h8M12 12h8M12 17h8"></path>`,link:p`<path d="m9.5 14.5 5-5M7.8 16.2l-1.2 1.2a3.4 3.4 0 0 1-4.8-4.8l3.1-3.1a3.4 3.4 0 0 1 4.8 0M16.2 7.8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8l-3.1 3.1a3.4 3.4 0 0 1-4.8 0"></path>`,contrast:p`<circle cx="12" cy="12" r="8.5"></circle><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17Z" fill="currentColor" stroke="none"></path>`,font:p`<path d="M4 18 9 5l5 13M6 13h6M14.5 10h5M17 10v8m-2.5 0h5"></path>`,motion:p`<path d="M5 8.5c2.2-4.4 9-5.1 12.3-1.4 3.2 3.5 1.2 9.3-3.3 10.4-3.7.9-7.5-1.6-7.8-5.4M2.8 5.4 5 8.5l3.6-1"></path>`,guide:p`<path d="M3 7h18M3 17h18M6 12h12"></path>`,mask:p`<path d="M4 4h16v16H4zM4 9h16M4 15h16"></path>`,speech:p`<path d="M5 10v4h3l4 3V7L8 10H5ZM15 9.2a4 4 0 0 1 0 5.6M17.5 6.8a7.3 7.3 0 0 1 0 10.4"></path>`,media:p`<rect x="3.5" y="5" width="17" height="14" rx="2.5"></rect><path d="m9 9.2 5 2.8-5 2.8V9.2ZM4 4l16 16"></path>`,audit:p`<path d="M9.5 5H6.8A1.8 1.8 0 0 0 5 6.8v10.4A1.8 1.8 0 0 0 6.8 19h10.4a1.8 1.8 0 0 0 1.8-1.8v-3.1M9 12l2.1 2.1L19 6.2"></path>`,reset:p`<path d="M4.5 8A8 8 0 1 1 4 14M4.5 8V3.5M4.5 8H9"></path>`};return y`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${e[t]}</svg>`};m.NanairoAccessibility=class extends L{constructor(){super(...arguments),this.locale="ja",this.position="right",this.showBranding=!0,this.open=!1,this.preferences=he(),this.announcement="",this.speaking=!1,this.auditResult=null,this.panelId=`nanairo-a11y-panel-${++aa}`,this.initialized=!1,this.speechQueue=[],this.speechSession=0,this.handleDocumentPointerDown=e=>{this.open&&!e.composedPath().includes(this)&&this.closePanel(!1)},this.handlePageHide=()=>{this.stopSpeech(!1)},this.handleKeyDown=e=>{e.key==="Escape"&&this.open&&(e.preventDefault(),this.closePanel(!0))},this.handleColorModeKeyDown=e=>{const a=e.key==="ArrowRight"||e.key==="ArrowDown"?1:e.key==="ArrowLeft"||e.key==="ArrowUp"?-1:void 0;if(a!==void 0){e.preventDefault(),this.moveColorMode(a);return}(e.key==="Home"||e.key==="End")&&(e.preventDefault(),this.moveColorMode(e.key==="Home"?"first":"last"))}}connectedCallback(){if(P&&P!==this&&P.isConnected){console.warn("[nanairo-accessibility] A widget is already active on this page; the duplicate element was removed."),this.remove();return}P=this,super.connectedCallback(),this.initialized||(this.locale=X(this.getAttribute("locale")),this.preferences=Wt(this.locale),this.locale=this.preferences.locale,Te(this.preferences),this.initialized=!0),document.addEventListener("pointerdown",this.handleDocumentPointerDown),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("pagehide",this.handlePageHide)}disconnectedCallback(){P===this&&(P=void 0),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("pagehide",this.handlePageHide),this.stopSpeech(!1),super.disconnectedCallback()}willUpdate(e){if(e.has("locale")){const a=X(this.locale);a!==this.locale&&(this.locale=a)}e.has("position")&&this.position!=="left"&&this.position!=="right"&&(this.position="right")}t(e){return vt(this.locale,e)}commit(e){this.preferences=e,this.locale=e.locale,Xt(e),Te(e),this.dispatchEvent(new CustomEvent("nanairo-change",{detail:e,bubbles:!0,composed:!0}))}async openPanel(){this.open=!0,await this.updateComplete,this.renderRoot.querySelector(".close-button")?.focus()}async showPanel(){await this.openPanel()}async closePanel(e){this.open=!1,await this.updateComplete,e&&this.renderRoot.querySelector(".launcher")?.focus()}selectLocale(e){this.stopSpeech(!1),this.auditResult=null,this.commit({...this.preferences,locale:e})}setScale(e){const a=Math.max(0,Math.min(de,this.preferences.textScale+e));this.commit({...this.preferences,textScale:a})}async runAudit(){this.auditResult=Rt(this.locale),this.announcement="",await this.updateComplete;const{warningCount:e,manualCount:a}=this.auditResult;this.announcement=`${this.t("auditDone")} ${e}${this.t("auditWarnings")} / ${a}${this.t("auditManuals")}`}renderAuditGroup(e,a){const n=this.auditResult?.items.filter(i=>i.severity===e)??[];return n.length?y`
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
    `:c}toggle(e){this.commit({...this.preferences,[e]:!this.preferences[e]})}colorModeButtons(){return Array.from(this.renderRoot.querySelectorAll('.color-mode-grid [role="radio"]'))}async moveColorMode(e){const a=_.findIndex(({value:i})=>i===this.preferences.colorMode),n=e==="first"?0:e==="last"?_.length-1:(Math.max(0,a)+e+_.length)%_.length;this.setColorMode(_[n].value),await this.updateComplete,this.colorModeButtons()[n]?.focus()}setColorMode(e){this.commit({...this.preferences,colorMode:e,highContrast:e==="high-contrast"})}pageSpeechSegments(){const e=document.querySelector("main")??document.body;return e?Kt(e):[]}speakNext(e){if(e!==this.speechSession)return;const a=this.speechQueue.shift();if(!a){this.speaking=!1;return}const n=new SpeechSynthesisUtterance(a);n.lang=this.locale==="ja"?"ja-JP":"en-US",n.rate=.92,n.onend=()=>this.speakNext(e),n.onerror=()=>{e===this.speechSession&&(this.speaking=!1)},window.speechSynthesis.speak(n)}toggleSpeech(){if(this.speaking){this.stopSpeech(!0);return}if(!("speechSynthesis"in window)||typeof SpeechSynthesisUtterance>"u"){this.announcement=this.t("speechUnavailable");return}if(this.speechQueue=this.pageSpeechSegments(),!this.speechQueue.length)return;const e=++this.speechSession;this.speaking=!0,this.announcement=this.t("speechStarted"),window.speechSynthesis.cancel(),this.speakNext(e)}stopSpeech(e){!this.speaking&&!this.speechQueue.length||(this.speechSession+=1,this.speechQueue=[],this.speaking=!1,"speechSynthesis"in window&&window.speechSynthesis.cancel(),e&&(this.announcement=this.t("speechStopped")))}reset(){this.stopSpeech(!1),this.auditResult=null,this.commit(he(this.locale)),this.announcement=this.t("resetDone"),window.setTimeout(()=>{this.announcement=""},1800)}resetPreferences(){this.reset()}destroy(){$t(),this.remove()}renderToggle(e,a,n,i){const u=this.preferences[e];return y`
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
    `}render(){const e=Le[this.preferences.textScale];return y`
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
              <span class="brand-mark" aria-hidden="true"><img src=${Vt} alt="" /></span>
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
                  ${ia.map(a=>y`<span class=${a<=this.preferences.textScale?"filled":""}></span>`)}
                </div>
                <button type="button" aria-label=${this.t("increase")} ?disabled=${this.preferences.textScale===de} @click=${()=>this.setScale(1)}>
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
              ${_.map(({value:a,label:n})=>y`
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
                  <span>${this.auditResult.warningCount}${this.t("auditWarnings")}${na}${this.auditResult.manualCount}${this.t("auditManuals")}</span>
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
                <option value="ja">${Oe.ja}</option>
                <option value="en">${Oe.en}</option>
              </select>
            </div>
          </div>

          <footer class="panel-footer">
            <button class="reset-button" type="button" @click=${this.reset}>${E("reset")}<span>${this.t("reset")}</span></button>
            ${this.showBranding?y`
              <span class="footer-brand">
                <span class="powered-by">Powered by</span>
                <img src=${Zt} alt="NANAiRO" />
              </span>
            `:c}
          </footer>
          <span class="sr-only" aria-live="polite">${this.announcement||c}</span>
      </section>
    `}},m.NanairoAccessibility.styles=We`
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
    .launcher-label { display: grid; justify-items: start; gap: 1px; font-size: 10px; font-weight: 800; letter-spacing: .05em; line-height: 1.08; text-align: left; writing-mode: horizontal-tb; transition: opacity .18s ease, transform .28s ease; }
    .launcher-arrow { position: absolute; inset: 0; display: grid; place-items: center; opacity: 0; transform: translateX(8px); transition: opacity .22s ease .12s, transform .36s cubic-bezier(.22,.8,.2,1) .08s; }
    .launcher-arrow svg { width: 24px; height: 24px; stroke-width: 1.7; }
    .launcher[aria-expanded="true"] { right: var(--drawer-width); width: 46px; min-height: 62px; padding: 0; border-radius: 12px 0 0 12px; animation: none; }
    .launcher[aria-expanded="true"]:hover { width: 46px; }
    .launcher[aria-expanded="true"]:active { transform: translateY(-50%) scale(.97); }
    .launcher[aria-expanded="true"] .launcher-mark,
    .launcher[aria-expanded="true"] .launcher-label { opacity: 0; transform: scale(.84); }
    .launcher[aria-expanded="true"] .launcher-arrow { opacity: 1; transform: translateX(0); }
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
      pointer-events: none;
      opacity: 0;
      transform: translateX(100%);
      transition: transform .48s cubic-bezier(.22,.8,.2,1), opacity .34s ease;
    }

    .panel.is-open { pointer-events: auto; opacity: 1; transform: translateX(0); }
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
    .powered-by { font-size: 10px; font-weight: 650; letter-spacing: .04em; }
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
      .launcher-label { font-size: 9px; }
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
  `,C([W({type:String,reflect:!0})],m.NanairoAccessibility.prototype,"locale",2),C([W({type:String,reflect:!0})],m.NanairoAccessibility.prototype,"position",2),C([W({type:Boolean,attribute:"show-branding"})],m.NanairoAccessibility.prototype,"showBranding",2),C([O()],m.NanairoAccessibility.prototype,"open",2),C([O()],m.NanairoAccessibility.prototype,"preferences",2),C([O()],m.NanairoAccessibility.prototype,"announcement",2),C([O()],m.NanairoAccessibility.prototype,"speaking",2),C([O()],m.NanairoAccessibility.prototype,"auditResult",2),m.NanairoAccessibility=C([At("nanairo-accessibility")],m.NanairoAccessibility);const je=t=>({locale:t.locale==="en"?"en":"ja",position:t.position==="left"?"left":"right",showBranding:t.showBranding!==!1&&t.showBranding!=="false"});function pe(t={}){const e=document.querySelector("nanairo-accessibility");if(e)return e;const a=document.createElement("nanairo-accessibility");a.setAttribute("locale",t.locale==="en"?"en":"ja"),a.setAttribute("position",t.position==="left"?"left":"right"),a.showBranding=t.showBranding??!0;const n=()=>{document.body.append(a)};return document.body?n():document.addEventListener("DOMContentLoaded",n,{once:!0}),a}const Qe=document.querySelector("script[data-nanairo-auto]");if(Qe)pe(je(Qe.dataset));else{const t=window.nanairoAccessibilitySettings;t&&typeof t=="object"&&pe(je(t))}return m.init=pe,Object.defineProperty(m,Symbol.toStringTag,{value:"Module"}),m})({});
