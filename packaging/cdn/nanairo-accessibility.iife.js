var NanairoAccessibility=(function(f){"use strict";const L=globalThis,Z=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),se=new WeakMap;let ce=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Z&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=se.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&se.set(t,e))}return e}toString(){return this.cssText}};const Ue=i=>new ce(typeof i=="string"?i:i+"",void 0,q),ze=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((n,a,o)=>n+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+i[o+1],i[0]);return new ce(t,i,q)},Oe=(i,e)=>{if(Z)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),a=L.litNonce;a!==void 0&&n.setAttribute("nonce",a),n.textContent=t.cssText,i.appendChild(n)}},le=Z?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return Ue(t)})(i):i;const{is:Ie,defineProperty:Be,getOwnPropertyDescriptor:Te,getOwnPropertyNames:Le,getOwnPropertySymbols:Re,getPrototypeOf:Qe}=Object,R=globalThis,de=R.trustedTypes,je=de?de.emptyScript:"",Je=R.reactiveElementPolyfillSupport,H=(i,e)=>i,Q={toAttribute(i,e){switch(e){case Boolean:i=i?je:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},W=(i,e)=>!Ie(i,e),he={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),R.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),a=this.getPropertyDescriptor(e,n,t);a!==void 0&&Be(this.prototype,e,a)}}static getPropertyDescriptor(e,t,n){const{get:a,set:o}=Te(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){const s=a?.call(this);o?.call(this,r),this.requestUpdate(e,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;const e=Qe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){const t=this.properties,n=[...Le(t),...Re(t)];for(const a of n)this.createProperty(a,t[a])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,a]of t)this.elementProperties.set(n,a)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const a=this._$Eu(t,n);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const a of n)t.unshift(le(a))}else e!==void 0&&t.push(le(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Oe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,n);if(a!==void 0&&n.reflect===!0){const o=(n.converter?.toAttribute!==void 0?n.converter:Q).toAttribute(t,n.type);this._$Em=e,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,t){const n=this.constructor,a=n._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const o=n.getPropertyOptions(a),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Q;this._$Em=a;const s=r.fromAttribute(t,o.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,t,n,a=!1,o){if(e!==void 0){const r=this.constructor;if(a===!1&&(o=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??W)(o,t)||n.useDefault&&n.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:a,wrapped:o},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),o!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,o]of this._$Ep)this[a]=o;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[a,o]of n){const{wrapped:r}=o,s=this[a];r!==!0||this._$AL.has(a)||s===void 0||this.C(a,void 0,o,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[H("elementProperties")]=new Map,$[H("finalized")]=new Map,Je?.({ReactiveElement:$}),(R.reactiveElementVersions??=[]).push("2.1.2");const ee=globalThis,pe=i=>i,j=ee.trustedTypes,ue=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,fe="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,ge="?"+m,Ge=`<${ge}>`,w=document,D=()=>w.createComment(""),N=i=>i===null||typeof i!="object"&&typeof i!="function",te=Array.isArray,Ke=i=>te(i)||typeof i?.[Symbol.iterator]=="function",ie=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,be=/>/g,A=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ye=/'/g,xe=/"/g,ve=/^(?:script|style|textarea|title)$/i,we=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),S=we(1),u=we(2),M=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Ae=new WeakMap,k=w.createTreeWalker(w,129);function ke(i,e){if(!te(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ue!==void 0?ue.createHTML(e):e}const Ye=(i,e)=>{const t=i.length-1,n=[];let a,o=e===2?"<svg>":e===3?"<math>":"",r=U;for(let s=0;s<t;s++){const c=i[s];let d,p,l=-1,g=0;for(;g<c.length&&(r.lastIndex=g,p=r.exec(c),p!==null);)g=r.lastIndex,r===U?p[1]==="!--"?r=me:p[1]!==void 0?r=be:p[2]!==void 0?(ve.test(p[2])&&(a=RegExp("</"+p[2],"g")),r=A):p[3]!==void 0&&(r=A):r===A?p[0]===">"?(r=a??U,l=-1):p[1]===void 0?l=-2:(l=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?A:p[3]==='"'?xe:ye):r===xe||r===ye?r=A:r===me||r===be?r=U:(r=A,a=void 0);const v=r===A&&i[s+1].startsWith("/>")?" ":"";o+=r===U?c+Ge:l>=0?(n.push(d),c.slice(0,l)+fe+c.slice(l)+m+v):c+m+(l===-2?s:v)}return[ke(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class z{constructor({strings:e,_$litType$:t},n){let a;this.parts=[];let o=0,r=0;const s=e.length-1,c=this.parts,[d,p]=Ye(e,t);if(this.el=z.createElement(d,n),k.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(a=k.nextNode())!==null&&c.length<s;){if(a.nodeType===1){if(a.hasAttributes())for(const l of a.getAttributeNames())if(l.endsWith(fe)){const g=p[r++],v=a.getAttribute(l).split(m),X=/([.?@])?(.*)/.exec(g);c.push({type:1,index:o,name:X[2],strings:v,ctor:X[1]==="."?Ve:X[1]==="?"?Xe:X[1]==="@"?Ze:J}),a.removeAttribute(l)}else l.startsWith(m)&&(c.push({type:6,index:o}),a.removeAttribute(l));if(ve.test(a.tagName)){const l=a.textContent.split(m),g=l.length-1;if(g>0){a.textContent=j?j.emptyScript:"";for(let v=0;v<g;v++)a.append(l[v],D()),k.nextNode(),c.push({type:2,index:++o});a.append(l[g],D())}}}else if(a.nodeType===8)if(a.data===ge)c.push({type:2,index:o});else{let l=-1;for(;(l=a.data.indexOf(m,l+1))!==-1;)c.push({type:7,index:o}),l+=m.length-1}o++}}static createElement(e,t){const n=w.createElement("template");return n.innerHTML=e,n}}function E(i,e,t=i,n){if(e===M)return e;let a=n!==void 0?t._$Co?.[n]:t._$Cl;const o=N(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),o===void 0?a=void 0:(a=new o(i),a._$AT(i,t,n)),n!==void 0?(t._$Co??=[])[n]=a:t._$Cl=a),a!==void 0&&(e=E(i,a._$AS(i,e.values),a,n)),e}class Fe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,a=(e?.creationScope??w).importNode(t,!0);k.currentNode=a;let o=k.nextNode(),r=0,s=0,c=n[0];for(;c!==void 0;){if(r===c.index){let d;c.type===2?d=new O(o,o.nextSibling,this,e):c.type===1?d=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(d=new qe(o,this,e)),this._$AV.push(d),c=n[++s]}r!==c?.index&&(o=k.nextNode(),r++)}return k.currentNode=w,a}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class O{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,a){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),N(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==M&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ke(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,a=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=z.createElement(ke(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===a)this._$AH.p(t);else{const o=new Fe(a,this),r=o.u(this.options);o.p(t),this.T(r),this._$AH=o}}_$AC(e){let t=Ae.get(e.strings);return t===void 0&&Ae.set(e.strings,t=new z(e)),t}k(e){te(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,a=0;for(const o of e)a===t.length?t.push(n=new O(this.O(D()),this.O(D()),this,this.options)):n=t[a],n._$AI(o),a++;a<t.length&&(this._$AR(n&&n._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const n=pe(e).nextSibling;pe(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,a,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=h}_$AI(e,t=this,n,a){const o=this.strings;let r=!1;if(o===void 0)e=E(this,e,t,0),r=!N(e)||e!==this._$AH&&e!==M,r&&(this._$AH=e);else{const s=e;let c,d;for(e=o[0],c=0;c<o.length-1;c++)d=E(this,s[n+c],t,c),d===M&&(d=this._$AH[c]),r||=!N(d)||d!==this._$AH[c],d===h?e=h:e!==h&&(e+=(d??"")+o[c+1]),this._$AH[c]=d}r&&!a&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ve extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Xe extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Ze extends J{constructor(e,t,n,a,o){super(e,t,n,a,o),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??h)===M)return;const n=this._$AH,a=e===h&&n!==h||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==h&&(n===h||a);a&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class qe{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}}const We=ee.litHtmlPolyfillSupport;We?.(z,O),(ee.litHtmlVersions??=[]).push("3.3.3");const et=(i,e,t)=>{const n=t?.renderBefore??e;let a=n._$litPart$;if(a===void 0){const o=t?.renderBefore??null;n._$litPart$=a=new O(e.insertBefore(D(),o),o,void 0,t??{})}return a._$AI(i),a};const ne=globalThis;class I extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}}I._$litElement$=!0,I.finalized=!0,ne.litElementHydrateSupport?.({LitElement:I});const tt=ne.litElementPolyfillSupport;tt?.({LitElement:I}),(ne.litElementVersions??=[]).push("4.2.2");const it=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};const nt={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:W},at=(i=nt,e,t)=>{const{kind:n,metadata:a}=t;let o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),n==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),n==="accessor"){const{name:r}=t;return{set(s){const c=e.get.call(this);e.set.call(this,s),this.requestUpdate(r,c,i,!0,s)},init(s){return s!==void 0&&this.C(r,void 0,i,s),s}}}if(n==="setter"){const{name:r}=t;return function(s){const c=this[r];e.call(this,s),this.requestUpdate(r,c,i,!0,s)}}throw Error("Unsupported decorator location: "+n)};function G(i){return(e,t)=>typeof t=="object"?at(i,e,t):((n,a,o)=>{const r=a.hasOwnProperty(o);return a.constructor.createProperty(o,n),r?Object.getOwnPropertyDescriptor(a,o):void 0})(i,e,t)}function K(i){return G({...i,state:!0,attribute:!1})}const ot={ja:{open:"アクセシビリティ設定を開く",close:"アクセシビリティ設定を閉じる",title:"表示サポート",subtitle:"見やすさを、あなた好みに。",language:"表示言語",appearance:"文字と表示",colorModes:"カラーモード",colorModeHint:"見やすい配色を1つ選べます",colorDefault:"標準",colorDark:"ダーク",colorLight:"ライト",colorHighContrast:"高コントラスト",colorMonochrome:"モノクロ",colorSaturated:"鮮やか",focus:"集中サポート",textSize:"文字サイズ",textSizeHint:"ページの文字を拡大します",decrease:"文字を小さくする",increase:"文字を大きくする",spacing:"ゆったり表示",spacingHint:"行間と文字間を広げます",highlightLinks:"リンクを強調",highlightLinksHint:"リンクに下線と背景色を加えます",highContrast:"高コントラスト",highContrastHint:"白と黒を基調に情報をくっきり表示します",readableFont:"読みやすいフォント",readableFontHint:"文字の形を判別しやすい書体に切り替えます",reduceMotion:"動きを減らす",reduceMotionHint:"アニメーションと画面効果を抑えます",readingGuide:"リーディングガイド",readingGuideHint:"ポインター位置に読み取り線を表示します",readingMask:"リーディングマスク",readingMaskHint:"読んでいる行以外を暗くします",audioMedia:"音声とメディア",speech:"音声読み上げ",speechHint:"ページ本文を先頭から読み上げます",speechStopHint:"読み上げを停止します",speechStarted:"音声読み上げを開始しました",speechStopped:"音声読み上げを停止しました",speechUnavailable:"このブラウザは音声読み上げに対応していません",mediaPaused:"メディアを停止・ミュート",mediaPausedHint:"ページ内の動画と音声をまとめて停止します",reset:"すべてリセット",resetDone:"設定をリセットしました",enabled:"オン",disabled:"オフ",level:"レベル",note:"このツールは表示を調整するもので、サイト自体の適合性を保証するものではありません。"},en:{open:"Open accessibility preferences",close:"Close accessibility preferences",title:"Display support",subtitle:"Make this page comfortable for you.",language:"Language",appearance:"Text & display",colorModes:"Color mode",colorModeHint:"Choose one color presentation",colorDefault:"Default",colorDark:"Dark",colorLight:"Light",colorHighContrast:"High contrast",colorMonochrome:"Monochrome",colorSaturated:"Vivid",focus:"Focus support",textSize:"Text size",textSizeHint:"Increase the size of page text",decrease:"Decrease text size",increase:"Increase text size",spacing:"Comfortable spacing",spacingHint:"Increase line and letter spacing",highlightLinks:"Highlight links",highlightLinksHint:"Add underlines and a background to links",highContrast:"High contrast",highContrastHint:"Use a crisp black-and-white presentation",readableFont:"Readable font",readableFontHint:"Use letterforms designed for easier recognition",reduceMotion:"Reduce motion",reduceMotionHint:"Limit animations and motion effects",readingGuide:"Reading guide",readingGuideHint:"Show a guide at the pointer position",readingMask:"Reading mask",readingMaskHint:"Dim the page outside the current line",audioMedia:"Audio & media",speech:"Read page aloud",speechHint:"Read the main page content from the beginning",speechStopHint:"Stop reading the page aloud",speechStarted:"Reading started",speechStopped:"Reading stopped",speechUnavailable:"Text-to-speech is not supported by this browser",mediaPaused:"Stop & mute media",mediaPausedHint:"Pause and mute all audio and video on this page",reset:"Reset all",resetDone:"Preferences reset",enabled:"On",disabled:"Off",level:"Level",note:"This tool adjusts presentation. It does not guarantee that the website itself conforms to accessibility standards."}},rt=i=>i==="ja"||i==="en",Y=(i,e="ja")=>rt(i)?i:e,st=(i,e)=>ot[Y(i)][e],$e="nanairo-a11y-page-styles",F="nanairo-a11y-reading-guide",V="nanairo-a11y-reading-mask",ct=`
html[data-nanairo-text-scale="1"] { font-size: 112.5%; }
html[data-nanairo-text-scale="2"] { font-size: 125%; }
html[data-nanairo-text-scale="3"] { font-size: 150%; }
html[data-nanairo-text-scale="4"] { font-size: 175%; }

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

#${F} {
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

#${V} {
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
`;let C=!1,B;const T=new Map;function lt(){if(!document.head||document.getElementById($e))return;const i=document.createElement("style");i.id=$e,i.textContent=ct,document.head.append(i)}function Se(i){let e=document.getElementById(i);return e||(e=document.createElement("div"),e.id=i,e.setAttribute("aria-hidden","true"),document.body.append(e)),e}function ae(i){const e=`${i.clientY}px`;document.documentElement.style.setProperty("--nanairo-guide-y",e),document.documentElement.style.setProperty("--nanairo-mask-y",e)}function Me(i){T.has(i)||T.set(i,{muted:i.muted,paused:i.paused}),i.pause(),i.muted=!0}function Ee(i,e){i instanceof HTMLMediaElement&&e(i),i instanceof Element&&i.querySelectorAll("audio, video").forEach(e)}function dt(i){Ee(i,Me)}function ht(i){Ee(i,e=>{e.isConnected||T.delete(e)})}function Ce(i){if(i){document.querySelectorAll("audio, video").forEach(Me),!B&&document.body&&(B=new MutationObserver(e=>{e.forEach(t=>{t.addedNodes.forEach(dt),t.removedNodes.forEach(ht)})}),B.observe(document.body,{childList:!0,subtree:!0}));return}B?.disconnect(),B=void 0,T.forEach((e,t)=>{t.isConnected&&(t.muted=e.muted,e.paused||t.play().catch(()=>{}))}),T.clear()}function Pe(i){if(!document.body)return;lt();const e=document.documentElement;e.dataset.nanairoTextScale=String(i.textScale),e.dataset.nanairoSpacing=i.comfortableSpacing?"comfortable":"default",e.dataset.nanairoLinks=i.highlightLinks?"highlight":"default";const t=i.colorMode==="default"&&i.highContrast?"high-contrast":i.colorMode;e.dataset.nanairoColor=t,e.dataset.nanairoContrast=t==="high-contrast"?"high":"default",e.dataset.nanairoFont=i.readableFont?"readable":"default",e.dataset.nanairoMotion=i.reduceMotion?"reduce":"default",Ce(i.mediaPaused);const n=i.readingGuide?Se(F):document.getElementById(F),a=i.readingMask?Se(V):document.getElementById(V);n&&(n.hidden=!i.readingGuide),a&&(a.hidden=!i.readingMask);const o=i.readingGuide||i.readingMask;o&&!C?(document.addEventListener("pointermove",ae,{passive:!0}),C=!0):!o&&C&&(document.removeEventListener("pointermove",ae),C=!1)}function pt(){const i=document.documentElement;delete i.dataset.nanairoTextScale,delete i.dataset.nanairoSpacing,delete i.dataset.nanairoLinks,delete i.dataset.nanairoColor,delete i.dataset.nanairoContrast,delete i.dataset.nanairoFont,delete i.dataset.nanairoMotion,Ce(!1),i.style.removeProperty("--nanairo-guide-y"),i.style.removeProperty("--nanairo-mask-y"),document.getElementById(F)?.remove(),document.getElementById(V)?.remove(),C&&(document.removeEventListener("pointermove",ae),C=!1)}const _e="h1, h2, h3, h4, h5, h6, p, li, dt, dd, blockquote, figcaption, caption, th, td, summary",ut=220,ft="。．！？!?.",gt=/[\s"')\]]/;function mt(i){const e=[];let t=0;for(let n=0;n<i.length;n+=1){const a=i[n],o=a==="。"||a==="．"||a==="！"||a==="？",r=(a==="!"||a==="?"||a===".")&&(n+1>=i.length||gt.test(i[n+1]));if(!o&&!r)continue;let s=n+1;for(;s<i.length&&ft.includes(i[s]);)s+=1;i[s]===" "&&(s+=1),e.push(i.slice(t,s)),t=s,n=s-1}return t<i.length&&e.push(i.slice(t)),e}function bt(i,e=ut){const t=i.replace(/\s+/g," ").trim();if(!t)return[];if(t.length<=e)return[t];const n=[];let a="";const o=()=>{const r=a.trim();r&&n.push(r),a=""};for(const r of mt(t)){if(r.length>e){o();let s=r;for(;s.length>e;){const c=s.slice(0,e).lastIndexOf(" "),d=c>e*.6?c:e,p=s.slice(0,d).trim();p&&n.push(p),s=s.slice(d)}a=s;continue}(a+r).length>e&&o(),a+=r}return o(),n}function yt(i){return i.hidden||i.closest('[aria-hidden="true"], nanairo-accessibility')||typeof i.checkVisibility=="function"&&!i.checkVisibility()?!1:i.querySelector(_e)===null}function xt(i){const e=[];return i.querySelectorAll(_e).forEach(t=>{yt(t)&&e.push(...bt(t.textContent??""))}),e}const He="nanairo:a11y:preferences:v1",oe=(i="ja")=>({schemaVersion:1,locale:i,textScale:0,comfortableSpacing:!1,highlightLinks:!1,highContrast:!1,colorMode:"default",readableFont:!1,reduceMotion:!1,readingGuide:!1,readingMask:!1,mediaPaused:!1}),vt=i=>i==="default"||i==="dark"||i==="light"||i==="high-contrast"||i==="monochrome"||i==="saturated",b=i=>i===!0,wt=i=>{const e=typeof i=="number"?i:Number(i);return Number.isFinite(e)?Math.min(4,Math.max(0,Math.round(e))):0};function At(i){const e=oe(i);let t;try{const a=localStorage.getItem(He);if(!a)return e;const o=JSON.parse(a);if(typeof o!="object"||o===null||Array.isArray(o))return e;t=o}catch{return e}if(t.schemaVersion!==1)return e;const n=vt(t.colorMode)?t.colorMode:b(t.highContrast)?"high-contrast":"default";return{schemaVersion:1,locale:Y(t.locale,i),textScale:wt(t.textScale),comfortableSpacing:b(t.comfortableSpacing),highlightLinks:b(t.highlightLinks),highContrast:n==="high-contrast",colorMode:n,readableFont:b(t.readableFont),reduceMotion:b(t.reduceMotion),readingGuide:b(t.readingGuide),readingMask:b(t.readingMask),mediaPaused:b(t.mediaPaused)}}function kt(i){try{localStorage.setItem(He,JSON.stringify(i))}catch{}}const $t="data:image/png;base64,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",St="data:image/png;base64,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";var Mt=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,y=(i,e,t,n)=>{for(var a=n>1?void 0:n?Et(e,t):e,o=i.length-1,r;o>=0;o--)(r=i[o])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&Mt(e,t,a),a};let Ct=0,P;const _=[{value:"default",label:"colorDefault"},{value:"dark",label:"colorDark"},{value:"light",label:"colorLight"},{value:"high-contrast",label:"colorHighContrast"},{value:"monochrome",label:"colorMonochrome"},{value:"saturated",label:"colorSaturated"}],x=i=>{const e={spark:u`<path d="M12 2.75c.62 3.67 2.58 5.63 6.25 6.25-3.67.62-5.63 2.58-6.25 6.25C11.38 11.58 9.42 9.62 5.75 9 9.42 8.38 11.38 6.42 12 2.75Z"></path><path d="M18.4 14.3c.28 1.66 1.17 2.55 2.83 2.83-1.66.28-2.55 1.17-2.83 2.83-.28-1.66-1.17-2.55-2.83-2.83 1.66-.28 2.55-1.17 2.83-2.83Z"></path>`,accessibility:u`<circle cx="12" cy="12" r="9.25"></circle><circle cx="12" cy="7" r="1.35" fill="currentColor" stroke="none"></circle><path d="M6.8 10.2c3.5 1.15 6.9 1.15 10.4 0M12 10.7v4M12 14.7 8.8 19M12 14.7l3.2 4.3"></path>`,close:u`<path d="m7 7 10 10M17 7 7 17"></path>`,minus:u`<path d="M6 12h12"></path>`,plus:u`<path d="M12 6v12M6 12h12"></path>`,type:u`<path d="M5 6h10M10 6v12M7 18h6M16.5 11h3M18 11v7m-2 0h4"></path>`,spacing:u`<path d="M7 4v16M4.5 6.5 7 4l2.5 2.5M4.5 17.5 7 20l2.5-2.5M12 7h8M12 12h8M12 17h8"></path>`,link:u`<path d="m9.5 14.5 5-5M7.8 16.2l-1.2 1.2a3.4 3.4 0 0 1-4.8-4.8l3.1-3.1a3.4 3.4 0 0 1 4.8 0M16.2 7.8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8l-3.1 3.1a3.4 3.4 0 0 1-4.8 0"></path>`,contrast:u`<circle cx="12" cy="12" r="8.5"></circle><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17Z" fill="currentColor" stroke="none"></path>`,font:u`<path d="M4 18 9 5l5 13M6 13h6M14.5 10h5M17 10v8m-2.5 0h5"></path>`,motion:u`<path d="M5 8.5c2.2-4.4 9-5.1 12.3-1.4 3.2 3.5 1.2 9.3-3.3 10.4-3.7.9-7.5-1.6-7.8-5.4M2.8 5.4 5 8.5l3.6-1"></path>`,guide:u`<path d="M3 7h18M3 17h18M6 12h12"></path>`,mask:u`<path d="M4 4h16v16H4zM4 9h16M4 15h16"></path>`,speech:u`<path d="M5 10v4h3l4 3V7L8 10H5ZM15 9.2a4 4 0 0 1 0 5.6M17.5 6.8a7.3 7.3 0 0 1 0 10.4"></path>`,media:u`<rect x="3.5" y="5" width="17" height="14" rx="2.5"></rect><path d="m9 9.2 5 2.8-5 2.8V9.2ZM4 4l16 16"></path>`,reset:u`<path d="M4.5 8A8 8 0 1 1 4 14M4.5 8V3.5M4.5 8H9"></path>`};return S`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${e[i]}</svg>`};f.NanairoAccessibility=class extends I{constructor(){super(...arguments),this.locale="ja",this.position="right",this.showBranding=!0,this.open=!1,this.preferences=oe(),this.announcement="",this.speaking=!1,this.panelId=`nanairo-a11y-panel-${++Ct}`,this.initialized=!1,this.speechQueue=[],this.speechSession=0,this.handleDocumentPointerDown=e=>{this.open&&!e.composedPath().includes(this)&&this.closePanel(!1)},this.handlePageHide=()=>{this.stopSpeech(!1)},this.handleKeyDown=e=>{e.key==="Escape"&&this.open&&(e.preventDefault(),this.closePanel(!0))},this.handleColorModeKeyDown=e=>{const t=e.key==="ArrowRight"||e.key==="ArrowDown"?1:e.key==="ArrowLeft"||e.key==="ArrowUp"?-1:void 0;if(t!==void 0){e.preventDefault(),this.moveColorMode(t);return}(e.key==="Home"||e.key==="End")&&(e.preventDefault(),this.moveColorMode(e.key==="Home"?"first":"last"))}}connectedCallback(){if(P&&P!==this&&P.isConnected){console.warn("[nanairo-accessibility] A widget is already active on this page; the duplicate element was removed."),this.remove();return}P=this,super.connectedCallback(),this.initialized||(this.locale=Y(this.getAttribute("locale")),this.preferences=At(this.locale),this.locale=this.preferences.locale,Pe(this.preferences),this.initialized=!0),document.addEventListener("pointerdown",this.handleDocumentPointerDown),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("pagehide",this.handlePageHide)}disconnectedCallback(){P===this&&(P=void 0),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("pagehide",this.handlePageHide),this.stopSpeech(!1),super.disconnectedCallback()}willUpdate(e){if(e.has("locale")){const t=Y(this.locale);t!==this.locale&&(this.locale=t)}e.has("position")&&this.position!=="left"&&this.position!=="right"&&(this.position="right")}t(e){return st(this.locale,e)}commit(e){this.preferences=e,this.locale=e.locale,kt(e),Pe(e),this.dispatchEvent(new CustomEvent("nanairo-change",{detail:e,bubbles:!0,composed:!0}))}async openPanel(){this.open=!0,await this.updateComplete,this.renderRoot.querySelector(".close-button")?.focus()}async showPanel(){await this.openPanel()}async closePanel(e){this.open=!1,await this.updateComplete,e&&this.renderRoot.querySelector(".launcher")?.focus()}selectLocale(e){this.stopSpeech(!1),this.commit({...this.preferences,locale:e})}setScale(e){const t=Math.max(0,Math.min(4,this.preferences.textScale+e));this.commit({...this.preferences,textScale:t})}toggle(e){this.commit({...this.preferences,[e]:!this.preferences[e]})}colorModeButtons(){return Array.from(this.renderRoot.querySelectorAll('.color-mode-grid [role="radio"]'))}async moveColorMode(e){const t=_.findIndex(({value:a})=>a===this.preferences.colorMode),n=e==="first"?0:e==="last"?_.length-1:(Math.max(0,t)+e+_.length)%_.length;this.setColorMode(_[n].value),await this.updateComplete,this.colorModeButtons()[n]?.focus()}setColorMode(e){this.commit({...this.preferences,colorMode:e,highContrast:e==="high-contrast"})}pageSpeechSegments(){const e=document.querySelector("main")??document.body;return e?xt(e):[]}speakNext(e){if(e!==this.speechSession)return;const t=this.speechQueue.shift();if(!t){this.speaking=!1;return}const n=new SpeechSynthesisUtterance(t);n.lang=this.locale==="ja"?"ja-JP":"en-US",n.rate=.92,n.onend=()=>this.speakNext(e),n.onerror=()=>{e===this.speechSession&&(this.speaking=!1)},window.speechSynthesis.speak(n)}toggleSpeech(){if(this.speaking){this.stopSpeech(!0);return}if(!("speechSynthesis"in window)||typeof SpeechSynthesisUtterance>"u"){this.announcement=this.t("speechUnavailable");return}if(this.speechQueue=this.pageSpeechSegments(),!this.speechQueue.length)return;const e=++this.speechSession;this.speaking=!0,this.announcement=this.t("speechStarted"),window.speechSynthesis.cancel(),this.speakNext(e)}stopSpeech(e){!this.speaking&&!this.speechQueue.length||(this.speechSession+=1,this.speechQueue=[],this.speaking=!1,"speechSynthesis"in window&&window.speechSynthesis.cancel(),e&&(this.announcement=this.t("speechStopped")))}reset(){this.stopSpeech(!1),this.commit(oe(this.locale)),this.announcement=this.t("resetDone"),window.setTimeout(()=>{this.announcement=""},1800)}resetPreferences(){this.reset()}destroy(){pt(),this.remove()}renderToggle(e,t,n,a){const o=this.preferences[e];return S`
      <button
        class="preference-row ${o?"active":""}"
        type="button"
        aria-pressed=${o}
        @click=${()=>this.toggle(e)}
      >
        <span class="feature-icon">${x(t)}</span>
        <span class="preference-copy">
          <span class="preference-title">${this.t(n)}</span>
          <span class="preference-hint">${this.t(a)}</span>
        </span>
        <span class="switch" aria-hidden="true"><span></span></span>
      </button>
    `}render(){const e=[100,112,125,150,175][this.preferences.textScale];return S`
      <button
        class="launcher"
        type="button"
        aria-label=${this.open?this.t("close"):this.t("open")}
        title=${this.open?this.t("close"):this.t("open")}
        aria-expanded=${this.open}
        aria-controls=${this.panelId}
        @click=${()=>this.open?this.closePanel(!1):this.openPanel()}
      >
        <span class="launcher-mark" aria-hidden="true">${x("accessibility")}</span>
        <span class="launcher-label" aria-hidden="true"><span>表示</span><span>サポート</span></span>
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
              <span class="brand-mark" aria-hidden="true"><img src=${$t} alt="" /></span>
              <span>
                <strong id="nanairo-panel-title">${this.t("title")}</strong>
                <small>${this.t("subtitle")}</small>
              </span>
            </div>
            <button class="icon-button close-button" type="button" aria-label=${this.t("close")} @click=${()=>this.closePanel(!0)}>
              ${x("close")}
            </button>
          </header>

          <div class="panel-scroll">
            <div class="section-heading">${this.t("appearance")}</div>

            <div class="scale-card">
              <div class="scale-heading">
                <span class="feature-icon">${x("type")}</span>
                <span class="preference-copy">
                  <span class="preference-title">${this.t("textSize")}</span>
                  <span class="preference-hint">${this.t("textSizeHint")}</span>
                </span>
                <output aria-live="polite">${e}%</output>
              </div>
              <div class="stepper">
                <button type="button" aria-label=${this.t("decrease")} ?disabled=${this.preferences.textScale===0} @click=${()=>this.setScale(-1)}>
                  ${x("minus")}
                </button>
                <div class="steps" aria-hidden="true">
                  ${[0,1,2,3,4].map(t=>S`<span class=${t<=this.preferences.textScale?"filled":""}></span>`)}
                </div>
                <button type="button" aria-label=${this.t("increase")} ?disabled=${this.preferences.textScale===4} @click=${()=>this.setScale(1)}>
                  ${x("plus")}
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
              ${_.map(({value:t,label:n})=>S`
                <button
                  class="color-mode ${this.preferences.colorMode===t?"active":""}"
                  type="button"
                  role="radio"
                  aria-checked=${this.preferences.colorMode===t}
                  tabindex=${this.preferences.colorMode===t?0:-1}
                  @click=${()=>this.setColorMode(t)}
                >
                  <span class="color-swatch swatch-${t}" aria-hidden="true"><span></span></span>
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
                <span class="feature-icon">${x("speech")}</span>
                <span class="preference-copy">
                  <span class="preference-title">${this.t("speech")}</span>
                  <span class="preference-hint">${this.t(this.speaking?"speechStopHint":"speechHint")}</span>
                </span>
                <span class="switch" aria-hidden="true"><span></span></span>
              </button>
              ${this.renderToggle("mediaPaused","media","mediaPaused","mediaPausedHint")}
            </div>

            <p class="note">${this.t("note")}</p>

            <div class="language-field">
              <label for="${this.panelId}-language">${this.t("language")}</label>
              <select
                id="${this.panelId}-language"
                .value=${this.locale}
                @change=${t=>this.selectLocale(t.target.value)}
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <footer class="panel-footer">
            <button class="reset-button" type="button" @click=${this.reset}>${x("reset")}<span>${this.t("reset")}</span></button>
            ${this.showBranding?S`
              <span class="footer-brand">
                <span class="powered-by">Powered by</span>
                <img src=${St} alt="NANAiRO" />
              </span>
            `:h}
          </footer>
          <span class="sr-only" aria-live="polite">${this.announcement||h}</span>
      </section>
    `}},f.NanairoAccessibility.styles=ze`
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
      :host { --drawer-width: calc(100vw - 42px); }
      .launcher { width: 108px; min-height: 51px; gap: 8px; padding: 7px 10px 7px 8px; border-radius: 10px 0 0 10px; }
      :host([position="left"]) .launcher { border-radius: 0 11px 11px 0; }
      .launcher:hover { width: 114px; }
      .launcher-mark { width: 32px; height: 32px; }
      .launcher-mark svg { width: 20px; height: 20px; }
      .launcher-label { font-size: 9px; }
      .launcher[aria-expanded="true"] { right: var(--drawer-width); width: 42px; min-height: 58px; border-radius: 11px 0 0 11px; }
      .launcher[aria-expanded="true"]:hover { width: 42px; }
      :host([position="left"]) .launcher[aria-expanded="true"] { right: auto; left: var(--drawer-width); border-radius: 0 12px 12px 0; }
      .panel { border-radius: 24px 0 0 24px; }
      :host([position="left"]) .panel { border-radius: 0 24px 24px 0; }
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
  `,y([G({type:String,reflect:!0})],f.NanairoAccessibility.prototype,"locale",2),y([G({type:String,reflect:!0})],f.NanairoAccessibility.prototype,"position",2),y([G({type:Boolean,attribute:"show-branding"})],f.NanairoAccessibility.prototype,"showBranding",2),y([K()],f.NanairoAccessibility.prototype,"open",2),y([K()],f.NanairoAccessibility.prototype,"preferences",2),y([K()],f.NanairoAccessibility.prototype,"announcement",2),y([K()],f.NanairoAccessibility.prototype,"speaking",2),f.NanairoAccessibility=y([it("nanairo-accessibility")],f.NanairoAccessibility);const De=i=>({locale:i.locale==="en"?"en":"ja",position:i.position==="left"?"left":"right",showBranding:i.showBranding!==!1&&i.showBranding!=="false"});function re(i={}){const e=document.querySelector("nanairo-accessibility");if(e)return e;const t=document.createElement("nanairo-accessibility");t.setAttribute("locale",i.locale==="en"?"en":"ja"),t.setAttribute("position",i.position==="left"?"left":"right"),t.showBranding=i.showBranding??!0;const n=()=>{document.body.append(t)};return document.body?n():document.addEventListener("DOMContentLoaded",n,{once:!0}),t}const Ne=document.querySelector("script[data-nanairo-auto]");if(Ne)re(De(Ne.dataset));else{const i=window.nanairoAccessibilitySettings;i&&typeof i=="object"&&re(De(i))}return f.init=re,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}),f})({});
