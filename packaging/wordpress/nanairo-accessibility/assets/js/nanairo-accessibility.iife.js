var NanairoAccessibility=(function(f){"use strict";const K=globalThis,te=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol(),fe=new WeakMap;let me=class{constructor(e,a,i){if(this._$cssResult$=!0,i!==ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(te&&e===void 0){const i=a!==void 0&&a.length===1;i&&(e=fe.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&fe.set(a,e))}return e}toString(){return this.cssText}};const Fe=t=>new me(typeof t=="string"?t:t+"",void 0,ae),Ye=(t,...e)=>{const a=t.length===1?t[0]:e.reduce((i,n,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1],t[0]);return new me(a,t,ae)},Xe=(t,e)=>{if(te)t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const i=document.createElement("style"),n=K.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=a.cssText,t.appendChild(i)}},be=te?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(const i of e.cssRules)a+=i.cssText;return Fe(a)})(t):t;const{is:Ve,defineProperty:Ze,getOwnPropertyDescriptor:We,getOwnPropertyNames:et,getOwnPropertySymbols:tt,getPrototypeOf:at}=Object,G=globalThis,ye=G.trustedTypes,it=ye?ye.emptyScript:"",nt=G.reactiveElementPolyfillSupport,T=(t,e)=>t,q={toAttribute(t,e){switch(e){case Boolean:t=t?it:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},ie=(t,e)=>!Ve(t,e),ve={attribute:!0,type:String,converter:q,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??=Symbol("metadata"),G.litPropertyMetadata??=new WeakMap;let P=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=ve){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,a);n!==void 0&&Ze(this.prototype,e,n)}}static getPropertyDescriptor(e,a,i){const{get:n,set:r}=We(this.prototype,e)??{get(){return this[a]},set(o){this[a]=o}};return{get:n,set(o){const s=n?.call(this);r?.call(this,o),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ve}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;const e=at(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){const a=this.properties,i=[...et(a),...tt(a)];for(const n of i)this.createProperty(n,a[n])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[i,n]of a)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[a,i]of this.elementProperties){const n=this._$Eu(a,i);n!==void 0&&this._$Eh.set(n,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)a.unshift(be(n))}else e!==void 0&&a.push(be(e));return a}static _$Eu(e,a){const i=a.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const i of a.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,a,i){this._$AK(e,i)}_$ET(e,a){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:q).toAttribute(a,i.type);this._$Em=e,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,a){const i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const r=i.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:q;this._$Em=n;const s=o.fromAttribute(a,r.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(e,a,i,n=!1,r){if(e!==void 0){const o=this.constructor;if(n===!1&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??ie)(r,a)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,a,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:i,reflect:n,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??a??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(a=void 0),this._$AL.set(e,a)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,r]of i){const{wrapped:o}=r,s=this[n];o!==!0||this._$AL.has(n)||s===void 0||this.C(n,void 0,r,s)}}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(a)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(a)}willUpdate(e){}_$AE(e){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(e){}firstUpdated(e){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[T("elementProperties")]=new Map,P[T("finalized")]=new Map,nt?.({ReactiveElement:P}),(G.reactiveElementVersions??=[]).push("2.1.2");const ne=globalThis,xe=t=>t,F=ne.trustedTypes,we=F?F.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ae="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,ke="?"+A,rt=`<${ke}>`,S=document,U=()=>S.createComment(""),I=t=>t===null||typeof t!="object"&&typeof t!="function",re=Array.isArray,ot=t=>re(t)||typeof t?.[Symbol.iterator]=="function",oe=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$e=/-->/g,Se=/>/g,M=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Ee=/"/g,Ce=/^(?:script|style|textarea|title)$/i,Pe=t=>(e,...a)=>({_$litType$:t,strings:e,values:a}),k=Pe(1),g=Pe(2),N=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ne=new WeakMap,E=S.createTreeWalker(S,129);function _e(t,e){if(!re(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return we!==void 0?we.createHTML(e):e}const st=(t,e)=>{const a=t.length-1,i=[];let n,r=e===2?"<svg>":e===3?"<math>":"",o=O;for(let s=0;s<a;s++){const l=t[s];let h,p,c=-1,b=0;for(;b<l.length&&(o.lastIndex=b,p=o.exec(l),p!==null);)b=o.lastIndex,o===O?p[1]==="!--"?o=$e:p[1]!==void 0?o=Se:p[2]!==void 0?(Ce.test(p[2])&&(n=RegExp("</"+p[2],"g")),o=M):p[3]!==void 0&&(o=M):o===M?p[0]===">"?(o=n??O,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?M:p[3]==='"'?Ee:Me):o===Ee||o===Me?o=M:o===$e||o===Se?o=O:(o=M,n=void 0);const y=o===M&&t[s+1].startsWith("/>")?" ":"";r+=o===O?l+rt:c>=0?(i.push(h),l.slice(0,c)+Ae+l.slice(c)+A+y):l+A+(c===-2?s:y)}return[_e(t,r+(t[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class R{constructor({strings:e,_$litType$:a},i){let n;this.parts=[];let r=0,o=0;const s=e.length-1,l=this.parts,[h,p]=st(e,a);if(this.el=R.createElement(h,i),E.currentNode=this.el.content,a===2||a===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(n=E.nextNode())!==null&&l.length<s;){if(n.nodeType===1){if(n.hasAttributes())for(const c of n.getAttributeNames())if(c.endsWith(Ae)){const b=p[o++],y=n.getAttribute(c).split(A),C=/([.?@])?(.*)/.exec(b);l.push({type:1,index:r,name:C[2],strings:y,ctor:C[1]==="."?ct:C[1]==="?"?dt:C[1]==="@"?ht:Y}),n.removeAttribute(c)}else c.startsWith(A)&&(l.push({type:6,index:r}),n.removeAttribute(c));if(Ce.test(n.tagName)){const c=n.textContent.split(A),b=c.length-1;if(b>0){n.textContent=F?F.emptyScript:"";for(let y=0;y<b;y++)n.append(c[y],U()),E.nextNode(),l.push({type:2,index:++r});n.append(c[b],U())}}}else if(n.nodeType===8)if(n.data===ke)l.push({type:2,index:r});else{let c=-1;for(;(c=n.data.indexOf(A,c+1))!==-1;)l.push({type:7,index:r}),c+=A.length-1}r++}}static createElement(e,a){const i=S.createElement("template");return i.innerHTML=e,i}}function _(t,e,a=t,i){if(e===N)return e;let n=i!==void 0?a._$Co?.[i]:a._$Cl;const r=I(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(t),n._$AT(t,a,i)),i!==void 0?(a._$Co??=[])[i]=n:a._$Cl=n),n!==void 0&&(e=_(t,n._$AS(t,e.values),n,i)),e}class lt{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:a},parts:i}=this._$AD,n=(e?.creationScope??S).importNode(a,!0);E.currentNode=n;let r=E.nextNode(),o=0,s=0,l=i[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new L(r,r.nextSibling,this,e):l.type===1?h=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(h=new pt(r,this,e)),this._$AV.push(h),l=i[++s]}o!==l?.index&&(r=E.nextNode(),o++)}return E.currentNode=S,n}p(e){let a=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,a),a+=i.strings.length-2):i._$AI(e[a])),a++}}class L{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,a,i,n){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&e?.nodeType===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=_(this,e,a),I(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==N&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ot(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){const{values:a,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=R.createElement(_e(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(a);else{const r=new lt(n,this),o=r.u(this.options);r.p(a),this.T(o),this._$AH=r}}_$AC(e){let a=Ne.get(e.strings);return a===void 0&&Ne.set(e.strings,a=new R(e)),a}k(e){re(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let i,n=0;for(const r of e)n===a.length?a.push(i=new L(this.O(U()),this.O(U()),this,this.options)):i=a[n],i._$AI(r),n++;n<a.length&&(this._$AR(i&&i._$AB.nextSibling,n),a.length=n)}_$AR(e=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);e!==this._$AB;){const i=xe(e).nextSibling;xe(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,i,n,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=a,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(e,a=this,i,n){const r=this.strings;let o=!1;if(r===void 0)e=_(this,e,a,0),o=!I(e)||e!==this._$AH&&e!==N,o&&(this._$AH=e);else{const s=e;let l,h;for(e=r[0],l=0;l<r.length-1;l++)h=_(this,s[i+l],a,l),h===N&&(h=this._$AH[l]),o||=!I(h)||h!==this._$AH[l],h===u?e=u:e!==u&&(e+=(h??"")+r[l+1]),this._$AH[l]=h}o&&!n&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ct extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class dt extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class ht extends Y{constructor(e,a,i,n,r){super(e,a,i,n,r),this.type=5}_$AI(e,a=this){if((e=_(this,e,a,0)??u)===N)return;const i=this._$AH,n=e===u&&i!==u||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==u&&(i===u||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class pt{constructor(e,a,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){_(this,e)}}const ut=ne.litHtmlPolyfillSupport;ut?.(R,L),(ne.litHtmlVersions??=[]).push("3.3.3");const gt=(t,e,a)=>{const i=a?.renderBefore??e;let n=i._$litPart$;if(n===void 0){const r=a?.renderBefore??null;i._$litPart$=n=new L(e.insertBefore(U(),r),r,void 0,a??{})}return n._$AI(t),n};const se=globalThis;class B extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=gt(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}}B._$litElement$=!0,B.finalized=!0,se.litElementHydrateSupport?.({LitElement:B});const ft=se.litElementPolyfillSupport;ft?.({LitElement:B}),(se.litElementVersions??=[]).push("4.2.2");const mt=t=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const bt={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:ie},yt=(t=bt,e,a)=>{const{kind:i,metadata:n}=a;let r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(a.name,t),i==="accessor"){const{name:o}=a;return{set(s){const l=e.get.call(this);e.set.call(this,s),this.requestUpdate(o,l,t,!0,s)},init(s){return s!==void 0&&this.C(o,void 0,t,s),s}}}if(i==="setter"){const{name:o}=a;return function(s){const l=this[o];e.call(this,s),this.requestUpdate(o,l,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function X(t){return(e,a)=>typeof a=="object"?yt(t,e,a):((i,n,r)=>{const o=n.hasOwnProperty(r);return n.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(n,r):void 0})(t,e,a)}function j(t){return X({...t,state:!0,attribute:!1})}const vt={ja:{open:"アクセシビリティ設定を開く",close:"アクセシビリティ設定を閉じる",title:"表示サポート",subtitle:"見やすさを、あなた好みに。",language:"表示言語",appearance:"文字と表示",colorModes:"カラーモード",colorModeHint:"見やすい配色を1つ選べます",colorDefault:"標準",colorDark:"ダーク",colorLight:"ライト",colorHighContrast:"高コントラスト",colorMonochrome:"モノクロ",colorSaturated:"鮮やか",focus:"集中サポート",textSize:"文字サイズ",textSizeHint:"ページの文字を拡大します",decrease:"文字を小さくする",increase:"文字を大きくする",spacing:"ゆったり表示",spacingHint:"行間と文字間を広げます",highlightLinks:"リンクを強調",highlightLinksHint:"リンクに下線と背景色を加えます",highContrast:"高コントラスト",highContrastHint:"白と黒を基調に情報をくっきり表示します",readableFont:"読みやすいフォント",readableFontHint:"文字の形を判別しやすい書体に切り替えます",reduceMotion:"動きを減らす",reduceMotionHint:"アニメーションと画面効果を抑えます",readingGuide:"リーディングガイド",readingGuideHint:"ポインター位置に読み取り線を表示します",readingMask:"リーディングマスク",readingMaskHint:"読んでいる行以外を暗くします",audioMedia:"音声とメディア",speech:"音声読み上げ",speechHint:"ページ本文を先頭から読み上げます",speechStopHint:"読み上げを停止します",speechStarted:"音声読み上げを開始しました",speechStopped:"音声読み上げを停止しました",speechUnavailable:"このブラウザは音声読み上げに対応していません",mediaPaused:"メディアを停止・ミュート",mediaPausedHint:"ページ内の動画と音声をまとめて停止します",auditSection:"ページの確認",auditTitle:"簡易アクセシビリティチェック",auditHint:"12項目の問題候補をこのページから探します",auditRun:"このページをチェック",auditDone:"チェックが完了しました",auditWarnings:"項目に問題候補",auditManuals:"項目は目視確認",auditDisclaimer:"自動チェックだけでは適合性を判断できません。結果が0件でも、キーボードとスクリーンリーダーによる確認が必要です。",reset:"すべてリセット",resetDone:"設定をリセットしました",enabled:"オン",disabled:"オフ",level:"レベル",note:"このツールは表示を調整するもので、サイト自体の適合性を保証するものではありません。"},en:{open:"Open accessibility preferences",close:"Close accessibility preferences",title:"Display support",subtitle:"Make this page comfortable for you.",language:"Language",appearance:"Text & display",colorModes:"Color mode",colorModeHint:"Choose one color presentation",colorDefault:"Default",colorDark:"Dark",colorLight:"Light",colorHighContrast:"High contrast",colorMonochrome:"Monochrome",colorSaturated:"Vivid",focus:"Focus support",textSize:"Text size",textSizeHint:"Increase the size of page text",decrease:"Decrease text size",increase:"Increase text size",spacing:"Comfortable spacing",spacingHint:"Increase line and letter spacing",highlightLinks:"Highlight links",highlightLinksHint:"Add underlines and a background to links",highContrast:"High contrast",highContrastHint:"Use a crisp black-and-white presentation",readableFont:"Readable font",readableFontHint:"Use letterforms designed for easier recognition",reduceMotion:"Reduce motion",reduceMotionHint:"Limit animations and motion effects",readingGuide:"Reading guide",readingGuideHint:"Show a guide at the pointer position",readingMask:"Reading mask",readingMaskHint:"Dim the page outside the current line",audioMedia:"Audio & media",speech:"Read page aloud",speechHint:"Read the main page content from the beginning",speechStopHint:"Stop reading the page aloud",speechStarted:"Reading started",speechStopped:"Reading stopped",speechUnavailable:"Text-to-speech is not supported by this browser",mediaPaused:"Stop & mute media",mediaPausedHint:"Pause and mute all audio and video on this page",auditSection:"Page review",auditTitle:"Quick accessibility check",auditHint:"Scan this page for candidates across 12 checks",auditRun:"Check this page",auditDone:"Check complete",auditWarnings:"checks with candidates",auditManuals:"checks need manual review",auditDisclaimer:"Automated checks cannot determine conformance. Keyboard and screen-reader testing are still required even when no candidates are found.",reset:"Reset all",resetDone:"Preferences reset",enabled:"On",disabled:"Off",level:"Level",note:"This tool adjusts presentation. It does not guarantee that the website itself conforms to accessibility standards."}},xt=t=>t==="ja"||t==="en",V=(t,e="ja")=>xt(t)?t:e,wt=(t,e)=>vt[V(t)][e],He="nanairo-a11y-page-styles",Z="nanairo-a11y-reading-guide",W="nanairo-a11y-reading-mask",At=`
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

#${Z} {
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
`;let H=!1,Q;const J=new Map;function kt(){if(!document.head||document.getElementById(He))return;const t=document.createElement("style");t.id=He,t.textContent=At,document.head.append(t)}function De(t){let e=document.getElementById(t);return e||(e=document.createElement("div"),e.id=t,e.setAttribute("aria-hidden","true"),document.body.append(e)),e}function le(t){const e=`${t.clientY}px`;document.documentElement.style.setProperty("--nanairo-guide-y",e),document.documentElement.style.setProperty("--nanairo-mask-y",e)}function ze(t){J.has(t)||J.set(t,{muted:t.muted,paused:t.paused}),t.pause(),t.muted=!0}function Te(t,e){t instanceof HTMLMediaElement&&e(t),t instanceof Element&&t.querySelectorAll("audio, video").forEach(e)}function $t(t){Te(t,ze)}function St(t){Te(t,e=>{e.isConnected||J.delete(e)})}function Ue(t){if(t){document.querySelectorAll("audio, video").forEach(ze),!Q&&document.body&&(Q=new MutationObserver(e=>{e.forEach(a=>{a.addedNodes.forEach($t),a.removedNodes.forEach(St)})}),Q.observe(document.body,{childList:!0,subtree:!0}));return}Q?.disconnect(),Q=void 0,J.forEach((e,a)=>{a.isConnected&&(a.muted=e.muted,e.paused||a.play().catch(()=>{}))}),J.clear()}function Ie(t){if(!document.body)return;kt();const e=document.documentElement;e.dataset.nanairoTextScale=String(t.textScale),e.dataset.nanairoSpacing=t.comfortableSpacing?"comfortable":"default",e.dataset.nanairoLinks=t.highlightLinks?"highlight":"default";const a=t.colorMode==="default"&&t.highContrast?"high-contrast":t.colorMode;e.dataset.nanairoColor=a,e.dataset.nanairoContrast=a==="high-contrast"?"high":"default",e.dataset.nanairoFont=t.readableFont?"readable":"default",e.dataset.nanairoMotion=t.reduceMotion?"reduce":"default",Ue(t.mediaPaused);const i=t.readingGuide?De(Z):document.getElementById(Z),n=t.readingMask?De(W):document.getElementById(W);i&&(i.hidden=!t.readingGuide),n&&(n.hidden=!t.readingMask);const r=t.readingGuide||t.readingMask;r&&!H?(document.addEventListener("pointermove",le,{passive:!0}),H=!0):!r&&H&&(document.removeEventListener("pointermove",le),H=!1)}function Mt(){const t=document.documentElement;delete t.dataset.nanairoTextScale,delete t.dataset.nanairoSpacing,delete t.dataset.nanairoLinks,delete t.dataset.nanairoColor,delete t.dataset.nanairoContrast,delete t.dataset.nanairoFont,delete t.dataset.nanairoMotion,Ue(!1),t.style.removeProperty("--nanairo-guide-y"),t.style.removeProperty("--nanairo-mask-y"),document.getElementById(Z)?.remove(),document.getElementById(W)?.remove(),H&&(document.removeEventListener("pointermove",le),H=!1)}const Et={keyboard:{ja:{label:"キーボード操作",pass:"自動検出範囲では問題なし",warning:"キーボード操作できない可能性のある要素",manual:"すべての操作は目視確認が必要"},en:{label:"Keyboard access",pass:"No automatic issues found",warning:"Potentially inaccessible interactive elements",manual:"Manual keyboard testing is required"}},contrast:{ja:{label:"コントラスト",pass:"測定可能な文字は基準値以上",warning:"基準値未満の可能性がある文字",manual:"画像・グラデーション上の文字は目視確認が必要"},en:{label:"Contrast",pass:"Measurable text meets the threshold",warning:"Text may be below the contrast threshold",manual:"Text over images or gradients needs manual review"}},font:{ja:{label:"フォント",pass:"読みやすいフォントへ切り替え可能",warning:"極端に小さい文字",manual:"文字の判別しやすさは利用者による確認が必要"},en:{label:"Font",pass:"Readable-font mode is available",warning:"Very small text",manual:"Legibility still needs user review"}},links:{ja:{label:"リンクの強調・表現",pass:"リンク名の自動検出範囲では問題なし",warning:"名前がない、または目的が曖昧なリンク",manual:"リンク先形式と別画面表示は目視確認が必要"},en:{label:"Link visibility and purpose",pass:"No automatic link-name issues found",warning:"Unnamed or ambiguous links",manual:"File types and new-window behavior need manual review"}},altText:{ja:{label:"画像の代替テキスト",pass:"alt属性の欠落は見つかりませんでした",warning:"alt属性がない画像",manual:"代替テキストの内容は目視確認が必要"},en:{label:"Image alternative text",pass:"No missing alt attributes found",warning:"Images without an alt attribute",manual:"Alt-text quality needs manual review"}},timeLimits:{ja:{label:"制限時間への対応",pass:"自動更新・カウントダウン候補なし",warning:"制限時間または自動更新の候補",manual:"スクリプト内の制限時間は目視確認が必要"},en:{label:"Time limits",pass:"No refresh or countdown candidates found",warning:"Possible time limit or automatic refresh",manual:"Script-based limits need manual review"}},colorOnly:{ja:{label:"色・形だけに依存した情報",pass:"自動判定対象外",warning:"色だけで示している可能性のある要素",manual:"意味の伝え方は目視確認が必要"},en:{label:"Information conveyed by color or shape",pass:"Not automatically testable",warning:"Elements may rely on color alone",manual:"Meaning and visual cues need manual review"}},readingOrder:{ja:{label:"読み上げ・フォーカス順序",pass:"正のtabindexやCSS orderは見つかりませんでした",warning:"順序を変えている可能性のある要素",manual:"実際の読み上げ順序は確認が必要"},en:{label:"Reading and focus order",pass:"No positive tabindex or CSS order found",warning:"Elements may override the expected order",manual:"Actual reading order needs manual review"}},headings:{ja:{label:"見出し構造",pass:"見出し階層の自動検出範囲では問題なし",warning:"空見出し、H1不足・重複、階層飛び",manual:"見出し文の適切さは目視確認が必要"},en:{label:"Heading structure",pass:"No automatic heading-structure issues found",warning:"Empty headings, H1 issues, or skipped levels",manual:"Heading wording needs manual review"}},textResize:{ja:{label:"200%拡大",pass:"200%表示を選択できます",warning:"ズームを制限するviewport設定",manual:"重なりや見切れは200%で確認が必要"},en:{label:"200% text resize",pass:"A 200% text option is available",warning:"Viewport settings may restrict zoom",manual:"Clipping and overlap need review at 200%"}},pageTitle:{ja:{label:"ページタイトル",pass:"ページタイトルが設定されています",warning:"ページタイトルが未設定または曖昧",manual:"H1との整合性とページ間の重複は確認が必要"},en:{label:"Page title",pass:"A page title is present",warning:"Missing or ambiguous page title",manual:"H1 alignment and cross-page duplication need review"}},consistency:{ja:{label:"ナビゲーション・ラベルの一貫性",pass:"名前のない操作要素は見つかりませんでした",warning:"名前のないボタン・フォーム・ナビゲーション",manual:"ページ間の順序と表記は確認が必要"},en:{label:"Consistent navigation and labels",pass:"No unnamed controls found",warning:"Unnamed buttons, fields, or navigation",manual:"Cross-page order and wording need review"}}},Ct=t=>!!t.closest('nanairo-accessibility, [aria-hidden="true"], [hidden]');function v(t){if(Ct(t))return!1;const e=getComputedStyle(t);return e.display!=="none"&&e.visibility!=="hidden"&&Number(e.opacity)!==0}function ce(t){const e=t.getAttribute("aria-labelledby");if(e){const n=e.split(/\s+/).map(r=>document.getElementById(r)?.textContent??"").join(" ").trim();if(n)return n}const a=t.getAttribute("aria-label")?.trim();if(a)return a;if(t instanceof HTMLInputElement||t instanceof HTMLSelectElement||t instanceof HTMLTextAreaElement){const n=Array.from(t.labels??[]).map(r=>r.textContent?.trim()??"").filter(Boolean).join(" ");if(n)return n;if(t instanceof HTMLInputElement&&(t.type==="submit"||t.type==="button"))return t.value.trim()}const i=t.querySelector("img[alt]")?.getAttribute("alt")?.trim();return t.textContent?.replace(/\s+/g," ").trim()||i||t.getAttribute("title")?.trim()||""}function de(t){const e=t.match(/rgba?\((\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)(?:[, /]+(\d+(?:\.\d+)?))?\)/);return e?[Number(e[1]),Number(e[2]),Number(e[3]),e[4]===void 0?1:Number(e[4])]:null}function ee([t,e,a]){const i=n=>{const r=n/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4};return .2126*i(t)+.7152*i(e)+.0722*i(a)}function Pt(t,e){const a=Math.max(ee(t),ee(e)),i=Math.min(ee(t),ee(e));return(a+.05)/(i+.05)}function Nt(t){let e=t;for(;e;){const i=de(getComputedStyle(e).backgroundColor);if(i&&i[3]>=.95)return[i[0],i[1],i[2]];e=e.parentElement}const a=de(getComputedStyle(document.documentElement).backgroundColor);return a&&a[3]>=.95?[a[0],a[1],a[2]]:[255,255,255]}function _t(){const t="h1, h2, h3, h4, h5, h6, p, li, dt, dd, figcaption, label, a, button, td, th, small, strong";let e=0;return document.querySelectorAll(t).forEach(a=>{if(!v(a)||!a.textContent?.trim())return;const i=getComputedStyle(a);if(i.backgroundImage!=="none")return;const n=de(i.color),r=Nt(a);if(!n||n[3]<.95||!r)return;const o=Number.parseFloat(i.fontSize),s=Number.parseInt(i.fontWeight,10)||(i.fontWeight==="bold"?700:400),l=o>=24||s>=700&&o>=18.66;Pt([n[0],n[1],n[2]],r)<(l?3:4.5)&&(e+=1)}),e}function Ht(){const t=Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter(v);let e=t.filter(n=>!n.textContent?.trim()).length;const a=t.filter(n=>n.tagName==="H1").length;a!==1&&(e+=Math.abs(1-a)||1);let i=0;return t.forEach(n=>{const r=Number(n.tagName.slice(1));i&&r>i+1&&(e+=1),i=r}),e}function m(t,e,a,i=!1){const n=Et[t][e],r=a>0?"warning":i?"manual":"pass";return{id:t,status:r,count:a,label:n.label,detail:r==="warning"?n.warning:r==="manual"?n.manual:n.pass}}function Dt(t="ja"){const a=Array.from(document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex], [onclick]')).filter(v),i=a.filter(d=>d.hasAttribute("onclick")&&!d.matches('a[href], button, input, select, textarea, [role="button"], [role="link"]')&&!d.hasAttribute("tabindex")).length,n=a.filter(d=>Number(d.getAttribute("tabindex"))>0).length,r=Array.from(document.querySelectorAll("body *")).filter(d=>v(d)&&Number(getComputedStyle(d).order)!==0).length,o=Array.from(document.querySelectorAll("a[href]")).filter(v),s=/^(こちら|ここ|詳しくはこちら|詳細|more|click here|read more)$/i,l=o.filter(d=>{const qe=ce(d);return!qe||s.test(qe)}).length,h=Array.from(document.querySelectorAll("img")).filter(d=>v(d)&&!d.hasAttribute("alt")).length+document.querySelectorAll('input[type="image"]:not([alt]), area:not([alt])').length,p=document.querySelectorAll('meta[http-equiv="refresh" i], [data-timeout], [data-countdown], [class*="countdown" i], [id*="countdown" i], [class*="timer" i], [id*="timer" i]').length,c=Array.from(document.querySelectorAll('[style*="color" i], .required, .error, .warning')).filter(v).length,b=Array.from(document.querySelectorAll("body *")).filter(d=>!v(d)||!d.textContent?.trim()||d.children.length>0?!1:Number.parseFloat(getComputedStyle(d).fontSize)<10).length,y=document.querySelector('meta[name="viewport"]')?.content.toLowerCase()??"",C=y.includes("user-scalable=no")||/maximum-scale\s*=\s*(?:0|1(?:\.0+)?)(?:,|$)/.test(y),Qe=document.title.replace(/\s+/g," ").trim(),Vt=!Qe||/^(home|ホーム|untitled|無題|new page)$/i.test(Qe)?1:0,Je=Array.from(document.querySelectorAll('button, input:not([type="hidden"]), select, textarea, [role="button"]')).filter(v).filter(d=>!ce(d)).length,Ke=Array.from(document.querySelectorAll('nav, [role="navigation"]')).filter(v),Ge=Ke.length>1?Ke.filter(d=>!ce(d)).length:0,ge=[m("keyboard",t,i+n),m("contrast",t,_t()),m("font",t,b),m("links",t,l),m("altText",t,h),m("timeLimits",t,p,p===0),m("colorOnly",t,c,!0),m("readingOrder",t,n+r,n+r===0),m("headings",t,Ht()),m("textResize",t,C?1:0,!C),m("pageTitle",t,Vt),m("consistency",t,Je+Ge,Je+Ge===0)];return{checkedAt:Date.now(),items:ge,warningCount:ge.filter(d=>d.status==="warning").length,manualCount:ge.filter(d=>d.status==="manual").length}}const Oe="h1, h2, h3, h4, h5, h6, p, li, dt, dd, blockquote, figcaption, caption, th, td, summary",zt=220,Tt="。．！？!?.",Ut=/[\s"')\]]/;function It(t){const e=[];let a=0;for(let i=0;i<t.length;i+=1){const n=t[i],r=n==="。"||n==="．"||n==="！"||n==="？",o=(n==="!"||n==="?"||n===".")&&(i+1>=t.length||Ut.test(t[i+1]));if(!r&&!o)continue;let s=i+1;for(;s<t.length&&Tt.includes(t[s]);)s+=1;t[s]===" "&&(s+=1),e.push(t.slice(a,s)),a=s,i=s-1}return a<t.length&&e.push(t.slice(a)),e}function Ot(t,e=zt){const a=t.replace(/\s+/g," ").trim();if(!a)return[];if(a.length<=e)return[a];const i=[];let n="";const r=()=>{const o=n.trim();o&&i.push(o),n=""};for(const o of It(a)){if(o.length>e){r();let s=o;for(;s.length>e;){const l=s.slice(0,e).lastIndexOf(" "),h=l>e*.6?l:e,p=s.slice(0,h).trim();p&&i.push(p),s=s.slice(h)}n=s;continue}(n+o).length>e&&r(),n+=o}return r(),i}function Rt(t){return t.hidden||t.closest('[aria-hidden="true"], nanairo-accessibility')||typeof t.checkVisibility=="function"&&!t.checkVisibility()?!1:t.querySelector(Oe)===null}function Lt(t){const e=[];return t.querySelectorAll(Oe).forEach(a=>{Rt(a)&&e.push(...Ot(a.textContent??""))}),e}const Re="nanairo:a11y:preferences:v1",he=5,pe=(t="ja")=>({schemaVersion:1,locale:t,textScale:0,comfortableSpacing:!1,highlightLinks:!1,highContrast:!1,colorMode:"default",readableFont:!1,reduceMotion:!1,readingGuide:!1,readingMask:!1,mediaPaused:!1}),Bt=t=>t==="default"||t==="dark"||t==="light"||t==="high-contrast"||t==="monochrome"||t==="saturated",$=t=>t===!0,jt=t=>{const e=typeof t=="number"?t:Number(t);return Number.isFinite(e)?Math.min(he,Math.max(0,Math.round(e))):0};function Qt(t){const e=pe(t);let a;try{const n=localStorage.getItem(Re);if(!n)return e;const r=JSON.parse(n);if(typeof r!="object"||r===null||Array.isArray(r))return e;a=r}catch{return e}if(a.schemaVersion!==1)return e;const i=Bt(a.colorMode)?a.colorMode:$(a.highContrast)?"high-contrast":"default";return{schemaVersion:1,locale:V(a.locale,t),textScale:jt(a.textScale),comfortableSpacing:$(a.comfortableSpacing),highlightLinks:$(a.highlightLinks),highContrast:i==="high-contrast",colorMode:i,readableFont:$(a.readableFont),reduceMotion:$(a.reduceMotion),readingGuide:$(a.readingGuide),readingMask:$(a.readingMask),mediaPaused:$(a.mediaPaused)}}function Jt(t){try{localStorage.setItem(Re,JSON.stringify(t))}catch{}}const Kt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABcCAMAAACm/kDcAAAAP1BMVEVMaXEvNDQvNDQvNDQvNDQvNDQvNDQ4PDwwNTUvNDQvNjYvNDQvNDQuNTUvNDQvNDQuNDQvNDQvNDQvNDQzODgzIv3SAAAAFHRSTlMAkKA09rTUA/7tEcbgHIBCUidxYaS1FQkAAAAJcEhZcwAALEoAACxKAXd6dE0AAAb6SURBVGjetVrXYusgDGWDwXjy/996JQEOuEmc27h+aJateTSQyoIyk7SMWQt//uIanEvOTCtDHrdTB5I6ObiSCnu8nQdR25PSxCINYrZ3sgBKVka2qrTswECPCUy1xbtYIBWpk2FgI8525cK6B1SDr3ewQAqrUClptJHxbFEpWCbFkMBi8ksWBEiJ5Icd3sUhLcDGJY0fwOfJEYtvhLezVgAeEYEM4kjA382lCalOCXEr1t8pQQ95NLZL45KZgY0GIMd4cvTNopwC2E7+AxYlOsuN9MlKPhDy+UHAjyS71WmM+J0cCLYgwIWd7ENoJI6vcUPhnUpmPuRD2Q2aah3JVvjGuRHEEP4dB4T5POlgTBCLx2/iDpYn6RvxkcHssnF2es2sxi2kasUX4tvdAK6RItwptkkDBNNoUPm5f86GIrpGrLLMwcQJlOX2hRIglgF6QxBcoUnoGvSyjADHk+aAoKQINVKlnZHjZwUhMkNw6/iUg2XIXi8e37ht3YTWHLKZBMtOP30HoUBuzt6g53dErRegrnzCwTKR0I9kX8gExd0Yr8MTs+LtEM1omqIC8VJAAKJjmNnPBwDTwhKlgI9aulCqF/KAGNm9IoWHYwI8Mw9JLadn0KZgCIQRPplFyrEa4gufBcxKGVCyqAAO2fBlPHPASEGzkLOmNHp2WFW/ADZGs8uWCNWiaIYB5Ynmhw4Fbdm4unJVmM1eodqbgtSpuDlHOMkJHIbGsqTmXKXIiSybdIzsddRMFanVRmTpIZaoaJ7NUtv+/RGlL684ZNtYQ5avamX0gs21bW9dDgZFYwrS93krW7wXr3gQ8F1yef5Aih3mQs3JntvbzMVWCja0S4EF+rfIWqLCVraNrNbkx9bDLxcqoAfXQ9jWhQ1wROMQEqj13YUKrShUiyJro+LMgDyyUQ640KCqgMbcjzsPf+KvYzyDqPyAunnz3gfF4rwa9RHhNZPFXPfIKMa2YZ1V7ti+jAUozg3N1qFk7Fgpri2tXE2WpNarVsRjzewZACT949fiBdMY8eBsm+deqrBhRgoPH/aBfcRU52XK8UsDiLcsAIwtgzZqD6CcnEC5D5+4CrUasbtuVW0zB8u/PKL3FAr8xPcpB5HGsbNlaApiDXJQa24ZFBzJq2DO0eZUp+kRy00M2hPmK7Kv3ZwbjLQ0mUA38D5CpLNijYGmul34uVG0Y1CD6RxUCKCaj+ZrFSDpiFcMwAn2Rz7N+EIw90ngXTA0caTbqJhL2duJUecE6ob4+6JT79a5nT+jKIcUdZ1NfFc9t/y9ih+oAHk7/PBrzhYDJgnSJHZO4Pmuppi+5bA/usE4dHlnzJLKLtLIKbzAa/rg7EWNYWmCT8Co9VG5M4Pa9OiPTlo+5BLcFfjDI1A5zgx4SSLLdbZg9XwwrDl2AnvG4GQiXfsbd51RCyBV7rX6mK0MVtehqFaIH6pd5FUTz7CoPcrcxUFTNfzwIYMMJeOX3MqwrqhhLOpTrTW+4PiieTlzCC2l2ohhLuKnbJrbzs9NlDnANKCvvgW0oMjSfl17/8+dXD0NJ3JumwN1sViHXYsNjT5Ymf+ZO7AVTqpBtk0MndhDX/RFUvJp0/cBB89hasEj61rV3XUVY3p03n1i+Wx2ssBZuRqEQPSwyHHy04+iPaz/NwcCDn4agm/gDmnkOFBZkt9UJPvx/yx0sPCNC6BaHBUf/oIJzfo4NSr5i0GWbcr1BPIfx1CL87HjZEzBz381KLOPw+UEsMpWQOyif+rJmA5yxrPfXwRHRSf8TD7CIENtdR6FY6xfGahrHfIkiGiC73OM2BqUyS1f0CcX5hkYkd8QvZs9vAGDPrd/Rx+aSl0EXlF6JWL+hDMRAKv6Sv7cFpM/7YKDOSVWdoi/ArSM/JI+jG3QoZKP3fyZIlFdzQ8/4QBHEy8nnAK6sPky30Vv7OP74eGHCsA8OBD1kUvbkofAUNx/TX9GiML0n895dpEJxglXAtX131xwynYq0KqHQEOvM47XnZ6/3wYggoY91gEyUS/OFvKGZQOmeUJQIc78zIuzb1mXUJYUx5x93cWY3SHvWfi0WTIuPOAQGZ1tb1pZ0Sge6yASH/J8epO3Ucc0ANN0vghD428VMk5vo441xeXZujOaL7HZetywwgObwwoP1i1uFMvarjvuIG/lhgsHCOC8IDyWKHf4FTO+oWUJTOunyG5d1WImoIyfFO5iRLx5gUqbGfRpwNRs5O37WSYDImaKuPwQ/vYVMxZXFxbqq912/wbbwyYTdjCw2Ry+LeKvphQu4GxWPN3cfG9/rIs+d4Sj/AP60LrBSUBC9L7ann3JANexEesgdJzsD/4Hwho3CFwz6/VP/gECzy94meVPxKd5GRjf7Jb91b+IWO3CH5D/B65VawT0UQAiAAAAAElFTkSuQmCC",Gt="data:image/png;base64,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";var qt=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,w=(t,e,a,i)=>{for(var n=i>1?void 0:i?Ft(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&qt(e,a,n),n};let Yt=0;const Le=[100,112,125,150,175,200],Xt=Le.map((t,e)=>e);let D;const z=[{value:"default",label:"colorDefault"},{value:"dark",label:"colorDark"},{value:"light",label:"colorLight"},{value:"high-contrast",label:"colorHighContrast"},{value:"monochrome",label:"colorMonochrome"},{value:"saturated",label:"colorSaturated"}],x=t=>{const e={spark:g`<path d="M12 2.75c.62 3.67 2.58 5.63 6.25 6.25-3.67.62-5.63 2.58-6.25 6.25C11.38 11.58 9.42 9.62 5.75 9 9.42 8.38 11.38 6.42 12 2.75Z"></path><path d="M18.4 14.3c.28 1.66 1.17 2.55 2.83 2.83-1.66.28-2.55 1.17-2.83 2.83-.28-1.66-1.17-2.55-2.83-2.83 1.66-.28 2.55-1.17 2.83-2.83Z"></path>`,accessibility:g`<circle cx="12" cy="12" r="9.25"></circle><circle cx="12" cy="7" r="1.35" fill="currentColor" stroke="none"></circle><path d="M6.8 10.2c3.5 1.15 6.9 1.15 10.4 0M12 10.7v4M12 14.7 8.8 19M12 14.7l3.2 4.3"></path>`,close:g`<path d="m7 7 10 10M17 7 7 17"></path>`,minus:g`<path d="M6 12h12"></path>`,plus:g`<path d="M12 6v12M6 12h12"></path>`,type:g`<path d="M5 6h10M10 6v12M7 18h6M16.5 11h3M18 11v7m-2 0h4"></path>`,spacing:g`<path d="M7 4v16M4.5 6.5 7 4l2.5 2.5M4.5 17.5 7 20l2.5-2.5M12 7h8M12 12h8M12 17h8"></path>`,link:g`<path d="m9.5 14.5 5-5M7.8 16.2l-1.2 1.2a3.4 3.4 0 0 1-4.8-4.8l3.1-3.1a3.4 3.4 0 0 1 4.8 0M16.2 7.8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8l-3.1 3.1a3.4 3.4 0 0 1-4.8 0"></path>`,contrast:g`<circle cx="12" cy="12" r="8.5"></circle><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17Z" fill="currentColor" stroke="none"></path>`,font:g`<path d="M4 18 9 5l5 13M6 13h6M14.5 10h5M17 10v8m-2.5 0h5"></path>`,motion:g`<path d="M5 8.5c2.2-4.4 9-5.1 12.3-1.4 3.2 3.5 1.2 9.3-3.3 10.4-3.7.9-7.5-1.6-7.8-5.4M2.8 5.4 5 8.5l3.6-1"></path>`,guide:g`<path d="M3 7h18M3 17h18M6 12h12"></path>`,mask:g`<path d="M4 4h16v16H4zM4 9h16M4 15h16"></path>`,speech:g`<path d="M5 10v4h3l4 3V7L8 10H5ZM15 9.2a4 4 0 0 1 0 5.6M17.5 6.8a7.3 7.3 0 0 1 0 10.4"></path>`,media:g`<rect x="3.5" y="5" width="17" height="14" rx="2.5"></rect><path d="m9 9.2 5 2.8-5 2.8V9.2ZM4 4l16 16"></path>`,audit:g`<path d="M9.5 5H6.8A1.8 1.8 0 0 0 5 6.8v10.4A1.8 1.8 0 0 0 6.8 19h10.4a1.8 1.8 0 0 0 1.8-1.8v-3.1M9 12l2.1 2.1L19 6.2"></path>`,reset:g`<path d="M4.5 8A8 8 0 1 1 4 14M4.5 8V3.5M4.5 8H9"></path>`};return k`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${e[t]}</svg>`};f.NanairoAccessibility=class extends B{constructor(){super(...arguments),this.locale="ja",this.position="right",this.showBranding=!0,this.open=!1,this.preferences=pe(),this.announcement="",this.speaking=!1,this.auditResult=null,this.panelId=`nanairo-a11y-panel-${++Yt}`,this.initialized=!1,this.speechQueue=[],this.speechSession=0,this.handleDocumentPointerDown=e=>{this.open&&!e.composedPath().includes(this)&&this.closePanel(!1)},this.handlePageHide=()=>{this.stopSpeech(!1)},this.handleKeyDown=e=>{e.key==="Escape"&&this.open&&(e.preventDefault(),this.closePanel(!0))},this.handleColorModeKeyDown=e=>{const a=e.key==="ArrowRight"||e.key==="ArrowDown"?1:e.key==="ArrowLeft"||e.key==="ArrowUp"?-1:void 0;if(a!==void 0){e.preventDefault(),this.moveColorMode(a);return}(e.key==="Home"||e.key==="End")&&(e.preventDefault(),this.moveColorMode(e.key==="Home"?"first":"last"))}}connectedCallback(){if(D&&D!==this&&D.isConnected){console.warn("[nanairo-accessibility] A widget is already active on this page; the duplicate element was removed."),this.remove();return}D=this,super.connectedCallback(),this.initialized||(this.locale=V(this.getAttribute("locale")),this.preferences=Qt(this.locale),this.locale=this.preferences.locale,Ie(this.preferences),this.initialized=!0),document.addEventListener("pointerdown",this.handleDocumentPointerDown),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("pagehide",this.handlePageHide)}disconnectedCallback(){D===this&&(D=void 0),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("pagehide",this.handlePageHide),this.stopSpeech(!1),super.disconnectedCallback()}willUpdate(e){if(e.has("locale")){const a=V(this.locale);a!==this.locale&&(this.locale=a)}e.has("position")&&this.position!=="left"&&this.position!=="right"&&(this.position="right")}t(e){return wt(this.locale,e)}commit(e){this.preferences=e,this.locale=e.locale,Jt(e),Ie(e),this.dispatchEvent(new CustomEvent("nanairo-change",{detail:e,bubbles:!0,composed:!0}))}async openPanel(){this.open=!0,await this.updateComplete,this.renderRoot.querySelector(".close-button")?.focus()}async showPanel(){await this.openPanel()}async closePanel(e){this.open=!1,await this.updateComplete,e&&this.renderRoot.querySelector(".launcher")?.focus()}selectLocale(e){this.stopSpeech(!1),this.auditResult=null,this.commit({...this.preferences,locale:e})}setScale(e){const a=Math.max(0,Math.min(he,this.preferences.textScale+e));this.commit({...this.preferences,textScale:a})}runAudit(){this.auditResult=Dt(this.locale),this.announcement=this.t("auditDone")}toggle(e){this.commit({...this.preferences,[e]:!this.preferences[e]})}colorModeButtons(){return Array.from(this.renderRoot.querySelectorAll('.color-mode-grid [role="radio"]'))}async moveColorMode(e){const a=z.findIndex(({value:n})=>n===this.preferences.colorMode),i=e==="first"?0:e==="last"?z.length-1:(Math.max(0,a)+e+z.length)%z.length;this.setColorMode(z[i].value),await this.updateComplete,this.colorModeButtons()[i]?.focus()}setColorMode(e){this.commit({...this.preferences,colorMode:e,highContrast:e==="high-contrast"})}pageSpeechSegments(){const e=document.querySelector("main")??document.body;return e?Lt(e):[]}speakNext(e){if(e!==this.speechSession)return;const a=this.speechQueue.shift();if(!a){this.speaking=!1;return}const i=new SpeechSynthesisUtterance(a);i.lang=this.locale==="ja"?"ja-JP":"en-US",i.rate=.92,i.onend=()=>this.speakNext(e),i.onerror=()=>{e===this.speechSession&&(this.speaking=!1)},window.speechSynthesis.speak(i)}toggleSpeech(){if(this.speaking){this.stopSpeech(!0);return}if(!("speechSynthesis"in window)||typeof SpeechSynthesisUtterance>"u"){this.announcement=this.t("speechUnavailable");return}if(this.speechQueue=this.pageSpeechSegments(),!this.speechQueue.length)return;const e=++this.speechSession;this.speaking=!0,this.announcement=this.t("speechStarted"),window.speechSynthesis.cancel(),this.speakNext(e)}stopSpeech(e){!this.speaking&&!this.speechQueue.length||(this.speechSession+=1,this.speechQueue=[],this.speaking=!1,"speechSynthesis"in window&&window.speechSynthesis.cancel(),e&&(this.announcement=this.t("speechStopped")))}reset(){this.stopSpeech(!1),this.auditResult=null,this.commit(pe(this.locale)),this.announcement=this.t("resetDone"),window.setTimeout(()=>{this.announcement=""},1800)}resetPreferences(){this.reset()}destroy(){Mt(),this.remove()}renderToggle(e,a,i,n){const r=this.preferences[e];return k`
      <button
        class="preference-row ${r?"active":""}"
        type="button"
        aria-pressed=${r}
        @click=${()=>this.toggle(e)}
      >
        <span class="feature-icon">${x(a)}</span>
        <span class="preference-copy">
          <span class="preference-title">${this.t(i)}</span>
          <span class="preference-hint">${this.t(n)}</span>
        </span>
        <span class="switch" aria-hidden="true"><span></span></span>
      </button>
    `}render(){const e=Le[this.preferences.textScale];return k`
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
              <span class="brand-mark" aria-hidden="true"><img src=${Kt} alt="" /></span>
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
                  ${Xt.map(a=>k`<span class=${a<=this.preferences.textScale?"filled":""}></span>`)}
                </div>
                <button type="button" aria-label=${this.t("increase")} ?disabled=${this.preferences.textScale===he} @click=${()=>this.setScale(1)}>
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
              ${z.map(({value:a,label:i})=>k`
                <button
                  class="color-mode ${this.preferences.colorMode===a?"active":""}"
                  type="button"
                  role="radio"
                  aria-checked=${this.preferences.colorMode===a}
                  tabindex=${this.preferences.colorMode===a?0:-1}
                  @click=${()=>this.setColorMode(a)}
                >
                  <span class="color-swatch swatch-${a}" aria-hidden="true"><span></span></span>
                  <span>${this.t(i)}</span>
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

            <div class="section-heading">${this.t("auditSection")}</div>
            <div class="audit-card">
              <div class="audit-heading">
                <span class="feature-icon">${x("audit")}</span>
                <span class="preference-copy">
                  <span class="preference-title">${this.t("auditTitle")}</span>
                  <span class="preference-hint">${this.t("auditHint")}</span>
                </span>
              </div>
              <button class="audit-button" type="button" @click=${this.runAudit}>${x("audit")}<span>${this.t("auditRun")}</span></button>
              ${this.auditResult?k`
                <div class="audit-summary" role="status">
                  <strong>${this.t("auditDone")}</strong>
                  <span>${this.auditResult.warningCount}${this.t("auditWarnings")} · ${this.auditResult.manualCount}${this.t("auditManuals")}</span>
                </div>
                <ul class="audit-results">
                  ${this.auditResult.items.map(a=>k`
                    <li class="status-${a.status}">
                      <span class="audit-status" aria-hidden="true">${a.status==="warning"?"!":a.status==="manual"?"?":"✓"}</span>
                      <span><strong>${a.label}</strong><small>${a.detail}${a.count>0?` (${a.count})`:""}</small></span>
                    </li>
                  `)}
                </ul>
                <p class="audit-disclaimer">${this.t("auditDisclaimer")}</p>
              `:u}
            </div>

            <p class="note">${this.t("note")}</p>

            <div class="language-field">
              <label for="${this.panelId}-language">${this.t("language")}</label>
              <select
                id="${this.panelId}-language"
                .value=${this.locale}
                @change=${a=>this.selectLocale(a.target.value)}
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <footer class="panel-footer">
            <button class="reset-button" type="button" @click=${this.reset}>${x("reset")}<span>${this.t("reset")}</span></button>
            ${this.showBranding?k`
              <span class="footer-brand">
                <span class="powered-by">Powered by</span>
                <img src=${Gt} alt="NANAiRO" />
              </span>
            `:u}
          </footer>
          <span class="sr-only" aria-live="polite">${this.announcement||u}</span>
      </section>
    `}},f.NanairoAccessibility.styles=Ye`
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
    .audit-results { display: grid; gap: 7px; margin: 10px 0 0; padding: 0; list-style: none; }
    .audit-results li { display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 8px; align-items: start; padding: 9px; border: 1px solid var(--line); border-radius: 12px; }
    .audit-results strong, .audit-results small { display: block; }
    .audit-results strong { color: var(--ink); font-size: 11px; line-height: 1.5; }
    .audit-results small { margin-top: 2px; color: var(--muted); font-size: 10px; line-height: 1.55; }
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
  `,w([X({type:String,reflect:!0})],f.NanairoAccessibility.prototype,"locale",2),w([X({type:String,reflect:!0})],f.NanairoAccessibility.prototype,"position",2),w([X({type:Boolean,attribute:"show-branding"})],f.NanairoAccessibility.prototype,"showBranding",2),w([j()],f.NanairoAccessibility.prototype,"open",2),w([j()],f.NanairoAccessibility.prototype,"preferences",2),w([j()],f.NanairoAccessibility.prototype,"announcement",2),w([j()],f.NanairoAccessibility.prototype,"speaking",2),w([j()],f.NanairoAccessibility.prototype,"auditResult",2),f.NanairoAccessibility=w([mt("nanairo-accessibility")],f.NanairoAccessibility);const Be=t=>({locale:t.locale==="en"?"en":"ja",position:t.position==="left"?"left":"right",showBranding:t.showBranding!==!1&&t.showBranding!=="false"});function ue(t={}){const e=document.querySelector("nanairo-accessibility");if(e)return e;const a=document.createElement("nanairo-accessibility");a.setAttribute("locale",t.locale==="en"?"en":"ja"),a.setAttribute("position",t.position==="left"?"left":"right"),a.showBranding=t.showBranding??!0;const i=()=>{document.body.append(a)};return document.body?i():document.addEventListener("DOMContentLoaded",i,{once:!0}),a}const je=document.querySelector("script[data-nanairo-auto]");if(je)ue(Be(je.dataset));else{const t=window.nanairoAccessibilitySettings;t&&typeof t=="object"&&ue(Be(t))}return f.init=ue,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}),f})({});
